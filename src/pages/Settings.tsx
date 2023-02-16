import { doc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import PricingTiers from '../components/PricingTiers';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';

function Settings() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const userDBContext = useContext(UserDBContext);
  const userProfile = userDBContext?.userProfile;
  const db = fbContext.db;

  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    console.log('is public useE', userProfile.isPublic);
    if (userProfile.isPublic) {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
  }, [userProfile]);

  const onClickPublic = async () => {
    const docRef = await doc(db, 'userInfo', user.uid);

    if (isPublic) {
      await updateDoc(docRef, { isPublic: false });
    } else {
      await updateDoc(docRef, { isPublic: true });
    }
  };

  const onClickCreator = async () => {
    const docRef = await doc(db, 'userInfo', user.uid);

    await updateDoc(docRef, { requestCreator: 'requested' });
  };

  const contentCreatorRender = () => {
    if (userProfile.requestCreator === 'requested') {
      return <p>Pending Approval</p>;
    } else if (userProfile.requestCreator === 'approved') {
      return <p>You are an Approved Content Creator</p>;
    } else {
      return (
        <button onClick={onClickCreator} className='btn btn-primary'>
          Request To be a Content Creator
        </button>
      );
    }
  };

  return (
    <div className='pt-20 m-10'>
      <h1>Settings</h1>

      <div className='my-5'>
        <h2>Privacy Settings</h2>
        <div className='form-control w-52'>
          <label className='cursor-pointer label'>
            <span className='label-text'>Profile Visible to Others</span>
            <input
              type='checkbox'
              className='toggle toggle-secondary'
              onChange={onClickPublic}
              checked={isPublic}
            />
          </label>
        </div>
      </div>

      <h2>Content Creator</h2>
      {contentCreatorRender()}

      <PricingTiers />
    </div>
  );
}

export default Settings;
