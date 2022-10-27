/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';

export default function TextInput() {
  return (
    <>
      <div>
        <TextField id="standard-basic" placeholder="Enter a question" variant="standard" />
        <button>
          Delete
        </button>
      </div>
      <TextField
        id="outlined-textarea"
        placeholder="Answer"
        multiline
        disabled
      />
    </>
  );
}
