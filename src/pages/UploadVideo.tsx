import React, { useContext, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { AuthContext } from "../providers/AuthProvider";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ReactPlayer from "react-player";

function UploadVideo() {
  const fbContext = useContext(FirebaseContext);
  const db = fbContext.db;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const [videoFile, setVideoFile] = useState();
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [tempFile, setTempFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>();

  const [videoDoc, setVideoDoc] = useState({
    title: "",
    url: "",
    description: "",
    collection: "",
  });

  interface VideoSchema {
    title: string;
    url: string;
    description: string;
    collection: string;
  }

  const addMovie = async (videoDoc: VideoSchema) => {
    try {
      let collectionRef = collection(db, "videos");
      await addDoc(collectionRef, videoDoc);
      setVideoDoc({
        title: "",
        url: "",
        description: "",
        collection: "",
      });
    } catch (ex) {
      console.log("FIRESTORE ADD FAILURE!", ex.message);
    }
  };

  const handleChange = (e) => {
    let file = e.target.files[0];
    var reader = new FileReader();
    setVideoFile(file);
    console.log(file);
    var url = URL.createObjectURL(file);
    console.log(url);
    setTempFile(url);
  };

  const onClickHandle = () => {
    console.log("hello canvas");
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 360;
    const context = canvas.getContext("2d");
    const vid = document.querySelector("video");
    console.log("vid width", vid?.videoWidth);
    console.log("vid height", vid?.videoHeight);
    console.log("vid height", vid?.currentSrc);

    const video_width = vid?.videoWidth;
    const video_height = vid?.videoHeight;

    const vRatio = video_width / video_height;

    //16/9 == 1.777  4/3=1.333
    const cRatio = canvas.width / canvas.height;

    var target_width;
    var target_height;
    var y_of_video = 0;
    var x_of_video = 0;
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

    if (context && vid)
      context &&
        context.drawImage(
          vid,
          x_of_video,
          y_of_video,
          target_width,
          target_height
        );

    const thumbnail = canvas.toBlob((blob) => {
      if (!blob) return;
      const newImg = document.createElement("img");
      console.log(blob);
      const url = URL.createObjectURL(blob);
      console.log("image", url);
      // newImg.onload = () => {
      //   // no longer need to read the blob so it's revoked
      //   URL.revokeObjectURL(url);
      // };

      newImg.src = url;
      // document.body.appendChild(newImg);
      const videoFileName = videoFile.name;
      const thumbName =
        videoFileName.substr(0, videoFileName.lastIndexOf(".")) ||
        videoFileName;

      const file = new File([blob], `${thumbName}_thumbnail.png`, {
        type: "image/png",
      });
      console.log("the file", file);
      setThumbFile(file);
      console.log("thumbFile", thumbFile);
    });

    const currentDiv = document.getElementById("canvasloc");
    currentDiv.innerHTML = "";
    currentDiv?.appendChild(canvas);
  };

  return (
    <>
      <div>UploadVideo</div>;
      {user && (
        <>
          <p>uid:{user.uid}</p>
          <p>Email:{user.email}</p>
        </>
      )}
      <input type="file" accept="video/*" onChange={handleChange} />
      {tempFile && <video id="video" width="500px" controls src={tempFile} />}
      {console.log(tempFile)}
      <div id="canvasloc"></div>
      {videoFile && <button onClick={onClickHandle}> Canvas</button>}
      {thumbFile && <p>{thumbFile.name}</p>}
    </>
  );
}

export default UploadVideo;
