export default {
    expo: {
    "name": "MysportInfo",
    "slug": "MysportInfo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    extra: {
       cricketApiKey: process.env.CRICKET_LIVE_API_KEY,
       footballApikey:process.env.FOOTBALL_LIVE_API_KEY,
       basketballApikey:process.env.BASKETBALL_LIVE_API_KEY,
       basketballHost:process.env.BASKETBALL_LIVE_API_HOST,
       firebaseApiKey: process.env.FIREBASE_API_KEY,
       firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
       firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
       firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
       firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
       firebaseAppId: process.env.FIREBASE_APP_ID,
      },
    },
  };
  