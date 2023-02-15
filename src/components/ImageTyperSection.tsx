import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import playLogo from '../assets/ALN_LOGO-3-48_sm.png';
import { VscUnmute, VscMute } from 'react-icons/vsc';
import headerVideo from '../assets/LandingHeader.mp4';
import bgImage from '../assets/typeImage.jpg';
import { user } from 'firebase-functions/v1/auth';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { VideoParams } from '../utils/fireStoreAPI';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import Typewriter from 'typewriter-effect';

function ImageTyperSection() {
  const fbContext = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const db = fbContext.db;

  return (
    <div className='relative hero min-h-[80vh]'>
      <div className='absolute top-0 bottom-0 w-full h-full overflow-hidden'>
        <img
          src={bgImage}
          className='z-1 absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover'
          id='myImage'
        />
      </div>
      <div className='hero-overlay bg-black opacity-20  z-[2]'></div>
      <div className='hero-content text-center text-white z-[3] text-opacity-80'>
        <div className='max-w-full'>
          <h1 className='mb-5 text-3xl md:text-4xl font-bold '>
            <span></span>
            <div className='inline'>
              <Typewriter
                options={{ loop: true }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Create meaningful connections with ')
                    .typeString(
                      '<span style="color: rgb(234 88 12)">US.</span>'
                    )

                    .pauseFor(1000)
                    .deleteChars(3)
                    .typeString(
                      '<span style="color: rgb(234 88 12)">THE WORLD.</span>'
                    )
                    .pauseFor(1000)
                    .deleteChars(10)
                    .typeString(
                      '<span style="color: rgb(234 88 12)">Africa.</span>'
                    )
                    .pauseFor(3000)
                    .start();
                }}
              />
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ImageTyperSection;
