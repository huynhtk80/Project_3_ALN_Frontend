import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Landing</h1>
      <Link to='/Navbar'>Get Started</Link>
    </>
  );
}

export default Landing;
