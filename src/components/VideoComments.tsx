import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { updateMovie, updateMovieComments } from '../utils/fireStoreAPI';
import tempAvatar from '../assets/avatar-temp.png';

interface VideoCommentsProp {
  videoId: string;
  comments: {
    avatar: string;
    name: string;
    content: string;
    commentTime: string;
  }[];
}

function VideoComments({ videoId, comments }: VideoCommentsProp) {
  const fbContext = useContext(FirebaseContext);
  const { user, userRoles } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const [currentComment, setCurrentComment] = useState('');

  const onClickHandleComment = async () => {
    await updateMovieComments(
      db,
      videoId,
      user.uid,
      userProfile.photo,
      `${user.firstName} ${user.lastName}`,
      currentComment
    );
  };
  console.log('comments', comments);

  return (
    <>
      <div>VideoComments</div>
      <textarea
        className='textarea'
        placeholder='comment'
        onChange={(e) => setCurrentComment(e.target.value)}
      ></textarea>
      <button className='btn btn-primary' onClick={onClickHandleComment}>
        Submit
      </button>
      {comments?.map((comment) => {
        let avatar = '';
        if (!comment.avatar || comment.avatar === '') {
          avatar = tempAvatar;
        } else {
          avatar = comment.avatar;
        }
        return (
          <div className='border-2 border-gray-500'>
            <div className='avatar rounded-full w-8'>
              <img src={avatar} alt='avatar'></img>
            </div>
            <span>{comment.name}</span>
            <p className='pl-5'>{comment.content}</p>
          </div>
        );
      })}
    </>
  );
}

export default VideoComments;
