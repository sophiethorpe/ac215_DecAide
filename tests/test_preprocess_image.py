import pytest
import tensorflow as tf
import numpy as np
from PIL import Image
from src.api_service.main import preprocess_image

def test_preprocess_image_success():
    """
    Test preprocess_image function for successful image preprocessing using a file.
    """
    # Path to the test image file in the 'file/' directory
    image_path = 'tests/files/test_image.jpg'
    
    # Open the image file using PIL
    image = Image.open(image_path)
    
    # Process the image using the preprocess_image function
    processed_image = preprocess_image(image)
    
    # Check that the returned processed image has the expected shape (1, 224, 224, 3)
    assert processed_image.shape == (1, 224, 224, 3), f"Expected shape (1, 224, 224, 3), but got {processed_image.shape}"
    
    # Check if the image is properly resized (224x224) and normalized
    assert processed_image.shape[1:] == (224, 224, 3), f"Expected shape (224, 224, 3), but got {processed_image.shape[1:]}"

# Failure Case
def test_preprocess_image_failure():
    """
    Test preprocess_image function when image processing fails.
    """
    # Simulate an invalid image object (e.g., passing a None or invalid type)
    with pytest.raises(AttributeError):
        preprocess_image(None)