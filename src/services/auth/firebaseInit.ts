import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

import Vue from 'vue';
import VueFire from 'vuefire';

export function getFirebaseApp(name = 'daikin'): firebase.app.App {
  if (firebase.apps.length > 0) {
    const app = firebase.apps.find((a) => a.name === name);
    if (app) {
      return app;
    }
  }
  Vue.use(VueFire);

  return firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }, name);
}
