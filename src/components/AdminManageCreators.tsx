import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';

import { AuthContext } from '../providers/AuthProvider';

import { httpsCallable } from 'firebase/functions';
import { UserProfileProps } from '../pages/EditProfile';
import Loadingspiner from './Loadingspiner';
import { Link } from 'react-router-dom';

interface AdminManageCreatorsProps {
  requestStatus: 'requested' | 'approved' | null;
}

function AdminManageCreators({ requestStatus }: AdminManageCreatorsProps) {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const { functions, db } = fbContext;

  const [users, setUsers] = useState<UserProfileProps[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [rejectId, setRejectId] = useState('');
  const [currentDocID, setCurrentDocID] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [select, setSelect] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //cloud functions
  interface RolesInterfaceRes {
    DOC_ID: string;
    roles: { admin: boolean; creator?: boolean };
  }

  interface RolesInterfaceReq {
    uid: string;
  }

  const getRoles = httpsCallable<RolesInterfaceReq[], RolesInterfaceRes[]>(
    functions,
    'getUsersRoles'
  );
  const addAdmin = httpsCallable(functions, 'addAdminRoleById');
  const delAdmin = httpsCallable(functions, 'deleteAdminRoleById');
  const addCreator = httpsCallable(functions, 'addCreatorRoleById');
  const deleteCreator = httpsCallable(functions, 'deleteCreatorRoleById');

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'userInfo');

    let queryRef = query(
      collectionRef,
      where('requestCreator', '==', requestStatus)
    );
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setUsers(null);
      } else {
        let userData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as UserProfileProps)
        );
        setUsers(userData);
      }
    });
    return unsubscribe;
  }, [user]);

  const onClickHandleCreator = async (uid: string) => {
    setIsLoading(true);
    const result = await addCreator({ uid: uid });
    const docRef = doc(db, 'userInfo', uid);

    //@ts-ignore
    if (result.data?.message === 'success')
      await updateDoc(docRef, { requestCreator: 'approved' });

    setIsLoading(false);
    console.log(result);
  };

  const onClickHandleDelCreator = async (uid: string) => {
    setIsLoading(true);
    const result = await deleteCreator({ uid: uid });
    const docRef = doc(db, 'userInfo', uid);
    //@ts-ignore
    if (result.data?.message === 'success')
      await updateDoc(docRef, { requestCreator: null });

    setIsLoading(false);
    console.log(result);
  };

  return (
    <>
      <div className='text-center text-primary-content tracking-wide lg:text-3xl mt-6 p-5'>
        Content Creator {requestStatus?.toUpperCase()}{' '}
        {isLoading && <Loadingspiner />}
      </div>

      <div className='overflow-x-auto w-full'>
        <table className='table table-auto mx-auto'>
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input
                    type='checkbox'
                    className='checkbox'
                    onChange={handleSelectAll}
                    checked={isCheckAll}
                  />
                </label>
              </th> */}
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>User ID</th>

              <th>Modify Roles</th>
            </tr>
          </thead>
          <tbody>
            {/* {isCheck.length > 0 ? (
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
            ) : null} */}
            {users?.map((user) => {
              return (
                <tr key={user.DOC_ID}>
                  {/* <th>
                    <label>
                      <input
                        id={user.DOC_ID}
                        type='checkbox'
                        className='checkbox'
                        checked={isCheck.includes(user.DOC_ID)}
                        onChange={handleCheckClick}
                      />
                    </label>
                  </th> */}
                  <td>
                    <img
                      className='max-h-16 avatar rounded-full'
                      height='100%'
                      src={user.photo}
                    />
                  </td>
                  <td>
                    <Link to={`/home/profile/${user.DOC_ID}`}>
                      {' '}
                      {`${user.firstName} ${user.lastName}`}
                    </Link>
                  </td>
                  <td className='min-w-[12rem] max-w-[20rem] whitespace-normal'>
                    {user.emailAddress}
                  </td>
                  <td>{user.DOC_ID}</td>
                  <th>
                    {user.requestCreator === 'approved' ? (
                      <button
                        className='btn btn-error btn-sm'
                        onClick={() => onClickHandleDelCreator(user.DOC_ID)}
                      >
                        Remove creator
                      </button>
                    ) : (
                      <button
                        className='btn btn-success border-none btn-sm'
                        onClick={() => onClickHandleCreator(user.DOC_ID)}
                      >
                        Set creator
                      </button>
                    )}
                  </th>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              {/* <th></th> */}
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>User ID</th>

              <th>Modify Roles</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default AdminManageCreators;
