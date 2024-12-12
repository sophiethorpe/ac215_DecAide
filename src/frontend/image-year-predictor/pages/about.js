import Link from "next/link";

export default function About() {
  const componentColor = "#71a2c1";
  const bgColor = "#f8f2dc";
  const darktextColor = "#5b5567"
  const lighttextColor = "#f3f3eb"
  const buttonColor = "#949a89"
  const highlightColor = "#ffb725"

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
          <Link href="/about" style={highlightStyle}>
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
        <img
          src="/developers.jpg"
          alt="Logo"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "40%",
          }}
        />
        <p style={regulardarktextStyle}>
            We are Tom, Sophie, Josha, and Paige. <br/><br/>

            The "DecAide" project is a virtual tool for celebrity stylists to access historical fashion references. By analyzing 6,000 runway images scraped from Vogue.com, the team trained a deep learning model using ResNet50 to categorize fashion looks by era. This streamlines styling for themed events like the Met Gala. The project uses Docker and Google Cloud for scalability, with plans for further model optimization and deployment. The application workflow is visualized in the figure below.

        </p>
        <img
          src="/Diagram.png"
          alt="Logo"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
          }}
        />
        <p><br/><br/><br/><br/></p>
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