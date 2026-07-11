#!/usr/bin/env bash
# Exécuté sur le VPS après `git pull`.
# Pas de base de données — site statique Next.js pur.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Charger nvm
export NVM_DIR="$HOME/.nvm"
if [ ! -d "$NVM_DIR" ]; then
  echo "=== Installation de nvm ==="
  curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
fi
set +u
# shellcheck source=/dev/null
source "$NVM_DIR/nvm.sh"
set -u

# Installer Node.js LTS si absent
if ! command -v node >/dev/null 2>&1; then
  echo "=== Installation de Node.js LTS ==="
  set +u
  nvm install --lts
  nvm alias default node
  set -u
fi

# Convertir CRLF → LF si .env vient de Windows
if [ -f .env ]; then
  sed -i 's/\r//' .env
fi

echo "=== Qadus deploy : $(pwd) — Node $(node -v) ==="

# Build
npm ci --include=dev
npm run build

# Démarrer/redémarrer avec PM2 sur le port 3002
export NODE_ENV=production
export PORT=3002

PM2_APP_NAME="${PM2_APP_NAME:-qadus}"

run_pm2() {
  if command -v pm2 >/dev/null 2>&1; then
    pm2 "$@"
  elif [[ -x ./node_modules/.bin/pm2 ]]; then
    ./node_modules/.bin/pm2 "$@"
  else
    npx --yes pm2 "$@"
  fi
}

run_pm2 delete "$PM2_APP_NAME" 2>/dev/null || true
run_pm2 start npm --name "$PM2_APP_NAME" --cwd "$ROOT" \
  --env production \
  -- start -- -p 3002
run_pm2 save

echo "=== PM2 status ==="
run_pm2 describe "$PM2_APP_NAME" 2>/dev/null | grep -E 'exec cwd|script path|status' || run_pm2 status "$PM2_APP_NAME" || true

echo "=== Vérification HTTP locale (port 3002) ==="
_http_ok=false
for _attempt in 1 2 3 4 5 6; do
  sleep 5
  if curl -sf -o /dev/null --max-time 20 http://127.0.0.1:3002/; then
    _http_ok=true
    break
  fi
done

if [[ "$_http_ok" != true ]]; then
  echo "::error::L'application ne répond pas sur http://127.0.0.1:3002"
  run_pm2 logs "$PM2_APP_NAME" --lines 40 --nostream 2>/dev/null || true
  exit 1
fi
echo "=== OK : application accessible sur port 3002 ==="

# Configurer Nginx si disponible
if command -v nginx >/dev/null 2>&1; then
  bash "$ROOT/scripts/ensure-nginx-qadus.sh"
fi
