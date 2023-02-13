import React, { useState } from 'react';
import VideoThumbCard from '../components/VideoThumbCard';
import { videoArray } from '../utils/mockDb';

function Videos() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className='pt-20'>
        {/* <h1 className='text-center m-5'>
          Africa Live Network - Under Construction - Beta Testing Site{' '}
        </h1> */}
        <div className='flex flex-wrap justify-evenly gap-10 text-base-content bg-base-100'>
          {videoArray.map((vid, index) => {
            console.log(vid);
            console.log(index);
            return (
              <div className='rounded-lg shadow-lg'>
                <VideoThumbCard
                  key={index}
                  url={vid.url}
                  description={vid.description}
                  title={vid.title}
                  index={index}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Videos;
