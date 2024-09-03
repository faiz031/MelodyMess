document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.querySelector('.playing');
    const nextBtn = document.querySelector('.skip_next');
    const prevBtn = document.querySelector('.skip_previous');
    const volumeControl = document.querySelector('.audio-set input[type="range"]');
    const progressControl = document.querySelector('.system-range input[type="range"]');
    const currentTimeDisplay = document.querySelector('.system-timer .system-time:first-of-type');
    const durationDisplay = document.querySelector('.system-timer .system-time:last-of-type');
    const muteBtn = document.getElementById('muteBtn');
    let currentTrackIndex = 0;
    let playlist = [];

    fetch('/playlist')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        playlist = data;
        if (playlist && playlist.length > 0) {
            loadTrack(currentTrackIndex);
        } else {
            console.error("Playlist is empty");
        }
    })
    .catch(error => console.error('An error has occured while loading the playlist:', error));

function loadTrack(trackIndex) {
    if (playlist.length > 0 && trackIndex >= 0 && trackIndex < playlist.length) {
        const track = playlist[trackIndex];
        audioPlayer.src = track.src;
        document.querySelector('.single-title').innerText = track['single-title'].replace(/-/g, ' ');
        document.querySelector('.single-artist').innerText = track['single-artist'];
        audioPlayer.load();
        audioPlayer.onloadeddata = () => {
            audioPlayer.play();
        };
        updatePlayPauseButton();
    } else {
        console.error("Track index is out of bounds or playlist is empty");
    }
}

function updatePlayPauseButton() {
    playPauseBtn.textContent = audioPlayer.paused ? 'play_arrow' : 'pause';
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseButton();
});

audioPlayer.addEventListener('play', updatePlayPauseButton);
audioPlayer.addEventListener('pause', updatePlayPauseButton);

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
});

prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
});

volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value / 100;
});

muteBtn.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.textContent = audioPlayer.muted ? 'volume_off' : 'volume_up';
});

audioPlayer.addEventListener('timeupdate', () => {
    progressControl.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});

progressControl.addEventListener('input', () => {
    audioPlayer.currentTime = (progressControl.value / 100) * audioPlayer.duration;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioPlayer.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audioPlayer.duration);
});
});
