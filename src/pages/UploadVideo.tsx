import { useContext } from 'react';
import ListUserMovies from '../components/ListUserMovies';
import SelectAndUpFile from '../components/SelectAndUpFile';
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
      <SelectAndUpFile />

      <ListUserMovies />
    </>
  );
}

export default UploadVideo;
