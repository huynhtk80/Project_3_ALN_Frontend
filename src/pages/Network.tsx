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
import { useSearchParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import UserGrid from '../components/UserGrid';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserProfileProps } from './EditProfile';
import { useNavigate } from 'react-router';
import { UserDBContext } from '../providers/UserDBProvider';

function Network() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();
  const [allfound, setAllFound] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  const searchQuery = searchParams.get('query');

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const onClickSearch = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate({
        pathname: '/home/userResult',
        search: `?query=${searchValue}`,
      });
    }
  };

  const handleGoButtonClick = () => {
    navigate({
      pathname: '/home/userResult',
      search: `?query=${searchValue}`,
    });
  };

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
      <div className='pt-20 m-8'>
        <div className='flex justify-center rounded-md shadow-md'>
          <div className='input-group'>
            <input
              type='text'
              placeholder='Search ALN Profiles...'
              className='input input-primary w-full input-sm md:input-md md:w-56  lg:w-96 text-base-content placeholder-primary-content opacity-50 transition-all duration-300'
              onChange={handleChange}
              onKeyDown={onClickSearch}
            />
            <button
              className='btn btn-circle btn-sm btn-primary md:btn-md  bg-primary transition-all duration-300'
              onClick={handleGoButtonClick}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 stroke-primary-content'
                fill='none'
                viewBox='0 0 24 24'
                // stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>
          </div>
        </div>
        {userProfile?.following?.length > 0 && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-2'></div>

            <UserGrid category='Following' />
          </>
        )}
        <UserGrid category='New Users' />
        <UserGrid category='New Content Creators' />
        <UserGrid category='Active Users' />

        {/* <div className='flex flex-row flex-wrap justify-center gap-2'>
          {users?.map((user) => (
            <UserCard key={user.DOC_ID} userCardInfo={user} />
          ))}
        </div>
        {!allfound && (
          <div className='flex justify-center my-5'>
            <button
              className='btn btn-primary bg-base-200 '
              onClick={onClickLoad}
            >
              Load more
            </button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Network;
