#!/usr/bin/env bash
# Exécuté sur le VPS après `git pull`.
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

if ! command -v node >/dev/null 2>&1; then
  echo "=== Installation de Node.js LTS ==="
  set +u
  nvm install --lts
  nvm alias default node
  set -u
fi

if [ -f .env ]; then
  sed -i 's/\r//' .env
fi

DEPLOY_COMMIT="$(git rev-parse HEAD)"
DEPLOY_SHORT="$(git rev-parse --short HEAD)"
echo "=== Qadus deploy ==="
echo "    Dossier : $ROOT"
echo "    Commit  : $DEPLOY_SHORT ($DEPLOY_COMMIT)"
echo "    Node    : $(node -v)"

if [ ! -f "$ROOT/lib/contact.ts" ]; then
  echo "::error::lib/contact.ts introuvable — mauvais dépôt ou pull incomplet"
  exit 1
fi

if ! grep -q "0667250885" "$ROOT/lib/contact.ts"; then
  echo "::error::lib/contact.ts ne contient pas le numéro 06 67 25 08 85 — code obsolète sur le VPS"
  exit 1
fi

echo "=== Build Next.js ==="
npm ci --include=dev
npm run build

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

echo "=== Arrêt des anciennes instances PM2 (qadus*) ==="
run_pm2 delete "$PM2_APP_NAME" 2>/dev/null || true
# Anciennes instances éventuelles lancées depuis un autre dossier
while IFS= read -r _old_id; do
  [ -n "$_old_id" ] && run_pm2 delete "$_old_id" 2>/dev/null || true
done < <(run_pm2 jlist 2>/dev/null | node -e "
const d=JSON.parse(require('fs').readFileSync(0,'utf8')||'[]');
d.filter(p=>/qadus/i.test(p.name)).map(p=>p.pm_id).forEach(id=>console.log(id));
" 2>/dev/null || true)

echo "=== Démarrage PM2 depuis $ROOT ==="
run_pm2 start "$ROOT/ecosystem.config.cjs" --update-env
run_pm2 save

echo "=== PM2 status ==="
run_pm2 describe "$PM2_APP_NAME" 2>/dev/null | grep -E 'exec cwd|script path|status|restarts' || run_pm2 status "$PM2_APP_NAME" || true

echo "=== Vérification HTTP locale (port 3002) ==="
_http_ok=false
_content_ok=false
for _attempt in 1 2 3 4 5 6 8 10; do
  sleep 5
  _body="$(curl -sf --max-time 20 http://127.0.0.1:3002/ 2>/dev/null || true)"
  if [ -n "$_body" ]; then
    _http_ok=true
    if echo "$_body" | grep -q "06 67 25 08 85"; then
      _content_ok=true
      break
    fi
    echo "tentative $_attempt : HTTP OK mais ancien contenu encore servi..."
  else
    echo "tentative $_attempt : pas de réponse sur :3002"
  fi
done

if [[ "$_http_ok" != true ]]; then
  echo "::error::L'application ne répond pas sur http://127.0.0.1:3002"
  run_pm2 logs "$PM2_APP_NAME" --lines 50 --nostream 2>/dev/null || true
  exit 1
fi

if [[ "$_content_ok" != true ]]; then
  echo "::error::Port 3002 répond mais le HTML ne contient pas 06 67 25 08 85"
  echo "Vérifiez qu'aucune autre app n'écoute sur 3002 : ss -tlnp | grep 3002"
  run_pm2 logs "$PM2_APP_NAME" --lines 50 --nostream 2>/dev/null || true
  exit 1
fi

echo "=== OK : nouvelle version active sur port 3002 (commit $DEPLOY_SHORT) ==="

if command -v nginx >/dev/null 2>&1; then
  bash "$ROOT/scripts/ensure-nginx-qadus.sh"
else
  echo "⚠ nginx absent — le site public peut encore pointer vers un ancien port"
fi

echo "=== Diagnostic rapide ==="
bash "$ROOT/scripts/vps-diagnose.sh" || true
