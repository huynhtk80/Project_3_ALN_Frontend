import './videoPlayer.css';
import ReactPlayer from 'react-player';
import React from 'react';
import { SourceProps } from 'react-player/base';

function VideoPlayer(props: {
  url: string | string[] | SourceProps[] | MediaStream | undefined;
}) {
  return (
    <>
      <div className='videoPlayer'>
        <ReactPlayer url={props.url} />
      </div>
    </>
  );
}

export default VideoPlayer;
