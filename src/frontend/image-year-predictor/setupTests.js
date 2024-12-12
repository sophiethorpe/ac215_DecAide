// src/setupTests.js
import '@testing-library/jest-dom'; // Correct import for jest-dom

// Mock CSS imports
jest.mock('./App.css', () => {});

// Mock window.alert to prevent it from interrupting tests
beforeAll(() => {
    window.alert = jest.fn(); 
  });

global.URL.createObjectURL = jest.fn(() => 'mocked-url');