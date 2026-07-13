#!/usr/bin/env bash
# Diagnostic rapide Qadus sur le VPS — à lancer en SSH : bash scripts/vps-diagnose.sh
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=scripts/curl-check.sh
source "$ROOT/scripts/curl-check.sh"

echo "========== Qadus VPS diagnostic =========="
echo "Date: $(date -Is 2>/dev/null || date)"
echo "User: $(whoami)"
echo

for d in /var/www/qadus /home/ubuntu/qadus /root/qadus; do
  if [ -d "$d/.git" ]; then
    echo "--- Repo: $d ---"
    git -C "$d" log -1 --oneline 2>/dev/null || true
    grep -E 'TEL|TEL_DISPLAY' "$d/lib/contact.ts" 2>/dev/null | head -3 || echo "(pas de lib/contact.ts)"
  fi
done

echo
echo "--- Ports Node (3000-3010) ---"
ss -tlnp 2>/dev/null | grep -E ':300[0-9]' || netstat -tlnp 2>/dev/null | grep -E ':300[0-9]' || echo "(ss/netstat indisponible)"

echo
echo "--- PM2 ---"
if command -v pm2 >/dev/null 2>&1; then
  pm2 list 2>/dev/null || true
  pm2 describe qadus 2>/dev/null | grep -E 'exec cwd|script path|status|restarts' || true
else
  echo "pm2 non installé globalement"
fi

echo
echo "--- curl direct :3002 ---"
_check="$(mktemp)"
if curl_fetch_html -o "$_check" "http://127.0.0.1:3002/"; then
  echo "3002 → $(body_version_hint_from_file "$_check")"
  dump_html_debug "$_check" "http://127.0.0.1:3002/"
else
  echo "3002 → PAS DE REPONSE"
fi
rm -f "$_check"

echo
echo "--- curl via nginx ---"
_n="$(mktemp)"
if curl_fetch_html -o "$_n" -H "Host: www.qadus.fr" "http://127.0.0.1/"; then
  echo 'nginx HTTP Host:www.qadus.fr → '"$(body_version_hint_from_file "$_n")"
else
  echo "nginx HTTP Host:www.qadus.fr → PAS DE REPONSE"
fi
rm -f "$_n"

_n="$(mktemp)"
if curl_fetch_html -o "$_n" --resolve "www.qadus.fr:443:127.0.0.1" "https://www.qadus.fr/"; then
  echo 'nginx HTTPS www.qadus.fr → '"$(body_version_hint_from_file "$_n")"
else
  echo "nginx HTTPS www.qadus.fr → PAS DE REPONSE"
fi
rm -f "$_n"

echo
echo "--- nginx qadus (aaPanel + debian) ---"
if command -v sudo >/dev/null 2>&1; then
  sudo grep -RInE 'server_name|proxy_pass|127\.0\.0\.1:300|qadus_next' \
    /www/server/panel/vhost/nginx /etc/nginx/sites-enabled 2>/dev/null | grep -i qadus | head -30 || true
fi

echo "=========================================="
