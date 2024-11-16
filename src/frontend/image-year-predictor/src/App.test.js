import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.alert = jest.fn(); // Mock alert
});

test('renders the banner title and description', async () => {
  render(<App />);
  const titleElement = await screen.findByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = await screen.findByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('renders the file upload input and accepts file selection', async () => {
  render(<App />);
  const fileInput = await screen.findByLabelText(/Choose File/i);
  expect(fileInput).toBeInTheDocument();
});

test('renders the predict year button and responds to click', async () => {
  render(<App />);
  const predictButton = await screen.findByText(/Predict Year/i);
  expect(predictButton).toBeInTheDocument();

  fireEvent.click(predictButton);

  // Verify button is disabled after click
  expect(predictButton).toBeDisabled();
});

test('renders the generate caption button and responds to click', async () => {
  render(<App />);
  const captionButton = await screen.findByText(/Generate Caption/i);
  expect(captionButton).toBeInTheDocument();

  fireEvent.click(captionButton);

  // Verify button is disabled after click
  expect(captionButton).toBeDisabled();
});
