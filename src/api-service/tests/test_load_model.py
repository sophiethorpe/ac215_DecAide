import unittest
from unittest.mock import patch
import sys
import os
import importlib

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust path as necessary
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Access the app and functions from the dynamically loaded module
app = api_service_main.app
load_model = api_service_main.load_model

class TestLoadModel(unittest.TestCase):

    @patch('main.load_model')  # Patch based on the dynamically loaded module
    def test_load_model(self, mock_load_model):
        # Mock behavior
        mock_load_model.return_value = 'Mocked model'
        
        # Call the mocked function
        model = load_model()
        
        # Assertions
        self.assertEqual(model, 'Mocked model')
        self.assertIsNotNone(model)

    def test_load_real_model(self):
        # Call the real load_model function
        model = load_model()
        
        # Assertions for real model
        self.assertIsNotNone(model)
        self.assertTrue(hasattr(model, 'predict'), "Model lacks 'predict' method")
        # Additional checks can be added based on your model's behavior

if __name__ == "__main__":
    unittest.main()