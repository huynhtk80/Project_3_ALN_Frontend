import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import playLogo from '../assets/ALN_LOGO-3-48_sm.png';
import { VscUnmute, VscMute } from 'react-icons/vsc';
import headerVideo from '../assets/LandingHeader.mp4';
import drumVideo from '../assets/drumHeader.mp4';

function MovieHeader() {
  const videoPlayer = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const onClickMute = () => {
    setIsMuted(!isMuted);
  };
  return (
    <div className='hero min-h-screen'>
      <div className='absolute top-0 bottom-0 w-full h-full overflow-hidden'>
        <video
          className='z-1 absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover'
          autoPlay
          muted={isMuted}
          loop
          id='myVideo'
          ref={videoPlayer}
        >
          <source src={drumVideo} type='video/mp4' />
        </video>
      </div>
      <div className='hero-overlay bg-slate-800  bg-opacity-60 z-[2]'></div>
      <div className='hero-content text-center text-white z-[3]'>
        <div className='max-w-lg'>
          <h1 className='mb-5 text-5xl md:text-6xl font-bold'>
            CONNECT WITH AFRICA
          </h1>
          <p className='mb-5 md:text-xl'>
            A gateway to a global market with africans
            <br /> telling their authentic stories
          </p>
          <Link to='/home'>
            <button className='btn btn-primary btn-lg group'>
              <img
                className='h-10 px-2 -rotate-[450deg] transition-all duration-500 group-hover:rotate-0'
                src={playLogo}
              />
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <a href='#LearnMore'>
        <svg
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          fillRule='evenodd'
          clipRule='evenodd'
          className='absolute  h-20 opacity-20 hover:opacity-90 fill-white bottom-4 right-50% -translate-x-1/2 z-[4]'
        >
          <path d='M24 12c0-6.623-5.377-12-12-12s-12 5.377-12 12 5.377 12 12 12 12-5.377 12-12zm-1 0c0-6.071-4.929-11-11-11s-11 4.929-11 11 4.929 11 11 11 11-4.929 11-11zm-11.5 4.828l-3.763-4.608-.737.679 5 6.101 5-6.112-.753-.666-3.747 4.604v-11.826h-1v11.828z' />
        </svg>
      </a>
      <div
        className=' absolute bottom-10 right-10 text-white opacity-20 hover:opacity-90 z-50'
        onClick={onClickMute}
      >
        {isMuted ? <VscMute size={'40px'} /> : <VscUnmute size={'40px'} />}
      </div>
    </div>
  );
}

export default MovieHeader;
