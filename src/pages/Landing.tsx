import { useState } from 'react';

import Footer from '../components/Footer';
import ImageSection from '../components/ImageSection';
import ImageTyperSection from '../components/ImageTyperSection';
import InterObserver from '../components/InterObserver';
import InterObserverChildren from '../components/InterObserverChildren';
import LandingInfoSimple from '../components/LandingInfoSimple';
import MovieHeader from '../components/MovieHeader';
import Navbar from '../components/Navbar';
import PricingTiers from '../components/PricingTiers';

function Landing() {
  const [count, setCount] = useState(0);

  const message = `A global media production company that’s housed in Harare, Zimbabwe and has since 2019 expanded its branches to the United States of America with the International Head quarters in Des Moines Iowa.

    JSI is committed to telling stories with a unique focus on those of minority groups, the black community, African pride and immigrants making an impact locally and globally through their work.
    
    The team has  a passion of communicating brands and ideas that reflect on model cities, organizational philosophies and global trends.
    
    JSI  values cultural richness and diversity illuminating it through various productions that showcase and promote societal differences and values in Arts and Entertainment.`;

  const message2 = ` Watch your favorite shows and movies on African Network Live. Stream live TV, movies and more from your favorite networks and premiums channels. It’s all on African Network Live.`;
  return (
    <div className='bg-base-100'>
      <Navbar landing={true} />
      <MovieHeader />
      {/* <HeroSection /> */}
      {/* <hr
        id='LearnMore'
        className='w-4/5 h-0.5 border-0 rounded mx-auto bg-slate-500'
      ></hr> */}

      <InterObserver
        image='https://jacksshackint.com/wp-content/plugins/arile-extra/inc/arilewp/images/film2.jpg'
        sectionId='LearnMore'
        heading='Who we are & what we want to accomplish'
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
        heading='See your content on Africa Live Network'
        message={message2}
        imagePosition='right'
      />
      <ImageSection />
      <div className='flex justify-center items-center'>
        <PricingTiers />
      </div>
      <InterObserverChildren>
        <LandingInfoSimple />
      </InterObserverChildren>
      <Footer />
    </div>
  );
}

export default Landing;
