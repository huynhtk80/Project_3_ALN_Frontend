import React, { useContext, useEffect, useState } from 'react';
import SearchDropdown from '../components/SearchBar';
import { useSearchParams } from 'react-router-dom';
import {
  collection,
  where,
  onSnapshot,
  Query,
  query,
} from '@firebase/firestore';
import { VideoParams } from '../utils/fireStoreAPI';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import VideoThumbCard from '../components/VideoThumbCard';

function SearchResults() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  let [searchParams, setSearchParams] = useSearchParams();
  const [videos, setVideos] = useState<VideoParams>();
  const [activeIndex, setActiveIndex] = useState();

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(
      collectionRef,
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff')
    );
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
        setVideos(videoData);
      }
    });
    return unsubscribe;
  }, [user, searchParams]);

  function onClickHandle(event) {}

  return (
    <div className='p-20'>
      <h1>Search Results for: {query}</h1>
      <div className='flex flex-row flex-wrap justify-evenly gap-10 text-base-content bg-base-100'>
        {videos &&
          videos.map((vid, index) => {
            console.log(vid);
            console.log(index);
            return (
              <VideoThumbCard
                url={vid.url}
                description={vid.description}
                title={vid.title}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            );
          })}
      </div>
      <button className='btn btn-primary' onClick={onClickHandle}>
        {' '}
        Button
      </button>
    </div>
  );
}

export default SearchResults;
