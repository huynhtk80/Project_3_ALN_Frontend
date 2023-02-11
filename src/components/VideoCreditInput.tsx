import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import {
  addMovieCast,
  deleteMovieCast,
  VideoParams,
} from '../utils/fireStoreAPI';

interface VideoCreditInputProps {
  video: VideoParams;
}
function VideoCreditInput({ video }: VideoCreditInputProps) {
  const fbContext = useContext(FirebaseContext);
  const { user, userRoles } = useContext(AuthContext);
  const db = fbContext.db;
  const [role, setRole] = useState<string>();
  const [name, setName] = useState<string>();

  const onClickHandle = async () => {
    if (!role || !name) {
      alert('role or name is missing');
      return;
    }
    await addMovieCast(db, video.DOC_ID, role, name);
    setRole('');
    setName('');
  };

  const onClickHandleRemove = async (rowRole: string, rowName: string) => {
    await deleteMovieCast(db, video.DOC_ID, rowRole, rowName);
  };

  return (
    <>
      <label className='label mt-3'>
        <span className='label-text'>Credits</span>
      </label>
      <div className='overflow-x-auto'>
        <table className='table table-compact w-full '>
          <thead>
            <tr>
              <td>Role</td>
              <td>Name</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {video?.credits?.map((vid) => (
              <>
                <tr>
                  <th>{vid.role}</th>
                  <th>{vid.name}</th>
                  <th>
                    <button
                      className='btn btn-xs btn-error'
                      onClick={() => onClickHandleRemove(vid.role, vid.name)}
                    >
                      X
                    </button>
                  </th>
                </tr>
              </>
            ))}

            <tr>
              <th>
                <input
                  className='input input-xs w-full input-bordered'
                  placeholder='input role'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                ></input>
              </th>
              <th>
                <input
                  className='input input-xs w-full input-bordered'
                  placeholder='input name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </th>
              <th>
                <button
                  className='btn btn-xs btn-secondary'
                  onClick={onClickHandle}
                >
                  +
                </button>
              </th>
            </tr>
          </tbody>
          {/* <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </>
  );
}

export default VideoCreditInput;
