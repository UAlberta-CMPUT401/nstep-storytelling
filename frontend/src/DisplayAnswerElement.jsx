/* eslint-disable react/void-dom-elements-no-children */
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import './styles/TextAnswerInput.css';

export default function DisplayAnswerElement(props) {
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
          defaultValue={props.answer}
          InputProps={{
            readOnly: true,
          }}
          multiline
          fullWidth
        />
      </div>

      {props.contentAudio
      && (
      <div>
        <audio src={props.contentAudio} controls>
          <track kind="captions" />
        </audio>
      </div>
      )}

      {props.contentVideo
      && (
      <div>
        <video src={props.contentVideo} width={320} height={180} controls>
          <track kind="captions" />
        </video>
      </div>
      )}
    </div>
  );
}
