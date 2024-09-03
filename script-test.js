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

    const playlist = [
        { title: "Titre 1", src: "audio/2Pac-Ambitionz-Az-a-Ridah.mp3" },
        { title: "Titre 2", src: "audio/2Pac-—-All-Eyes-On-Me.mp3" },
        { title: "Titre 3", src: "audio/2Pac-All-About-U-_feat.-Hussein-Fatal_-Nate-Dogg_-Snoop-Do.mp3" }
    ];

    let currentTrackIndex = 0;

    const loadTrack = () => {
        audioPlayer.src = playlist[currentTrackIndex].src;
        audioPlayer.load();
        audioPlayer.ontimeupdate = () => {
            progressControl.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        };
        
        audioPlayer.onloadedmetadata = () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(() => {
                        audioPlayer.play();
                        playPauseBtn.textContent = 'pause';
                    })
                    .catch(() => {
                        console.log('Permission to play audio was denied.');
                        alert("Le navigateur a bloqué la lecture automatique de l'audio. Veuillez cliquer sur le bouton Lecture pour lancer la lecture.");
                    });
            } else {
                console.log('Audio API not supported by this browser.');
            }
        };
        updateDuration();
    };

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(() => {
                        audioPlayer.play();
                        playPauseBtn.textContent = 'pause';
                    })
                    .catch(() => {
                        console.log('Permission to play audio was denied.');
                        alert("Le navigateur a bloqué la lecture automatique de l'audio. Veuillez cliquer sur le bouton Lecture pour lancer la lecture.");
                    });
            } else {
                console.log('Audio API not supported by this browser.');
            }
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = 'play_arrow';
        }
    });

    audioPlayer.addEventListener('play', () => {
        playPauseBtn.textContent = 'pause';
    });

    audioPlayer.addEventListener('pause', () => {
        playPauseBtn.textContent = 'play_arrow';
    });

    nextBtn.addEventListener('click', () => {
        currentTrackIndex++;
        if (currentTrackIndex >= playlist.length) {
            currentTrackIndex = 0;
        }
        loadTrack();
    });

    prevBtn.addEventListener('click', () => {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = playlist.length - 1;
        }
        loadTrack();
    });

    volumeControl.addEventListener('input', () => {
        audioPlayer.volume = volumeControl.value / 100;
    });

    muteBtn.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted;
        if (audioPlayer.muted) {
            muteBtn.textContent = 'volume_off';
        } else {
            muteBtn.textContent = 'volume_up';
        }
    });

    progressControl.addEventListener('input', () => {
        audioPlayer.currentTime = audioPlayer.duration * (progressControl.value / 100);
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function updateDuration() {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
    }

    audioPlayer.addEventListener('loadedmetadata', () => {
        updateDuration();
    });

    loadTrack();
});