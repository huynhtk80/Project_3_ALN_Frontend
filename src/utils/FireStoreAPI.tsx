import { addDoc, collection } from 'firebase/firestore';

export interface VideoParams {
  userId: string;
  title: string;
  url: string;
  videoFileId: string;
  thumbnail: string;
  thumbnailFileId: string;
  description: string;
  collection: string;
  approval?: string;
  DOC_ID?: string;
  rejectMsg?: string;
}

export const addMovie = async (videoDoc: VideoParams, db: any) => {
  try {
    let collectionRef = collection(db, 'videos');
    const docref = await addDoc(collectionRef, videoDoc);
    return docref.id;
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};
