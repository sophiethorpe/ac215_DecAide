import pytest
import io
from PIL import Image
from src.api_service.main import standardize_image

def test_standardize_image_success():
    """
    Test standardize_image function for successfully standardizing an image (convert to RGB and remove metadata).
    """
    # Path to the test image file in the 'file/' directory
    image_path = 'tests/files/test_image.jpg'
    
    # Open the image file using PIL
    image = Image.open(image_path)
    
    # Process the image using the standardize_image function
    standardized_image = standardize_image(image)
    
    # Check that the image is converted to RGB
    assert standardized_image.mode == "RGB", f"Expected image mode to be 'RGB', but got {standardized_image.mode}"
    
    # Check that the image is still a valid image by attempting to save it to a BytesIO buffer
    output = io.BytesIO()
    standardized_image.save(output, format="JPEG")
    output.seek(0)
    
    # Re-open the image from the buffer to verify it's still valid
    reloaded_image = Image.open(output)
    
    # Check that the reloaded image is a valid RGB image
    assert reloaded_image.mode == "RGB", f"Expected reloaded image mode to be 'RGB', but got {reloaded_image.mode}"
    
    # Check that the image format is JPEG
    assert reloaded_image.format == "JPEG", f"Expected image format to be 'JPEG', but got {reloaded_image.format}"

# Failure Case
def test_standardize_image_failure():
    """
    Test preprocess_image function when image processing fails.
    """
    # Simulate an invalid image object (e.g., passing a None or invalid type)
    with pytest.raises(AttributeError):
        standardize_image(None)

  # Adjusted the import path to match your structure