import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  DocumentData,
} from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
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

interface UserCarouselProps {
  category: 'New Users' | 'New Content Creators' | 'Active Users';
}
function UserCarousel({ category }: UserCarouselProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'userInfo');

    let queryRef = query(collectionRef);
    if (category === 'New Users') {
      queryRef = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
    } else if (category === 'New Content Creators') {
      queryRef = query(
        collectionRef,
        where('requestCreator', '==', 'approved'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
    } else if (category === 'Active Users') {
      queryRef = query(collectionRef, orderBy('lastOnline', 'desc'), limit(10));
    } else {
      queryRef = query(collectionRef, limit(10));
    }

    const CustomRightArrow = ({ onClick, ...rest }: any) => {
      const {
        onMove,
        carouselState: { currentSlide, deviceType },
      } = rest;
      // onMove means if dragging or swiping in progress.
      return <button onClick={() => onClick()} />;
    };

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
  return (
    <>
      <h1 className='text-xl mb-3 ml-3'>{category}</h1>
      {users && (
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
      )}
    </>
  );
}

export default UserCarousel;
