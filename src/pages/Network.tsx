import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserProfileProps } from './EditProfile';

function Network() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();
  const [allfound, setAllFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'userInfo');

    let queryRef = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    const fetchData = async () => {
      const querySnap = await getDocs(queryRef);
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
        setLastDoc(querySnap.docs[querySnap.docs.length - 1]);
      }
    };
    fetchData();
  }, [user]);

  const onClickLoad = async () => {
    let collectionRef = collection(db, 'userInfo');

    let queryRef = query(
      collectionRef,
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(10)
    );

    const querySnap = await getDocs(queryRef);
    if (querySnap.empty) {
      console.log('No docs found');
      // setUsers(null);
      setAllFound(true);
    } else {
      let userData = querySnap.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            DOC_ID: doc.id,
          } as UserProfileProps)
      );
      if (!users) return;
      setUsers([...users, ...userData]);
      setLastDoc(querySnap.docs[querySnap.docs.length - 1]);
      if (querySnap.docs.length < 10) setAllFound(true);
    }
  };

  return (
    <>
      <div className='pt-20'>
        <div className='flex flex-row flex-wrap justify-center gap-2'>
          {users?.map((user) => (
            <UserCard key={user.DOC_ID} userCardInfo={user} />
          ))}
        </div>
        {!allfound && (
          <div className='flex justify-center my-5'>
            <button className='btn btn-primary' onClick={onClickLoad}>
              Load more
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Network;
