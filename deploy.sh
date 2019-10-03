#!/usr/bin/env bash

test -f ormconfig.json || cat ormconfig.prod.json > ormconfig.json

docker-compose down

docker-compose build foosball-rating-backend

docker-compose up -d
