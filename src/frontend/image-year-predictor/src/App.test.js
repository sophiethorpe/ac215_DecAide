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

test('ensures the Predict Year button is disabled after click', () => {
  render(<App />);
  const predictButton = screen.getByText(/Predict Year/i);

  // Simulate clicking the Predict Year button
  fireEvent.click(predictButton);

  // Verify the Predict Year button is disabled
  expect(predictButton).toBeDisabled();
});

test('ensures the Generate Caption button is disabled after click', () => {
  render(<App />);
  const captionButton = screen.getByText(/Generate Caption/i);

  // Simulate clicking the Generate Caption button
  fireEvent.click(captionButton);

  // Verify the Generate Caption button is disabled
  expect(captionButton).toBeDisabled();
});
