import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import React from 'react';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
};

console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getStorage(app);
const db = getFirestore(app);
const rtdb = getDatabase(app);
const functions = getFunctions(app);
const analytics = getAnalytics(app);

if (import.meta.env.VITE_EMU_STATE === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(store, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}
export const FirebaseContext = React.createContext();

export const FirebaseProvider = (props) => {
  const { children } = props;

  const theValues = { app, auth, db, rtdb, store, functions };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};
