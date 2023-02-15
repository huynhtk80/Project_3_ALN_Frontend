import React from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from '../components/videoPlayer';
import { videoArray } from '../utils/mockDb';
import AfricanMap from '../components/AfricanMap';
import SearchDropdown from '../components/SearchBar';

function Home() {
  return (
    <>
      <div
        className=' pt-20 pb-15 mx- 7 '
        style={{ backgroundColor: '#162850', overflow: 'hidden' }}
      >
        <AfricanMap />
      </div>
    </>
  );
}

export default Home;
