import React, { useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getIdTokenResult,
} from 'firebase/auth';
import { FirebaseContext } from './FirebaseProvider';
import { doc, setDoc } from '@firebase/firestore';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const children = props.children;

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;
  const [user, setUser] = useState(null);
  const [userRoles, setUserRole] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      console.log('onAuthStateChanged() - new User!!', authUser);
      if (authUser) {
        const tokenresult = await getIdTokenResult(authUser);
        setUserRole({ admin: tokenresult.claims.admin });
      }

      setUser(authUser);
    });
    return unsub;
  }, [auth]);

  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log('Logged in!!', userCred.user);
      } else {
        console.log('Login failed!!');
      }
    } catch (ex) {
      console.log('AUTH FAILURE', ex.message);
    }
  };

  const createUser = async (email, password) => {
    try {
      let userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCred) {
        console.log('UserCreated!!', userCred.user);
        const docRef = doc(db, 'userInfo', userCred.user.uid);
        await setDoc(docRef, { email: userCred.user.email });

        return true;
      } else {
        console.log('CreateUser failed!!');
        return false;
      }
    } catch (ex) {
      console.log('AUTH FAILURE', ex.message);
      return false;
    }
  };

  //https://project3-aln.firebaseapp.com/__/auth/handler
  const logout = async () => {
    await signOut(auth);
  };

  const theValues = { user, userRoles, login, logout, createUser };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};
