#!/usr/bin/env bash
set -e

image=hd-game-server

docker build -t $image .

docker run -p 3000:4242 -d $image
