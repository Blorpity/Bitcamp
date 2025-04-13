import {
    FilesetResolver,
    HandLandmarker
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";
  
// const videoElement = document.getElementById('webcam');
// const canvasElement = document.getElementById('output');
// const canvasContext = canvasElement.getContext('2d');
// const predictionText = document.querySelector('#prediction span');

// canvasElement.width = 640;
// canvasElement.height = 480;

// const hands = new Hands({
//     locateFile: (file) =>
//         `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
// });

// hands.setOptions({
//     maxNumHands: 1,
//     modelComplexity: 1,
//     minDetectionConfidence: 0.8,
//     minTrackingConfidence: 0.8
// });

// hands.onResults(results => {
//     canvasContext.save();
//     canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
//     canvasContext.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

//     if (results.multiHandLandmarks.length > 0) {
//         const landmarks = results.multiHandLandmarks[0];
//     }

//     // Draw landmarks
//     for (let i = 0; i < landmarks.length; i++) {
//         const x = landmarks[i].x * canvasElement.width;
//         const y = landmarks[i].y * canvasElement.height;
//         canvasContext.beginPath();
//         canvasContext.arc(x, y, 5, 0, 2 * Math.PI);
//         canvasContext.fillStyle = "blue";
//         canvasContext.fill();
//     }

//     // TO DO : add logic to detect signs
//     predictionText.textContent = "...";


//     const camera = new Camera(videoElement, {
//         onFrame: async () => {
//             await hands.send({ image: videoElement });
//         },
//         width: 640,
//         height: 480,
//     });

//     camera.start();


// })


const video = document.getElementById("webcam")
const predictionText = document.getElementById("prediction");

let handLandmarker;
let runningMode = "VIDEO";
let lastVideoTime = -1;

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    });
    video.srcObject = stream;
    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function createHandLandmarker() {
    const { FilesetResolver, HandLandmarker } = window;

    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
    );


    handLandmarker = await handLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/1/hand_landmarker.task",
        },
        runningMode: runningMode,
        numHands: 1,
    });
}

async function main() {
    await setupCamera();
    setupCamera().then(() => {
        console.log("Camera started successfully");
      });
    await createHandLandmarker();
    video.play();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const detectHands = () => {
        if (video.currentTime === lastVideoTime) return;
        lastVideoTime = video.currentTime;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const videoFrame = canvas;

        const results = handLandmarker.detectForVideo(videoFrame, performance.now());

        if (results.landmarks.length > 0) {
            predictionText.textContent = "Hand detected";
            console.log("Landmarks:", results.landmarks[0]); // Array of 21 points
        } else {
            predictionText.textContent = "-";
        }
    };

    // Placeholder loop for prediction
    setInterval(detectHands, 200);

}

main();