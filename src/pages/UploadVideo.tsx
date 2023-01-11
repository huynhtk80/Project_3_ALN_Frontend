import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { AuthContext } from '../providers/AuthProvider';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ReactPlayer from 'react-player';
import { uploadFile } from '../utils/FireStorageAPI';

function UploadVideo() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [videoFile, setVideoFile] = useState();
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [tempFile, setTempFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const [videoDoc, setVideoDoc] = useState({
    title: '',
    url: '',
    description: '',
    collection: '',
  });

  interface VideoParams {
    userId: string;
    title: string;
    url: string;
    description: string;
    collection: string;
  }

  const addMovie = async (videoDoc: VideoParams) => {
    try {
      let collectionRef = collection(db, 'videos2');
      await addDoc(collectionRef, videoDoc);
      console.log('uploaded', JSON.stringify(videoDoc));
    } catch (ex) {
      console.log('FIRESTORE ADD FAILURE!', ex.message);
    }
  };

  const handleChange = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    setVideoFile(file);
    console.log(file);
    var url = URL.createObjectURL(file);
    console.log(url);
    setTempFile(url);
  };

  const onClickHandle = () => {
    console.log('hello canvas');
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const context = canvas.getContext('2d');
    const vid = document.querySelector('video');
    console.log('vid width', vid?.videoWidth);
    console.log('vid height', vid?.videoHeight);
    console.log('vid height', vid?.currentSrc);

    const video_width = vid?.videoWidth;
    const video_height = vid?.videoHeight;

    const vRatio = video_width / video_height;

    //16/9 == 1.777  4/3=1.333
    const cRatio = canvas.width / canvas.height;

    var target_width;
    var target_height;
    var y_of_video = 0;
    var x_of_video = 0;
    const zoom = 1;

    //crop to fit width
    target_width = canvas.width * zoom;
    target_height = (canvas.width / vRatio) * zoom;
    y_of_video = (canvas.height - target_height) / 2;
    x_of_video = (canvas.width - target_width) / 2;
    //resize to fit
    // if (vRatio > cRatio) {
    //   target_width = canvas.width;
    //   target_height = canvas.width / vRatio;
    //   y_of_video = (canvas.height - target_height) / 2;
    // } else {
    //   target_width = canvas.height * vRatio;
    //   target_height = canvas.height;

    //   x_of_video = (canvas.width - target_width) / 2;
    // }

    if (context && vid)
      context &&
        context.drawImage(
          vid,
          x_of_video,
          y_of_video,
          target_width,
          target_height
        );

    const thumbnail = canvas.toBlob((blob) => {
      if (!blob) return;
      const newImg = document.createElement('img');
      console.log(blob);
      const url = URL.createObjectURL(blob);
      console.log('image', url);
      // newImg.onload = () => {
      //   // no longer need to read the blob so it's revoked
      //   URL.revokeObjectURL(url);
      // };

      newImg.src = url;
      // document.body.appendChild(newImg);
      const videoFileName = videoFile.name;
      const thumbName =
        videoFileName.substr(0, videoFileName.lastIndexOf('.')) ||
        videoFileName;

      const file = new File([blob], `${thumbName}_thumbnail.png`, {
        type: 'image/png',
      });
      console.log('the file', file);
      setThumbFile(file);
      console.log('thumbFile', thumbFile);
    });

    const currentDiv = document.getElementById('canvasloc');
    currentDiv.innerHTML = '';
    currentDiv?.appendChild(canvas);
  };

  const onSubmitHandle = async () => {
    if (!videoFile) {
      alert('No Video File');
      return;
    }

    const tempUrl = await uploadFile(store, videoFile, 'video', setProgress);
    console.log('before', downloadURL);
    setDownloadURL(tempUrl);
    console.log('after', downloadURL);

    await addMovie({
      userId: user.uid,
      title: videoFile.name,
      url: tempUrl,
      description: '',
      collection: '',
    });
  };

  return (
    <>
      <div className='text-center text-cyan-900 tracking-wide text-3xl'>
        UploadVideo
      </div>
      ;
      <div className='flex flex-col mx-auto w-3/5'>
        <div className='grid flex-grow h-auto card my-2 bg-base-300 rounded-box place-items-center'>
          <input
            type='file'
            className='file-input file-input-bordered file-input-primary w-full max-w-xs'
            accept='video/*'
            onChange={handleChange}
          />
        </div>
        <div className='divider lg:divider-horizontal'></div>
        <div className='grid flex-grow h-content card p-2 bg-base-300 rounded-box place-items-center'>
          {tempFile && (
            <video id='video' width='500px' controls src={tempFile} />
          )}
          {videoFile && (
            <button className='btn btn-primary' onClick={onClickHandle}>
              {' '}
              Generate ThumbNail
            </button>
          )}
        </div>
      </div>
      {console.log(tempFile)}
      <div className='card mx-auto h-100 w-3/5 my-8 p-5 bg-base-300 rounded-box place-items-center'>
        <div id='canvasloc'></div>
        {thumbFile && <p>{thumbFile.name}</p>}
      </div>
      <button onClick={onSubmitHandle}>Upload</button>
      <>{progress}</>
      <p>{downloadURL}</p>
    </>
  );
}

export default UploadVideo;
