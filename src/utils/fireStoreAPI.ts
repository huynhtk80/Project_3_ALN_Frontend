import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';

//to do remove unneeded fill ID's
export interface VideoParams {
  userId: string;
  title: string;
  titleUpper?: string;
  url: string;

  thumbnail: string;

  description: string;
  descriptionUpper?: string;
  collection: string;
  approval?: string;
  DOC_ID: string;
  rejectMsg?: string;
  trailer?: string;
  country?: string[];
  trailerThumb?: string;
}

export const addMovie = async (videoDoc: VideoParams, db: any) => {
  try {
    let collectionRef = collection(db, 'videos');
    const docref = await addDoc(collectionRef, {
      ...videoDoc,
      titleUpper: videoDoc.title.toUpperCase(),
      createAt: serverTimestamp(),
    });
    return docref.id;
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};

export const updateMovie = async (
  db: any,
  docID: string,
  videoDoc: Partial<VideoParams>
) => {
  const updateUpper = videoDoc;

  if (updateUpper.title) {
    updateUpper.titleUpper = updateUpper.title.toUpperCase();
  }
  if (updateUpper.description) {
    updateUpper.descriptionUpper = updateUpper.description.toUpperCase();
  }

  try {
    const docRef = doc(db, 'videos', docID);
    await updateDoc(docRef, { ...updateUpper, lastUpdated: serverTimestamp() });
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};

export const updateMovieComments = async (
  db: any,
  docID: string,
  uid: string,
  avatar: string,
  name: string,
  content: string
) => {
  try {
    const docRef = doc(db, 'videos', docID);

    if (!avatar) {
      avatar = '';
    }
    if (!name) {
      name = '';
    }

    await updateDoc(docRef, {
      comments: arrayUnion({
        uid,
        avatar,
        name,
        content,
        commentTime: Timestamp.now(),
      }),
    });
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};

export const addLikedMovies = async (db: any, docID: string, uid: string) => {
  console.log('try to add', docID);
  try {
    const docRef = doc(db, 'userInfo', uid);
    await updateDoc(docRef, {
      likedVideos: arrayUnion(docID),
    });
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};

export const removeLikedMovies = async (
  db: any,
  docID: string,
  uid: string
) => {
  console.log('try to remove', docID);
  try {
    const docRef = doc(db, 'userInfo', uid);
    await updateDoc(docRef, {
      likedVideos: arrayRemove(docID),
    });
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};

export const addHeaderMovie = async (
  db: any,
  downloadURL: string,
  title: string
) => {
  try {
    let docRef = doc(db, 'assets', 'header');
    await setDoc(docRef, {
      downloadURL: downloadURL,
      title: title,
      createAt: serverTimestamp(),
    });
    return 'header';
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};
