// Typewriter Effect for Love Letter
const loveLetterText = "My dearest love,\n\nWhen I think about you, my heart feels full in a way I never knew was possible. You've brought so much light into my life, so much joy, so much meaning.\n\nI love the way you see the world—with wonder, with kindness, with hope. I love how you make me laugh, how you understand me, how you accept me exactly as I am.\n\nEvery day with you feels like a gift. Every moment we share becomes a memory I treasure. You've become my favorite person, my best friend, my greatest love.\n\nI want you to know that you are loved beyond measure. You are appreciated, you are valued, you are everything to me.\n\nWith all my heart,\nForever yours ❤️";

let letterIndex = 0;
let isTyping = false;

function typeWriter() {
    if (letterIndex < loveLetterText.length) {
        const char = loveLetterText.charAt(letterIndex);
        document.getElementById('typewriterText').textContent += char === '\n' ? '\n' : char;
        letterIndex++;
        setTimeout(typeWriter, 30);
    } else {
        document.getElementById('caret').style.display = 'none';
    }
}

// Start typewriter when section is visible
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const letterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
            isTyping = true;
            typeWriter();
        }
    });
}, observerOptions);

const loveLetterSection = document.getElementById('loveLetterSection');
if (loveLetterSection) {
    letterObserver.observe(loveLetterSection);
}

// Music Playlist
const playlist = [
    { src: 'love/03 YENA KONJO.m4a', name: 'Yena Konjo' },
    { src: 'love/I Wanna Be Yours - Arctic Monkeys.m4a', name: 'I Wanna Be Yours - Arctic Monkeys' },
    { src: 'love/One_Direction_-_You_And_I_Pesni-Tut (1).mp3', name: 'You And I - One Direction' },
    { src: 'love/Perfect    One Direction.mp3', name: 'Perfect - One Direction' },
    { src: 'love/Perfect   Ed Sheeran.mp3', name: 'Perfect - Ed Sheeran' },
    { src: 'love/Perfect_for_me_lyrics_Justin_Ti.mp3', name: 'Perfect For Me - Justin Timberlake' },
    { src: 'love/recoverymusic)   One Direction.mp3', name: 'Recovery - One Direction' },
    { src: 'love/Until I Found You - Stephen Sanchez.m4a', name: 'Until I Found You - Stephen Sanchez' },
    { src: 'love/Yemeder Dershaya   Eyob Mekonen.mp3', name: 'Yemeder Dershaya - Eyob Mekonen' }
];

let currentSongIndex = 0;
let isPlaying = false;

// Music Elements
const musicToggle = document.getElementById('musicToggle');
const musicPanel = document.getElementById('musicPanel');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSong = document.getElementById('currentSong');
const volumeSlider = document.getElementById('volumeSlider');
const backgroundMusic = document.getElementById('backgroundMusic');

// Set initial volume
backgroundMusic.volume = 0.7;

function loadSong(index) {
    const song = playlist[index];
    backgroundMusic.src = song.src;
    currentSong.textContent = song.name;
    backgroundMusic.load();
}

function updatePlayPauseButton() {
    playPauseBtn.textContent = isPlaying ? '⏸️' : '▶️';
    musicToggle.textContent = isPlaying ? '⏸️' : '🎵';
}

function playSong() {
    backgroundMusic.play().catch(err => {
        console.log('Error playing music:', err);
        currentSong.textContent = 'Error loading song';
    });
    isPlaying = true;
    updatePlayPauseButton();
}

function pauseSong() {
    backgroundMusic.pause();
    isPlaying = false;
    updatePlayPauseButton();
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        // Wait for the song to be ready, then play
        const playWhenReady = () => {
            backgroundMusic.removeEventListener('canplaythrough', playWhenReady);
            playSong();
        };
        backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true });
        // Try to play immediately if already loaded
        if (backgroundMusic.readyState >= 3) {
            playSong();
        }
    }
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    if (isPlaying) {
        playSong();
    }
}

// Load first song
loadSong(currentSongIndex);

// Event Listeners
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    musicPanel.classList.toggle('show');
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener('click', () => {
    playNextSong();
});

prevBtn.addEventListener('click', () => {
    playPrevSong();
});

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    backgroundMusic.volume = volume;
    if (volume === 0) {
        document.querySelector('.volume-icon').textContent = '🔇';
    } else if (volume < 0.5) {
        document.querySelector('.volume-icon').textContent = '🔉';
    } else {
        document.querySelector('.volume-icon').textContent = '🔊';
    }
});

// When a song ends, automatically play the next one
backgroundMusic.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    // Always play the next song if music was playing
    if (isPlaying) {
        // Wait for the song to be ready, then play
        const playWhenReady = () => {
            backgroundMusic.removeEventListener('canplaythrough', playWhenReady);
            playSong();
        };
        backgroundMusic.addEventListener('canplaythrough', playWhenReady, { once: true });
        // Try to play immediately if already loaded
        if (backgroundMusic.readyState >= 3) {
            playSong();
        }
    }
});

// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!musicPanel.contains(e.target) && !musicToggle.contains(e.target)) {
        musicPanel.classList.remove('show');
    }
});

// Update song name when song changes
backgroundMusic.addEventListener('loadstart', () => {
    currentSong.textContent = 'Loading...';
});

backgroundMusic.addEventListener('canplay', () => {
    if (currentSong.textContent === 'Loading...') {
        currentSong.textContent = playlist[currentSongIndex].name;
    }
});

// Miss Me Button
const missMeBtn = document.getElementById('missMeBtn');
const hiddenMessage = document.getElementById('hiddenMessage');

missMeBtn.addEventListener('click', () => {
    hiddenMessage.classList.add('show');
    missMeBtn.style.display = 'none';
});

// Falling Hearts & Stars
const hearts = ['💖', '💕', '💗', '💝', '❤️'];
const stars = ['✨', '⭐', '🌟', '💫'];

function createFallingElement() {
    const container = document.getElementById('fallingElements');
    const isHeart = Math.random() > 0.5;
    const element = document.createElement('div');
    element.className = isHeart ? 'falling-heart' : 'falling-star';
    element.textContent = isHeart 
        ? hearts[Math.floor(Math.random() * hearts.length)]
        : stars[Math.floor(Math.random() * stars.length)];
    
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDuration = (Math.random() * 3 + 5) + 's';
    element.style.animationDelay = Math.random() * 2 + 's';
    element.style.fontSize = (Math.random() * 0.8 + 1) + 'rem';
    
    container.appendChild(element);

    setTimeout(() => {
        element.remove();
    }, 10000);
}

// Create falling elements periodically
setInterval(createFallingElement, 800);

// Initial falling elements
for (let i = 0; i < 10; i++) {
    setTimeout(createFallingElement, i * 200);
}

