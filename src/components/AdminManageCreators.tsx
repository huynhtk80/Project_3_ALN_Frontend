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
import { VideoParams } from '../utils/fireStoreAPI';
import ConfirmModalInputMsg from './ConfirmModalInputMsg';
import { UserProfileProps } from '../pages/EditProfile';
import { httpsCallable } from 'firebase/functions';
import { stringify } from 'uuid';
import UserCard from './UserCard';

function AdminManageCreators() {
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
      where('requestCreator', '==', 'requested')
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
        getUserRoles(userData);
      }
    });
    return unsubscribe;
  }, [user]);

  const getUserRoles = async (users: UserProfileProps[]) => {
    if (!users) return;

    const searchUsers = users.map((user) => {
      return { uid: user.DOC_ID };
    });

    const result = await getRoles(searchUsers);
    console.log('the roles', result);
    const merged = mergeArrays(users, result.data);

    console.log('the merged', merged);
    if (!merged) return;
    setUsers(merged);
  };

  const onClickHandle = (DocId: string) => {
    setCurrentDocID(DocId);
    setShowModal(true);
  };

  const onClickHandleAdmin = async (uid: string) => {
    const result = await addAdmin({ uid: uid });
    if (users) getUserRoles(users);
    console.log(result);
  };

  const onClickHandleDelAdmin = async (uid: string) => {
    const result = await delAdmin({ uid: uid });
    if (users) getUserRoles(users);
    console.log(result);
  };

  const onClickHandleCreator = async (uid: string) => {
    const result = await addCreator({ uid: uid });
    if (users) getUserRoles(users);
    console.log(result);
  };

  const onClickHandleDelCreator = async (uid: string) => {
    const result = await deleteCreator({ uid: uid });
    if (users) getUserRoles(users);
    console.log(result);
  };

  const mergeArrays = (
    arr1: UserProfileProps[],
    arr2: { DOC_ID: string; roles: { admin: boolean; creator?: boolean } }[]
  ) => {
    let res = [];
    res = arr1.map((obj) => {
      const index = arr2.findIndex((el) => el['DOC_ID'] == obj['DOC_ID']);

      //@ts-ignore
      const { roles } = index !== -1 ? arr2[index] : {};
      return {
        ...obj,
        roles,
      };
    });
    return res;
  };

  const handleSelectAll = (e: any) => {
    setIsCheckAll(!isCheckAll);

    if (users) setIsCheck(users.map((user) => user.DOC_ID));

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
      const docRef = doc(db, 'userInfo', id);
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

  return (
    <>
      <div className='text-center text-primary-content tracking-wide lg:text-3xl mt-6 p-5'>
        User List
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
              <th>Roles</th>
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
                  <td>{`${user.firstName} ${user.lastName}`}</td>
                  <td className='min-w-[12rem] max-w-[20rem] whitespace-normal'>
                    {user.emailAddress}
                  </td>
                  <td>{user.DOC_ID}</td>
                  <th>
                    {user.roles?.admin && <p>Admin</p>}
                    {user.roles?.creator && <p>Creator</p>}
                  </th>
                  <th>
                    {user.roles?.admin ? (
                      <button
                        className='btn btn-warning btn-sm'
                        onClick={() => onClickHandleDelAdmin(user.DOC_ID)}
                      >
                        Remove admin
                      </button>
                    ) : (
                      <button
                        className='btn btn-sucess btn-sm'
                        onClick={() => onClickHandleAdmin(user.DOC_ID)}
                      >
                        set admin
                      </button>
                    )}
                    {user.roles?.creator ? (
                      <button
                        className='btn btn-error btn-sm'
                        onClick={() => onClickHandleDelCreator(user.DOC_ID)}
                      >
                        Remove creator
                      </button>
                    ) : (
                      <button
                        className='btn btn-primary btn-sm'
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
              <th>Roles</th>
              <th>Modify Roles</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default AdminManageCreators;
