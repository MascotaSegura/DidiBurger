/**
 * sounds.js — Centralized audio feedback utility.
 *
 * Volumes are balanced (0.40-0.60) so all sounds feel like the same family.
 * Paths are built using import.meta.env.BASE_URL so they work correctly
 * both on localhost (base = '/') AND on GitHub Pages (base = '/DidiBurger/').
 * Audio elements are lazily created and cached per session.
 * Any error (autoplay block, 404, unsupported format) fails silently.
 */

const cache = {};

// import.meta.env.BASE_URL ends with '/', e.g. '/' or '/DidiBurger/'
const BASE = import.meta.env.BASE_URL;

const SOUNDS = {
  // Short, clean click for opening panels/modals
  click:    { src: `${BASE}sounds/click_001.ogg`,        volume: 0.55 },
  // "Drop" metaphor: item landing in the cart
  addToCart: { src: `${BASE}sounds/drop_001.ogg`,         volume: 0.60 },
  // Positive, celebratory: order confirmed
  confirm:  { src: `${BASE}sounds/confirmation_001.ogg`,  volume: 0.55 },
  // Named "switch" — matches the delivery mode toggle exactly
  toggle:   { src: `${BASE}sounds/switch_001.ogg`,        volume: 0.50 },
  // Soft dismissal for closing panels/modals
  close:    { src: `${BASE}sounds/close_001.ogg`,         volume: 0.45 },
  // Selection tick for choosing from a list
  select:   { src: `${BASE}sounds/select_001.ogg`,        volume: 0.50 },
};

function getAudio(key) {
  if (!cache[key]) {
    const { src, volume } = SOUNDS[key];
    const audio = new Audio(src);
    audio.volume = volume;
    audio.preload = 'auto';
    cache[key] = audio;
  }
  return cache[key];
}

export function playSound(key) {
  try {
    const audio = getAudio(key);
    // Reset position so rapid replays work correctly
    audio.currentTime = 0;
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Autoplay blocked before first user gesture — ignore silently
      });
    }
  } catch (e) {
    // Fail silently on any audio API error
  }
}
