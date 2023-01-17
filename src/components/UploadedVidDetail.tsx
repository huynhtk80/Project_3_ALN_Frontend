import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { deleteFile, uploadFileStorage } from '../utils/FireStorageAPI';
import { getThumbnailForVideo } from '../utils/videoTools';

interface AppProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  docID: string;
}
function UploadedVidDetail({ setShowModal, docID }: AppProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const [videoDetailOnLoad, setVideoDetailOnload] = useState({
    userId: '',
    title: '',
    url: '',
    videoFileId: '',
    thumbnail: '',
    thumbnailFileId: '',
    description: '',
    collection: '',
    DOC_ID: '',
  });
  const [videoDetails, setVideoDetails] = useState({
    userId: '',
    title: '',
    url: '',
    videoFileId: '',
    thumbnail: '',
    thumbnailFileId: '',
    description: '',
    collection: '',
    DOC_ID: '',
  });
  const [newThumbnail, setNewThumbnail] = useState<File>();
  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string>(null);

  useEffect(() => {
    console.log('loading information from doc', docID);
    const getVideoInformation = async () => {
      const docRef = doc(db, 'videos', docID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const videoData = { ...docSnap.data(), DOC_ID: docSnap.id };
        setVideoDetails(videoData);
        setVideoDetailOnload(videoData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    getVideoInformation();

    return () => {};
  }, []);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  // const onClickCancel = () => {};

  const onChangeUpload = (e: any) => {
    const newCustomThumb = e.target.files[0];
    const url = URL.createObjectURL(newCustomThumb);
    setNewThumbnailUrl(url);
    setNewThumbnail(newCustomThumb);
  };

  const onClickThumb = async () => {
    const { imageUrl, thumbnailFile } = await getThumbnailForVideo(
      videoDetails.url,
      videoDetails.title
    );

    //setVideoDetails({ ...videoDetails, thumbnail: imageUrl });
    setNewThumbnailUrl(imageUrl);
    setNewThumbnail(thumbnailFile);
    // setVideoDetails({ ...videoDetails, thumbnail: imageUrl });
  };

  const onClickPickNewThumb = async () => {
    if (!newThumbnail) {
      alert('no new thumbnail');
      return;
    }
    await deleteFile(store, 'thumbnail', videoDetails.thumbnailFileId);
    const { downloadURL, docId: thumbId } = await uploadFileStorage(
      store,
      newThumbnail,
      'thumbnail'
    );
    setVideoDetails({
      ...videoDetails,
      thumbnail: downloadURL,
      thumbnailFileId: thumbId,
    });
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, {
      thumbnail: downloadURL,
      thumbnailFileId: thumbId,
    });
  };

  const onClickSave = async () => {
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, videoDetails);
    setShowModal(false);
  };

  return (
    <>
      <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='fixed mx-auto w-4/5 max-w-4xl h-5/6 overflow-y-auto'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-base-100 outline-none focus:outline-none '>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-2xl font-semibold'>
                {videoDetails && videoDetails.title}
              </h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowModal(false)}
              >
                <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className='relative p-6 flex-auto flex flex-row justify-around gap-3'>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Movie Title</span>
                </label>
                <input
                  type='text'
                  placeholder='Type here'
                  name='title'
                  value={videoDetails.title}
                  onChange={onChange}
                  className='input input-bordered w-full max-w-xs'
                />
                <label className='label'>
                  <span className='label-text'>Description</span>
                </label>
                <textarea
                  className='textarea textarea-bordered'
                  placeholder='description'
                  name='description'
                  value={videoDetails.description}
                  onChange={onChange}
                ></textarea>
                <label className='label'>
                  <span className='label-text'>Categories</span>
                </label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  name='collection'
                  value={videoDetails.collection}
                  onChange={onChange}
                >
                  <option disabled selected value={''}>
                    Select Category
                  </option>
                  <option>Documentary</option>
                  <option>Film</option>
                  <option>Short Film</option>
                  <option>Series</option>
                </select>
                <div className='flex flex-row gap-2'>
                  <div className=' w-1/3 '>
                    <label className='label'>
                      <span className='label-text'>Current</span>
                    </label>
                    <img src={videoDetails.thumbnail}></img>
                  </div>

                  <div className=' w-1/4 flex flex-col items-center justify-center'>
                    <label className='label'>
                      <span className='label-text'>update</span>
                    </label>
                    <button onClick={onClickPickNewThumb} className='btn'>
                      {'<'}
                    </button>
                  </div>
                  <div className=' w-1/3 '>
                    <label className='label'>
                      <span className='label-text'>New thumbnail</span>
                    </label>
                    <img src={newThumbnailUrl}></img>
                  </div>
                </div>

                <div className='flex flex-row gap-2'>
                  <div>
                    <label className='label'>
                      <span className='label-text'>Random</span>
                    </label>
                    <button onClick={onClickThumb} className='btn btn-primary'>
                      {' '}
                      Generate
                    </button>
                  </div>
                  <div>
                    <label className='label'>
                      <span className='label-text'>upload custom</span>
                    </label>
                    <input
                      type='file'
                      className='file-input file-input-bordered w-full max-w-xs'
                      onChange={onChangeUpload}
                    />
                  </div>
                </div>
              </div>
              <div className='form-control w-full max-w-xs'>
                <label className='label'>
                  <span className='label-text'>Video</span>
                </label>
                <video
                  src={videoDetails.url}
                  controls
                  poster={videoDetails.thumbnail}
                ></video>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={onClickSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  );
}

export default UploadedVidDetail;
