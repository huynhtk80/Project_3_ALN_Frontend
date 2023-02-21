import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';

export const UserInfoData = () => {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const [userInfo, setUserInfo] = useState();

  const getUserInfoData = async () => {
    try {
      let collectionRef = collection(db, 'userInfo');
      let queryRef = query(collectionRef, orderBy('about'));
      let querySnap = await getDocs(queryRef);
      if (querySnap.empty) {
        console.log('no docs found');
      } else {
        let userInfoData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        //@ts-ignore
        setUserInfo(userInfoData);
      }
    } catch (ex) {
      if (ex instanceof Error) console.log('FIRESTORE FAILURE!', ex.message);
    }
  };

  return <div>UserInfoData</div>;
};
