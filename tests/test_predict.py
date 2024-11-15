import os
import pytest
import requests

API_URL = "http://localhost:5000"  # Replace with the correct API URL

# Helper function to send a POST request with an image
def upload_image(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'multipart/form-data')}
        response = requests.post(f"{API_URL}/predict", files=files)
    return response

@pytest.mark.parametrize("image_file", [
    "tests/images/sample_image.jpg",
    "tests/images/sample_image.png",
    "tests/images/sample_image.webp",
])
def test_predict(image_file):
    response = upload_image(image_file)
    
    # Check the response status code
    assert response.status_code == 200, f"Failed to predict with {image_file}"
    
    # Check if the response contains the expected prediction data
    assert 'prediction' in response.json(), "Prediction key not in response"
    assert isinstance(response.json()['prediction'], str), "Prediction value is not a string"


