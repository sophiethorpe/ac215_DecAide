import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import icon from './favicon.ico';

function App() {
  // Array of background images
  const backgrounds = [
    'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg'
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
      setAnimationKey((prevKey) => (prevKey + 1) % backgrounds.length);
    }, 15000);

    return () => clearInterval(intervalId);
  }, [backgrounds.length]);

  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/${backgrounds[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    animation: `panVertical${animationKey} 30s linear infinite`,
    opacity: 0.3,
    zIndex: -1,
    transition: 'background-image 2s ease-in-out',
  };

  const [file, setFile] = useState(null);
  const [predictedYear, setPredictedYear] = useState(null);
  const [generatedCaption, setGeneratedCaption] = useState(null);
  const [loadingYear, setLoadingYear] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && !uploadedFile.type.startsWith('image/')) {
      alert("Please upload a valid image file.");
      return;
    }
    setImageUrl(URL.createObjectURL(uploadedFile));
    setFile(uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting!");
      return;
    }

    setLoadingYear(true);
    setPredictedYear(null);
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
      setPredictedYear(data.predicted_class);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoadingYear(false);
    }
  };

  const handleCaptionSubmit = async () => {
    if (!file) {
      alert("Please upload a file before submitting!");
      return;
    }

    setLoadingCaption(true);
    setGeneratedCaption(null);
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
      setGeneratedCaption(data.caption);
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoadingCaption(false);
    }
  };
// handle favicon logo loading 

useEffect(() => {
  const intervalId = setInterval(() => {
    setBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    setAnimationKey((prevKey) => (prevKey + 1) % backgrounds.length);
  }, 15000);

  return () => clearInterval(intervalId);
}, [backgrounds.length]);

useEffect(() => {
  const link = document.querySelector("link[rel='icon']");
  if (link) {
    link.href = icon;  // Setting the favicon icon
  }
}, []);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <meta charSet="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <div className="background-container" style={backgroundStyle}></div>

      <div className="banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
  <div className="logo-container" style={{ position: 'absolute', left: '140px' }}>
    <img src={logo} alt="Logo" style={{ maxWidth: '200px', marginTop: '20px' }} />
  </div>
  <div style={{ textAlign: 'center' }}>
    <h1>DecAide: The Virtual Fashion Historian</h1>
    <p>
      <i>
        A tool to help celebrity stylists quickly access{" "}
        historical fashion references to style clients with runway clothing.
      </i>
    </p>
  </div>
</div>



      <div className="content-container">
        <div className="steps-container">
          <div className="column">
            <div className="step">
              <h3>1. Upload an image here:</h3>
              <p><small>Supported file types: .jpg, .jpeg, .png, .webp</small></p>
              <label htmlFor="file-upload" className="action-button">
                Choose File
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <div className="image-container">
                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="step">
              <h3>2. Predict the year:</h3>
              <button onClick={handleSubmit} disabled={loadingYear} className="action-button">
                {loadingYear ? 'Predicting...' : 'Predict Year'}
              </button>
              {predictedYear && <h2 className="result">{predictedYear}</h2>}
            </div>

            <div className="step">
              <h3>3. Generate a caption:</h3>
              <button onClick={handleCaptionSubmit} disabled={loadingCaption} className="action-button">
                {loadingCaption ? 'Generating Caption...' : 'Generate Caption'}
              </button>
              {generatedCaption && <p className="result">{generatedCaption}</p>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
