/* XP, títulos, rangos por tema, logros y misiones diarias. */
import type { State } from './store.ts';
import { streak } from './store.ts';
import { SKILLS } from './types.ts';
import { stage } from './srs.ts';
import { today } from './text.ts';
import { tierOf } from './mastery.ts';
import { grammarTopics } from './content.ts';

/* ---------- Títulos por XP (30, curva creciente) ---------- */
export const TITLES = [
  'Starter', 'Listener', 'Word Collector', 'Sentence Builder', 'Explorer', 'Reader', 'Apprentice', 'Speaker',
  'Pathfinder', 'Steady Learner', 'Storyteller', 'Grammar Hunter', 'Wordsmith', 'Note Taker', 'Debater',
  'Analyst', 'Essayist', 'Fluent Reader', 'Scholar', 'Researcher', 'Critic', 'Editor', 'Lecturer',
  'Polyglot', 'Rhetorician', 'Proficient', 'Master', 'Virtuoso', 'Sage', 'Legend',
];
export const xpForLevel = (l: number) => Math.round(60 * Math.pow(l, 1.75));
/** Nivel sin tope: los 30 primeros tienen título propio; después, «Legend ★N». */
export function titleOf(xp: number) {
  let l = 0;
  while (xp >= xpForLevel(l + 1)) l++;
  const cur = xpForLevel(l),
    next = xpForLevel(l + 1);
  const title = l < TITLES.length ? TITLES[l] : `Legend ★${l - TITLES.length + 1}`;
  return { level: l + 1, title, pct: Math.round(((xp - cur) / (next - cur)) * 100), next };
}

/* ---------- Multiplicadores de XP ----------
   El XP premia lo que cuesta: escribir más que elegir, acertar sin saber el tema (Rueda) más que con la regla
   delante, los exámenes, la racha de aciertos y la constancia de días. */
export interface XpOpts { blind?: boolean; exam?: boolean; run?: number; streak?: number }
export function xpParts(kind: string, level: number, o: XpOpts = {}) {
  const base = 8 + level * 2;
  const parts: { label: string; mult: number }[] = [];
  if (kind === 'type' || kind === 'order') parts.push({ label: 'escrita', mult: 1.25 });
  if (o.blind) parts.push({ label: 'a ciegas', mult: 2 });
  if (o.exam) parts.push({ label: 'examen', mult: 1.5 });
  const run = o.run ?? 0;
  if (run >= 5) parts.push({ label: `racha ${run}`, mult: 1 + Math.min(0.5, Math.floor(run / 5) * 0.1) });
  const st = o.streak ?? 0;
  if (st >= 2) parts.push({ label: `${st} días seguidos`, mult: 1 + Math.min(0.5, st * 0.02) });
  const mult = parts.reduce((a, p) => a * p.mult, 1);
  return { base, parts, mult, xp: Math.round(base * mult) };
}
/** XP de los últimos 7 días. */
export function weekXp(s: State): number {
  let x = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.now() - i * 86_400_000);
    x += s.days[`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`]?.xp ?? 0;
  }
  return x;
}

/* ---------- Logros ---------- */
interface Ach {
  id: string;
  icon: string;
  name: string;
  desc: string;
  test: (s: State) => boolean;
}
const learnedWords = (s: State) => Object.entries(s.srs).filter(([id, c]) => id.startsWith('v:') && stage(c) !== 'learning').length;
const matureWords = (s: State) => Object.entries(s.srs).filter(([id, c]) => id.startsWith('v:') && stage(c) === 'mature').length;
const solidWords = (s: State) => Object.entries(s.srs).filter(([id, c]) => id.startsWith('v:') && (stage(c) === 'solid' || stage(c) === 'mature')).length;
const minLevel = (s: State) => Math.min(...SKILLS.map((k) => s.skills[k].r));
const ranksAt = (s: State, r: number) => Object.keys(s.ev).filter((k) => k.startsWith('t:') && tierOf(s.ev[k], s.ev['w:' + k.slice(2)]?.h ?? 0) >= r).length;

export const ACHIEVEMENTS: Ach[] = [
  { id: 'first', icon: '👣', name: 'Primer paso', desc: 'Responde tu primera pregunta', test: (s) => s.totals.answers >= 1 },
  { id: 'placed', icon: '🧭', name: 'Brújula', desc: 'Haz la prueba de nivel de una skill', test: (s) => SKILLS.some((k) => s.skills[k].placed) },
  { id: 'placed-all', icon: '🗺️', name: 'Mapa completo', desc: 'Prueba de nivel en las 5 skills', test: (s) => SKILLS.every((k) => s.skills[k].placed) },
  { id: 'a100', icon: '💯', name: 'Cien', desc: '100 respuestas', test: (s) => s.totals.answers >= 100 },
  { id: 'a1000', icon: '🏃', name: 'Mil', desc: '1.000 respuestas', test: (s) => s.totals.answers >= 1000 },
  { id: 'a5000', icon: '🏔️', name: 'Cinco mil', desc: '5.000 respuestas', test: (s) => s.totals.answers >= 5000 },
  { id: 'a20000', icon: '🌌', name: 'Veinte mil', desc: '20.000 respuestas', test: (s) => s.totals.answers >= 20000 },
  { id: 'run10', icon: '🔥', name: 'En racha', desc: '10 aciertos seguidos', test: (s) => s.totals.bestRun >= 10 },
  { id: 'run30', icon: '☄️', name: 'Imparable', desc: '30 aciertos seguidos', test: (s) => s.totals.bestRun >= 30 },
  { id: 'run75', icon: '⚡', name: 'Mente de acero', desc: '75 aciertos seguidos', test: (s) => s.totals.bestRun >= 75 },
  { id: 'd3', icon: '📅', name: 'Constancia', desc: 'Racha de 3 días', test: (s) => streak(s) >= 3 },
  { id: 'd7', icon: '🗓️', name: 'Una semana', desc: 'Racha de 7 días', test: (s) => streak(s) >= 7 },
  { id: 'd30', icon: '🏅', name: 'Un mes', desc: 'Racha de 30 días', test: (s) => streak(s) >= 30 },
  { id: 'd100', icon: '🏆', name: 'Cien días', desc: 'Racha de 100 días', test: (s) => streak(s) >= 100 },
  { id: 'w50', icon: '🌿', name: 'Semillero', desc: '50 palabras en repaso', test: (s) => learnedWords(s) >= 50 },
  { id: 'w250', icon: '🌳', name: 'Bosque', desc: '250 palabras en repaso', test: (s) => learnedWords(s) >= 250 },
  { id: 'v1000', icon: '🧺', name: 'Mil palabras sólidas', desc: '1.000 palabras que aguantan 3+ semanas sin verlas', test: (s) => solidWords(s) >= 1000 },
  { id: 'v4000', icon: '🏛️', name: 'Medio camino', desc: '4.000 palabras sólidas', test: (s) => solidWords(s) >= 4000 },
  { id: 'v8000', icon: '🎓', name: 'Ocho mil', desc: '8.000 palabras dominadas', test: (s) => matureWords(s) >= 8000 },
  { id: 'm100', icon: '🧠', name: 'Memoria larga', desc: '100 palabras dominadas', test: (s) => matureWords(s) >= 100 },
  { id: 'm400', icon: '📕', name: 'Diccionario andante', desc: '400 palabras dominadas', test: (s) => matureWords(s) >= 400 },
  { id: 'r1', icon: '📖', name: 'Lector', desc: 'Completa un texto de lectura', test: (s) => Object.keys(s.readTexts).length >= 1 },
  { id: 'r10', icon: '📚', name: 'Biblioteca', desc: 'Completa 10 lecturas', test: (s) => Object.keys(s.readTexts).length >= 10 },
  { id: 'rperfect', icon: '🎯', name: 'Comprensión total', desc: '100 % en una lectura B2 o superior', test: (s) => Object.entries(s.readTexts).some(([id, r]) => r.best === 100 && /-(b2|c1)-/.test(id)) },
  { id: 'e1', icon: '✍️', name: 'Pluma', desc: 'Escribe tu primer texto libre', test: (s) => s.essays.length >= 1 },
  { id: 'e10', icon: '🖋️', name: 'Autor', desc: '10 textos escritos', test: (s) => s.essays.length >= 10 },
  { id: 'e-long', icon: '📜', name: 'Ensayista', desc: 'Un texto de más de 250 palabras', test: (s) => s.essays.some((e) => e.words >= 250) },
  { id: 'own', icon: '🔎', name: 'Lector libre', desc: 'Analiza un texto propio en el Lector', test: (s) => s.savedTexts.length >= 1 },
  { id: 'rank-pass', icon: '✅', name: 'Primer aprobado', desc: 'Aprueba un tema de gramática (10 aciertos en 2+ días)', test: (s) => ranksAt(s, 1) >= 1 },
  { id: 'rank-pass20', icon: '📗', name: 'Veinte aprobados', desc: 'Aprueba 20 temas de gramática', test: (s) => ranksAt(s, 1) >= 20 },
  { id: 'rank-passall', icon: '📚', name: 'Temario aprobado', desc: 'Aprueba todos los temas de gramática', test: (s) => ranksAt(s, 1) >= grammarTopics.length },
  { id: 'rank-plata', icon: '🥈', name: 'Plata', desc: 'Un tema de gramática en Plata (300 aciertos en 14+ días, 20 a ciegas)', test: (s) => ranksAt(s, 3) >= 1 },
  { id: 'rank-oro', icon: '🥇', name: 'Oro', desc: 'Un tema en Oro (600 aciertos en 21+ días, 50 a ciegas)', test: (s) => ranksAt(s, 4) >= 1 },
  { id: 'rank-diamante', icon: '👑', name: 'Maestro', desc: 'Un tema en Maestro (1.000 aciertos en 30+ días, 100 a ciegas)', test: (s) => ranksAt(s, 5) >= 1 },
  { id: 'rank-m10', icon: '🏯', name: 'Diez maestrías', desc: 'Diez temas en Maestro', test: (s) => ranksAt(s, 5) >= 10 },
  { id: 'sk-plata', icon: '🧭', name: 'Skill en Plata', desc: 'Una skill con 300 aciertos en 14+ días', test: (s) => SKILLS.some((k) => tierOf(s.ev['sk:' + k]) >= 3) },
  { id: 'sk-oro', icon: '🏔️', name: 'Skill en Oro', desc: 'Una skill con 600 aciertos en 21+ días', test: (s) => SKILLS.some((k) => tierOf(s.ev['sk:' + k]) >= 4) },
  { id: 'sk-diamante', icon: '🌟', name: 'Skill maestra', desc: 'Una skill con 1.000 aciertos en 30+ días', test: (s) => SKILLS.some((k) => tierOf(s.ev['sk:' + k]) >= 5) },
  { id: 'wheel1', icon: '🎡', name: 'Primera vuelta', desc: 'Completa una vuelta entera a la Rueda', test: (s) => (s.wheel?.laps ?? 0) >= 1 },
  { id: 'wheel10', icon: '🎠', name: 'Diez vueltas', desc: 'Completa 10 vueltas a la Rueda', test: (s) => (s.wheel?.laps ?? 0) >= 10 },
  { id: 'wheel50', icon: '🌀', name: 'Cincuenta vueltas', desc: 'Completa 50 vueltas a la Rueda', test: (s) => (s.wheel?.laps ?? 0) >= 50 },
  { id: 'blind100', icon: '🙈', name: 'A ciegas', desc: '100 aciertos a ciegas en la Rueda', test: (s) => (s.ev.wheel?.h ?? 0) >= 100 },
  { id: 'blind1000', icon: '🦉', name: 'Sin red', desc: '1.000 aciertos a ciegas en la Rueda', test: (s) => (s.ev.wheel?.h ?? 0) >= 1000 },
  { id: 'b1all', icon: '🟢', name: 'Base sólida', desc: 'B1 en las 5 skills', test: (s) => minLevel(s) >= 3 },
  { id: 'b2all', icon: '🔵', name: 'Independiente', desc: 'B2 en las 5 skills', test: (s) => minLevel(s) >= 4 },
  { id: 'c1any', icon: '🟣', name: 'Toque C1', desc: 'C1 en alguna skill', test: (s) => SKILLS.some((k) => s.skills[k].r >= 5) },
  { id: 'c1all', icon: '👑', name: 'Objetivo cumplido', desc: 'C1 en las 5 skills', test: (s) => minLevel(s) >= 5 },
  { id: 'cert1', icon: '📜', name: 'Certificado', desc: 'Aprueba un examen de certificación', test: (s) => Object.values(s.certs).some((c) => c.passed) },
  { id: 'certc1', icon: '🏛️', name: 'Certificado C1', desc: 'Aprueba un examen C1', test: (s) => Object.entries(s.certs).some(([k, c]) => c.passed && k.endsWith('C1')) },
  { id: 'xp5k', icon: '⭐', name: '5.000 XP', desc: 'Acumula 5.000 XP', test: (s) => s.xp >= 5000 },
  { id: 'xp50k', icon: '🌟', name: '50.000 XP', desc: 'Acumula 50.000 XP', test: (s) => s.xp >= 50000 },
  { id: 'missions', icon: '✅', name: 'Día redondo', desc: 'Completa todas las misiones de un día', test: (s) => missionsFor(s).every((m) => m.done) },
  { id: 'path10', icon: '🛤️', name: 'Caminante', desc: '10 pasos del Camino', test: (s) => Object.values(s.path).filter((p) => p.done).length >= 10 },
  { id: 'path50', icon: '🧗', name: 'Escalador', desc: '50 pasos del Camino', test: (s) => Object.values(s.path).filter((p) => p.done).length >= 50 },
];

/* ---------- Misiones diarias (3 por día, deterministas por fecha) ---------- */
type DayKey = 'n' | 'c' | 'grammar' | 'vocab' | 'reading' | 'listening' | 'writing' | 'texts' | 'essays' | 'reviews' | 'bestRun' | 'xp' | 'learned';
const MISSIONS: { key: DayKey; goal: number; text: string }[] = [
  { key: 'n', goal: 30, text: 'Responde 30 preguntas' },
  { key: 'c', goal: 25, text: 'Consigue 25 aciertos' },
  { key: 'grammar', goal: 12, text: '12 preguntas de Grammar' },
  { key: 'vocab', goal: 15, text: '15 preguntas de Vocabulary' },
  { key: 'listening', goal: 8, text: '8 preguntas de Listening' },
  { key: 'writing', goal: 8, text: '8 preguntas de Writing' },
  { key: 'reading', goal: 10, text: '10 preguntas de Reading' },
  { key: 'texts', goal: 1, text: 'Completa una lectura' },
  { key: 'essays', goal: 1, text: 'Escribe un texto libre' },
  { key: 'reviews', goal: 15, text: 'Haz 15 repasos' },
  { key: 'bestRun', goal: 10, text: '10 aciertos seguidos' },
  { key: 'xp', goal: 200, text: 'Gana 200 XP' },
  { key: 'learned', goal: 5, text: 'Aprende 5 palabras nuevas' },
];
export function missionsFor(s: State, d = today()) {
  let h = 0;
  for (const ch of d) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const idx: number[] = [];
  while (idx.length < 3) {
    h = (h * 1103515245 + 12345) >>> 0;
    const i = h % MISSIONS.length;
    if (!idx.includes(i)) idx.push(i);
  }
  const ds = s.days[d];
  return idx.map((i) => {
    const m = MISSIONS[i];
    const progress = ds ? ds[m.key] : 0;
    return { ...m, progress: Math.min(progress, m.goal), done: progress >= m.goal };
  });
}
