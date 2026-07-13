#!/usr/bin/env bash
# Diagnostic rapide Qadus sur le VPS — à lancer en SSH : bash scripts/vps-diagnose.sh
set -uo pipefail

check_version() {
  local _body="$1"
  if echo "$_body" | grep -qE "06 67 25 08 85|0667250885|tel:\+33667250885|\+33667250885"; then
    echo "NOUVELLE"
  elif echo "$_body" | grep -qE "07 58 42 95 10|07 61 91 62 22|0758429510|0761916222"; then
    echo "ANCIENNE"
  elif [ -n "$_body" ]; then
    echo "INCONNUE"
  else
    echo "PAS DE REPONSE"
  fi
}

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
_b="$(curl -sf --compressed --max-time 10 http://127.0.0.1:3002/ 2>/dev/null || true)"
echo "3002 → $(check_version "$_b")"

echo
echo "--- curl via nginx ---"
for args in \
  '-H "Host: www.qadus.fr" http://127.0.0.1/' \
  '--resolve "www.qadus.fr:443:127.0.0.1" https://www.qadus.fr/'; do
  _n="$(eval curl -sL --compressed --max-time 10 $args 2>/dev/null || true)"
  echo "$args → $(check_version "$_n")"
done

echo
echo "--- nginx qadus (aaPanel + debian) ---"
if command -v sudo >/dev/null 2>&1; then
  sudo grep -RInE 'server_name|proxy_pass|127\.0\.0\.1:300|qadus_next' \
    /www/server/panel/vhost/nginx /etc/nginx/sites-enabled 2>/dev/null | grep -i qadus | head -30 || true
fi

echo "=========================================="
