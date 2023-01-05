import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAqPeb96DfaW9VM1tQK68Y3rqwCDTfyNZo',
  authDomain: 'project3-aln.firebaseapp.com',
  projectId: 'project3-aln',
  storageBucket: 'project3-aln.appspot.com',
  messagingSenderId: '262376267458',
  appId: '1:262376267458:web:28d298323a1e0e23b7255b',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export const FirebaseContext = React.createContext();

export const FirebaseProvider = (props) => {
  const { children } = props;

  const theValues = { app, auth };
  return (
    <FirebaseContext.Provider value={theValues}>
      {children}
    </FirebaseContext.Provider>
  );
};
