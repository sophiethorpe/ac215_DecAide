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
  const [predictedYear, setPredictedYear] = useState(null);
  const [generatedCaption, setGeneratedCaption] = useState(null);
  const [loadingYear, setLoadingYear] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
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

    setLoadingYear(true); // Set loading state when the file is being submitted
    setPredictedYear(null); // Clear the previous prediction
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
      setPredictedYear(predictedClass); // Set the predicted class label
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoadingYear(false); // Reset loading state after the request
    }
  };

  const handleCaptionSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting!");
      return;
    }

    setLoadingCaption(true); // Set loading state when the file is being submitted
    setGeneratedCaption(null); // Clear the previous caption
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/generate-caption", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }
      const data = await response.json();
      const caption = data.caption;
      setGeneratedCaption(caption); // Set the generated caption
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoadingCaption(false); // Reset loading state after the request
    }
};


return (
  <div className="App">
    {/* Background container */}
    <div className="background-container" style={backgroundStyle}></div>
    <div className="banner">
  <h1>DecAide: The Virtual Fashion Historian</h1>
  <p><i>This tool is for celebrity stylists who need an efficient way to understand historical fashion references to style their clients 
  using clothing featured on high fashion runways.</i></p>
  </div>
    <br />
    
    <div className="content-container">
      {/* Left column: Predicted Year and Caption */}
      <div className="left-column">
      <h3>1. Upload an image here:</h3>
        <p><small>Supported file types: .jpg, .jpeg, .png, .webp</small></p>
        {/* Custom file upload button */}
    <label htmlFor="file-upload" className="action-button">
      Choose File
    </label>
    <input
      id="file-upload"
      type="file"
      onChange={handleFileChange}
      style={{ display: 'none' }} // Hide the default input
    />
        <div className="image-container">
        {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: 'auto', height: '400px', maxWidth: '400px' }} />}
    </div>
        
      </div>
      
      {/* Right column: Display uploaded image */}
<div className="right-column">
  <div className="section">
    <h3>2. Predict the year:</h3>
    <button onClick={handleSubmit} disabled={loadingYear} className="action-button">
      {loadingYear ? 'Predicting...' : 'Predict Year'}
    </button>
    {predictedYear && <h2 className="result">{`${predictedYear}`}</h2>}
  </div>

  <div className="section">
    <h3>3. Generate a caption:</h3>
    <button onClick={handleCaptionSubmit} disabled={loadingCaption} className="action-button">
      {loadingCaption ? 'Generating Caption...' : 'Generate Caption'}
    </button>
    {generatedCaption && <p className="result">{`${generatedCaption}`}</p>}
  </div>
</div>
    </div>
  </div>
);

}

export default App;
