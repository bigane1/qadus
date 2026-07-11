#!/usr/bin/env bash
# Diagnostic rapide Qadus sur le VPS — à lancer en SSH : bash scripts/vps-diagnose.sh
set -uo pipefail

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
_b="$(curl -sf --max-time 10 http://127.0.0.1:3002/ 2>/dev/null || true)"
if echo "$_b" | grep -q "07 58 42 95 10"; then echo "3002 → NOUVELLE version"; elif echo "$_b" | grep -q "07 61 91 62 22"; then echo "3002 → ANCIENNE version"; elif [ -n "$_b" ]; then echo "3002 → répond (numéro inconnu)"; else echo "3002 → pas de réponse"; fi

echo
echo "--- curl via nginx (Host: www.qadus.fr) ---"
for url in "http://127.0.0.1/" "https://127.0.0.1/"; do
  _n="$(curl -sfk --max-time 10 -H "Host: www.qadus.fr" "$url" 2>/dev/null || true)"
  if echo "$_n" | grep -q "07 58 42 95 10"; then echo "$url → NOUVELLE version"; elif echo "$_n" | grep -q "07 61 91 62 22"; then echo "$url → ANCIENNE version"; elif [ -n "$_n" ]; then echo "$url → répond (numéro inconnu)"; else echo "$url → pas de réponse"; fi
done

echo
echo "--- nginx configs qadus ---"
if command -v sudo >/dev/null 2>&1; then
  sudo grep -RInE 'server_name|proxy_pass|upstream|127\.0\.0\.1:300' /etc/nginx/ 2>/dev/null | grep -i qadus || \
  sudo grep -RInE 'qadus\.fr|www\.qadus\.fr|127\.0\.0\.1:300' /etc/nginx/sites-enabled/ 2>/dev/null || true
fi

echo "=========================================="
