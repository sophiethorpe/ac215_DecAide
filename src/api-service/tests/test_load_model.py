import unittest
from unittest.mock import patch, MagicMock
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

    @patch('tensorflow.keras.models.load_model')  # Patch the TensorFlow model loading
    def test_load_model(self, mock_load_model):
        # Mock the model instance and its predict method
        mock_model_instance = MagicMock()
        mock_model_instance.predict.return_value = ["Mocked prediction"]
        mock_load_model.return_value = mock_model_instance

        # Call the mocked load_model function
        model = load_model()

        # Assertions for the mocked model
        self.assertEqual(model, mock_model_instance)
        self.assertIsNotNone(model)

        # Test the predict functionality of the mocked model
        prediction = model.predict(["test input"])
        self.assertEqual(prediction, ["Mocked prediction"])
        self.assertIsInstance(prediction, list)

if __name__ == "__main__":
    unittest.main()
