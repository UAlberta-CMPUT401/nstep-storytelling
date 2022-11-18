/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useRef, useEffect, useState,
} from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

function WebCamTest() {
  const {
    status, startRecording, stopRecording, mediaBlobUrl,
  } = useReactMediaRecorder({
    video: true, width: 640, height: 360, audio: true,
  });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video src={mediaBlobUrl} controls autoPlay loop />
    </div>

  );
}

export default WebCamTest;
