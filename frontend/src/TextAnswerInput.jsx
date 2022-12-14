/* eslint-disable no-sequences */
/* eslint-disable react/void-dom-elements-no-children */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import './styles/TextAnswerInput.css';
import useTimeout from './TimeLimit';

export default function TextAnswerInput(props) {
  const [audioSelected, setAudioSelected] = useState(false);
  const [videoSelected, setVideoSelected] = useState(false);
  const [audioT, setAudioT] = useState(null);
  const [videoT, setVideoT] = useState(null);

  const clickMic = (e) => {
    if (videoSelected) {
      setVideoSelected(false);
    }
    props.clearRecordings(props.id);
    setAudioSelected(!audioSelected);
  };
  const clickVideocam = (e) => {
    if (audioSelected) {
      setAudioSelected(false);
    }
    props.clearRecordings(props.id);
    setVideoSelected(!videoSelected);
  };

  function getBase64(file) {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      const reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  }

  const stopMic = (blobUrl, blob) => {
    const audioFile = new File([blob], 'voice.wav', { type: 'audio/wav' });
    getBase64(audioFile)
      .then((result) => {
        props.saveAudio(props.id, result);
      })
      .catch((err) => {
      });
  };

  const stopVideo = (blobUrl, blob) => {
    const videoFile = new File([blob], 'video.mp4', { type: 'video/mp4' });
    getBase64(videoFile)
      .then((result) => {
        props.saveVideo(props.id, result);
      })
      .catch((err) => {
      });
  };

  const timedAudioRecording = (startRecording, stopRecording, time) => {
    clearTimeout(audioT);
    startRecording();
    const tick = () => stopRecording();
    const timeout = setTimeout(tick, time);
    setAudioT(timeout);
  };

  const timedVideoRecording = (startRecording, stopRecording, time) => {
    clearTimeout(videoT);
    startRecording();
    const tick = () => stopRecording();
    const timeout = setTimeout(tick, time);
    setVideoT(timeout);
  };

  return (
    <div className="text-answer-input">
      <div className="user-question-field">
        <TextField
          id="standard-read-only-input"
          defaultValue={props.question}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
          fullWidth
        />

      </div>
      <div>
        <TextField
          id={props.id}
          onChange={props.onChange}
          placeholder="Answer"
          multiline
          fullWidth
        />
      </div>

      {props.allowRecording
      && (
      <div>
        <IconButton aria-label="audio" onClick={clickMic} value={props.id}>
          <MicIcon />
        </IconButton>
        <IconButton aria-label="audio" onClick={clickVideocam} value={props.id}>
          <VideocamIcon />
        </IconButton>
      </div>
      )}

      {audioSelected
      && (
      <div>
        <ReactMediaRecorder
          audio
          onStop={stopMic}
          render={({
            status, startRecording, stopRecording, mediaBlobUrl,
          }) => (
            <div>
              <p>{status}</p>
              <audio src={mediaBlobUrl} controls autoPlay>
                <track kind="captions" />
              </audio>
              <div>
                <Button variant="contained" onClick={() => timedAudioRecording(startRecording, stopRecording, 120000)}>Start Recording</Button>
                <Button variant="text" onClick={stopRecording}>Stop Recording</Button>
              </div>
            </div>
          )}
        />
      </div>
      )}

      {videoSelected
      && (
      <div>
        <ReactMediaRecorder
          video
          onStop={stopVideo}
          render={({
            status, startRecording, stopRecording, mediaBlobUrl,
          }) => (
            <div>
              <p>{status}</p>
              <video src={mediaBlobUrl} width={320} height={180} controls autoPlay>
                <track kind="captions" />
              </video>
              <div>
                <Button variant="contained" onClick={() => timedVideoRecording(startRecording, stopRecording, 60000)}>Start Recording</Button>
                <Button variant="text" onClick={stopRecording}>Stop Recording</Button>
              </div>
            </div>
          )}
        />
      </div>
      )}
    </div>
  );
}
