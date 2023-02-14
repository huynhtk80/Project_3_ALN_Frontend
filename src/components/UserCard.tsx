import React, { useContext, useEffect, useState } from 'react';
import imgPlaceHolder from '../assets/card-top-temp.jpg';
import VideoPlayer from './videoPlayer';
import ReactPlayer from 'react-player';
import VideoDetails from './VideoDetails';
import { UserProfileProps } from '../pages/EditProfile';

import tempAvatar from '../assets/avatar-temp.png';
import tempCover from '../assets/placeholder_cover.jpg';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import {
  addFollowingUser,
  addLikedMovies,
  removeFollowingUser,
} from '../utils/fireStoreAPI';

interface AppProps {
  userCardInfo: UserProfileProps;
}

function UserCard({ userCardInfo }: AppProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (userProfile?.following)
      if (userProfile?.following.includes(userCardInfo.DOC_ID)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
  }, [userProfile]);

  const onClickFollow = () => {
    if (!isFollowing) {
      // const removedLike = likedVideos.filter((item) => item !== id);
      if (userCardInfo.DOC_ID)
        addFollowingUser(db, userCardInfo.DOC_ID, user.uid);
    } else {
      // const addedLike = [...likedVideos, videoDetails?.DOC_ID];
      if (userCardInfo.DOC_ID)
        removeFollowingUser(db, userCardInfo.DOC_ID, user.uid);
    }
  };

  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure className=''>
        <img
          src={userCardInfo.coverPhoto ? userCardInfo.coverPhoto : tempCover}
          alt='coverphoto'
          className='min-w-full object-cover'
        />
      </figure>
      <img
        src={userCardInfo.photo ? userCardInfo.photo : tempAvatar}
        className='avatar rounded-full w-24 mx-auto -mt-16'
      ></img>
      <div className='card-body'>
        <h2 className='card-title'>{`${userCardInfo.firstName} ${userCardInfo.lastName}`}</h2>
        <p>
          {userCardInfo?.about?.length > 100
            ? userCardInfo?.about?.slice(0, 100) + '...'
            : userCardInfo?.about}
        </p>
        <div className='card-actions justify-end'>
          {isFollowing ? (
            <button onClick={onClickFollow} className='btn btn-primary'>
              unfollow
            </button>
          ) : (
            <button onClick={onClickFollow} className='btn btn-secondary'>
              follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
