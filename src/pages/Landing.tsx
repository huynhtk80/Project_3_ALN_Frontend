import React, { useState } from "react";
import { Link } from "react-router-dom";

import ALN_LOGO_3_43 from "../assets/ALN_LOGO-3-43.png";
import HeroSection from "../components/HeroSection";
import InterObserver from "../components/InterObserver";
import LandingFooter from "../components/LandingFooter";

function Landing() {
  const [count, setCount] = useState(0);

  const message =
    "Lorem ipsum dolor sit amet. Aut accusantium sequi est iure itaque ut voluptatum minus. In officiis dolore aut cumque pariatur sed doloribus nihil et optio consequatur. Et odio distinctio rem praesentium magni sed voluptatum dolorem a veniam earum vel modi deserunt aut autem ratione in molestiae maxime.";
  return (
    <div className="bg-gray-800 h-full">
      <HeroSection />
      <hr id="LearnMore" className="w-4/5 mx-auto"></hr>
      <InterObserver
        image="https://picsum.photos/400/400"
        sectionId="Learn"
        heading="Learn More About Africa"
        message={message}
        imagePosition="left"
      />
      <hr className="w-4/5 mx-auto"></hr>
      <InterObserver
        image="https://picsum.photos/seed/11/400/400"
        sectionId="See Content"
        heading="See your content on"
        message={message}
        imagePosition="right"
      />
      <LandingFooter />
    </div>
  );
}

export default Landing;
