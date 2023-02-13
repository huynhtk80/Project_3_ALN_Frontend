import { user } from 'firebase-functions/v1/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { deleteFileURL, uploadFileStorage } from '../utils/fireStorageAPI';
import { photoCrop } from '../utils/photoCrop';

interface ImageUploaderProps {
  image: string;
  aspectHeight: number;
  aspectWidth: number;
  onChangeHandle: (e: any) => Promise<void>;
}

function ImageUploader({
  image,

  onChangeHandle,
}: ImageUploaderProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;

  return (
    <>
      <div
        className={` group relative mt-1 aspect-[3/1] min-h-[7rem]  w-full rounded-md border-2 border-dashed overflow-hidden`}
      >
        <img
          className=' absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 rounded-md z-10'
          src={image}
        />
        <div className=' absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center z-0 group-hover:z-[11] bg-slate-100 w-40 h-28 rounded-lg drop-shadow-md opacity-60'></div>
        <div className='absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 text-center z-0  group-hover:z-[11]'>
          <svg
            className='mx-auto h-12 w-12 text-black opacity-100'
            stroke='currentColor'
            fill='none'
            viewBox='0 0 48 48'
            aria-hidden='true'
          >
            <path
              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <div className='flex text-sm text-base-content'>
            <label
              htmlFor='vidFileUpload'
              className='badge cursor-pointer text-center items-center justify-center w-full rounded-md hover:bg-primary-focus hover:text-primary-content'
            >
              <span className='mx-auto'>Upload a file</span>
              <input
                id='vidFileUpload'
                name='vidFileUpload'
                type='file'
                accept='video/*'
                className='sr-only'
                onChange={onChangeHandle}
              />
            </label>
          </div>
          <p className='text-xs text-black'>PNG, JPG, GIF upto 10MB</p>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;
