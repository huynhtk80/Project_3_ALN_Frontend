import { useContext, useState } from 'react';
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
  const [showInput, setShowInput] = useState(false);

  const onClickHandleReply = async (commentID: string) => {
    if (!reply) return;
    await replyMovieComments(
      db,
      commentID,
      user.uid,
      userProfile.photo,
      `${userProfile.firstName} ${userProfile.lastName}`,
      reply
    );
    setReply('');
    setShowInput(false);
  };

  return (
    <div className='flex flex-row justify-center items-center w-full'>
      {showInput ? (
        <>
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
        </>
      ) : (
        <button onClick={() => setShowInput(true)}>reply</button>
      )}
    </div>
  );
}

export default VideoCommentReply;
