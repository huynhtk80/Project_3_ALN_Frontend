import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { deleteFile, uploadFileStorage } from '../utils/fireStorageAPI';
import { VideoParams } from '../utils/fireStoreAPI';
import { getThumbnailForVideo } from '../utils/videoTools';
import ApprovalStatus from './ApprovalStatus';
import DeleteModal from './DeleteModal';

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
    trailer: '',
    trailerFileId: '',
    trailerThumb: '',
    trailerThumbFileId: '',
  });
  const [newThumbnail, setNewThumbnail] = useState<File>();
  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [trailerFile, setTrailerFile] = useState<File>();
  const [trailerBlob, setTrailerBlob] = useState('');
  const [progress, setProgress] = useState(0);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isSaved = () => {
    if (videoDetails.title !== videoDetailOnLoad.title) return false;
    if (videoDetails.thumbnail !== videoDetailOnLoad.thumbnail) return false;
    if (videoDetails.thumbnailFileId !== videoDetailOnLoad.thumbnailFileId)
      return false;
    if (videoDetails.description !== videoDetailOnLoad.description)
      return false;
    if (videoDetails.collection !== videoDetailOnLoad.collection) return false;
    return true;
  };

  useEffect(() => {
    console.log('loading information from doc', docID);

    const docRef = doc(db, 'videos', docID);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const videoData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as VideoParams;
        setVideoDetails(videoData);
        setVideoDetailOnload(videoData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    });

    return unsubscribe;
  }, []);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoDetails({ ...videoDetails, [name]: value });
  };

  // const onClickCancel = () => {};

  const onChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newCustomThumb = e.target.files[0];
    const url = URL.createObjectURL(newCustomThumb);
    setNewThumbnailUrl(url);
    setNewThumbnail(newCustomThumb);
  };

  const onChangeUploadTrailer = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) {
      alert('no file selected');
      return;
    }

    setSaving(true);
    let file = e.target.files[0];
    setTrailerFile(file);
    const url = URL.createObjectURL(file);
    setTrailerBlob(url);

    try {
      const { imageUrl, thumbnailFile } = await getThumbnailForVideo(
        url,
        file.name
      );

      const { downloadURL: tempUrl, docId: videoFileId } =
        await uploadFileStorage(store, file, 'trailer', setProgress);
      console.log(progress);

      const { downloadURL: tempThumbUrl, docId: thumbFileId } =
        await uploadFileStorage(store, thumbnailFile, 'trailer');

      if (videoDetails.thumbnailFileId !== undefined) {
        if (videoDetails.trailerFileId)
          deleteFile(store, 'trailer', videoDetails.trailerFileId);
        if (videoDetails.trailerThumbFileId)
          deleteFile(store, 'trailer', videoDetails.trailerThumbFileId);
      }

      setVideoDetails({
        ...videoDetails,
        trailer: tempUrl,
        trailerFileId: videoFileId,
        trailerThumb: tempThumbUrl,
        trailerThumbFileId: thumbFileId,
      });

      const docRef = doc(db, 'videos', docID);
      await updateDoc(docRef, {
        ...videoDetails,
        trailer: tempUrl,
        trailerFileId: videoFileId,
        trailerThumb: tempThumbUrl,
        trailerThumbFileId: thumbFileId,
      });
      setSaving(false);
    } catch (e: any) {
      console.log(e.message);
    }
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
    setSaving(true);
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
    setSaving(false);
  };

  const onClickSave = async () => {
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, videoDetails);
  };

  const onBlurHandle = async () => {
    setSaving(true);
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, videoDetails);
    setSaving(false);
  };

  const onClickDeleteVideo = async () => {
    setShowDeleteModal(true);
  };

  const deleteVideo = async () => {
    const docRef = doc(db, 'videos', docID);
    await deleteFile(store, 'thumbnail', videoDetails.thumbnailFileId);
    await deleteFile(store, 'video', videoDetails.videoFileId);
    await deleteDoc(docRef);
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
              <div>
                <h3 className='text-2xl font-semibold inline'>
                  {videoDetails && videoDetails.title}
                </h3>
                {saving && <span>{'  '} Saving..</span>}
              </div>
              <div className='float-right'>
                <ApprovalStatus video={videoDetails} isSaved={isSaved()} />
              </div>

              {/* <button
                className='p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowModal(false)}
              >
                <span className='bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button> */}
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
                  onBlur={onBlurHandle}
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
                  onBlur={onBlurHandle}
                ></textarea>
                <label className='label'>
                  <span className='label-text'>Categories</span>
                </label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  name='collection'
                  value={videoDetails.collection}
                  onChange={onChange}
                  onBlur={onBlurHandle}
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
                      <span className='label-text'>replace</span>
                    </label>
                    <button onClick={onClickPickNewThumb} className='btn'>
                      {'<'}
                    </button>
                  </div>
                  <div className=' w-1/3 '>
                    <label className='label'>
                      <span className='label-text'>New thumbnail</span>
                    </label>
                    {newThumbnailUrl && <img src={newThumbnailUrl}></img>}
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
              <div className='form-control w-full max-w-xs flex flex-col'>
                <div>
                  <label className='label'>
                    <span className='label-text'>Video</span>
                  </label>
                  <video
                    src={videoDetails.url}
                    controls
                    poster={videoDetails.thumbnail}
                  ></video>
                </div>

                <label className='label mt-3'>
                  <span className='label-text'>Trailer</span>
                </label>
                {videoDetails.trailer === undefined ? (
                  <div className='card w-[80%] h-44 bg-base-100 shadow-xl image-full mt-1'>
                    <div className='border-2 m-2 rounded-xl flex justify-center items-center'>
                      <p>Trailer</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {console.log(videoDetails.trailer)}

                    <div className='card w-[80%] h-fit bg-base-100 shadow-xl image-full mt-1'>
                      <div className=' card-body border-2 p-0 rounded-xl flex justify-center items-center m-2'>
                        <video
                          className=' rounded-xl'
                          controls
                          src={videoDetails.trailer}
                          poster={videoDetails.trailerThumb}
                        ></video>
                      </div>
                    </div>
                  </>
                )}
                <div>
                  <label className='label'>
                    <span className='label-text'>Upload Trailer</span>
                  </label>
                  <input
                    type='file'
                    accept='video/*'
                    className='file-input file-input-bordered w-full max-w-xs'
                    onChange={onChangeUploadTrailer}
                  />
                  {saving && (
                    <div
                      className='radial-progress'
                      style={{ '--value': `${progress}` }}
                    >
                      {Math.floor(progress)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className='flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='btn btn-primary'
                type='button'
                onClick={onClickDeleteVideo}
              >
                Delete
              </button>
              <div>
                <button
                  className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='button'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteFunction={deleteVideo}
        />
      )}
    </>
  );
}

export default UploadedVidDetail;
