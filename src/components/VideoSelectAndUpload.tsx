import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { uploadFileStorage } from '../utils/fireStorageAPI';
import { addMovie } from '../utils/fireStoreAPI';
import { getThumbnailForVideo } from '../utils/videoTools';
import VideoEditDetails from './VideoEditDetails';

function VideoSelectAndUpload() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [showModal, setShowModal] = useState(false);
  const [movieDocId, setMovieDocID] = useState('');

  const [videoBlob, setVideoBlob] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const [videoDoc, setVideoDoc] = useState({
    title: '',
    url: '',
    description: '',
    collection: '',
  });

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
    setLoading(true);

    try {
      const { imageUrl, thumbnailFile } = await getThumbnailForVideo(
        videoBlob,
        videoFile.name
      );

      const tempUrl = await uploadFileStorage(
        store,
        user.uid,
        videoFile,
        'video',
        undefined,
        setProgress
      );

      const tempThumbUrl = await uploadFileStorage(
        store,
        user.uid,
        thumbnailFile,
        'video',
        'thumbnail'
      );

      setDownloadURL(tempUrl);

      const DocId = await addMovie(
        {
          userId: user.uid,
          title:
            videoFile.name.substring(0, videoFile.name.lastIndexOf('.')) ||
            videoFile.name,
          url: tempUrl,
          thumbnail: tempThumbUrl,
          description: '',
          collection: '',
          DOC_ID: '',
        },
        db
      );

      if (DocId) setMovieDocID(DocId);

      setLoading(false);
      setShowModal(true);
      resetFileInput();
      setVideoFile(null);
      setVideoBlob(null);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className='text-center pt-20 text-primary-content tracking-wide lg:text-3xl'>
        Upload Video
      </div>

      <div className='flex flex-col mx-auto w-3/5'>
        <div className='grid flex-grow h-auto card my-2 bg-base-300 rounded-box place-items-center'>
          <input
            type='file'
            ref={inputFileRef}
            className='file-input file-input-bordered file-input-primary w-full max-w-xs'
            accept='video/*'
            onChange={handleChange}
          />
        </div>
        {/* <div className='divider lg:divider-horizontal'></div> */}
        {videoBlob && (
          <div className='grid flex-grow h-content card p-2 bg-base-300 rounded-box place-items-center'>
            <video width='500px' controls src={videoBlob} />
          </div>
        )}
      </div>
      <div className='flex flex-row justify-center'>
        <button className='btn btn-primary' onClick={onSubmitHandle}>
          Upload
        </button>
        {loading && (
          <div className='radial-progress' style={{ '--value': `${progress}` }}>
            {Math.floor(progress)}%
          </div>
        )}
      </div>
      {showModal && (
        <VideoEditDetails docID={movieDocId} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default VideoSelectAndUpload;
