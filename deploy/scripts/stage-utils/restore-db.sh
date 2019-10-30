#!/usr/bin/env bash

docker-compose exec -T PostgreSQL dropdb -U zero --if-exists foosball-rating
docker-compose exec -T PostgreSQL createdb -U zero -O zero foosball-rating
docker-compose exec -T PostgreSQL pg_restore -U zero -d foosball-rating /tmp/db-copy.dump
exit 0
