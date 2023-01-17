import React from "react";
import imgPlaceHolder from "../assets/card-top-temp.jpg";
import VideoPlayer from "./videoPlayer";
import ReactPlayer from "react-player";

interface AppProps {
  url: string
  title: string
  description: string
  index: number
  activeIndex: number|null
  setActiveIndex?: any
}

function VideoThumbCard({url, title, description, index: index, activeIndex, setActiveIndex}: AppProps) {
  console.log(title, activeIndex, index)
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className= "flex justify-center">
      <ReactPlayer 
              controls id={index} height="215px" url={url} playing={activeIndex === index  ? true : false} onPlay={()=>{setActiveIndex(index)}}
      /></div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}
        </p>
      </div>
         </div>
  );

  <div className='flex flex-row flex-wrap justify-center gap-4 my-5'>
        {VideoPlayer.map((vid) => (
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
}

export default VideoThumbCard;
