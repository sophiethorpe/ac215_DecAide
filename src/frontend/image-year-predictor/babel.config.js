module.exports = {
    presets: [
      '@babel/preset-env', // for modern JavaScript
      '@babel/preset-react', // for JSX support
      'next/babel'
    ],
    "plugins": ["@babel/plugin-proposal-private-property-in-object"]
  };