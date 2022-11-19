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
    audio: true,
  });

  return (
    <div>
      <p>{status}</p>
      <audio src={mediaBlobUrl} controls autoPlay loop />
      <div>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording}>Stop Recording</button>
      </div>
    </div>

  );
}

export default WebCamTest;
