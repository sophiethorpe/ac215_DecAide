#!/bin/bash

echo "Container is running!!!"


gcloud auth activate-service-account --key-file=$GOOGLE_APPLICATION_CREDENTIALS
echo "Google info"
echo $GOOGLE_APPLICATION_CREDENTIALS
echo $GCS_BUCKET_NAME
echo "Google info"

mkdir -p /mnt/gcs_bucket
gcsfuse --key-file=$GOOGLE_APPLICATION_CREDENTIALS --implicit-dirs $GCS_BUCKET_NAME /mnt/gcs_data
echo 'GCS bucket mounted at /mnt/gcs_data'
mkdir -p /app/decaide_data
mount --bind /mnt/gcs_data/images /app/decaide_data

pipenv shell