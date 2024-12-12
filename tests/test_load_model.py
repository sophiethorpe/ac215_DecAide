from unittest.mock import patch, MagicMock
from src.api_service.main import load_model  # Adjusted the import path to match your structure

def test_load_model_success():
    """
    Test the load_model function when the model loads successfully.
    """
    with patch("tensorflow.keras.models.load_model") as mock_load_model:
        # Create a mock model object
        mock_model = MagicMock()
        
        # Simulate successful model loading
        mock_load_model.return_value = mock_model
        
        # Call the function
        result = load_model()
        
        # Assert that the model was loaded
        mock_load_model.assert_called_once_with("./best_model.h5.keras")
        
        # Assert that the returned model is the mocked model
        assert result == mock_model, "Expected the mock model to be returned"

def test_load_model_failure(caplog):
    """
    Test the load_model function when there is an error loading the model.
    """
    with patch("tensorflow.keras.models.load_model") as mock_load_model:
        # Simulate an exception when loading the model
        mock_load_model.side_effect = Exception("Model file not found.")
        
        # Call the function
        result = load_model()

        # Assert that the model was not loaded (i.e., function returns None)
        assert result is None, "Expected None when there is an error loading the model"

        # Assert that the error was logged correctly
        # caplog will capture log messages during the test
        assert "Error loading model: Model file not found." in caplog.text, \
            "Expected 'Error loading model: Model file not found.' in the log output"