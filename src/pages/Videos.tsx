import React, { useState } from "react";
import VideoThumbCard from "../components/VideoThumbCard";
import { videoArray } from "../utils/mockDb";


function Videos() {
  const [activeIndex, setActiveIndex] = useState<number|null>(null); 
  
  return (
    <div>
      <h1>My Videos</h1>
      <div className="flex flex-row flex-wrap justify-evenly" >

      {videoArray.map((vid, key)=>{
        console.log(vid)
        console.log(key)
        return(
        <VideoThumbCard url={vid.url} description={vid.description} title={vid.title} key={key} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      )}
      )}
      
      </div>
    </div>
  );
}

export default Videos;
