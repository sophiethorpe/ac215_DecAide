import os
import re
import cv2
import numpy as np
import pandas as pd
from PIL import Image
import sys

def preprocess_images(input_folder, output_folder, metadata_file, batch_size=32):


    # Create output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

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

                # Read the image
                img_path = os.path.join(root, image_file)
                image = cv2.imread(img_path)

                # Check if image is read correctly
                if image is None:
                    print(f"Error reading image: {img_path}")
                    continue

                # Resize the image to 224x224
                image_resized = cv2.resize(image, (224, 224))

                # Save the processed image
                output_path = os.path.join(output_folder, image_file)  # Keep original filename
                cv2.imwrite(output_path, image_resized)

                # Append the processed filename to the list
                image_filenames.append(image_file)

        print(f"Processed images in folder: {root}")

    # Create a DataFrame from the images and labels
    try:
        prev_df = pd.read_csv(metadata_file)
    except FileNotFoundError:
        prev_df = pd.DataFrame()
    
    metadata_df = pd.DataFrame({'filename': image_filenames, 'label': labels})
    metadata_df = pd.concat([prev_df, metadata_df]).drop_duplicates(keep='first')
    metadata_df.to_csv(metadata_file, index=False)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        in_name = sys.argv[1]
    else:
        print("Please provide input folder name (no parent path).")
        sys.exit(1)

    input_folder = '../secrets/pics/' + in_name
    output_folder = '../secrets/clean_data'
    metadata_file = '../secrets/clean_metadata.csv'

    preprocess_images(input_folder, output_folder, metadata_file)