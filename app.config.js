const ip = require('ip');
const dotenv = require('dotenv').config();

export default {
  name: "Mesquita Hnos - Presupuestador",
  slug: "presupuestador-mesquita-hnos",
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
  android: {
    package: "com.mesquita.presupuestador"
  },
  extra: {
    api_url: process.env.API_URL || `http://${ip.address()}:3030` //used to set up client api urls
  }
};



