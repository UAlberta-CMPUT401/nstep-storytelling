import React from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 640,
  height: 360,
  facingMode: "user",
  aspectratio: 1.77777777778,
};

export default function WebcamComp() {
  const webRef = React.useRef(null);
  let img = null;
  const showImg = () => {
    img = webRef.current.getScreenshot();
  };
  return (
    <div className="webcam-container">
      <ul>
        <li>Video Feedback Test</li>
      </ul>
      <Webcam videoConstraints={videoConstraints} ref={webRef} />
      <button onClick={() => showImg()}>Capture</button>
      <br />
      <img src={img} alt="" />
    </div>
  );
}
