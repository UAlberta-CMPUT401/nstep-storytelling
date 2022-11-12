/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useRef, useEffect, useState,
} from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

export default function WebCamTest() {
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);
  const {
    status, startRecording, stopRecording, mediaBlobUrl,
  } = useReactMediaRecorder({ video: true });

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: { width: 640, height: 360 } })
      .then((stream) => {
        const video = videoRef.current; video.srcObject = stream; video.play();
        mediaRecorder.current = new MediaRecorder(stream);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div>
      <video ref={videoRef} />
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
}

// export default WebCamTest;
