#!/usr/bin/env bash
set -euo pipefail

docker compose exec app npm run seed:prod

