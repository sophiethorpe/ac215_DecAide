#!/bin/bash

set -e

export IMAGE_NAME="decaide-frontend"

# Build the development image
docker build -t $IMAGE_NAME -f Dockerfile.dev .

# Run the container with volume mounting and port mapping
docker run --rm --name $IMAGE_NAME -ti \
  -v "$(pwd):/app" \
  -p 3000:3000 \
  $IMAGE_NAME
