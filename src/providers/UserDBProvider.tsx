import { doc } from '@firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from './AuthProvider';
import { FirebaseContext } from './FirebaseProvider';

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
    city: '',
    stateProvince: '',
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
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
    return unsubscribe;
  }, [user]);

  const theValues = { userProfile };

  return (
    <UserDBContext.Provider value={theValues}>
      {children}
    </UserDBContext.Provider>
  );
};
