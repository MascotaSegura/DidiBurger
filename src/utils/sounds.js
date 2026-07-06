/**
 * sounds.js — Centralized audio feedback utility.
 *
 * Sound selection rationale (Kenney "Interface Sounds" pack):
 *   open     → click_004.ogg        — Clean, balanced click for opening modals
 *   addToCart → drop_004.ogg        — Heaviest drop in the pack: satisfying "landing" feedback
 *   confirm  → confirmation_003.ogg — Richer than _001, shorter/snappier than _002 and _004
 *   toggle   → toggle_004.ogg       — Shortest of the toggle set: precise and clean
 *   close    → minimize_007.ogg     — Compact "collapse" sound, better than close_001 (too heavy)
 *   select   → glass_003.ogg        — Premium glass tap: clearly distinct from click
 *
 * Volumes are balanced (0.45–0.60) so all sounds feel like the same family.
 * Paths use import.meta.env.BASE_URL so they resolve correctly in both
 * localhost (base='/') and GitHub Pages (base='/DidiBurger/').
 * Audio elements are lazily created and cached per session.
 * Any error (autoplay policy, 404, unsupported format) fails silently.
 */

const cache = {};
const BASE = import.meta.env.BASE_URL;

const SOUNDS = {
  open:     { src: `${BASE}sounds/open.ogg`,      volume: 0.55 },
  addToCart: { src: `${BASE}sounds/add-cart.ogg`, volume: 0.60 },
  confirm:  { src: `${BASE}sounds/confirm.ogg`,   volume: 0.55 },
  toggle:   { src: `${BASE}sounds/toggle.ogg`,    volume: 0.50 },
  close:    { src: `${BASE}sounds/close.ogg`,     volume: 0.45 },
  select:   { src: `${BASE}sounds/select.ogg`,    volume: 0.50 },
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
    audio.currentTime = 0;
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {});
    }
  } catch (e) {
    // Fail silently on any audio API error
  }
}
