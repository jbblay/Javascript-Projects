document.addEventListener('DOMContentLoaded', function () {
    // Get elements
    const video = document.querySelector('.video');
    const playBtn = document.getElementById('play-btn');
    const volumeIcon = document.getElementById('volume-icon');
    const volumeRange = document.querySelector('.volume-range');
    const progressRange = document.querySelector('.progress-range');
    const progressBar = document.querySelector('.progress-bar');
    const playbackSpeed = document.querySelector('.player-speed');
    const timeElapsed = document.querySelector('.time-elapsed');
    const timeDuration = document.querySelector('.time-duration');
    const fullscreenBtn = document.querySelector('.full-mode-controls');
    
    // Play and Pause functionality
    playBtn.addEventListener('click', togglePlay);
    
    function togglePlay() {
        if (video.paused) {
            video.play();
            playBtn.classList.remove('fa-play');
            playBtn.classList.add('fa-pause');
        } else {
            video.pause();
            playBtn.classList.remove('fa-pause');
            playBtn.classList.add('fa-play');
        }
    }
    
    // Volume functionality
    let isMuted = false;
    
    volumeIcon.addEventListener('click', toggleMute);
    volumeRange.addEventListener('input', setVolume);
    
    function toggleMute() {
        isMuted = !isMuted;
        video.muted = isMuted;
        updateVolumeIcon();
    }
    
    function setVolume() {
        const volumeValue = volumeRange.value;
        video.volume = volumeValue / 100;
        updateVolumeIcon();
    }
    
    function updateVolumeIcon() {
        if (video.muted || video.volume === 0) {
            volumeIcon.className = 'fas fa-volume-off';
        } else if (video.volume <= 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    // Progress bar functionality
    video.addEventListener('timeupdate', updateProgress);
    progressRange.addEventListener('input', setVideoProgress);
    
    function updateProgress() {
        const value = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${value}%`;
        updateTimeElapsed();
    }
    
    function setVideoProgress() {
        const newValue = progressRange.value;
        const newTime = (newValue * video.duration) / 100;
        video.currentTime = newTime;
        updateTimeElapsed();
    }
    
    function updateTimeElapsed() {
        const elapsedMinutes = Math.floor(video.currentTime / 60);
        const elapsedSeconds = Math.floor(video.currentTime % 60);
        const durationMinutes = Math.floor(video.duration / 60);
        const durationSeconds = Math.floor(video.duration % 60);
    
        timeElapsed.textContent = `${formatTime(elapsedMinutes)}:${formatTime(elapsedSeconds)} / `;
        timeDuration.textContent = `${formatTime(durationMinutes)}:${formatTime(durationSeconds)}`;
    }
    
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Playback speed functionality
    playbackSpeed.addEventListener('change', changePlaybackSpeed);
    
    function changePlaybackSpeed() {
        video.playbackRate = playbackSpeed.value;
    }
    
    // Fullscreen functionality
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    function toggleFullscreen() {
        const videoElement = document.querySelector('.video');
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) { // Firefox
            videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // IE/Edge
            videoElement.msRequestFullscreen();
        }
    }

        // Initially hide the playback speed controls
        const playbackSpeedControls = document.querySelector('.speed');
        playbackSpeedControls.style.display = 'none';
    
        // Function to toggle settings and playback speed controls
        window.toggleSettings = function () {
            const isPlaybackSpeedVisible = playbackSpeedControls.style.display === 'block';
            playbackSpeedControls.style.display = isPlaybackSpeedVisible ? 'none' : 'block';
            // Add additional settings functionality here if needed
        };
    
        // Move the playback speed functionality outside of the settings-controls
        playbackSpeed.addEventListener('change', changePlaybackSpeed);
    
        function changePlaybackSpeed() {
            video.playbackRate = playbackSpeed.value;
        }
    
});
