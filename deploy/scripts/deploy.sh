#!/usr/bin/env bash

docker-compose build foosball-rating-backend
docker-compose build foosball-rating-frontend

docker-compose down

docker-compose run foosball-rating-backend yarn run typeorm migration:run

docker-compose up -d
