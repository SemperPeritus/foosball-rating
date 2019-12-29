#!/usr/bin/env bash

test -f .env || cat deploy/env/env.stage > .env
test -f deploy/env/backend.env || cat deploy/env/backend.env.stage > deploy/env/backend.env
test -f deploy/env/frontend.env || cat deploy/env/frontend.env.stage > deploy/env/frontend.env

test -f ormconfig.json || cat deploy/static-configs/ormconfig.stage.json > ormconfig.json

cat frontend/src/constants/config.js.stage > frontend/src/constants/config.js
