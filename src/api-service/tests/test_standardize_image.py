import unittest
import sys
import os
# Modify sys.path to include the folder containing api-service
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/api-service')))

# Now you can import as normal
from main import app

class TestStandardizeImage(unittest.TestCase):

    def test_standardize_image(self):
        # You can mock the image file or use a test image path
        image_path = 'tests/test_image.jpg'  # Provide a mock image path or mock the image input
        standardized_image = standardize_image(image_path)  # Call your actual function
        
        # Assert the type or characteristics of the standardized image
        self.assertIsNotNone(standardized_image)
        self.assertEqual(standardized_image.shape, (224, 224, 3))  # Example: Checking for image size, modify as necessary
        # Add more assertions as needed

if __name__ == "__main__":
    unittest.main()