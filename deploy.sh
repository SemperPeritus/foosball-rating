#!/usr/bin/env bash

cat ormconfig.json.prod > ormconfig.json

docker-compose down

docker-compose build foosball-rating

docker-compose up -d
