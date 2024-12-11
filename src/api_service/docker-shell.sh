#!/bin/bash

# exit immediately if a command exits with a non-zero status
set -e

# Define some environment variables
export IMAGE_NAME="decaide-app-api-service"
export BASE_DIR=$(pwd)
export SECRETS_DIR=$(pwd)/../../secrets/
export PERSISTENT_DIR=$(pwd)/../../persistent-folder/
export GCP_PROJECT="ac215-decaide" # CHANGE TO YOUR PROJECT ID

# Create the network if we don't have it yet
docker network inspect decaide-app-network >/dev/null 2>&1 || docker network create decaide-app-network

# Build the image based on the Dockerfile
#docker build -t $IMAGE_NAME -f Dockerfile .
# M1/2 chip macs use this line
docker build -t $IMAGE_NAME --platform=linux/arm64/v8 -f Dockerfile .

# Run the container
docker run --rm --name $IMAGE_NAME -ti \
-v "$BASE_DIR":/app \
-v "$SECRETS_DIR":/secrets \
-v "$PERSISTENT_DIR":/persistent \
-p 9000:9000 \
-e DEV=1 \
-e GOOGLE_APPLICATION_CREDENTIALS=/secrets/ml-workflow.json \
-e GCP_PROJECT=$GCP_PROJECT \
--network decaide-app-network \
$IMAGE_NAME