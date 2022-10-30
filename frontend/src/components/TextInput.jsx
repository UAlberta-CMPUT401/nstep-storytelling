/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles/TextInput.css';

export default function TextInput(props) {
  return (
    <div className="text-input">
      <Button
        className="delete-button"
        variant="text"
        color="error"
        value={props.id}
        onClick={props.onClick}
      >
        X
      </Button>
      <div className="question-field">
        <TextField id={props.id} onChange={props.onChange} value={props.value} placeholder="Enter a question" variant="standard" fullWidth />
      </div>
      <div>
        <TextField
          id="answer-field"
          placeholder="Answer"
          multiline
          disabled
          fullWidth
        />
      </div>
    </div>
  );
}
