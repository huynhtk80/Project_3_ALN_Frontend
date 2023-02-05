import { httpsCallable } from '@firebase/functions';
import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminApproveC from '../components/AdminApproveC';
import AdminDashBoard from '../components/AdminDashBoard';
import AdminManageUsers from '../components/AdminManageUsers';
import UserCard from '../components/UserCard';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserDBContext } from '../providers/UserDBProvider';

function AdminOnly() {
  const fbcontext = useContext(FirebaseContext);
  const acontext = useContext(AuthContext);
  const { userProfile } = useContext(UserDBContext);
  const { user } = acontext;
  const { functions } = fbcontext;

  const { tool } = useParams();

  const renderAdmin = () => {
    if (!tool) {
      return <AdminDashBoard />;
    } else if (tool === 'approvecontent') {
      return <AdminApproveC />;
    } else if (tool === 'manageusers') {
      return <AdminManageUsers />;
    } else {
      return <AdminDashBoard />;
    }
  };

  return (
    <>
      <div className='pt-20 flex flex-row justify-center items-center pb-4'>
        <Link to='/home/admin/approvecontent'>
          <button className='btn btn-primary mx-1'>Approve Content</button>
        </Link>
        {/* <Link to='/home/admin/activeContent'>
          <button className='btn btn-primary mx-1'>Active Content</button>
        </Link>
        <Link to='/home/admin/rejectedcontent'>
          <button className='btn btn-primary mx-1'>Rejected Content</button>
        </Link> */}
        <Link to='/home/admin/manageusers'>
          <button className='btn btn-primary mx-1'>Manage Users</button>
        </Link>
      </div>
      {renderAdmin()}
    </>
  );
}

export default AdminOnly;
