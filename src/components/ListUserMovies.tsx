import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';

import { AuthContext } from '../providers/AuthProvider';
import ReactPlayer from 'react-player';
import UploadedVidDetail from './UploadedVidDetail';

function ListUserMovies() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [videos, setVideos] = useState([
    {
      userId: '',
      title: '',
      url: '',
      thumbnail: '',
      description: '',
      collection: '',
      DOC_ID: '',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentDocID, setCurrentDocID] = useState('');

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'videos');

    let queryRef = query(collectionRef, where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
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

  return (
    <>
      <div className='text-center text-cyan-900 tracking-wide text-3xl mt-6'>
        ListUserMovies
      </div>

      <div className='overflow-x-auto w-full'>
        <table className='table table-auto mx-auto'>
          <thead>
            <tr>
              <th>
                <label>
                  <input type='checkbox' className='checkbox' />
                </label>
              </th>
              <th>Video</th>
              <th>Title</th>
              <th>Description</th>
              <th>Collection</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {videos?.map((video) => {
              return (
                <tr>
                  <th>
                    <label>
                      <input type='checkbox' className='checkbox' />
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
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {showModal && (
        <UploadedVidDetail setShowModal={setShowModal} docID={currentDocID} />
      )}
    </>
  );
}

export default ListUserMovies;
