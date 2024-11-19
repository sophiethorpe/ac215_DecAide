import os
import io
import argparse
import shutil
import glob
from google.cloud import storage

gcp_project = "ac215-decaide"
bucket_name = "ac215-decaide"
clean_data_folder = "../secrets/clean_data/"
cloud_folder = "images/clean_data/"

def upload_to_gcs(folder_path, bucket_name, destination_folder):
    # Initialize the GCS client
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # Loop through all files in the folder
    for file_name in os.listdir(folder_path):
        # Check if the file has a .jpg extension
        if file_name.endswith(".jpg"):
            local_path = os.path.join(folder_path, file_name)
            destination_path = os.path.join(destination_folder, file_name)

            # Create a new blob and upload the file's content
            blob = bucket.blob(destination_path)
            
            if not blob.exists():
                blob.upload_from_filename(local_path)

if __name__ == "__main__":
    upload_to_gcs(clean_data_folder, bucket_name, cloud_folder)