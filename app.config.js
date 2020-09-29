const ip = require('ip');
const env_vars = require('dotenv').config();

export default {
  name: "react-native-presupuestador-typescript",
  slug: "react-native-presupuestador-typescript",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  updates: {
    fallbackToCacheTimeout: 0
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: true
  },
  extra: {
    api_url: env_vars.API_URL || `http://${ip.address()}:3030` //used to set up client api urls
  }
};



