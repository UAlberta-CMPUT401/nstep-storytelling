/* eslint-disable react/void-dom-elements-no-children */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import './styles/TextAnswerInput.css';

export default function TextAnswerInput(props) {
  const [audioSelected, setAudioSelected] = useState(false);

  const clickMic = (e) => {
    setAudioSelected(!audioSelected);
  };

  const stopMic = (blobUrl, blob) => {
    console.log(blobUrl);
    console.log(blob);
    const audioFile = new File([blob], 'voice.wav', { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioFile);
    props.saveAudio(props.id, formData);
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
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
              </div>
            </div>
          )}
        />
      </div>
      )}
    </div>
  );
}
