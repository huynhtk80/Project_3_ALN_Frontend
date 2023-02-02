import { httpsCallable } from '@firebase/functions';
import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

function AdminOnly() {
  const fbcontext = useContext(FirebaseContext);
  const acontext = useContext(AuthContext);
  const { user } = acontext;
  const { functions } = fbcontext;

  const addAdmin = httpsCallable(functions, 'addAdminRole');
  const addCreator = httpsCallable(functions, 'addCreatorRole');
  const deleteCreator = httpsCallable(functions, 'deleteCreatorRole');

  const onClickHandle = async () => {
    const result = await addAdmin({ email: user.email });
    console.log(result);
  };

  const onClickHandleCreator = async () => {
    const result = await addCreator({ email: user.email });
    console.log(result);
  };

  const onClickHandleDelCreator = async () => {
    const result = await deleteCreator({ email: user.email });
    console.log(result);
  };

  return (
    <>
      <div className='pt-20'>AdminOnly</div>
      <button className='btn btn-primary glass' onClick={onClickHandle}>
        add me as a admin
      </button>
      <button className='btn btn-primary' onClick={onClickHandleCreator}>
        add me as a content creator
      </button>
      <button className='btn btn-primary' onClick={onClickHandleDelCreator}>
        delete me as a content creator
      </button>
    </>
  );
}

export default AdminOnly;
