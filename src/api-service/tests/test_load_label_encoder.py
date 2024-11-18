import unittest
import os
import sys
import importlib
from unittest.mock import patch, MagicMock

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Access the app and functions from the dynamically loaded module
load_label_encoder = getattr(api_service_main, 'load_label_encoder', None)  # Ensure dynamic attribute access

class TestLoadLabelEncoder(unittest.TestCase):
    @patch("main.open")  # Mock the file opening
    @patch("main.pickle.load")  # Mock the pickle loading
    def test_load_label_encoder(self, mock_pickle_load, mock_open):
        if not load_label_encoder:
            self.fail("Function 'load_label_encoder' not found in the module")

        # Mock the label encoder
        mock_encoder = MagicMock()
        mock_encoder.transform = MagicMock()
        mock_encoder.fit = MagicMock()
        mock_pickle_load.return_value = mock_encoder

        # Call the actual function
        label_encoder = load_label_encoder()

        # Assert the label encoder is loaded correctly
        self.assertIsNotNone(label_encoder, "Label encoder failed to load")
        self.assertTrue(
            hasattr(label_encoder, 'transform'),
            "Loaded label encoder does not have 'transform' method"
        )
        self.assertTrue(
            hasattr(label_encoder, 'fit'),
            "Loaded label encoder does not have 'fit' method"
        )

if __name__ == "__main__":
    unittest.main()
