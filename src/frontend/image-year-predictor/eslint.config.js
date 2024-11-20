/** @type {import('eslint').FlatConfig} */
module.exports = [
  // General configuration for all files
  {
    languageOptions: {
      globals: {
        browser: true,
        es2021: true,
        node: true,
      },
      parser: require('@babel/eslint-parser'), // Use @babel/eslint-parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'], // Add the React preset
        },
      },
    },
    plugins: {
      react: require('eslint-plugin-react'), // Specify plugins as an object
    },
    rules: {
      'semi': ['error', 'always'],
      'no-console': 'warn',
      'indent': ['error', 2],
    },
  },

  // React-specific configuration
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        React: true, // If using React, you may need to define React as a global
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'error',
    },
  }
];