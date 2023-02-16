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

interface AppProps {
  image: string;
  sectionId: string;
  heading: string;
  message: string;
  imagePosition: 'left' | 'right';
}

function InterObserver({
  image,
  sectionId,
  heading,
  message,
  imagePosition,
}: AppProps) {
  const [containerRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.5,
  });

  const [containerRef2, isVisible2] = useElementOnScreen({
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.5,
  });

  if (imagePosition === 'right')
    return (
      <section id={sectionId} className='h-fit py-10 sm:py-28 overflow-hidden'>
        {/* <div className="isVisible mx-auto bg-gray-600">
          {isVisible ? "IN VIEWPORT" : "NOT IN VIEWPORT"}
        </div> */}
        <div className='flex flex-col  justify-center  gap-10 sm:flex-row place-content-center'>
          <div
            className='flex flex-col justify-center fade-in-l mx-auto basis-3/5 sm:mx-1 prose dark:prose-invert text-center'
            ref={containerRef2}
          >
            <h2 className=''>{heading}</h2>
            <p>{message}</p>
          </div>
          <div
            className='flex flex-col justify-center fade-in-r mx-auto max-w-max basis-2/5 sm:mx-1'
            ref={containerRef}
          >
            <img className='min-w-0' src={image} alt='moe' />
          </div>
        </div>
        {/* <div className="isVisible mx-auto bg-gray-600">
          {isVisible2 ? "IN VIEWPORT" : "NOT IN VIEWPORT"}
        </div> */}
        <br />
      </section>
    );
  return (
    <>
      <section id={sectionId} className='h-fit py-10 sm:py-28  overflow-hidden'>
        {/* <div className="isVisible mx-auto bg-gray-600">
          {isVisible ? "IN VIEWPORT" : "NOT IN VIEWPORT"}
        </div> */}
        <div className='flex flex-col justify-center gap-10 sm:flex-row '>
          <div
            className='fade-in-l mx-auto sm:mx-1 max-w-max basis-2/5'
            ref={containerRef}
          >
            <img className='sm:object-center' src={image} alt='moe' />
          </div>
          <div
            className='flex flex-col justify-center fade-in-r prose dark:prose-invert basis-3/5 mx-auto sm:mx-1 order-first sm:order-last text-center'
            ref={containerRef2}
          >
            <h2>{heading}</h2>
            <p>{message}</p>
          </div>
        </div>
        {/* <div className="isVisible mx-auto bg-gray-600">
          {isVisible2 ? "IN VIEWPORT" : "NOT IN VIEWPORT"}
        </div> */}
        <br />
      </section>
    </>
  );
}

export default InterObserver;
