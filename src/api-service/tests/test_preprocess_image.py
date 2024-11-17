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