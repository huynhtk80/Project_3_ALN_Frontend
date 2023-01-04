import React, { useState } from "react";
import { Link } from "react-router-dom";

import ALN_LOGO_3_43 from "../assets/ALN_LOGO-3-43.png";
import HeroSection from "../components/HeroSection";
import InterObserver from "../components/InterObserver";
import LandingFooter from "../components/LandingFooter";

function Landing() {
  const [count, setCount] = useState(0);
  return (
    <div className="bg-gray-800 h-full">
      <HeroSection />
      <InterObserver
        image="https://picsum.photos/400/400"
        heading="Learn More About Africa"
        message="Great Testing"
        imagePosition="left"
      />
      <InterObserver
        image="https://picsum.photos/seed/11/400/400"
        heading="See your content on"
        message="Here are the supported devices"
        imagePosition="right"
      />
      <LandingFooter />
    </div>
  );
}

export default Landing;
