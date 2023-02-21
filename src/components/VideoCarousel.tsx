import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { VideoParams } from '../utils/fireStoreAPI';
import VideoThumbCard from './VideoThumbCard';
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
  const { userProfile } = useContext(UserDBContext);

  useEffect(() => {
    if (searchQuery) {
      if (searchQuery === 'Following') {
        setVideos(
          videoResults.filter((video) => {
            if (userProfile?.following?.includes(video.userId)) return true;
          })
        );
      } else if (searchQuery === 'Liked') {
        setVideos(
          videoResults.filter((video) => {
            if (userProfile?.likedVideos?.includes(video.DOC_ID)) return true;
          })
        );
      } else {
        setVideos(
          videoResults.filter((video) => {
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
      }
    } else {
      setVideos(videoResults);
    }
  }, [searchQuery, videoResults]);

  const ArrowFix = (arrowProps: any) => {
    const { carouselState, children, ...restArrowProps } = arrowProps;
    return <span {...restArrowProps}> {children} </span>;
  };

  if (videos && videos?.length == 0) return null;

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
          // partialVisbile={false}
          partialVisible={false}
          itemClass=' max-w-[335px] min-w-[335px]'
          customLeftArrow={
            <ArrowFix>
              <ArrowLeftCircleIcon className='w-10 absolute left-4 max-w-4 top-1/2 -translate-y-[50%] cursor-pointer text-primary bg-primary-content bg opacity-50 rounded-full hover:text-info hover:bg-base-300 hover:scale-110 transition-all ease-in-out duration-300' />
            </ArrowFix>
          }
          customRightArrow={
            <ArrowFix>
              <ArrowRightCircleIcon className='w-10 absolute right-4 max-w-4 top-1/2 -translate-y-[50%] cursor-pointer text-primary bg-primary-content bg opacity-50 rounded-full hover:text-info hover:bg-base-300 hover:scale-110 transition-all ease-in-out duration-300' />
            </ArrowFix>
          }
        >
          {videos &&
            videos.map((vid, index) => {
              return (
                <div key={vid.DOC_ID + searchQuery} className=' w-80'>
                  <VideoThumbCard
                    url={vid.url}
                    description={vid.description}
                    title={vid.title}
                    index={index}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    docId={vid.DOC_ID}
                    posterImg={vid.thumbnail}
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
