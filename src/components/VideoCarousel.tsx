import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useContext, useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import UserCard from './UserCard';
import 'react-multi-carousel/lib/styles.css';
import { VideoParams } from '../utils/fireStoreAPI';
import VideoThumbCard from './VideoThumbCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ArrowProps } from 'react-multi-carousel/lib/types';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 2000 },
    items: 6,
  },
  desktoplg: {
    breakpoint: { max: 2000, min: 1300 },
    items: 5,
  },

  desktopsm: {
    breakpoint: { max: 1300, min: 1100 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 900, min: 680 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 680, min: 0 },
    items: 1,
  },
};

interface UserCarouselProps {
  searchQuery: string;
  videoResults: VideoParams[];
}
function VideoCarousel({ searchQuery, videoResults }: UserCarouselProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();
  const [videos, setVideos] = useState<VideoParams[]>();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      setVideos(
        videoResults.filter((video) => {
          if (video.titleUpper?.includes(searchQuery?.toUpperCase()))
            return true;

          if (video.descriptionUpper?.includes(searchQuery?.toUpperCase()))
            return true;

          if (
            video.collection.toUpperCase()?.includes(searchQuery?.toUpperCase())
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
              return count.toUpperCase().includes(searchQuery?.toUpperCase());
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
      setVideos(videoResults);
    }
  }, [searchQuery, videoResults]);

  if (videos && videos?.length == 0) return null;

  console.log('car vid', videos);

  return (
    <>
      <h1 className='text-xl mb-3 ml-3'>{searchQuery}</h1>
      {videos && (
        <Carousel
          responsive={responsive}
          infinite={false}
          keyBoardControl={true}
          removeArrowOnDeviceType={['tablet', 'mobile']}
          swipeable={true}
          draggable={true}
          // showDots={true}
          partialVisbile={false}
          partialVisible={false}
          itemClass=' max-w-[350px] min-w-[350px]'
          customLeftArrow={
            <div className='absolute top-1/2 left-4 max-w-4 cursor-pointer text-primary-400 bg-slate-400 bg opacity-40 rounded-full'>
              <FaChevronLeft size={'60px'} />
            </div>
          }
          customRightArrow={
            <div className='absolute top-1/2 right-4 max-w-4 cursor-pointer text-primary-400 bg-slate-400 bg opacity-40 rounded-full'>
              <FaChevronRight size={'60px'} />
            </div>
          }
        >
          {videos &&
            videos.map((vid, index) => {
              return (
                <div className=' w-80'>
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
                </div>
              );
            })}
        </Carousel>
      )}
    </>
  );
}

export default VideoCarousel;
