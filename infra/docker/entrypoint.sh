#!/bin/sh
set -e

if [ "${RUN_SEED:-false}" = "true" ]; then
  node dist/database/seeders/seed.js || true
fi

if [ -f dist/main.js ]; then
  exec node dist/main.js
fi

if [ -f dist/src/main.js ]; then
  exec node dist/src/main.js
fi

echo "Cannot find NestJS entrypoint. Checked: dist/main.js, dist/src/main.js"
ls -la dist || true
exit 1
