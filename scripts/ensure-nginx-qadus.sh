#!/usr/bin/env bash
# Configure nginx pour qadus.fr → 127.0.0.1:3002
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SITE_NAME="qadus"
SRC="$ROOT/scripts/nginx-qadus-site.conf"
DEST="/etc/nginx/sites-available/$SITE_NAME"
ENABLED="/etc/nginx/sites-enabled/$SITE_NAME"

if ! command -v nginx >/dev/null 2>&1; then
  echo "nginx absent — rien à configurer"
  exit 0
fi

run_sudo() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  elif command -v sudo >/dev/null 2>&1; then
    if sudo -n true 2>/dev/null; then
      sudo -n "$@"
    else
      sudo "$@"
    fi
  else
    echo "⚠ sudo absent — impossible de modifier nginx automatiquement"
    return 1
  fi
}

echo "=== Configuration nginx Qadus ==="

_qadus_files=()
while IFS= read -r _f; do
  _qadus_files+=("$_f")
done < <(run_sudo grep -rl "qadus\.fr" /etc/nginx/ 2>/dev/null || true)

if ((${#_qadus_files[@]})); then
  echo "Config existante trouvée — vérification du proxy_pass..."
  for _f in "${_qadus_files[@]}"; do
    if run_sudo grep -qE "proxy_pass|upstream" "$_f"; then
      run_sudo sed -i -E \
        's/proxy_pass[[:space:]]+http:\/\/(127\.0\.0\.1|localhost):[0-9]+[[:space:]]*;/proxy_pass http:\/\/127.0.0.1:3002;/g' \
        "$_f"
      run_sudo sed -i -E \
        's/server[[:space:]]+127\.0\.0\.1:[0-9]+;/server 127.0.0.1:3002;/g' \
        "$_f"
      echo "→ proxy upstream mis à jour dans $_f"
    fi
  done
else
  echo "Aucune config qadus.fr — installation du modèle"
  if [ ! -f "$SRC" ]; then
    echo "⚠ Fichier modèle introuvable : $SRC"
    exit 0
  fi
  run_sudo mkdir -p /etc/nginx/sites-available /etc/nginx/sites-enabled || exit 0
  run_sudo cp "$SRC" "$DEST" || exit 0
  run_sudo ln -sf "$DEST" "$ENABLED" || exit 0
fi

if run_sudo nginx -t; then
  run_sudo systemctl reload nginx || run_sudo service nginx reload || true
  echo "=== nginx rechargé — qadus.fr → port 3002 ==="
else
  echo "⚠ nginx -t a échoué — correction manuelle :"
  echo "  sudo nginx -t"
  echo "  sudo systemctl reload nginx"
fi

exit 0
