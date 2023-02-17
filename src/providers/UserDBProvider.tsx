import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { FirebaseContext } from './FirebaseProvider';
import { doc } from '@firebase/firestore';
import { AuthContext } from './AuthProvider';
import { UserProfileProps } from '../pages/EditProfile';
import { onSnapshot } from 'firebase/firestore';

interface UserDBContextType {
  userProfile: UserProfileProps;
}
//to do fix interface
export const UserDBContext = React.createContext<any | null>(null);

interface UserDBContextProps {
  children: React.ReactNode;
}
export const UserDBProvider = (props: UserDBContextProps) => {
  const children = props.children;
  const [userProfile, setUserProfile] = useState<UserProfileProps>({
    about: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    country: '',
    streetAddress: '',
    city: '',
    stateProvince: '',
    zipPostal: '',
    interests: [],
    photo: '',
    coverPhoto: '',
    introVideo: '',
    DOC_ID: '',
    isPublic: false,
    requestCreator: null,
  });

  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;

  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, 'userInfo', user.uid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as UserProfileProps;
        setUserProfile(userData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

    return unsubscribe;
  }, [user]);

  const theValues = { userProfile };

  return (
    <UserDBContext.Provider value={theValues}>
      {children}
    </UserDBContext.Provider>
  );
};
