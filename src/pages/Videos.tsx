import React from "react";
import VideoThumbCard from "../components/VideoThumbCard";
import { videoArray } from "../utils/mockDb";


function Videos() {
  return (
    <div>
      <h1>My Videos</h1>
      <div className="flex flex-row flex-wrap justify-evenly" >

      {videoArray.map((vid)=>(
        <VideoThumbCard url={vid.url} description={vid.description} title={vid.title}/>
      ))}
      
      </div>
    </div>
  );
}

export default Videos;
