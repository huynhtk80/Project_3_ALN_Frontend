import {
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import UserCard from './UserCard';
import 'react-multi-carousel/lib/styles.css';
import { Query } from 'firebase/database';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 6,
  },
  desktoplg: {
    breakpoint: { max: 2000, min: 1200 },
    items: 5,
  },
  desktopmd: {
    breakpoint: { max: 1200, min: 900 },
    items: 4,
  },
  desktopsm: {
    breakpoint: { max: 900, min: 680 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 680, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface UserGridProps {
  category: 'New Users' | 'New Content Creators' | 'Active Users' | 'Following';
}
function UserGrid({ category }: UserGridProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();

  const [allfound, setAllFound] = useState(false);
  const collectionRef = collection(db, 'userInfo');

  useEffect(() => {
    if (!user) return;

    let queryRef = query(collectionRef);
    if (category === 'New Users') {
      queryRef = query(
        collectionRef,

        orderBy('createdAt', 'desc'),
        limit(10)
      );
    } else if (category === 'New Content Creators') {
      queryRef = query(
        collectionRef,
        where('requestCreator', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
    } else if (category === 'Active Users') {
      queryRef = query(collectionRef, orderBy('lastOnline', 'desc'), limit(10));
    } else if (category === 'Following') {
      queryRef = query(
        collectionRef,
        where(documentId(), 'in', userProfile.following),
        // orderBy('lastOnline', 'desc'),
        limit(10)
      );
    } else {
      queryRef = query(collectionRef, limit(10));
    }

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

        if (category === 'Following') {
          setUsers(userData);
        } else {
          const removeFollowing = userData.filter((user) => {
            if (userProfile?.following?.includes(user.DOC_ID)) {
              return false;
            }
            return true;
          });

          setUsers(removeFollowing);
        }

        setLastDoc(querySnap.docs[querySnap.docs.length - 1]);
        if (querySnap.docs.length < 10) setAllFound(true);
      }
    };
    fetchData();
  }, [user, userProfile]);

  const onClickLoad = async () => {
    // let collectionRef = collection(db, 'userInfo');

    let queryRef = query(collectionRef);

    if (category === 'New Users') {
      queryRef = query(
        collectionRef,

        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    } else if (category === 'New Content Creators') {
      queryRef = query(
        collectionRef,
        where('requestCreator', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    } else if (category === 'Active Users') {
      queryRef = query(
        collectionRef,
        orderBy('lastOnline', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    } else if (category === 'Following') {
      queryRef = query(
        collectionRef,
        where(documentId(), 'in', userProfile.following),
        // orderBy('lastOnline', 'desc'),
        startAfter(lastDoc),
        limit(10)
      );
    } else {
      queryRef = query(collectionRef, startAfter(lastDoc), limit(10));
    }

    // let queryRef = query(
    //   collectionRef,
    //   orderBy('createdAt', 'desc'),
    //   startAfter(lastDoc),
    //   limit(10)
    // );

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
    <div className=' border-b-2 my-2 '>
      <h1 className='text-xl my-3 ml-3'>{category}</h1>
      {/* {users && (
        <Carousel
          responsive={responsive}
          infinite={false}
          keyBoardControl={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          swipeable={true}
          draggable={true}
          showDots={false}
          customTransition='transform 500ms ease-in-out'
          customLeftArrow={
            <ArrowLeftCircleIcon className='w-10 absolute left-4 max-w-4 top-1/2 -translate-y-[50%] cursor-pointer text-primary bg-primary-content bg opacity-50 rounded-full hover:text-info hover:bg-base-300 hover:scale-110 transition-all ease-in-out duration-300' />
          }
          customRightArrow={
            <ArrowRightCircleIcon className='w-10 absolute right-4 max-w-4 top-1/2 -translate-y-[50%] cursor-pointer text-primary bg-primary-content bg opacity-50 rounded-full hover:text-info hover:bg-base-300 hover:scale-110 transition-all ease-in-out duration-300' />
          }
        >
          {users?.map((user) => (
            <UserCard key={user.DOC_ID} userCardInfo={user} />
          ))}
        </Carousel>
      )} */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-2'>
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
      )}
    </div>
  );
}

export default UserGrid;
