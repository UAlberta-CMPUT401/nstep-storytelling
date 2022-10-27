import React from 'react';
import Webcam from 'react-webcam';

export default function WebcamComp() {
  return (
    <div className="webcam-container">
      Video fedback
      <Webcam />
    </div>
  );
}
