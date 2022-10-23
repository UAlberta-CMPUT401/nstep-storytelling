/* eslint-disable react/void-dom-elements-no-children */
import React from 'react';
import { Link } from "react-router-dom";

export default function TextInput() {
  return (
    <>
      <input style={{ float: "bottom" }} placeholder="Share your story!" />
      <button>
        <Link to="/create" style={{ textDecoration: "none" }}>
          Delete
        </Link>
      </button>

    </>
  );
}
