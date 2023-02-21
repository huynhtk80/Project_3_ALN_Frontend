import { useContext, useEffect, useState } from 'react';
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
import ConfirmModalInputMsg from './ConfirmModalInputMsg';
import { stringify } from 'uuid';

function AdminActiveC() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;

  const [videos, setVideos] = useState<VideoParams[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [rejectId, setRejectId] = useState('');
  const [currentDocID, setCurrentDocID] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');

  console.log(isCheck);

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(
      collectionRef,
      where('approval', '==', 'approved'),
      orderBy('approvalDate', 'desc')
    );
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setVideos(null);
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

    if (videos) setIsCheck(videos.map((video) => video.DOC_ID));

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
        approvalDate: serverTimestamp(),
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
      return (
        <>
          <p>Approved</p>
          <button
            className='btn btn-primary btn-sm'
            onClick={() => onClickApproveHandle(viddocId, 'reject')}
          >
            Reject
          </button>
        </>
      );
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
      <div className='text-center text-primary-content tracking-wide lg:text-3xl mt-6 p-5'>
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
              <th>Approval Date</th>
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

                  <td>
                    {video.approvalDate &&
                      new Date(
                        video?.approvalDate?.seconds * 1000
                      ).toDateString()}
                  </td>
                  <th>
                    <button
                      className='btn btn-ghost btn-xs'
                      onClick={() => onClickHandle(video.DOC_ID)}
                    >
                      details
                    </button>
                  </th>
                  <th>
                    {video.approval &&
                      renderApprovalStatus(video.approval, video.DOC_ID)}
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
              <th>Approval Date</th>
              <th>Details</th>
              <th>Approval</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {showModal && (
        <VideoEditDetails setShowModal={setShowModal} docID={currentDocID} />
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

export default AdminActiveC;
