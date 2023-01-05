import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { FirebaseProvider } from '../providers/FirebaseProvider';

export const getAllVideos = async (firestoreDb) => {
  const videos = await getDocs(
    query(collection(firestoreDb, 'videos'), orderBy('id', 'desc'))
  );
  return videos.docs.map((doc) => doc.data());
};

export const categoryVideos = async (firestoreDb, categoryId) => {
  const videos = await getDocs(
    query(
      collection(firestoreDb, 'videos'),
      where('category', '==', categoryId),
      orderBy('id', 'desc')
    )
  );
  return videos.docs.map((doc) => doc.data());
};

export const recommendedVideos = async (firestoreDb, categoryId, videoId) => {
  const videos = await getDocs(
    query(
      collection(firestoreDb, 'videos'),
      where('category', '==', categoryId),
      where('id', '!=', videoId),
      orderBy('id', 'desc')
    )
  );
  return videos.docs.map((doc) => doc.data());
};

export const getSpecificVideo = async (firestoreDb, videoId) => {
  const videoRef = doc(firestoreDb, 'videos', videoId);
  const videoSnap = await getDoc(videoRef);
  if (videoSnap.exists()) {
    return videoSnap.data();
  } else {
    return 'Video not found';
  }
};

export const getUserInfo = async (firestoreDb, userId) => {
  const userRef = doc(firestoreDb, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    return 'Video not found';
  }
};

export const userCreatedVideos = async (firestoreDb, userId) => {
  const videos = await getDocs(
    query(
      collection(firestoreDb, 'videos'),
      where('userId', '==', userId),
      orderBy('id', 'desc')
    )
  );
  return videos.docs.map((doc) => doc.data());
};

export const deleteVideo = async (firestoreDb, videoId) => {
  await deleteDoc(doc(firestoreDb, 'videos', videoId));
};
