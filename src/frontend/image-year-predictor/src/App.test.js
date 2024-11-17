import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.alert = jest.fn(); // Mock alert to prevent it from interrupting tests
});

test('renders the banner title and description', () => {
  render(<App />);
  const titleElement = screen.getByText(/DecAide: The Virtual Fashion Historian/i);
  const descriptionElement = screen.getByText(/This tool is for celebrity stylists/i);

  expect(titleElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
});

test('disables the Predict Year button after click', () => {
  render(<App />);
  const predictButton = screen.getByRole('button', { name: /Predict Year/i });

  // Verify the button starts as enabled
  expect(predictButton).not.toBeDisabled();

  // Simulate clicking the Predict Year button
  fireEvent.click(predictButton);

  // Assert that the Predict Year button is disabled after the click
  expect(predictButton).toBeDisabled();
});

test('disables the Generate Caption button after click', () => {
  render(<App />);
  const captionButton = screen.getByRole('button', { name: /Generate Caption/i });

  // Verify the button starts as enabled
  expect(captionButton).not.toBeDisabled();

  // Simulate clicking the Generate Caption button
  fireEvent.click(captionButton);

  // Assert that the Generate Caption button is disabled after the click
  expect(captionButton).toBeDisabled();
});
