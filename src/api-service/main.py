from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from fastapi.middleware.cors import CORSMiddleware
import logging
import joblib

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
    logging.debug("Root endpoint hit.")
    return {"message": "API is running!"}

def load_model():
    # Load the model here instead of on startup
    logging.debug("Loading model...")
    try:
        model = tf.keras.models.load_model("best_model.h5.keras")
        logging.debug("Model loaded successfully!")
        return model
    except Exception as e:
        logging.error(f"Error loading model: {str(e)}")
        return None

def load_label_encoder():
    # Load the label encoder
    logging.debug("Loading label encoder...")
    try:
        label_encoder = joblib.load('label_encoder.pkl')
        logging.debug("Label encoder loaded successfully!")
        return label_encoder
    except Exception as e:
        logging.error(f"Error loading label encoder: {str(e)}")
        return None

def preprocess_image(image: Image.Image):
    # Preprocess the image for the model here
    image = image.convert("RGB") # Ensure the image is RGB
    image = image.resize((224, 224))  # Resize to match model input shape if needed
    image = np.array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    logging.debug("Received POST request to /predict")
    logging.debug(f"File received: {file.filename}")

    # Check if the file is a JPG image
    if not file.filename.lower().endswith(('.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a JPG image.")
    
    if model is None:
        return JSONResponse(content={"error": "Model could not be loaded."}, status_code=500)
    
    if label_encoder is None:
        return JSONResponse(content={"error": "Label encoder could not be loaded."}, status_code=500)

    try:
        # Read the image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Ensure it's a JPG image before proceeding (even if the extension is correct)
        if image.format not in ['JPEG', 'JPG']:
            raise HTTPException(status_code=400, detail="Invalid image format. Please upload a valid JPG image.")
        
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
        predicted_label = label_encoder.inverse_transform([predicted_class_index])[0]
        logging.debug(f"Predicted label: {predicted_label}")

        return JSONResponse(content={"predicted_class": str(predicted_label)})
    
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
