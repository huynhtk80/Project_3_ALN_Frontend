import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

interface VideoTagsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}
function VideoTagsMultiInput({ tags, setTags }: VideoTagsInputProps) {
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
    const newArray = tags;
    newArray.push(tag);
    setTags(newArray);
    setTag('');
  };

  const onClickHandleRemove = async (clickTag: string) => {
    const newArray = tags;
    const index = newArray.indexOf(clickTag);
    newArray.splice(index, 1);
    setTags(newArray);
  };

  return (
    <>
      <label className='label mt-3'>
        <span className='label-text'>Tags</span>
      </label>
      <div className='textarea textarea-bordered'>
        {tags?.map((tag) => (
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

export default VideoTagsMultiInput;
