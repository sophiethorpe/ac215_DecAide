# Use a Python 3.11 base image to ensure compatibility with your local environment
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory
COPY . /app

# Copy model and label encoder files into the container
COPY best_model.h5.keras label_encoder.pkl /app

# Update pip and install dependencies (FastAPI, Uvicorn, TensorFlow, etc.)
RUN pip install --upgrade pip && \
    pip install tensorflow==2.18.0 fastapi uvicorn numpy pillow six grpcio h5py packaging opt_einsum wheel requests python-multipart joblib scikit-learn transformers torch

# Install system dependencies for ARM64 architecture (for M3 chip compatibility) 
RUN apt update && apt install -y \
    build-essential python3-dev pkg-config zip zlib1g-dev unzip curl wget git htop \
    openjdk-17-jdk liblapack3 libblas3 libhdf5-dev npm && \
    rm -rf /var/lib/apt/lists/*

# Run the FastAPI app with Uvicorn when the container starts
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-level", "debug"]
