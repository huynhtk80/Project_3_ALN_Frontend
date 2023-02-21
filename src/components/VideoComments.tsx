import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import tempAvatar from '../assets/avatar-temp.png';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';
import {
  addMovieComments,
  deleteMovieComments,
  deleteReplyMovieComments,
} from '../utils/fireStoreAPI';
import VideoCommentReply from './VideoCommentReply';

interface VideoCommentsProp {
  videoId: string;
}

interface Comments {
  uid: string;
  avatar: string;
  name: string;
  content: string;
  commentTime: Timestamp;
  replies: [
    {
      uid: string;
      avatar: string;
      name: string;
      content: string;
      commentTime: Timestamp;
    }
  ];
  DOC_ID: string;
}

function VideoComments({ videoId }: VideoCommentsProp) {
  const fbContext = useContext(FirebaseContext);
  const { user, userRoles } = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const db = fbContext.db;
  const [vidComments, setVidComments] = useState<Comments[]>();
  const [currentComment, setCurrentComment] = useState('');

  useEffect(() => {
    let collectionRef = collection(db, 'comments');

    let queryRef = query(
      collectionRef,
      where('vidId', '==', videoId),
      orderBy('commentTime', 'asc')
    );
    const unsubscribe = onSnapshot(queryRef, (docSnap) => {
      if (docSnap.empty) {
        // doc.data() will be undefined in this case
      } else {
        const commentData = docSnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as Comments)
        );
        setVidComments(commentData);
      }
    });

    return unsubscribe;
  }, []);

  const onClickHandleComment = async () => {
    if (!currentComment) return;

    await addMovieComments(
      db,
      videoId,
      user.uid,
      userProfile.photo,
      `${user.firstName} ${user.lastName}`,
      currentComment
    );
    setCurrentComment('');
  };

  const onClickRemoveReply = async (
    commentID: string,
    reply: {
      uid: string;
      avatar: string;
      name: string;
      content: string;
      commentTime: Timestamp;
    }
  ) => {
    await deleteReplyMovieComments(db, commentID, reply);
  };

  const onClickRemoveComment = async (commentID: string) => {
    await deleteMovieComments(db, commentID);
  };

  return (
    <>
      <div className='antialiased mx-auto max-w-screen-sm'>
        <h3 className='mb-4 text-lg font-semibold text-primary-content'>
          Comments
        </h3>

        {vidComments?.map((comment) => {
          let avatar = '';
          if (!comment.avatar || comment.avatar === '') {
            avatar = tempAvatar;
          } else {
            avatar = comment.avatar;
          }
          return (
            <>
              <div className='space-y-4 mt-1'>
                <div className='flex'>
                  <div className='flex-shrink-0 mr-3'>
                    <img
                      className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10'
                      src={avatar}
                      alt=''
                    />
                  </div>
                  <div className='flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed relative'>
                    {comment.uid === user.uid && (
                      <button
                        className='absolute top-2 right-2 '
                        onClick={() => onClickRemoveComment(comment.DOC_ID)}
                      >
                        x
                      </button>
                    )}
                    <strong>{comment.name}</strong>{' '}
                    <span className='text-xs text-gray-400'>
                      {new Date(
                        comment?.commentTime?.seconds * 1000
                      ).toDateString()}
                      {',  '}
                      {new Date(
                        comment?.commentTime?.seconds * 1000
                      ).toLocaleTimeString()}
                    </span>
                    <p className='text-sm'>{comment.content}</p>
                    {comment.replies.length >= 0 ? (
                      <div className='mt-4 flex flex-col items-start'>
                        {comment.replies.map((reply) => (
                          <div className='flex'>
                            <div className='flex-shrink-0 mr-3'>
                              <img
                                className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10'
                                src={reply.avatar}
                                alt=''
                              />
                            </div>
                            <div className='relative flex-1 border rounded-lg px-4 py-2 sm:pl-6 sm:pr-10 sm:py-4 leading-relaxed group'>
                              <strong>{reply.name}</strong>{' '}
                              <span className='text-xs text-gray-400'>
                                {new Date(
                                  reply?.commentTime?.seconds * 1000
                                ).toDateString()}
                                {',  '}
                                {new Date(
                                  reply?.commentTime?.seconds * 1000
                                ).toLocaleTimeString()}
                              </span>
                              <p className='text-sm'>{reply.content}</p>
                              {reply.uid === user.uid && (
                                <button
                                  className='absolute top-2 right-2 hidden group-hover:block'
                                  onClick={() =>
                                    onClickRemoveReply(comment.DOC_ID, reply)
                                  }
                                >
                                  X
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        {/* <div className='flex -space-x-2 mr-2'>
                          <img
                            className='rounded-full w-6 h-6 border border-white'
                            src={avatar}
                            alt=''
                          />
                          <img
                            className='rounded-full w-6 h-6 border border-white'
                            src={avatar}
                            alt=''
                          />
                        </div>
                        <div className='text-sm text-gray-500 font-semibold'>
                          5 Replies
                        </div> */}
                        {/* <div className='flex flex-row justify-end'>
                          <textarea
                            className='textarea w-full mt-2'
                            placeholder='reply'
                            onChange={(e) => setCurrentComment(e.target.value)}
                          ></textarea>
                          <button
                            className='item-end'
                            onClick={() => onClickHandleReply(comment.DOC_ID)}
                          >
                            Reply
                          </button>
                        </div> */}
                        <VideoCommentReply commentId={comment.DOC_ID} />
                      </div>
                    ) : (
                      <button>Reply</button>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })}
        <div className='flex flex-row justify-center items-center w-full'>
          <textarea
            className='textarea textarea-bordered w-full mt-2'
            placeholder='comment'
            onChange={(e) => setCurrentComment(e.target.value)}
            value={currentComment}
          ></textarea>
          <button className='btn btn-primary' onClick={onClickHandleComment}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default VideoComments;
