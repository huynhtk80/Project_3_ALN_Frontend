import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from '@firebase/firestore';
import {
  createUserWithEmailAndPassword,
  getIdTokenResult,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from './FirebaseProvider';

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

        const privateColRef = collection(docRef, 'private');
        await setDoc(doc(privateColRef, 'pdata'), {
          streetAddress: '',
          zipPostal: '',
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

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return 'success';
    } catch (err) {
      return err;
    }
  };

  const theValues = {
    user,
    userRoles,
    login,
    logout,
    createUser,
    resetPassword,
    isLoading,
  };

  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
};
