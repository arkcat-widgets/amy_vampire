/**
 * =========================================
 * BEE HONEYPOT WIDGET - COMPLETE
 * Cozy Drop Logic + Bee Interactive Animations
 * =========================================
 */

/* =========================================
   CONSTANTS
   ========================================= */
const DEDUP_TIMEOUT_MS = 80;
let liquidRAF = null;
const IMG = {
    idle: "https://cdn.jsdelivr.net/gh/arkcat-widgets/amy_vampire@main/idle.webp",
    interactive: "https://cdn.jsdelivr.net/gh/arkcat-widgets/amy_vampire@main/interactive.webp",
    bottle: "https://cdn.jsdelivr.net/gh/arkcat-widgets/amy_vampire@main/bottle.webp",
    pinwood: "https://cdn.jsdelivr.net/gh/arkcat-widgets/amy_vampire@main/pin.webp",

};
const FPS = 10;
const FRAME_TIME = 1000 / FPS;
const TEXT_PATH_FRAMES = { start: 45, pauseStart: 55, pauseEnd: 90, end: 115 };
const TEXT_PATH_STOP_POSITION = 0.40;
const FILL_FRAME = 75;
const TOTAL_FRAMES = 155;
const FILL_TIME = FILL_FRAME * FRAME_TIME;
const TOTAL_TIME = TOTAL_FRAMES * FRAME_TIME;

const FLOWER_PARTICLE_CONFIG = { spawnInterval: 400, minDuration: 6, maxDuration: 10, minSize: 70, maxSize: 90, maxParticles: 24 };
const FLOWER_BOOST_ANIM = { duration: 2.5, travelY: -950 };

const FLOWER_SVG_SOURCE = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 2400">
  <!-- COMBINED PATH: Skull with fill-rule evenodd for holes -->
  <path
    fill="var(--particle-color)"
    fill-rule="evenodd"
    opacity="0.8"
    d="M1125.5,361.4c130-1.254,260,4.508,389.94,32.817,138.44,40.293,198.93,76.606,268.58,125.257,57.2,41.555,106.95,90.552,151.54,147.072,39.01,56.131,64.09,93.57,99.95,182.315,26.36,44.75,62.81,137.667,74.11,213.2,23.8,132.11,6.49,269.26-50.08,400.72-66.06,146.51-160.49,245.12-282.5,332.22-24.67,30.56-70.71,20.53-78,85.5-19.81,94.01-50.43,119.88-97.05,154.01-46.46,39.44-162.35,37.24-206.67-1.61-15.4,-29.38,29.54-99.01-14.82-112.4-2.5,1.25-10.62-3.12-11.25,3.75,4.37,8.12-8.12-.62-6.88,11.25-4.53,28.75-6.72,57.5-13.99,93.59-19.77,42.21-116.2,78.53-199.04,60.43-49.8,-14.29-66.77,-28.27-93.25,-46.45-13.65,-28.78-11.91,-78.79-24.34,-115.07,3.12,-8.13-5,.63-11.2,-8.23-42.855.35,-11.3,63.01,-10.71,101.54-21.391,31.82-101.482,51.67-162.87,36.83-55.939,-20.51-79.933,-38.8-107.887,-77.39-22.857,-25.5-39.013,-100.98-54.748,-144.09-130.611,-76.88-237.136,-177.86-311.9,-309.91-64.642,-103.35-114.6,-297.02-86.788,-442.73,9.5,-56.24,23.971,-116.377,48.224,-171.972,17.965,-44.577,33.668,-69.675,56.479,-124.193,58.193,-121.807,144.44,-215.56,254.564,-289.657,56.259,-33.023,101.685,-61.8,210.581,-95.15C945.5,374.225,1035.5,373.03,1125.5,361.4Z
           M796.4,1127.13c42.89-.86,106.841,15.52,135.821,36.18,57.129,39.18,89.457,69.3,120.067,161.66,18.77,59.71,6.4,132.26-19.3,186.12-42.932,65.84-73.886,104.95-181.24,135.72-47.5,12.25-95,5.32-147.289-11.27-45.458,-17.23-64.895,-34.94-94.329,-61.39-29.224,-34.14-48.487,-54.29-68.054,-126.79-23.129,-81.11,16.34,-194.22,57.395,-227.85C634.467,1177.12,690.888,1131.73,796.4,1127.13Zm799.518-.39c87.32,0.06,156.64,40.1,189.57,74.75,30.34,33.99,60.64,67.96,75.64,153.67,11.98,53.39-6.92,124.54-33.34,169.08-44.2,62.37-85.05,112.7-213.17,130.2-85.47,.22-163.44,-38.61-193.54,-73.43-31.67,-33.96-52.44,-54.47-72.07,-123.14-31.42,-78.82,10.92,-198.06,50.84,-236.52,36.99,-41.76,88.95,-88.49,197.73,-94.07C1598,1125.5,1598,1125.5,1595.92,1126.74ZM1245.5,1646.75c3.75,0,7.5,0,15.06,.34,9.51,6.77,14.85,3.8,22.37,11.27,10.43,20.08,25.65,49.18,37.99,73.76,0.29,35.64-11.9,48.35-46.63,51.95-35.87,-8.61-39.57,-53.17-58.48,-83.88C1211.32,1668.77,1225.82,1655.32,1245.5,1646.75Zm-100.26,.54c31.58,1.65,53.26,31.16,29.17,74.62-9.11,17.14-17.15,35.35-28.29,51.76-32.88,24.82-79.63,-.48-62.96,-49.45,19.57,-31.62,21.17,-66.98,55.81,-76.51C1144.25,1646.75,1144.25,1646.75,1145.24,1647.29Z"/>
  
  <!-- EYES & MOUTH OUTLINE on top -->
  <path
    fill="none"
    stroke="var(--particle-accent)"
    stroke-width="20"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="0.9"
    d="M796.4,1127.13c42.89-.86,106.841,15.52,135.821,36.18,57.129,39.18,89.457,69.3,120.067,161.66,18.77,59.71,6.4,132.26-19.3,186.12-42.932,65.84-73.886,104.95-181.24,135.72-47.5,12.25-95,5.32-147.289-11.27-45.458,-17.23-64.895,-34.94-94.329,-61.39-29.224,-34.14-48.487,-54.29-68.054,-126.79-23.129,-81.11,16.34,-194.22,57.395,-227.85C634.467,1177.12,690.888,1131.73,796.4,1127.13Zm799.518-.39c87.32,0.06,156.64,40.1,189.57,74.75,30.34,33.99,60.64,67.96,75.64,153.67,11.98,53.39-6.92,124.54-33.34,169.08-44.2,62.37-85.05,112.7-213.17,130.2-85.47,.22-163.44,-38.61-193.54,-73.43-31.67,-33.96-52.44,-54.47-72.07,-123.14-31.42,-78.82,10.92,-198.06,50.84,-236.52,36.99,-41.76,88.95,-88.49,197.73,-94.07C1598,1125.5,1598,1125.5,1595.92,1126.74ZM1245.5,1646.75c3.75,0,7.5,0,15.06,.34,9.51,6.77,14.85,3.8,22.37,11.27,10.43,20.08,25.65,49.18,37.99,73.76,0.29,35.64-11.9,48.35-46.63,51.95-35.87,-8.61-39.57,-53.17-58.48,-83.88C1211.32,1668.77,1225.82,1655.32,1245.5,1646.75Zm-100.26,.54c31.58,1.65,53.26,31.16,29.17,74.62-9.11,17.14-17.15,35.35-28.29,51.76-32.88,24.82-79.63,-.48-62.96,-49.45,19.57,-31.62,21.17,-66.98,55.81,-76.51C1144.25,1646.75,1144.25,1646.75,1145.24,1647.29Z"/>
</svg>
`;
/* =========================================
   GLOBAL VARIABLES - DOM ELEMENTS
   ========================================= */
const beeLayer = document.getElementById("bee-widget");
const imgGrass = document.getElementById("grass");
const imgPinwood = document.getElementById("pinwood");
const imgBottle = document.getElementById("bottle");
const imgGrass2 = document.getElementById("grass2");
const imgButterfly = document.getElementById("butterfly");
const beeTextPath = document.getElementById("bee-textpath");
const beePathText = document.querySelector(".bee-path-text");
const flowerParticleLayer = document.createElement("div");
const topSprite = document.createElement("img");

const goalDOM = {
  label: document.querySelector(".goalData-label span"),
  start: document.querySelector(".goalData-start span"),
  goal: document.querySelector(".goalData-goal span")
};

/* =========================================
   GLOBAL VARIABLES - IMAGE CACHE
   ========================================= */
const __imageCache = {};

/* =========================================
   GLOBAL VARIABLES - ANIMATION STATE
   ========================================= */
let unifiedRAF = null;
let isAnimationRunning = false;
let interactiveStartTime = 0;
let interactiveRAF = null;

/* =========================================
   GLOBAL VARIABLES - WIDGET STATE
   ========================================= */
let widgetFieldData = {};
let fieldData = {};
let goalData = {};
let initialized = false;
let pendingEvents = [];

/* =========================================
   GLOBAL VARIABLES - PROGRESS TRACKING
   ========================================= */
let currentCount = 0;
let displayCount = 0;
let goalValue = 100;
let goalType = "Follower";
let timeframe = "total";
let lastResetKey = null;

/* =========================================
   GLOBAL VARIABLES - DEDUPLICATION
   ========================================= */
let recentEventTimestamps = {};

/* =========================================
   GLOBAL VARIABLES - TEXT & QUEUE
   ========================================= */
let textQueue = [];
let activeText = null;
let textActive = false;

/* =========================================
   GLOBAL VARIABLES - PARTICLES
   ========================================= */
let flowerParticles = [];
let particleSpawnTimer = null;
let particleBoosted = false;
const NORMAL_SPAWN = FLOWER_PARTICLE_CONFIG.spawnInterval;

/* =========================================
   GLOBAL VARIABLES - ANIMATION & TIMERS
   ========================================= */
let activeFont = null;
let isAnimating = false;
let followQueue = [];
let timers = [];
let particleAnimationOn = true;

/* =========================================
   IMAGE CACHE FUNCTIONS
   ========================================= */

function preload(url) {
  if (!url || __imageCache[url]) return;
  const img = new Image();
  img.onload = () => (__imageCache[url] = img);
  img.src = url;
}

function setLayer(id, url) {
  if (!url) return;
  const el = document.getElementById(id);
  if (!el) return;
  el.src = url;
}

/* =========================================
   ANIMATION LOOP FUNCTIONS
   ========================================= */

function startUnifiedAnimationLoop() {
  if (isAnimationRunning) return;
  isAnimationRunning = true;

  function animate() {
    updateSmoothDisplay();
    unifiedRAF = requestAnimationFrame(animate);
  }

  unifiedRAF = requestAnimationFrame(animate);
}

function stopUnifiedAnimationLoop() {
  if (unifiedRAF) {
    cancelAnimationFrame(unifiedRAF);
    unifiedRAF = null;
  }
  isAnimationRunning = false;
}

function updateSmoothDisplay() {
  const diff = currentCount - displayCount;
  
  if (Math.abs(diff) < 0.01) {
    displayCount = currentCount;
    return;
  }
  
  displayCount += diff * 0.08;
}

/* =========================================
   DEDUPLICATION FUNCTIONS
   ========================================= */

function generateEventKey(event, listener) {
  const eventId = event._id || event.id || event.event_id || event.eventId || null;

  if (eventId && typeof eventId === "string") {
    return eventId;
  }

  const userName = event.name || event.display_name || event.displayName || event.username || event.user_name || "unknown";
  const amount = event.amount ?? event.value ?? 0;
  const timestamp = event.createdAt || event.created_at || Date.now();

  return `${listener}-${userName}-${amount}-${timestamp}`;
}

function shouldProcessEvent(event, listener) {
  const key = generateEventKey(event, listener);
  const now = Date.now();
  const lastTime = recentEventTimestamps[key];

  if (!lastTime || (now - lastTime) > DEDUP_TIMEOUT_MS) {
    recentEventTimestamps[key] = now;

    for (const k in recentEventTimestamps) {
      if ((now - recentEventTimestamps[k]) > 5000) {
        delete recentEventTimestamps[k];
      }
    }

    return true;
  }

  return false;
}

/* =========================================
   NAME RESOLVER FUNCTIONS
   ========================================= */

function resolveEventName(ev) {
  if (!ev || typeof ev !== "object") return "Someone";

  const candidates = [
    ev.displayName,
    ev.display_name,
    ev.displayname,
    ev.actor_name,
    ev.actor_display_name,
    ev.channel_name,
    ev.name,
    ev.username,
    ev.user_name,
    ev.user_login,
    ev.userName,
    ev.user && (ev.user.display_name || ev.user.name || ev.user.username),
    ev.sender && (ev.sender.displayName || ev.sender.name || ev.sender.display_name),
    ev.actor && (ev.actor.displayName || ev.actor.display_name || ev.actor.name),
    ev.author && (ev.author.display_name || ev.author.name),
    ev.from,
    ev.alias,
    ev.nick,
    ev.tags && (ev.tags["display-name"] || ev.tags["display_name"] || ev.tags.name),
    ev.data && (ev.data.user_name || ev.data.display_name || ev.data.name),
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return c.trim();
    if (typeof c === "object" && c) {
      const nested = c.displayName || c.display_name || c.name || c.username;
      if (typeof nested === "string" && nested.trim()) return nested.trim();
    }
  }

  for (const key in ev) {
    if (!Object.prototype.hasOwnProperty.call(ev, key)) continue;
    const val = ev[key];
    if (
      typeof val === "string" &&
      val.length > 1 &&
      val.length < 64 &&
      /^[^\s@<>]{2,}$/.test(val)
    ) {
      return val.trim();
    }
  }

  return "Someone";
}

/* =========================================
   FONT FUNCTIONS
   ========================================= */

function loadGoogleFont(font) {
  if (!font || font === activeFont) return;
  activeFont = font;

  const id = "dynamic-google-font";
  let link = document.getElementById(id);

  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }

  link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap`;
}

/* =========================================
   TEXT STYLING FUNCTIONS
   ========================================= */

function applyTextStyles(fieldDataParam = {}) {
  const size = Number(fieldDataParam.text_size) || 50;
  const color = fieldDataParam.fontColor || "rgb(255,255,255)";
  const weight = fieldDataParam.fontWeight || "500";
  const font = fieldDataParam.fontName || "Gaegu";

  loadGoogleFont(font);

  const root = document.documentElement;
  root.style.setProperty("--bee-font", `"${font}", sans-serif`);
  root.style.setProperty("--bee-font-size", `${size}px`);
  root.style.setProperty("--bee-font-color", color);
  root.style.setProperty("--bee-font-weight", weight);
}

function resolveGoalTitle(goalType, titleMode, customTitle) {
  const mode = String(titleMode || "default").trim();
  const title = String(customTitle || "").trim();

  if (mode === "Custom" && title.length > 0) {
    return title;
  }

  return goalType;
}

/* =========================================
   FLIP MODE FUNCTION
   ========================================= */

function applyFlipMode(flipMode) {
  const flipValue = String(flipMode || "no").toLowerCase();
  
  if (flipValue === "yes") {
    beeLayer.classList.add("flip-enabled");
  } else {
    beeLayer.classList.remove("flip-enabled");
  }
}

/* =========================================
   LIQUID FUNCTIONS
   ========================================= */

function updateLiquidPosition(val) {
  const wrap = document.getElementById("liq-wrap");
  if (!wrap) return;

  const startY = 240, endY = -75;
  const y = startY + Math.min(val / (goalValue || 1), 1) * (endY - startY);
  wrap.style.setProperty("--liq-y", `${y}px`);
}

function animateLiquidFill() {
  if (liquidRAF) cancelAnimationFrame(liquidRAF);

  function step() {
    const diff = currentCount - displayCount;
    
    if (Math.abs(diff) < 0.01) {
      displayCount = currentCount;
      updateLiquidPosition(displayCount);
      if (liquidRAF) cancelAnimationFrame(liquidRAF);
      liquidRAF = null;
      return;
    }

    displayCount += diff * 0.08;
    updateLiquidPosition(displayCount);
    liquidRAF = requestAnimationFrame(step);
  }

  liquidRAF = requestAnimationFrame(step);
}

/* =========================================
   TIMEFRAME FUNCTIONS
   ========================================= */

function getWeekKey(d = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  const weekStr = String(week).padStart(2, '0');
  return `${date.getUTCFullYear()}-W${weekStr}`;
}

function getResetKey(tf) {
  const now = new Date();
  switch (tf) {
    case "month":
      const month = String(now.getMonth() + 1).padStart(2, '0');
      return `${now.getFullYear()}-${month}`;
    case "week":
      return getWeekKey(now);
    case "session":
      return "session";
    case "manual":
      return "manual";
    default:
      return "total";
  }
}

function initializeGoal() {
  console.log("---- initializeGoal ----");
  console.log("Goal Type:", fieldData.goalType);
  console.log("Timeframe:", fieldData.timeframe);

  const goalTypeNormalized = String(fieldData.goalType || "subscriber").toLowerCase();

  // ✅ BASIS LOGIC: Load progress from goalData based on goalType + timeframe
  switch (goalTypeNormalized) {
    case "tip":
      if (fieldData.timeframe === "total") {
        currentCount = Number(goalData["tip-total"].amount.toFixed(0));
      } else if (fieldData.timeframe === "month") {
        currentCount = Number(goalData["tip-month"].amount.toFixed(0));
      } else if (fieldData.timeframe === "week") {
        currentCount = Number(goalData["tip-week"].amount.toFixed(0));
      } else if (fieldData.timeframe === "session") {
        currentCount = Number(goalData["tip-session"].amount);
      } else if (fieldData.timeframe === "manual") {
        currentCount = Number(goalData["tip-goal"].amount.toFixed(0));
      }
      break;

    case "follower":
      if (fieldData.timeframe === "total") {
        currentCount = Number(goalData["follower-total"].count);
      } else if (fieldData.timeframe === "month") {
        currentCount = Number(goalData["follower-month"].count);
      } else if (fieldData.timeframe === "week") {
        currentCount = Number(goalData["follower-week"].count);
      } else if (fieldData.timeframe === "session") {
        currentCount = Number(goalData["follower-session"].count);
      } else if (fieldData.timeframe === "manual") {
        currentCount = Number(goalData["follower-goal"].amount);
      }
      break;

    case "subscriber":
      if (fieldData.timeframe === "total") {
        currentCount = Number(goalData["subscriber-total"].count);
      } else if (fieldData.timeframe === "month") {
        currentCount = Number(goalData["subscriber-month"].count);
      } else if (fieldData.timeframe === "week") {
        currentCount = Number(goalData["subscriber-week"].count);
      } else if (fieldData.timeframe === "session") {
        currentCount = Number(goalData["subscriber-session"].count);
      } else if (fieldData.timeframe === "manual") {
        currentCount = Number(goalData["subscriber-goal"].amount);
      }
      break;

    case "cheer":
      if (fieldData.timeframe === "total") {
        currentCount = Number(goalData["cheer-total"].amount);
      } else if (fieldData.timeframe === "month") {
        currentCount = Number(goalData["cheer-month"].amount);
      } else if (fieldData.timeframe === "week") {
        currentCount = Number(goalData["cheer-week"].amount);
      } else if (fieldData.timeframe === "session") {
        currentCount = Number(goalData["cheer-session"].amount);
      } else if (fieldData.timeframe === "manual") {
        currentCount = Number(goalData["cheer-goal"].amount);
      }
      break;
  }

  const initialProgress = Number(fieldData.goalStartfrom) || 0;
  currentCount += initialProgress;

  displayCount = currentCount;

  console.log("Initial Progress Added:", initialProgress);
  console.log("Initialized currentCount:", currentCount);
  console.log("---- END initializeGoal ----");
}

function resetProgress() {
  console.log(`[RESET] Resetting progress for timeframe: ${timeframe}`);
  initializeGoal();
  updateLiquidPosition(currentCount);
  recentEventTimestamps = {};
  if (goalDOM.start) goalDOM.start.textContent = currentCount;
}

/* =========================================
   TIMER HELPERS
   ========================================= */

function clearTimers() {
  timers.forEach(clearTimeout);
  timers = [];
}

function addTimer(fn, t) {
  timers.push(setTimeout(fn, t));
}

/* =========================================
   SPRITE FUNCTIONS
   ========================================= */

function playBee(src) {
  if (!topSprite) return;
  if (topSprite.src !== src) topSprite.src = src;
}

/* =========================================
   TEXT PATH FUNCTIONS
   ========================================= */

function queueTextPath(text) {
  textQueue.push(text);
}

function consumeNextText() {
  activeText = textQueue.shift() || null;
  
  if (!activeText || !beeTextPath) {
    textActive = false;
    if (beePathText) beePathText.style.opacity = "0";
    return;
  }

  beeTextPath.textContent = activeText;
  beeTextPath.setAttribute("startOffset", "0%");
  if (beePathText) beePathText.style.opacity = "0";
  textActive = true;
}

function updateTextPathByFrame(elapsedMs) {
  if (!textActive) return;

  const frame = elapsedMs / FRAME_TIME;
  let progress;

  if (frame < TEXT_PATH_FRAMES.start) {
    if (beePathText) beePathText.style.opacity = "0";
    return;
  }

  if (beePathText) beePathText.style.opacity = "1";

  if (frame < TEXT_PATH_FRAMES.pauseStart) {
    progress = (frame - TEXT_PATH_FRAMES.start) / (TEXT_PATH_FRAMES.pauseStart - TEXT_PATH_FRAMES.start) * TEXT_PATH_STOP_POSITION;
  } else if (frame < TEXT_PATH_FRAMES.pauseEnd) {
    progress = TEXT_PATH_STOP_POSITION;
  } else if (frame < TEXT_PATH_FRAMES.end) {
    progress = TEXT_PATH_STOP_POSITION + (frame - TEXT_PATH_FRAMES.pauseEnd) / (TEXT_PATH_FRAMES.end - TEXT_PATH_FRAMES.pauseEnd) * (1 - TEXT_PATH_STOP_POSITION);
  } else {
    if (beePathText) beePathText.style.opacity = "0";
    textActive = false;
    return;
  }

  if (beeTextPath) beeTextPath.setAttribute("startOffset", `${progress * 100}%`);
}

function startInteractiveTimeline() {
  interactiveStartTime = performance.now();

  function step(now) {
    const elapsed = now - interactiveStartTime;
    updateTextPathByFrame(elapsed);

    if (elapsed < TOTAL_TIME) {
      interactiveRAF = requestAnimationFrame(step);
    } else {
      if (beePathText) beePathText.style.opacity = "0";
      textActive = false;
      if (interactiveRAF) cancelAnimationFrame(interactiveRAF);
      interactiveRAF = null;
    }
  }

  if (interactiveRAF) cancelAnimationFrame(interactiveRAF);
  interactiveRAF = requestAnimationFrame(step);
}

/* =========================================
   ANIMATION CONTROLLERS
   ========================================= */

function ensureQueueRunning() {
  if (!isAnimating && followQueue.length > 0) {
    playAmountAnimation(followQueue.shift());
  }
}

function playFollowAnimation() {
  if (isAnimating) {
    followQueue.push(1);
    return;
  }

  isAnimating = true;
  clearTimers();
  playBee(IMG.interactive);
  consumeNextText();
  startInteractiveTimeline();

  addTimer(() => {
    currentCount++;
    if (goalDOM.start) goalDOM.start.textContent = currentCount;
    animateLiquidFill();
    boostFlowerSpawnIfComplete();
  }, FILL_TIME);

  addTimer(() => {
    playBee(IMG.idle);
    addTimer(() => {
      isAnimating = false;
      ensureQueueRunning();
    }, 2500);
  }, TOTAL_TIME);
}

function playAmountAnimation(amount) {
  if (isAnimating) {
    followQueue.push(amount);
    return;
  }

  isAnimating = true;
  clearTimers();
  playBee(IMG.interactive);
  consumeNextText();
  startInteractiveTimeline();

  addTimer(() => {
    currentCount += amount;
    if (goalDOM.start) goalDOM.start.textContent = currentCount;
    animateLiquidFill();
    boostFlowerSpawnIfComplete();
  }, FILL_TIME);

  addTimer(() => {
    playBee(IMG.idle);
    addTimer(() => {
      isAnimating = false;
      ensureQueueRunning();
    }, 2500);
  }, TOTAL_TIME);
}

/* =========================================
   PARTICLE FUNCTIONS
   ========================================= */

function createFlowerParticle() {
  if (flowerParticles.length >= FLOWER_PARTICLE_CONFIG.maxParticles) return;

  const el = document.createElement("div");
  const isBoost = particleBoosted;

  const scaleFactor = 0.5 + Math.random() * 2.5;
  const baseSize = FLOWER_PARTICLE_CONFIG.minSize + Math.random() * (FLOWER_PARTICLE_CONFIG.maxSize - FLOWER_PARTICLE_CONFIG.minSize);
  const size = baseSize * scaleFactor;
  const duration = isBoost ? FLOWER_BOOST_ANIM.duration : FLOWER_PARTICLE_CONFIG.minDuration + Math.random() * (FLOWER_PARTICLE_CONFIG.maxDuration - FLOWER_PARTICLE_CONFIG.minDuration);
  const startX = Math.random() * 100;
  const driftX = Math.random() * 120 - 60;
  const curve1 = driftX * 0.3;
  const curve2 = driftX * -0.4;
  const rotate = Math.random() * 360;

  el.style.position = "absolute";
  el.style.left = `${startX}%`;
  el.style.bottom = `-80px`;
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  el.style.opacity = "0";
  el.style.filter = "drop-shadow(0 2px 6px rgba(255,255,255,0.4))";

  el.innerHTML = FLOWER_SVG_SOURCE;

  el.animate(
    [
      { transform: `translate(0,0) scale(0.6) rotate(0deg)`, opacity: 0 },
      { transform: `translate(${curve1}px, -150px) scale(0.8) rotate(${rotate * 0.3}deg)`, opacity: 1, offset: 0.25 },
      { transform: `translate(${curve2}px, -350px) scale(1) rotate(${rotate * 0.6}deg)`, offset: 0.6 },
      { transform: `translate(${driftX}px, ${isBoost ? FLOWER_BOOST_ANIM.travelY : -500}px) scale(1) rotate(${rotate}deg)`, opacity: 0 }
    ],
    { duration: duration * 1000, easing: "linear", fill: "forwards" }
  );

  flowerParticleLayer.appendChild(el);
  flowerParticles.push(el);

  setTimeout(() => {
    el.remove();
    flowerParticles = flowerParticles.filter(p => p !== el);
  }, duration * 1000 + 100);
}

function startFlowerParticles() {
  if (particleSpawnTimer) return;
  particleSpawnTimer = setInterval(createFlowerParticle, FLOWER_PARTICLE_CONFIG.spawnInterval);
}

function stopFlowerParticles() {
  clearInterval(particleSpawnTimer);
  particleSpawnTimer = null;
}

function burstFlowers(count = 12) {
  for (let i = 0; i < count; i++) {
    setTimeout(createFlowerParticle, i * 40);
  }
}

function boostFlowerSpawnIfComplete() {
  if (!particleAnimationOn) return;
  if (particleBoosted) return;

  if (currentCount >= goalValue) {
    particleBoosted = true;
    burstFlowers(18);
    stopFlowerParticles();
    FLOWER_PARTICLE_CONFIG.spawnInterval = NORMAL_SPAWN / 3;
    FLOWER_PARTICLE_CONFIG.maxParticles = 72;
    startFlowerParticles();
  }
}

(function () {
  const originalReset = resetProgress;
  resetProgress = function () {
    particleBoosted = false;
    FLOWER_PARTICLE_CONFIG.spawnInterval = NORMAL_SPAWN;
    FLOWER_PARTICLE_CONFIG.maxParticles = 24;
    stopFlowerParticles();
    startFlowerParticles();
    originalReset();
  };
})();

/* =========================================
   EVENT HANDLING FUNCTIONS
   ========================================= */

function handleIncomingEvent(e) {
  const listener = String(e.detail.listener || "").toLowerCase();
  const event = e.detail.event || {};

  if (!shouldProcessEvent(event, listener)) {
    console.log("[EVENT] Duplicate blocked");
    return;
  }

  const currentResetKey = getResetKey(timeframe);
  if (timeframe !== "total" && timeframe !== "manual" && currentResetKey !== lastResetKey) {
    console.log(`[RESET] Timeframe changed: ${lastResetKey} → ${currentResetKey}`);
    resetProgress();
    lastResetKey = currentResetKey;
  }

  console.log("==== EVENT RECEIVED ====");
  console.log("Listener:", listener);
  console.log("Event Data:", event);

  const name = resolveEventName(event);
  const goalTypeNormalized = String(fieldData.goalType || "subscriber").toLowerCase();
  const eventKey = `${goalTypeNormalized}-${listener}`;

  switch (eventKey) {
    case "follower-follower-latest":
    case "subscriber-subscriber-latest":
      console.log("Processing follow/sub event");

      if (event.bulkGifted === true) {
        console.log("Bulk gifted detected:", event.amount);
        const bulkAmount = Number(event.amount) || 0;
        queueTextPath(`${name} gifted ${bulkAmount} subs!`);
        playAmountAnimation(bulkAmount);
        return;
      }

      const allowResubs = String(fieldData.SubscribersSetting || "yes").toLowerCase() === "yes";

      if (!allowResubs && (event.isResub === true || event.gifted === true)) {
        console.log("Skipped resubscriber/gifted due to setting");
        return;
      }

      if (event.isCommunityGift === true) {
        console.log("Skipped community gift duplicate");
        return;
      }

      console.log("Adding +1 to progress");
      queueTextPath(`${name} subscribed!`);
      playFollowAnimation();
      return;

    case "tip-tip-latest":
      console.log("Processing tip:", event.amount);
      const tipAmount = Number(event.amount) || 0;
      if (tipAmount > 0) {
        queueTextPath(`${name} tipped ${tipAmount}!`);
        playAmountAnimation(tipAmount);
      }
      return;

    case "donation-donation-latest":
      console.log("Processing donation:", event.amount);
      const donationAmount = Number(event.amount) || 0;
      if (donationAmount > 0) {
        queueTextPath(`${name} donated ${donationAmount}!`);
        playAmountAnimation(donationAmount);
      }
      return;

    case "cheer-cheer-latest":
    case "bits-bits-latest":
      console.log("Processing cheer:", event.amount);
      const cheerAmount = Number(event.amount) || Number(event.bits) || 0;
      if (cheerAmount > 0) {
        queueTextPath(`${name} cheered ${cheerAmount} bits!`);
        playAmountAnimation(cheerAmount);
      }
      return;

    case "host-host-latest":
      console.log("Processing host:", event.viewers);
      const viewers = Number(event.viewers) || Number(event.amount) || 1;
      queueTextPath(`${name} hosted with ${viewers} viewers!`);
      playAmountAnimation(viewers);
      return;

    case "raid-raid-latest":
      console.log("Processing raid:", event.raiders);
      const raiders = Number(event.raiders) || Number(event.amount) || 1;
      queueTextPath(`${name} raided with ${raiders} raiders!`);
      playAmountAnimation(raiders);
      return;

    default:
      console.log("Event key not matched:", eventKey);
  }

  console.log("==== END EVENT ====");
}
/* =========================================
   EVENT LISTENERS
   ========================================= */

window.addEventListener("onEventReceived", e => {
  if (!initialized) {
    pendingEvents.push(e);
    return;
  }

  try {
    handleIncomingEvent(e);
  } catch (err) {
    console.error("[ERROR] Event handling failed:", err);
  }
});

window.addEventListener("onWidgetLoad", e => {
  try {
    console.log("==== WIDGET LOAD ====");

    fieldData = e.detail.fieldData || {};
    goalData = e.detail.session.data || {};
    widgetFieldData = fieldData;

    console.log("Field Data:", fieldData);
    console.log("Goal Data:", goalData);

    // ✅ Normalize goal type
    let rawGoalType = String(fieldData.goalType || "Subscriber");
    goalType = rawGoalType.charAt(0).toUpperCase() + rawGoalType.slice(1).toLowerCase();

    // ✅ Set up static images
    if (imgGrass) imgGrass.src = IMG.grass;
    if (imgPinwood) imgPinwood.src = IMG.pinwood;
    if (imgBottle) imgBottle.src = IMG.bottle;
    if (imgGrass2) imgGrass2.src = IMG.grass2;
    if (imgButterfly) imgButterfly.src = IMG.butterfly;

    // ✅ Set up top sprite
    Object.assign(topSprite.style, {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 99999
    });
    if (beeLayer) beeLayer.appendChild(topSprite);
    playBee(IMG.idle);

    // ✅ Preload images
    preload(IMG.interactive);
    preload(IMG.idle);

    // ✅ Set goal values
    goalValue = Number(fieldData.goal) || 100;
    timeframe = fieldData.timeframe || "total";

    // ✅ Track reset key
    lastResetKey = getResetKey(timeframe);

    // ✅ Set DOM elements
    if (goalDOM.label) goalDOM.label.textContent = resolveGoalTitle(goalType, fieldData.titleMode, fieldData.CustomTitle);
    if (goalDOM.goal) goalDOM.goal.textContent = goalValue;

    // ✅ Apply text styles
    applyTextStyles(fieldData);

    // ✅ Apply flip mode
    applyFlipMode(fieldData.flipMode);

    // ✅ Initialize goal progress (BASIS LOGIC)
    initializeGoal();

    if (goalDOM.start) goalDOM.start.textContent = currentCount;
    updateLiquidPosition(currentCount);

    // ✅ Set particle color
    const particleColor = fieldData.Particle || "#ffb7d5";
    const particleAccent = fieldData.ParticleAccent || "#FCD403";
    document.documentElement.style.setProperty("--particle-color", particleColor);
    document.documentElement.style.setProperty("--particle-accent", particleAccent);

    // ✅ Set up particle layer
    flowerParticleLayer.style.position = "absolute";
    flowerParticleLayer.style.inset = "0";
    flowerParticleLayer.style.pointerEvents = "none";
    flowerParticleLayer.style.overflow = "hidden";
    flowerParticleLayer.style.zIndex = "1000";
    if (beeLayer) beeLayer.appendChild(flowerParticleLayer);

    // ✅ Particle settings
    particleAnimationOn = fieldData.ParticleAnimation !== "off";
    if (!particleAnimationOn) stopFlowerParticles();
    else startFlowerParticles();

    // ✅ Event alert
    const eventAlertOn = fieldData.eventAlert !== "off";
    if (beePathText) beePathText.style.display = eventAlertOn ? "" : "none";

    // ✅ Timeframe auto-reset check
    setInterval(() => {
      const currentKey = getResetKey(timeframe);
      if (lastResetKey !== currentKey) {
        console.log(`[TIMEFRAME] Resetting progress: ${lastResetKey} → ${currentKey}`);
        resetProgress();
        lastResetKey = currentKey;
      }
    }, 1000);

    // ✅ Start animation loop
    startUnifiedAnimationLoop();

    // ✅ Mark initialized and drain pending events
    initialized = true;

    while (pendingEvents.length) {
      const ev = pendingEvents.shift();
      try {
        handleIncomingEvent(ev);
      } catch (err) {
        console.error("[ERROR] Pending event failed:", err);
      }
    }

    console.log(`[INIT] Bee widget loaded successfully
      - Goal Type: ${goalType}
      - Goal Amount: ${goalValue}
      - Timeframe: ${timeframe}
      - Current Progress: ${currentCount}
      - Flip Mode: ${fieldData.flipMode}
      - Unified animation loop active`);

  } catch (err) {
    console.error("[ERROR] Widget load failed:", err);
  }
});

/* =========================================
   VISIBILITY & CLEANUP HANDLERS
   ========================================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("[VISIBILITY] Page hidden - stopping animation");
    stopFlowerParticles();
  } else {
    console.log("[VISIBILITY] Page visible - resuming animation");
    if (particleAnimationOn) startFlowerParticles();
  }
});

window.addEventListener("beforeunload", () => {
  console.log("[UNLOAD] Page unloading - stopping animation");
  stopUnifiedAnimationLoop();
  stopFlowerParticles();
});
