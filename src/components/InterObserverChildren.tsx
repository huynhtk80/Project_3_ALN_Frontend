import React, { useEffect, useRef, useState } from 'react';
import './InterObserver.css';

const useElementOnScreen = (
  options: any
): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);

    if (!entry.isIntersecting) {
      // entry.target.classList.remove("appear");
      return;
    } else {
      entry.target.classList.add('appear');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

function InterObserverChildren({ children }) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.5,
  });

  return (
    <>
      <section
        ref={containerRef}
        className=' border-red-500 border-2 h-fit my-10 sm:my-40 fade-in-l mx-auto sm:mx-1 max-w-max basis-2/5 overflow-hidden'
      >
        {children}
      </section>
    </>
  );
}

export default InterObserverChildren;
