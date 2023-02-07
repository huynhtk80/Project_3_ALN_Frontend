import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import playLogo from '../assets/ALN_LOGO-3-48_sm.png';

import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  addLikedMovies,
  removeLikedMovies,
  VideoParams,
} from '../utils/fireStoreAPI';
import VideoComments from './VideoComments';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { UserDBContext } from '../providers/UserDBProvider';

interface UploadVidDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  docId: string;
}

function VideoDetails({ setShowModal, docId }: UploadVidDetailProps) {
  const [videoDetails, setVideoDetails] = useState<VideoParams>();
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const videoPlayer = useRef(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

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
        if (userProfile?.likedVideos.includes(videoData?.DOC_ID)) {
          console.log('true');
          setIsLiked(true);
        } else {
          console.log('false');
          setIsLiked(false);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('ran this use effect');
    setLikedVideos(userProfile?.likedVideos);
    console.log('liked', userProfile?.likedVideos);
    if (userProfile?.likedVideos.includes(videoDetails?.DOC_ID)) {
      console.log('true');
      setIsLiked(true);
    } else {
      console.log('false');
      setIsLiked(false);
    }
  }, [userProfile]);

  const onClickPlay = () => {
    if (!videoPlayer.current) return;

    videoPlayer?.current?.requestFullscreen();
    videoPlayer.current.muted = false;
  };

  const onClickLike = () => {
    if (!isLiked) {
      // const removedLike = likedVideos.filter((item) => item !== id);
      addLikedMovies(db, videoDetails?.DOC_ID, user.uid);
    } else {
      // const addedLike = [...likedVideos, videoDetails?.DOC_ID];
      removeLikedMovies(db, videoDetails?.DOC_ID, user.uid);
    }
  };

  return (
    <>
      <div className='fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black opacity-60 z-40'></div>
      <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full sm:w-[80%] max-w-4xl bg-base-100 flex flex-col rounded-md overflow-hidden z-50'>
        <div className='relative min-h-[400px]  overflow-hidden border-b-2 border-base-content shrink-0'>
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
            ref={videoPlayer}
          ></video>
          <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black'></div>
          <button
            className=' absolute top-3 right-3 bg-black bg-opacity-40 rounded-3xl w-fit px-2.5 py-0.5'
            onClick={() => setShowModal(false)}
          >
            x
          </button>
          <div className='absolute bottom-5 left-4 flex flex-col'>
            <h1 className=' font-bold text-2xl text-white break-all'>
              {videoDetails?.title}
            </h1>
            <div className='flex justify-start items-center h-12'>
              <button
                className='mr-2 rounded-sm w-fit pl-4 '
                onClick={onClickPlay}
              >
                <div className=' h-10'>
                  <img
                    className=' object-cover w-full h-full transition ease-in-out duration-300 hover:scale-110 hover:rotate-[360deg]'
                    src={playLogo}
                  />
                </div>
              </button>
              <button className='mr-2 w-10 pl-2' onClick={onClickLike}>
                {isLiked ? (
                  <AiFillHeart size={'30px'} />
                ) : (
                  <AiOutlineHeart size={'30px'} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* body */}
        <div className='m-4 max-h-[400px] overflow-y-scroll overscroll-contain'>
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

              {videoDetails && (
                <VideoComments
                  videoId={videoDetails?.DOC_ID}
                  comments={videoDetails?.comments}
                />
              )}
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
