#!/usr/bin/env bash

test -f ormconfig.json || cat ormconfig.prod.json > ormconfig.json

docker-compose build foosball-rating-backend
docker-compose build foosball-rating-frontend

docker-compose up -d
