import { user } from 'firebase-functions/v1/auth';
import {
  collection,
  query,
  where,
  onSnapshot,
  documentId,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { VideoParams } from '../utils/fireStoreAPI';
import VideoThumbCard from './VideoThumbCard';

interface VideoCardsSectionProps {
  searchUserId?: string;
  likeVideos?: string[];
}

function VideoCardsSection({
  searchUserId,
  likeVideos,
}: VideoCardsSectionProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [activeIndex, setActiveIndex] = useState(null);
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

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(collectionRef, where('userId', '==', 'unknown'));
    if (searchUserId) {
      queryRef = query(collectionRef, where('userId', '==', searchUserId));
    } else if (likeVideos && likeVideos.length > 0) {
      queryRef = query(collectionRef, where(documentId(), 'in', likeVideos));
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
        setVideos(videoData);
      }
    });
    return unsubscribe;
  }, [user, searchUserId, likeVideos]);
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
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
            />
          );
        })}
      </div>
    </div>
  );
}

export default VideoCardsSection;
