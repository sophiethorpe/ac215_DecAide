import unittest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from io import BytesIO
from PIL import Image
from src.api_service.main import app  # Assuming your FastAPI app is in this module

class TestGenerateCaptionEndpoint(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)  # Initialize the FastAPI test client
        self.image_path = "tests/files/test_image.jpg"  # Path to a dummy image for testing

    @patch.dict('src.api_service.main.__dict__', {'captioning_processor': MagicMock(), 'captioning_model': MagicMock()})
    def test_generate_caption_success(self):
        # Create a fake image file (JPEG format)
        fake_image = Image.new("RGB", (100, 100), color=(255, 255, 255))
        img_byte_arr = BytesIO()
        fake_image.save(img_byte_arr, format="JPEG")
        img_byte_arr.seek(0)  # Rewind to the start of the file

        # Mock the captioning processor and model
        mock_captioning_processor = MagicMock()
        mock_captioning_model = MagicMock()

        # Simulate the image preprocessing and caption generation
        mock_captioning_processor.return_value = {'input_ids': 'mock_input'}  # Fake input to the model
        mock_captioning_model.generate.return_value = [[101, 102, 103]]  # Simulate generated token IDs
        mock_captioning_processor.decode.return_value = "A beautiful sunset over the mountains"  # Fake caption

        # Update the patch to use the mocked captioning processor and model
        with patch('src.api_service.main.captioning_processor', mock_captioning_processor), patch('src.api_service.main.captioning_model', mock_captioning_model):
            # Send the image to the generate-caption endpoint
            response = self.client.post("/generate-caption", files={"file": ("test_image.jpg", img_byte_arr, "image/jpeg")})

        # Check that the response is valid and contains the expected caption
        self.assertEqual(response.status_code, 200)
        self.assertIn("caption", response.json())
        self.assertEqual(response.json()["caption"], "A beautiful sunset over the mountains")

    @patch.dict('src.api_service.main.__dict__', {'captioning_processor': MagicMock(), 'captioning_model': MagicMock()})
    def test_generate_caption_invalid_file_format(self):
        # Create a fake text file (invalid format)
        fake_text = b"This is not an image."
        fake_text_file = BytesIO(fake_text)

        # Send an invalid file to the generate-caption endpoint
        response = self.client.post("/generate-caption", files={"file": ("test_text.txt", fake_text_file, "text/plain")})

        # Check that the response indicates the invalid file format
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())
        self.assertEqual(response.json()["error"], "Invalid file format. Please upload a valid JPG, PNG, or WEBP image.")


if __name__ == '__main__':
    unittest.main()