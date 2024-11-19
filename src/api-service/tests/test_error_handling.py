import os
import pytest
import sys
import importlib
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed

# Add api-service directory to sys.path for module resolution
api_service_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../api-service'))
sys.path.append(api_service_path)

# Debug: print sys.path and file_path
print(f"sys.path: {sys.path}")
print(f"file_path: {file_path}")

# Dynamically import the main module
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Access the FastAPI app from the dynamically imported module
app = getattr(api_service_main, "app", None)
if app is None:
    raise ImportError("Failed to find 'app' in the dynamically imported module")
else:
    print(f"Successfully imported 'app' from {file_path}")  # Debug: Confirm app is loaded

# Set up the FastAPI TestClient
client = TestClient(app)

# Mocking the model-loading function and its predict method
@pytest.fixture(autouse=True)
def mock_model_loading():
    # Make sure to patch the path where 'load_model' is called in the app (main.py)
    with patch("api_service_main.load_model") as mock_load_model:
        # Mock the model instance and its predict method
        mock_model_instance = MagicMock()
        mock_model_instance.predict.return_value = [[0.1, 0.2, 0.7]]  # Example of a mock prediction
        mock_load_model.return_value = mock_model_instance
        yield mock_model_instance  # Provide the mock to tests

# Helper function to simulate file upload without needing a local server
def upload_file(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Test file not found: {file_path}")
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'multipart/form-data')}
        response = client.post("/predict", files=files)
    return response

# Test case for a valid image file prediction
def test_predict_valid_image(mock_model_loading):  # Accept the mock model fixture here
    valid_image_file = "tests/files/test-image.jpg"
    file_dir = os.path.dirname(valid_image_file)
    if not os.path.exists(file_dir):
        os.makedirs(file_dir, exist_ok=True)
    
    # Create a dummy image file (you could also mock image file creation here)
    with open(valid_image_file, 'wb') as f:
        f.write(b"\x89PNG\r\n\x1a\n")  # Write a simple PNG header for testing
    
    response = upload_file(valid_image_file)

    # Assert that the prediction endpoint responds correctly
    assert response.status_code == 200, "Expected 200 status code for valid image upload"
    response_json = response.json()
    assert 'predicted_class' in response_json, "Predicted class key not in response"
    assert response_json['predicted_class'] == "Mocked prediction", "Unexpected prediction result"

    # Cleanup the test file
    os.remove(valid_image_file)

# Test case for uploading a PDF file
def test_upload_pdf(mock_model_loading):  # Accept the mock model fixture here
    pdf_file = "tests/files/sample.pdf"
    file_dir = os.path.dirname(pdf_file)
    if not os.path.exists(file_dir):
        os.makedirs(file_dir, exist_ok=True)
    with open(pdf_file, 'wb') as f:
        f.write(b"%PDF-1.4")

    response = upload_file(pdf_file)

    # Assert that the response status code is 400 for bad request
    assert response.status_code == 400, "Expected 400 status code for PDF upload"
    response_json = response.json()
    assert 'error' in response_json, "Error key not in response"
    assert response_json['error'] == "Invalid image format. Please upload a valid JPG, PNG, or WEBP image.", "Unexpected error message"

    # Cleanup the test file
    os.remove(pdf_file)

# Test case for uploading an empty file
def test_upload_empty_file(mock_model_loading):  # Accept the mock model fixture here
    empty_file = "tests/files/empty.jpg"
    file_dir = os.path.dirname(empty_file)
    if not os.path.exists(file_dir):
        os.makedirs(file_dir, exist_ok=True)
    with open(empty_file, 'wb') as f:
        pass  # Create an empty file

    response = upload_file(empty_file)

    # Assert that the response status code is 400 for empty file upload
    assert response.status_code == 400, "Expected 400 status code for empty file upload"
    response_json = response.json()
    assert 'error' in response_json, "Error key not in response"
    assert response_json['error'] == "File is empty", "Unexpected error message"

    # Cleanup the test file
    os.remove(empty_file)
