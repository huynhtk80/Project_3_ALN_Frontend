import './videoPlayer.css';
import ReactPlayer from 'react-player';
import React from 'react';
import { SourceProps } from 'react-player/base';

interface AppProps {
  url: string
  height?: string
}

function VideoPlayer({url, height="360px"}:AppProps) {
  return (
    <>
      <div className='videoPlayer'>
        <ReactPlayer height={height} controls={true} url={url} />
      </div>
    </>
  );
}

export default VideoPlayer;

