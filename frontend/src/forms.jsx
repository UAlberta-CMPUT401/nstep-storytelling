import React from 'react';
import Button from '@mui/material/Button';
import './styles/Forms.css';
import { Link } from "react-router-dom";

export default function Forms() {
  return (
    <div className="forms">
      <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
        <Button variant="contained">
          + Create Form
        </Button>
      </Link>
      <ul>
        <li>Program 1 survey</li>
        <li>Program 2 survey</li>
        <li>Program 3 survey</li>
      </ul>
    </div>
  );
}
