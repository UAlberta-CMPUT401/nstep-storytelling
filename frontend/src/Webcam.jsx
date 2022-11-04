/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Webcam from 'react-webcam';
// import 'video.js/dist/video-js.min.css';
// import 'videojs-record/dist/css/videojs.record.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
// import Record from 'videojs-record/dist/videojs.record.js';

// const videoConstraints = {
//   width: 640,
//   height: 360,
//   facingMode: "user",
//   aspectratio: 1.77777777778,
// };

// export default function WebcamComp() {
//   const webRef = React.useRef(null);
//   let img = null;
//   const showImg = () => {
//     img = webRef.current.getScreenshot();
//   };
//   return (
//     <div className="webcam-container">
//       <ul>
//         <li>Video Feedback Test</li>
//       </ul>
//       <Webcam videoConstraints={videoConstraints} ref={webRef} />
//       <button onClick={() => showImg()}>Capture</button>
//       <br />
//       <img src={img} alt="" />
//     </div>
//   );
// }

export default function WebCamTest() {
  const options = {
    // video.js options
    controls: true,
    bigPlayButton: false,
    loop: false,
    fluid: false,
    width: 320,
    height: 240,
    plugins: {
      // videojs-record plugin options
      record: {
        image: false,
        audio: false,
        video: true,
        maxLength: 5,
        displayMilliseconds: true,
        debug: true,
      },
    },
  };
  const player = videojs('myVideo', options, () => {
    // print version information at startup
    const msg = `Using video.js ${videojs.VERSION
    } with videojs-record ${videojs.getPluginVersion('record')}`;
    videojs.log(msg);

    console.log("videojs-record is ready!");
  });
}
