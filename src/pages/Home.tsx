import React from 'react';
import VideoPlayer from '../components/videoPlayer';

function Home() {
  return (
    <>
      <div className='grid grid-flow-col auto-cols-max hover:auto-cols-min grid grid-flow-row auto-rows-max p-10 gap-2 justify-center'>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=yVQB1TVcD2k' />
        </div>
        <div>
          <VideoPlayer url='https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd' />
        </div>
      </div>
    </>
  );
}

export default Home;
