import {
  collection,
  getCountFromServer,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { UserProfileProps } from '../pages/EditProfile';

function AdminDashBoard() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [users, setUsers] = useState<UserProfileProps[]>();

  const onClickGetStats = async () => {
    const userCollectionRef = collection(db, 'userInfo');

    //beta feature getCountFromServer
    const userCountSnap = await getCountFromServer(userCollectionRef);
    console.log('user count', userCountSnap.data().count);

    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    // console.log(currentTime);
    // const lastWeek = currentTime - 7 * 24 * 60 * 60 * 1000;
    const queryUserActiveWeekCount = query(
      userCollectionRef,
      where('lastOnline', '>', lastWeek)
    );
    const userActiveWeekCount = await getCountFromServer(
      queryUserActiveWeekCount
    );
    console.log('online this week', userActiveWeekCount.data().count);

    const usersWeek = await getDocs(queryUserActiveWeekCount);
    console.log(
      'user weeks',
      usersWeek.docs.map((doc) => console.log(doc.data()))
    );

    // if(userQuerySnap.empty){
    //   console.log("no users")
    // }else {
    //   let userData = userQuerySnap.docs.map(
    //     (doc) =>
    //       ({
    //         ...doc.data(),
    //         DOC_ID: doc.id,
    //       } as UserProfileProps)
    //   );
    //   setUsers(userData);

    // }
    const videoCollectionRef = collection(db, 'videos');
    const videoCountSnap = await getCountFromServer(videoCollectionRef);
    console.log('video count', userCountSnap.data().count);
  };

  return (
    <>
      <p className=' text-center'>Stats currently using mock data</p>
      <div className='flex flex-row flex-wrap justify-center gap-3'>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src='https://images.unsplash.com/photo-1553775927-a071d5a6a39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1387&q=80'
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            {/* <h2 className='card-title'>Stats</h2> */}
            {/* <p>Click the button to watch on Jetflix app.</p> */}
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Total Page Views</div>
                  <div className='stat-value'>89,400</div>
                  <div className='stat-desc'>21% more than last month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src='https://images.unsplash.com/photo-1553775927-a071d5a6a39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1387&q=80'
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            {/* <h2 className='card-title'>Stats</h2> */}
            {/* <p>Click the button to watch on Jetflix app.</p> */}
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'># Active Content</div>
                  <div className='stat-value'>1000</div>
                  <div className='stat-desc'>21% more than last month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src='https://images.unsplash.com/photo-1553775927-a071d5a6a39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1387&q=80'
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            {/* <h2 className='card-title'>Stats</h2> */}
            {/* <p>Click the button to watch on Jetflix app.</p> */}
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Content pending approval</div>
                  <div className='stat-value'>3</div>
                  <div className='stat-desc'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src='https://images.unsplash.com/photo-1553775927-a071d5a6a39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1387&q=80'
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            {/* <h2 className='card-title'>Stats</h2> */}
            {/* <p>Click the button to watch on Jetflix app.</p> */}
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='stat-title'>Total Number of User</div>
                  <div className='stat-value'>100</div>
                  <div className='stat-desc'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className='btn btn-primary' onClick={onClickGetStats}>
          get stats
        </button>
      </div>
    </>
  );
}

export default AdminDashBoard;
