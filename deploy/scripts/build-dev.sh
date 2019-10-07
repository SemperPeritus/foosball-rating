#!/usr/bin/env bash

test -f ormconfig.json || cat deploy/static-configs/ormconfig.dev.json > ormconfig.json
docker run -d --name foosball-rating-psql -p 9219:5432 -e POSTGRES_PASSWORD=zero -e POSTGRES_USER=zero -e POSTGRES_DB=foosball-rating postgres

#docker-compose build foosball-rating-backend
#docker-compose build foosball-rating-frontend
