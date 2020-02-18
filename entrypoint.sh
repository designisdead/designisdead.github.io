#!/usr/bin/env bash
# entrypoint.sh
find .nuxt/ \
  -type f \
  -name '*.js' \
  -exec sed -i "s+%%API_URL%%+${API_URL:?}+g" '{}' \;

exec npm run start
