import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { VideoParams } from '../utils/FireStoreAPI';
import VideoThumbCard from '../components/VideoThumbCard';

function Category() {
  const { category } = useParams();
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState<VideoParams[]>([
    {
      userId: '',
      title: '',
      url: '',
      videoFileId: '',
      thumbnail: '',
      thumbnailFileId: '',
      description: '',
      collection: '',
      DOC_ID: '',
      approval: '',
      rejectMsg: '',
    },
  ]);

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
        setVideos(videoData);
      }
    });
    return unsubscribe;
  }, [user]);

  return (
    <div className='p-20'>
      <h1>
        Coming Soon - Africa Live Network Under Construction - Beta Testing Site
      </h1>
      <p>{category}</p>
      {videos?.map((vid) => {
        return <video controls poster={vid.thumbnail} src={vid.url}></video>;
      })}
    </div>
  );
}

export default Category;
