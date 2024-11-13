import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Array of background images
  const backgrounds = [
    'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg'
  ];

  // State to track the current background image index
  const [bgIndex, setBgIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);  // Used to force the animation reset

  useEffect(() => {
    // Change background image every 6 seconds
    const intervalId = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setAnimationKey((prevKey) => (prevKey + 1) % backgrounds.length);  // Increment/cycle to force animation restart
    }, 15000);

    return () => clearInterval(intervalId);
  }, [backgrounds.length]);

  // Inline style to set the background image and animation
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/${backgrounds[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', // Start at the center top
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    animation: `panVertical${animationKey} 30s linear 1`, // Dynamically apply animation key
    opacity: 0.3,
    zIndex: -1,
    transition: 'background-image 2s ease-in-out',
  };

  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state to handle API call
  const [imageUrl, setImageUrl] = useState(null); // State to hold image URL for preview

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && !uploadedFile.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }

    // Create an image URL for the uploaded file and set it in state for preview
    setImageUrl(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting!");
      return;
    }

    setLoading(true); // Set loading state when the file is being submitted
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }
      const data = await response.json();
      const predictedClass = data.predicted_class;
      setPrediction(predictedClass); // Set the predicted class label
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false); // Reset loading state after the request
    }
  };

  return (
    <div className="App">
      {/* Background container */}
      <div className="background-container" style={backgroundStyle}></div>
      <h1>DecAide: The Virtual Fashion Historian</h1>
      <p><i>This tool is for celebrity stylists who need an efficient way to understand historical fashion references to style their clients 
      using clothing featured on high fashion runways.</i></p>
      <br />
      <h3>Upload an image here:</h3>
      <p><small>Supported file types: .jpg, .jpeg, .png, .webp</small></p>
      <input type="file" onChange={handleFileChange} />
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '300px', marginTop: '20px' }} />}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Predicting...' : 'Predict Year'}
      </button>
      {prediction && <h2>Predicted Year: {prediction}</h2>}
    </div>
  );
}

export default App;
