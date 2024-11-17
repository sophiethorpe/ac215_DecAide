import unittest
import os
import sys
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

class TestLoadLabelEncoder(unittest.TestCase):

    def test_load_label_encoder(self):
        label_encoder = load_label_encoder()  # Call your actual function to load the label encoder
        
        # Assert the label encoder is loaded correctly
        self.assertIsNotNone(label_encoder)
        self.assertTrue(hasattr(label_encoder, 'transform'))  # Check if the label encoder has the transform method
        # Add more assertions as needed

if __name__ == "__main__":
    unittest.main()
