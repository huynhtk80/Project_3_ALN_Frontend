import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import ALN_LOGO_3_43 from '../assets/ALN_LOGO-3-43.png';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ImageSection from '../components/ImageSection';
import ImageTyperSection from '../components/ImageTyperSection';
import InterObserver from '../components/InterObserver';
import LandingFooter from '../components/LandingFooter';
import MovieHeader from '../components/MovieHeader';
import Navbar from '../components/Navbar';
import PricingTiers from '../components/PricingTiers';

function DemoLanding() {
  useEffect(() => {
    var iframe = document.getElementById('myFrame') as HTMLIFrameElement;
    if (!iframe.contentWindow) return;
    let anchors = iframe.contentWindow.document.getElementsByTagName('a');

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].onclick = function () {
        return false;
      };
    }
  }, []);

  const message = `A global media production company that’s housed in Harare, Zimbabwe and has since 2019 expanded its branches to the United States of America with the International Head quarters in Des Moines Iowa.

    JSI is committed to telling stories with a unique focus on those of minority groups, the black community, African pride and immigrants making an impact locally and globally through their work.
    
    The team has  a passion of communicating brands and ideas that reflect on model cities, organizational philosophies and global trends.
    
    JSI  values cultural richness and diversity illuminating it through various productions that showcase and promote societal differences and values in Arts and Entertainment.`;

  const message2 = ` Watch your favorite shows and movies on African Network Live. Stream live TV, movies and more from your favorite networks and premiums channels. It’s all on African Network Live.`;
  return (
    <div id='demoID' className='bg-base-100'>
      <div className='flex flex-row justify-center items-center fixed top-0 w-full  z-[99] bg-white opacity-80'>
        <h1 className=' text-red-500 text-4xl p-2'>Demo Only</h1>
        <p className='text-black text-xl'> Clicks and animations don't work</p>
      </div>
      {/* <Navbar landing={true} /> */}
      <MovieHeader />
      {/* <HeroSection /> */}
      {/* <hr
        id='LearnMore'
        className='w-4/5 h-0.5 border-0 rounded mx-auto bg-slate-500'
      ></hr> */}

      <InterObserver
        image='https://jacksshackint.com/wp-content/plugins/arile-extra/inc/arilewp/images/film2.jpg'
        sectionId='LearnMore'
        heading='Who we are'
        message={message}
        imagePosition='left'
      />
      {/* <hr
        id='LearnMore'
        className='w-4/5 h-0.5 border-0 rounded mx-auto bg-slate-500'
      ></hr> */}
      <ImageTyperSection />
      <InterObserver
        image='https://jacksshackint.com/wp-content/plugins/arile-extra/inc/arilewp/images/proj2.jpg'
        sectionId='See Content'
        heading='See your content on'
        message={message2}
        imagePosition='right'
      />
      <ImageSection />
      <div className='flex justify-center items-center'>
        <PricingTiers />
      </div>
      <Footer />
    </div>
  );
}

export default DemoLanding;
