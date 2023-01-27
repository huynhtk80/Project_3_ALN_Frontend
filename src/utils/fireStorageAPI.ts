import {
  deleteObject,
  FirebaseStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const uploadFileStorage = async (
  store: any,
  uId: string,
  file: File,
  location: 'video' | 'user' | 'audio',
  collection?: 'profile' | 'thumbnail' | 'trailer',
  setProgress?: React.Dispatch<React.SetStateAction<number>>
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const docId = uuidv4();
    let collectionString = '';
    if (!collection) {
      collectionString = docId;
    } else {
      collectionString = `${collection}/${docId}`;
    }
    const FileRef = ref(store, `${uId}/${location}/${collectionString}`);
    console.log(FileRef);
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

//should beable to remove this function
// export const deleteFile = async (
//   store: any,
//   uId: string,
//   FileId: string,
//   location: 'video' | 'user' | 'audio',
//   collection?: 'profile' | 'thumbnail' | 'trailer'
// ) => {
//   let collectionString = '';

//   if (!collection) {
//     collectionString = FileId;
//   } else {
//     collectionString = `${collection}/${FileId}`;
//   }

//   const fileRef = ref(store, `${uId}/${location}/${collectionString}`);

//   // Delete the file
//   deleteObject(fileRef)
//     .then(() => {
//       console.log('File deleted successfully');
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };

export const deleteFileURL = async (store: FirebaseStorage, url: string) => {
  const fileRef = ref(store, url);

  // Delete the file
  deleteObject(fileRef)
    .then(() => {
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.log(error.message);
    });
};
