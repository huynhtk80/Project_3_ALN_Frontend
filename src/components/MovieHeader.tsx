import React from 'react';
import { Link } from 'react-router-dom';

import headerVideo from '../assets/LandingHeader.mp4';

function MovieHeader() {
  return (
    <div className='hero min-h-screen'>
      <div className='absolute top-0 bottom-0 w-full h-full overflow-hidden'>
        <video
          className='z-1 absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover'
          autoPlay
          muted
          loop
          id='myVideo'
        >
          <source src={headerVideo} type='video/mp4' />
        </video>
      </div>
      <div className='hero-overlay bg-slate-800  bg-opacity-60 z-[2]'></div>
      <div className='hero-content text-center text-white z-[3]'>
        <div className='max-w-md'>
          <h1 className='mb-5 text-5xl font-bold'>CONNECT WITH AFRICA</h1>
          <p className='mb-5'>
            A gateway to a global market with africans
            <br /> telling their authentic stories
          </p>
          <Link to='/home'>
            <button className='btn btn-primary'>Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieHeader;
