import React, { useContext, useEffect, useState } from 'react';
import SearchDropdown from '../components/SearchBar';
import {
    collection,
    where,
    onSnapshot,
    Query,
    query,
  } from '@firebase/firestore';
  import { useSearchParams } from 'react-router-dom';
  import { AuthContext } from '../providers/AuthProvider';
  import { FirebaseContext } from '../providers/FirebaseProvider';
  import { UserProfileProps } from './EditProfile';
  import UserCard from '../components/UserCard';
  



    function UserSearchResults() {
    const fbContext = useContext(FirebaseContext);
    const { user } = useContext(AuthContext);
    const db = fbContext.db;
    let [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState<UserProfileProps[]>();

    const searchQuery = searchParams.get('query');

    useEffect(() => {
        if (!user) return;
        let collectionRef = collection(db, 'userInfo');
    
        let queryRef = query(collectionRef);
        
        const unsubscribe = onSnapshot(queryRef, (querySnap) => {
          if (querySnap.empty) {
            console.log('No docs found');
            setUsers([]);
          } else {
            let userData = querySnap.docs.map(
              (doc) =>
                ({
                  ...doc.data(),
                  DOC_ID: doc.id,
                } as UserProfileProps)
            );
            if (searchQuery) {
                setUsers(
                  userData.filter((users) => {
                    if (users.firstName?.toUpperCase().includes(searchQuery?.toUpperCase()))
                      return true;
        
                      if (users.lastName?.toUpperCase().includes(searchQuery?.toUpperCase()))
                      return true;
        
                      return false;
                    
                  }))}

                 else { 
                setUsers(userData);
          }
        }
        });
        return unsubscribe;
      }, [user, searchParams]);
    

      return (
        <>
          <div className='pt-20 m-8'>
           
             <div className='flex flex-row flex-wrap justify-center gap-2'>
              {users?.map((user) => (
                <UserCard key={user.DOC_ID} userCardInfo={user} />
              ))}
            </div>
            {/* {!allfound && (
              <div className='flex justify-center my-5'>
                <button
                  className='btn btn-primary bg-base-200 '
                  onClick={onClickLoad}
                >
                  Load more
                </button>
              </div>
            )}  */}
          </div>
        </>
      );
    }
    
    export default UserSearchResults;


  