#!/usr/bin/env bash

test -f ormconfig.json || cat ormconfig.prod.json > ormconfig.json
test -f .env || cat .env.prod > .env

docker-compose down

docker-compose build foosball-rating-backend
docker-compose build foosball-rating-frontend

docker-compose up -d
