import { useState, useRef } from 'react';

const WebcamToggle = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    try {
      console.log("inside startWebcam try");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      console.log("1");
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.autoplay = true;
        videoRef.current.style.position = 'fixed';
        videoRef.current.style.bottom = '10px';
        videoRef.current.style.right = '10px';
        videoRef.current.style.width = '200px';
        videoRef.current.style.height = '150px';
        videoRef.current.style.zIndex = '10000';
        videoRef.current.style.border = '2px solid #ccc';
        videoRef.current.style.borderRadius = '8px';
        videoRef.current.style.backgroundColor = '#000';
      }
      document.body.appendChild(videoRef.current!);
      setIsStreaming(true);
      if (buttonRef.current) {
        buttonRef.current.textContent = "Stop video";
      }
      console.log("2");
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
      document.body.removeChild(videoRef.current);
      videoRef.current = null;
    }
    setIsStreaming(false);
    if (buttonRef.current) {
      buttonRef.current.textContent = "Start video";
    }
  };

  const toggleWebcam = () => {
    if (!isStreaming) {
      startWebcam();
    } else {
      stopWebcam();
    }
  };

  return (
    <button id="openCamera" onClick={toggleWebcam} ref={buttonRef}>
      Start video
    </button>
    // You might want to render the video element conditionally within the component
    // {isStreaming && <video ref={videoRef} />}
  );
};

export default WebcamToggle;
