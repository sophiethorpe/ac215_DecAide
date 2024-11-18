import os
import pytest
import sys
import importlib
from fastapi.testclient import TestClient
from unittest.mock import patch

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Access the FastAPI app from the dynamically imported module
app = getattr(api_service_main, "app", None)
if app is None:
    raise ImportError("Failed to find 'app' in the dynamically imported module")

# Set up the FastAPI TestClient
client = TestClient(app)

# Helper function to simulate file upload without needing a local server
def upload_invalid_file(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Test file not found: {file_path}")
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'multipart/form-data')}
        response = client.post("/predict", files=files)  # Use the FastAPI test client to make the POST request
    return response

# Test case for uploading a PDF file
def test_upload_pdf():
    pdf_file = "tests/files/sample.pdf"
    if not os.path.exists(os.path.dirname(pdf_file)):
        os.makedirs(os.path.dirname(pdf_file), exist_ok=True)
    with open(pdf_file, 'wb') as f:
        f.write(b"%PDF-1.4")  # Simulate a small PDF header for the test

    response = upload_invalid_file(pdf_file)

    # Check if the response status code is 400 for bad request
    assert response.status_code == 400, "Expected 400 status code for PDF upload"
    
    # Check if the error message is informative
    response_json = response.json()
    assert 'error' in response_json, "Error key not in response"
    assert response_json['error'] == "Unsupported file type", "Unexpected error message"

    # Cleanup the test file
    os.remove(pdf_file)

def test_upload_empty_file():
    empty_file = "tests/files/empty.jpg"
    file_dir = os.path.dirname(empty_file)
    if not os.path.exists(file_dir):
        os.makedirs(file_dir, exist_ok=True)  # Ensure directory exists
    with open(empty_file, 'wb') as f:
        pass  # Create an empty file

    response = upload_invalid_file(empty_file)

    # Check if the response status code is 400 for empty file upload
    assert response.status_code == 400, "Expected 400 status code for empty file upload"
    
    # Check if the error message is appropriate
    response_json = response.json()
    assert 'error' in response_json, "Error key not in response"
    assert response_json['error'] == "File is empty", "Unexpected error message"

    # Cleanup the test file
    os.remove(empty_file)
