#!/usr/bin/env bash

test -f .env || cat deploy/env/env.prod > .env
test -f deploy/env/backend.env || cat deploy/env/backend.env.prod > deploy/env/backend.env
test -f deploy/env/frontend.env || cat deploy/env/frontend.env.prod > deploy/env/frontend.env

test -f ormconfig.json || cat deploy/static-configs/ormconfig.prod.json > ormconfig.json

cat frontend/src/constants/config.js.prod > frontend/src/constants/config.js

#docker-compose build foosball-rating-backend
#docker-compose build foosball-rating-frontend
