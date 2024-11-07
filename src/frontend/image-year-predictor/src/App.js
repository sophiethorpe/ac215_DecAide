import React, { useState } from 'react';
import './App.css';

function App() {
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
