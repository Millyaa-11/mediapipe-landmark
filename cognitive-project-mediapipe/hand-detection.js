// Load the MediaPipe Hand Detection model.
const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2, // Only detect 2 hand
});

// Start the video stream from the camera.
const video = document.getElementById('video');
navigator.mediaDevices.getUserMedia({video: true}).then((stream) => {
  video.srcObject = stream;
  hands.initialize(video);
  console.log("Camera On")
});

// Detect hands in each video frame and draw landmarks on the canvas.
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

hands.onResults((results) => {
  console.log('Got results:', results);
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (results.multiHandLandmarks) {
    console.log('Detected landmarks:', results.multiHandLandmarks);
    for (const landmarks of results.multiHandLandmarks) {
      for (const landmark of landmarks) {
        // Print the coordinates of the landmark.
        console.log(`Landmark ${landmark.x}, ${landmark.y}, ${landmark.z}`);
        // Draw a circle at the landmark position.
        context.beginPath();
        context.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, 2 * Math.PI);
        context.fillStyle = '#00FF00';
        context.fill();
      }
    }
  }
});