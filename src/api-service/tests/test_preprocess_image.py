import unittest
from api_service.main import preprocess_image  # Adjusted the import path to match your structure

class TestPreprocessImage(unittest.TestCase):

    def test_preprocess_image(self):
        image_path = 'tests/test_image.jpg'  # Provide a mock image path or mock the image input
        preprocessed_image = preprocess_image(image_path)  # Call your actual function to preprocess the image
        
        # Assert the image has been preprocessed correctly
        self.assertIsNotNone(preprocessed_image)
        self.assertEqual(preprocessed_image.shape, (224, 224, 3))  # Example: checking preprocessed image size
        # Add more assertions as necessary

if __name__ == "__main__":
    unittest.main()