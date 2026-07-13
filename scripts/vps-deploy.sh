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

# shellcheck source=scripts/curl-check.sh
source "$ROOT/scripts/curl-check.sh"

run_pm2() {
  if command -v pm2 >/dev/null 2>&1; then
    pm2 "$@"
  elif [[ -x ./node_modules/.bin/pm2 ]]; then
    ./node_modules/.bin/pm2 "$@"
  else
    npx --yes pm2 "$@"
  fi
}

free_port() {
  local port="$1"
  echo "=== Libération du port $port ==="
  if command -v fuser >/dev/null 2>&1; then
    fuser -k "${port}/tcp" 2>/dev/null || true
  elif command -v lsof >/dev/null 2>&1; then
    local pids
    pids="$(lsof -t -i:"${port}" 2>/dev/null || true)"
    if [ -n "$pids" ]; then
      kill -9 $pids 2>/dev/null || true
    fi
  fi
  sleep 2
  if ss -tlnp 2>/dev/null | grep -q ":${port} "; then
    echo "::warning::Le port $port est encore occupé après libération"
    ss -tlnp 2>/dev/null | grep ":${port} " || true
  else
    echo "Port $port libre"
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

free_port 3002

echo "=== Démarrage PM2 depuis $ROOT ==="
run_pm2 start "$ROOT/ecosystem.config.cjs" --update-env
run_pm2 save

echo "=== PM2 status ==="
run_pm2 describe "$PM2_APP_NAME" 2>/dev/null | grep -E 'exec cwd|script path|status|restarts' || run_pm2 status "$PM2_APP_NAME" || true

echo "=== Vérification HTTP locale (port 3002) ==="
_http_ok=false
_content_ok=false
_check_file="$(mktemp)"
_check_url="http://127.0.0.1:3002/"
trap 'rm -f "$_check_file"' EXIT

for _attempt in 1 2 3 4 5 6 8 10; do
  sleep 5
  _check_url="http://127.0.0.1:3002/?_deploy=$(date +%s)"
  if curl_fetch_html -o "$_check_file" "$_check_url"; then
    _http_ok=true
    _hint="$(body_version_hint_from_file "$_check_file")"
    if grep -aqE "$QADUS_PHONE_PATTERN" "$_check_file"; then
      _content_ok=true
      break
    fi
    echo "tentative $_attempt : HTTP OK — version détectée: $_hint"
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
  echo "Dernière version détectée: $(body_version_hint_from_file "$_check_file")"
  dump_html_debug "$_check_file" "$_check_url"
  echo "Processus sur 3002 :"
  ss -tlnp 2>/dev/null | grep 3002 || netstat -tlnp 2>/dev/null | grep 3002 || true
  run_pm2 logs "$PM2_APP_NAME" --lines 50 --nostream 2>/dev/null || true
  exit 1
fi

echo "=== OK : nouvelle version active sur port 3002 (commit $DEPLOY_SHORT) ==="

if command -v nginx >/dev/null 2>&1 || [ -x /www/server/nginx/sbin/nginx ]; then
  bash "$ROOT/scripts/ensure-nginx-qadus.sh"
else
  echo "⚠ nginx absent — le site public peut encore pointer vers un ancien port"
fi

echo "=== Diagnostic rapide ==="
bash "$ROOT/scripts/vps-diagnose.sh" || true
