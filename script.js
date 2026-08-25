// --- Music Player Playlist State ---
const tracks = [
  {
    title: "Chala Jata Hoon",
    artist: "Kishore Kumar • Lo-Fi Flip",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    art: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Aisi Raaton Mein",
    artist: "Aesthetic Tapri Chill",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    art: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Midnight Chai Drive",
    artist: "Indian Lo-Fi Collective",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    art: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isLoop = false;
let isLiked = false;

// DOM Elements
const audio = document.getElementById('main-audio');
const rainAudio = document.getElementById('rain-audio');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const loopBtn = document.getElementById('loop-btn');
const heartBtn = document.getElementById('heart-btn');
const heartIcon = document.getElementById('heart-icon');
const shareBtn = document.getElementById('share-btn');
const shareIcon = document.getElementById('share-icon');

const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const trackArt = document.getElementById('track-art');
const vinylDisc = document.getElementById('vinyl-disc');
const progressContainer = document.getElementById('progress-container');
const progressFill = document.getElementById('progress-fill');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeContainer = document.getElementById('volume-container');
const volumeFill = document.getElementById('volume-fill');

// --- Load Track ---
function loadTrack(index) {
  const track = tracks[index];
  trackTitle.innerText = track.title;
  trackArtist.innerText = track.artist;
  trackArt.src = track.art;
  audio.src = track.src;
  
  // Reset Heart state on track change
  isLiked = false;
  heartBtn.classList.remove('liked');
  heartIcon.className = 'ri-heart-line';
}

// --- Play / Pause Handler ---
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    vinylDisc.classList.remove('playing');
    playIcon.className = 'ri-play-fill';
    isPlaying = false;
  } else {
    audio.play();
    vinylDisc.classList.add('playing');
    playIcon.className = 'ri-pause-fill';
    isPlaying = true;
  }
}

// --- Navigation ---
function nextTrack() {
  if (isShuffle) {
    currentTrackIndex = Math.floor(Math.random() * tracks.length);
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  }
  loadTrack(currentTrackIndex);
  if (isPlaying) audio.play();
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) audio.play();
}

// --- Like Button Toggle ---
heartBtn.addEventListener('click', () => {
  isLiked = !isLiked;
  if (isLiked) {
    heartBtn.classList.add('liked');
    heartIcon.className = 'ri-heart-fill';
  } else {
    heartBtn.classList.remove('liked');
    heartIcon.className = 'ri-heart-line';
  }
});

// --- Direct Link Share Feature ---
shareBtn.addEventListener('click', async () => {
  const shareUrl = window.location.href; // Player direct URL

  if (navigator.share) {
    try {
      await navigator.share({
        url: shareUrl
      });
    } catch (err) {
      // User dismissed share dialog
    }
  } else {
    // Fallback: Copy to Clipboard for Desktop
    try {
      await navigator.clipboard.writeText(shareUrl);
      
      // Visual feedback: icon temporarily switches to checkmark
      shareIcon.className = 'ri-check-line';
      shareIcon.style.color = '#2ed573';
      
      setTimeout(() => {
        shareIcon.className = 'ri-share-forward-line';
        shareIcon.style.color = '';
      }, 1500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  }
});

// --- Progress & Time Update ---
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Time formatting
    const curMins = Math.floor(audio.currentTime / 60);
    const curSecs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    const durMins = Math.floor(audio.duration / 60);
    const durSecs = Math.floor(audio.duration % 60).toString().padStart(2, '0');

    currentTimeEl.innerText = `${curMins}:${curSecs}`;
    durationEl.innerText = `${durMins}:${durSecs}`;
  }
});

// Progress Bar Click / Seek
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// Volume Slider
volumeContainer.addEventListener('click', (e) => {
  const width = volumeContainer.clientWidth;
  const clickX = e.offsetX;
  const newVol = clickX / width;
  audio.volume = newVol;
  volumeFill.style.width = `${newVol * 100}%`;
});

// Track End Logic
audio.addEventListener('ended', () => {
  if (isLoop) {
    audio.currentTime = 0;
    audio.play();
  } else {
    nextTrack();
  }
});

// --- Buttons Event Listeners ---
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);

shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.classList.toggle('active', isShuffle);
});

loopBtn.addEventListener('click', () => {
  isLoop = !isLoop;
  loopBtn.classList.toggle('active', isLoop);
});

// Initial Load
loadTrack(currentTrackIndex);