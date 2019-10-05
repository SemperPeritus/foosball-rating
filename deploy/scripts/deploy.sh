#!/usr/bin/env bash

docker-compose build foosball-rating-backend
docker-compose build foosball-rating-frontend

docker-compose up -d
