import React, { useState } from 'react';
import imgPlaceHolder from '../assets/card-top-temp.jpg';
import VideoPlayer from './videoPlayer';
import ReactPlayer from 'react-player';
import VideoDetails from './VideoDetails';

interface AppProps {
  url: string;
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex?: any;
  docId?: string;
}

function VideoThumbCard({
  url,
  title,
  description,
  index: index,
  activeIndex,
  setActiveIndex,
  docId,
}: AppProps) {
  console.log(title, activeIndex, index);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='max-w-sm rounded text-base-content bg-primary bg-opacity-50 overflow-hidden shadow-lg'>
      <div className='flex justify-center'>
        <ReactPlayer
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                onContextMenu: (e: any) => e.preventDefault(),
              },
            },
          }}
          controls
          id={index}
          height='215px'
          url={url}
          playing={activeIndex === index ? true : false}
          onPlay={() => {
            setActiveIndex(index);
          }}
        />
      </div>
      <div className='px-6 py-4'>
        <div
          className='font-bold text-xl mb-2 cursor-pointer'
          onClick={() => setIsOpen(true)}
        >
          {title}
        </div>
        <p className='text-base-content text-base'>
          {description.length > 100
            ? description.slice(0, 100) + '...'
            : description}
        </p>
      </div>
      {isOpen && docId && (
        <VideoDetails setShowModal={setIsOpen} docId={docId} />
      )}
    </div>
  );
}

export default VideoThumbCard;
