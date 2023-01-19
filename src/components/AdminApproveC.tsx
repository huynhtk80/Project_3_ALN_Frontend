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
} from 'firebase/firestore';

import { AuthContext } from '../providers/AuthProvider';

import UploadedVidDetail from './UploadedVidDetail';
import { VideoParams } from '../utils/FireStoreAPI';
import ConfirmModalInputMsg from './ConfirmModalInputMsg';

function AdminApproveC() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState<[VideoParams] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [rejectId, setRejectId] = useState('');
  const [currentDocID, setCurrentDocID] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');

  console.log(isCheck);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(collectionRef, where('approval', '==', 'pending'));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setVideos(null);
      } else {
        let videoData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
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

  const handleCheckClick = (e: any) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const onClickUpdateMulti = async () => {
    isCheck.map(async (id) => {
      const docRef = doc(db, 'videos', id);
      if (select == 'Collections') {
        await updateDoc(docRef, {
          collection: category,
        });
      } else if (select === 'Submit for Approval') {
        await updateDoc(docRef, {
          approval: 'pending',
        });
      }
    });
  };

  const onClickApproveHandle = async (
    videoId: string,
    action: 'cancel' | 'submit' | 'approved' | 'reject'
  ) => {
    const docRef = doc(db, 'videos', videoId);
    if (action === 'approved') {
      await updateDoc(docRef, {
        approval: 'approved',
      });
    } else if (action === 'reject') {
      setConfirmModalShow(true);
      setRejectId(videoId);
    } else {
      await updateDoc(docRef, {
        approval: '',
      });
    }
  };

  const renderApprovalStatus = (approval: string, viddocId: string) => {
    if (approval == 'pending') {
      return (
        <>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => onClickApproveHandle(viddocId, 'approved')}
          >
            Approve
          </button>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => onClickApproveHandle(viddocId, 'reject')}
          >
            Reject
          </button>
        </>
      );
    } else if (approval === 'approved') {
      return <p>Approved</p>;
    } else {
      return <></>;
    }
  };

  const rejectWithMessage = async (inputMsg: string) => {
    const docRef = doc(db, 'videos', rejectId);
    await updateDoc(docRef, {
      approval: 'reject',
      rejectMsg: inputMsg,
    });
  };

  return (
    <>
      <div className='text-center text-cyan-900 tracking-wide text-3xl mt-6'>
        Content to be Approved
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
              <th>Description</th>
              <th>Collection</th>
              <th>Details</th>
              <th>approval</th>
            </tr>
          </thead>
          <tbody>
            {isCheck.length > 0 ? (
              <tr>
                <td colSpan={7}>
                  {' '}
                  Update Multiple:
                  <select
                    className='select select-bordered w-full max-w-xs'
                    name='collection'
                    value={select}
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option disabled selected value={''}>
                      Select property
                    </option>
                    <option>Collections</option>
                    <option>Tags</option>
                    <option>Approval</option>
                  </select>
                  {select === 'Collections' ? (
                    <select
                      className='select select-bordered w-full max-w-xs'
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
                    </select>
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
                        checked={isCheck.includes(video.DOC_ID)}
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
                  <td className='min-w-[12rem] max-w-[20rem] whitespace-normal'>
                    {video.description}
                  </td>
                  <td>{video.collection}</td>
                  <th>
                    <button
                      className='btn btn-ghost btn-xs'
                      onClick={() => onClickHandle(video.DOC_ID)}
                    >
                      details
                    </button>
                  </th>
                  <th>{renderApprovalStatus(video.approval, video.DOC_ID)}</th>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <th></th>
              <th>Video</th>
              <th>Title</th>
              <th>Description</th>
              <th>Collection</th>
              <th>Details</th>
              <th>Approval</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {showModal && (
        <UploadedVidDetail setShowModal={setShowModal} docID={currentDocID} />
      )}
      {confirmModalShow && (
        <ConfirmModalInputMsg
          setShowModal={setConfirmModalShow}
          modalFunction={rejectWithMessage}
          headingMessage='Confirm Reject'
          bodyMessage='Please provide information for rejection reason'
          inputLabel='Rejection Reason'
        />
      )}
    </>
  );
}

export default AdminApproveC;
