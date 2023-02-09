import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { VideoParams } from '../utils/fireStoreAPI';
import VideoThumbCard from '../components/VideoThumbCard';

function Category() {
  const { category, country } = useParams();
  console.log(country);
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState<VideoParams[]>([
    {
      userId: '',
      title: '',
      url: '',
      thumbnail: '',
      description: '',
      collection: '',
      DOC_ID: '',
      approval: '',
      rejectMsg: '',
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(null);

  console.log(category);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef;

    if (!category) {
      queryRef = query(collectionRef);
    } else {
      queryRef = query(collectionRef, where('collection', '==', category));
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
        // if (country) {

        // }

        setVideos(videoData);
      }
    });
    return unsubscribe;
  }, [user, category]);

  return (
    <div className='p-20'>
      <div className='flex flex-row justify-center gap-5'>
        {['Film', 'Short Film', 'Documentary', 'Series'].map((cat) => (
          <Link to={`/home/Category/${cat}`}>
            <button className='btn btn-primary'>{cat}</button>
          </Link>
        ))}
      </div>
      <h1 className=' text-2xl underline m-4 '>{category}</h1>
      <div className='flex flex-row flex-wrap gap-4'>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default Category;
