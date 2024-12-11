import Link from "next/link";

export default function About() {
  const componentColor = "#71a2c1";
  const bgColor = "#f8f2dc";
  const darktextColor = "#5b5567"
  const lighttextColor = "#f3f3eb"
  const buttonColor = "#949a89"

  const titletextStyle = {
    fontFamily: "Garamond, serif",
    color: darktextColor,
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
          <Link href="/App" style={linkStyle}>
            App
          </Link>
          <Link href="/about" style={linkStyle}>
            About
          </Link>
        </nav>
      </header>

      {/* Main */}
      <div
        style={{
          background: bgColor,
          textAlign: "left",
          padding: "10px 250px",
        }}
      >
        <h1 style={titletextStyle}>DecAide: The Virtual Fashion Historian</h1>
        <p style={regulardarktextStyle}>
            Data Pipeline

            Datasets

            The current version of images are scraped from runway images on vougue.com. Beautifulsoup and Requests-HTML packages are used. Total of 4221 shows are scraped. Among those, we scraped ~150 shows, including all years from 1988 to 2015, resulting in ~6000 runway pictures. It takes ~3 seconds to scrape a picture. We sourced this data from here. 

            Our dataset is downloaded and stored in a Google Cloud Bucket.

            Data preprocessing

            The processing pipeline is used to resize the images and make the resolutions compatible for our models. The output of this pipeline is resized jpg images. The processing is done locally using Docker containers, then the processed images can be uploaded to Google Cloud buckets.


            Data versioning

            We use DVC as our data versioning pipeline. Our DVC setup uses one remote. 

            Model training and optimisation

            Model summary


            Our model employs transfer learning, making use of a ResNet50 model initially trained on the ImageNet dataset. More information on the ResNet50 Model can be found here. A global average pooling layer was added along with a dense layer and the output layer, which outputs a year category for each image. The last ten layers of the ResNet50 model were unfrozen and trained. Categorical cross-entropy was used for the loss, Adam for the optimizer, accuracy for the metric, and the model was trained for thirty epochs.

            Training scripts and container



            Experiment Tracking

            We use Weights and Biases to track model performance, log evaluation metrics and save the final model.


            Serverless Training Pipeline
        </p>
      </div>
      
      

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
  )
}