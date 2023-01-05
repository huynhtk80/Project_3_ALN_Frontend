import React from 'react';
import VideoPlayer from '../components/videoPlayer';

function Home() {
  return (
    <>
      <h1 className='text-center text-cyan-900 tracking-wide text-3xl'>
        Africa Live Network Videos
      </h1>
      <div className='grid grid-cols-2 grid-rows-3 gap-10 p-5 justify-items-center'>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=vbmfVubluMc' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=34-5ZRq3W_M' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=p00MGPjp1Ow' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=g6JGg16O-ig' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=3h0cw6EOnFw' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=WQQKkjmc8wo' />
        </div>
      </div>
    </>
  );
}

export default Home;
