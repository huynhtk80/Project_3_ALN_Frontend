import React from "react";
import VideoPlayer from "../components/videoPlayer";




function Home() {
  return <>
  <VideoPlayer url="https://www.youtube.com/watch?v=yVQB1TVcD2k"/>;
  <VideoPlayer url="https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd"/>
  </>
}

export default Home;
