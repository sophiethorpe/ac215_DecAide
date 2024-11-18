import unittest
import os
import sys
import importlib

# Dynamically load the main.py module
module_name = "main"
file_path = os.path.join(os.path.dirname(__file__), '../../api-service/main.py')  # Adjust the relative path if needed
spec = importlib.util.spec_from_file_location(module_name, file_path)
api_service_main = importlib.util.module_from_spec(spec)
sys.modules[module_name] = api_service_main
spec.loader.exec_module(api_service_main)

# Access the app and functions from the dynamically loaded module
app = getattr(api_service_main, 'app', None)  # Safeguard in case 'app' is missing
load_label_encoder = getattr(api_service_main, 'load_label_encoder', None)  # Ensure dynamic attribute access

class TestLoadLabelEncoder(unittest.TestCase):
    def test_load_label_encoder(self):
        if not load_label_encoder:
            self.fail("Function 'load_label_encoder' not found in the module")

        # Call the actual load_label_encoder function
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
        # Add additional assertions to verify specific functionality or properties

if __name__ == "__main__":
    unittest.main()