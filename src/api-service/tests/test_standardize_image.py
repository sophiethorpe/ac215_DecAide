import unittest
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