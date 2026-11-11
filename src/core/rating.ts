/*
 * Nivel por skill (independiente para cada una).
 * Modelo tipo IRT/Elo: cada skill tiene un rating r (1=A1 … 6=C2) y cada ítem una dificultad d (su nivel CEFR).
 * Con r = d se espera ~75 % de aciertos en ese nivel: "tener" un nivel = dominarlo, no solo aprobarlo.
 * Se corrige por azar en preguntas de opción múltiple.
 */
import type { Level } from './types.ts';
import { LEVELS } from './types.ts';

export function pCorrect(r: number, d: number, guess = 0): number {
  const core = 1 / (1 + Math.exp(-(1.8 * (r - d) + 1.1)));
  return guess + (1 - guess) * core;
}

/** K grande al principio (incertidumbre alta), pequeño después. */
export function kFactor(n: number, placement = false): number {
  if (placement) return Math.max(0.35, 1.4 / Math.sqrt(1 + n / 2));
  return Math.max(0.06, 0.6 / Math.sqrt(1 + n / 8));
}

export function updateRating(r: number, n: number, d: number, ok: boolean, guess = 0, placement = false): number {
  const p = pCorrect(r, d, guess);
  const next = r + kFactor(n, placement) * ((ok ? 1 : 0) - p);
  return Math.max(0.6, Math.min(6.4, next));
}

export function levelOf(r: number): { level: Level; pct: number; label: string } {
  const f = Math.max(1, Math.min(6, Math.floor(r)));
  const pct = r >= 6 ? 100 : Math.round((r - f) * 100);
  const level = LEVELS[f - 1];
  return { level, pct: Math.max(0, pct), label: r >= 6 ? 'C2' : `${level} · ${Math.max(0, pct)}%` };
}

/** Elige la dificultad del siguiente ítem: casi siempre en tu nivel, a veces repaso abajo o reto arriba. */
export function targetLevel(r: number): number {
  const base = Math.max(1, Math.min(5, Math.floor(r)));
  const x = Math.random();
  if (x < 0.15 && base > 1) return base - 1;
  if (x > 0.8 + (1 - (r - Math.floor(r))) * 0.1) return Math.min(5, base + 1);
  return base;
}
