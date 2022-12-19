import React, { useState } from "react";
import { Link } from "react-router-dom";

import ALN_LOGO_3_43 from "../assets/ALN_LOGO-3-43.png";

function Landing() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Landing</h1>
      <img src={ALN_LOGO_3_43} />
      <Link to="/home">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Get Started
        </button>
      </Link>
    </>
  );
}

export default Landing;
