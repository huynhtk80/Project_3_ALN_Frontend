import React from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from '../components/videoPlayer';
import { videoArray } from '../utils/mockDb';

function Home() {
  return (
    <>
      <div className='bg-base-100 '>
        <h1 className='text-center tracking-wide text-3xl'>
          Home Page -Africa Live Network Under Construction - Beta Testing Site
        </h1>
        <div className='justify-items-center text-center m-5'>
          Content Coming Soon
        </div>
      </div>

      <div className='carousel w-full'>
        <div id='slide1' className='carousel-item relative w-full'>
          <img src='https://placeimg.com/800/200/arch' className='w-full' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide4' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide2' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide2' className='carousel-item relative w-full'>
          <img src='https://placeimg.com/800/200/nature' className='w-full' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide1' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide3' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide3' className='carousel-item relative w-full'>
          <img src='https://placeimg.com/800/200/tech' className='w-full' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide2' className='btn btn-circle'>
              ❮
            </a>
            <a href='#slide4' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
        <div id='slide4' className='carousel-item relative w-full'>
          <img src='https://placeimg.com/800/200/any' className='w-full' />
          <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
            <a href='#slide3' className='btn btn-circle'></a>
            <a href='#slide1' className='btn btn-circle'>
              ❯
            </a>
          </div>
        </div>
      </div>

      <div className='flex flex-row flex-wrap justify-center gap-4 my-5'>
        {videoArray.map((vid) => (
          <div className='card w-96 bg-base-100 shadow-xl image-full'>
            <figure>
              {/* <ReactPlayer url={vid.url} height='225px' /> */}
              <img src={vid.thumbnailUrl} alt='Shoes' />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>{vid.title}</h2>
              <p>{vid.description}</p>
              <div className='card-actions justify-end'>
                <div className='stats shadow'>
                  <div className='stat'>
                    <div className='stat-figure text-primary'></div>
                    <div className='stat-title'>Total Likes</div>
                    <div className='stat-value text-primary'>25.6K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className='grid grid-cols-2 grid-rows-3 gap-10 p-5 justify-items-center'>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=vbmfVubluMc' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=34-5ZRq3W_M' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=p00MGPjp1Ow' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=g6JGg16O-ig' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=3h0cw6EOnFw' />
        </div>
        <div>
          <VideoPlayer url='https://www.youtube.com/watch?v=WQQKkjmc8wo' />
        </div>
      </div> */}
    </>
  );
}

export default Home;
