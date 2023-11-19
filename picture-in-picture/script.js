const videoElement = document.getElementById('video');
const togglePiPButton = document.querySelector('#button button');

// Prompt to select a Media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;

        videoElement.onloadedmetadata = () => {
            videoElement.play();
            if (!isInPiPMode()) {
                videoElement.requestPictureInPicture(); // Enter Picture-in-Picture mode
            }
        };
    } catch (error) {
        console.error("Error accessing media stream:", error);
    }
}

// Function to check if the video element is in Picture-in-Picture mode
function isInPiPMode() {
    return document.pictureInPictureElement !== null;
}

togglePiPButton.addEventListener('click', () => {
    if (isInPiPMode()) {
        document.exitPictureInPicture(); // Exit Picture-in-Picture mode
    } else {
        videoElement.requestPictureInPicture(); // Enter Picture-in-Picture mode
    }
});

// Button Event
togglePiPButton.addEventListener('click', async () => {
    // Disable Button
    togglePiPButton.disabled = true;

    // Start Picture in Picture
    await selectMediaStream();

    // Enable Button
    togglePiPButton.disabled = false;
});
