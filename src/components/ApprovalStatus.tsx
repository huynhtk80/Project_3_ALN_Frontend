import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { VideoParams } from '../utils/fireStoreAPI';

interface Props {
  video: VideoParams;
}

function ApprovalStatus({ video }: Props) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const approval = video.approval;

  const onClickApproveHandle = async (action: 'cancel' | 'submit') => {
    const docRef = doc(db, 'videos', video.DOC_ID);
    if (action === 'submit') {
      await updateDoc(docRef, {
        approval: 'pending',
      });
    } else {
      await updateDoc(docRef, {
        approval: '',
      });
    }
  };

  if (approval == 'pending') {
    return (
      <>
        <p>pending</p>
        <button
          className='btn btn-primary btn-sm'
          onClick={() => onClickApproveHandle('cancel')}
        >
          Cancel
        </button>
      </>
    );
  } else if (approval === 'approved') {
    return <p>Approved</p>;
  } else if (approval === 'reject') {
    return (
      <>
        Rejected
        <div className=' inline-block dropdown dropdown-end'>
          <label
            tabIndex={0}
            className='btn btn-circle btn-ghost btn-xs text-info'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='w-4 h-4 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
          </label>
          <div
            tabIndex={0}
            className='card compact dropdown-content shadow bg-base-100 rounded-box w-64'
          >
            <div className='card-body'>
              <h2 className='card-title'>Reason for Rejection</h2>
              <p>{video.rejectMsg}</p>
            </div>
          </div>
        </div>
        <br />
        <button
          className='btn btn-primary btn-sm'
          onClick={() => onClickApproveHandle('submit')}
        >
          Resubmit for <br />
          Approval
        </button>
      </>
    );
  } else {
    return (
      <button
        className='btn btn-primary btn-sm'
        onClick={() => onClickApproveHandle('submit')}
      >
        Submit for <br />
        Approval
      </button>
    );
  }
}

export default ApprovalStatus;
