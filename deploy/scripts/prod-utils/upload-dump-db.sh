#!/usr/bin/env bash

scp -i /home/player/.ssh/foosball-rating-stage /tmp/db.dump $1:/tmp/db-copy.dump
