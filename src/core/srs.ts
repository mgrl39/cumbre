/* Repaso espaciado (SM-2 simplificado) con evaluación continua.
   El intervalo solo crece si aciertas cuando toca (o casi): repetir la palabra 5 veces el mismo día cuenta
   como práctica, pero no la «consolida». Para darla por dominada hace falta haberla acertado en días distintos
   a lo largo de semanas. Un fallo la devuelve a «Aprendiendo». */
import type { SrsCard, State } from './store.ts';
import { today } from './text.ts';

const MIN = 60_000;
const DAY = 86_400_000;

/** ¿Toca ya repasarla? Se admite adelantarse un 15 % del intervalo. */
export const isReady = (c: SrsCard, now = Date.now()) => now >= c.due - Math.min(c.ivl, 30) * 0.15 * DAY;

export function review(card: SrsCard | undefined, ok: boolean, now = Date.now(), dayKey = today()): SrsCard {
  const c: SrsCard = card ? { ...card } : { due: now, ivl: 0, ease: 2.5, reps: 0, lapses: 0, h: 0, dd: 0 };
  if (ok) {
    c.h = (c.h ?? 0) + 1;
    if (c.ld !== dayKey) {
      c.dd = (c.dd ?? 0) + 1;
      c.ld = dayKey;
    }
    if (!card || isReady(card, now)) {
      c.reps += 1;
      c.ivl = c.reps === 1 ? 1 : c.reps === 2 ? 3 : Math.round(Math.max(c.ivl, 1) * c.ease);
      c.ease = Math.min(3, c.ease + 0.05);
      c.due = now + c.ivl * DAY;
    }
  } else {
    c.lapses += 1;
    c.reps = 0;
    c.ivl = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now + 10 * MIN;
  }
  return c;
}

export type Stage = 'new' | 'learning' | 'young' | 'solid' | 'mature';
export function stage(c?: SrsCard): Stage {
  if (!c) return 'new';
  if (c.ivl < 3) return 'learning';
  if (c.ivl < 21) return 'young';
  if (c.ivl < 60 || (c.dd ?? 0) < 5) return 'solid';
  return 'mature';
}
export const STAGE_NAME: Record<Stage, string> = {
  new: 'Nueva',
  learning: 'Aprendiendo',
  young: 'Consolidando',
  solid: 'Sólida',
  mature: 'Dominada',
};
export const STAGE_HINT: Record<Stage, string> = {
  new: 'Aún no la has visto.',
  learning: 'Vista hace poco: tiene que volver a salir otro día.',
  young: 'Acertada en días distintos; el repaso se va espaciando (3–20 días).',
  solid: 'Aguanta semanas sin verla (21+ días).',
  mature: 'Acertada en 5+ días distintos y aguanta 2 meses sin verla.',
};

/** Dominio de una tarjeta (0..1), realista: haberla visto una vez es casi nada. */
export function cardMastery(c?: SrsCard): number {
  if (!c) return 0;
  if (c.ivl <= 0) return 0.03;
  const m = Math.min(1, Math.log(1 + c.ivl) / Math.log(61));
  return (c.dd ?? 0) >= 5 ? m : Math.min(m, 0.95);
}

export function dueIds(s: State, prefix?: string, now = Date.now()): string[] {
  return Object.entries(s.srs)
    .filter(([id, c]) => c.due <= now && (!prefix || id.startsWith(prefix)))
    .sort((a, b) => a[1].due - b[1].due)
    .map(([id]) => id);
}
