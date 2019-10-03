#!/usr/bin/env bash

cat ormconfig.json.prod > ormconfig.json

docker-compose down --rmi local
docker-compose up -d
