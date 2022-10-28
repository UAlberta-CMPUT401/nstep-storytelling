/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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
          id="answer-field"
          placeholder="Answer"
          multiline
          fullWidth
        />
      </div>
    </div>
  );
}
