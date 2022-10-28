import React from 'react';
import './styles/App.css';
import { Link } from "react-router-dom";

export default function Submitted() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>We received your submission!</h1>
      <h2>...and we cannot wait to view it!</h2>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button>
          Tell another story
        </button>
      </Link>
      <button>Close browser tab</button>
    </div>
  );
}
