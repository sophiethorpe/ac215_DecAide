import unittest
from unittest.mock import patch
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

class TestLoadModel(unittest.TestCase):

    # Mocking the load_model function to return a mock model instead of actually loading the real model
    @patch('src.api_service.main.load_model')  # Adjusted the patch path to match your module structure
    def test_load_model(self, mock_load_model):
        # Define what the mock should return when called
        mock_load_model.return_value = 'Mocked model'
        
        # Call the mocked load_model function
        model = load_model()
        
        # Test the behavior of the function
        self.assertEqual(model, 'Mocked model')  # Verify that the return value is what we expected
        self.assertIsNotNone(model)  # Assert that the model is not None (additional safeguard)

    def test_load_real_model(self):
        # This test will actually load the real model to check its attributes, if you don't want to mock it
        model = load_model()  # Call the real load_model function
        
        # Assert the model is loaded correctly and has essential attributes (e.g., predict method)
        self.assertIsNotNone(model)
        self.assertTrue(hasattr(model, 'predict'))  # Ensure model has a predict method or other required attributes

if __name__ == "__main__":
    unittest.main()
