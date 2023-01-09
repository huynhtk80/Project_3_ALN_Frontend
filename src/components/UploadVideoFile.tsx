import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useContext, useState } from 'react';
import { FirebaseContext } from '../providers/FirebaseProvider';

function UploadImage(props) {
  const docId = props.docId;
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const store = fbContext.store;
  const [file, setFile] = useState();
  const [progress, setProgress] = useState<number>();

  const handleVideoUpload = () => {
    if (!file) {
      alert('Please select a file');
      return;
    }
    const videoRef = ref(store, `video/${docId}`);
    console.log(`VideoRef is `, videoRef);
    const uploadTask = uploadBytesResumable(videoRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
        console.log('Upload is: ' + percentage + '% done');
        console.log('snapshot.state is: ' + snapshot.state);
      },
      (error) => {
        console.log('UPLOAD IMAGE ERROR!', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('Hero image available at:', downloadURL);
          const docRef = doc(db, `heroes/${docId}`);
          updateDoc(docRef, { imageUrl: downloadURL });
        });
      }
    );
  };

  return (
    <div>
      <input
        type='file'
        accept='video/*'
        onChange={(e) => {
          let selectedFile = e.target.files[0];
          setFile(selectedFile);
        }}
      />
      <button onClick={handleUpload}>UPLOAD IMAGE</button>
      {progress ? <div>progress: {progress}%</div> : <div />}
    </div>
  );
}

export default UploadImage;
