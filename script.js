document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.querySelector('.playing');
    const nextBtn = document.querySelector('.skip_next');
    const prevBtn = document.querySelector('.skip_previous');
    const volumeControl = document.querySelector('.audio-set input[type="range"]');
    const progressControl = document.querySelector('.system-range input[type="range"]');
    const currentTimeDisplay = document.querySelector('.system-timer .system-time:first-of-type');
    const durationDisplay = document.querySelector('.system-timer .system-time:last-of-type');

    const playlist = [
        { title: "Titre 1", src: "audio/2Pac-Ambitionz-Az-a-Ridah.mp3" },
        { title: "Titre 2", src: "audio/2Pac-—-All-Eyes-On-Me.mp3" },
        { title: "Titre 3", src: "audio/2Pac-All-About-U-_feat.-Hussein-Fatal_-Nate-Dogg_-Snoop-Do.mp3" }
    ];

    let currentTrackIndex = 0;

    const loadTrack = (index) => {
        currentTrackIndex = index;
        if (currentTrackIndex < 0) {
            currentTrackIndex = playlist.length - 1;
        } else if (currentTrackIndex >= playlist.length) {
            currentTrackIndex = 0;
        }
        audioPlayer.src = playlist[currentTrackIndex].src;
        audioPlayer.load();
        audioPlayer.onloadeddata = () => {
            audioPlayer.play();
        };

        playPauseBtn.textContent = 'play_arrow';
    };
    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });
    audioPlayer.addEventListener('play', () => {
        playPauseBtn.textContent = 'pause';
    });

    audioPlayer.addEventListener('pause', () => {
        playPauseBtn.textContent = 'play_arrow';
    });

    nextBtn.addEventListener('click', () => {
        loadTrack(currentTrackIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        loadTrack(currentTrackIndex - 1);
    });

    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value / 100;
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
    loadTrack(currentTrackIndex);
});
