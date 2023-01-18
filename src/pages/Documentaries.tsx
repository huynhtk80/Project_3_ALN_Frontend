import React, { useState } from 'react';
import VideoThumbCard from '../components/VideoThumbCard';
import { videoArray } from '../utils/mockDb';

function Videos() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div>
      <h1>Africa Live Network - Under Construction - Beta Testing Site </h1>
      <div className='flex flex-row flex-wrap justify-evenly mt-10 gap-10'>
        {videoArray.map((vid, index) => {
          console.log(vid);
          console.log(index);
          return (
            <VideoThumbCard
              url={vid.url}
              description={vid.description}
              title={vid.title}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Videos;
