import React from 'react';
import reportWebVitals from './reportWebVitals';
import Link from "next/link";

export default function Home() {
  const componentColor = "#71a2c1";
  const bgColor = "#f8f2dc";
  const darktextColor = "#5b5567"
  const lighttextColor = "#f3f3eb"
  const buttonColor = "#949a89"

  const titletextStyle = {
    fontFamily: "Garamond, serif",
    color: "#b53e2c",
    fontSize: "60px",
    textAlign: "center",
    letterSpacing: "1px",
  };
  const regularlighttextStyle = {
    fontFamily: "Garamond, serif",
    color: lighttextColor,
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
        backgroundColor: componentColor,
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
      
      {/* Title and Description */}
      <div
        style={{
          background: componentColor,
          color: "#fff",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <h1 style={{...titletextStyle, textShadow: "2px 1px 5px rgba(0, 0, 0, 0.3)"}}>DecAide: The Virtual Fashion Historian</h1>
        <p style={{
          fontFamily: "Garamond, serif",
          color: "#b53e2c",
          fontSize: "24px",
          textShadow: "0px 1px 1px rgba(0, 0, 0, 0.3)",
        }}>
          A tool to help celebrity stylists quickly access historical fashion
          references to style clients with runway clothing.
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
