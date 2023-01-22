import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../providers/FirebaseProvider';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

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
                console.log( 'no docs found');
            } else {
                let userInfoData = querySnap.docs.map((doc) => ({
                    ...doc.data(),
                    DOC_ID: doc.id,
                }));
                setUserInfo(userInfoData);
            }
        } catch (ex) {
            console.log('FIRESTORE FAILURE!', ex.message);
        }
    }
  
  
  
  
  
  
  
  
    return (
    <div>UserInfoData</div>
  )
}
