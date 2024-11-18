import unittest
import sys
import os
import importlib
from PIL import Image
import io

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

        # Create a mock image directly (bypassing file dependency)
        mock_image = Image.new('RGB', (256, 256), color='blue')  # Create a 256x256 RGB image

        # Call the actual function with the mock image
        try:
            standardized_image = standardize_image(mock_image)
        except Exception as e:
            self.fail(f"standardize_image raised an exception: {e}")

        # Assert the output characteristics of the standardized image
        self.assertIsNotNone(standardized_image, "Standardized image should not be None")
        self.assertEqual(standardized_image.mode, 'RGB', "Standardized image mode should be 'RGB'")
        self.assertTrue(isinstance(standardized_image, Image.Image), "Output is not a PIL.Image.Image instance")

        # Additional check: Ensure that the image is saved in JPEG format (this can be inferred from the standardization)
        output = io.BytesIO()
        standardized_image.save(output, format="JPEG")
        self.assertGreater(len(output.getvalue()), 0, "JPEG image should have content")

if __name__ == "__main__":
    unittest.main()
