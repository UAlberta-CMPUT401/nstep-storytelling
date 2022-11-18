/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useRef, useEffect, useState,
} from 'react';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

function AudioTest() {
  const {
    status, startRecording, stopRecording, mediaBlobUrl,
  } = useReactMediaRecorder({
    audio: true, video: false,
  });

  return (
    <div>
      <p>{status}</p>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <audio src={mediaBlobUrl} controls autoPlay loop />
    </div>
  );
}

export default AudioTest;
