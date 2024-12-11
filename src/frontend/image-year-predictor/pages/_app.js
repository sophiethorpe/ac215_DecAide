// pages/_app.js
import './App.css'; // Adjust the path
import './index.css'; // Adjust the path
import reportWebVitals from './reportWebVitals'; // Adjust the path

function MyApp({ Component, pageProps }) {
  if (typeof window !== 'undefined') {
    reportWebVitals(); // Log performance metrics
  }

  return <Component {...pageProps} />;
}

export default MyApp;