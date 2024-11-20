module.exports = {
  collectCoverage: true,                // Enable coverage collection
  coverageDirectory: 'coverage',       // Directory where the coverage files will be saved
  coverageReporters: ['json'],         // Generate coverage in JSON format
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
  },
  testEnvironment: 'jsdom',
};
