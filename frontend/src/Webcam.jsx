/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect, useState } from 'react';
// import Webcam from 'react-webcam';
// import 'video.js/dist/video-js.min.css';
// import 'videojs-record/dist/css/videojs.record.css';
import videojs from 'video.js';
import RecordRTC from 'recordrtc';
// import Record from 'videojs-record/dist/videojs.record';
// the following imports are only needed when you're recording
// audio-only using the videojs-wavesurfer plugin
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone';

// register videojs-wavesurfer plugin
// import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
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

function WebCamTest() {
  // const options = {
  //   // video.js options
  //   controls: true,
  //   bigPlayButton: false,
  //   loop: false,
  //   fluid: false,
  //   width: 320,
  //   height: 240,
  //   // sources: [{
  //   //   src: video,
  //   //   type: 'video/mp4',
  //   // }]
  //   plugins: {
  //     // videojs-record plugin options
  //     record: {
  //       image: false,
  //       audio: false,
  //       video: true,
  //       maxLength: 5,
  //       displayMilliseconds: true,
  //       debug: true,
  //     },
  //   },
  // };
  // const player = videojs('myVideo', options, () => {
  //   // print version information at startup
  //   const msg = `Using video.js ${videojs.VERSION
  //   } with videojs-record ${videojs.getPluginVersion('record')}`;
  //   videojs.log(msg);

  //   console.log("videojs-record is ready!");
  // });
  const videoRef = useRef(null);
  const mediaRecorder = useRef(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: { width: 640, height: 360 } })
      .then((stream) => {
        const video = videoRef.current; video.srcObject = stream; video.play();
        mediaRecorder.current = new MediaRecorder(stream);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  // const recordVideo = () => {
  //   const width = 640;
  //   const height = width / (16 / 9);
  //   const video = videoRef.current;
  //   const stream = video.srcObject;
  //   const options = {
  //     mimeType: 'video/webm;codecs=vp9',
  //     audioBitsPerSecond: 4410,
  //     videoBitsPerSecond: 9000,
  //   };
  // };

  const record = () => {
    mediaRecorder.start();
    console.log(mediaRecorder.state);
    console.log("recorder started");
    record.style.background = "red";
    record.style.color = "black";
  };

  return (
    <div className="webcam-container">
      <video ref={videoRef} />
      <button onClick={record}>RECORD!</button>
    </div>
  );
}

export default WebCamTest;
