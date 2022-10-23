import React from 'react';
import './styles/App.css';
import { Link } from "react-router-dom";

export default function Forms() {
  return (
    <div>
      <div>
        <button>
          {/* When connected to Django this should create a new form with form id */}
          <Link to="/create" style={{ textDecoration: "none" }}>
            + Create new form
          </Link>
        </button>
      </div>
      <ul>
        <li>Program 1 survey</li>
        <li>Program 2 survey</li>
        <li>Program 3 survey</li>
      </ul>
    </div>
  );
}
