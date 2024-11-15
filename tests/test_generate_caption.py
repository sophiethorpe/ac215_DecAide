import os
import pytest
import requests

API_URL = "http://localhost:5000"  # Replace with the correct API URL

# Helper function to send a POST request with an image
def upload_image_for_caption(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'multipart/form-data')}
        response = requests.post(f"{API_URL}/generate-caption", files=files)
    return response

@pytest.mark.parametrize("image_file", [
    "tests/images/sample_image.jpg",
    "tests/images/sample_image.png",
    "tests/images/sample_image.webp",
])
def test_generate_caption(image_file):
    response = upload_image_for_caption(image_file)
    
    # Check the response status code
    assert response.status_code == 200, f"Failed to generate caption with {image_file}"
    
    # Check if the response contains the expected caption data
    assert 'caption' in response.json(), "Caption key not in response"
    assert isinstance(response.json()['caption'], str), "Caption value is not a string"


