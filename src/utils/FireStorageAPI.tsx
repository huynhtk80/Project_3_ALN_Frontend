import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { FirebaseProvider } from '../providers/FirebaseProvider';
import { v4 as uuidv4 } from 'uuid';
import { updateDoc } from 'firebase/firestore';

export const uploadFile = async (
  store: any,
  file: File,
  location: 'video' | 'image' | 'audio',
  setProgress?: React.Dispatch<React.SetStateAction<number>>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const docId = uuidv4();
    const FileRef = ref(store, `${location}/${docId}`);
    const uploadTask = uploadBytesResumable(FileRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress && setProgress(percentage);
      },
      (error) => {
        console.log('UPLOAD IMAGE ERROR!', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
