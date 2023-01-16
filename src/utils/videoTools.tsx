export async function getThumbnailForVideo(
  videoUrl: string,
  videoFileName: string
) {
  const video = document.createElement('video');
  const canvas = document.createElement('canvas');
  video.style.display = 'none';
  canvas.style.display = 'none';

  // Trigger video load
  await new Promise((resolve, reject) => {
    video.addEventListener('loadedmetadata', () => {
      video.width = video.videoWidth;
      video.height = video.videoHeight;
      canvas.width = 640;
      canvas.height = 360;

      const randomTime = Math.floor(Math.random() * video.duration);
      video.currentTime = randomTime;
    });
    video.addEventListener('seeked', () => resolve(1));
    // video.crossOrigin = 'anonymous';
    video.src = videoUrl;
  });

  const vRatio = video.width / video.height;

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
  //resize to fit
  // if (vRatio > cRatio) {
  //   target_width = canvas.width;
  //   target_height = canvas.width / vRatio;
  //   y_of_video = (canvas.height - target_height) / 2;
  // } else {
  //   target_width = canvas.height * vRatio;
  //   target_height = canvas.height;

  //   x_of_video = (canvas.width - target_width) / 2;
  // }

  // Draw the thumbnail
  const context = canvas.getContext('2d');
  context?.drawImage(
    video,
    x_of_video,
    y_of_video,
    target_width,
    target_height
  );

  let thumbnailFile: File = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      console.log(blob);

      const thumbName =
        videoFileName.substring(0, videoFileName.lastIndexOf('.')) ||
        videoFileName;

      const theThumbnailFile = new File([blob], `${thumbName}_thumbnail.png`, {
        type: 'image/png',
      });
      resolve(theThumbnailFile);
    });
  });

  const imageUrl = canvas.toDataURL('image/png');
  return { imageUrl, thumbnailFile };
}
