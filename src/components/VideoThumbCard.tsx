import React from "react";
import imgPlaceHolder from "../assets/card-top-temp.jpg";
import VideoPlayer from "./videoPlayer";

interface AppProps {
  url: string
  title: string
  description: string
}

function VideoThumbCard({url, title, description}: AppProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <VideoPlayer
              height="215px" url={url}
      
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}
        </p>
      </div>
         </div>
  );
}

export default VideoThumbCard;
