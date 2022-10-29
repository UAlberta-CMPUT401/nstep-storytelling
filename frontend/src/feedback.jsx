import React from 'react';
import TextField from '@mui/material/TextField';
import './styles/Feedback.css';

export default function Feedback() {
  return (
    <div className="feedback">
      <TextField
        fullWidth
        id="filled-search"
        label="Search"
        type="search"
        variant="filled"
      />
      <ul>
        <li>John Doe - Certificate Program Level 1 Post-Assessment Survey</li>
        <li>Anonymous - Certificate Program Level 1 Post-Assessment Survey</li>
        <li>Joe Brown - Certificate Program Level 1 Pre-Assessment Survey</li>
      </ul>
    </div>
  );
}
