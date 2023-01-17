import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/HeroImageTemp.jpg';
import ALN_LOGO_3_43 from '../assets/ALN_LOGO-3-43.png';
import Switcher from './ThemeSwitcher';

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
        <div className=' fixed w-full flex flex-1 p-2 items-center justify-between sm:items-stretch bg-opacity-80 bg-white dark:bg-slate-800 dark:bg-opacity-80'>
          <div className='flex flex-shrink-0 items-center'>
            <Link to='/home'>
              <img
                className='h-8 w-auto lg:block'
                src={ALN_LOGO_3_43}
                alt='African Network Live'
              />
            </Link>
          </div>
          <div className='flex space-x-4'>
            <div className='h-6 w-6 m-1'>
              <Switcher />
            </div>
            <Link
              to='/home/loginform'
              className='px-3 py-2 bg-primary rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
            >
              Login
            </Link>
          </div>
        </div>
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
              <span className='text-blue-600'>for your needs</span>
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
