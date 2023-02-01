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

  const onClickHandle = async () => {
    const result = await addAdmin({ email: user.email });
    console.log(result);
  };

  return (
    <>
      <div>AdminOnly</div>
      <button className='btn btn-primary' onClick={onClickHandle}>
        add me as a admin
      </button>
    </>
  );
}

export default AdminOnly;
