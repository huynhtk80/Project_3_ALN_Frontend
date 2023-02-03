export async function photoCrop(
  photoUrl: string,
  imageFileName: string,
  width: number,
  height: number,
  method: 'fit' | 'crop'
) {
  const image = document.createElement('img');
  const canvas = document.createElement('canvas');
  image.style.display = 'none';
  canvas.style.display = 'none';
  console.log('the Photo', photoUrl);

  canvas.width = width;
  canvas.height = height;
  let imageWidth;
  let imageHeight;
  let iRatio;
  await new Promise((resolve, reject) => {
    image.onload = function () {
      imageWidth = image.naturalWidth;
      console.log('imageWidth natural', image.naturalWidth);
      console.log('imageWidth', image.width);
      imageHeight = image.naturalHeight;
      console.log('imageHeight natural', image.naturalHeight);
      console.log('imageHeight', image.height);
      iRatio = imageWidth / imageHeight;
      console.log('iratio', imageWidth / imageHeight);
      console.log('iratio', iRatio);

      //16/9 == 1.777  4/3=1.333
      const cRatio = canvas.width / canvas.height;

      let target_width: number;
      let target_height: number;
      let y_of_image = 0;
      let x_of_image = 0;
      const zoom = 1;

      if (iRatio <= cRatio && method === 'crop') {
        //image is canvas is wider fit to width, center and crop top and bottom
        target_width = canvas.width * zoom;
        target_height = (canvas.width / iRatio) * zoom;
        y_of_image = (canvas.height - target_height) / 2;
        x_of_image = (canvas.width - target_width) / 2;
      } else if (iRatio >= cRatio && method === 'crop') {
        //image is wider than canvas, fit to height, center and crop sides
        target_width = canvas.height * iRatio * zoom;
        target_height = canvas.height * zoom;
        y_of_image = (canvas.height - target_height) / 2;
        x_of_image = (canvas.width - target_width) / 2;
      } else if (iRatio >= cRatio && method === 'fit') {
        //image is wider than canvas fit to width, center and resize to fit
        target_width = canvas.width;
        target_height = canvas.width / iRatio;
        y_of_image = (canvas.height - target_height) / 2;
      } else {
        //image is canvas is wider fit to height and resize to fit
        target_width = canvas.height * iRatio;
        target_height = canvas.height;
        x_of_image = (canvas.width - target_width) / 2;
      }

      // Draw the thumbnail
      console.log(
        'hello there',
        image,
        x_of_image,
        y_of_image,
        target_width,
        target_height
      );
      const context = canvas.getContext('2d');
      context?.drawImage(
        image,
        x_of_image,
        y_of_image,
        target_width,
        target_height
      );
      resolve('done');
    };
    image.src = photoUrl;
  });

  let imageFile: File = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      console.log('the canvas blob', blob);

      const imageName =
        imageFileName.substring(0, imageFileName.lastIndexOf('.')) ||
        imageFileName;

      const theImageFile = new File([blob], `${imageName}_${method}.png`, {
        type: 'image/png',
      });

      resolve(theImageFile);
    });
  });
  console.log(imageFile);
  const imageUrl = canvas.toDataURL('image/png');
  console.log('incrop', imageUrl);
  return { imageUrl, imageFile: imageFile };
}
