// src/App.test.js

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import App from '../src/frontend/image-year-predictor/src/App';

jest.useFakeTimers();

describe('App Component Tests', () => {
  // Test for background image rotation every 15 seconds
  it('should change background image every 15 seconds', () => {
    render(<App />);

    const backgroundElement = screen.getByTestId('background-container');
    expect(backgroundElement).toHaveStyle(`background-image: url(${process.env.PUBLIC_URL}/background2.jpg)`);

    act(() => {
      jest.advanceTimersByTime(15000); // 15 seconds
    });

    expect(backgroundElement).toHaveStyle(`background-image: url(${process.env.PUBLIC_URL}/background3.jpg)`);
  });

  // Test for file upload and display of image preview
  it('should handle file upload and display image preview', async () => {
    render(<App />);

    const file = new Blob(['dummy content'], { type: 'image/png' });
    const fileInput = screen.getByLabelText(/choose file/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      const imageElement = screen.getByAltText(/uploaded/i);
      expect(imageElement).toBeInTheDocument();
    });
  });

  // Test for Predict Year button click and displaying result
  it('should handle Predict Year button click and display result', async () => {
    render(<App />);

    const file = new Blob(['dummy content'], { type: 'image/png' });
    const fileInput = screen.getByLabelText(/choose file/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const predictButton = screen.getByText(/predict year/i);
    fireEvent.click(predictButton);

    await waitFor(() => {
      expect(screen.getByText(/predicting/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/predicted year/i)).toBeInTheDocument();
    });
  });

  // Test for Generate Caption button click and displaying caption
  it('should handle Generate Caption button click and display caption', async () => {
    render(<App />);

    const file = new Blob(['dummy content'], { type: 'image/png' });
    const fileInput = screen.getByLabelText(/choose file/i);
    fireEvent.change(fileInput, { target: { files: [file] } });

    const generateCaptionButton = screen.getByText(/generate caption/i);
    fireEvent.click(generateCaptionButton);

    await waitFor(() => {
      expect(screen.getByText(/generating caption/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/caption/i)).toBeInTheDocument();
    });
  });

  // Existing test for React link
  test('renders learn react link', async () => {
    render(<App />);
    const linkElement = await screen.findByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});
