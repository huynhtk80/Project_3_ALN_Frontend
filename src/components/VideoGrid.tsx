import { useContext, useEffect, useState } from 'react';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { VideoParams } from '../utils/fireStoreAPI';
import VideoThumbCard from './VideoThumbCard';

interface UserCarouselProps {
  searchQuery: string;
  videoResults: VideoParams[];
}
function VideoGrid({ searchQuery, videoResults }: UserCarouselProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;
  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [lastDoc, setLastDoc] = useState<any>();
  const [videos, setVideos] = useState<VideoParams[]>();
  const [activeIndex, setActiveIndex] = useState(null);
  const { userProfile } = useContext(UserDBContext);
  const [allfound, setAllFound] = useState(false);
  const [toShow, setToShow] = useState(8);

  useEffect(() => {
    if (searchQuery) {
      if (searchQuery === 'Following') {
        const filtered = videoResults.filter((video) => {
          if (userProfile?.following?.includes(video.userId)) return true;
        });
        setVideos(filtered);
        if (filtered.length <= toShow) setAllFound(true);
      } else if (searchQuery === 'Liked') {
        const filtered = videoResults.filter((video) => {
          if (userProfile?.likedVideos?.includes(video.DOC_ID)) return true;
        });
        setVideos(filtered);
        if (filtered.length <= toShow) setAllFound(true);
      } else {
        const filtered = videoResults.filter((video) => {
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
        });
        setVideos(filtered);
        if (filtered.length <= toShow) setAllFound(true);
      }
    } else {
      setVideos(videoResults);
      if (videoResults.length <= toShow) setAllFound(true);
    }
  }, [searchQuery, videoResults]);

  const onClickShowMore = () => {
    if (!videos) return;
    const numberToShow = toShow + 8;
    setToShow(numberToShow);

    if (numberToShow >= videos?.length) {
      setAllFound(true);
    }
  };

  if (videos && videos?.length == 0) return null;

  return (
    <>
      <h1 className='text-xl mb-3 ml-3'>{searchQuery}</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mx-5 mb-5'>
        {videos &&
          videos
            .filter((item, index) => index < toShow)
            ?.map((vid, index) => {
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
      {!allfound && (
        <div className='flex justify-center my-5'>
          <button
            className='btn btn-primary bg-base-200 '
            onClick={onClickShowMore}
          >
            Load more
          </button>
        </div>
      )}
      <div className=' divider'></div>
    </>
  );
}

export default VideoGrid;
