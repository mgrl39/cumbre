/* Maestría = evaluación continua.
   Nada se marca como «sabido»: se demuestra respondiendo. Y no vale lo mismo acertar 10 veces seguidas hoy
   que 5 hoy y 6 la semana que viene: cada día solo cuenta un número limitado de aciertos, y cada nivel de
   maestría exige además un mínimo de días distintos.
   Aprobar es fácil (10 aciertos en 2 días); ser Maestro es otra cosa: 1.000 aciertos en 30+ días distintos y,
   en los temas de gramática, 100 de ellos a ciegas en la Rueda. Niveles: 10 → 100 → 300 → 600 → 1.000. */
import type { Ev, State } from './store.ts';
import type { Skill } from './types.ts';

export const TIERS = [
  { name: 'Sin empezar', icon: '○', hits: 0, days: 0 },
  { name: 'Aprobado', icon: '✅', hits: 10, days: 2 },
  { name: 'Bronce', icon: '🥉', hits: 100, days: 7 },
  { name: 'Plata', icon: '🥈', hits: 300, days: 14 },
  { name: 'Oro', icon: '🥇', hits: 600, days: 21 },
  { name: 'Maestro', icon: '👑', hits: 1000, days: 30 },
] as const;
export const PASS_TIER = 1;
export const MASTER_TIER = TIERS.length - 1;
/** Aciertos A CIEGAS (en la Rueda, sin saber de qué tema es) que exige cada nivel de un tema de gramática. */
export const BLIND_NEED = [0, 0, 5, 20, 50, 100] as const;

/** Aciertos máximos que cuentan por día (el resto suma XP, pero no maestría). */
export const DAILY_CAP = { topic: 25, skill: 150, all: 400, level: 60, group: 50, blind: 10 } as const;
export const TAG_LABEL: Record<string, string> = { core: 'General', academic: 'Académico', linker: 'Conectores', phrasal: 'Phrasal verbs', phrase: 'Para defenderte', 'false-friend': 'Falsos amigos', custom: 'Mis palabras' };
export type EvKind = keyof typeof DAILY_CAP;

export const emptyEv = (): Ev => ({ h: 0, m: 0, d: 0, ld: '', th: 0, r: '' });

/** Registra una respuesta. Devuelve true si ese acierto ha contado para la maestría. */
export function recordEv(e: Ev, ok: boolean, cap: number, dayKey: string): boolean {
  e.r = (e.r + (ok ? '1' : '0')).slice(-20);
  if (!ok) {
    e.m++;
    return false;
  }
  if (e.ld !== dayKey) {
    e.d++;
    e.ld = dayKey;
    e.th = 0;
  }
  if (e.th >= cap) return false;
  e.th++;
  e.h++;
  return true;
}

/** Acierto reciente (últimas 20). Con pocos datos, la media global. */
export function recentAcc(e?: Ev): number {
  if (!e) return 0;
  if (e.r.length >= 6) return [...e.r].filter((x) => x === '1').length / e.r.length;
  return e.h + e.m ? e.h / (e.h + e.m) : 0;
}

/** Nivel alcanzado: hacen falta aciertos, días distintos y acertar al menos el 70 % últimamente.
    Si se pasa `blind` (temas de gramática), cada nivel exige además aciertos a ciegas. */
export function tierOf(e?: Ev, blind?: number): number {
  if (!e) return 0;
  let t = 0;
  const acc = recentAcc(e) >= 0.7;
  for (let i = 1; i < TIERS.length; i++) if (acc && e.h >= TIERS[i].hits && e.d >= TIERS[i].days && (blind === undefined || blind >= BLIND_NEED[i])) t = i;
  return t;
}

/** Progreso hacia el siguiente nivel (0..1): manda lo que más falte, aciertos, días o aciertos a ciegas. */
export function tierProgress(e?: Ev, blind?: number): { tier: number; next?: (typeof TIERS)[number]; pct: number; hits: number; days: number; blind?: number; blindNeed?: number } {
  const tier = tierOf(e, blind);
  const next = TIERS[tier + 1];
  const hits = e?.h ?? 0,
    days = e?.d ?? 0;
  if (!next) return { tier, pct: 1, hits, days, blind };
  const need = BLIND_NEED[tier + 1];
  const bp = blind === undefined || !need ? 1 : blind / need;
  return { tier, next, pct: Math.min(hits / next.hits, days / next.days, bp, 1), hits, days, blind, blindNeed: blind === undefined ? undefined : need };
}
/** Progreso hacia Maestro (0..1). */
export function masterPct(e?: Ev, blind?: number): number {
  if (!e) return 0;
  const m = TIERS[MASTER_TIER];
  return Math.min(e.h / m.hits, e.d / m.days, blind === undefined ? 1 : blind / BLIND_NEED[MASTER_TIER], 1);
}

/** Dominio para el currículo (0..1): llegar a Bronce = 100 aciertos en ≥ 7 días, acertando ≥ 80 %. */
export function domain(e?: Ev): number {
  if (!e) return 0;
  const base = Math.min(e.h / 100, e.d / 7, 1);
  const acc = recentAcc(e);
  return base * Math.min(1, acc / 0.8);
}

export const evOf = (s: State, key: string) => s.ev[key];
export const skillEv = (s: State, k: Skill) => s.ev['sk:' + k];
export const topicEv = (s: State, id: string) => s.ev['t:' + id];
export const blindHits = (s: State, id: string) => s.ev['w:' + id]?.h ?? 0;
export const topicTier = (s: State, id: string) => tierOf(s.ev['t:' + id], blindHits(s, id));
export const fmt = (n: number) => n.toLocaleString('es');
