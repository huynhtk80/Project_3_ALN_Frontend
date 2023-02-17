import React from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from '../components/videoPlayer';
import { videoArray } from '../utils/mockDb';
import AfricanMap from '../components/AfricanMap';
import SearchDropdown from '../components/SearchBar';

function Home() {
  return (
    <>
      <div className=' pt-20 pb-15 mx-7 ' style={{ overflow: 'hidden' }}>
        <AfricanMap />
      </div>

      {/* <div className=' pt-15 pb-15 mx-56 '>
        <iframe
          src='//www.africanews.com/embed/timeline'
          scrolling='no'
          frameBorder='0'
          style={{ minHeight: '1000px', width: '100%', height: '100%' }}
        ></iframe>
      </div> */}
    </>
  );
}

export default Home;
