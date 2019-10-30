#!/usr/bin/env bash

docker run -d --restart=always -p 80:80 -p 443:443 --network nginx-proxy -v /var/lib/certs/:/etc/nginx/certs -v /var/run/docker.sock:/tmp/docker.sock:ro --name nginx-proxy jwilder/nginx-proxy
