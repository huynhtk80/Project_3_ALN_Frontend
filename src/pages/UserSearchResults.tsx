import React, { useContext, useEffect, useState } from 'react';
import SearchDropdown from '../components/SearchBar';
import {
  collection,
  where,
  onSnapshot,
  Query,
  query,
} from '@firebase/firestore';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserProfileProps } from './EditProfile';
import { useNavigate } from 'react-router';
import UserCard from '../components/UserCard';

function UserSearchResults() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  let [searchParams, setSearchParams] = useSearchParams();
  const [users, setUsers] = useState<UserProfileProps[]>();
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();

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
              if (
                users.firstName
                  ?.toUpperCase()
                  .includes(searchQuery?.toUpperCase())
              )
                return true;

              if (
                users.lastName
                  ?.toUpperCase()
                  .includes(searchQuery?.toUpperCase())
              )
                return true;

              return false;
            })
          );
        } else {
          setUsers(userData);
        }
      }
    });
    return unsubscribe;
  }, [user, searchParams]);

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
        <h2 className='text-xl my-4'>
          <span className='font-bold'>Search for:</span>{' '}
          {searchQuery && searchQuery}{' '}
          <Link className='link text-sm' to='/home/network'>
            Clear search
          </Link>
        </h2>{' '}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-2'>
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
