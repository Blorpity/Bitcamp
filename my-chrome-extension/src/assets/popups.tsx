import { useState, useRef } from 'react';

const WebcamToggle = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    try {
      setIsStreaming(true);
      console.log("inside startWebcam try");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("1");
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      console.log("2");
      console.log(videoRef);
    } catch (error) {
      console.error("error accessing webcam: ", error);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current = null;
    }
    setIsStreaming(false);
  };

  const toggleWebcam = () => {
    if (!isStreaming) {
      startWebcam();
    } else {
      stopWebcam();
    }
  };

  return (
    <>
    <button id="openCamera" onClick={toggleWebcam} ref={buttonRef}>
      {!isStreaming ? 'Start' : 'Stop'} video
    </button>
    {isStreaming && <video width={200} height={150} autoPlay ref={videoRef} />}
    </>
  );
};

export default WebcamToggle;
