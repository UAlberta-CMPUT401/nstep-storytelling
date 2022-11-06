/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
import 'video.js/dist/video-js.min.css';
import 'videojs-record/dist/css/videojs.record.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
import Record from 'videojs-record/dist/videojs.record';
// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone';

// register videojs-wavesurfer plugin
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer';

WaveSurfer.microphone = MicrophonePlugin;

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
    // sources: [{
    //   src: video,
    //   type: 'video/mp4',
    // }]
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
  const videoRef = useRef(null);
  return (
    <div className="webcam-container">
      <video ref={videoRef} />
    </div>
  );
}
