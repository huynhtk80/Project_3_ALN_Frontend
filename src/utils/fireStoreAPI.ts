import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';

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
    await updateDoc(docRef, { ...updateUpper });
  } catch (ex: any) {
    console.log('FIRESTORE ADD FAILURE!', ex.message);
  }
};
