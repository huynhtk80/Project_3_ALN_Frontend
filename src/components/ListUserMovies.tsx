import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { AuthContext } from '../providers/AuthProvider';

import VideoEditDetails from './VideoEditDetails';
import { VideoParams } from '../utils/fireStoreAPI';
import ApprovalStatus from './ApprovalStatus';
import VideoTagsMultiInput from './VideoTagsMultiInput';

function ListUserMovies() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState<VideoParams[]>([
    {
      userId: '',
      title: '',
      url: '',
      thumbnail: '',
      description: '',
      collection: '',
      DOC_ID: '',
      approval: '',
      rejectMsg: '',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentDocID, setCurrentDocID] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(collectionRef, where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setVideos([]);
      } else {
        let videoData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as VideoParams)
        );
        setVideos(videoData);
      }
    });
    return unsubscribe;
  }, [user]);

  const onClickHandle = (DocId: string) => {
    setCurrentDocID(DocId);
    setShowModal(true);
  };

  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);

    setIsCheck(videos.map((video) => video.DOC_ID));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleCheckClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const onClickUpdateMulti = async () => {
    isCheck.map(async (id) => {
      const docRef = doc(db, 'videos', id);
      if (select == 'Category') {
        await updateDoc(docRef, {
          collection: category,
        });
        alert('Updated Category of selected');
        setCategory('');
      } else if (select === 'Submit for Approval') {
        const videoDoc = videos.find((vid) => vid.DOC_ID === id);
        if (
          videoDoc?.approval !== 'approved' &&
          videoDoc?.approval !== 'deleted'
        )
          await updateDoc(docRef, {
            approval: 'pending',
            submitforApprovalDate: serverTimestamp(),
          });
      } else if (select === 'Tags') {
        try {
          await updateDoc(docRef, { tags: tags });
          alert('Updated Tags of selected');
          setTags([]);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <>
      <div className='text-center text-primary-content tracking-wide lg:text-3xl mt-6 p-4'>
        List User Movies
      </div>

      <div className='overflow-x-auto w-full'>
        <table className='table table-auto mx-auto'>
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type='checkbox'
                    className='checkbox'
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                </label>
              </th>
              <th>Video</th>
              <th>Title</th>
              <th>Collection</th>
              <th>Details</th>
              <th>approval</th>
            </tr>
          </thead>
          <tbody>
            {isCheck?.length > 0 ? (
              <tr>
                <td colSpan={6}>
                  {' '}
                  Update Multiple:
                  <select
                    className='select select-bordered  max-w-xs'
                    name='collection'
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option disabled selected value={''}>
                      Select property
                    </option>
                    <option>Category</option>
                    <option>Tags</option>
                    <option>Submit for Approval</option>
                  </select>
                  {select === 'Category' ? (
                    <select
                      className='select select-bordered  max-w-xs'
                      name='collection'
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option disabled selected value={''}>
                        Select Category
                      </option>
                      <option>Documentary</option>
                      <option>Film</option>
                      <option>Short Film</option>
                      <option>Series</option>
                      <option>Podcast</option>
                    </select>
                  ) : null}
                  {select === 'Tags' ? (
                    <VideoTagsMultiInput tags={tags} setTags={setTags} />
                  ) : null}
                  <button className='btn' onClick={onClickUpdateMulti}>
                    Update Selected
                  </button>
                </td>
              </tr>
            ) : null}
            {videos?.map((video) => {
              return (
                <tr key={video.DOC_ID}>
                  <th>
                    <label>
                      <input
                        id={video.DOC_ID}
                        type='checkbox'
                        className='checkbox'
                        checked={isCheck?.includes(video.DOC_ID)}
                        onChange={handleCheckClick}
                      />
                    </label>
                  </th>
                  <td>
                    <img
                      className='max-h-36'
                      height='100%'
                      src={video.thumbnail}
                    />
                  </td>
                  <td>{video.title}</td>
                  <td>{video.collection}</td>
                  <th>
                    <button
                      className='btn btn-ghost btn-xs'
                      onClick={() => onClickHandle(video.DOC_ID)}
                    >
                      details
                    </button>
                  </th>
                  <th>
                    <ApprovalStatus video={video} />
                  </th>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>Video</th>
              <th>Title</th>
              <th>Collection</th>
              <th>Details</th>
              <th>Approval</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {showModal && (
        <VideoEditDetails setShowModal={setShowModal} docID={currentDocID} />
      )}
    </>
  );
}

export default ListUserMovies;
