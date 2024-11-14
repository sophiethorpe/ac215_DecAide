# Use a Python 3.11 base image for compatibility
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

# Copy model and label encoder files into the container
COPY best_model.h5.keras label_encoder.pkl /app

# Install system dependencies (modify for ARM64 compatibility if needed)
RUN apt update && \
    apt install -y build-essential python3-dev pkg-config zip zlib1g-dev unzip curl wget git htop \
    openjdk-17-jdk liblapack3 libblas3 libhdf5-dev npm && \
    rm -rf /var/lib/apt/lists/*

# Health check to ensure FastAPI is running
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:8000/ || exit 1

# Copy app source code
COPY . /app

# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-level", "debug"]
