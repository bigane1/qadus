#!/usr/bin/env bash
# Configure nginx pour qadus.fr → 127.0.0.1:3002
# Supporte aaPanel/BT Panel (/www/server/nginx) et nginx Debian (/etc/nginx).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
QADUS_PORT=3002
PROXY_TARGET="http://127.0.0.1:${QADUS_PORT}"

NGINX_MODE="debian"
NGINX_BIN="nginx"
NGINX_CONF=""
NGINX_MASTER_PATTERN="nginx: master process"

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

detect_nginx_env() {
  if [ -x /www/server/nginx/sbin/nginx ]; then
    NGINX_MODE="aapanel"
    NGINX_BIN="/www/server/nginx/sbin/nginx"
    NGINX_CONF="/www/server/nginx/conf/nginx.conf"
    NGINX_MASTER_PATTERN="/www/server/nginx/sbin/nginx"
    echo "=== Environnement détecté : aaPanel (/www/server/nginx) ==="
    return 0
  fi
  if command -v nginx >/dev/null 2>&1; then
    NGINX_MODE="debian"
    NGINX_BIN="nginx"
    NGINX_CONF=""
    NGINX_MASTER_PATTERN="nginx: master process"
    echo "=== Environnement détecté : nginx Debian (/etc/nginx) ==="
    return 0
  fi
  echo "nginx absent — rien à configurer"
  return 1
}

patch_proxy_in_file() {
  local _f="$1"
  [ -n "$_f" ] || return 0
  run_sudo grep -qE 'qadus\.fr|www\.qadus\.fr|proxy_pass|qadus_next' "$_f" 2>/dev/null || return 0
  run_sudo sed -i -E \
    "s#proxy_pass[[:space:]]+https?://(127\\.0\\.0\\.1|localhost):[0-9]+/?#proxy_pass ${PROXY_TARGET}#g" \
    "$_f"
  run_sudo sed -i -E \
    "s#proxy_pass[[:space:]]+https?://qadus_next/?#proxy_pass ${PROXY_TARGET}#g" \
    "$_f"
  run_sudo sed -i -E \
    "s#proxy_pass[[:space:]]+https?://[^;]+:([0-9]+)/?#proxy_pass ${PROXY_TARGET}#g" \
    "$_f" 2>/dev/null || true
  run_sudo sed -i -E \
    "s#server[[:space:]]+(127\\.0\\.0\\.1|localhost):[0-9]+;#server 127.0.0.1:${QADUS_PORT};#g" \
    "$_f"
  echo "→ proxy mis à jour : $_f"
}

disable_aapanel_qadus_extensions() {
  local _ext="/www/server/panel/vhost/nginx/extension/qadus.fr"
  if run_sudo test -d "$_ext" 2>/dev/null; then
    run_sudo mv "$_ext" "${_ext}.disabled-by-qadus-deploy" 2>/dev/null || true
    echo "Extensions aaPanel désactivées : $_ext"
  fi
}

write_aapanel_qadus_config() {
  local _dest="/www/server/panel/vhost/nginx/qadus.fr.conf"
  local _tmp
  _tmp="$(mktemp)"

  if run_sudo test -f "$_dest" 2>/dev/null; then
    run_sudo cp "$_dest" "${_dest}.bak.$(date +%s)"
  fi

  cat >"$_tmp" <<EOF
# Qadus — proxy vers Next.js PM2 (port ${QADUS_PORT})
# Réécrit par scripts/ensure-nginx-qadus.sh

upstream qadus_next {
    server 127.0.0.1:${QADUS_PORT};
    keepalive 32;
}

server {
    listen 80;
    server_name qadus.fr www.qadus.fr;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
        try_files \$uri =404;
    }

    location / {
        return 301 https://www.qadus.fr\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name qadus.fr;
    ssl_certificate /etc/letsencrypt/live/qadus.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/qadus.fr/privkey.pem;
    return 301 https://www.qadus.fr\$request_uri;
}

server {
    listen 443 ssl;
    server_name www.qadus.fr;

    ssl_certificate /etc/letsencrypt/live/qadus.fr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/qadus.fr/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    client_max_body_size 10M;

    location /_next/static/ {
        proxy_pass ${PROXY_TARGET};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Connection "";
        proxy_pass ${PROXY_TARGET};
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
        proxy_no_cache 1;
        proxy_cache_bypass 1;
    }
}
EOF

  run_sudo cp "$_tmp" "$_dest"
  rm -f "$_tmp"
  echo "Config aaPanel réécrite : $_dest"
}

patch_aapanel_qadus_vhosts() {
  local _dir _f _found=0
  local _main_conf="/www/server/panel/vhost/nginx/qadus.fr.conf"

  echo "=== Patch vhosts aaPanel (qadus.fr → ${QADUS_PORT}) ==="

  if run_sudo test -f "$_main_conf" 2>/dev/null; then
    echo "→ patch explicite $_main_conf"
    run_sudo sed -i 's|proxy_pass http://qadus_next|proxy_pass http://127.0.0.1:3002|g' "$_main_conf"
    run_sudo sed -i -E \
      "s#proxy_pass[[:space:]]+https?://(127\\.0\\.0\\.1|localhost):[0-9]+/?#proxy_pass ${PROXY_TARGET}#g" \
      "$_main_conf"
    run_sudo sed -i -E \
      "s#server[[:space:]]+(127\\.0\\.0\\.1|localhost):[0-9]+;#server 127.0.0.1:${QADUS_PORT};#g" \
      "$_main_conf"
    _found=1
  fi

  for _dir in \
    /www/server/panel/vhost/nginx \
    /www/server/panel/vhost/nginx/extension/qadus.fr \
    /www/server/nginx/conf/vhost; do
    [ -d "$_dir" ] || continue
    while IFS= read -r _f; do
      [ -n "$_f" ] || continue
      patch_proxy_in_file "$_f"
      _found=1
    done < <(run_sudo grep -rlE 'qadus\.fr|www\.qadus\.fr' "$_dir" 2>/dev/null || true)
  done
  if [ "$_found" -eq 0 ]; then
    echo "⚠ Aucun vhost aaPanel qadus.fr trouvé — recherche globale..."
    while IFS= read -r _f; do
      patch_proxy_in_file "$_f"
    done < <(run_sudo grep -rlE 'qadus\.fr|www\.qadus\.fr' /www/server/panel/vhost /www/server/nginx/conf 2>/dev/null || true)
  fi
}

write_debian_site_config() {
  local cert_dir="" DEST="/etc/nginx/sites-available/qadus" ENABLED="/etc/nginx/sites-enabled/qadus"
  if run_sudo test -f /etc/letsencrypt/live/qadus.fr/fullchain.pem 2>/dev/null; then
    cert_dir="/etc/letsencrypt/live/qadus.fr"
  elif run_sudo test -f /etc/letsencrypt/live/www.qadus.fr/fullchain.pem 2>/dev/null; then
    cert_dir="/etc/letsencrypt/live/www.qadus.fr"
  fi

  local tmp
  tmp="$(mktemp)"
  cat >"$tmp" <<EOF
# Qadus — reverse proxy nginx vers Next.js (PM2, port ${QADUS_PORT})

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
        proxy_set_header Connection "";
        proxy_pass ${PROXY_TARGET};
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }
}
EOF
  if [ -n "$cert_dir" ]; then
    cat >>"$tmp" <<EOF

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name qadus.fr www.qadus.fr;
    ssl_certificate ${cert_dir}/fullchain.pem;
    ssl_certificate_key ${cert_dir}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    client_max_body_size 10M;
    location / {
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Connection "";
        proxy_pass ${PROXY_TARGET};
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }
}
EOF
  fi
  run_sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled
  run_sudo cp "$tmp" "$DEST"
  run_sudo ln -sf "$DEST" "$ENABLED"
  rm -f "$tmp"
  echo "Config Debian installée : $DEST"
}

get_nginx_master_pid() {
  local _pid _f
  _pid="$(run_sudo pgrep -f "$NGINX_MASTER_PATTERN" 2>/dev/null | head -1 || true)"
  if [ -n "$_pid" ]; then
    echo "$_pid"
    return 0
  fi
  for _f in /run/nginx.pid /var/run/nginx.pid /www/server/nginx/logs/nginx.pid; do
    if run_sudo test -s "$_f" 2>/dev/null; then
      _pid="$(run_sudo awk 'NF{print $1; exit}' "$_f" 2>/dev/null || true)"
      if [ -n "$_pid" ] && run_sudo kill -0 "$_pid" 2>/dev/null; then
        echo "$_pid"
        return 0
      fi
    fi
  done
  return 1
}

reload_nginx() {
  echo "=== Test ${NGINX_BIN} -t ==="
  if [ -n "$NGINX_CONF" ]; then
    run_sudo "$NGINX_BIN" -t -c "$NGINX_CONF" 2>&1
  else
    run_sudo "$NGINX_BIN" -t 2>&1
  fi

  if [ -n "$NGINX_CONF" ]; then
    echo "Reload aaPanel : ${NGINX_BIN} -s reload"
    if run_sudo "$NGINX_BIN" -s reload -c "$NGINX_CONF" 2>&1; then
      sleep 1
      echo "=== nginx rechargé (reload) ==="
      return 0
    fi
  fi

  local _master=""
  if _master="$(get_nginx_master_pid)"; then
    echo "Reload nginx master PID ${_master} (kill -HUP)"
    run_sudo kill -HUP "$_master"
    sleep 1
    echo "=== nginx rechargé (HUP) ==="
    return 0
  fi

  echo "::error::master nginx introuvable pour ${NGINX_MODE}"
  run_sudo ps aux 2>/dev/null | grep '[n]ginx' || true
  return 1
}

body_has_new_version() { echo "$1" | grep -qE "06 67 25 08 85|0667250885|tel:\+33667250885|\+33667250885"; }

body_has_old_version() {
  echo "$1" | grep -qE "07 58 42 95 10|07 61 91 62 22|0758429510|0761916222"
}

curl_check() {
  local _label="$1"; shift
  local _raw _code _body
  _raw="$(curl -sL --compressed --max-time 20 -w $'\n__HTTP_CODE__:%{http_code}' "$@" 2>/dev/null || true)"
  _code="$(echo "$_raw" | sed -n 's/^__HTTP_CODE__://p' | tail -1)"
  _body="$(echo "$_raw" | sed '/^__HTTP_CODE__:/d')"
  echo "  $_label → HTTP ${_code:-?}, ${#_body} octets"
  body_has_new_version "$_body" && echo "  $_label → NOUVELLE version" && return 0
  body_has_old_version "$_body" && echo "  $_label → ANCIENNE version"
  return 1
}

verify_public_proxy() {
  local _attempt _direct_ok=false

  echo "=== Vérification app sur :${QADUS_PORT} ==="
  if curl_check "direct :${QADUS_PORT}" "http://127.0.0.1:${QADUS_PORT}/"; then
    _direct_ok=true
  else
    echo "::error::L'application ne sert pas la nouvelle version sur :${QADUS_PORT}"
    return 1
  fi

  for _attempt in 1 2 3 4 5; do
    sleep 2
    echo "=== Vérification nginx public (tentative $_attempt) ==="
    if curl_check "nginx HTTPS" --resolve "www.qadus.fr:443:127.0.0.1" "https://www.qadus.fr/"; then
      return 0
    fi
    if curl_check "nginx HTTP" -H "Host: www.qadus.fr" "http://127.0.0.1/"; then
      return 0
    fi
  done

  if [ "$_direct_ok" = true ]; then
    echo "::error::App OK sur :${QADUS_PORT} mais nginx ne sert pas la nouvelle version au public"
    echo "Sur aaPanel : sudo sed -i 's|proxy_pass http://qadus_next|proxy_pass http://127.0.0.1:3002|g' /www/server/panel/vhost/nginx/qadus.fr.conf"
    echo "Puis : sudo /www/server/nginx/sbin/nginx -s reload -c /www/server/nginx/conf/nginx.conf"
  fi
  return 1
}

print_active_config() {
  echo "=== Config active qadus (nginx -T) ==="
  if [ "$NGINX_MODE" = "aapanel" ]; then
    run_sudo "$NGINX_BIN" -T -c "$NGINX_CONF" 2>/dev/null \
      | grep -E 'server_name|proxy_pass|root |127\.0\.0\.1:300|# configuration file' \
      | grep -i -B1 -A3 qadus | head -80 || true
  else
    run_sudo nginx -T 2>/dev/null | grep -E 'server_name|proxy_pass|127\.0\.0\.1:300' | grep -i qadus | head -40 || true
  fi
}

detect_nginx_env || exit 0

echo "=== Configuration nginx Qadus → ${PROXY_TARGET} ==="

if [ "$NGINX_MODE" = "aapanel" ]; then
  disable_aapanel_qadus_extensions
  write_aapanel_qadus_config
  patch_aapanel_qadus_vhosts
else
  write_debian_site_config
fi

reload_nginx
print_active_config

if ! verify_public_proxy; then
  echo "::error::nginx ne sert pas la nouvelle version via le proxy"
  exit 1
fi

echo "=== OK : nginx sert la nouvelle version Qadus ==="
