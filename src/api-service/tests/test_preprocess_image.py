import unittest
import sys
import os
import importlib
import numpy as np
from PIL import Image  # Make sure Pillow is installed

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Dynamically access the `preprocess_image` function
preprocess_image = getattr(api_service_main, 'preprocess_image', None)

class TestPreprocessImage(unittest.TestCase):
    def create_mock_image(self):
        """Creates a mock RGB image for testing."""
        # Create a 256x256 RGB image with random values
        width, height = 256, 256
        array = np.random.randint(0, 256, (height, width, 3), dtype=np.uint8)
        return Image.fromarray(array)

    def test_preprocess_image(self):
        if not preprocess_image:
            self.fail("Function 'preprocess_image' not found in the module")

        # Create a mock standardized image
        standardized_image = self.create_mock_image()

        # Preprocess the mock image
        try:
            preprocessed_image = preprocess_image(standardized_image)
        except Exception as e:
            self.fail(f"preprocess_image raised an exception: {e}")

        # Assert the image has been preprocessed correctly
        self.assertIsNotNone(preprocessed_image, "Preprocessed image should not be None")
        self.assertEqual(preprocessed_image.shape, (224, 224, 3), "Preprocessed image shape is incorrect")
        # Add additional assertions if necessary (e.g., type checks, value range)

if __name__ == "__main__":
    unittest.main()
