#!/usr/bin/env sh
set -e

yarn prisma migrate deploy

exec node --unhandled-rejections=strict index.js
