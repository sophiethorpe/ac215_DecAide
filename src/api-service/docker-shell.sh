#!/bin/bash

# Step 1: Build the Docker image
echo "Building Docker image for ARM64 platform..."
docker buildx build --platform linux/arm64 -t my_fastapi_app --load .

# Step 2: Check if the build was successful
if [ $? -ne 0 ]; then
    echo "Docker build failed. Exiting."
    exit 1
fi

# Step 3: Run the Docker container
echo "Running Docker container on port 8000..."
docker run -p 8000:8000 my_fastapi_app

