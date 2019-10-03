#!/usr/bin/env bash

cat ormconfig.prod.json > ormconfig.json

docker-compose down

docker-compose build foosball-rating

docker-compose up -d
