import {
  addDoc,
  collection,
  getCountFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import flimprojectimg from '../assets/filmprojector.jpg';
import { UserProfileProps } from '../pages/EditProfile';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

interface Stats {
  allUsers: number;
  usersActiveLastWeek: number;
  newUsers: number;
  videoCount: number;
  approvedVideos: number;
  pendingVideos: number;
  statsDate?: Timestamp;
  DOC_ID?: string;
}

function AdminDashBoard() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;
  const [users, setUsers] = useState<UserProfileProps[]>();
  const [stats, setStats] = useState<Stats>({
    allUsers: 0,
    usersActiveLastWeek: 0,
    newUsers: 0,
    videoCount: 0,
    approvedVideos: 0,
    pendingVideos: 0,
  });

  useEffect(() => {
    if (!user) return;
    let collectionRef = collection(db, 'stats');

    let queryRef = query(collectionRef, orderBy('statsDate', 'desc'), limit(1));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log('No docs found');
        setStats({
          allUsers: 0,
          usersActiveLastWeek: 0,
          newUsers: 0,
          videoCount: 0,
          approvedVideos: 0,
          pendingVideos: 0,
        });
      } else {
        let videoData = querySnap.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              DOC_ID: doc.id,
            } as Stats)
        );
        setStats(videoData[0]);
        console.log(videoData);
      }
    });
    return unsubscribe;
  }, [user]);

  const onClickGetStats = async () => {
    const userCollectionRef = collection(db, 'userInfo');

    //beta feature getCountFromServer
    const userCountSnap = await getCountFromServer(userCollectionRef);
    const allUsers = userCountSnap.data().count;

    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const queryUserActiveWeekCount = query(
      userCollectionRef,
      where('lastOnline', '>', lastWeek)
    );
    const userActiveWeekCount = await getCountFromServer(
      queryUserActiveWeekCount
    );
    console.log('online this week', userActiveWeekCount.data().count);
    const usersActiveLastWeek = userActiveWeekCount.data().count;

    const queryNewUsersWeekCount = query(
      userCollectionRef,
      where('createdAt', '>', lastWeek)
    );
    const newUserWeekCount = await getCountFromServer(queryNewUsersWeekCount);

    const newUsers = newUserWeekCount.data().count;
    console.log('weekly new users', newUsers);

    const videoCollectionRef = collection(db, 'videos');
    const videoCountSnap = await getCountFromServer(videoCollectionRef);
    const videoCount = videoCountSnap.data().count;
    console.log('video count', videoCount);

    const queryApprovedVideos = query(
      videoCollectionRef,
      where('approval', '==', 'approved')
    );
    const approvedVideosSnap = await getCountFromServer(queryApprovedVideos);
    const approvedVideos = approvedVideosSnap.data().count;
    console.log('approved video count', approvedVideos);

    const queryPendingVideos = query(
      videoCollectionRef,
      where('approval', '==', 'pending')
    );
    const pendingVideosSnap = await getCountFromServer(queryPendingVideos);
    const pendingVideos = pendingVideosSnap.data().count;
    console.log('pending video count', pendingVideos);

    const statsCollection = collection(db, 'stats');
    await addDoc(statsCollection, {
      allUsers,
      usersActiveLastWeek,
      newUsers,
      videoCount,
      approvedVideos,
      pendingVideos,
      statsDate: serverTimestamp(),
    });
  };

  return (
    <>
      <p className=' text-center'>
        Stats from{' '}
        {stats.statsDate &&
          new Date(stats?.statsDate?.seconds * 1000).toDateString()}
      </p>
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src='https://images.unsplash.com/photo-1553775927-a071d5a6a39a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1387&q=80'
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>User Stats</h2>
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='mb-4'>
                    <div className='stat-title'>Total Users</div>
                    <div className='stat-value'>{stats?.allUsers}</div>
                  </div>
                  <div className='mb-4'>
                    <div className='stat-title'>New Users</div>
                    <div className='stat-value'>{stats?.newUsers}</div>
                    <div className='stat-desc'>this week</div>
                  </div>
                  <div>
                    <div className='stat-title'>Active Users</div>
                    <div className='stat-value'>
                      {stats?.usersActiveLastWeek}
                    </div>
                    <div className='stat-desc'>this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='card card-side bg-base-100 shadow-xl w-96'>
          <figure>
            <img
              className=' object-cover min-h-full'
              src={flimprojectimg}
              alt='Movie'
            />
          </figure>
          <div className='card-body'>
            <h2 className='card-title'>Video Stats</h2>
            <div className='card-actions justify-end'>
              <div className='stats shadow'>
                <div className='stat'>
                  <div className='mb-4'>
                    <div className='stat-title'>All Video Files</div>
                    <div className='stat-value'>{stats?.videoCount}</div>
                  </div>
                  <div className='mb-4'>
                    <div className='stat-title'>Active Video Count</div>
                    <div className='stat-value'>{stats?.approvedVideos}</div>
                    {/* <div className='stat-desc'>this week</div> */}
                  </div>
                  <div>
                    <div className='stat-title'>Pending Approval</div>
                    <div className='stat-value'>{stats?.pendingVideos}</div>
                    {/* <div className='stat-desc'>this week</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className='btn btn-primary max-w-sm mx-auto my-5'
        onClick={onClickGetStats}
      >
        get stats
      </button>
    </>
  );
}

export default AdminDashBoard;
