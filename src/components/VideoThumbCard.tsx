import { useContext, useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import ReactPlayer from 'react-player';
import playALNLogo from '../assets/ALN_LOGO-3-48_sm.png';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { addLikedMovies, removeLikedMovies } from '../utils/fireStoreAPI';
import VideoDetails from './VideoDetails';

interface AppProps {
  url: string;
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex?: any;
  docId?: string;
  posterImg: string;
}

function VideoThumbCard({
  url,
  title,
  description,
  index: index,
  activeIndex,
  setActiveIndex,
  docId,
  posterImg,
}: AppProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (userProfile?.likedVideos)
      if (userProfile?.likedVideos.includes(docId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
  }, [userProfile]);

  const onClickLike = () => {
    if (!isLiked) {
      // const removedLike = likedVideos.filter((item) => item !== id);
      if (docId) addLikedMovies(db, docId, user.uid);
    } else {
      // const addedLike = [...likedVideos, videoDetails?.DOC_ID];
      if (docId) removeLikedMovies(db, docId, user.uid);
    }
  };

  return (
    <div className='relative w-full max-w-sm h-64 text-base-content bg-primary bg-opacity-50 overflow-hidden shadow-lg  group rounded-lg'>
      <div className='flex justify-center basis-2 h-[55%] overflow-hidden'>
        <ReactPlayer
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                onContextMenu: (e: any) => e.preventDefault(),
              },
            },
          }}
          controls
          light={posterImg}
          playIcon={
            <img
              className='max-w-[35px] group-hover:animate-rotatein'
              src={playALNLogo}
            ></img>
          }
          id={index}
          height='100%'
          width='100%'
          url={url}
          // onReady={() => setActiveIndex(index)}
          playing={activeIndex === index ? true : false}
          onPlay={() => {
            setActiveIndex(index);
          }}
        />
      </div>

      <div className='p-2 w-full basis-1'>
        <div
          className='font-bold text-lg mb-2 cursor-pointer text-base-content'
          onClick={() => setIsOpen(true)}
        >
          {title}
        </div>
        <p className='text-base-content text-sm'>
          {description.length > 100
            ? description.slice(0, 100) + '...'
            : description}
        </p>
      </div>
      <div className='absolute top-2 right-2'>
        <button className='mr-2 w-10 pl-2 ' onClick={onClickLike}>
          {isLiked ? (
            <AiFillHeart size={'30px'} className='fill-slate-300' />
          ) : (
            <AiOutlineHeart size={'30px'} className='fill-slate-300 ' />
          )}
        </button>
      </div>

      {isOpen && docId && (
        <VideoDetails setShowModal={setIsOpen} docId={docId} />
      )}
    </div>
  );
}

export default VideoThumbCard;
