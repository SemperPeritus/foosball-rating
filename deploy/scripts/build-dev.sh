#!/usr/bin/env bash

test -f ormconfig.json || cat deploy/static-configs/ormconfig.dev.json > ormconfig.json

#docker-compose build foosball-rating-backend
#docker-compose build foosball-rating-frontend
