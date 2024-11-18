import unittest
import sys
import os
import importlib

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Dynamically access the `standardize_image` function
standardize_image = getattr(api_service_main, 'standardize_image', None)

class TestStandardizeImage(unittest.TestCase):
    def test_standardize_image(self):
        if not standardize_image:
            self.fail("Function 'standardize_image' not found in the module")

        # Mock or provide a test image path
        image_path = 'tests/files/test_image.jpg'
        
        # Call the actual function
        standardized_image = standardize_image(image_path)

        # Assert the output characteristics of the standardized image
        self.assertIsNotNone(standardized_image, "Standardized image should not be None")
        self.assertEqual(standardized_image.shape, (224, 224, 3), "Standardized image shape is incorrect")
        # Add additional checks if required (e.g., data type, normalization range)

if __name__ == "__main__":
    unittest.main()