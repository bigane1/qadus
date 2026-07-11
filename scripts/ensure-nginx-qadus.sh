#!/usr/bin/env bash
# Configure nginx pour qadus.fr → 127.0.0.1:3002 (HTTP + HTTPS si certificat Let's Encrypt)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_NAME="qadus"
DEST="/etc/nginx/sites-available/$SITE_NAME"
ENABLED="/etc/nginx/sites-enabled/$SITE_NAME"
QADUS_PORT=3002
PROXY_TARGET="http://127.0.0.1:${QADUS_PORT}"

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

cleanup_sites_enabled_junk() {
  echo "=== Nettoyage sites-enabled (fichiers .disabled*) ==="
  while IFS= read -r _f; do
    [ -n "$_f" ] || continue
    run_sudo rm -f "$_f"
    echo "Supprimé : $_f"
  done < <(run_sudo find /etc/nginx/sites-enabled -maxdepth 1 -name '*.disabled*' 2>/dev/null || true)
}

disable_foreign_qadus_configs() {
  local _f _real _target _name _archived
  _real="$(run_sudo readlink -f "$DEST" 2>/dev/null || echo "$DEST")"

  echo "=== Désactivation des configs qadus.fr en double ==="
  while IFS= read -r _f; do
    [ -n "$_f" ] || continue
    _target="$(run_sudo readlink -f "$_f" 2>/dev/null || echo "$_f")"
    if [ "$_target" = "$_real" ]; then
      continue
    fi
    if run_sudo grep -qE 'server_name[^;]*(qadus\.fr|www\.qadus\.fr)' "$_f" 2>/dev/null; then
      if [[ "$_f" == */sites-enabled/* ]]; then
        run_sudo rm -f "$_f"
        echo "Symlink supprimé : $_f"
      else
        _name="$(basename "$_f")"
        _archived="/etc/nginx/sites-available/${_name}.disabled-by-qadus-deploy"
        run_sudo mv -f "$_f" "$_archived" 2>/dev/null || run_sudo rm -f "$_f"
        echo "Archivé : $_f → $_archived"
      fi
    fi
  done < <(
    run_sudo find /etc/nginx/sites-enabled -maxdepth 1 \( -type f -o -type l \) 2>/dev/null || true
    run_sudo find /etc/nginx/sites-available /etc/nginx/conf.d -type f -name '*.conf' 2>/dev/null || true
  )
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
    local ssl_dhparam_line=""
    if run_sudo test -f /etc/letsencrypt/ssl-dhparams.pem 2>/dev/null; then
      ssl_dhparam_line="    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;"
    fi
    cat >>"$tmp" <<EOF

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name qadus.fr www.qadus.fr;

    ssl_certificate ${cert_dir}/fullchain.pem;
    ssl_certificate_key ${cert_dir}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
${ssl_dhparam_line}

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

body_has_new_version() {
  echo "$1" | grep -q "07 58 42 95 10"
}

body_has_old_version() {
  echo "$1" | grep -q "07 61 91 62 22"
}

curl_check() {
  local _label="$1"
  shift
  local _raw _code _body
  _raw="$(curl -sL --max-time 20 -w $'\n__HTTP_CODE__:%{http_code}' "$@" 2>/dev/null || true)"
  _code="$(echo "$_raw" | sed -n 's/^__HTTP_CODE__://p' | tail -1)"
  _body="$(echo "$_raw" | sed '/^__HTTP_CODE__:/d')"
  echo "  $_label → HTTP ${_code:-?}, ${#_body} octets"
  if body_has_new_version "$_body"; then
    echo "  $_label → NOUVELLE version"
    return 0
  fi
  if body_has_old_version "$_body"; then
    echo "  $_label → ANCIENNE version"
  fi
  return 1
}

verify_nginx_serves_new_version() {
  local _attempt
  for _attempt in 1 2 3 4 5; do
    sleep 2
    echo "=== Vérification nginx (tentative $_attempt) ==="

    curl_check "direct :${QADUS_PORT}" "http://127.0.0.1:${QADUS_PORT}/" && return 0
    curl_check "direct :${QADUS_PORT} + Host" -H "Host: www.qadus.fr" "http://127.0.0.1:${QADUS_PORT}/" && return 0
    curl_check "nginx HTTP" -H "Host: www.qadus.fr" "http://127.0.0.1/" && return 0
    curl_check "nginx HTTPS (SNI)" --resolve "www.qadus.fr:443:127.0.0.1" "https://www.qadus.fr/" && return 0
  done
  return 1
}

print_active_nginx_config() {
  echo "=== Config nginx active (qadus) ==="
  run_sudo nginx -T 2>/dev/null | grep -E 'server_name|proxy_pass|upstream|127\.0\.0\.1:300|# configuration file' | grep -i -B1 -A2 qadus || \
  run_sudo nginx -T 2>/dev/null | grep -E 'server_name|proxy_pass|127\.0\.0\.1:300' | head -60 || true
}

get_nginx_master_pid() {
  local _pid _f
  _pid="$(run_sudo pgrep -f 'nginx: master process' 2>/dev/null | head -1 || true)"
  if [ -n "$_pid" ]; then
    echo "$_pid"
    return 0
  fi
  for _f in /run/nginx.pid /var/run/nginx.pid; do
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

ports_web_in_use() {
  run_sudo ss -tln 2>/dev/null | grep -qE ':80 |:443 '
}

reload_or_restart_nginx() {
  echo "=== Test nginx -t ==="
  if ! run_sudo nginx -t 2>&1; then
    echo "::error::nginx -t a échoué après mise à jour Qadus"
    return 1
  fi

  echo "=== Rechargement nginx ==="
  local _master=""
  if _master="$(get_nginx_master_pid)"; then
    echo "nginx master PID ${_master} — signal HUP (reload config)"
    if run_sudo kill -HUP "$_master" 2>&1; then
      echo "$_master" | run_sudo tee /run/nginx.pid >/dev/null 2>&1 || true
      sleep 1
      echo "=== nginx rechargé (kill -HUP ${_master}) ==="
      return 0
    fi
    echo "kill -HUP a échoué sur PID ${_master}"
  fi

  if ports_web_in_use; then
    echo "::error::ports 80/443 occupés mais master nginx introuvable (pid file vide/corrompu ?)"
    run_sudo ss -tlnp 2>/dev/null | grep -E ':80|:443' || true
    run_sudo ps aux 2>/dev/null | grep '[n]ginx' || true
    return 1
  fi

  echo "nginx inactif — démarrage via systemctl"
  run_sudo systemctl enable nginx 2>/dev/null || true
  if run_sudo systemctl start nginx 2>&1; then
    echo "=== nginx démarré (systemctl start) ==="
    return 0
  fi

  echo "::error::nginx start a échoué"
  run_sudo systemctl status nginx --no-pager 2>&1 || true
  run_sudo journalctl -u nginx.service -n 20 --no-pager 2>&1 || true
  return 1
}

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx absent — rien à configurer"
  exit 0
fi

echo "=== Configuration nginx Qadus → ${PROXY_TARGET} ==="

cleanup_sites_enabled_junk
disable_foreign_qadus_configs
write_site_config

if ! reload_or_restart_nginx; then
  exit 1
fi

print_active_nginx_config

if ! verify_nginx_serves_new_version; then
  echo "::error::nginx ne sert pas la nouvelle version via le proxy"
  echo "Diagnostics :"
  run_sudo grep -RInE 'server_name|proxy_pass|upstream|127\.0\.0\.1:300|qadus' /etc/nginx/ 2>/dev/null | head -100 || true
  ss -tlnp 2>/dev/null | grep -E ':300[0-9]' || true
  exit 1
fi

echo "=== OK : nginx sert la nouvelle version Qadus ==="
