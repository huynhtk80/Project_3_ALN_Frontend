import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoCarousel from '../components/VideoCarousel';
import VideoThumbCard from '../components/VideoThumbCard';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { VideoParams } from '../utils/fireStoreAPI';

function Category() {
  const { category, country } = useParams();

  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState<VideoParams[]>([]);

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef;

    if (!category || category === 'All') {
      queryRef = query(collectionRef, where('approval', '==', 'approved'));
    } else {
      queryRef = query(
        collectionRef,
        where('collection', '==', category),
        where('approval', '==', 'approved')
      );
    }

    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setVideos([]);
      } else {
        let videoData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as VideoParams)
        );

        //Need to figure out JSfilter
        if (country) {
          const filterVids = videoData.filter((vid) =>
            vid.country?.includes(country)
          );
          setVideos(filterVids);
        } else {
          setVideos(videoData);
        }
      }
    });
    return unsubscribe;
  }, [user, category, userProfile]);

  return (
    <div className='pt-20 w-full font-bold text-5xl'>
      <div className='flex justify-center  '>
        <button className='btn btn-md btn-primary text-white md:btn-md bg-neutral transition-all duration-300'>
          <Link to={'/home'}>African Roots</Link>
        </button>
      </div>
      <div className='flex flex-row justify-center gap-5'>
        {['All', 'Film', 'Short Film', 'Documentary', 'Series', 'Podcast'].map(
          (cat) => (
            <Link key={cat} to={`/home/Category/${cat}`}>
              <button className='btn btn-primary'>{cat}</button>
            </Link>
          )
        )}
      </div>
      <h1 className=' text-2xl underline m-4 '>{category}</h1>

      {userProfile?.following?.length > 0 && (
        <div className='m-5'>
          <VideoCarousel searchQuery={'Following'} videoResults={videos} />
        </div>
      )}
      {userProfile?.likedVideos?.length > 0 && (
        <div className='m-5'>
          <VideoCarousel searchQuery={'Liked'} videoResults={videos} />
        </div>
      )}

      {userProfile?.interests?.map((interest: string) => (
        <div key={interest} className='m-5'>
          <VideoCarousel searchQuery={interest} videoResults={videos} />
        </div>
      ))}
      <h1 className='text-xl mb-3 ml-3'>Browse</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-5 mb-5'>
        {videos?.map((vid, index) => {
          return (
            <VideoThumbCard
              url={vid.url}
              title={vid.title}
              description={vid.description}
              setActiveIndex={setActiveIndex}
              index={index}
              activeIndex={activeIndex}
              docId={vid.DOC_ID}
              posterImg={vid.thumbnail}
              key={vid.DOC_ID}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Category;
