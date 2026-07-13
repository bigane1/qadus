#!/usr/bin/env bash
# Helpers curl pour vérifier le HTML Qadus (sans compression brotli/gzip).
# Source : source scripts/curl-check.sh

QADUS_PHONE_PATTERN='06 67 25 08 85|0667250885|tel:\+33667250885|\+33667250885'
QADUS_OLD_PHONE_PATTERN='07 58 42 95 10|07 61 91 62 22|0758429510|0761916222'

curl_fetch_html() {
  curl -sf --max-time 20 \
    -H "Accept-Encoding: identity" \
    -H "Cache-Control: no-cache" \
    "$@"
}

body_has_qadus_phone() {
  grep -qE "$QADUS_PHONE_PATTERN" <<<"$1"
}

body_version_hint_from_file() {
  local _file="$1"
  if [ ! -s "$_file" ]; then
    echo "VIDE"
  elif grep -aqE "$QADUS_PHONE_PATTERN" "$_file"; then
    echo "NOUVELLE"
  elif grep -aqE "$QADUS_OLD_PHONE_PATTERN" "$_file"; then
    echo "ANCIENNE"
  else
    echo "INCONNUE"
  fi
}

dump_html_debug() {
  local _file="$1"
  local _url="${2:-http://127.0.0.1:3002/}"
  echo "Octets réponse: $(wc -c < "$_file" | tr -d ' ')"
  echo "Headers:"
  curl -sI --max-time 10 -H "Accept-Encoding: identity" "$_url" 2>/dev/null | grep -iE 'HTTP/|content-type|content-encoding' || true
  echo "Extrait HTML:"
  head -c 400 "$_file" 2>/dev/null || true
  echo
  echo "Liens tel trouvés:"
  grep -oE 'tel:[^"<> ]+' "$_file" 2>/dev/null | head -5 || echo "(aucun)"
}
