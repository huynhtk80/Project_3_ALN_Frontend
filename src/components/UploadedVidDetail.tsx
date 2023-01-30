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
import { countryList } from '../utils/countyOptions';
import { deleteFileURL, uploadFileStorage } from '../utils/fireStorageAPI';
import { updateMovie, VideoParams } from '../utils/fireStoreAPI';
import { getThumbnailForVideo } from '../utils/videoTools';
import ApprovalStatus from './ApprovalStatus';
import DeleteModal from './DeleteModal';
import VideoDetails from './VideoDetails';
import Select from 'react-select';

interface UploadVidDetailProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  docID: string;
}
function UploadedVidDetail({ setShowModal, docID }: UploadVidDetailProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const store = fbContext.store;

  const [videoDetails, setVideoDetails] = useState<VideoParams>({
    userId: '',
    title: '',
    url: '',
    thumbnail: '',
    description: '',
    collection: '',
    DOC_ID: '',
    trailer: '',
    trailerThumb: '',
    country: [],
  });
  const [newThumbnail, setNewThumbnail] = useState<File>();
  const [newThumbnailUrl, setNewThumbnailUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [trailerFile, setTrailerFile] = useState<File>();
  const [trailerBlob, setTrailerBlob] = useState('');
  const [progress, setProgress] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    console.log('loading information from doc', docID);

    const docRef = doc(db, 'videos', docID);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const videoData = {
          ...docSnap.data(),
          DOC_ID: docSnap.id,
        } as VideoParams;
        setVideoDetails(videoData);
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

  const onChangeCountry = async (e) => {
    console.log(e);
    setVideoDetails({ ...videoDetails, country: e });
    console.log(videoDetails);
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

      const tempUrl = await uploadFileStorage(
        store,
        user.uid,
        file,
        'video',
        'trailer',
        setProgress
      );
      console.log(progress);

      const tempThumbUrl = await uploadFileStorage(
        store,
        user.uid,
        thumbnailFile,
        'video',
        'trailer'
      );

      if (videoDetails.trailer) deleteFileURL(store, videoDetails.trailer);
      if (videoDetails.trailerThumb)
        deleteFileURL(store, videoDetails.trailerThumb);

      setVideoDetails({
        ...videoDetails,
        trailer: tempUrl,
        trailerThumb: tempThumbUrl,
      });

      await updateMovie(db, docID, {
        ...videoDetails,
        trailer: tempUrl,
        trailerThumb: tempThumbUrl,
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
    await deleteFileURL(store, videoDetails.thumbnail);
    const downloadURL = await uploadFileStorage(
      store,
      user.uid,
      newThumbnail,
      'video',
      'thumbnail'
    );
    setVideoDetails({
      ...videoDetails,
      thumbnail: downloadURL,
    });
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, {
      thumbnail: downloadURL,
    });
    setSaving(false);
  };

  const onBlurHandle = async () => {
    setSaving(true);
    await updateMovie(db, docID, videoDetails);
    setSaving(false);
  };

  const onClickDeleteVideo = async () => {
    setShowDeleteModal(true);
  };

  const deleteVideo = async () => {
    const docRef = doc(db, 'videos', docID);
    if (videoDetails.thumbnail)
      await deleteFileURL(store, videoDetails.thumbnail);
    if (videoDetails.url) await deleteFileURL(store, videoDetails.url);
    if (videoDetails.trailer) await deleteFileURL(store, videoDetails.trailer);
    if (videoDetails.trailerThumb)
      await deleteFileURL(store, videoDetails.trailerThumb);
    await deleteDoc(docRef);
    setShowModal(false);
  };

  const countryOptions = countryList.map((country) => {
    return { value: country, label: country };
  });

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
                <ApprovalStatus video={videoDetails} />
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
                <label className='label'>
                  <span className='label-text'>Content Origin</span>
                </label>
                <Select
                  isMulti
                  name='country'
                  options={countryOptions}
                  value={videoDetails.country}
                  onChange={(e) => onChangeCountry(e)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                      ...theme.colors,
                      primary25: 'grey',
                      primary: 'base-content',
                      neutral0: 'white',
                    },
                  })}
                />

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
                <div>
                  <button
                    className='btn'
                    type='button'
                    onClick={() => setShowPreviewModal(true)}
                  >
                    Preview
                  </button>
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
      </div>

      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
      {showDeleteModal && (
        <DeleteModal
          setShowModal={setShowDeleteModal}
          deleteFunction={deleteVideo}
        />
      )}
      {showPreviewModal && (
        <VideoDetails setShowModal={setShowPreviewModal} docId={docID} />
      )}
    </>
  );
}

export default UploadedVidDetail;
