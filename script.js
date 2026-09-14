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

function getOrCreateDeviceId() {
  let devId = localStorage.getItem("vibe_device_id");
  if (!devId) {
    devId = "dev_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    localStorage.setItem("vibe_device_id", devId);
  }
  return devId;
}
const DEVICE_ID = getOrCreateDeviceId();

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

const allWallpapers = [
  { name: "Retro 1", desktop: "bg1-desktop.png", mobile: "bg1-mobile.png" },
  { name: "Retro 2", desktop: "bg2-desktop.png", mobile: "bg2-mobile.png" },
  { name: "Retro 3", desktop: "bg3-desktop.png", mobile: "bg3-mobile.png" },
  { name: "Retro 4", desktop: "bg4-desktop.png", mobile: "bg4-mobile.png" },
  { name: "Cyber 1", desktop: "cyber-bg1-desktop.png", mobile: "cyber-bg1-mobile.png" },
  { name: "Cyber 2", desktop: "cyber-bg2-desktop.png", mobile: "cyber-bg2-mobile.png" },
  { name: "Cyber 3", desktop: "cyber-bg3-desktop.png", mobile: "cyber-bg3-mobile.png" },
  { name: "Cyber 4", desktop: "cyber-bg4-desktop.png", mobile: "cyber-bg4-mobile.png" },
  { name: "Calm 1", desktop: "calm-bg1-desktop.png", mobile: "calm-bg1-mobile.png" },
  { name: "Calm 2", desktop: "calm-bg2-desktop.png", mobile: "calm-bg2-mobile.png" },
  { name: "Calm 3", desktop: "calm-bg3-desktop.png", mobile: "calm-bg3-mobile.png" },
  { name: "Calm 4", desktop: "calm-bg4-desktop.png", mobile: "calm-bg4-mobile.png" }
];

const moods = [
  { name: "Sunrise", cls: "mood-sunrise", icon: "ri-sun-fill", weather: "none" },
  { name: "Sunset", cls: "mood-sunset", icon: "ri-sun-cloudy-line", weather: "none" },
  { name: "Monsoon", cls: "mood-rainy", icon: "ri-rainy-line", weather: "rain" },
  { name: "Midnight", cls: "mood-night", icon: "ri-moon-clear-line", weather: "stars" }
];

const defaultSkins = [
  { id: "chai", label: "☕ Cutting Chai" },
  { id: "sakura", label: "🌸 Sakura" },
  { id: "lotus", label: "🪷 Lotus" },
  { id: "cassette", label: "📼 Cyber Tape" }
];

// ========================================================
// 2. INDEXEDDB ENGINE
// ========================================================
const IDB_NAME = "VibeMusicDB";
const IDB_VERSION = 1;
const IDB_STORE = "local_tracks";

function openLocalDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveLocalTrackToDB(track) {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      store.put(track);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) { console.warn("IDB save error:", err); }
}

async function getLocalTracksFromDB() {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  } catch (err) { return []; }
}

async function deleteLocalTrackFromDB(id) {
  try {
    const db = await openLocalDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, "readwrite");
      const store = tx.objectStore(IDB_STORE);
      store.delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) { console.warn("IDB delete error:", err); }
}

// State Management
let supabaseTracks = [];
let localTracks = [];
let globallyDeletedBaseTrackIds = [];
let playlist = [...baseTracks];
let currentTrackIndex = 0;
let isShuffle = false;
let isRepeat = false;
let isZenMode = false;
let isFading = false;
let wakeLock = null;

let audioA, audioB;
let activeAudio, standbyAudio;
let nextPreloadedIndex = -1;

// View state
let currentView = "library"; 
let activeLibTab = "songs"; // 'songs', 'liked', 'playlists'

// Default to Light Mode
let currentAestheticMode = localStorage.getItem("vibe_aesthetic_mode") || "light"; 
let currentAccentHue = localStorage.getItem("vibe_accent_hue") || "crimson"; 
let controlsLayout = localStorage.getItem("vibe_controls_layout") || "bouncing"; 
let assistSkin = localStorage.getItem("vibe_assist_skin") || "chai"; 
let customAssistSkins = JSON.parse(localStorage.getItem("vibe_custom_assist_skins") || "[]");

let currentBgIndex = localStorage.getItem("vibe_bg_idx") || "0";
let customBgData = localStorage.getItem("vibe_custom_bg") || null;
let currentMoodIndex = parseInt(localStorage.getItem("vibe_mood_idx") || "1");
let likedTrackIds = JSON.parse(localStorage.getItem("vibe_liked_songs") || "[]");
let trackOverrides = JSON.parse(localStorage.getItem("vibe_track_overrides") || "{}");
let hiddenTrackIds = JSON.parse(localStorage.getItem("vibe_hidden_songs") || "[]");

let audioCtx = null;
let rainGainNode = null;
let isWebAudioInit = false;

// DOM References
let trackTitle, trackArtist, playBtn, playIcon, prevBtn, nextBtn;
let shuffleBtn, repeatBtn, seekContainer, seekProgress, seekThumb;
let currentTimeEl, durationTimeEl, drawerBackdrop, playlistDrawer, themeDrawer;
let playlistScrollList, trackCountBadge, audioFileInput, drawerAudioFileInput;
let mainAudioInput, uploadModal, uploadStatusText;
let mainHeartBtn, mainHeartIcon, mainShareBtn, likedCountBadge;
let moodToggleBtn, moodIcon, moodLabel, zenToggleBtn, arcadeToggleBtn, appRefreshBtn, refreshIcon;
let searchInput, tabAllBtn, tabLikedBtn, rainSlider;
let volumeSlider, volumeIcon, draggableVolume;
let customBgInput, customBgLabel, customBgText;
let playerContainer, controlsSection, collapsePlayerBtn;

// Front Page DOM
let libraryView, librarySongList, librarySearchWrap, librarySearchInput, libSearchToggle, clearSearchBtn;
let libSongsCounter, libShuffleBtn, libTabIndicator;
let miniPlayer, miniProgressFill, miniCoverArt, miniTrackTitle, miniTrackArtist, miniPlayBtn, miniPlayIcon, miniNextBtn, miniQueueBtn;

// Engine Switchers
let modeToggleBtn, modeIcon, modeLabel;
let btnEngineRetro, btnEngineCyber, btnEngineCalm, btnEngineDark, btnEngineLight;
let btnLayoutBouncing, btnLayoutAssist, assistSkinSection, assistChipsRow, btnAddEmojiSkin;

// Leaderboard
let floatingScoreTab, leaderboardBackdrop, leaderboardSidebar;
let sidebarGlobalScore, sidebarGlobalNick, sidebarPersonalScore, sidebarPersonalNick;
let sidebarNickInput, sidebarSaveNickBtn;

// Bouncing & Assist Ball
let btnDrawer, btnTheme, btnUpload;
let balls = [];
let assistBallWrapper, assistBall, assistSkinSlot, assistRadialMenu;
let assistIdleTimer = null;

// Arcade
let isArcadeMode = false;
let arcadeScore = 0;
let arcadeLevel = 1;
let globalHighScore = 0;
let globalHighScoreNickname = "None yet";
let personalHighScore = parseInt(localStorage.getItem("vibe_arcade_personal_hs") || "0");
let arcadeNickname = localStorage.getItem("vibe_arcade_nickname") || null;

const arcadeGravity = 0.09;
let arcadeBalls = [];
let liveScoreHUD, gameMsgOverlay, nicknameModal;

// ========================================================
// INITIALIZATION
// ========================================================
async function initPlayer() {
  audioA = document.getElementById("main-audio");
  audioB = new Audio();
  audioB.preload = "auto";
  activeAudio = audioA;
  standbyAudio = audioB;

  // Full Player DOM
  trackTitle = document.getElementById("track-title");
  trackArtist = document.getElementById("track-artist");
  controlsSection = document.getElementById("controls-section");

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
  collapsePlayerBtn = document.getElementById("collapse-player-btn");

  drawerBackdrop = document.getElementById("drawer-backdrop");
  playlistDrawer = document.getElementById("playlist-drawer");
  themeDrawer = document.getElementById("theme-drawer");
  playlistScrollList = document.getElementById("playlist-scroll-list");
  trackCountBadge = document.getElementById("track-count");
  likedCountBadge = document.getElementById("liked-count");

  mainHeartBtn = document.getElementById("main-heart-btn");
  mainHeartIcon = document.getElementById("main-heart-icon");
  mainShareBtn = document.getElementById("main-share-btn");

  // Front Page DOM
  libraryView = document.getElementById("library-view");
  librarySongList = document.getElementById("library-song-list");
  librarySearchWrap = document.getElementById("library-search-wrap");
  librarySearchInput = document.getElementById("library-search-input");
  libSearchToggle = document.getElementById("lib-search-toggle");
  clearSearchBtn = document.getElementById("clear-search-btn");
  libSongsCounter = document.getElementById("lib-songs-counter");
  libShuffleBtn = document.getElementById("lib-shuffle-btn");
  libTabIndicator = document.getElementById("lib-tab-indicator");

  // Mini-Player DOM
  miniPlayer = document.getElementById("mini-player");
  miniProgressFill = document.getElementById("mini-progress-fill");
  miniCoverArt = document.getElementById("mini-cover-art");
  miniTrackTitle = document.getElementById("mini-track-title");
  miniTrackArtist = document.getElementById("mini-track-artist");
  miniPlayBtn = document.getElementById("mini-play-btn");
  miniPlayIcon = document.getElementById("mini-play-icon");
  miniNextBtn = document.getElementById("mini-next-btn");
  miniQueueBtn = document.getElementById("mini-queue-btn");

  // Engine Switchers (Only inside main player)
  modeToggleBtn = document.getElementById("mode-toggle-btn");
  modeIcon = document.getElementById("mode-icon");
  modeLabel = document.getElementById("mode-label");
  btnEngineRetro = document.getElementById("btn-engine-retro");
  btnEngineCyber = document.getElementById("btn-engine-cyber");
  btnEngineCalm = document.getElementById("btn-engine-calm");
  btnEngineDark = document.getElementById("btn-engine-dark");
  btnEngineLight = document.getElementById("btn-engine-light");

  btnLayoutBouncing = document.getElementById("btn-layout-bouncing");
  btnLayoutAssist = document.getElementById("btn-layout-assist");
  assistSkinSection = document.getElementById("assist-skin-section");
  assistChipsRow = document.getElementById("assist-chips-row");
  btnAddEmojiSkin = document.getElementById("btn-add-emoji-skin");

  moodToggleBtn = document.getElementById("mood-toggle-btn");
  moodIcon = document.getElementById("mood-icon");
  moodLabel = document.getElementById("mood-label");
  zenToggleBtn = document.getElementById("zen-toggle-btn");
  arcadeToggleBtn = document.getElementById("arcade-toggle-btn");
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

  customBgInput = document.getElementById("custom-bg-input");
  customBgLabel = document.getElementById("custom-bg-label");
  customBgText = document.getElementById("custom-bg-text");
  playerContainer = document.getElementById("player-container");

  btnDrawer = document.getElementById("open-drawer-btn");
  btnTheme = document.getElementById("open-theme-btn");
  btnUpload = document.getElementById("quick-upload-btn");

  assistBallWrapper = document.getElementById("assist-ball-wrapper");
  assistBall = document.getElementById("assist-ball");
  assistSkinSlot = document.getElementById("assist-skin-slot");
  assistRadialMenu = document.getElementById("assist-radial-menu");

  floatingScoreTab = document.getElementById("floating-score-tab");
  leaderboardBackdrop = document.getElementById("leaderboard-backdrop");
  leaderboardSidebar = document.getElementById("leaderboard-sidebar");
  sidebarGlobalScore = document.getElementById("sidebar-global-score");
  sidebarGlobalNick = document.getElementById("sidebar-global-nick");
  sidebarPersonalScore = document.getElementById("sidebar-personal-score");
  sidebarPersonalNick = document.getElementById("sidebar-personal-nick");
  sidebarNickInput = document.getElementById("sidebar-nick-input");
  sidebarSaveNickBtn = document.getElementById("sidebar-save-nick-btn");

  // Apply saved setup
  applyAestheticEngine(currentAestheticMode, currentAccentHue);
  applyControlsLayout(controlsLayout);
  renderAssistSkinChips();
  applyAssistSkin(assistSkin);

  if (currentBgIndex === "custom" && customBgData) {
    applyCustomBackground(customBgData);
  } else {
    applyBackground(parseInt(currentBgIndex) || 0);
  }

  applyMood(currentMoodIndex, false);
  updateLikedCount();
  
  // 1. Instantly render initial base tracks (No 0-songs lag!)
  rebuildPlaylist();
  if (playlist.length > 0) {
    currentTrackIndex = Math.floor(Math.random() * playlist.length);
    loadTrack(currentTrackIndex);
  }
  renderLibrarySongs();
  updateMiniPlayerUI();

  // 2. Fetch local storage & Supabase asynchronously without blocking UI
  loadSavedLocalSongs().then(() => {
    rebuildPlaylist();
    renderLibrarySongs();
    updateMiniPlayerUI();
  });

  fetchSupabaseSongs().then(() => {
    rebuildPlaylist();
    renderLibrarySongs();
    updateMiniPlayerUI();
  });

  setupListeners();
  setupMediaSession();
  setupDualAudioListeners(audioA);
  setupDualAudioListeners(audioB);
  setupDraggableVolume();
  setupDraggableTrophy();
  setupBouncingBalls();
  setupAssistBallDraggable();
  initWeatherCanvas();
  initArcadeUI();
  setupSwipeGestures();

  await fetchGlobalHighScore();
  updateLeaderboardUI();
  updateLibTabIndicator();

  attemptAutoplay();
}

// ========================================================
// VIEW CONTROLLER
// ========================================================
function openFullPlayer() {
  currentView = "full";
  document.body.classList.remove("view-library");
  document.body.classList.add("view-full-player");
  if (controlsLayout === "bouncing") {
    requestAnimationFrame(updateNormalPhysics);
  }
}

function collapseToLibrary() {
  currentView = "library";
  document.body.classList.remove("view-full-player");
  document.body.classList.add("view-library");
  renderLibrarySongs();
  updateLibTabIndicator();
}

// ========================================================
// 5-WAY AESTHETIC ENGINE (MODE CHANGING ONLY ON MAIN PAGE)
// ========================================================
function applyAestheticEngine(mode, accent = "gold") {
  currentAestheticMode = mode;
  currentAccentHue = accent;
  localStorage.setItem("vibe_aesthetic_mode", mode);
  localStorage.setItem("vibe_accent_hue", accent);

  document.body.classList.remove(
    "theme-retro", "theme-cyber", "theme-calm", "theme-dark", "theme-light",
    "accent-gold", "accent-lemon", "accent-silver", "accent-crimson",
    "accent-cyan", "accent-magenta", "accent-emerald", "accent-lavender", "accent-sage"
  );
  document.body.classList.add(`theme-${mode}`, `accent-${accent}`);

  const modeLabels = {
    retro: "Retro",
    cyber: "Cyber",
    calm: "Calm",
    dark: "Dark",
    light: "Light"
  };

  const modeIcons = {
    retro: "ri-radio-2-line",
    cyber: "ri-flashlight-line",
    calm: "ri-leaf-line",
    dark: "ri-moon-fill",
    light: "ri-sun-fill"
  };

  if (modeLabel) modeLabel.textContent = modeLabels[mode] || "Light";
  if (modeIcon) modeIcon.className = modeIcons[mode] || "ri-sun-fill";

  if (btnEngineRetro) btnEngineRetro.classList.toggle("active", mode === "retro");
  if (btnEngineCyber) btnEngineCyber.classList.toggle("active", mode === "cyber");
  if (btnEngineCalm) btnEngineCalm.classList.toggle("active", mode === "calm");
  if (btnEngineDark) btnEngineDark.classList.toggle("active", mode === "dark");
  if (btnEngineLight) btnEngineLight.classList.toggle("active", mode === "light");

  document.querySelectorAll(".palette-chip").forEach(chip => {
    chip.classList.toggle("active", chip.getAttribute("data-accent") === accent);
  });
}

function setAestheticEngine(targetMode) {
  currentAestheticMode = targetMode;
  localStorage.setItem("vibe_aesthetic_mode", targetMode);

  if (targetMode === "dark") {
    currentAccentHue = "silver";
    applyBackground(7);
  } else if (targetMode === "light") {
    currentAccentHue = "crimson";
    applyBackground(0);
  } else if (targetMode === "cyber") {
    currentAccentHue = "cyan";
    applyBackground(4);
    applyAssistSkin("cassette");
  } else if (targetMode === "calm") {
    currentAccentHue = "lavender";
    applyBackground(8);
    applyAssistSkin("sakura");
  } else {
    currentAccentHue = "gold";
    applyBackground(0);
    applyAssistSkin("chai");
  }

  applyAestheticEngine(targetMode, currentAccentHue);
  renderLibrarySongs();
}

function toggleAestheticMode() {
  const modesCycle = ["retro", "cyber", "calm", "dark", "light"];
  const currentIdx = modesCycle.indexOf(currentAestheticMode);
  const nextMode = modesCycle[(currentIdx + 1) % modesCycle.length];
  setAestheticEngine(nextMode);
}

// ========================================================
// FRONT PAGE LIBRARY (SONGS, LIKED, PLAYLISTS ONLY)
// ========================================================
function renderLibrarySongs() {
  if (!librarySongList) return;
  librarySongList.innerHTML = "";

  const query = librarySearchInput ? librarySearchInput.value.toLowerCase().trim() : "";

  let targetList = [...playlist];

  if (activeLibTab === "liked") {
    targetList = targetList.filter(t => likedTrackIds.includes(t.id));
  } else if (activeLibTab === "playlists") {
    // Show custom playlists or cloud library tracks
    targetList = targetList.filter(t => t.id.startsWith("sb_") || t.isLocal);
  }

  if (query) {
    targetList = targetList.filter(t => 
      t.title.toLowerCase().includes(query) || (t.artist || "").toLowerCase().includes(query)
    );
  }

  if (libSongsCounter) {
    libSongsCounter.textContent = `${targetList.length} songs`;
  }

  if (targetList.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.style.cssText = "text-align: center; color: var(--lib-subtext); padding: 40px 10px; font-size: 0.95rem; font-weight: 600;";
    emptyMsg.textContent = activeLibTab === "liked" ? "No liked songs yet. Tap heart on any song to add!" : "No songs found.";
    librarySongList.appendChild(emptyMsg);
    return;
  }

  targetList.forEach(track => {
    const originalIndex = playlist.findIndex(t => t.id === track.id);
    const isCurrent = originalIndex === currentTrackIndex;
    const isPlaying = isCurrent && activeAudio && !activeAudio.paused;

    const row = document.createElement("div");
    row.className = `lib-song-row ${isCurrent ? "is-active" : ""} ${isPlaying ? "is-playing" : ""}`;

    const artistName = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;

    row.innerHTML = `
      <div class="lib-song-info">
        <div class="lib-song-title">${track.title}</div>
        <div class="lib-song-artist">${artistName}</div>
      </div>
      <div class="lib-live-wave">
        <div class="lib-live-bar"></div>
        <div class="lib-live-bar"></div>
        <div class="lib-live-bar"></div>
      </div>
    `;

    row.addEventListener("click", () => {
      if (isCurrent) {
        openFullPlayer();
      } else {
        triggerFadeTransition(() => {
          loadTrack(originalIndex);
          playTrack();
        });
      }
    });

    librarySongList.appendChild(row);
  });
}

function updateLibTabIndicator() {
  const activeBtn = document.querySelector(`.lib-tab-btn[data-tab="${activeLibTab}"]`);
  if (activeBtn && libTabIndicator) {
    libTabIndicator.style.left = `${activeBtn.offsetLeft}px`;
    libTabIndicator.style.width = `${activeBtn.offsetWidth}px`;
  }
}

function updateMiniPlayerUI() {
  const currentTrack = playlist[currentTrackIndex];
  if (!currentTrack) return;

  if (miniTrackTitle) miniTrackTitle.textContent = currentTrack.title || "Unknown Track";
  if (miniTrackArtist) {
    miniTrackArtist.textContent = (!currentTrack.artist || currentTrack.artist.trim() === "") ? FALLBACK_ARTIST : currentTrack.artist;
  }

  if (miniPlayIcon && activeAudio) {
    miniPlayIcon.className = activeAudio.paused ? "ri-play-fill" : "ri-pause-fill";
  }

  const activeRow = document.querySelector(".lib-song-row.is-active");
  if (activeRow) {
    activeRow.classList.toggle("is-playing", activeAudio && !activeAudio.paused);
  }
}

// ========================================================
// ASSIST BALL SKINS
// ========================================================
function renderAssistSkinChips() {
  if (!assistChipsRow) return;
  assistChipsRow.innerHTML = "";

  defaultSkins.forEach(skin => {
    const chip = document.createElement("button");
    chip.className = `palette-chip ${assistSkin === skin.id ? "active" : ""}`;
    chip.setAttribute("data-skin", skin.id);
    chip.textContent = skin.label;
    chip.addEventListener("click", () => applyAssistSkin(skin.id));
    assistChipsRow.appendChild(chip);
  });

  customAssistSkins.forEach(custom => {
    const chip = document.createElement("button");
    chip.className = `palette-chip ${assistSkin === custom.id ? "active" : ""}`;
    chip.setAttribute("data-skin", custom.id);
    
    chip.innerHTML = `
      <span>${custom.emoji} Custom</span>
      <span class="chip-del-btn" title="Delete this skin"><i class="ri-close-circle-line"></i></span>
    `;

    chip.addEventListener("click", (e) => {
      if (e.target.closest(".chip-del-btn")) return;
      applyAssistSkin(custom.id);
    });

    const delBtn = chip.querySelector(".chip-del-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteCustomEmojiSkin(custom.id);
    });

    assistChipsRow.appendChild(chip);
  });
}

function addNewEmojiSkin() {
  const userInput = prompt("Enter a single emoji from your keyboard (e.g. 🎧, ⚡, 🪐, 🍕, 🦋, 🔥):");
  if (!userInput) return;

  const emojiArray = Array.from(userInput.trim());
  if (emojiArray.length === 0) return;
  const pickedEmoji = emojiArray[0];

  const newSkinId = `emoji_${Date.now()}`;
  customAssistSkins.push({ id: newSkinId, emoji: pickedEmoji });
  localStorage.setItem("vibe_custom_assist_skins", JSON.stringify(customAssistSkins));
  applyAssistSkin(newSkinId);
  renderAssistSkinChips();
}

function deleteCustomEmojiSkin(skinId) {
  if (!confirm("Delete this custom emoji skin?")) return;
  customAssistSkins = customAssistSkins.filter(s => s.id !== skinId);
  localStorage.setItem("vibe_custom_assist_skins", JSON.stringify(customAssistSkins));
  if (assistSkin === skinId) applyAssistSkin("chai");
  renderAssistSkinChips();
}

function applyControlsLayout(layout) {
  controlsLayout = layout;
  localStorage.setItem("vibe_controls_layout", layout);

  if (btnLayoutBouncing) btnLayoutBouncing.classList.toggle("active", layout === "bouncing");
  if (btnLayoutAssist) btnLayoutAssist.classList.toggle("active", layout === "assist");
  if (assistSkinSection) assistSkinSection.style.display = layout === "assist" ? "flex" : "none";

  if (isArcadeMode) return;

  if (layout === "assist") {
    [btnDrawer, btnTheme, btnUpload].forEach(b => { if (b) b.style.display = "none"; });
    if (assistBallWrapper) {
      assistBallWrapper.style.display = "block";
      resetAssistIdleTimer();
    }
  } else {
    [btnDrawer, btnTheme, btnUpload].forEach(b => { if (b) b.style.display = "grid"; });
    balls.forEach(b => { b.isPaused = false; });
    if (assistBallWrapper) assistBallWrapper.style.display = "none";
    if (assistRadialMenu) assistRadialMenu.classList.remove("active");
    requestAnimationFrame(updateNormalPhysics);
  }
}

function applyAssistSkin(skin) {
  assistSkin = skin;
  localStorage.setItem("vibe_assist_skin", skin);

  if (!assistBall || !assistSkinSlot) return;
  assistBall.className = `assist-ball skin-${skin}`;

  const customMatch = customAssistSkins.find(s => s.id === skin);

  if (customMatch) {
    assistSkinSlot.innerHTML = `<div class="assist-custom-emoji">${customMatch.emoji}</div>`;
  } else if (skin === "chai") {
    assistSkinSlot.innerHTML = `
      <svg viewBox="0 0 100 100" class="assist-svg-icon">
        <defs>
          <linearGradient id="teaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff9f43"/>
            <stop offset="100%" stop-color="#b33939"/>
          </linearGradient>
        </defs>
        <path class="chai-steam-path" d="M42 24 Q38 18 44 12" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path class="chai-steam-path" d="M56 22 Q52 16 58 10" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <polygon points="30,34 70,34 62,86 38,86" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" stroke-linejoin="round"/>
        <line x1="44" y1="36" x2="44" y2="84" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <line x1="56" y1="36" x2="56" y2="84" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>
        <polygon points="33,48 67,48 61,84 39,84" fill="url(#teaGrad)"/>
      </svg>
    `;
  } else if (skin === "sakura") {
    assistSkinSlot.innerHTML = `
      <svg viewBox="0 0 100 100" class="assist-svg-icon sakura-svg">
        <defs>
          <linearGradient id="sakuraPetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#fbcfe8"/>
            <stop offset="100%" stop-color="#f472b6"/>
          </linearGradient>
        </defs>
        <g class="sakura-flower-group" style="transform-origin: 50px 50px;">
          <g fill="url(#sakuraPetal)" stroke="rgba(244,114,182,0.4)" stroke-width="1">
            <path d="M50 50 C40 32, 34 16, 46 12 C49 14, 50 16, 51 14 C63 16, 58 32, 50 50 Z"/>
            <path d="M50 50 C68 40, 84 36, 86 48 C84 51, 82 52, 84 53 C82 65, 68 58, 50 50 Z"/>
            <path d="M50 50 C62 66, 72 82, 60 88 C57 86, 56 84, 54 86 C44 82, 46 66, 50 50 Z"/>
            <path d="M50 50 C38 66, 26 80, 18 70 C20 67, 22 66, 20 64 C18 52, 34 46, 50 50 Z"/>
            <path d="M50 50 C32 40, 16 32, 20 20 C23 21, 25 22, 25 20 C36 18, 42 34, 50 50 Z"/>
          </g>
          <circle cx="50" cy="50" r="3.2" fill="#ec4899"/>
        </g>
      </svg>
    `;
  } else if (skin === "lotus") {
    assistSkinSlot.innerHTML = `
      <svg viewBox="0 0 100 100" class="assist-svg-icon lotus-emoji-svg">
        <defs>
          <linearGradient id="lotusOuterPetal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#db2777"/>
            <stop offset="60%" stop-color="#f472b6"/>
            <stop offset="100%" stop-color="#ffffff"/>
          </linearGradient>
          <linearGradient id="lotusCenterPetal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#e11d48"/>
            <stop offset="60%" stop-color="#fb7185"/>
            <stop offset="100%" stop-color="#ffffff"/>
          </linearGradient>
        </defs>
        <g class="lotus-flower-group" style="transform-origin: 50px 65px;">
          <ellipse cx="50" cy="74" rx="22" ry="6" fill="#16a34a" opacity="0.9"/>
          <path d="M50 72 C22 72, 12 56, 18 44 C26 34, 42 54, 50 72 Z" fill="url(#lotusOuterPetal)"/>
          <path d="M50 72 C78 72, 88 56, 82 44 C74 34, 58 54, 50 72 Z" fill="url(#lotusOuterPetal)"/>
          <path d="M50 72 C30 68, 24 46, 34 34 C42 26, 48 54, 50 72 Z" fill="url(#lotusOuterPetal)"/>
          <path d="M50 72 C70 68, 76 46, 66 34 C58 26, 52 54, 50 72 Z" fill="url(#lotusOuterPetal)"/>
          <path d="M50 72 C40 54, 38 28, 50 18 C62 28, 60 54, 50 72 Z" fill="url(#lotusCenterPetal)"/>
          <circle cx="50" cy="52" r="3" fill="#fde047"/>
        </g>
      </svg>
    `;
  } else if (skin === "cassette") {
    assistSkinSlot.innerHTML = `
      <svg viewBox="0 0 100 100" class="assist-svg-icon cassette-svg">
        <defs>
          <linearGradient id="cyberNeonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#00f2fe"/>
            <stop offset="100%" stop-color="#ff007f"/>
          </linearGradient>
        </defs>
        <rect x="14" y="24" width="72" height="52" rx="7" fill="rgba(8, 14, 24, 0.88)" stroke="url(#cyberNeonBorder)" stroke-width="2.2"/>
        <rect x="22" y="32" width="56" height="26" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(0, 242, 254, 0.4)" stroke-width="1.2"/>
        <g class="cassette-spool cassette-spool-left" style="transform-origin: 36px 45px;">
          <circle cx="36" cy="45" r="9" fill="#030712" stroke="#00f2fe" stroke-width="1.8"/>
          <circle cx="36" cy="45" r="4" fill="#ffffff"/>
        </g>
        <g class="cassette-spool cassette-spool-right" style="transform-origin: 64px 45px;">
          <circle cx="64" cy="45" r="9" fill="#030712" stroke="#ff007f" stroke-width="1.8"/>
          <circle cx="64" cy="45" r="4" fill="#ffffff"/>
        </g>
      </svg>
    `;
  }

  if (activeAudio) {
    assistBall.classList.toggle("is-playing", !activeAudio.paused);
  }

  document.querySelectorAll("#assist-chips-row .palette-chip").forEach(chip => {
    chip.classList.toggle("active", chip.getAttribute("data-skin") === skin);
  });
}

// Assist Ball Snapping & Docking
function resetAssistIdleTimer() {
  if (!assistBallWrapper) return;
  clearTimeout(assistIdleTimer);
  assistBallWrapper.classList.remove("docked-left", "docked-right");

  assistIdleTimer = setTimeout(() => {
    if (!assistRadialMenu.classList.contains("active") && controlsLayout === "assist") {
      const isLeft = (parseFloat(assistBallWrapper.dataset.x) || 0) < window.innerWidth / 2;
      assistBallWrapper.classList.add(isLeft ? "docked-left" : "docked-right");
    }
  }, 2500);
}

function setupAssistBallDraggable() {
  if (!assistBall || !assistBallWrapper) return;

  let curX = Math.max(10, window.innerWidth - 62);
  let curY = Math.max(80, window.innerHeight * 0.45);
  let startPointerX = 0, startPointerY = 0;
  let initialX = 0, initialY = 0;
  let isPointerDown = false;
  let isDraggingMoved = false;

  assistBallWrapper.dataset.x = curX;
  assistBallWrapper.style.setProperty("--assist-y", `${curY}px`);
  assistBallWrapper.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
  resetAssistIdleTimer();

  function onPointerDown(e) {
    if (e.target.closest(".assist-action-btn")) return;
    clearTimeout(assistIdleTimer);
    assistBallWrapper.classList.remove("docked-left", "docked-right");

    isPointerDown = true;
    isDraggingMoved = false;
    startPointerX = e.clientX;
    startPointerY = e.clientY;
    initialX = curX;
    initialY = curY;

    try { assistBall.setPointerCapture(e.pointerId); } catch (err) {}
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;
    const diffX = e.clientX - startPointerX;
    const diffY = e.clientY - startPointerY;

    if (Math.hypot(diffX, diffY) > 6) {
      isDraggingMoved = true;
      assistRadialMenu.classList.remove("active");
    }

    curX = Math.max(4, Math.min(initialX + diffX, window.innerWidth - 56));
    curY = Math.max(15, Math.min(initialY + diffY, window.innerHeight - 65));

    assistBallWrapper.dataset.x = curX;
    assistBallWrapper.style.setProperty("--assist-y", `${curY}px`);
    assistBallWrapper.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
  }

  function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;
    try { assistBall.releasePointerCapture(e.pointerId); } catch (err) {}

    if (!isDraggingMoved) {
      const isActive = assistRadialMenu.classList.toggle("active");
      if (isActive) {
        clearTimeout(assistIdleTimer);
        assistBallWrapper.classList.remove("docked-left", "docked-right");

        if (curX > window.innerWidth / 2) {
          assistRadialMenu.style.left = "auto";
          assistRadialMenu.style.right = "64px";
        } else {
          assistRadialMenu.style.left = "64px";
          assistRadialMenu.style.right = "auto";
        }
      } else {
        resetAssistIdleTimer();
      }
    } else {
      const snapToRight = curX > window.innerWidth / 2;
      curX = snapToRight ? window.innerWidth - 60 : 8;
      assistBallWrapper.dataset.x = curX;
      assistBallWrapper.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
      resetAssistIdleTimer();
    }
  }

  assistBall.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);

  assistBallWrapper.addEventListener("mouseenter", () => {
    clearTimeout(assistIdleTimer);
    assistBallWrapper.classList.remove("docked-left", "docked-right");
  });
  assistBallWrapper.addEventListener("mouseleave", resetAssistIdleTimer);

  document.getElementById("assist-btn-songs")?.addEventListener("click", () => {
    assistRadialMenu.classList.remove("active");
    openPlaylistDrawer();
  });
  document.getElementById("assist-btn-theme")?.addEventListener("click", () => {
    assistRadialMenu.classList.remove("active");
    openThemeDrawer();
  });
  document.getElementById("assist-btn-upload")?.addEventListener("click", () => {
    assistRadialMenu.classList.remove("active");
    if (audioFileInput) audioFileInput.click();
  });
  document.getElementById("assist-btn-switch-layout")?.addEventListener("click", () => {
    assistRadialMenu.classList.remove("active");
    applyControlsLayout("bouncing");
  });
}

// Freely Movable Trophy
function setupDraggableTrophy() {
  if (!floatingScoreTab) return;

  let curX = Math.max(10, window.innerWidth - 54);
  let curY = Math.max(70, window.innerHeight * 0.12);
  let startPointerX = 0, startPointerY = 0;
  let initialX = 0, initialY = 0;
  let isDown = false;
  let isMoved = false;

  floatingScoreTab.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;

  function onPointerDown(e) {
    isDown = true;
    isMoved = false;
    startPointerX = e.clientX;
    startPointerY = e.clientY;
    initialX = curX;
    initialY = curY;
    try { floatingScoreTab.setPointerCapture(e.pointerId); } catch (err) {}
  }

  function onPointerMove(e) {
    if (!isDown) return;
    const diffX = e.clientX - startPointerX;
    const diffY = e.clientY - startPointerY;
    if (Math.hypot(diffX, diffY) > 5) isMoved = true;
    curX = Math.max(6, Math.min(initialX + diffX, window.innerWidth - 50));
    curY = Math.max(15, Math.min(initialY + diffY, window.innerHeight - 50));
    floatingScoreTab.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
  }

  function onPointerUp(e) {
    if (!isDown) return;
    isDown = false;
    try { floatingScoreTab.releasePointerCapture(e.pointerId); } catch (err) {}

    if (!isMoved) {
      fetchGlobalHighScore().then(() => {
        updateLeaderboardUI();
        leaderboardSidebar.classList.add("active");
        leaderboardBackdrop.classList.add("active");
      });
    }
  }

  floatingScoreTab.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
}

// Supabase Sync
async function fetchSupabaseSongs() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('songs').select('*').order('created_at', { ascending: true });
    if (!error && data) {
      supabaseTracks = data.map(item => ({
        id: `sb_${item.id}`,
        title: item.title,
        artist: item.artist || FALLBACK_ARTIST,
        src: item.src
      }));
    }
    const { data: delBaseData } = await supabaseClient.from('deleted_base_tracks').select('track_id');
    if (delBaseData) {
      globallyDeletedBaseTrackIds = delBaseData.map(d => d.track_id);
    }
  } catch (err) { console.warn(err); }
}

function rebuildPlaylist() {
  const activeBaseTracks = baseTracks.filter(t => !globallyDeletedBaseTrackIds.includes(t.id));

  playlist = [...activeBaseTracks, ...supabaseTracks, ...localTracks]
    .filter(track => !hiddenTrackIds.includes(track.id))
    .map(track => {
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
  if (!supabaseClient) { alert("Supabase is not connected!"); return; }
  showUploadModal("Uploading to Main Playlist...");
  try {
    const cleanTitle = file.name.replace(/\.[^/.]+$/, "");
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: storageError } = await supabaseClient.storage.from('music-tracks').upload(fileName, file, { cacheControl: '3600', upsert: false });
    if (storageError) throw storageError;

    const { data: urlData } = supabaseClient.storage.from('music-tracks').getPublicUrl(fileName);
    const { error: dbError } = await supabaseClient.from('songs').insert([{ title: cleanTitle, artist: FALLBACK_ARTIST, src: urlData.publicUrl }]);
    if (dbError) throw dbError;

    hideUploadModal();
    alert("Track added to Main Playlist!");
    await fetchSupabaseSongs();
    rebuildPlaylist();
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

// Audio Engine
async function requestWakeLock() {
  if ('wakeLock' in navigator) {
    try {
      if (!wakeLock) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakeLock.addEventListener('release', () => { wakeLock = null; });
      }
    } catch (err) {}
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && activeAudio && !activeAudio.paused) {
    requestWakeLock();
  }
});

function getNextTrackIndex() {
  let activePool = playlist;
  if (currentTab === "liked" || activeLibTab === "liked") {
    activePool = playlist.filter(t => likedTrackIds.includes(t.id));
  }
  if (activePool.length === 0) activePool = playlist;
  if (isRepeat) return currentTrackIndex;

  if (isShuffle) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * activePool.length);
    } while (randomIndex === currentTrackIndex && activePool.length > 1);
    return playlist.findIndex(t => t.id === activePool[randomIndex].id);
  } else {
    const currentInPoolIdx = activePool.findIndex(t => t.id === playlist[currentTrackIndex].id);
    const nextInPoolIdx = (currentInPoolIdx + 1) % activePool.length;
    return playlist.findIndex(t => t.id === activePool[nextInPoolIdx].id);
  }
}

function preloadStandbyTrack() {
  if (playlist.length === 0) return;
  nextPreloadedIndex = getNextTrackIndex();
  const nextTrack = playlist[nextPreloadedIndex];
  if (nextTrack) {
    standbyAudio.src = nextTrack.src;
    standbyAudio.currentTime = 0;
    standbyAudio.preload = "auto";
  }
}

function loadTrack(index) {
  if (playlist.length === 0) return;
  currentTrackIndex = index;
  const track = playlist[currentTrackIndex];

  if (trackTitle) trackTitle.textContent = track.title || "Unknown Track";
  if (trackArtist) {
    trackArtist.textContent = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;
  }

  activeAudio.src = track.src;
  activeAudio.currentTime = 0;

  updateHeartButton();
  updateMediaSessionMetadata(track);
  updateMiniPlayerUI();
  preloadStandbyTrack();
  renderLibrarySongs();
}

function playTrack() {
  if (!activeAudio || playlist.length === 0) return;
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  requestWakeLock();

  const playPromise = activeAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMediaSessionMetadata(playlist[currentTrackIndex]);
      preloadStandbyTrack();
      if (assistBall) assistBall.classList.add("is-playing");
      updateMiniPlayerUI();
    }).catch(err => console.warn(err));
  }
}

function attemptAutoplay() {
  if (!activeAudio || playlist.length === 0) return;
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  requestWakeLock();

  const playPromise = activeAudio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      updateMediaSessionMetadata(playlist[currentTrackIndex]);
      preloadStandbyTrack();
      if (assistBall) assistBall.classList.add("is-playing");
      updateMiniPlayerUI();
    }).catch(() => {
      const unlockAutoplay = () => {
        playTrack();
        window.removeEventListener("click", unlockAutoplay);
        window.removeEventListener("touchstart", unlockAutoplay);
      };
      window.addEventListener("click", unlockAutoplay, { once: true });
      window.addEventListener("touchstart", unlockAutoplay, { once: true });
    });
  }
}

function pauseTrack() {
  if (!activeAudio) return;
  activeAudio.pause();
  if (assistBall) assistBall.classList.remove("is-playing");
  updateMiniPlayerUI();
}

function togglePlay() {
  if (playlist.length === 0 || !activeAudio) return;
  if (activeAudio.paused) playTrack();
  else pauseTrack();
}

function nextTrack() {
  standbyAudio.pause();
  triggerFadeTransition(() => {
    const nextIdx = (nextPreloadedIndex !== -1 && !isShuffle) ? nextPreloadedIndex : getNextTrackIndex();
    loadTrack(nextIdx);
    playTrack();
  });
}

function prevTrack() {
  if (activeAudio && activeAudio.currentTime > 3) {
    activeAudio.currentTime = 0;
    return;
  }
  standbyAudio.pause();
  triggerFadeTransition(() => {
    let activePool = playlist;
    if (currentTab === "liked" || activeLibTab === "liked") activePool = playlist.filter(t => likedTrackIds.includes(t.id));
    if (activePool.length === 0) activePool = playlist;

    const currentInPoolIdx = activePool.findIndex(t => t.id === playlist[currentTrackIndex].id);
    const prevInPoolIdx = (currentInPoolIdx - 1 + activePool.length) % activePool.length;
    loadTrack(playlist.findIndex(t => t.id === activePool[prevInPoolIdx].id));
    playTrack();
  });
}

function triggerFadeTransition(actionCallback) {
  if (!activeAudio || activeAudio.paused || isFading || document.visibilityState === 'hidden') {
    actionCallback();
    return;
  }
  isFading = true;
  const targetVol = parseFloat(volumeSlider ? volumeSlider.value : 1);
  let currentVol = activeAudio.volume;
  const interval = 25;
  const step = currentVol / (220 / interval);

  const fadeOutTimer = setInterval(() => {
    currentVol = Math.max(0, currentVol - step);
    activeAudio.volume = currentVol;
    if (currentVol <= 0.05) {
      clearInterval(fadeOutTimer);
      activeAudio.volume = 0;
      actionCallback();

      let inVol = 0;
      const stepIn = targetVol / (220 / interval);
      const fadeInTimer = setInterval(() => {
        inVol = Math.min(targetVol, inVol + stepIn);
        activeAudio.volume = inVol;
        if (inVol >= targetVol) {
          clearInterval(fadeInTimer);
          activeAudio.volume = targetVol;
          isFading = false;
        }
      }, interval);
    }
  }, interval);
}

function setupDualAudioListeners(audioNode) {
  audioNode.addEventListener("timeupdate", (e) => {
    if (e.target !== activeAudio) return;
    const { duration, currentTime } = activeAudio;
    if (isNaN(duration) || duration === 0) return;

    const percent = (currentTime / duration) * 100;
    if (seekProgress) seekProgress.style.width = `${percent}%`;
    if (seekThumb) seekThumb.style.left = `${percent}%`;
    if (miniProgressFill) miniProgressFill.style.width = `${percent}%`;

    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime);
    if (durationTimeEl) durationTimeEl.textContent = formatTime(duration);
  });

  audioNode.addEventListener("play", (e) => {
    if (e.target !== activeAudio) return;
    if (playIcon) playIcon.className = "ri-pause-fill";
    if (assistBall) assistBall.classList.add("is-playing");
    updateMiniPlayerUI();
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing";
  });

  audioNode.addEventListener("pause", (e) => {
    if (e.target !== activeAudio) return;
    if (playIcon) playIcon.className = "ri-play-fill";
    if (assistBall) assistBall.classList.remove("is-playing");
    updateMiniPlayerUI();
    if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "paused";
  });

  audioNode.addEventListener("ended", (e) => {
    if (e.target !== activeAudio) return;
    const temp = activeAudio;
    activeAudio = standbyAudio;
    standbyAudio = temp;

    currentTrackIndex = nextPreloadedIndex !== -1 ? nextPreloadedIndex : getNextTrackIndex();
    const track = playlist[currentTrackIndex];

    if (trackTitle) trackTitle.textContent = track.title || "Unknown Track";
    if (trackArtist) {
      trackArtist.textContent = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;
    }

    updateHeartButton();
    updateMediaSessionMetadata(track);
    updateMiniPlayerUI();
    playTrack();
    preloadStandbyTrack();
  });
}

function setProgress(e) {
  if (!seekContainer || !activeAudio) return;
  const rect = seekContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const duration = activeAudio.duration;
  if (duration) activeAudio.currentTime = (clickX / rect.width) * duration;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function handleVolume(e) {
  const val = parseFloat(e.target.value);
  audioA.volume = val;
  audioB.volume = val;
  updateVolumeIcon(val);
}

function updateVolumeIcon(val) {
  if (!volumeIcon) return;
  if (val === 0) volumeIcon.className = "ri-volume-mute-line";
  else if (val < 0.5) volumeIcon.className = "ri-volume-down-line";
  else volumeIcon.className = "ri-volume-up-line";
}

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
  if (idx > -1) likedTrackIds.splice(idx, 1);
  else likedTrackIds.push(currentTrack.id);

  localStorage.setItem("vibe_liked_songs", JSON.stringify(likedTrackIds));
  updateHeartButton();
  updateLikedCount();
  renderPlaylist();
  renderLibrarySongs();
}

async function shareCurrentTrack() {
  const currentTrack = playlist[currentTrackIndex];
  if (!currentTrack) return;

  const trackName = currentTrack.title || "Vibe Track";
  const artistName = (!currentTrack.artist || currentTrack.artist.trim() === "") ? FALLBACK_ARTIST : currentTrack.artist;
  const appUrl = window.location.origin + window.location.pathname;
  const shareText = `🎧 Now listening to: "${trackName}" by ${artistName} on Vibe Music Player ✨\nTune in here:`;

  if (navigator.share) {
    try {
      await navigator.share({ title: `${trackName} - Vibe Player`, text: shareText, url: appUrl });
    } catch (err) {
      if (err.name !== 'AbortError') copyShareFallback(shareText, appUrl);
    }
  } else {
    copyShareFallback(shareText, appUrl);
  }
}

function copyShareFallback(text, url) {
  const fullMsg = `${text} ${url}`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullMsg).then(() => {
      alert("Link copied! Share it on WhatsApp, Instagram, or Snapchat.");
    }).catch(() => { prompt("Copy link to share:", fullMsg); });
  } else {
    prompt("Copy link to share:", fullMsg);
  }
}

function updateLikedCount() {
  if (likedCountBadge) likedCountBadge.textContent = likedTrackIds.length;
}
function updateTrackCount() {
  if (trackCountBadge) trackCountBadge.textContent = playlist.length;
}

// Edit & Delete
async function editTrackInfo(trackId) {
  const track = playlist.find(t => t.id === trackId);
  if (!track) return;
  const currentTitle = track.title || "";
  const currentArtist = (!track.artist || track.artist === FALLBACK_ARTIST) ? "" : track.artist;

  let isGlobalAdminEdit = false;
  if (trackId.startsWith("sb_")) {
    const editChoice = confirm(`Update "${currentTitle}" globally for all users?\n\n• OK = Global (Admin PIN)\n• Cancel = Local`);
    if (editChoice) {
      const pin = prompt("Enter Admin PIN:");
      if (pin === null) return;
      if (pin.trim() === ADMIN_PIN) isGlobalAdminEdit = true;
      else alert("Incorrect PIN! Personal mode selected.");
    }
  }

  const newTitle = prompt("Edit Track Title:", currentTitle);
  if (newTitle === null) return;
  const newArtist = prompt("Edit Artist Name:", currentArtist);
  if (newArtist === null) return;

  const finalTitle = newTitle.trim() || currentTitle;
  const finalArtist = newArtist.trim() || FALLBACK_ARTIST;

  if (isGlobalAdminEdit && supabaseClient) {
    showUploadModal("Updating track info...");
    try {
      const dbId = trackId.replace("sb_", "");
      const { error } = await supabaseClient.from('songs').update({ title: finalTitle, artist: finalArtist }).eq('id', dbId);
      if (error) throw error;
      delete trackOverrides[trackId];
      localStorage.setItem("vibe_track_overrides", JSON.stringify(trackOverrides));
      await fetchSupabaseSongs();
      hideUploadModal();
      alert("Updated globally!");
    } catch (err) {
      hideUploadModal();
      alert("Update failed: " + err.message);
    }
  } else {
    trackOverrides[trackId] = { title: finalTitle, artist: finalArtist };
    localStorage.setItem("vibe_track_overrides", JSON.stringify(trackOverrides));
    rebuildPlaylist();
  }

  if (playlist[currentTrackIndex] && playlist[currentTrackIndex].id === trackId) {
    if (trackTitle) trackTitle.textContent = finalTitle;
    if (trackArtist) trackArtist.textContent = finalArtist;
    updateMediaSessionMetadata(playlist[currentTrackIndex]);
  }
}

async function deleteTrack(trackId) {
  const track = playlist.find(t => t.id === trackId);
  if (!track) return;

  let deleteForEveryone = false;
  if (trackId.startsWith("sb_") || trackId.startsWith("s")) {
    const deleteChoice = confirm(`Delete "${track.title}" globally?\n\n• OK = Delete for Everyone (Admin PIN)\n• Cancel = Remove for you`);
    if (deleteChoice) {
      const pin = prompt("Enter Admin PIN:");
      if (pin === null) return;
      if (pin.trim() === ADMIN_PIN) deleteForEveryone = true;
      else alert("Incorrect PIN! Removing locally.");
    }
  } else {
    if (!confirm(`Remove "${track.title}" from your player?`)) return;
  }

  const wasPlaying = playlist[currentTrackIndex] && playlist[currentTrackIndex].id === trackId;

  if (deleteForEveryone && supabaseClient) {
    showUploadModal("Deleting track globally...");
    try {
      if (trackId.startsWith("sb_")) {
        await supabaseClient.from('songs').delete().eq('id', trackId.replace("sb_", ""));
      } else {
        await supabaseClient.from('deleted_base_tracks').upsert([{ track_id: trackId }]);
      }
      await fetchSupabaseSongs();
      hideUploadModal();
      alert("Deleted globally!");
    } catch (err) {
      hideUploadModal();
      alert("Deletion failed: " + err.message);
      return;
    }
  } else if (track.isLocal) {
    await deleteLocalTrackFromDB(trackId);
    localTracks = localTracks.filter(t => t.id !== trackId);
  } else {
    if (!hiddenTrackIds.includes(trackId)) {
      hiddenTrackIds.push(trackId);
      localStorage.setItem("vibe_hidden_songs", JSON.stringify(hiddenTrackIds));
    }
  }

  rebuildPlaylist();
  if (wasPlaying && playlist.length > 0) {
    currentTrackIndex = currentTrackIndex % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }
}

function setupMediaSession() {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", playTrack);
    navigator.mediaSession.setActionHandler("pause", pauseTrack);
    navigator.mediaSession.setActionHandler("previoustrack", prevTrack);
    navigator.mediaSession.setActionHandler("nexttrack", nextTrack);
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

// Local File Upload
async function handleLocalFileUpload(event) {
  const files = event.target.files;
  if (!files || files.length === 0) return;
  showUploadModal("Saving tracks permanently to device...");

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const cleanTitle = file.name.replace(/\.[^/.]+$/, "");
    const songId = `local_${Date.now()}_${i}`;
    await saveLocalTrackToDB({ id: songId, title: cleanTitle, artist: FALLBACK_ARTIST, blob: file });
    localTracks.push({
      id: songId,
      title: cleanTitle,
      artist: FALLBACK_ARTIST,
      src: URL.createObjectURL(file),
      isLocal: true
    });
  }
  hideUploadModal();
  rebuildPlaylist();
  loadTrack(playlist.length - 1);
  playTrack();
  closeAllDrawers();
  event.target.value = "";
}

// UI Controls
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

function applyMood(index, userExplicitChoice = true) {
  if (index < 0 || index >= moods.length) index = 0;
  moods.forEach(m => document.body.classList.remove(m.cls));
  currentMoodIndex = index;
  localStorage.setItem("vibe_mood_idx", currentMoodIndex);

  const mood = moods[currentMoodIndex];
  document.body.classList.add(mood.cls);
  if (moodLabel) moodLabel.textContent = mood.name;
  if (moodIcon) moodIcon.className = mood.icon;

  document.querySelectorAll(".mood-btn").forEach((btn, i) => {
    btn.classList.toggle("active", i === currentMoodIndex);
  });

  if (userExplicitChoice && mood.weather === "rain" && rainSlider) {
    if (!isWebAudioInit) initRainAudio();
    if (rainSlider.value == 0) {
      rainSlider.value = 0.4;
      if (rainGainNode) rainGainNode.gain.value = 0.4;
    }
  }
}

function cycleMood() {
  const nextIdx = (currentMoodIndex + 1) % moods.length;
  applyMood(nextIdx, true);
}

function applyBackground(index) {
  if (index < 0 || index >= allWallpapers.length) index = 0;
  currentBgIndex = String(index);
  localStorage.setItem("vibe_bg_idx", currentBgIndex);

  const bg = allWallpapers[index];
  document.documentElement.style.setProperty('--bg-desktop', `url('${bg.desktop}')`);
  document.documentElement.style.setProperty('--bg-mobile', `url('${bg.mobile}')`);

  document.querySelectorAll(".bg-btn:not(#custom-bg-label)").forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
  if (customBgLabel) customBgLabel.classList.remove("active");
}

function applyCustomBackground(dataUrl) {
  currentBgIndex = "custom";
  customBgData = dataUrl;
  localStorage.setItem("vibe_bg_idx", "custom");
  try { localStorage.setItem("vibe_custom_bg", dataUrl); } catch (err) {}

  document.documentElement.style.setProperty('--bg-desktop', `url('${dataUrl}')`);
  document.documentElement.style.setProperty('--bg-mobile', `url('${dataUrl}')`);
  document.querySelectorAll(".bg-btn:not(#custom-bg-label)").forEach(btn => btn.classList.remove("active"));
  if (customBgLabel) customBgLabel.classList.add("active");
}

function handleCustomBgUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => applyCustomBackground(event.target.result);
  reader.readAsDataURL(file);
}

function setupSwipeGestures() {
  let touchStartX = 0, touchStartY = 0;
  window.addEventListener("touchstart", (e) => { 
    touchStartX = e.touches[0].clientX; 
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    if (isArcadeMode || e.target.closest("#volume-slider") || e.target.closest("#seek-container") || e.target.closest(".playlist-drawer") || e.target.closest(".assist-ball-wrapper") || e.target.closest(".floating-score-tab")) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;

    if (currentView === "full" && diffY > 90 && Math.abs(diffX) < 60) {
      collapseToLibrary();
      return;
    }
    if (currentView === "full" && Math.abs(diffX) > 60) {
      if (diffX < 0) nextTrack();
      else prevTrack();
    }
  });
}

function renderPlaylist() {
  if (!playlistScrollList) return;
  playlistScrollList.innerHTML = "";
  const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
  let targetTracks = playlist;
  if (currentTab === "liked") targetTracks = playlist.filter(t => likedTrackIds.includes(t.id));

  targetTracks.forEach((track) => {
    const originalIndex = playlist.findIndex(t => t.id === track.id);
    if (originalIndex === -1) return;
    if (query && !track.title.toLowerCase().includes(query) && !(track.artist || "").toLowerCase().includes(query)) return;

    const isLiked = likedTrackIds.includes(track.id);
    const displayArtist = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;

    const item = document.createElement("div");
    item.className = `playlist-item ${originalIndex === currentTrackIndex ? "active" : ""}`;
    item.innerHTML = `
      <div class="playlist-item-info">
        <div class="item-title">${track.title}</div>
        <div class="item-artist">${displayArtist}</div>
      </div>
      <div class="item-actions">
        <button class="item-edit-btn" title="Edit Info"><i class="ri-edit-line"></i></button>
        <button class="item-delete-btn" title="Remove Track"><i class="ri-delete-bin-line"></i></button>
        <button class="item-heart-btn ${isLiked ? "liked" : ""}">
          <i class="${isLiked ? "ri-heart-fill" : "ri-heart-line"}"></i>
        </button>
        <i class="ri-volume-up-fill item-indicator"></i>
      </div>
    `;

    item.addEventListener("click", (e) => {
      if (e.target.closest(".item-heart-btn") || e.target.closest(".item-edit-btn") || e.target.closest(".item-delete-btn")) return;
      triggerFadeTransition(() => {
        loadTrack(originalIndex);
        playTrack();
      });
      closeAllDrawers();
    });

    item.querySelector(".item-edit-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      editTrackInfo(track.id);
    });

    item.querySelector(".item-delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTrack(track.id);
    });

    item.querySelector(".item-heart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const idIdx = likedTrackIds.indexOf(track.id);
      if (idIdx > -1) likedTrackIds.splice(idIdx, 1);
      else likedTrackIds.push(track.id);
      localStorage.setItem("vibe_liked_songs", JSON.stringify(likedTrackIds));
      updateHeartButton();
      updateLikedCount();
      renderPlaylist();
      renderLibrarySongs();
    });

    playlistScrollList.appendChild(item);
  });
}

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
  if (leaderboardSidebar) leaderboardSidebar.classList.remove("active");
  if (leaderboardBackdrop) leaderboardBackdrop.classList.remove("active");
  if (drawerBackdrop) drawerBackdrop.classList.remove("active");
  if (assistRadialMenu) assistRadialMenu.classList.remove("active");
}

// Draggable Volume Box
function setupDraggableVolume() {
  if (!draggableVolume) return;
  let volCurrentX = Math.max(20, window.innerWidth - 210);
  let volCurrentY = Math.max(20, window.innerHeight - 80);
  let startX = 0, startY = 0;
  let isDragging = false;

  const getRestrictedY = (y) => isArcadeMode ? window.innerHeight - draggableVolume.offsetHeight - 25 : y;
  draggableVolume.style.transform = `translate3d(${volCurrentX}px, ${getRestrictedY(volCurrentY)}px, 0)`;

  function onPointerDown(e) {
    if (e.target === volumeSlider) return;
    isDragging = true;
    startX = e.clientX - volCurrentX;
    startY = e.clientY - volCurrentY;
    draggableVolume.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!isDragging) return;
    volCurrentX = Math.max(10, Math.min(e.clientX - startX, window.innerWidth - 190));
    volCurrentY = Math.max(10, Math.min(e.clientY - startY, window.innerHeight - 52));
    draggableVolume.style.transform = `translate3d(${volCurrentX}px, ${getRestrictedY(volCurrentY)}px, 0)`;
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

// Rain Audio Synth
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
  } catch (err) { console.warn(err); }
}

// Bouncing Balls
function setupBouncingBalls() {
  balls = [
    { el: btnDrawer, x: 30, y: 110, vx: 2.2, vy: 1.8, size: 52, isPaused: false },
    { el: btnTheme, x: Math.max(10, window.innerWidth - 90), y: 130, vx: -2.0, vy: 2.2, size: 52, isPaused: false },
    { el: btnUpload, x: 50, y: Math.max(10, window.innerHeight - 180), vx: 2.4, vy: -1.9, size: 52, isPaused: false }
  ].filter(b => b.el !== null);

  balls.forEach(ball => {
    ball.el.addEventListener("mouseenter", () => { if (!isArcadeMode) ball.isPaused = true; });
    ball.el.addEventListener("mouseleave", () => { if (!isArcadeMode) ball.isPaused = false; });
    ball.el.addEventListener("touchstart", () => { if (!isArcadeMode) ball.isPaused = true; }, { passive: true });
    ball.el.addEventListener("touchend", () => { if (!isArcadeMode) setTimeout(() => { ball.isPaused = false; }, 800); });
  });

  if (controlsLayout === "bouncing") {
    requestAnimationFrame(updateNormalPhysics);
  }
}

function updateNormalPhysics() {
  if (isArcadeMode || controlsLayout === "assist" || currentView === "library") return;
  const winW = window.innerWidth;
  const winH = window.innerHeight;

  balls.forEach(ball => {
    if (!ball.isPaused && ball.el) {
      ball.x += ball.vx;
      ball.y += ball.vy;
      if (ball.x <= 0 || ball.x + ball.size >= winW) {
        ball.x = Math.max(0, Math.min(ball.x, winW - ball.size));
        ball.vx *= -1;
      }
      if (ball.y <= 0 || ball.y + ball.size >= winH) {
        ball.y = Math.max(0, Math.min(ball.y, winH - ball.size));
        ball.vy *= -1;
      }
      ball.el.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0)`;
    }
  });

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const b1 = balls[i], b2 = balls[j];
      const dx = (b2.x + b2.size/2) - (b1.x + b1.size/2);
      const dy = (b2.y + b2.size/2) - (b1.y + b1.size/2);
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < (b1.size + b2.size) / 2 && dist > 0) {
        const nx = dx/dist, ny = dy/dist;
        const p = (b1.vx - b2.vx)*nx + (b1.vy - b2.vy)*ny;
        if (p > 0) {
          b1.vx -= p*nx; b1.vy -= p*ny;
          b2.vx += p*nx; b2.vy += p*ny;
        }
      }
    }
  }

  if (draggableVolume) {
    const vRect = draggableVolume.getBoundingClientRect();
    balls.forEach(ball => {
      const r = ball.size/2, cx = ball.x + r, cy = ball.y + r;
      const clampedX = Math.max(vRect.left - 4, Math.min(cx, vRect.right + 4));
      const clampedY = Math.max(vRect.top - 4, Math.min(cy, vRect.bottom + 4));
      const dx = cx - clampedX, dy = cy - clampedY;
      if (dx*dx + dy*dy < r*r) {
        if (clampedX === vRect.left - 4 || clampedX === vRect.right + 4) ball.vx *= -1;
        if (clampedY === vRect.top - 4 || clampedY === vRect.bottom + 4) ball.vy *= -1;
      }
    });
  }

  requestAnimationFrame(updateNormalPhysics);
}

// Weather Canvas
function initWeatherCanvas() {
  const canvas = document.getElementById("weather-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize(); window.addEventListener("resize", resize);

  const drops = Array.from({ length: 90 }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, len: Math.random() * 18 + 12, speed: Math.random() * 8 + 12 }));
  const stars = Array.from({ length: 65 }, () => ({ x: Math.random() * window.innerWidth, y: Math.random() * (window.innerHeight * 0.6), r: Math.random() * 1.5 + 0.5, alpha: Math.random(), dAlpha: (Math.random() * 0.02 + 0.008) * (Math.random() < 0.5 ? 1 : -1) }));

  function drawWeather() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const activeWeather = moods[currentMoodIndex].weather;
    if (activeWeather === "rain") {
      ctx.strokeStyle = "rgba(200, 225, 255, 0.45)"; ctx.lineWidth = 1.2;
      drops.forEach(d => { ctx.beginPath(); ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 2, d.y + d.len); ctx.stroke(); d.y += d.speed; d.x -= 1; if (d.y > canvas.height) { d.y = -d.len; d.x = Math.random() * canvas.width; } });
    } else if (activeWeather === "stars") {
      stars.forEach(s => { s.alpha += s.dAlpha; if (s.alpha <= 0.2 || s.alpha >= 1) s.dAlpha *= -1; ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill(); });
    }
    requestAnimationFrame(drawWeather);
  }
  drawWeather();
}

// Arcade Mode
function initArcadeUI() {
  liveScoreHUD = document.createElement("div");
  liveScoreHUD.className = "arcade-live-hud";
  liveScoreHUD.innerHTML = `
    <span><i class="ri-gamepad-fill" style="color:var(--accent-primary);"></i> Lv: <span id="hud-level">1</span></span>
    <span>Score: <span id="hud-score">0</span></span>
  `;
  document.body.appendChild(liveScoreHUD);

  gameMsgOverlay = document.createElement("div");
  gameMsgOverlay.className = "arcade-msg-overlay";
  gameMsgOverlay.innerHTML = `
    <div class="msg-content">
      <i class="ri-gamepad-line modal-icon"></i>
      <h1 id="arcade-msg-title">Component Arcade</h1>
      <p id="arcade-msg-body">Use your sound bar as a paddle! Don't let the components fall into the bottom void.</p>
      <div class="modal-buttons-row">
        <button id="arcade-start-btn" class="glass-btn primary">Start Vibe</button>
        <button id="arcade-exit-btn" class="glass-btn danger" style="display:none;">Exit Game</button>
      </div>
    </div>
  `;
  document.body.appendChild(gameMsgOverlay);

  nicknameModal = document.createElement("div");
  nicknameModal.className = "arcade-modal-backdrop";
  nicknameModal.innerHTML = `
    <div class="glass-modal">
      <i class="ri-user-star-line modal-icon"></i>
      <h3>Claim Unique Game Tag</h3>
      <p>Choose a unique name. No two players can have the same tag!</p>
      <input type="text" id="arcade-nick-input" placeholder="VibeMaster" maxlength="10">
      <button id="arcade-save-nick-btn" class="glass-btn primary">Claim Tag</button>
    </div>
  `;
  document.body.appendChild(nicknameModal);

  document.getElementById("arcade-start-btn").addEventListener("click", prepareArcadeStart);
  document.getElementById("arcade-exit-btn").addEventListener("click", () => {
    gameMsgOverlay.classList.remove("active");
    endArcadeGame();
  });
  document.getElementById("arcade-save-nick-btn").addEventListener("click", saveArcadeNickname);

  const closeLeaderboardBtn = document.getElementById("close-leaderboard-btn");
  if (closeLeaderboardBtn) {
    closeLeaderboardBtn.addEventListener("click", () => {
      leaderboardSidebar.classList.remove("active");
      leaderboardBackdrop.classList.remove("active");
    });
  }

  if (leaderboardBackdrop) {
    leaderboardBackdrop.addEventListener("click", () => {
      leaderboardSidebar.classList.remove("active");
      leaderboardBackdrop.classList.remove("active");
    });
  }

  if (sidebarSaveNickBtn) {
    sidebarSaveNickBtn.addEventListener("click", async () => {
      const tag = sidebarNickInput.value.trim();
      if (!tag || tag.length < 2) { alert("Tag must be at least 2 characters."); return; }
      sidebarSaveNickBtn.textContent = "Checking...";
      const isClaimed = await claimOrUpdateGameTag(tag);
      sidebarSaveNickBtn.textContent = "Save";
      if (isClaimed) alert(`Tag "${tag}" claimed successfully!`);
    });
  }
}

function updateLeaderboardUI() {
  if (sidebarGlobalScore) sidebarGlobalScore.textContent = globalHighScore;
  if (sidebarGlobalNick) sidebarGlobalNick.textContent = `Player: ${globalHighScoreNickname}`;
  if (sidebarPersonalScore) sidebarPersonalScore.textContent = personalHighScore;
  if (sidebarPersonalNick) sidebarPersonalNick.textContent = `Tag: ${arcadeNickname || 'Not set'}`;
  if (sidebarNickInput && arcadeNickname) sidebarNickInput.value = arcadeNickname;
}

function updateLiveHUD() {
  const sEl = document.getElementById("hud-score");
  const lEl = document.getElementById("hud-level");
  if (sEl) sEl.textContent = arcadeScore;
  if (lEl) lEl.textContent = arcadeLevel;
}

async function fetchGlobalHighScore() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('arcade_scores').select('nickname, score, device_id').order('score', { ascending: false }).limit(1);
    if (!error && data && data.length > 0) {
      globalHighScore = data[0].score;
      globalHighScoreNickname = data[0].nickname;
    }
  } catch (err) { console.warn(err); }
}

async function claimOrUpdateGameTag(newTag) {
  if (!supabaseClient) return false;
  try {
    const { data: existing } = await supabaseClient.from('arcade_scores').select('nickname, device_id, score').ilike('nickname', newTag);
    if (existing && existing.length > 0 && existing[0].device_id !== DEVICE_ID) {
      alert(`⚠️ Tag "${newTag}" already taken!`);
      return false;
    }
    const { data: myDeviceRow } = await supabaseClient.from('arcade_scores').select('id, score').eq('device_id', DEVICE_ID).maybeSingle();
    const finalScore = Math.max(personalHighScore || 0, myDeviceRow ? myDeviceRow.score || 0 : 0);

    await supabaseClient.from('arcade_scores').upsert({
      nickname: newTag,
      score: finalScore,
      device_id: DEVICE_ID,
      updated_at: new Date().toISOString()
    }, { onConflict: 'nickname' });

    arcadeNickname = newTag;
    localStorage.setItem("vibe_arcade_nickname", arcadeNickname);
    await fetchGlobalHighScore();
    updateLeaderboardUI();
    return true;
  } catch (err) {
    alert("Could not claim tag: " + err.message);
    return false;
  }
}

async function updateGlobalScore(newScore) {
  if (!supabaseClient || !arcadeNickname || newScore <= 0) return;
  try {
    const { data } = await supabaseClient.from('arcade_scores').select('score').eq('nickname', arcadeNickname).maybeSingle();
    if (newScore > (data ? data.score || 0 : 0)) {
      await supabaseClient.from('arcade_scores').upsert({
        nickname: arcadeNickname,
        score: newScore,
        device_id: DEVICE_ID,
        updated_at: new Date().toISOString()
      }, { onConflict: 'nickname' });
      await fetchGlobalHighScore();
      updateLeaderboardUI();
    }
  } catch (err) { console.warn(err); }
}

async function saveArcadeNickname() {
  const nick = document.getElementById("arcade-nick-input").value.trim();
  if (!nick || nick.length < 2) { alert("Tag must be at least 2 characters."); return; }
  const isClaimed = await claimOrUpdateGameTag(nick);
  if (isClaimed) {
    nicknameModal.classList.remove("active");
    requestStartArcade();
  }
}

function prepareArcadeStart() {
  gameMsgOverlay.classList.remove("active");
  if (!arcadeNickname) nicknameModal.classList.add("active");
  else requestStartArcade();
}

async function requestStartArcade() {
  openFullPlayer();
  exitZenMode();
  closeAllDrawers();
  isArcadeMode = true;
  arcadeScore = 0;
  arcadeLevel = 1;
  arcadeBalls = [];

  liveScoreHUD.classList.add("active");
  draggableVolume.classList.add("game-paddle-mode");
  [btnDrawer, btnTheme, btnUpload].forEach(b => { if (b) b.style.display = "none"; });
  if (assistBallWrapper) assistBallWrapper.style.display = "none";

  await fetchGlobalHighScore();
  updateLiveHUD();
  updateLeaderboardUI();

  spawnDynamicArcadeBall("merge_ball", "ri-play-list-2-fill", window.innerWidth / 2 - 26, 120, 3.2, -4);
  requestAnimationFrame(updateArcadePhysics);
}

function spawnDynamicArcadeBall(id, iconCls, startX, startY, vx, vy) {
  const ballEl = document.createElement("div");
  ballEl.className = "arcade-dynamic-ball";
  ballEl.id = `arcade_${id}`;
  ballEl.innerHTML = `<i class="${iconCls}"></i>`;
  document.body.appendChild(ballEl);

  arcadeBalls.push({ id, el: ballEl, x: startX, y: startY, vx, vy, size: 52 });
}

function updateArcadePhysics() {
  if (!isArcadeMode) return;
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  const vRect = draggableVolume.getBoundingClientRect();
  const paddleLeft = vRect.left, paddleRight = vRect.right, paddleTop = vRect.top, paddleHeight = vRect.height;

  for (let i = 0; i < arcadeBalls.length; i++) {
    const ball = arcadeBalls[i];
    ball.vy += arcadeGravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x <= 0) { ball.x = 0; ball.vx = Math.abs(ball.vx); }
    else if (ball.x + ball.size >= winW) { ball.x = winW - ball.size; ball.vx = -Math.abs(ball.vx); }

    if (ball.y <= 0) { ball.y = 0; ball.vy = Math.abs(ball.vy); }

    if (ball.y + ball.size >= paddleTop && ball.y <= paddleTop + paddleHeight && ball.x + ball.size >= paddleLeft && ball.x <= paddleRight) {
      ball.y = paddleTop - ball.size - 2;
      ball.vy = -Math.abs(ball.vy) * 1.02;
      const hitCenter = ball.x + ball.size / 2;
      const paddleCenter = paddleLeft + (paddleRight - paddleLeft) / 2;
      ball.vx = ((hitCenter - paddleCenter) / ((paddleRight - paddleLeft) / 2)) * 5.5;

      arcadeScore += 10 + arcadeLevel * 2;
      if (arcadeScore >= 100 && arcadeLevel < 2) { arcadeLevel = 2; spawnDynamicArcadeBall("theme_ball", "ri-palette-line", Math.random() * (winW - 100) + 50, 100, -3.5, -4); }
      updateLiveHUD();
    }

    if (ball.y + ball.size >= winH) {
      handleGameOverTrigger();
      return;
    }
    ball.el.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0)`;
  }
  requestAnimationFrame(updateArcadePhysics);
}

function handleGameOverTrigger() {
  isArcadeMode = false;
  liveScoreHUD.classList.remove("active");
  draggableVolume.classList.remove("game-paddle-mode");
  arcadeBalls.forEach(b => { if (b.el) b.el.remove(); });
  arcadeBalls = [];

  if (playBtn) playBtn.style.opacity = "1";
  if (nextBtn) nextBtn.style.opacity = "1";
  applyControlsLayout(controlsLayout);

  if (arcadeScore > personalHighScore) {
    personalHighScore = arcadeScore;
    localStorage.setItem("vibe_arcade_personal_hs", personalHighScore.toString());
  }
  updateGlobalScore(arcadeScore);
  updateLeaderboardUI();

  document.getElementById("arcade-msg-title").textContent = "Game Over";
  document.getElementById("arcade-msg-body").innerHTML = `Score: <strong>${arcadeScore}</strong><br>Personal Best: <strong>${personalHighScore}</strong>`;
  document.getElementById("arcade-start-btn").textContent = "Play Again";
  document.getElementById("arcade-exit-btn").style.display = "inline-block";
  gameMsgOverlay.classList.add("active");
}

function endArcadeGame() {
  isArcadeMode = false;
  liveScoreHUD.classList.remove("active");
  draggableVolume.classList.remove("game-paddle-mode");
  arcadeBalls.forEach(b => { if (b.el) b.el.remove(); });
  arcadeBalls = [];
  if (playBtn) playBtn.style.opacity = "1";
  if (nextBtn) nextBtn.style.opacity = "1";
  applyControlsLayout(controlsLayout);
  document.getElementById("arcade-exit-btn").style.display = "none";
}

// ========================================================
// LISTENERS & SHORTCUTS
// ========================================================
function setupListeners() {
  // Player Controls
  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (nextBtn) nextBtn.addEventListener("click", nextTrack);
  if (prevBtn) prevBtn.addEventListener("click", prevTrack);

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      isShuffle = !isShuffle;
      shuffleBtn.classList.toggle("active", isShuffle);
      preloadStandbyTrack();
    });
  }

  if (repeatBtn) {
    repeatBtn.addEventListener("click", () => {
      isRepeat = !isRepeat;
      repeatBtn.classList.toggle("active", isRepeat);
      preloadStandbyTrack();
    });
  }

  if (seekContainer) seekContainer.addEventListener("click", setProgress);
  if (volumeSlider) volumeSlider.addEventListener("input", handleVolume);

  if (volumeIcon) {
    let prevVol = 1;
    volumeIcon.addEventListener("click", () => {
      if (audioA.volume > 0) {
        prevVol = audioA.volume;
        audioA.volume = 0; audioB.volume = 0;
        volumeSlider.value = 0;
      } else {
        audioA.volume = prevVol || 1; audioB.volume = prevVol || 1;
        volumeSlider.value = audioA.volume;
      }
      updateVolumeIcon(audioA.volume);
    });
  }

  if (mainHeartBtn) mainHeartBtn.addEventListener("click", toggleLikeCurrentTrack);
  if (mainShareBtn) mainShareBtn.addEventListener("click", shareCurrentTrack);
  if (moodToggleBtn) moodToggleBtn.addEventListener("click", cycleMood);
  if (zenToggleBtn) zenToggleBtn.addEventListener("click", toggleZenMode);

  // Collapse Full Player back to Library
  if (collapsePlayerBtn) {
    collapsePlayerBtn.addEventListener("click", collapseToLibrary);
  }

  // Mini-Player Interactions
  if (miniPlayer) {
    miniPlayer.addEventListener("click", (e) => {
      if (e.target.closest(".mini-ctrl-btn")) return;
      openFullPlayer();
    });
  }
  if (miniPlayBtn) miniPlayBtn.addEventListener("click", (e) => { e.stopPropagation(); togglePlay(); });
  if (miniNextBtn) miniNextBtn.addEventListener("click", (e) => { e.stopPropagation(); nextTrack(); });
  if (miniQueueBtn) miniQueueBtn.addEventListener("click", (e) => { e.stopPropagation(); openPlaylistDrawer(); });

  // Front Page Library Controls
  if (libShuffleBtn) {
    libShuffleBtn.addEventListener("click", () => {
      isShuffle = true;
      if (shuffleBtn) shuffleBtn.classList.add("active");
      const nextIdx = Math.floor(Math.random() * playlist.length);
      loadTrack(nextIdx);
      playTrack();
      openFullPlayer();
    });
  }

  if (libSearchToggle) {
    libSearchToggle.addEventListener("click", () => {
      const active = librarySearchWrap.classList.toggle("active");
      if (active) librarySearchInput.focus();
      else { librarySearchInput.value = ""; renderLibrarySongs(); }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      librarySearchInput.value = "";
      librarySearchWrap.classList.remove("active");
      renderLibrarySongs();
    });
  }

  if (librarySearchInput) {
    librarySearchInput.addEventListener("input", renderLibrarySongs);
  }

  // Library Navigation Tabs (Songs, Liked, Playlists)
  document.querySelectorAll(".lib-tab-btn").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".lib-tab-btn").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeLibTab = tab.getAttribute("data-tab");
      updateLibTabIndicator();
      renderLibrarySongs();
    });
  });

  // Mode Switchers on Main Page Only
  if (modeToggleBtn) modeToggleBtn.addEventListener("click", toggleAestheticMode);
  if (btnEngineRetro) btnEngineRetro.addEventListener("click", () => setAestheticEngine("retro"));
  if (btnEngineCyber) btnEngineCyber.addEventListener("click", () => setAestheticEngine("cyber"));
  if (btnEngineCalm) btnEngineCalm.addEventListener("click", () => setAestheticEngine("calm"));
  if (btnEngineDark) btnEngineDark.addEventListener("click", () => setAestheticEngine("dark"));
  if (btnEngineLight) btnEngineLight.addEventListener("click", () => setAestheticEngine("light"));

  // Layout Buttons
  if (btnLayoutBouncing) btnLayoutBouncing.addEventListener("click", () => applyControlsLayout("bouncing"));
  if (btnLayoutAssist) btnLayoutAssist.addEventListener("click", () => applyControlsLayout("assist"));

  if (btnAddEmojiSkin) btnAddEmojiSkin.addEventListener("click", addNewEmojiSkin);

  document.querySelectorAll("#cyber-palette-section .palette-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      applyAestheticEngine(currentAestheticMode, chip.getAttribute("data-accent"));
    });
  });

  if (appRefreshBtn) {
    appRefreshBtn.addEventListener("click", () => {
      if (refreshIcon) refreshIcon.classList.add("spin-anim");
      fetchSupabaseSongs();
      fetchGlobalHighScore();
      setTimeout(() => window.location.reload(), 400);
    });
  }

  if (arcadeToggleBtn) {
    arcadeToggleBtn.addEventListener("click", () => {
      if (isArcadeMode) endArcadeGame();
      else {
        document.getElementById("arcade-exit-btn").style.display = "none";
        document.getElementById("arcade-start-btn").textContent = "Start Vibe";
        gameMsgOverlay.classList.add("active");
      }
    });
  }

  document.querySelectorAll(".bg-btn:not(#custom-bg-label)").forEach(btn => {
    btn.addEventListener("click", () => applyBackground(parseInt(btn.getAttribute("data-bg"))));
  });

  if (customBgInput) customBgInput.addEventListener("change", handleCustomBgUpload);

  document.querySelectorAll(".mood-btn").forEach(btn => {
    btn.addEventListener("click", () => applyMood(parseInt(btn.getAttribute("data-mood")), true));
  });

  if (searchInput) searchInput.addEventListener("input", renderPlaylist);
  
  if (tabAllBtn) {
    tabAllBtn.addEventListener("click", () => {
      currentTab = "all";
      tabAllBtn.classList.add("active");
      if (tabLikedBtn) tabLikedBtn.classList.remove("active");
      renderPlaylist();
    });
  }

  if (tabLikedBtn) {
    tabLikedBtn.addEventListener("click", () => {
      currentTab = "liked";
      tabLikedBtn.classList.add("active");
      if (tabAllBtn) tabAllBtn.classList.remove("active");
      renderPlaylist();
    });
  }

  if (rainSlider) {
    rainSlider.addEventListener("input", (e) => {
      if (!isWebAudioInit) initRainAudio();
      if (rainGainNode) rainGainNode.gain.value = parseFloat(e.target.value);
    });
  }

  if (mainAudioInput) {
    mainAudioInput.addEventListener("change", (e) => {
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const userPin = prompt(`Enter Admin PIN to upload "${file.name}":`);
      if (userPin === ADMIN_PIN) handleMainPlaylistUpload(file);
      else alert("Incorrect PIN!");
      e.target.value = "";
    });
  }

  if (audioFileInput) audioFileInput.addEventListener("change", handleLocalFileUpload);
  if (drawerAudioFileInput) drawerAudioFileInput.addEventListener("change", handleLocalFileUpload);

  if (btnDrawer) btnDrawer.addEventListener("click", (e) => { if (!isArcadeMode) { e.stopPropagation(); openPlaylistDrawer(); } });
  if (btnTheme) btnTheme.addEventListener("click", (e) => { if (!isArcadeMode) { e.stopPropagation(); openThemeDrawer(); } });
  if (btnUpload) btnUpload.addEventListener("click", (e) => { if (!isArcadeMode) { e.stopPropagation(); if (audioFileInput) audioFileInput.click(); } });

  const closeDrawerBtn = document.getElementById("close-drawer-btn");
  const closeThemeBtn = document.getElementById("close-theme-btn");
  if (closeDrawerBtn) closeDrawerBtn.addEventListener("click", closeAllDrawers);
  if (closeThemeBtn) closeThemeBtn.addEventListener("click", closeAllDrawers);
  if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeAllDrawers);

  let lastTouchTime = 0;
  function handleZenTrigger(e) {
    if (isArcadeMode || e.target.closest("button") || e.target.closest("input") || e.target.closest("#seek-container") || e.target.closest(".playlist-drawer") || e.target.closest(".draggable-volume-box") || e.target.closest(".leaderboard-sidebar") || e.target.closest(".assist-ball-wrapper") || e.target.closest(".floating-score-tab")) return;
    toggleZenMode();
  }

  window.addEventListener("dblclick", handleZenTrigger);
  window.addEventListener("touchend", (e) => {
    if (isArcadeMode) return;
    const now = Date.now();
    if (now - lastTouchTime < 320 && now - lastTouchTime > 40) handleZenTrigger(e);
    lastTouchTime = now;
  });

  window.addEventListener("click", (e) => {
    if (isZenMode && !e.target.closest("#zen-toggle-btn")) exitZenMode();
    if (assistRadialMenu && !e.target.closest(".assist-ball-wrapper")) {
      assistRadialMenu.classList.remove("active");
      resetAssistIdleTimer();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;
    if (e.code === "Space") { e.preventDefault(); togglePlay(); }
    else if (e.code === "KeyZ" && !isArcadeMode) { e.preventDefault(); toggleZenMode(); }
    else if (e.code === "Escape") { 
      if (isZenMode) exitZenMode(); 
      if (isArcadeMode) endArcadeGame();
      if (currentView === "full") collapseToLibrary();
      closeAllDrawers();
    }
  });

  window.addEventListener("resize", updateLibTabIndicator);
}

document.addEventListener("DOMContentLoaded", initPlayer);