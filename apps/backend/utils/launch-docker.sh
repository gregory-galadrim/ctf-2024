#!/bin/bash

instance_name="$(tr -dc A-Ya-y </dev/urandom | head -c 32)"

# Run the docker
timeout --preserve-status -s 9 5 \
        docker run                                                \
        --memory-reservation 64mb                                 \
        --memory 80mb                                             \
        --mount type=bind,source=`pwd`,target=/tmp/out            \
        --network none                                            \
        --name $instance_name --rm                                \
        "ctf:latest" /bin/sh /tmp/run/run.sh "$1"
