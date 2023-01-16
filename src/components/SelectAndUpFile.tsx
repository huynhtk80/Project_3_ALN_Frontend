import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { uploadFileStorage } from '../utils/FireStorageAPI';
import { addMovie } from '../utils/FireStoreAPI';
import { getThumbnailForVideo } from '../utils/videoTools';
import GenerateThumb from './GenerateThumb';
import UploadedVidDetail from './UploadedVidDetail';

function SelectAndUpFile() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [showModal, setShowModal] = useState(false);
  const [movieDocId, setMovieDocID] = useState('');

  const [videoBlob, setVideoBlob] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>();
  const [downloadURL, setDownloadURL] = useState('');
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [videoDoc, setVideoDoc] = useState({
    title: '',
    url: '',
    description: '',
    collection: '',
  });

  const handleChange = (e: any) => {
    let file = e.target.files[0];
    setVideoFile(file);
    var url = URL.createObjectURL(file);
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

      const { downloadURL: tempUrl, docId: videoFileId } =
        await uploadFileStorage(store, videoFile, 'video', setProgress);

      const { downloadURL: tempThumbUrl, docId: thumbFileId } =
        await uploadFileStorage(store, thumbnailFile, 'thumbnail');

      setDownloadURL(tempUrl);

      const DocId = await addMovie(
        {
          userId: user.uid,
          title:
            videoFile.name.substring(0, videoFile.name.lastIndexOf('.')) ||
            videoFile.name,
          url: tempUrl,
          videoFileId: videoFileId,
          thumbnail: tempThumbUrl,
          thumbnailFileId: thumbFileId,
          description: '',
          collection: '',
        },
        db
      );

      if (DocId) setMovieDocID(DocId);

      setLoading(false);
      setShowModal(true);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className='text-center text-cyan-900 tracking-wide text-3xl'>
        UploadVideo
      </div>

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
          {videoBlob && <video width='500px' controls src={videoBlob} />}
        </div>
      </div>
      <button className='btn btn-primary' onClick={onSubmitHandle}>
        Upload
      </button>
      {loading && (
        <div className='radial-progress' style={{ '--value': `${progress}` }}>
          {Math.floor(progress)}%
        </div>
      )}
      {showModal && (
        <UploadedVidDetail docID={movieDocId} setShowModal={setShowModal} />
      )}
    </>
  );
}

export default SelectAndUpFile;
