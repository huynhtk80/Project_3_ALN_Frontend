import { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  addMovieTag,
  deleteMovieTag,
  VideoParams,
} from '../utils/fireStoreAPI';

interface VideoTagsInputProps {
  video: VideoParams;
}
function VideoTagsInput({ video }: VideoTagsInputProps) {
  const fbContext = useContext(FirebaseContext);
  const { user, userRoles } = useContext(AuthContext);
  const db = fbContext.db;
  const [tag, setTag] = useState<string>();

  const onClickHandle = async (e: any) => {
    if (!tag) {
      return;
    }
    if (e.key !== 'Enter') {
      return;
    }
    await addMovieTag(db, video.DOC_ID, tag);
    setTag('');
  };

  const onClickHandleRemove = async (clickTag: string) => {
    await deleteMovieTag(db, video.DOC_ID, clickTag);
  };

  return (
    <>
      <label className='label mt-3'>
        <span className='label-text'>Tags</span>
      </label>
      <div className='textarea textarea-bordered'>
        {video.tags?.map((tag) => (
          <>
            <div className='inline-block bg-secondary text-secondary-content rounded-lg p-1 mr-1 mb-1'>
              {tag}
              <button
                className='btn-xs'
                onClick={() => onClickHandleRemove(tag)}
              >
                x
              </button>
            </div>
          </>
        ))}
        <input
          className='bg-base-100 px-2'
          placeholder='press enter to add tag...'
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={onClickHandle}
        />
      </div>
    </>
  );
}

export default VideoTagsInput;
