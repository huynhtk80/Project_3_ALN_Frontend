import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/HeroImageTemp.jpg';
import ALN_LOGO_3_43 from '../assets/ALN_LOGO-3-43.png';
import Switcher from './ThemeSwitcher';
import headerVideo from '../assets/LandingHeader.mp4';

function HeroSection() {
  return (
    <section className='mb-20'>
      <div
        className='relative overflow-hidden bg-no-repeat bg-cover bg-center'
        style={{
          backgroundPosition: '50%',
          background: `linear-gradient(74deg, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.50) 70%, rgba(0,0,0,0.25) 100%), url(${HeroImage})`,
          height: '500px',
        }}
      >
        <video
          className='z-1 absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover'
          autoPlay
          muted
          loop
          id='myVideo'
        >
          <source src={headerVideo} type='video/mp4' />
        </video>
        <div className='absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 bg-slate-700  bg-opacity-60'></div>
      </div>

      <div className='container mx-auto px-6 md:px-12 xl:px-32'>
        <div className='text-center text-gray-800'>
          <div
            className='block rounded-lg shadow-lg px-6 py-12 md:py-16 md:px-12 bg-slate-800 bg-opacity-70 dark:bg-slate-50 dark:bg-opacity-50'
            style={{
              marginTop: '-170px',
              // background: 'hsla(0, 0%, 100%, 0.7)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <h1 className='text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-8 text-gray-200 dark:text-gray-800'>
              African Curated Content <br />
              <span className='text-primary'>made for you</span>
            </h1>
            <Link
              className='inline-block px-7 py-3 mb-2 md:mb-0 mr-0 md:mr-2 bg-secondary text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'
              to='/home'
              role='button'
            >
              Get started
            </Link>
            <a
              className='inline-block px-7 py-3 text-white font-medium text-sm leading-snug bg-slate-500 uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
              data-mdb-ripple='true'
              data-mdb-ripple-color='light'
              href='#LearnMore'
              role='button'
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
