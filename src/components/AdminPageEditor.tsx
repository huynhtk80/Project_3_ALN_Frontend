import React, { useContext, useRef, useState } from 'react';
import Landing from '../pages/Landing';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { uploadAdminStorage } from '../utils/fireStorageAPI';
import { addHeaderMovie } from '../utils/fireStoreAPI';
import Frame from 'react-frame-component';
import styles from '../iframe.css?inline';
import App from '../App';
import { RestOfApp } from './RestOfApp';
// import styles from '../index.css?inline';
import DemoLanding from '../pages/DemoLanding';

function AdminPageEditor() {
  const fbContext = useContext(FirebaseContext);
  const { db, store } = fbContext;

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [videoBlob, setVideoBlob] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const resetFileInput = () => {
    if (!inputFileRef.current) return;
    //@ts-ignore
    inputFileRef.current.value = null;
  };

  const handleChange = (e: any) => {
    let file = e.target.files[0];
    setVideoFile(file);
    const url = URL.createObjectURL(file);
    setVideoBlob(url);
    //hello
  };

  const onSubmitHandle = async () => {
    if (!videoFile) {
      alert('No Video File');
      return;
    }
    if (!videoBlob) {
      alert('No Video File');
      return;
    }

    setProgress(0);

    try {
      const tempUrl = await uploadAdminStorage(
        store,
        videoFile,
        'header',
        setProgress
      );

      await addHeaderMovie(
        db,
        tempUrl,
        videoFile.name.substring(0, videoFile.name.lastIndexOf('.')) ||
          videoFile.name
      );

      resetFileInput();
      setVideoFile(null);
      setVideoBlob(null);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const initialContent = `<!DOCTYPE html>
      <html>
        <head>
          <style>
            ${styles}
          </style>
          <base target="_self">
        </head>
        <body >
          <div id="page" class="page"></div>
        </body>
      </html>`;

  return (
    <>
      {' '}
      <div>AdminPageEditor</div>;<h1>Select Landing Video</h1>
      <div className='flex flex-col md:flex-row h-full'>
        <div className='flex flex-col ml-r p-1'>
          <div className='grid h-auto card my-2 bg-base-300 rounded-box place-items-center'>
            <input
              type='file'
              ref={inputFileRef}
              className='file-input file-input-bordered file-input-primary w-full  max-w-xs '
              accept='video/*'
              onChange={handleChange}
            />
          </div>
          {/* <div className='divider lg:divider-horizontal'></div> */}
          {videoBlob && (
            <div className='grid h-content card p-3 bg-base-300 rounded-box place-items-center'>
              <video width='500px' controls src={videoBlob} />
              <button className='btn btn-primary' onClick={onSubmitHandle}>
                Submit
              </button>
            </div>
          )}
        </div>
        <Frame
          id='myFrame'
          className=' w-full md:w-5/6 h-screen resize rounded-md shadow-lg mb-3'
          initialContent={initialContent}
        >
          <DemoLanding />
        </Frame>
      </div>
    </>
  );
}

export default AdminPageEditor;
