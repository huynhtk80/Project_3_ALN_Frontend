import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import { replyMovieComments } from '../utils/fireStoreAPI';

interface VideoCommentReplyProps {
  commentId: string;
}
function VideoCommentReply({ commentId }: VideoCommentReplyProps) {
  const fbContext = useContext(FirebaseContext);
  const { user, userRoles } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const [reply, setReply] = useState('');

  const onClickHandleReply = async (commentID: string) => {
    await replyMovieComments(
      db,
      commentID,
      user.uid,
      userProfile.photo,
      `${user.firstName} ${user.lastName}`,
      reply
    );
    setReply('');
  };

  return (
    <div className='flex flex-row justify-center items-center w-full'>
      <textarea
        className='textarea textarea-bordered w-full mt-2'
        placeholder='reply'
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      ></textarea>
      <button
        className='btn btn-primary item-end ml-2'
        onClick={() => onClickHandleReply(commentId)}
      >
        Reply
      </button>
    </div>
  );
}

export default VideoCommentReply;
