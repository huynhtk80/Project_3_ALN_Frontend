import React, { useState } from 'react';
import imgPlaceHolder from '../assets/card-top-temp.jpg';
import VideoPlayer from './videoPlayer';
import ReactPlayer from 'react-player';
import VideoDetails from './VideoDetails';
import { UserProfileProps } from '../pages/Signin';

import tempAvatar from '../assets/avatar-temp.png';
import tempCover from '../assets/placeholder_cover.jpg';

interface AppProps {
  user: UserProfileProps;
}

function UserCard({ user }: AppProps) {
  return (
    <div className='card w-96 bg-base-100 shadow-xl'>
      <figure className=''>
        <img
          src={user.coverPhoto ? user.coverPhoto : tempCover}
          alt='coverphoto'
          className='min-w-full object-cover'
        />
      </figure>
      <img
        src={user.photo ? user.photo : tempAvatar}
        className='avatar rounded-full w-24 mx-auto -mt-16'
      ></img>
      <div className='card-body'>
        <h2 className='card-title'>{`${user.firstName} ${user.lastName}`}</h2>
        <p>
          {user?.about?.length > 100
            ? user?.about?.slice(0, 100) + '...'
            : user?.about}
        </p>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Connect</button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
