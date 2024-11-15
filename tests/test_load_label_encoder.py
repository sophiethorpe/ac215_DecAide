import unittest
from src.frontend.image-year-predictor import load_label_encoder  # adjust the import path to your function

class TestLoadLabelEncoder(unittest.TestCase):

    def test_load_label_encoder(self):
        label_encoder = load_label_encoder()  # Call your actual function to load the label encoder
        
        # Assert the label encoder is loaded correctly
        self.assertIsNotNone(label_encoder)
        self.assertTrue(hasattr(label_encoder, 'transform'))  # Check if the label encoder has the transform method
        # Add more assertions as needed

if __name__ == "__main__":
    unittest.main()
