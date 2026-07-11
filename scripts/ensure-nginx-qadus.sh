#!/usr/bin/env bash
# Configure nginx pour qadus.fr → 127.0.0.1:3002 (HTTP + HTTPS si certificat Let's Encrypt)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_NAME="qadus"
DEST="/etc/nginx/sites-available/$SITE_NAME"
ENABLED="/etc/nginx/sites-enabled/$SITE_NAME"
QADUS_PORT=3002

run_sudo() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  elif command -v sudo >/dev/null 2>&1; then
    sudo -n "$@" 2>/dev/null || sudo "$@"
  else
    echo "::error::sudo absent — impossible de modifier nginx"
    return 1
  fi
}

patch_qadus_nginx_files() {
  local _files=()
  while IFS= read -r _f; do
    [ -n "$_f" ] && _files+=("$_f")
  done < <(
    run_sudo grep -rlE 'qadus\.fr|www\.qadus\.fr' /etc/nginx/ 2>/dev/null || true
  )

  if ((${#_files[@]} == 0)); then
    echo "Aucun fichier nginx existant pour qadus.fr"
    return 0
  fi

  echo "=== Patch des configs nginx existantes (${#_files[@]} fichier(s)) ==="
  for _f in "${_files[@]}"; do
    echo "→ $_f"
    run_sudo sed -i -E \
      "s#proxy_pass[[:space:]]+https?://(127\\.0\\.0\\.1|localhost):[0-9]+/?#proxy_pass http://127.0.0.1:${QADUS_PORT}#g" \
      "$_f"
    run_sudo sed -i -E \
      "s#server[[:space:]]+(127\\.0\\.0\\.1|localhost):[0-9]+;#server 127.0.0.1:${QADUS_PORT};#g" \
      "$_f"
  done
}

write_site_config() {
  local cert_dir=""
  if run_sudo test -f /etc/letsencrypt/live/qadus.fr/fullchain.pem 2>/dev/null; then
    cert_dir="/etc/letsencrypt/live/qadus.fr"
  elif run_sudo test -f /etc/letsencrypt/live/www.qadus.fr/fullchain.pem 2>/dev/null; then
    cert_dir="/etc/letsencrypt/live/www.qadus.fr"
  fi

  local tmp
  tmp="$(mktemp)"

  cat >"$tmp" <<EOF
# Qadus — reverse proxy nginx vers Next.js (PM2, port ${QADUS_PORT})
# Généré par scripts/ensure-nginx-qadus.sh

upstream qadus_next {
    server 127.0.0.1:${QADUS_PORT};
    keepalive 32;
}

server {
    listen 80;
    listen [::]:80;
    server_name qadus.fr www.qadus.fr;

    client_max_body_size 10M;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://qadus_next;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }
}
EOF

  if [ -n "$cert_dir" ]; then
    cat >>"$tmp" <<EOF

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name qadus.fr www.qadus.fr;

    ssl_certificate ${cert_dir}/fullchain.pem;
    ssl_certificate_key ${cert_dir}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 10M;

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_pass http://qadus_next;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }
}
EOF
    echo "Certificat SSL détecté : $cert_dir"
  else
    echo "Pas de certificat Let's Encrypt — config HTTP uniquement"
  fi

  run_sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
  run_sudo cp "$tmp" "$DEST"
  run_sudo ln -sf "$DEST" "$ENABLED"
  rm -f "$tmp"
  echo "Config installée : $DEST"
}

disable_duplicate_qadus_sites() {
  local _enabled _real
  _real="$(run_sudo readlink -f "$ENABLED" 2>/dev/null || echo "$DEST")"
  while IFS= read -r _enabled; do
    [ -n "$_enabled" ] || continue
    local _target
    _target="$(run_sudo readlink -f "$_enabled" 2>/dev/null || echo "$_enabled")"
    [ "$_target" = "$_real" ] && continue
    if run_sudo grep -qE 'server_name[^;]*(qadus\.fr|www\.qadus\.fr)' "$_enabled" 2>/dev/null; then
      run_sudo rm -f "$_enabled"
      echo "Config en double désactivée : $_enabled"
    fi
  done < <(run_sudo find /etc/nginx/sites-enabled -maxdepth 1 \( -type f -o -type l \) 2>/dev/null || true)
}

verify_nginx_serves_new_version() {
  local _body=""
  for _attempt in 1 2 3 4 5; do
    sleep 2
    _body="$(curl -sf --max-time 15 -H "Host: www.qadus.fr" http://127.0.0.1/ 2>/dev/null || true)"
    if [ -n "$_body" ] && echo "$_body" | grep -q "07 58 42 95 10"; then
      echo "=== OK : nginx (HTTP) sert la nouvelle version ==="
      return 0
    fi
    _body="$(curl -sfk --max-time 15 -H "Host: www.qadus.fr" https://127.0.0.1/ 2>/dev/null || true)"
    if [ -n "$_body" ] && echo "$_body" | grep -q "07 58 42 95 10"; then
      echo "=== OK : nginx (HTTPS) sert la nouvelle version ==="
      return 0
    fi
    echo "tentative nginx $_attempt : ancienne version ou pas de réponse via nginx..."
  done
  return 1
}

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx absent — rien à configurer"
  exit 0
fi

echo "=== Configuration nginx Qadus → port ${QADUS_PORT} ==="

patch_qadus_nginx_files
write_site_config
disable_duplicate_qadus_sites

echo "=== Test nginx -t ==="
if ! run_sudo nginx -t; then
  echo "::error::nginx -t a échoué après mise à jour Qadus"
  run_sudo nginx -t 2>&1 || true
  exit 1
fi

run_sudo systemctl reload nginx 2>/dev/null || run_sudo service nginx reload
echo "=== nginx rechargé ==="

if ! verify_nginx_serves_new_version; then
  echo "::error::nginx ne sert pas la nouvelle version (07 58 42 95 10) — proxy probablement vers mauvais port"
  echo "Diagnostics :"
  run_sudo grep -RInE 'server_name|proxy_pass|upstream|127\.0\.0\.1:300' /etc/nginx/sites-enabled/ 2>/dev/null | head -80 || true
  ss -tlnp 2>/dev/null | grep -E ':300[0-9]' || true
  exit 1
fi
