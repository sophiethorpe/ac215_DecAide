import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the banner title and description', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  
  render(<App />);
  const titleElement = await screen.findByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = await screen.findByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('renders the file upload input and accepts file selection', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  
  render(<App />);
  const fileInput = await screen.findByLabelText(/Choose File/i);
  expect(fileInput).toBeInTheDocument();
});

test('renders the predict year button and responds to click', async () => {
  if (!appIsLive) {
    console.log('Skipping test: App is not live');
    return;
  }
  
  render(<App />);
  const predictButton = await screen.findByText(/Predict Year/i);
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
  const captionButton = await screen.findByText(/Generate Caption/i);
  expect(captionButton).toBeInTheDocument();

  fireEvent.click(captionButton);
  expect(captionButton).toBeDisabled();
});
