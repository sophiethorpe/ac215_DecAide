import React from 'react'; // Add this line at the top
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from './App';

// Mocking the global fetch function to simulate the server responses
global.fetch = jest.fn();

beforeAll(() => {
  window.alert = jest.fn(); // Mock alert to prevent it from interrupting tests
});

test('renders banner title and description', () => {
  render(<App />);
  const titleElement = screen.getByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = screen.getByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('displays uploaded image when a valid image file is selected', async () => {
  // Mock the URL.createObjectURL to return a mock URL
  const mockImageUrl = 'mocked-url';
  global.URL.createObjectURL = jest.fn(() => mockImageUrl);

  render(<App />);

  // Select the file input and create a valid image file
  const inputFile = screen.getByLabelText(/choose file/i);
  const validImageFile = new File(['image'], 'image.jpg', { type: 'image/jpeg' });

  // Simulate file input change event
  await act(async () => {
    fireEvent.change(inputFile, { target: { files: [validImageFile] } });
  });

  // Check that the image element is rendered with the mocked URL
  const uploadedImage = screen.getByAltText(/uploaded/i);
  expect(uploadedImage).toHaveAttribute('src', mockImageUrl);
});

test('does not upload invalid file types and shows alert', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i);

  // Mock file selection with an invalid file type
  const file = new File(['test'], 'test.txt', { type: 'text/plain' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  expect(window.alert).toHaveBeenCalledWith('Please upload a valid image file.');
});

test('predicts the year when the Predict Year button is clicked', async () => {
  // Mock the fetch response for predicting year
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ predicted_class: '2023' })
  });

  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i);

  // Mock file selection
  const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  const predictButton = screen.getByRole('button', { name: /Predict Year/i });
  fireEvent.click(predictButton);

  // Wait for the prediction result to appear
  await waitFor(() => screen.getByText('2023'));

  expect(screen.getByText('2023')).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith("http://localhost:8000/predict", expect.anything());
});

test('generates a caption when the Generate Caption button is clicked', async () => {
  // Mock the fetch response for generating a caption
  fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ caption: 'A beautiful fashion design.' })
  });

  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i);

  // Mock file selection
  const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  const captionButton = screen.getByRole('button', { name: /Generate Caption/i });
  fireEvent.click(captionButton);

  // Wait for the generated caption to appear
  await waitFor(() => screen.getByText('A beautiful fashion design.'));

  expect(screen.getByText('A beautiful fashion design.')).toBeInTheDocument();
  expect(fetch).toHaveBeenCalledWith("http://localhost:8000/generate-caption", expect.anything());
});

test('disables the Predict Year button while loading', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i);

  // Mock file selection
  const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  const predictButton = screen.getByRole('button', { name: /Predict Year/i });
  fireEvent.click(predictButton);

  expect(predictButton).toBeDisabled();
});

test('disables the Generate Caption button while loading', () => {
  render(<App />);
  const fileInput = screen.getByLabelText(/Choose File/i);

  // Mock file selection
  const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
  fireEvent.change(fileInput, { target: { files: [file] } });

  const captionButton = screen.getByRole('button', { name: /Generate Caption/i });
  fireEvent.click(captionButton);

  expect(captionButton).toBeDisabled();
});