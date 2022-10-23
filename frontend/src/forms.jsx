import React from 'react';
import Button from '@mui/material/Button';
import './styles/Forms.css';

export default function Forms() {
  return (
    <div className="forms">
      <Button variant="contained">+ Create Form</Button>
      <ul>
        <li>Program 1 survey</li>
        <li>Program 2 survey</li>
        <li>Program 3 survey</li>
      </ul>
    </div>
  );
}
