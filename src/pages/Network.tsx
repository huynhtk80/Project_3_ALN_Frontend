import { collection, query, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserProfileProps } from './Signin';

function Network() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'userInfo');

    let queryRef = query(collectionRef);
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setUsers(null);
      } else {
        let userData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as UserProfileProps)
        );
        setUsers(userData);
      }
    });
    return unsubscribe;
  }, [user]);
  return (
    <>
      <div className='pt-20'>
        <div className='flex flex-row flex-wrap justify-center gap-2'>
          {users?.map((user) => (
            <UserCard key={user.DOC_ID} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Network;
