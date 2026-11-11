/* Estado global persistente en localStorage. Sin dependencias: useSyncExternalStore. */
import { useSyncExternalStore } from 'react';
import type { Skill } from './types.ts';
import { today } from './text.ts';

export interface SkillState {
  /** Rating continuo: 1 = A1 ... 6 = C2. La parte decimal es el progreso dentro del nivel. */
  r: number;
  n: number;
  placed: boolean;
  history: { t: number; r: number }[];
}
export interface ItemStat {
  s: number;
  c: number;
  last: number;
  recent: string;
}
export interface SrsCard {
  due: number;
  ivl: number;
  ease: number;
  reps: number;
  lapses: number;
  /** aciertos totales */
  h?: number;
  /** días distintos con al menos un acierto */
  dd?: number;
  /** último día con acierto (YYYY-MM-DD) */
  ld?: string;
  /** (obsoleto) marcas antiguas de «ya me la sé»: se migran a tarjetas normales */
  known?: boolean;
}
/** Evidencia acumulada para la maestría (temas, skills, global). */
export interface Ev {
  /** aciertos que cuentan (con tope diario: repetir 50 veces el mismo día no vale como 50) */
  h: number;
  /** fallos */
  m: number;
  /** días distintos con aciertos */
  d: number;
  /** último día con aciertos */
  ld: string;
  /** aciertos contados ese último día */
  th: number;
  /** últimos 20 resultados (1/0) */
  r: string;
}
/** Un fallo pendiente de corregir: sale del registro al acertarlo en 2 días distintos. */
export interface Fail {
  /** veces fallado */
  n: number;
  /** último fallo */
  t: number;
  /** lo que respondiste */
  g: string;
  /** enunciado (resumen) */
  q: string;
  /** respuesta correcta */
  a: string;
  sk: Skill;
  /** etiqueta del ejercicio */
  l: string;
  /** tema de gramática, si lo hay */
  tp?: string;
  /** aciertos desde el último fallo (cuenta uno por día) */
  fix: number;
  /** día del último acierto */
  fd?: string;
}
export interface ExamStat {
  best: number;
  last: number;
  t: number;
  n: number;
}
export interface TopicStat {
  s: number;
  c: number;
  pts: number;
  rank: number;
  recent: string;
}
export interface DayStat {
  xp: number;
  n: number;
  c: number;
  grammar: number;
  vocab: number;
  reading: number;
  listening: number;
  writing: number;
  texts: number;
  essays: number;
  reviews: number;
  bestRun: number;
  learned: number;
  minutes: number;
  /** nivel de cada skill al empezar y al terminar el día (para ver cuánto avanzaste) */
  r0?: Partial<Record<Skill, number>>;
  r1?: Partial<Record<Skill, number>>;
  /** temas de gramática tocados ese día */
  topics?: string[];
}
export interface Essay {
  id: string;
  t: number;
  promptId: string;
  text: string;
  words: number;
  score: number;
  self?: number;
}
export interface CustomWord {
  id: string;
  word: string;
  es: string;
  ex: string;
  t: number;
}
export interface SavedText {
  id: string;
  title: string;
  text: string;
  t: number;
}
export interface Settings {
  rate: number;
  /** voz del sistema (respaldo) */
  voice: string;
  engine: 'neural' | 'system';
  neuralVoice: string;
  timer: boolean;
  /** máximo de respuestas al día (no hay mínimo). Los repasos no cuentan para el máximo. */
  dailyMax: number;
  /** máximo de palabras nuevas al día */
  newWordsMax: number;
  theme: 'auto' | 'light' | 'dark';
  /** sonidos de acierto / fallo */
  sound: boolean;
  /** empezó de cero: no se le ofrece la prueba de nivel */
  zero?: boolean;
}

export interface State {
  v: 1;
  created: number;
  skills: Record<Skill, SkillState>;
  items: Record<string, ItemStat>;
  srs: Record<string, SrsCard>;
  topics: Record<string, TopicStat>;
  days: Record<string, DayStat>;
  xp: number;
  achievements: Record<string, number>;
  path: Record<string, { best: number; done: boolean; answered?: number }>;
  /** maestría por clave: 'all', 'sk:<skill>', 't:<topicId>' */
  ev: Record<string, Ev>;
  /** fallos pendientes de corregir, por id de ejercicio (o de palabra) */
  fails: Record<string, Fail>;
  /** exámenes (modo examen): 't:<tema>', 's:<tramo>', 'l:<nivel>'… */
  exams: Record<string, ExamStat>;
  /** la Rueda: vueltas completas, temas ya preguntados en la vuelta en curso y última vez que salió cada uno */
  wheel?: { laps: number; seen: string[]; last: Record<string, number> };
  /** versión de migración aplicada */
  mig?: number;
  certs: Record<string, { score: number; t: number; passed: boolean; answered?: number; sections?: (number | null)[] }>;
  records: Record<string, number>;
  readTexts: Record<string, { best: number; t: number; wpm?: number }>;
  essays: Essay[];
  customWords: CustomWord[];
  savedTexts: SavedText[];
  notices: string[];
  totals: { answers: number; correct: number; sessions: number; bestRun: number; minutes: number };
  settings: Settings;
}

const KEY = 'cumbre-english-v1';
const OLD_KEYS = ['kaizen-english-v1', 'camino-c1-state-v1'];
const MIG = 2;

const skill0 = (): SkillState => ({ r: 1, n: 0, placed: false, history: [] });

export function freshState(): State {
  return {
    v: 1,
    created: Date.now(),
    skills: { grammar: skill0(), vocab: skill0(), reading: skill0(), listening: skill0(), writing: skill0() },
    items: {},
    srs: {},
    topics: {},
    days: {},
    xp: 0,
    achievements: {},
    path: {},
    ev: {},
    fails: {},
    exams: {},
    mig: MIG,
    certs: {},
    records: {},
    readTexts: {},
    essays: [],
    customWords: [],
    savedTexts: [],
    notices: [],
    totals: { answers: 0, correct: 0, sessions: 0, bestRun: 0, minutes: 0 },
    settings: { rate: 1, voice: '', engine: 'neural', neuralVoice: 'en_US-hfc_female-medium', timer: true, dailyMax: 300, newWordsMax: 20, theme: 'auto', sound: true },
  };
}

function merge(base: State, saved: Partial<State>): State {
  const s = { ...base, ...saved } as State;
  s.skills = { ...base.skills, ...(saved.skills || {}) };
  s.totals = { ...base.totals, ...(saved.totals || {}) };
  s.settings = { ...base.settings, ...(saved.settings || {}) };
  s.ev = s.ev || {};
  s.fails = s.fails || {};
  s.exams = s.exams || {};
  if ((saved.mig ?? 0) < MIG) migrate(s);
  s.mig = MIG;
  return s;
}

const SKILL_KEYS = ['grammar', 'vocab', 'reading', 'listening', 'writing'] as const;
/** Migración a la evaluación continua: nada queda «sabido» sin haberlo demostrado en días distintos. */
function migrate(s: State) {
  const now = Date.now();
  const DAY = 86_400_000;
  for (const [id, c] of Object.entries(s.srs)) {
    if (c.known) {
      s.srs[id] = { due: now, ivl: 0, ease: 2.5, reps: 0, lapses: 0, h: 0, dd: 0 };
      continue;
    }
    if (c.dd === undefined) {
      c.h = c.reps;
      c.dd = c.reps > 0 ? 1 : 0;
      // los intervalos antiguos crecían repitiendo el mismo día: se recortan para volver a demostrarlo
      if (c.ivl > 3) {
        c.ivl = 3;
        c.reps = Math.min(c.reps, 2);
        c.due = Math.min(c.due, now + 3 * DAY);
      }
    }
  }
  // pasos del Camino: «hecho» solo si se completó con ≥ 80 %
  for (const p of Object.values(s.path)) if (p.best < 80) p.done = false;
  // evidencia inicial a partir del historial (aproximada y a la baja)
  const days = Object.entries(s.days).filter(([, d]) => d.n > 0);
  const ev = (k: string): Ev => (s.ev[k] ||= { h: 0, m: 0, d: 0, ld: '', th: 0, r: '' });
  for (const [k, d] of days) {
    const acc = d.n ? d.c / d.n : 0;
    const all = ev('all');
    all.h += Math.min(400, d.c);
    all.m += d.n - d.c;
    all.d++;
    all.ld = k > all.ld ? k : all.ld;
    for (const sk of SKILL_KEYS) {
      if (!d[sk]) continue;
      const e = ev('sk:' + sk);
      e.h += Math.min(150, Math.round(d[sk] * acc));
      e.m += Math.round(d[sk] * (1 - acc));
      e.d++;
      e.ld = k > e.ld ? k : e.ld;
    }
  }
  for (const [id, t] of Object.entries(s.topics)) {
    const e = ev('t:' + id);
    if (e.h || e.m) continue;
    const nDays = days.filter(([, d]) => d.topics?.includes(id)).length || 1;
    e.h = Math.min(t.c, 25 * nDays);
    e.m = t.s - t.c;
    e.d = nDays;
    e.r = t.recent;
  }
}

function load(): State {
  try {
    const raw = localStorage.getItem(KEY) ?? OLD_KEYS.map((k) => localStorage.getItem(k)).find(Boolean);
    if (raw) return merge(freshState(), JSON.parse(raw));
  } catch {
    /* estado corrupto o storage bloqueado: se empieza de cero */
  }
  return freshState();
}

let state: State = typeof localStorage !== 'undefined' ? load() : freshState();
const listeners = new Set<() => void>();
let saveTimer: number | undefined;

function persist() {
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* sin espacio o bloqueado */
    }
  }, 250);
}

export const getState = () => state;

/** Muta una copia profunda del estado (así los selectores de subobjetos detectan cambios). */
export function update(fn: (s: State) => void) {
  const next = structuredClone(state);
  fn(next);
  state = next;
  persist();
  listeners.forEach((l) => l());
}

export function replaceState(s: State) {
  state = merge(freshState(), s);
  persist();
  listeners.forEach((l) => l());
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => sel(state),
  );
}

export function day(s: State, d = today()): DayStat {
  if (!s.days[d]) {
    s.days = {
      ...s.days,
      [d]: { xp: 0, n: 0, c: 0, grammar: 0, vocab: 0, reading: 0, listening: 0, writing: 0, texts: 0, essays: 0, reviews: 0, bestRun: 0, learned: 0, minutes: 0 },
    };
  }
  return s.days[d];
}

export function streak(s: State): number {
  let n = 0;
  const d = new Date();
  const key = (x: Date) =>
    `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  // si hoy aún no has practicado, la racha cuenta hasta ayer
  if (!s.days[key(d)]?.n) d.setDate(d.getDate() - 1);
  while (s.days[key(d)]?.n) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function exportJSON(): string {
  return JSON.stringify(state);
}
export function importJSON(raw: string) {
  const parsed = JSON.parse(raw);
  if (!parsed || parsed.v !== 1 || !parsed.skills) throw new Error('Archivo no válido');
  replaceState(parsed);
}

/** Respuestas de hoy que cuentan para el máximo diario (los repasos no cuentan). */
export function todayLoad(s: State) {
  const d = s.days[todayKey()];
  return d ? d.n - d.reviews : 0;
}
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
