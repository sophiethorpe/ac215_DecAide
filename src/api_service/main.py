from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from fastapi.middleware.cors import CORSMiddleware
import logging
import joblib
from transformers import BlipProcessor, BlipForConditionalGeneration

# Initialize FastAPI app
app = FastAPI()

# Allow all origins for now, you can restrict this in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, adjust as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Add logging to see FastAPI startup
logging.basicConfig(level=logging.DEBUG)

# Initialize the image captioning model (BLIP in this case)
captioning_processor = BlipProcessor.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)
captioning_model = BlipForConditionalGeneration.from_pretrained(
    "Salesforce/blip-image-captioning-base"
)


@app.on_event("startup")
async def startup():
    logging.debug("FastAPI app is starting...")
    global model, label_encoder
    model = load_model()
    label_encoder = load_label_encoder()


@app.on_event("shutdown")
async def shutdown():
    logging.debug("FastAPI app is shutting down...")


@app.get("/")
async def read_root():
    logging.debug("Root endpoint hit. (WEB APP/API READY TO USE!!!)")
    return {"message": "API is running!"}


def load_model():
    # Load the model here instead of on startup
    logging.debug("Loading model...")
    try:
        model = tf.keras.models.load_model("./best_model.h5.keras")
        logging.debug("Model loaded successfully!")
        return model
    except Exception as e:
        logging.error(f"Error loading model: {str(e)}")
        return None


def load_label_encoder():
    # Load the label encoder
    logging.debug("Loading label encoder...")
    try:
        label_encoder = joblib.load("label_encoder.pkl")
        logging.debug("Label encoder loaded successfully!")
        return label_encoder
    except Exception as e:
        logging.error(f"Error loading label encoder: {str(e)}")
        return None


def standardize_image(image: Image.Image) -> Image.Image:
    # Convert the image to RGB and
    # re-save it to standardize format and remove metadata
    image = image.convert("RGB")
    output = io.BytesIO()
    image.save(output, format="JPEG")
    output.seek(0)
    return Image.open(output)


def preprocess_image(image: Image.Image):
    # Convert to RGB
    image = image.convert("RGB")

    # Convert the image to a TensorFlow tensor
    image = tf.convert_to_tensor(np.array(image), dtype=tf.float32)

    # Resize the image to match model input size (224x224)
    image = tf.image.resize(image, (224, 224))

    # Normalize using the mean and std for ImageNet
    mean = tf.constant([0.485, 0.456, 0.406])
    std = tf.constant([0.229, 0.224, 0.225])
    image = (image - mean) / std  # Normalize the image

    # Add batch dimension
    image = tf.expand_dims(image, axis=0)

    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    logging.debug("Received POST request to /predict")
    logging.debug(f"File received: {file.filename}")

    if model is None:
        return JSONResponse(
            content={"error": "Model could not be loaded."}, status_code=500
        )

    if label_encoder is None:
        return JSONResponse(
            content={
                "error": (
                    "Label encoder could not be loaded. "
                    "Please check the configuration."
                )
            },
            status_code=500,
        )

    try:
        # If the file is a .txt file, you can handle it separately
        if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
            logging.debug("Received a text file, not an image.")
            return JSONResponse(
                content={
                    "error": "Invalid file format."
                    "Please upload a valid JPG, PNG, or WEBP image."
                },
                status_code=400,
            )

        # Read the image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))  # Load the image
        image = standardize_image(image)  # Standardize image to strip metadata

        # Preprocess the image
        logging.debug(f"Processing image: {file.filename}")
        processed_image = preprocess_image(image)

        # Make the prediction
        logging.debug(f"Making a prediction for image: {file.filename}")
        prediction = model.predict(processed_image)
        logging.debug(f"Model prediction output: {prediction}")

        # Get the predicted class index
        predicted_class_index = np.argmax(prediction, axis=1)[0]
        logging.debug(f"Predicted class index: {predicted_class_index}")

        # Decode the prediction to a readable label
        predicted_label = label_encoder.inverse_transform(
            [predicted_class_index]
        )[0]
        logging.debug(
            f"Predicted label: {predicted_label}"
        )

        return JSONResponse(content={"predicted_class": str(predicted_label)})

    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.post("/generate-caption")
async def generate_caption(file: UploadFile = File(...)):
    logging.debug("Received POST request to /generate-caption")
    logging.debug(f"File received: {file.filename}")

    try:
        # If the file is a .txt file, you can handle it separately
        if file.content_type not in [
            "image/jpeg", "image/png", "image/webp"
        ]:
            logging.debug("Received a text file, not an image.")
            return JSONResponse(
                content={
                    "error": ("Invalid file format."
                              "Please upload a valid JPG,"
                              "PNG, or WEBP image.")
                },
                status_code=400,
            )

        # Read the image file
        contents = await file.read()

        # Load the image
        image = Image.open(io.BytesIO(contents))

        # Standardize image to strip metadata
        image = standardize_image(image)

        # Preprocess the image for caption generation
        logging.debug(
            f"Processing image for caption generation: {file.filename}"
        )
        inputs = captioning_processor(images=image, return_tensors="pt")

        # Generate caption
        output = captioning_model.generate(
            **inputs, max_new_tokens=100, temperature=0.7, num_beams=5
        )
        caption = captioning_processor.decode(output[0],
                                              skip_special_tokens=True)
        logging.debug(f"Generated caption: {caption}")

        return JSONResponse(content={"caption": caption})

    except Exception as e:
        logging.error(f"Error during caption generation: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
