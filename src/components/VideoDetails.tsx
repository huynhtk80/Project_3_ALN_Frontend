import { doc, getDoc, onSnapshot } from 'firebase/firestore';
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
import { UserProfileProps } from '../pages/EditProfile';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

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
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);
  const [creatorProfile, setCreatorProfile] = useState<UserProfileProps>();

  useEffect(() => {
    console.log('loading information from doc', docId);

    const doFetch = async () => {
      const docRef = doc(db, 'videos', docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const videoData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as VideoParams;
        setVideoDetails(videoData);
        if (userProfile?.likedVideos) {
          if (userProfile?.likedVideos.includes(videoData?.DOC_ID)) {
            console.log('true');
            setIsLiked(true);
          } else {
            console.log('false');
            setIsLiked(false);
          }
        }
        const userDocRef = doc(db, 'userInfo', videoData.userId);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const creatorData = {
            ...userDocSnap.data(),
            DOC_ID: userDocSnap.id,
          } as UserProfileProps;
          setCreatorProfile(creatorData);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    doFetch();
    // const unsubscribe = onSnapshot(docRef, (docSnap) => {
    //   if (docSnap.exists()) {
    //     console.log('Document data:', docSnap.data());
    //     const videoData = {
    //       ...docSnap.data(),
    //       DOC_ID: docSnap.id,
    //     } as VideoParams;
    //     setVideoDetails(videoData);
    //     if (userProfile?.likedVideos) {
    //       if (userProfile?.likedVideos.includes(videoData?.DOC_ID)) {
    //         console.log('true');
    //         setIsLiked(true);
    //       } else {
    //         console.log('false');
    //         setIsLiked(false);
    //       }
    //     }
    //     const userdocRef = doc(db, 'userInfo', videoData.userId)

    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log('No such document!');
    //   }
    // });

    // return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('ran this use effect');
    setLikedVideos(userProfile?.likedVideos);
    console.log('liked', userProfile?.likedVideos);
    if (userProfile?.likedVideos)
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
      if (videoDetails) addLikedMovies(db, videoDetails?.DOC_ID, user.uid);
    } else {
      // const addedLike = [...likedVideos, videoDetails?.DOC_ID];
      if (videoDetails) removeLikedMovies(db, videoDetails?.DOC_ID, user.uid);
    }
  };

  return createPortal(
    <>
      <div className='fixed top-0 right-0 left-0 bottom-0 h-screen w-screen bg-black opacity-60 z-40'></div>
      <div className='fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 max-h-[90%] w-full sm:w-[80%] max-w-4xl bg-base-100 flex flex-col rounded-md overflow-hidden z-50'>
        <div className='relative min-h-[250px]  overflow-hidden border-b-2 border-base-content shrink-0'>
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
            <p className='text-white opacity-60 ml-2'>
              {videoDetails?.country &&
                videoDetails?.country.map((coun, index) => {
                  if (videoDetails.country)
                    if (index > 5) {
                      return null;
                    } else if (index === 5) {
                      return (
                        <span className='inline-block mr-1  '>
                          {coun}, and more...
                        </span>
                      );
                    } else if (index < videoDetails.country?.length - 1) {
                      return (
                        <span className='inline-block mr-1  '>{coun}, </span>
                      );
                    } else
                      return (
                        <span className='inline-block mr-1  '>{coun}</span>
                      );
                })}
            </p>
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
        <div className='m-4  overflow-y-scroll overscroll-contain'>
          <div className='flex flex-col sm:flex-row gap-5'>
            <div className='basis-2/3 grow'>
              <div className='min-h-12'>
                <h2>Description:</h2>
                <p className='min-h-12'>{videoDetails?.description}</p>
                <h2 className='font-bold'>Category: </h2>
                {videoDetails?.collection}
                <h2 className='font-bold mt-2'>Tags: </h2>
                {videoDetails?.tags &&
                  videoDetails?.tags?.map((tag, index) => {
                    if (videoDetails.tags)
                      if (index < videoDetails.tags?.length - 1) {
                        return (
                          <span className='inline-block mr-1  '>{tag}, </span>
                        );
                      } else
                        return (
                          <span className='inline-block mr-1  '>{tag}</span>
                        );
                  })}

                <label className='label mt-3'>
                  <span className='label-text'>Credits</span>
                </label>
                <div className='overflow-x-auto'>
                  <table className='table table-compact w-full '>
                    <thead>
                      <tr>
                        <td>Role</td>
                        <td>Name</td>
                      </tr>
                    </thead>
                    <tbody>
                      {videoDetails?.credits?.map((vid) => (
                        <>
                          <tr>
                            <th>{vid.role}</th>
                            <th>{vid.name}</th>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className=' basis-1/3 grow'>
              <div>
                <div className='flex flex-row items-center mb-2'>
                  {creatorProfile?.photo ? (
                    <div className=' avatar'>
                      <div className=' w-10 rounded-full'>
                        <img src={creatorProfile.photo}></img>
                      </div>
                    </div>
                  ) : (
                    <span className='inline-block h-12 w-12 overflow-hidden rounded-full bg-primary'>
                      <svg
                        className='h-full w-full text-base-content'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                  )}{' '}
                  <Link
                    to={`/home/profile/${creatorProfile?.DOC_ID}`}
                    className='ml-2 btn btn-primary'
                  >
                    {creatorProfile?.firstName + ' ' + creatorProfile?.lastName}
                  </Link>
                </div>
                <h2>Trailer</h2>
                <div className='mt-1 max-w-lg overflow-hidden mx-auto'>
                  <video
                    src={videoDetails?.trailer}
                    poster={videoDetails?.trailerThumb}
                    controls
                  ></video>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className=' divider' />
            {videoDetails && <VideoComments videoId={videoDetails?.DOC_ID} />}
          </div>
        </div>
        {/* actions */}
        <div className='flex flex-row'></div>
      </div>
    </>,
    //@ts-ignore
    document.getElementById('portal')
  );
}

export default VideoDetails;
