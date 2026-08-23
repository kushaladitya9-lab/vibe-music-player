// ========================================================
// 1. SUPABASE CONFIGURATION
// ========================================================
const SUPABASE_URL = "https://kmaypezsvnteyzjvmjgq.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttYXlwZXpzdm50ZXl6anZtamdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc0MTk4OTcsImV4cCI6MjEwMjk5NTg5N30.uqr4w30jrhZ0bobikbU2IetTrJ9moFUg7v3SNEsdDYQ"; 
const ADMIN_PIN = "1234";

let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.warn("Supabase init error:", e);
}

// All 42 Built-in Tracks
const baseTracks = [
  { id: "s1", title: "Chala Jata Hoon", artist: "", src: "song1.mp3" },
  { id: "s2", title: "Tera Mera Pyar Amar", artist: "", src: "song2.mp3" },
  { id: "s3", title: "Acha Lagta Hai", artist: "", src: "song3.mp3" },
  { id: "s4", title: "Iss Tarah", artist: "", src: "song4.mp3" },
  { id: "s5", title: "Mere Sapno Ki Rani", artist: "", src: "song5.mp3" },
  { id: "s6", title: "Ishq Risk", artist: "", src: "song6.mp3" },
  { id: "s7", title: "Give It Up To Me", artist: "", src: "song7.mp3" },
  { id: "s8", title: "Kabhi Jo Badal Barse", artist: "", src: "song8.mp3" },
  { id: "s9", title: "Dekhte Dekhte", artist: "", src: "song9.mp3" },
  { id: "s10", title: "Be Intehaan", artist: "", src: "song10.mp3" },
  { id: "s11", title: "Haareya", artist: "", src: "song11.mp3" },
  { id: "s12", title: "Tum Jo Aaye", artist: "", src: "song12.mp3" },
  { id: "s13", title: "Nit Khair Manga", artist: "", src: "song13.mp3" },
  { id: "s14", title: "Hero Splendor", artist: "", src: "song14.mp3" },
  { id: "s15", title: "Tum Tak", artist: "", src: "song15.mp3" },
  { id: "s16", title: "Likhe Jo Khat Tujhe", artist: "", src: "song16.mp3" },
  { id: "s17", title: "Pehli Nazar Mein", artist: "", src: "song17.mp3" },
  { id: "s18", title: "Dekha Hazaro Dafaa", artist: "", src: "song18.mp3" },
  { id: "s19", title: "Bol Na Halke Halke", artist: "", src: "song19.mp3" },
  { id: "s20", title: "Ishq Mubarak", artist: "", src: "song20.mp3" },
  { id: "s21", title: "Baarish", artist: "", src: "song21.mp3" },
  { id: "s22", title: "Aaja Sanam Madhur Chandni Mein", artist: "", src: "song22.mp3" },
  { id: "s23", title: "Aashiq Tera", artist: "", src: "song23.mp3" },
  { id: "s24", title: "Samjho Na", artist: "", src: "song24.mp3" },
  { id: "s25", title: "Shree Hari Stotram", artist: "", src: "song25.mp3" },
  { id: "s26", title: "Pal Pal Dil ke Paas", artist: "", src: "song26.mp3" },
  { id: "s27", title: "Dil Ka Jo Haal Hai", artist: "", src: "song27.mp3" },
  { id: "s28", title: "Wo Ladki Hai Kahan", artist: "", src: "song28.mp3" },
  { id: "s29", title: "Itna Na Mujhse Tu Pyar Badha", artist: "", src: "song29.mp3" },
  { id: "s30", title: "Jahan Mein Aesa Kaun Hai", artist: "", src: "song30.mp3" },
  { id: "s31", title: "Jiya Dhadak Dhadak Jaye", artist: "", src: "song31.mp3" },
  { id: "s32", title: "Kiston", artist: "", src: "song32.mp3" },
  { id: "s33", title: "Maan Mera Old", artist: "", src: "song33.mp3" },
  { id: "s34", title: "Maan Mera New", artist: "", src: "song34.mp3" },
  { id: "s35", title: "Monta Re", artist: "", src: "song35.mp3" },
  { id: "s36", title: "SANAM :- Chala Jata Hoon", artist: "", src: "song36.mp3" },
  { id: "s37", title: "Tu Tu Hai Wahi", artist: "", src: "song37.mp3" },
  { id: "s38", title: "Uljhan", artist: "", src: "song38.mp3" },
  { id: "s39", title: "Ye Tune Kya Kiya", artist: "", src: "song39.mp3" },
  { id: "s40", title: "Yeh Fitoor Mera", artist: "", src: "song40.mp3" },
  { id: "s41", title: "Yeh Parda Hata do", artist: "", src: "song41.mp3" },
  { id: "s42", title: "Mere Naam Tu", artist: "", src: "song42.mp3" }
];

const FALLBACK_ARTIST = "My Favourite Artist";

const backgrounds = [
  { name: "Wallpaper 1", desktop: "bg1-desktop.png", mobile: "bg1-mobile.png" },
  { name: "Wallpaper 2", desktop: "bg2-desktop.png", mobile: "bg2-mobile.png" },
  { name: "Wallpaper 3", desktop: "bg3-desktop.png", mobile: "bg3-mobile.png" },
  { name: "Wallpaper 4", desktop: "bg4-desktop.png", mobile: "bg4-mobile.png" }
];

const moods = [
  { name: "Sunrise", cls: "mood-sunrise", icon: "ri-sun-fill", weather: "none" },
  { name: "Sunset", cls: "mood-sunset", icon: "ri-sun-cloudy-line", weather: "none" },
  { name: "Monsoon", cls: "mood-rainy", icon: "ri-rainy-line", weather: "rain" },
  { name: "Midnight", cls: "mood-night", icon: "ri-moon-clear-line", weather: "stars" }
];

// State Management
let supabaseTracks = [];
let localTracks = [];
let playlist = [...baseTracks];
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let isZenMode = false;
let isFading = false;

let currentTab = "all"; 
let activeCustomPlaylistName = null;

let currentBgIndex = localStorage.getItem("vibe_bg_idx") || "0";
let customBgData = localStorage.getItem("vibe_custom_bg") || null;
let currentMoodIndex = parseInt(localStorage.getItem("vibe_mood_idx") || "1");
let likedTrackIds = JSON.parse(localStorage.getItem("vibe_liked_songs") || "[]");
let trackOverrides = JSON.parse(localStorage.getItem("vibe_track_overrides") || "{}");
let customPlaylists = JSON.parse(localStorage.getItem("vibe_custom_playlists") || "{}");

let audioCtx = null;
let rainGainNode = null;
let isWebAudioInit = false;

// DOM References
let audio, trackTitle, trackArtist, playBtn, playIcon, prevBtn, nextBtn;
let shuffleBtn, repeatBtn, seekContainer, seekProgress, seekThumb;
let currentTimeEl, durationTimeEl, drawerBackdrop, playlistDrawer, themeDrawer;
let playlistScrollList, trackCountBadge, audioFileInput, drawerAudioFileInput;
let mainAudioInput, uploadModal, uploadStatusText;
let mainHeartBtn, mainHeartIcon, likedCountBadge;
let moodToggleBtn, moodIcon, moodLabel, zenToggleBtn, appRefreshBtn, refreshIcon;
let searchInput, tabAllBtn, tabLikedBtn, rainSlider;
let volumeSlider, volumeIcon, draggableVolume;
let createPlaylistBtn, customPlaylistsContainer;
let customBgInput, customBgLabel, customBgText;
let playerContainer;

let balls = [];

// ========================================================
// INITIALIZATION
// ========================================================
function initPlayer() {
  audio = document.getElementById("main-audio");
  trackTitle = document.getElementById("track-title");
  trackArtist = document.getElementById("track-artist");

  playBtn = document.getElementById("play-btn");
  playIcon = document.getElementById("play-icon");
  prevBtn = document.getElementById("prev-btn");
  nextBtn = document.getElementById("next-btn");
  shuffleBtn = document.getElementById("shuffle-btn");
  repeatBtn = document.getElementById("repeat-btn");

  seekContainer = document.getElementById("seek-container");
  seekProgress = document.getElementById("seek-progress");
  seekThumb = document.getElementById("seek-thumb");
  currentTimeEl = document.getElementById("current-time");
  durationTimeEl = document.getElementById("duration-time");

  draggableVolume = document.getElementById("draggable-volume");
  volumeSlider = document.getElementById("volume-slider");
  volumeIcon = document.getElementById("volume-icon");

  drawerBackdrop = document.getElementById("drawer-backdrop");
  playlistDrawer = document.getElementById("playlist-drawer");
  themeDrawer = document.getElementById("theme-drawer");
  playlistScrollList = document.getElementById("playlist-scroll-list");
  trackCountBadge = document.getElementById("track-count");
  likedCountBadge = document.getElementById("liked-count");

  mainHeartBtn = document.getElementById("main-heart-btn");
  mainHeartIcon = document.getElementById("main-heart-icon");

  moodToggleBtn = document.getElementById("mood-toggle-btn");
  moodIcon = document.getElementById("mood-icon");
  moodLabel = document.getElementById("mood-label");
  zenToggleBtn = document.getElementById("zen-toggle-btn");
  appRefreshBtn = document.getElementById("app-refresh-btn");
  refreshIcon = document.getElementById("refresh-icon");

  searchInput = document.getElementById("playlist-search-input");
  tabAllBtn = document.getElementById("tab-all-btn");
  tabLikedBtn = document.getElementById("tab-liked-btn");
  rainSlider = document.getElementById("rain-slider");

  audioFileInput = document.getElementById("audio-file-input");
  drawerAudioFileInput = document.getElementById("drawer-audio-file-input");
  mainAudioInput = document.getElementById("main-audio-input");
  uploadModal = document.getElementById("upload-modal");
  uploadStatusText = document.getElementById("upload-status-text");

  createPlaylistBtn = document.getElementById("create-playlist-btn");
  customPlaylistsContainer = document.getElementById("custom-playlists-container");

  customBgInput = document.getElementById("custom-bg-input");
  customBgLabel = document.getElementById("custom-bg-label");
  customBgText = document.getElementById("custom-bg-text");
  playerContainer = document.getElementById("player-container");

  if (currentBgIndex === "custom" && customBgData) {
    applyCustomBackground(customBgData);
  } else {
    applyBackground(parseInt(currentBgIndex) || 0);
  }

  applyMood(currentMoodIndex, false);
  updateLikedCount();
  rebuildPlaylist();
  loadTrack(currentTrackIndex);
  setupListeners();
  setupMediaSession();
  setupBouncingBalls();
  initWeatherCanvas();
  setupDraggableVolume();
  renderCustomPlaylists();
  setupSwipeGestures();

  fetchSupabaseSongs();
}

// ========================================================
// ZEN MODE ENGINE
// ========================================================
function toggleZenMode() {
  isZenMode = !isZenMode;
  document.body.classList.toggle("zen-mode", isZenMode);
}

function exitZenMode() {
  if (isZenMode) {
    isZenMode = false;
    document.body.classList.remove("zen-mode");
  }
}

// ========================================================
// SUPABASE SYNC & UPLOAD
// ========================================================
async function fetchSupabaseSongs() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient
      .from('songs')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.warn("Supabase notice:", error.message);
      return;
    }

    if (data && data.length > 0) {
      supabaseTracks = data.map(item => ({
        id: `sb_${item.id}`,
        title: item.title,
        artist: item.artist || FALLBACK_ARTIST,
        src: item.src
      }));
      rebuildPlaylist();
    }
  } catch (err) {
    console.warn("Supabase fetch notice:", err);
  }
}

function rebuildPlaylist() {
  playlist = [...baseTracks, ...supabaseTracks, ...localTracks].map(track => {
    if (trackOverrides[track.id]) {
      return {
        ...track,
        title: trackOverrides[track.id].title || track.title,
        artist: trackOverrides[track.id].artist || track.artist
      };
    }
    return track;
  });

  updateTrackCount();
  renderPlaylist();
}

async function handleMainPlaylistUpload(file) {
  if (!supabaseClient) {
    alert("Supabase is not connected!");
    return;
  }

  showUploadModal("Uploading to Main Playlist...");

  try {
    const cleanTitle = file.name.replace(/\.[^/.]+$/, "");
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { data: storageData, error: storageError } = await supabaseClient.storage
      .from('music-tracks')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (storageError) throw storageError;

    const { data: urlData } = supabaseClient.storage
      .from('music-tracks')
      .getPublicUrl(fileName);

    const publicUrl = urlData.publicUrl;

    const { data: dbData, error: dbError } = await supabaseClient
      .from('songs')
      .insert([{ title: cleanTitle, artist: FALLBACK_ARTIST, src: publicUrl }])
      .select();

    if (dbError) throw dbError;

    hideUploadModal();
    alert("Song added to Main Playlist successfully! Everyone can listen now.");

    await fetchSupabaseSongs();
    loadTrack(playlist.length - 1);
    playTrack();
    closeAllDrawers();

  } catch (err) {
    hideUploadModal();
    alert("Upload failed: " + err.message);
  }
}

function showUploadModal(msg) {
  if (uploadStatusText) uploadStatusText.textContent = msg;
  if (uploadModal) uploadModal.classList.add("active");
}

function hideUploadModal() {
  if (uploadModal) uploadModal.classList.remove("active");
}

// ========================================================
// BACKGROUND & CUSTOM WALLPAPER ENGINE
// ========================================================
function applyBackground(index) {
  if (index < 0 || index >= backgrounds.length) index = 0;
  currentBgIndex = String(index);
  localStorage.setItem("vibe_bg_idx", currentBgIndex);

  const bg = backgrounds[index];
  document.documentElement.style.setProperty('--bg-desktop', `url('${bg.desktop}')`);
  document.documentElement.style.setProperty('--bg-mobile', `url('${bg.mobile}')`);

  document.querySelectorAll(".bg-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
  if (customBgLabel) customBgLabel.classList.remove("active");
}

function applyCustomBackground(dataUrl) {
  currentBgIndex = "custom";
  customBgData = dataUrl;
  localStorage.setItem("vibe_bg_idx", "custom");
  try {
    localStorage.setItem("vibe_custom_bg", dataUrl);
  } catch (err) {
    console.warn("Storage quota full, using image for session only");
  }

  document.documentElement.style.setProperty('--bg-desktop', `url('${dataUrl}')`);
  document.documentElement.style.setProperty('--bg-mobile', `url('${dataUrl}')`);

  document.querySelectorAll(".bg-btn").forEach(btn => btn.classList.remove("active"));
  if (customBgLabel) customBgLabel.classList.add("active");
  if (customBgText) customBgText.textContent = "Custom Wallpaper (Active)";
}

function handleCustomBgUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    applyCustomBackground(dataUrl);
    alert("Custom wallpaper applied successfully!");
  };
  reader.readAsDataURL(file);
}

// ========================================================
// ATMOSPHERIC MOODS
// ========================================================
function applyMood(index, userExplicitChoice = true) {
  if (index < 0 || index >= moods.length) index = 0;
  moods.forEach(m => document.body.classList.remove(m.cls));

  currentMoodIndex = index;
  localStorage.setItem("vibe_mood_idx", currentMoodIndex);

  const mood = moods[currentMoodIndex];
  document.body.classList.add(mood.cls);

  if (moodLabel) moodLabel.textContent = mood.name;
  if (moodIcon) moodIcon.className = mood.icon;

  const moodBtns = document.querySelectorAll(".mood-btn");
  moodBtns.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentMoodIndex);
  });

  if (userExplicitChoice) {
    if (mood.weather === "rain" && rainSlider) {
      if (!isWebAudioInit) initRainAudio();
      if (rainSlider.value == 0) {
        rainSlider.value = 0.4;
        if (rainGainNode) rainGainNode.gain.value = 0.4;
      }
    } else if (rainSlider && rainGainNode && rainSlider.value > 0) {
      rainSlider.value = 0;
      rainGainNode.gain.value = 0;
    }
  }
}

function cycleMood() {
  const nextIdx = (currentMoodIndex + 1) % moods.length;
  applyMood(nextIdx, true);
}

// ========================================================
// DRAGGABLE VOLUME BAR
// ========================================================
function setupDraggableVolume() {
  if (!draggableVolume) return;

  const defaultX = Math.max(20, window.innerWidth - 210);
  const defaultY = Math.max(20, window.innerHeight - 80);
  
  let currentX = defaultX;
  let currentY = defaultY;
  let startX = 0, startY = 0;
  let isDragging = false;

  draggableVolume.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

  function onPointerDown(e) {
    if (e.target === volumeSlider) return;
    isDragging = true;
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
    draggableVolume.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    let newX = e.clientX - startX;
    let newY = e.clientY - startY;

    const maxX = window.innerWidth - draggableVolume.offsetWidth - 10;
    const maxY = window.innerHeight - draggableVolume.offsetHeight - 10;

    newX = Math.max(10, Math.min(newX, maxX));
    newY = Math.max(10, Math.min(newY, maxY));

    currentX = newX;
    currentY = newY;
    draggableVolume.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }

  function onPointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    try { draggableVolume.releasePointerCapture(e.pointerId); } catch(err) {}
  }

  draggableVolume.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

// ========================================================
// RAIN SYNTHESIZER
// ========================================================
function initRainAudio() {
  if (isWebAudioInit) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const rainSource = audioCtx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = audioCtx.createBiquadFilter();
    rainFilter.type = "lowpass";
    rainFilter.frequency.value = 1000;

    rainGainNode = audioCtx.createGain();
    rainGainNode.gain.value = 0;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGainNode);
    rainGainNode.connect(audioCtx.destination);
    rainSource.start();

    isWebAudioInit = true;
  } catch (err) {
    console.warn("Rain audio init waiting:", err);
  }
}

// ========================================================
// TRACK LOADER, EDIT INFO & SMOOTH FADE TRANSITION
// ========================================================
function loadTrack(index) {
  if (playlist.length === 0) return;

  currentTrackIndex = index;
  const track = playlist[currentTrackIndex];

  if (trackTitle) trackTitle.textContent = track.title || "Unknown Track";

  if (trackArtist) {
    if (!track.artist || track.artist.trim() === "" || track.artist.toLowerCase() === "unknown") {
      trackArtist.textContent = FALLBACK_ARTIST;
    } else {
      trackArtist.textContent = track.artist;
    }
  }

  audio.src = track.src;
  audio.load();

  updateHeartButton();
  updateMediaSessionMetadata(track);
}

// Smooth Soft Crossfade Helper
function triggerFadeTransition(actionCallback) {
  if (!audio || !isPlaying || isFading) {
    actionCallback();
    return;
  }

  isFading = true;
  const targetVol = parseFloat(volumeSlider ? volumeSlider.value : 1);
  let currentVol = audio.volume;
  const interval = 25;
  const step = currentVol / (220 / interval);

  const fadeOutTimer = setInterval(() => {
    currentVol = Math.max(0, currentVol - step);
    audio.volume = currentVol;
    if (currentVol <= 0.05) {
      clearInterval(fadeOutTimer);
      audio.volume = 0;
      actionCallback();

      let inVol = 0;
      const stepIn = targetVol / (220 / interval);
      const fadeInTimer = setInterval(() => {
        inVol = Math.min(targetVol, inVol + stepIn);
        audio.volume = inVol;
        if (inVol >= targetVol) {
          clearInterval(fadeInTimer);
          audio.volume = targetVol;
          isFading = false;
        }
      }, interval);
    }
  }, interval);
}

function editTrackInfo(trackId) {
  const track = playlist.find(t => t.id === trackId);
  if (!track) return;

  const currentTitle = track.title || "";
  const currentArtist = (!track.artist || track.artist === FALLBACK_ARTIST) ? "" : track.artist;

  const newTitle = prompt("Edit Track Title:", currentTitle);
  if (newTitle === null) return;

  const newArtist = prompt("Edit Artist / Singer Name:", currentArtist);
  if (newArtist === null) return;

  const finalTitle = newTitle.trim() || currentTitle;
  const finalArtist = newArtist.trim() || FALLBACK_ARTIST;

  trackOverrides[trackId] = { title: finalTitle, artist: finalArtist };
  localStorage.setItem("vibe_track_overrides", JSON.stringify(trackOverrides));
  rebuildPlaylist();

  if (playlist[currentTrackIndex] && playlist[currentTrackIndex].id === trackId) {
    if (trackTitle) trackTitle.textContent = finalTitle;
    if (trackArtist) trackArtist.textContent = finalArtist;
    updateMediaSessionMetadata(playlist[currentTrackIndex]);
  }

  alert("Track details updated!");
}

function playTrack() {
  if (!audio) return;
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();

  audio.play().then(() => {
    isPlaying = true;
    if (playIcon) playIcon.className = "ri-pause-fill";
    updateMediaSessionMetadata(playlist[currentTrackIndex]);
  }).catch((err) => {
    console.warn("Playback interaction needed:", err);
  });
}

function pauseTrack() {
  if (!audio) return;
  audio.pause();
  isPlaying = false;
  if (playIcon) playIcon.className = "ri-play-fill";
}

function togglePlay() {
  if (playlist.length === 0) return;
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function nextTrack() {
  let activePool = playlist;
  if (currentTab === "liked") {
    activePool = playlist.filter(t => likedTrackIds.includes(t.id));
  } else if (currentTab === "custom" && activeCustomPlaylistName) {
    const allowedIds = customPlaylists[activeCustomPlaylistName] || [];
    activePool = playlist.filter(t => allowedIds.includes(t.id));
  }

  if (activePool.length === 0) activePool = playlist;

  if (isShuffle) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * activePool.length);
    } while (randomIndex === currentTrackIndex && activePool.length > 1);
    
    const selectedTrack = activePool[randomIndex];
    currentTrackIndex = playlist.findIndex(t => t.id === selectedTrack.id);
  } else {
    const currentInPoolIdx = activePool.findIndex(t => t.id === playlist[currentTrackIndex].id);
    const nextInPoolIdx = (currentInPoolIdx + 1) % activePool.length;
    const nextTrackObj = activePool[nextInPoolIdx];
    currentTrackIndex = playlist.findIndex(t => t.id === nextTrackObj.id);
  }

  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  if (audio && audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }

  let activePool = playlist;
  if (currentTab === "liked") {
    activePool = playlist.filter(t => likedTrackIds.includes(t.id));
  } else if (currentTab === "custom" && activeCustomPlaylistName) {
    const allowedIds = customPlaylists[activeCustomPlaylistName] || [];
    activePool = playlist.filter(t => allowedIds.includes(t.id));
  }

  if (activePool.length === 0) activePool = playlist;

  const currentInPoolIdx = activePool.findIndex(t => t.id === playlist[currentTrackIndex].id);
  const prevInPoolIdx = (currentInPoolIdx - 1 + activePool.length) % activePool.length;
  const prevTrackObj = activePool[prevInPoolIdx];
  currentTrackIndex = playlist.findIndex(t => t.id === prevTrackObj.id);

  loadTrack(currentTrackIndex);
  playTrack();
}

function updateProgress() {
  if (!audio) return;
  const { duration, currentTime } = audio;
  if (isNaN(duration) || duration === 0) return;

  const percent = (currentTime / duration) * 100;
  if (seekProgress) seekProgress.style.width = `${percent}%`;
  if (seekThumb) seekThumb.style.left = `${percent}%`;

  if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
  if (durationTimeEl) durationTimeEl.textContent = formatTime(duration);
}

function setProgress(e) {
  if (!seekContainer || !audio) return;
  const rect = seekContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  const duration = audio.duration;

  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function handleVolume(e) {
  const val = parseFloat(e.target.value);
  audio.volume = val;
  updateVolumeIcon(val);
}

function updateVolumeIcon(val) {
  if (!volumeIcon) return;
  if (val === 0) {
    volumeIcon.className = "ri-volume-mute-line";
  } else if (val < 0.5) {
    volumeIcon.className = "ri-volume-down-line";
  } else {
    volumeIcon.className = "ri-volume-up-line";
  }
}

// Favorites
function updateHeartButton() {
  const currentTrack = playlist[currentTrackIndex];
  if (!currentTrack) return;
  const isLiked = likedTrackIds.includes(currentTrack.id);

  if (mainHeartBtn) {
    mainHeartBtn.classList.toggle("liked", isLiked);
    mainHeartIcon.className = isLiked ? "ri-heart-fill" : "ri-heart-line";
  }
}

function toggleLikeCurrentTrack() {
  const currentTrack = playlist[currentTrackIndex];
  if (!currentTrack) return;

  const idx = likedTrackIds.indexOf(currentTrack.id);
  if (idx > -1) {
    likedTrackIds.splice(idx, 1);
  } else {
    likedTrackIds.push(currentTrack.id);
  }

  localStorage.setItem("vibe_liked_songs", JSON.stringify(likedTrackIds));
  updateHeartButton();
  updateLikedCount();
  renderPlaylist();
}

function updateLikedCount() {
  if (likedCountBadge) {
    likedCountBadge.textContent = likedTrackIds.length;
  }
}

// ========================================================
// MOBILE SWIPE GESTURES
// ========================================================
function setupSwipeGestures() {
  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    // Avoid triggering when user interacts inside modals or volume slider
    if (
      e.target.closest("#volume-slider") || 
      e.target.closest("#seek-container") ||
      e.target.closest(".playlist-drawer") ||
      e.target.closest("button")
    ) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Horizontal swipe threshold: > 60px and more horizontal than vertical
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX < 0) {
        triggerFadeTransition(nextTrack); // Swipe Left -> Next
      } else {
        triggerFadeTransition(prevTrack); // Swipe Right -> Prev
      }
    }
  });
}

// ========================================================
// CUSTOM PLAYLISTS SYSTEM
// ========================================================
function renderCustomPlaylists() {
  if (!customPlaylistsContainer) return;
  customPlaylistsContainer.innerHTML = "";

  const playlistNames = Object.keys(customPlaylists);

  playlistNames.forEach(name => {
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `
      display: inline-flex; align-items: center;
      background: ${activeCustomPlaylistName === name ? "rgba(255, 222, 89, 0.18)" : "rgba(255,255,255,0.06)"};
      border: 1px solid ${activeCustomPlaylistName === name ? "var(--accent-gold)" : "rgba(255,255,255,0.12)"};
      border-radius: 8px; overflow: hidden; margin-right: 5px; flex-shrink: 0;
    `;

    const chip = document.createElement("button");
    chip.style.cssText = "padding: 5px 8px; font-size: 0.72rem; white-space: nowrap; border: none; background: transparent; color: #fff; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: 600;";
    chip.innerHTML = `<i class="ri-play-list-line"></i> ${name} (${customPlaylists[name].length})`;

    chip.addEventListener("click", () => {
      activeCustomPlaylistName = name;
      currentTab = "custom";
      if (tabAllBtn) tabAllBtn.classList.remove("active");
      if (tabLikedBtn) tabLikedBtn.classList.remove("active");
      renderCustomPlaylists();
      renderPlaylist();
    });

    const delBtn = document.createElement("button");
    delBtn.title = `Delete playlist "${name}"`;
    delBtn.style.cssText = "background: transparent; border: none; color: rgba(255,255,255,0.45); padding: 5px 6px; cursor: pointer; font-size: 0.82rem; display: flex; align-items: center;";
    delBtn.innerHTML = `<i class="ri-close-line"></i>`;

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteCustomPlaylist(name);
    });

    wrapper.appendChild(chip);
    wrapper.appendChild(delBtn);
    customPlaylistsContainer.appendChild(wrapper);
  });
}

function createNewPlaylist() {
  const name = prompt("Enter new custom playlist name:");
  if (!name || !name.trim()) return;
  const cleanName = name.trim();

  if (customPlaylists[cleanName]) {
    alert("Playlist already exists!");
    return;
  }

  customPlaylists[cleanName] = [];
  localStorage.setItem("vibe_custom_playlists", JSON.stringify(customPlaylists));
  renderCustomPlaylists();
  alert(`Playlist "${cleanName}" created!`);
}

function deleteCustomPlaylist(name) {
  if (confirm(`Delete playlist "${name}"?`)) {
    delete customPlaylists[name];
    localStorage.setItem("vibe_custom_playlists", JSON.stringify(customPlaylists));
    if (activeCustomPlaylistName === name) {
      activeCustomPlaylistName = null;
      currentTab = "all";
      if (tabAllBtn) tabAllBtn.classList.add("active");
    }
    renderCustomPlaylists();
    renderPlaylist();
  }
}

function addSongToCustomPlaylist(trackId, playlistName) {
  if (!customPlaylists[playlistName]) return;
  if (!customPlaylists[playlistName].includes(trackId)) {
    customPlaylists[playlistName].push(trackId);
    localStorage.setItem("vibe_custom_playlists", JSON.stringify(customPlaylists));
    renderCustomPlaylists();
    alert(`Added to "${playlistName}"!`);
  } else {
    alert(`Song is already in "${playlistName}"!`);
  }
}

function removeSongFromCustomPlaylist(trackId, playlistName) {
  if (!customPlaylists[playlistName]) return;
  customPlaylists[playlistName] = customPlaylists[playlistName].filter(id => id !== trackId);
  localStorage.setItem("vibe_custom_playlists", JSON.stringify(customPlaylists));
  renderCustomPlaylists();
  renderPlaylist();
}

// Playlist Scroll Render
function renderPlaylist() {
  if (!playlistScrollList) return;
  playlistScrollList.innerHTML = "";

  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let targetTracks = playlist;
  if (currentTab === "liked") {
    targetTracks = playlist.filter(t => likedTrackIds.includes(t.id));
  } else if (currentTab === "custom" && activeCustomPlaylistName) {
    const allowedIds = customPlaylists[activeCustomPlaylistName] || [];
    targetTracks = playlist.filter(t => allowedIds.includes(t.id));
  }

  if (targetTracks.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.style.cssText = "text-align: center; color: rgba(255,255,255,0.4); font-size: 0.85rem; padding: 25px 0;";
    emptyMsg.textContent = currentTab === "custom" ? "No songs in this playlist. Add some from 'All Tracks'!" : "No songs found.";
    playlistScrollList.appendChild(emptyMsg);
    return;
  }

  targetTracks.forEach((track) => {
    const originalIndex = playlist.findIndex(t => t.id === track.id);
    if (originalIndex === -1) return;

    const matchTitle = track.title.toLowerCase().includes(query);
    const matchArtist = (track.artist || "").toLowerCase().includes(query);
    if (query && !matchTitle && !matchArtist) return;

    const isLiked = likedTrackIds.includes(track.id);
    const displayArtist = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;

    let actionBtnHtml = '';
    if (currentTab === "custom" && activeCustomPlaylistName) {
      actionBtnHtml = `
        <button class="item-playlist-remove-btn" title="Remove from playlist" style="background:none; border:none; color:rgba(255,71,87,0.85); cursor:pointer; font-size:1.1rem; padding:4px;">
          <i class="ri-indeterminate-circle-line"></i>
        </button>
      `;
    } else {
      actionBtnHtml = `
        <button class="item-playlist-add-btn" title="Add to Custom Playlist" style="background:none; border:none; color:rgba(255,255,255,0.6); cursor:pointer; font-size:1rem; padding:4px;">
          <i class="ri-add-box-line"></i>
        </button>
      `;
    }

    const item = document.createElement("div");
    item.className = `playlist-item ${originalIndex === currentTrackIndex ? "active" : ""}`;
    item.innerHTML = `
      <div class="playlist-item-info">
        <div class="item-title">${track.title}</div>
        <div class="item-artist">${displayArtist}</div>
      </div>
      <div class="item-actions">
        <button class="item-edit-btn" title="Edit Track Info">
          <i class="ri-edit-line"></i>
        </button>
        ${actionBtnHtml}
        <button class="item-heart-btn ${isLiked ? "liked" : ""}">
          <i class="${isLiked ? "ri-heart-fill" : "ri-heart-line"}"></i>
        </button>
        <i class="ri-volume-up-fill item-indicator"></i>
      </div>
    `;

    item.addEventListener("click", (e) => {
      if (
        e.target.closest(".item-heart-btn") || 
        e.target.closest(".item-playlist-add-btn") || 
        e.target.closest(".item-playlist-remove-btn") ||
        e.target.closest(".item-edit-btn")
      ) return;
      
      triggerFadeTransition(() => {
        loadTrack(originalIndex);
        playTrack();
      });
      closeAllDrawers();
    });

    const editBtn = item.querySelector(".item-edit-btn");
    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        editTrackInfo(track.id);
      });
    }

    if (currentTab === "custom" && activeCustomPlaylistName) {
      const removeBtn = item.querySelector(".item-playlist-remove-btn");
      if (removeBtn) {
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeSongFromCustomPlaylist(track.id, activeCustomPlaylistName);
        });
      }
    } else {
      const addBtn = item.querySelector(".item-playlist-add-btn");
      if (addBtn) {
        addBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const pNames = Object.keys(customPlaylists);
          if (pNames.length === 0) {
            alert("Please create a custom playlist first using '+ New Playlist'!");
            return;
          }
          const choice = prompt(`Select playlist to add "${track.title}":\n- ${pNames.join("\n- ")}`);
          if (choice && customPlaylists[choice.trim()]) {
            addSongToCustomPlaylist(track.id, choice.trim());
          } else if (choice) {
            alert("Playlist not found!");
          }
        });
      }
    }

    const itemHeart = item.querySelector(".item-heart-btn");
    itemHeart.addEventListener("click", (e) => {
      e.stopPropagation();
      const idIdx = likedTrackIds.indexOf(track.id);
      if (idIdx > -1) {
        likedTrackIds.splice(idIdx, 1);
      } else {
        likedTrackIds.push(track.id);
      }
      localStorage.setItem("vibe_liked_songs", JSON.stringify(likedTrackIds));
      updateHeartButton();
      updateLikedCount();
      renderPlaylist();
    });

    playlistScrollList.appendChild(item);
  });
}

function updateTrackCount() {
  if (trackCountBadge) {
    trackCountBadge.textContent = playlist.length;
  }
}

// Drawer Open / Close Controls
function openPlaylistDrawer() {
  closeAllDrawers();
  if (playlistDrawer) playlistDrawer.classList.add("active");
  if (drawerBackdrop) drawerBackdrop.classList.add("active");
}

function openThemeDrawer() {
  closeAllDrawers();
  if (themeDrawer) themeDrawer.classList.add("active");
  if (drawerBackdrop) drawerBackdrop.classList.add("active");
}

function closeAllDrawers() {
  if (playlistDrawer) playlistDrawer.classList.remove("active");
  if (themeDrawer) themeDrawer.classList.remove("active");
  if (drawerBackdrop) drawerBackdrop.classList.remove("active");
}

// Media Session
function setupMediaSession() {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", playTrack);
    navigator.mediaSession.setActionHandler("pause", pauseTrack);
    navigator.mediaSession.setActionHandler("previoustrack", () => triggerFadeTransition(prevTrack));
    navigator.mediaSession.setActionHandler("nexttrack", () => triggerFadeTransition(nextTrack));
  }
}

function updateMediaSessionMetadata(track) {
  if ("mediaSession" in navigator && track) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist || FALLBACK_ARTIST,
      album: "Vibe Music Player",
      artwork: [{ src: "app-icon.png", sizes: "512x512", type: "image/png" }]
    });
  }
}

// Weather Canvas
function initWeatherCanvas() {
  const canvas = document.getElementById("weather-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const drops = Array.from({ length: 90 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    len: Math.random() * 18 + 12,
    speed: Math.random() * 8 + 12
  }));

  const stars = Array.from({ length: 65 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * (window.innerHeight * 0.6),
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    dAlpha: (Math.random() * 0.02 + 0.008) * (Math.random() < 0.5 ? 1 : -1)
  }));

  function drawWeather() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const activeWeather = moods[currentMoodIndex].weather;

    if (activeWeather === "rain") {
      ctx.strokeStyle = "rgba(200, 225, 255, 0.45)";
      ctx.lineWidth = 1.2;
      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 2, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= 1;
        if (d.y > canvas.height) {
          d.y = -d.len;
          d.x = Math.random() * canvas.width;
        }
      });
    } else if (activeWeather === "stars") {
      stars.forEach(s => {
        s.alpha += s.dAlpha;
        if (s.alpha <= 0.2 || s.alpha >= 1) s.dAlpha *= -1;

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    requestAnimationFrame(drawWeather);
  }
  drawWeather();
}

// 3 Transparent Bouncing Balls Physics
function setupBouncingBalls() {
  const btnDrawer = document.getElementById("open-drawer-btn");
  const btnTheme = document.getElementById("open-theme-btn");
  const btnUpload = document.getElementById("quick-upload-btn");

  const winW = window.innerWidth;
  const winH = window.innerHeight;

  balls = [
    { el: btnDrawer, x: 30, y: 110, vx: 2.1, vy: 1.6, size: 52, isPaused: false },
    { el: btnTheme, x: Math.max(10, winW - 90), y: 130, vx: -1.8, vy: 2.2, size: 52, isPaused: false },
    { el: btnUpload, x: 50, y: Math.max(10, winH - 180), vx: 2.3, vy: -1.7, size: 52, isPaused: false }
  ].filter(b => b.el !== null);

  balls.forEach(ball => {
    ball.el.addEventListener("mouseenter", () => { ball.isPaused = true; });
    ball.el.addEventListener("mouseleave", () => { ball.isPaused = false; });
    ball.el.addEventListener("touchstart", () => { ball.isPaused = true; }, { passive: true });
    ball.el.addEventListener("touchend", () => { 
      setTimeout(() => { ball.isPaused = false; }, 800); 
    });
  });

  requestAnimationFrame(updatePhysics);
}

function updatePhysics() {
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  balls.forEach(ball => {
    if (!ball.isPaused) {
      ball.x += ball.vx;
      ball.y += ball.vy;

      if (ball.x <= 0) { ball.x = 0; ball.vx *= -1; }
      else if (ball.x + ball.size >= winW) { ball.x = winW - ball.size; ball.vx *= -1; }

      if (ball.y <= 0) { ball.y = 0; ball.vy *= -1; }
      else if (ball.y + ball.size >= winH) { ball.y = winH - ball.size; ball.vy *= -1; }
    }
    ball.el.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0)`;
  });

  requestAnimationFrame(updatePhysics);
}

// Local Personal Upload
function handleLocalFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;

  const startIndex = playlist.length;

  Array.from(files).forEach((file, i) => {
    const fileUrl = URL.createObjectURL(file);
    const cleanTitle = file.name.replace(/\.[^/.]+$/, "");

    localTracks.push({
      id: `local_${Date.now()}_${i}`,
      title: cleanTitle,
      artist: FALLBACK_ARTIST,
      src: fileUrl
    });
  });

  rebuildPlaylist();
  loadTrack(startIndex);
  playTrack();
  closeAllDrawers();
  event.target.value = "";
}

// Event Listeners Binding
function setupListeners() {
  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (nextBtn) nextBtn.addEventListener("click", () => triggerFadeTransition(nextTrack));
  if (prevBtn) prevBtn.addEventListener("click", () => triggerFadeTransition(prevTrack));

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      isShuffle = !isShuffle;
      shuffleBtn.classList.toggle("active", isShuffle);
    });
  }

  if (repeatBtn) {
    repeatBtn.addEventListener("click", () => {
      isRepeat = !isRepeat;
      repeatBtn.classList.toggle("active", isRepeat);
    });
  }

  if (audio) {
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", () => {
      if (isRepeat) {
        audio.currentTime = 0;
        playTrack();
      } else {
        triggerFadeTransition(nextTrack);
      }
    });
  }

  if (seekContainer) seekContainer.addEventListener("click", setProgress);
  if (volumeSlider) volumeSlider.addEventListener("input", handleVolume);

  if (volumeIcon) {
    let prevVol = 1;
    volumeIcon.addEventListener("click", () => {
      if (audio.volume > 0) {
        prevVol = audio.volume;
        audio.volume = 0;
        volumeSlider.value = 0;
      } else {
        audio.volume = prevVol || 1;
        volumeSlider.value = audio.volume;
      }
      updateVolumeIcon(audio.volume);
    });
  }

  if (mainHeartBtn) mainHeartBtn.addEventListener("click", toggleLikeCurrentTrack);
  if (moodToggleBtn) moodToggleBtn.addEventListener("click", cycleMood);
  if (zenToggleBtn) zenToggleBtn.addEventListener("click", toggleZenMode);

  // In-App Refresh Button
  if (appRefreshBtn) {
    appRefreshBtn.addEventListener("click", () => {
      if (refreshIcon) refreshIcon.classList.add("spin-anim");
      fetchSupabaseSongs();
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let registration of registrations) { registration.update(); }
        });
      }
      setTimeout(() => {
        if (refreshIcon) refreshIcon.classList.remove("spin-anim");
        window.location.reload();
      }, 500);
    });
  }

  if (createPlaylistBtn) createPlaylistBtn.addEventListener("click", createNewPlaylist);

  // Wallpapers & Moods
  document.querySelectorAll(".bg-btn:not(#custom-bg-label)").forEach(btn => {
    btn.addEventListener("click", () => applyBackground(parseInt(btn.getAttribute("data-bg"))));
  });

  if (customBgInput) customBgInput.addEventListener("change", handleCustomBgUpload);

  document.querySelectorAll(".mood-btn").forEach(btn => {
    btn.addEventListener("click", () => applyMood(parseInt(btn.getAttribute("data-mood")), true));
  });

  // Search & Filter Tabs
  if (searchInput) searchInput.addEventListener("input", renderPlaylist);
  
  if (tabAllBtn) {
    tabAllBtn.addEventListener("click", () => {
      currentTab = "all";
      activeCustomPlaylistName = null;
      tabAllBtn.classList.add("active");
      if (tabLikedBtn) tabLikedBtn.classList.remove("active");
      renderCustomPlaylists();
      renderPlaylist();
    });
  }

  if (tabLikedBtn) {
    tabLikedBtn.addEventListener("click", () => {
      currentTab = "liked";
      activeCustomPlaylistName = null;
      tabLikedBtn.classList.add("active");
      if (tabAllBtn) tabAllBtn.classList.remove("active");
      renderCustomPlaylists();
      renderPlaylist();
    });
  }

  if (rainSlider) {
    rainSlider.addEventListener("input", (e) => {
      if (!isWebAudioInit) initRainAudio();
      if (rainGainNode) rainGainNode.gain.value = parseFloat(e.target.value);
    });
  }

  // Cloud Upload PIN
  if (mainAudioInput) {
    mainAudioInput.addEventListener("change", (e) => {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const userPin = prompt(`Enter PIN to upload "${file.name}" to Main Playlist:`);
      if (userPin === null) { e.target.value = ""; return; }

      if (userPin.trim() === ADMIN_PIN) {
        handleMainPlaylistUpload(file);
      } else {
        alert("Incorrect PIN! Upload cancelled.");
      }
      e.target.value = "";
    });
  }

  // 3 Bouncing Balls Click Handlers
  const openDrawerBtn = document.getElementById("open-drawer-btn");
  const openThemeBtn = document.getElementById("open-theme-btn");
  const quickUploadBtn = document.getElementById("quick-upload-btn");
  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const closeThemeBtn = document.getElementById("close-theme-btn");

  if (openDrawerBtn) openDrawerBtn.addEventListener("click", (e) => { e.stopPropagation(); openPlaylistDrawer(); });
  if (openThemeBtn) openThemeBtn.addEventListener("click", (e) => { e.stopPropagation(); openThemeDrawer(); });
  if (quickUploadBtn) quickUploadBtn.addEventListener("click", (e) => { e.stopPropagation(); if (audioFileInput) audioFileInput.click(); });

  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeAllDrawers);
  if (closeThemeBtn) closeThemeBtn.addEventListener("click", closeAllDrawers);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeAllDrawers);

  if (audioFileInput) audioFileInput.addEventListener("change", handleLocalFileUpload);
  if (drawerAudioFileInput) drawerAudioFileInput.addEventListener("change", handleLocalFileUpload);

  // Global Zen Trigger (Double Tap / Double Click)
  let lastTouchTime = 0;
  function handleZenTrigger(e) {
    if (
      e.target.closest("button") || e.target.closest("input") || 
      e.target.closest("#seek-container") || e.target.closest(".playlist-drawer") || 
      e.target.closest(".playlist-item") || e.target.closest(".draggable-volume-box")
    ) return;
    toggleZenMode();
  }

  window.addEventListener("dblclick", handleZenTrigger);
  window.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchTime < 320 && now - lastTouchTime > 40) handleZenTrigger(e);
    lastTouchTime = now;
  });

  window.addEventListener("click", (e) => {
    if (isZenMode && !e.target.closest("#zen-toggle-btn")) exitZenMode();
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") { e.preventDefault(); togglePlay(); }
    else if (e.code === "KeyZ") { e.preventDefault(); toggleZenMode(); }
    else if (e.code === "Escape" && isZenMode) { exitZenMode(); }
  });
}

document.addEventListener("DOMContentLoaded", initPlayer);