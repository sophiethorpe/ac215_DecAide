import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

test('ensures the Predict Year button is disabled after click', async () => {
  render(<App />);
  const predictButton = screen.getByText(/Predict Year/i);

  // Verify the button starts enabled
  expect(predictButton).not.toBeDisabled();

  // Simulate clicking the Predict Year button
  fireEvent.click(predictButton);

  // Wait for the button to become disabled
  await waitFor(() => {
    expect(predictButton).toBeDisabled();
  });
});

test('ensures the Generate Caption button is disabled after click', async () => {
  render(<App />);
  const captionButton = screen.getByText(/Generate Caption/i);

  // Verify the button starts enabled
  expect(captionButton).not.toBeDisabled();

  // Simulate clicking the Generate Caption button
  fireEvent.click(captionButton);

  // Wait for the button to become disabled
  await waitFor(() => {
    expect(captionButton).toBeDisabled();
  });
});
