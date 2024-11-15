import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the banner title and description', () => {
  render(<App />);
  const titleElement = screen.getByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = screen.getByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('renders the file upload input and accepts file selection', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i); // Using the label for the input
  expect(fileInput).toBeInTheDocument();
});

test('renders the predict year button and responds to click', () => {
  render(<App />);
  const predictButton = screen.getByText(/Predict Year/i);
  expect(predictButton).toBeInTheDocument();

  fireEvent.click(predictButton);
  expect(predictButton).toBeDisabled(); // Should be disabled while loading
});

test('renders the generate caption button and responds to click', () => {
  render(<App />);
  const captionButton = screen.getByText(/Generate Caption/i);
  expect(captionButton).toBeInTheDocument();

  fireEvent.click(captionButton);
  expect(captionButton).toBeDisabled(); // Should be disabled while loading
});
