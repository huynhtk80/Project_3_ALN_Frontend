import { useContext } from 'react';
import bgImage from '../assets/pano.jpg';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';

function ImageSection() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;

  return (
    <div className='relative hero min-h-[40vh]'>
      <div className='absolute top-0 bottom-0 w-full h-full overflow-hidden'>
        <img
          src={bgImage}
          className='z-1 absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover'
          id='myImage'
        />
      </div>
      <div className='hero-overlay bg-black opacity-20  z-[2]'></div>
      <div className='hero-content text-center text-white z-[3] text-opacity-90'>
        <div className='max-w-full'>
          <h1 className='mb-5 text-3xl md:text-4xl font-bold '>
            <span>Explore new worlds</span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
