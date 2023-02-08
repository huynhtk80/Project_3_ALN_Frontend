import React from 'react';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import { getAnalytics, setUserProperties } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyAqPeb96DfaW9VM1tQK68Y3rqwCDTfyNZo',
  authDomain: 'project3-aln.firebaseapp.com',
  projectId: 'project3-aln',
  storageBucket: 'project3-aln.appspot.com',
  messagingSenderId: '262376267458',
  appId: '1:262376267458:web:28d298323a1e0e23b7255b',
  measurementId: 'G-JJGCVBPQ50',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const store = getStorage(app);
const db = getFirestore(app);
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

  const theValues = { app, auth, db, store, functions };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};
