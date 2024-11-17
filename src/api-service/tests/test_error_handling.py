import os
import pytest
from fastapi.testclient import TestClient
import sys
import os
import importlib
# Specify the path to your main.py file
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed

# Dynamically load the module
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Now you can access the `app` from `main.py`
app = api_service_main.app

# Set up the FastAPI TestClient
client = TestClient(app)

# Helper function to simulate file upload without needing a local server
def upload_invalid_file(file_path):
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'multipart/form-data')}
        response = client.post("/predict", files=files)  # Use the FastAPI test client to make the POST request
    return response

def test_upload_pdf():
    pdf_file = "tests/files/sample.pdf"
    response = upload_invalid_file(pdf_file)

    # Check if the response status code is 400 for bad request
    assert response.status_code == 400, "Expected 400 status code for PDF upload"
    
    # Check if the error message is informative
    assert 'error' in response.json(), "Error key not in response"
    assert response.json()['error'] == "Unsupported file type", "Unexpected error message"

def test_upload_empty_file():
    empty_file = "tests/files/empty.jpg"
    with open(empty_file, 'wb') as f:
        pass  # Create an empty file
    
    response = upload_invalid_file(empty_file)

    # Check if the response status code is 400 for bad request
    assert response.status_code == 400, "Expected 400 status code for empty file upload"
    
    # Check if the error message is appropriate
    assert 'error' in response.json(), "Error key not in response"
    assert response.json()['error'] == "File is empty", "Unexpected error message"
