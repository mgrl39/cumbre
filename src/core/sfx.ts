/* Sonidos cortos sintetizados con WebAudio (sin archivos): acierto, fallo, fin de sesión, subida de maestría. */
import { getState } from './store.ts';

type Wave = 'sine' | 'triangle' | 'square' | 'sawtooth';
let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx ||= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/** Una nota: frecuencia (con glissando opcional a `to`), inicio y duración en segundos. */
function note(a: AudioContext, f: number, at: number, dur: number, wave: Wave = 'sine', vol = 0.16, to?: number) {
  const t0 = a.currentTime + at;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = wave;
  o.frequency.setValueAtTime(f, t0);
  if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.03);
}

export type Sfx = 'ok' | 'bad' | 'done' | 'tier' | 'tick';
export function sfx(name: Sfx, force = false) {
  if (!force && !getState().settings.sound) return;
  const a = audio();
  if (!a) return;
  switch (name) {
    case 'ok': // dos notas ascendentes, brillantes (≈ 0,25 s)
      note(a, 784, 0, 0.11, 'triangle', 0.17);
      note(a, 1175, 0.09, 0.2, 'triangle', 0.17);
      note(a, 2350, 0.09, 0.16, 'sine', 0.05);
      break;
    case 'bad': // dos notas graves descendentes, apagadas (≈ 0,3 s)
      note(a, 233, 0, 0.14, 'triangle', 0.2);
      note(a, 156, 0.13, 0.22, 'triangle', 0.2, 138);
      break;
    case 'done': // arpegio corto
      [523, 659, 784, 1047].forEach((f, i) => note(a, f, i * 0.09, 0.22, 'triangle', 0.14));
      break;
    case 'tier':
      [659, 880, 1109, 1319].forEach((f, i) => note(a, f, i * 0.08, 0.3, 'sine', 0.13));
      break;
    case 'tick':
      note(a, 620, 0, 0.05, 'sine', 0.07);
      break;
  }
}
