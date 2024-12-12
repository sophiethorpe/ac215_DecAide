import joblib
from unittest.mock import patch, MagicMock
from src.api_service.main import load_label_encoder

def test_load_label_encoder_success():
    """
    Test the load_label_encoder function for the success case.
    """
    # Mock the joblib.load function to return a mocked label encoder
    with patch("joblib.load") as mock_load:
        # Simulate a successful label encoder load by returning a mocked label encoder object
        mock_label_encoder = "mocked_label_encoder"
        mock_load.return_value = mock_label_encoder
        
        # Call the load_label_encoder function
        result = load_label_encoder()

        # Assert that the label encoder returned is the mocked value
        assert result == mock_label_encoder, "Expected label encoder to be loaded successfully"
        
        # Assert that the joblib.load function was called with the correct file path
        mock_load.assert_called_once_with('label_encoder.pkl')


def test_load_label_encoder_failure(caplog):
    """
    Test the load_label_encoder function when there is an error loading the label encoder.
    """
    with patch("joblib.load") as mock_load:
        # Simulate an exception when loading the label encoder
        mock_load.side_effect = Exception("Label encoder file not found.")
        
        # Call the function
        result = load_label_encoder()

        # Assert that the label encoder was not loaded (i.e., function returns None)
        assert result is None, "Expected None when there is an error loading the label encoder"

        # Assert that the error was logged correctly
        # caplog will capture log messages during the test
        assert "Error loading label encoder: Label encoder file not found." in caplog.text, \
            "Expected 'Error loading label encoder: Label encoder file not found.' in the log output"