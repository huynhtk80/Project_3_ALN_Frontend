import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import playLogo from '../assets/ALN_LOGO-3-48_sm.png';

import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { VideoParams } from '../utils/fireStoreAPI';

interface UploadVidDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  docId: string;
}

function VideoDetails({ setShowModal, docId }: UploadVidDetailProps) {
  const [videoDetails, setVideoDetails] = useState<VideoParams>();
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;

  useEffect(() => {
    console.log('loading information from doc', docId);

    const docRef = doc(db, 'videos', docId);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const videoData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as VideoParams;
        setVideoDetails(videoData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <div className='fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black opacity-60 z-40'></div>
      <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-[90%] w-[80%] max-w-4xl bg-base-100 flex flex-col rounded-md overflow-hidden z-50'>
        <div className='relative h-1/2  overflow-hidden border-b-2 border-base-content'>
          {/* <img
            className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 min-h-full min-w-full object-cover '
            src='https://picsum.photos/800/600'
          ></img> */}
          <video
            className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 min-h-full min-w-full object-cover '
            autoPlay
            muted
            loop
            src={videoDetails?.url}
          ></video>
          <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black'></div>
          <button
            className=' absolute top-3 right-3 bg-black bg-opacity-40 rounded-3xl w-fit px-2.5 py-0.5'
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <div className='absolute bottom-5 left-4 flex flex-col'>
            <h1 className=' font-bold text-2xl text-white'>
              {videoDetails?.title}
            </h1>
            <div>
              <button className='mr-2 h-4 rounded-sm w-fit px-4 py-0.5'>
                <div className=' h-12'>
                  <img className=' object-cover w-full h-full' src={playLogo} />
                </div>
              </button>
              <button className='mr-2  bg-secondary rounded-sm w-fit px-4 py-0.5 items-center'>
                +
              </button>
            </div>
          </div>
        </div>

        {/* body */}
        <div className='m-4'>
          <div className='flex flex-row'>
            <div className='basis-2/3 grow'>
              <h2>Testing</h2>
              <p>{videoDetails?.description}</p>

              <h2>Trailer</h2>
              <div className='mt-1 w-2/5 overflow-hidden'>
                <video
                  src={videoDetails?.trailer}
                  poster={videoDetails?.trailerThumb}
                ></video>
              </div>
            </div>
            <div className=' basis-1/3 grow'>
              <h2>Category: {videoDetails?.collection}</h2>
              <h2>Genres:</h2>
            </div>
          </div>
        </div>
        {/* actions */}
        <div className='flex flex-row'></div>
      </div>
    </>
  );
}

export default VideoDetails;
