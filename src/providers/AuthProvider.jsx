import React, { useContext, useEffect, useState } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  getIdTokenResult,
} from 'firebase/auth';
import { FirebaseContext } from './FirebaseProvider';
import { doc, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const children = props.children;

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;
  const db = fbContext.db;
  const [user, setUser] = useState(null);
  const [userRoles, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      console.log('onAuthStateChanged() - new User!!', authUser);
      if (authUser) {
        console.log('authuser', authUser);
        const tokenresult = await getIdTokenResult(authUser);
        setUserRole(tokenresult.claims);
        try {
          const docRef = doc(db, 'userInfo', authUser.uid);
          await updateDoc(docRef, {
            lastOnline: serverTimestamp(),
          });
        } catch (er) {
          console.log(er);
        }
      }
      setUser(authUser);
      setIsLoading(false);
    });
    return unsub;
  }, [auth]);

  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log('Logged in!!', userCred.user);
        return true;
      } else {
        console.log('Login failed!!');
        return false;
      }
    } catch (ex) {
      console.log('AUTH FAILURE', ex.message);
    }
  };

  const createUser = async (email, password, firstName, lastName) => {
    try {
      let userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCred) {
        console.log('UserCreated!!', userCred.user);
        const docRef = doc(db, 'userInfo', userCred.user.uid);
        await setDoc(docRef, {
          emailAddress: userCred.user.email,
          firstName,
          lastName,
          createdAt: serverTimestamp(),
          isPublic: true,
        });

        return 'success';
      } else {
        console.log('CreateUser failed!!');
        return false;
      }
    } catch (ex) {
      console.log('AUTH FAILURE', ex.message);
      return ex.message;
    }
  };

  //https://project3-aln.firebaseapp.com/__/auth/handler
  const logout = async () => {
    await signOut(auth);
  };

  const theValues = { user, userRoles, login, logout, createUser, isLoading };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};
