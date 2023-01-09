import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseProvider } from "../providers/FirebaseProvider";

export const UploadVideo = (file, docId) => {
  const videoRef = ref(store, `video/${docId}`);
  console.log(`VideoRef is `, videoRef);
  const uploadTask = uploadBytesResumable(videoRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percentage =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
      console.log("Upload is: " + percentage + "% done");
      console.log("snapshot.state is: " + snapshot.state);
    },
    (error) => {
      console.log("UPLOAD IMAGE ERROR!", error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("Hero image available at:", downloadURL);
        const docRef = doc(db, `heroes/${docId}`);
        updateDoc(docRef, { imageUrl: downloadURL });
      });
    }
  );
};
