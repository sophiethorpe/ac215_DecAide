import os
import pandas as pd
from google.cloud import storage
import re

gcp_project = "ac215-decaide"
bucket_name = "ac215-decaide"
clean_data_folder = "../../../secrets/clean_data/"
cloud_folder = "images/clean_data/"
cloud_meta_folder = ""
meta_file = "../../../secrets/clean_metadata.csv"

def get_meta(input_folder, out_file, bucket_name, destination_folder):
    labels = []
    image_filenames = []  # To store filenames of processed images

    # Walk through the directory tree
    for root, _, files in os.walk(input_folder):
        for image_file in files:
            if image_file.endswith(('.png', '.jpg', '.jpeg')):  # Check for valid image extensions
                # Use regex to find four consecutive digits in the filename
                year_match = re.search(r'\d{4}', image_file)
                year = year_match.group(0) if year_match else None  # Extract the matched year
                labels.append(year)

                # Append the processed filename to the list
                image_filenames.append(image_file)
    
    metadata_df = pd.DataFrame({'filename': image_filenames, 'label': labels})
    metadata_df.to_csv(out_file, index=False)

    # Initialize the GCS client
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    destination_path = os.path.join(destination_folder, os.path.basename(out_file))

    # Create a blob (object) in the bucket
    blob = bucket.blob(destination_path)

    # Upload the file
    blob.upload_from_filename(out_file)

    print(f"File {out_file} uploaded to {bucket_name}/{destination_path}.")


def upload_to_gcs(folder_path, bucket_name, destination_folder):
    # Initialize the GCS client
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)

    # Loop through all files in the folder
    for file_name in os.listdir(folder_path):
        # Check if the file has a .jpg extension
        if file_name.lower().endswith(('.jpg', '.png', '.jpeg')):
            local_path = os.path.join(folder_path, file_name)
            destination_path = os.path.join(destination_folder, file_name)

            # Create a new blob and upload the file's content
            blob = bucket.blob(destination_path)
            
            if not blob.exists():
                blob.upload_from_filename(local_path)

if __name__ == "__main__":
    get_meta(clean_data_folder, meta_file, bucket_name, cloud_meta_folder)
    upload_to_gcs(clean_data_folder, bucket_name, cloud_folder)