import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import icon from './favicon.ico';

function App() {
  const baseurl = "http://34.75.12.7.sslip.io/api"

  const [file, setFile] = useState(null);
  const [predictedYear, setPredictedYear] = useState(null);
  const [generatedCaption, setGeneratedCaption] = useState(null);
  const [loadingYear, setLoadingYear] = useState(false);
  const [loadingCaption, setLoadingCaption] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [debugMessage, setDebugMessage] = useState(null); // Debug message state

  const componentColor = "#71a2c1";
  const bgColor = "#f8f2dc";
  const darktextColor = "#5b5567"
  const lighttextColor = "#f3f3eb"
  const buttonColor = "#949a89"
  const highlightColor = "#ffb725"

  const titletextStyle = {
    fontFamily: "Garamond, serif",
    color: lighttextColor,
    fontSize: "54px",
    textAlign: "center",
    letterSpacing: "1px",
  };
  const regularlighttextStyle = {
    fontFamily: "Garamond, serif",
    color: lighttextColor,
    fontSize: "20px",
  };
  const regulardarktextStyle = {
    fontFamily: "Garamond, serif",
    color: darktextColor,
    fontSize: "20px",
  };

  // Shared Styles
  const componentStyle = {
    flex: "1 1 300px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    background: lighttextColor,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  };
  
  const buttonStyle = {
    fontFamily: "Garamond, serif",
    color: lighttextColor,
    fontSize: "20px",
    marginTop: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: buttonColor,
    cursor: "pointer",
    boxShadow: "4px 3px 5px rgba(0, 0, 0, 0.1)",
  };

  const navbarStyle = {
    background: componentColor,
    color: "#fff",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: "20px",
  };

  const linkStyle = {
    fontFamily: "Garamond, serif",
    color: lighttextColor,
    fontSize: "36px",
    textAlign: "center",
    textDecoration: "none",
    margin: "0 30px",
    textShadow: "1px 2px 1px rgba(0, 0, 0, 0.1)"
  };
  const highlightStyle = {
    fontFamily: "Garamond, serif",
    color: highlightColor,
    fontSize: "36px",
    textAlign: "center",
    textDecoration: "none",
    margin: "0 30px",
    textShadow: "1px 2px 1px rgba(0, 0, 0, 0.1)"
  };


  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = icon;
    }
  }, []);

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
      const response = await fetch(baseurl + "/predict", {
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
      const response = await fetch(baseurl + "/generate-caption", {
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: bgColor,
        color: '#333',
        // fontFamily: "'Arial', sans-serif",
      }}
    >
    {/* Navigation Bar */}
    <header
        style={{
          background: componentColor,
          color: "#fff",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center", // Centers items vertically in the navigation bar
          justifyContent: "space-between", // Ensures space between logo and links
        }}
      >
        {/* Logo */}
        <img
          src="/logo_decaide-removebg-preview.png"
          alt="Logo"
          style={{
            height: "150px", // Adjust the height as needed
            marginLeft: "20px", // Adds 20px space to the left of the logo
            marginRight: "auto", // Aligns the logo to the left of the navigation bar
            display: "inline-block", // Ensures proper alignment with other elements
          }}
        />

        {/* Navigation */}
        <nav style={navbarStyle}>
          <Link href="/" style={linkStyle}>
            Home
          </Link>
          <Link href="/App" style={highlightStyle}>
            App
          </Link>
          <Link href="/about" style={linkStyle}>
            About
          </Link>
        </nav>
      </header>
  
      {/* Body */}
      <main style={{ flex: "1", padding: "40px 20px" }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {/* Component 1: Image Upload */}
          <section style={componentStyle}>
            <h3 style={regulardarktextStyle}>1. Upload an image here:</h3>
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                marginTop: "10px",
                padding: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "100%",
              }}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Uploaded"
                style={{ marginTop: "20px", maxWidth: "100%" }}
              />
            )}
          </section>
  
          {/* Component 2: Predict Year */}
          <section style={componentStyle}>
            <h3 style={regulardarktextStyle}>2. Predict the year:</h3>
            <button
              onClick={handleSubmit}
              disabled={loadingYear}
              style={buttonStyle}
            >
              {loadingYear ? "Predicting..." : "Predict Year"}
            </button>
            {predictedYear && (
              <h2 style={{ marginTop: "40px", ...regulardarktextStyle }}>
                Trendy in {predictedYear}.
              </h2>
            )}
          </section>
  
          {/* Component 3: Generate Caption */}
          <section style={componentStyle}>
            <h3 style={regulardarktextStyle}>3. Generate a caption:</h3>
            <button
              onClick={handleCaptionSubmit}
              disabled={loadingCaption}
              style={buttonStyle}
            >
              {loadingCaption ? "Generating Caption..." : "Generate Caption"}
            </button>
            {generatedCaption && (
              <p style={{ marginTop: "40px", ...regulardarktextStyle }}>{generatedCaption}</p>
            )}
          </section>
        </div>
      </main>
  
      {/* Debug Section
      <div style={{ textAlign: "center", margin: "20px 0 40px 0" }}>
        <h3>Debug</h3>
        <button onClick={handleDebugClick} style={buttonStyle}>
          Fetch Debug Message
        </button>
        {debugMessage && <p style={{ marginTop: "10px" }}>{debugMessage}</p>}
      </div> */}

      <p><br/><br/><br/><br/></p>
  
      {/* Footer */}
      <footer
        style={{
          background: componentColor,
          color: "#fff",
          padding: "10px 0",
          textAlign: "center",
          marginTop: "auto", // Ensure footer stays at the bottom
        }}
      >
        <p style={regularlighttextStyle}>&copy; 2024 DecAide. All Rights Reserved.</p>
      </footer>
    </div>
  );
  
}

export default App;
