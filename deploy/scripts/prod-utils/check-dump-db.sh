#!/usr/bin/env bash

file=/tmp/db.dump
minimumSize=8
actualSize=$(du -k "$file" | cut -f 1)
if [[ ${actualSize} -ge ${minimumSize} ]]; then
    echo size is over ${minimumSize} kilobytes
    exit 0
else
    echo size is under ${minimumSize} kilobytes
    exit 1
fi
