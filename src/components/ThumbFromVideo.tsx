import React, { useRef } from 'react';

interface ThumbFromVideoProps {
  videoUrl: string;
  videoFileName: string;
}
function ThumbFromVideo({ videoUrl, videoFileName }: ThumbFromVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onClickCreateThumb = async () => {
    await createThumb();
  };

  const createThumb = async () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');

    // canvas.style.display = 'none';

    // Trigger video load
    await new Promise((resolve, reject) => {
      if (!videoRef.current) return;
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (!videoRef.current) return;
        videoRef.current.width = videoRef.current.videoWidth;
        videoRef.current.height = videoRef.current.videoHeight;
        canvas.width = 640;
        canvas.height = 360;

        const randomTime = Math.floor(
          Math.random() * videoRef.current.duration
        );
        videoRef.current.currentTime = randomTime;
      });
      videoRef.current.addEventListener('seeked', () => resolve(1));
      videoRef.current.crossOrigin = 'anonymous';
      videoRef.current.src = videoUrl;
    });

    const vRatio = videoRef.current.width / videoRef.current.height;

    //16/9 == 1.777  4/3=1.333
    const cRatio = canvas.width / canvas.height;

    let target_width: number;
    let target_height: number;
    let y_of_video = 0;
    let x_of_video = 0;
    const zoom = 1;

    //crop to fit width
    target_width = canvas.width * zoom;
    target_height = (canvas.width / vRatio) * zoom;
    y_of_video = (canvas.height - target_height) / 2;
    x_of_video = (canvas.width - target_width) / 2;

    // Draw the thumbnail
    const context = canvas.getContext('2d');

    context?.drawImage(
      videoRef.current,
      x_of_video,
      y_of_video,
      target_width,
      target_height
    );
    if (canvasRef.current) canvasRef.current.appendChild(canvas);
    let thumbnailFile: File = await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) return;
        console.log(blob);

        const thumbName =
          videoFileName.substring(0, videoFileName.lastIndexOf('.')) ||
          videoFileName;

        const theThumbnailFile = new File(
          [blob],
          `${thumbName}_thumbnail.png`,
          {
            type: 'image/png',
          }
        );
        resolve(theThumbnailFile);
      });
    });

    const imageUrl = canvas.toDataURL('image/png');
    return { imageUrl, thumbnailFile };
  };

  return (
    <div>
      <div>
        <label className='label'>
          <span className='label-text'>Video</span>
        </label>
        <video ref={videoRef} src={videoUrl} controls></video>
        <div ref={canvasRef}></div>
      </div>
    </div>
  );
}

export default ThumbFromVideo;
