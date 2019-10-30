#!/usr/bin/env bash

container=$(docker-compose ps -q PostgreSQL)
docker cp /tmp/db-copy.dump $container:/tmp/db-copy.dump
