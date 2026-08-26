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

// IndexedDB Engine
const IDB_NAME = "VibeMusicDB", IDB_VERSION = 1, IDB_STORE = "local_tracks";
function openLocalDB() { return new Promise((resolve, reject) => { const request = indexedDB.open(IDB_NAME, IDB_VERSION); request.onupgradeneeded = (e) => { const db = e.target.result; if (!db.objectStoreNames.contains(IDB_STORE)) db.createObjectStore(IDB_STORE, { keyPath: "id" }); }; request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
async function saveLocalTrackToDB(track) { try { const db = await openLocalDB(); return new Promise((resolve, reject) => { const tx = db.transaction(IDB_STORE, "readwrite"); const store = tx.objectStore(IDB_STORE); store.put(track); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); }); } catch (err) {} }
async function getLocalTracksFromDB() { try { const db = await openLocalDB(); return new Promise((resolve, reject) => { const tx = db.transaction(IDB_STORE, "readonly"); const store = tx.objectStore(IDB_STORE); const req = store.getAll(); req.onsuccess = () => resolve(req.result || []); req.onerror = () => reject(req.error); }); } catch (err) { return []; } }
async function deleteLocalTrackFromDB(id) { try { const db = await openLocalDB(); return new Promise((resolve, reject) => { const tx = db.transaction(IDB_STORE, "readwrite"); const store = tx.objectStore(IDB_STORE); store.delete(id); tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); }); } catch (err) {} }

// Player State
let supabaseTracks = [], localTracks = [], playlist = [...baseTracks];
let currentTrackIndex = 0, isShuffle = false, isRepeat = false, isZenMode = false, isFading = false, wakeLock = null;
let audioA, audioB, activeAudio, standbyAudio, nextPreloadedIndex = -1;
let currentTab = "all", activeCustomPlaylistName = null;
let currentBgIndex = localStorage.getItem("vibe_bg_idx") || "0", customBgData = localStorage.getItem("vibe_custom_bg") || null;
let currentMoodIndex = parseInt(localStorage.getItem("vibe_mood_idx") || "1");
let likedTrackIds = JSON.parse(localStorage.getItem("vibe_liked_songs") || "[]");
let trackOverrides = JSON.parse(localStorage.getItem("vibe_track_overrides") || "{}");
let customPlaylists = JSON.parse(localStorage.getItem("vibe_custom_playlists") || "{}");

let audioCtx = null, rainGainNode = null, isWebAudioInit = false;

// UI References
let trackTitle, trackArtist, playBtn, playIcon, prevBtn, nextBtn, shuffleBtn, repeatBtn;
let seekContainer, seekProgress, seekThumb, currentTimeEl, durationTimeEl, volumeSlider, volumeIcon, draggableVolume;
let drawerBackdrop, playlistDrawer, themeDrawer, playlistScrollList, trackCountBadge, likedCountBadge, mainHeartBtn, mainHeartIcon, mainShareBtn;
let btnDrawer, btnTheme, btnUpload;
let balls = [];

// Arcade Game Globals
let isArcadeMode = false, arcadeScore = 0, arcadeLevel = 1;
let globalHighScore = 0, globalHighScoreNickname = "None yet";
let personalHighScore = parseInt(localStorage.getItem("vibe_arcade_personal_hs") || "0");
let arcadeNickname = localStorage.getItem("vibe_arcade_nickname") || null;

// Modals
let gameHubModal, gameMsgOverlay, nicknameModal, liveScoreHUD;

// Merge Game Physics Globals
let isMergeGameMode = false;
let mergeEngine, mergeRunner, mergeRender;
let mergeBodiesMap = {}; // Maps Matter.js body.id to DOM elements
let currentDropTier = 1, nextDropTier = 1;

const MERGE_TIERS = [
  { tier: 1, size: 36, icon: 'ri-music-2-line', color: '#fff', score: 2 },
  { tier: 2, size: 48, icon: 'ri-heart-fill', color: '#ff4757', score: 4 },
  { tier: 3, size: 60, icon: 'ri-share-forward-fill', color: '#54a0ff', score: 8 },
  { tier: 4, size: 74, icon: 'ri-repeat-line', color: '#2ed573', score: 16 },
  { tier: 5, size: 90, icon: 'ri-shuffle-line', color: '#ffa502', score: 32 },
  { tier: 6, size: 108, icon: 'ri-skip-forward-fill', color: '#ff7f50', score: 64 },
  { tier: 7, size: 128, icon: 'ri-play-circle-fill', color: '#eccc68', score: 128 },
  { tier: 8, size: 150, icon: 'ri-play-list-2-fill', color: '#ff6b81', score: 256 },
  { tier: 9, size: 174, icon: 'ri-palette-fill', color: '#7bed9f', score: 512 },
  { tier: 10, size: 200, icon: 'ri-disc-fill', color: '#ffde59', score: 1000 }
];

// Init
async function initPlayer() {
  audioA = document.getElementById("main-audio"); audioB = new Audio(); audioB.preload = "auto";
  activeAudio = audioA; standbyAudio = audioB;

  trackTitle = document.getElementById("track-title"); trackArtist = document.getElementById("track-artist");
  playBtn = document.getElementById("play-btn"); playIcon = document.getElementById("play-icon");
  prevBtn = document.getElementById("prev-btn"); nextBtn = document.getElementById("next-btn");
  shuffleBtn = document.getElementById("shuffle-btn"); repeatBtn = document.getElementById("repeat-btn");
  seekContainer = document.getElementById("seek-container"); seekProgress = document.getElementById("seek-progress"); seekThumb = document.getElementById("seek-thumb");
  currentTimeEl = document.getElementById("current-time"); durationTimeEl = document.getElementById("duration-time");
  draggableVolume = document.getElementById("draggable-volume"); volumeSlider = document.getElementById("volume-slider"); volumeIcon = document.getElementById("volume-icon");
  mainHeartBtn = document.getElementById("main-heart-btn"); mainHeartIcon = document.getElementById("main-heart-icon"); mainShareBtn = document.getElementById("main-share-btn");

  gameHubModal = document.getElementById("game-hub-modal");
  gameMsgOverlay = document.querySelector(".arcade-msg-overlay");
  nicknameModal = document.querySelector(".arcade-modal-backdrop");
  
  if (currentBgIndex === "custom" && customBgData) applyCustomBackground(customBgData); else applyBackground(parseInt(currentBgIndex) || 0);
  applyMood(currentMoodIndex, false); updateLikedCount();
  
  await loadSavedLocalSongs(); rebuildPlaylist(); loadTrack(currentTrackIndex);
  setupListeners(); setupMediaSession(); setupDualAudioListeners(audioA); setupDualAudioListeners(audioB);
  setupDraggableVolume(); setupBouncingBalls(); initWeatherCanvas(); initArcadeUI(); setupSwipeGestures();

  await fetchSupabaseSongs(); await fetchGlobalHighScore(); updateLeaderboardUI();
}

// Logic implementations (Dual Audio, Cloud, Playlists, Background)
async function fetchSupabaseSongs() {
  if (!supabaseClient) return;
  try {
    const { data, error } = await supabaseClient.from('songs').select('*').order('created_at', { ascending: true });
    if (!error && data && data.length > 0) {
      supabaseTracks = data.map(item => ({ id: `sb_${item.id}`, title: item.title, artist: item.artist || FALLBACK_ARTIST, src: item.src }));
      rebuildPlaylist();
    }
  } catch (err) {}
}

function rebuildPlaylist() {
  playlist = [...baseTracks, ...supabaseTracks, ...localTracks].map(track => {
    if (trackOverrides[track.id]) return { ...track, title: trackOverrides[track.id].title || track.title, artist: trackOverrides[track.id].artist || track.artist };
    return track;
  });
  if(document.getElementById("track-count")) document.getElementById("track-count").textContent = playlist.length;
  renderPlaylist();
}

function getNextTrackIndex() {
  let activePool = playlist;
  if (currentTab === "liked") activePool = playlist.filter(t => likedTrackIds.includes(t.id));
  if (activePool.length === 0) activePool = playlist;
  if (isRepeat) return currentTrackIndex;
  if (isShuffle) {
    let randomIndex;
    do { randomIndex = Math.floor(Math.random() * activePool.length); } while (randomIndex === currentTrackIndex && activePool.length > 1);
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
  if (nextTrack) { standbyAudio.src = nextTrack.src; standbyAudio.currentTime = 0; standbyAudio.preload = "auto"; }
}

function loadTrack(index) {
  if (playlist.length === 0) return;
  currentTrackIndex = index; const track = playlist[currentTrackIndex];
  if (trackTitle) trackTitle.textContent = track.title || "Unknown Track";
  if (trackArtist) trackArtist.textContent = (!track.artist || track.artist.trim() === "") ? FALLBACK_ARTIST : track.artist;
  activeAudio.src = track.src; activeAudio.currentTime = 0;
  updateHeartButton(); updateMediaSessionMetadata(track); preloadStandbyTrack();
}

function playTrack() {
  if (!activeAudio) return;
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
  const playPromise = activeAudio.play();
  if (playPromise !== undefined) { playPromise.then(() => { updateMediaSessionMetadata(playlist[currentTrackIndex]); preloadStandbyTrack(); }).catch(() => {}); }
}

function pauseTrack() { if (activeAudio) activeAudio.pause(); }
function togglePlay() { if (activeAudio.paused) playTrack(); else pauseTrack(); }
function nextTrack() { standbyAudio.pause(); triggerFadeTransition(() => { loadTrack(nextPreloadedIndex !== -1 && !isShuffle ? nextPreloadedIndex : getNextTrackIndex()); playTrack(); }); }
function prevTrack() {
  if (activeAudio && activeAudio.currentTime > 3) { activeAudio.currentTime = 0; return; }
  standbyAudio.pause();
  triggerFadeTransition(() => {
    let activePool = playlist; if (currentTab === "liked") activePool = playlist.filter(t => likedTrackIds.includes(t.id));
    if (activePool.length === 0) activePool = playlist;
    const currentInPoolIdx = activePool.findIndex(t => t.id === playlist[currentTrackIndex].id);
    const prevInPoolIdx = (currentInPoolIdx - 1 + activePool.length) % activePool.length;
    loadTrack(playlist.findIndex(t => t.id === activePool[prevInPoolIdx].id)); playTrack();
  });
}

function triggerFadeTransition(actionCallback) {
  if (!activeAudio || activeAudio.paused || isFading || document.visibilityState === 'hidden') { actionCallback(); return; }
  isFading = true; const targetVol = parseFloat(volumeSlider ? volumeSlider.value : 1); let currentVol = activeAudio.volume;
  const interval = 25; const step = currentVol / (220 / interval);
  const fadeOutTimer = setInterval(() => {
    currentVol = Math.max(0, currentVol - step); activeAudio.volume = currentVol;
    if (currentVol <= 0.05) {
      clearInterval(fadeOutTimer); activeAudio.volume = 0; actionCallback();
      let inVol = 0; const stepIn = targetVol / (220 / interval);
      const fadeInTimer = setInterval(() => {
        inVol = Math.min(targetVol, inVol + stepIn); activeAudio.volume = inVol;
        if (inVol >= targetVol) { clearInterval(fadeInTimer); activeAudio.volume = targetVol; isFading = false; }
      }, interval);
    }
  }, interval);
}

function setupDualAudioListeners(audioNode) {
  audioNode.addEventListener("timeupdate", (e) => {
    if (e.target !== activeAudio) return;
    const { duration, currentTime } = activeAudio; if (isNaN(duration) || duration === 0) return;
    const percent = (currentTime / duration) * 100;
    if (seekProgress) seekProgress.style.width = `${percent}%`; if (seekThumb) seekThumb.style.left = `${percent}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentTime); if (durationTimeEl) durationTimeEl.textContent = formatTime(duration);
  });
  audioNode.addEventListener("play", (e) => { if (e.target !== activeAudio) return; if (playIcon) playIcon.className = "ri-pause-fill"; });
  audioNode.addEventListener("pause", (e) => { if (e.target !== activeAudio) return; if (playIcon) playIcon.className = "ri-play-fill"; });
  audioNode.addEventListener("ended", (e) => {
    if (e.target !== activeAudio) return;
    const temp = activeAudio; activeAudio = standbyAudio; standbyAudio = temp;
    currentTrackIndex = nextPreloadedIndex !== -1 ? nextPreloadedIndex : getNextTrackIndex();
    const track = playlist[currentTrackIndex];
    if (trackTitle) trackTitle.textContent = track.title || "Unknown Track";
    if (trackArtist) trackArtist.textContent = track.artist || FALLBACK_ARTIST;
    updateHeartButton(); playTrack(); preloadStandbyTrack();
  });
}

function setProgress(e) { if (!seekContainer || !activeAudio) return; const clickX = e.clientX - seekContainer.getBoundingClientRect().left; activeAudio.currentTime = (clickX / seekContainer.getBoundingClientRect().width) * activeAudio.duration; }
function formatTime(seconds) { if (isNaN(seconds)) return "0:00"; const min = Math.floor(seconds / 60); const sec = Math.floor(seconds % 60); return `${min}:${sec < 10 ? "0" : ""}${sec}`; }
function handleVolume(e) { const val = parseFloat(e.target.value); audioA.volume = val; audioB.volume = val; updateVolumeIcon(val); }
function updateVolumeIcon(val) { if (!volumeIcon) return; if (val === 0) volumeIcon.className = "ri-volume-mute-line"; else if (val < 0.5) volumeIcon.className = "ri-volume-down-line"; else volumeIcon.className = "ri-volume-up-line"; }

function updateHeartButton() { const isLiked = likedTrackIds.includes(playlist[currentTrackIndex]?.id); if (mainHeartBtn) { mainHeartBtn.classList.toggle("liked", isLiked); mainHeartIcon.className = isLiked ? "ri-heart-fill" : "ri-heart-line"; } }
function toggleLikeCurrentTrack() { const currentTrack = playlist[currentTrackIndex]; if (!currentTrack) return; const idx = likedTrackIds.indexOf(currentTrack.id); if (idx > -1) likedTrackIds.splice(idx, 1); else likedTrackIds.push(currentTrack.id); localStorage.setItem("vibe_liked_songs", JSON.stringify(likedTrackIds)); updateHeartButton(); updateLikedCount(); renderPlaylist(); }

// Share Feature
async function shareCurrentTrack() {
  const currentTrack = playlist[currentTrackIndex]; if (!currentTrack) return;
  const appUrl = "https://kushaladitya9-lab.github.io/vibe-music-player/";
  if (navigator.share) { try { await navigator.share({ url: appUrl }); } catch (err) { if (err.name !== 'AbortError') copyShareFallback(appUrl); } } else copyShareFallback(appUrl);
}
function copyShareFallback(url) { if (navigator.clipboard) { navigator.clipboard.writeText(url).then(() => alert("Link copied!")).catch(() => prompt("Copy link:", url)); } else prompt("Copy link:", url); }

function updateLikedCount() { if(document.getElementById("liked-count")) document.getElementById("liked-count").textContent = likedTrackIds.length; }

// ========================================================
// GAMES HUB & INTEGRATION
// ========================================================

// Arcade Init Shared
function initArcadeUI() {
  // Existing Pong HUD
  liveScoreHUD = document.createElement("div"); liveScoreHUD.className = "arcade-live-hud";
  liveScoreHUD.innerHTML = `<span><i class="ri-gamepad-fill" style="color:var(--accent-gold);"></i> Lv: <span id="hud-level">1</span></span><span>Score: <span id="hud-score">0</span></span>`;
  document.body.appendChild(liveScoreHUD);

  document.getElementById("start-pong-btn").addEventListener("click", () => {
    gameHubModal.classList.remove("active");
    if (!arcadeNickname) nicknameModal.classList.add("active"); else requestStartPong();
  });

  document.getElementById("start-merge-btn").addEventListener("click", () => {
    gameHubModal.classList.remove("active");
    if (!arcadeNickname) nicknameModal.classList.add("active"); else startMergeGame();
  });

  const closeLeaderboardBtn = document.getElementById("close-leaderboard-btn");
  if (closeLeaderboardBtn) closeLeaderboardBtn.addEventListener("click", () => { document.getElementById("leaderboard-sidebar").classList.remove("active"); document.getElementById("leaderboard-backdrop").classList.remove("active"); });

  if (document.getElementById("sidebar-save-nick-btn")) document.getElementById("sidebar-save-nick-btn").addEventListener("click", saveArcadeNickname);
}

// ------------------------------------------
// 1. PONG GAME LOGIC
// ------------------------------------------
async function requestStartPong() {
  isArcadeMode = true; arcadeScore = 0; arcadeLevel = 1; arcadeBalls = [];
  liveScoreHUD.classList.add("active"); draggableVolume.classList.add("game-paddle-mode");
  document.querySelectorAll('.bounce-ball').forEach(b => b.style.display = "none");
  await fetchGlobalHighScore(); updateLiveHUD();
  spawnDynamicArcadeBall("merge_ball", "ri-play-list-2-fill", window.innerWidth / 2 - 26, 120, 3.2, -4);
  requestAnimationFrame(updateArcadePhysics);
}

function spawnDynamicArcadeBall(id, iconCls, startX, startY, vx, vy) {
  const ballEl = document.createElement("div"); ballEl.className = "arcade-dynamic-ball"; ballEl.innerHTML = `<i class="${iconCls}"></i>`;
  document.body.appendChild(ballEl);
  arcadeBalls.push({ id, el: ballEl, x: startX, y: startY, vx, vy, size: 52 });
}

function updateArcadePhysics() {
  if (!isArcadeMode) return;
  const winW = window.innerWidth, winH = window.innerHeight;
  const vRect = draggableVolume.getBoundingClientRect();
  for (let i = 0; i < arcadeBalls.length; i++) {
    const ball = arcadeBalls[i];
    ball.vy += arcadeGravity; ball.x += ball.vx; ball.y += ball.vy;
    if (ball.x <= 0) { ball.x = 0; ball.vx = Math.abs(ball.vx); } else if (ball.x + ball.size >= winW) { ball.x = winW - ball.size; ball.vx = -Math.abs(ball.vx); }
    if (ball.y <= 0) { ball.y = 0; ball.vy = Math.abs(ball.vy); }
    if (ball.y + ball.size >= vRect.top && ball.y <= vRect.bottom && ball.x + ball.size >= vRect.left && ball.x <= vRect.right) {
      ball.y = vRect.top - ball.size - 2; ball.vy = -Math.abs(ball.vy) * 1.02;
      ball.vx = ((ball.x + ball.size/2) - (vRect.left + vRect.width/2)) / (vRect.width/2) * 5.5;
      arcadeScore += 10 + arcadeLevel * 2; updateLiveHUD();
    }
    if (ball.y + ball.size >= winH) { handleGameOverTrigger(); return; }
    ball.el.style.transform = `translate3d(${ball.x}px, ${ball.y}px, 0)`;
  }
  requestAnimationFrame(updateArcadePhysics);
}

function handleGameOverTrigger() {
  isArcadeMode = false; liveScoreHUD.classList.remove("active"); draggableVolume.classList.remove("game-paddle-mode");
  arcadeBalls.forEach(b => b.el.remove()); arcadeBalls = [];
  document.querySelectorAll('.bounce-ball').forEach(b => b.style.display = "grid");
  if (arcadeScore > personalHighScore) { personalHighScore = arcadeScore; localStorage.setItem("vibe_arcade_personal_hs", personalHighScore.toString()); }
  updateGlobalScore(arcadeScore);
  alert(`Pong Game Over! Score: ${arcadeScore}`);
  requestAnimationFrame(updateNormalPhysics);
}

// ------------------------------------------
// 2. VIBE MERGE GAME LOGIC (Matter.js)
// ------------------------------------------
let mergeGameActive = false;
let dropReady = true;

function startMergeGame() {
  exitZenMode(); closeAllDrawers();
  document.querySelectorAll('.bounce-ball').forEach(b => b.style.display = "none");
  document.getElementById("merge-game-layer").classList.add("active");
  draggableVolume.classList.add("merge-floor-mode"); // Expands volume bar as floor base
  
  isMergeGameMode = true;
  arcadeScore = 0;
  document.getElementById("merge-score-val").textContent = "0";

  setupMergePhysics();
  setNextMergeItem();

  // Mobile Touch Move for dropper
  document.getElementById("merge-game-layer").addEventListener('touchmove', handleMergeAim, {passive: true});
  document.getElementById("merge-game-layer").addEventListener('touchend', handleMergeDrop);
  
  // Buttons
  document.getElementById("merge-quit-btn").onclick = quitMergeGame;
  document.getElementById("merge-restart-btn").onclick = restartMergeGame;
}

function setupMergePhysics() {
  const Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, World = Matter.World, Bodies = Matter.Bodies, Events = Matter.Events;
  mergeEngine = Engine.create();
  
  // Floor (Volume Bar Bound mapping)
  const floorY = window.innerHeight - 80;
  const floorW = Math.min(window.innerWidth * 0.9, 500);
  const floorX = window.innerWidth / 2;
  
  const floor = Bodies.rectangle(floorX, floorY + 40, floorW, 80, { isStatic: true, render: { visible: false }});
  const leftWall = Bodies.rectangle(-10, window.innerHeight/2, 20, window.innerHeight, { isStatic: true });
  const rightWall = Bodies.rectangle(window.innerWidth + 10, window.innerHeight/2, 20, window.innerHeight, { isStatic: true });

  World.add(mergeEngine.world, [floor, leftWall, rightWall]);

  // Sync Matter bodies to DOM
  Events.on(mergeEngine, 'afterUpdate', () => {
    Matter.Composite.allBodies(mergeEngine.world).forEach(body => {
      if (mergeBodiesMap[body.id]) {
        mergeBodiesMap[body.id].style.transform = `translate(${body.position.x - body.circleRadius}px, ${body.position.y - body.circleRadius}px) rotate(${body.angle}rad)`;
      }
    });
  });

  // Collision (Merge) Logic
  Events.on(mergeEngine, 'collisionStart', (event) => {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      
      if (bodyA.tier && bodyB.tier && bodyA.tier === bodyB.tier && bodyA.tier < 10) {
        if(!bodyA.isMerged && !bodyB.isMerged) {
          bodyA.isMerged = true; bodyB.isMerged = true;
          const newTierIdx = bodyA.tier; // +1 mathematically (0-indexed array)
          
          setTimeout(() => {
             // Remove old
             World.remove(mergeEngine.world, [bodyA, bodyB]);
             if(mergeBodiesMap[bodyA.id]) mergeBodiesMap[bodyA.id].remove();
             if(mergeBodiesMap[bodyB.id]) mergeBodiesMap[bodyB.id].remove();
             
             // Spawn New
             const midX = (bodyA.position.x + bodyB.position.x)/2;
             const midY = (bodyA.position.y + bodyB.position.y)/2;
             spawnMergeItem(newTierIdx + 1, midX, midY);
             
             arcadeScore += MERGE_TIERS[newTierIdx].score;
             document.getElementById("merge-score-val").textContent = arcadeScore;
          }, 0);
        }
      }
    }
  });

  // Danger Line check
  const dangerY = document.getElementById("seek-container").getBoundingClientRect().top + 10;
  document.getElementById("merge-danger-line").style.top = `${dangerY}px`;
  
  setInterval(() => {
    if(!isMergeGameMode) return;
    let dangerWarning = false;
    Matter.Composite.allBodies(mergeEngine.world).forEach(body => {
      if(body.tier && body.position.y - body.circleRadius < dangerY && body.velocity.y < 0.2) {
         dangerWarning = true;
         // Note: Add 3 sec timer logic here for full Game Over. For now just visual warning.
      }
    });
    document.getElementById("merge-danger-line").classList.toggle("danger-warning", dangerWarning);
  }, 1000);

  mergeRunner = Runner.create();
  Runner.run(mergeRunner, mergeEngine);
}

function spawnMergeItem(tierNum, x, y) {
  const tData = MERGE_TIERS[tierNum - 1];
  const body = Matter.Bodies.circle(x, y, tData.size / 2, {
    restitution: 0.2, friction: 0.1, density: 0.001, tier: tierNum
  });
  
  const domEl = document.createElement("div");
  domEl.className = "merge-dom-body";
  domEl.style.width = `${tData.size}px`; domEl.style.height = `${tData.size}px`;
  domEl.style.borderColor = tData.color;
  domEl.innerHTML = `<i class="${tData.icon}" style="color:${tData.color}; font-size:${tData.size * 0.45}px;"></i>`;
  document.getElementById("merge-physics-container").appendChild(domEl);
  
  mergeBodiesMap[body.id] = domEl;
  Matter.World.add(mergeEngine.world, body);
}

function setNextMergeItem() {
  currentDropTier = nextDropTier;
  nextDropTier = Math.floor(Math.random() * 3) + 1; // Tier 1 to 3
  const tData = MERGE_TIERS[nextDropTier - 1];
  document.getElementById("next-item-icon-container").innerHTML = `<i class="${tData.icon}" style="color:${tData.color}; font-size:24px;"></i>`;
}

function handleMergeAim(e) {
  if(!dropReady) return;
  const x = e.touches[0].clientX;
  document.getElementById("merge-dropper-guide").style.left = `${x}px`;
}

function handleMergeDrop(e) {
  if(!dropReady) return;
  dropReady = false;
  const x = e.changedTouches[0].clientX;
  const y = document.getElementById("merge-danger-line").getBoundingClientRect().top;
  
  spawnMergeItem(currentDropTier, x, y - 20);
  setNextMergeItem();
  
  setTimeout(() => { dropReady = true; }, 800);
}

function restartMergeGame() {
  Matter.World.clear(mergeEngine.world);
  Matter.Engine.clear(mergeEngine);
  document.getElementById("merge-physics-container").innerHTML = "";
  arcadeScore = 0; document.getElementById("merge-score-val").textContent = "0";
  setupMergePhysics();
}

function quitMergeGame() {
  isMergeGameMode = false;
  if(mergeRunner) Matter.Runner.stop(mergeRunner);
  document.getElementById("merge-game-layer").classList.remove("active");
  draggableVolume.classList.remove("merge-floor-mode");
  document.querySelectorAll('.bounce-ball').forEach(b => b.style.display = "grid");
  requestAnimationFrame(updateNormalPhysics);
}

// ------------------------------------------
// GENERAL DB SYNC
// ------------------------------------------
async function updateGlobalScore(newScore) {
  if (!supabaseClient || !arcadeNickname || newScore <= 0) return;
  try {
    const { data, error } = await supabaseClient.from('arcade_scores').select('score').eq('nickname', arcadeNickname).maybeSingle();
    let existingScore = 0; if (!error && data) existingScore = data.score || 0;
    if (newScore > existingScore) {
      await supabaseClient.from('arcade_scores').upsert({ nickname: arcadeNickname, score: newScore, device_id: DEVICE_ID, updated_at: new Date().toISOString() }, { onConflict: 'nickname' });
      await fetchGlobalHighScore(); updateLeaderboardUI();
    }
  } catch (err) {}
}

async function saveArcadeNickname() {
  const input = document.getElementById("sidebar-nick-input"); const nick = input.value.trim();
  if (!nick || nick.length < 2) { alert("Tag > 2 chars."); return; }
  // DB checking logic skipped for brevity, assumes valid unique
  arcadeNickname = nick; localStorage.setItem("vibe_arcade_nickname", arcadeNickname);
  updateLeaderboardUI();
}

// General UI Layout Listeners
function setupListeners() {
  if (playBtn) playBtn.addEventListener("click", togglePlay);
  if (nextBtn) nextBtn.addEventListener("click", nextTrack);
  if (prevBtn) prevBtn.addEventListener("click", prevTrack);
  if (shuffleBtn) shuffleBtn.addEventListener("click", () => { isShuffle = !isShuffle; shuffleBtn.classList.toggle("active", isShuffle); preloadStandbyTrack(); });
  if (repeatBtn) repeatBtn.addEventListener("click", () => { isRepeat = !isRepeat; repeatBtn.classList.toggle("active", isRepeat); preloadStandbyTrack(); });
  
  if (seekContainer) seekContainer.addEventListener("click", setProgress);
  if (volumeSlider) volumeSlider.addEventListener("input", handleVolume);
  if (mainHeartBtn) mainHeartBtn.addEventListener("click", toggleLikeCurrentTrack);
  if (mainShareBtn) mainShareBtn.addEventListener("click", shareCurrentTrack);

  // Toggle Game Hub
  document.getElementById("arcade-toggle-btn").addEventListener("click", () => {
    gameHubModal.classList.add("active");
  });
  document.getElementById("close-hub-btn").addEventListener("click", () => {
    gameHubModal.classList.remove("active");
  });
}

function updateLeaderboardUI() {
  if (document.getElementById("sidebar-global-score")) document.getElementById("sidebar-global-score").textContent = globalHighScore;
  if (document.getElementById("sidebar-global-nick")) document.getElementById("sidebar-global-nick").textContent = `Player: ${globalHighScoreNickname}`;
  if (document.getElementById("sidebar-personal-score")) document.getElementById("sidebar-personal-score").textContent = personalHighScore;
  if (document.getElementById("sidebar-personal-nick")) document.getElementById("sidebar-personal-nick").textContent = `Tag: ${arcadeNickname || 'Not set'}`;
}

document.addEventListener("DOMContentLoaded", initPlayer);