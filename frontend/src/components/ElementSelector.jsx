import React from 'react';
import '../styles/Navbar.css';

export default function ElementSelector() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <select name="language" id="language">
          <option value="javascript">Text</option>
          <option value="python">Audio</option>
          <option value="c++">Video</option>
        </select>
      </div>
    </>
  );
}
