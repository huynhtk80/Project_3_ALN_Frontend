import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';
import { AuthContext } from '../providers/AuthProvider';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import ReactPlayer from 'react-player';
import { uploadFileStorage } from '../utils/FireStorageAPI';
import ListUserMovies from '../components/ListUserMovies';
import SelectAndUpFile from '../components/SelectAndUpFile';
import { addMovie } from '../utils/FireStoreAPI';
import UploadedVidDetail from '../components/UploadedVidDetail';

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
