import unittest
from fastapi.testclient import TestClient
from src.api_service.main import app  # Correct import for FastAPI app
from unittest.mock import patch, MagicMock
from io import BytesIO

class TestPredictEndpoint(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)  # Create a test client for FastAPI

    def setUp(self):
        # Prepare a mock image for testing
        self.image_path = "tests/files/test_image.jpg"
        with open(self.image_path, 'rb') as f:
            self.test_image = BytesIO(f.read())


    @patch.dict('src.api_service.main.__dict__', {'model': MagicMock(), 'label_encoder': MagicMock()})
    def test_predict_success(self):
        # Mock the model's predict method to return a fake prediction
        mock_model = MagicMock()
        mock_label_encoder = MagicMock()

        # Simulate label encoding where index 1 corresponds to the label '2020'
        mock_label_encoder.inverse_transform.return_value = ['2020']

        # Update the patch to use the mocked model and label_encoder
        with patch('src.api_service.main.model', mock_model), patch('src.api_service.main.label_encoder', mock_label_encoder):
            # Send the image to the predict endpoint
            with open(self.image_path, 'rb') as img_file:
                response = self.client.post("/predict", files={"file": ("image.jpg", img_file, "image/jpeg")})

            # Check that the response is valid and contains the expected output
            self.assertEqual(response.status_code, 200)
            self.assertIn("predicted_class", response.json())
            self.assertEqual(response.json()["predicted_class"], '2020')

    @patch.dict('src.api_service.main.__dict__', {'model': MagicMock(), 'label_encoder': MagicMock()})
    def test_invalid_image_format(self):
        # Mock the model to avoid loading the actual model
        mock_model = MagicMock()
        mock_model.predict.return_value = None

        # Send an unsupported file format (txt file) to the predict endpoint
        with open("tests/files/image.txt", 'rb') as img_file:
            response = self.client.post("/predict", files={"file": ("image.txt", img_file, "text/plain")})

        # Check for an invalid format error
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        self.assertEqual(response.json()["error"], "Invalid file format. Please upload a valid JPG, PNG, or WEBP image.")
    
    @patch.dict('src.api_service.main.__dict__', {'model': MagicMock(), 'label_encoder': MagicMock()})
    def test_predict_model_failure(self):
        # Simulate model loading failure
        mock_model = MagicMock()
        mock_label_encoder = MagicMock()

        mock_model.predict.side_effect = Exception("Model prediction error")
        mock_label_encoder.inverse_transform.return_value = ['error']

        # Update the patch to use the mock model and label_encoder
        with patch('src.api_service.main.model', mock_model), patch('src.api_service.main.label_encoder', mock_label_encoder):
            # Send a valid image to the predict endpoint
            with open(self.image_path, 'rb') as img_file:
                response = self.client.post("/predict", files={"file": ("image.jpg", img_file, "image/jpeg")})

            # Check for the internal server error due to model failure
            self.assertEqual(response.status_code, 500)
            self.assertIn("error", response.json())
            self.assertEqual(response.json()["error"], "Model prediction error")


if __name__ == '__main__':
    unittest.main()

