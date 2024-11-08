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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    // Replace 'localhost:8000' with the endpoint once deployed
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setPrediction(data.predicted_year);
  };

  return (
    <div className="App">
      {/* Background container */}
      <div className="background-container" style={backgroundStyle}></div>
      <h1>DecAide: The Virtual Fashion Historian</h1>
      <p><i>This tool is for celebrity stylists who need an efficient way to understand historical fashion references to style their clients 
      using clothing featured on high fashion runways.</i></p>
      <br></br>
      <h3>Upload an image here:</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Predict Year</button>
      {prediction && <h2>Predicted Year: {prediction}</h2>}
    </div>
  );
}

export default App;
