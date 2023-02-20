import { useContext } from 'react';
import ListUserMovies from '../components/ListUserMovies';
import VideoSelectAndUpload from '../components/VideoSelectAndUpload';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

function UploadVideo() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <>
      <VideoSelectAndUpload />

      <ListUserMovies />
    </>
  );
}

export default UploadVideo;
