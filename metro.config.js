const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure for TensorFlow.js
config.resolver.assetExts.push('bin', 'txt', 'jpg', 'png', 'ttf');

module.exports = config;




