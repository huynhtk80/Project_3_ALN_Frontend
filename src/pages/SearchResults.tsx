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
  const [videos, setVideos] = useState<VideoParams[]>();
  const [activeIndex, setActiveIndex] = useState(null);

  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(collectionRef, where('approval', '==', 'approved'));

    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        // console.log('No docs found');
        setVideos([]);
      } else {
        let videoData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as VideoParams)
        );

        if (searchQuery) {
          setVideos(
            videoData.filter((video) => {
              if (video.titleUpper?.includes(searchQuery?.toUpperCase()))
                return true;

              if (video.descriptionUpper?.includes(searchQuery?.toUpperCase()))
                return true;

              if (
                video.collection
                  .toUpperCase()
                  ?.includes(searchQuery?.toUpperCase())
              )
                return true;

              if (video.tags) {
                const filter = video.tags.filter((tag) => {
                  return tag.toUpperCase().includes(searchQuery?.toUpperCase());
                });

                if (filter.length > 0) return true;
              }

              if (video.country) {
                const filter = video.country.filter((count) => {
                  return count
                    .toUpperCase()
                    .includes(searchQuery?.toUpperCase());
                });

                if (filter.length > 0) return true;
              }

              if (video.credits) {
                const filter = video.credits.filter((cred) => {
                  return cred.name
                    .toUpperCase()
                    .includes(searchQuery?.toUpperCase());
                });

                if (filter.length > 0) return true;
              }

              return false;
            })
          );
        } else {
          setVideos(videoData);
        }
      }
    });

    return unsubscribe;
  }, [user, searchParams]);

  return (
    <div className='p-20'>
      <h1>Search Results for: {searchQuery}</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-2'>
        {videos &&
          videos.map((vid, index) => {
            return (
              <VideoThumbCard
                url={vid.url}
                description={vid.description}
                title={vid.title}
                index={index}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
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

export default SearchResults;
