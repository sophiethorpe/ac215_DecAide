import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const isAppLive = async () => {
  try {
    const response = await fetch('http://localhost:3000');
    return response.ok;
  } catch (error) {
    return false;
  }
};

let appIsLive = false;

beforeAll(async () => {
  appIsLive = await isAppLive();
});

test('renders the banner title and description', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  render(<App />);
  const titleElement = screen.finfdByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = screen.findByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('renders the file upload input and accepts file selection', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  render(<App />);
  const fileInput = screen.findByLabelText(/Choose File/i);
  expect(fileInput).toBeInTheDocument();
});

test('renders the predict year button and responds to click', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  render(<App />);
  const predictButton = screen.findByText(/Predict Year/i);
  expect(predictButton).toBeInTheDocument();

  fireEvent.click(predictButton);
  expect(predictButton).toBeDisabled();
});

test('renders the generate caption button and responds to click', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  render(<App />);
  const captionButton = screen.findByText(/Generate Caption/i);
  expect(captionButton).toBeInTheDocument();

  fireEvent.click(captionButton);
  expect(captionButton).toBeDisabled(); 
});
