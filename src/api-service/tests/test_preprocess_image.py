import unittest
import sys
import os
import importlib
from PIL import Image  # Make sure Pillow is installed

# Correctly load the image from the file path
def standardize_image(image_path: str) -> Image.Image:
    # Open the image file
    image = Image.open(image_path)
    
    # Convert the image to RGB and re-save it to standardize format and remove metadata
    image = image.convert("RGB")
    return image

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
    def test_preprocess_image(self):
        if not preprocess_image:
            self.fail("Function 'preprocess_image' not found in the module")

        # Mock or provide a test image path
        image_path = 'tests/files/test_image.jpg'
        
        # Use standardize_image to standardize the test image
        try:
            standardized_image = standardize_image(image_path)
        except Exception as e:
            self.fail(f"standardize_image raised an exception: {e}")
        
        # Now use preprocess_image with the standardized image
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