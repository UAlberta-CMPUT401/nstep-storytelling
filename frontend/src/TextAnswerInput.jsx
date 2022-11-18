/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VideocamIcon from '@mui/icons-material/Videocam';
import './styles/TextAnswerInput.css';

export default function TextAnswerInput(props) {
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
        <IconButton aria-label="video" onClick={props.clickVideo} value={props.id}>
          <VideocamIcon />
        </IconButton>
      </div>
      )}
    </div>
  );
}
