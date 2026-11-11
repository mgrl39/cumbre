/*
 * Currículo como árbol de árboles: nivel → subnivel → categoría → tema.
 * Cada nodo tiene un % de dominio calculado del progreso real. El dominio crece practicando:
 * de tanto hacer, te vuelves maestro (no hay exámenes que "aprobar" para avanzar).
 */
import type { GrammarCat, GrammarTopic, Level, ReadingText, VocabEntry, WritingPrompt } from './types.ts';
import { LEVELS, lvlNum } from './types.ts';
import { grammarTopics, vocab, readings, writingPrompts } from './content.ts';
import type { State } from './store.ts';
import { cardMastery, stage, type Stage } from './srs.ts';
import { domain } from './mastery.ts';

export interface Sublevel {
  id: string;
  level: Level;
  sub: 1 | 2;
  title: string;
  desc: string;
}
export const SUBLEVELS: Sublevel[] = [
  { id: 'A1.1', level: 'A1', sub: 1, title: 'Primeros pasos', desc: 'to be, presente, artículos y posesivos' },
  { id: 'A1.2', level: 'A1', sub: 2, title: 'Lo cotidiano', desc: 'there is, can, preguntas, preposiciones de tiempo' },
  { id: 'A2.1', level: 'A2', sub: 1, title: 'Contar el pasado', desc: 'continuo, pasado, comparar, adverbios' },
  { id: 'A2.2', level: 'A2', sub: 2, title: 'Planes y experiencias', desc: 'futuro, present perfect, obligación, cuantificadores' },
  { id: 'B1.1', level: 'B1', sub: 1, title: 'Hablar con soltura', desc: 'perfectos, condicionales, opinar y aclarar' },
  { id: 'B1.2', level: 'B1', sub: 2, title: 'Estructuras clave', desc: 'pasiva, relativas, estilo indirecto, deducción' },
  { id: 'B2.1', level: 'B2', sub: 1, title: 'Matices', desc: '3er condicional, pasiva avanzada, modales en pasado' },
  { id: 'B2.2', level: 'B2', sub: 2, title: 'Argumentar', desc: 'wish, futuros, contraste, persuadir' },
  { id: 'C1.1', level: 'C1', sub: 1, title: 'Estilo avanzado', desc: 'inversión, cleft, participios, subjuntivo' },
  { id: 'C1.2', level: 'C1', sub: 2, title: 'Dominio académico', desc: 'hedging, elipsis, énfasis, cohesión formal' },
];
export const subById = new Map(SUBLEVELS.map((s) => [s.id, s]));
export const subOfTopic = (t: GrammarTopic) => `${t.level}.${t.sub ?? 1}`;

/* ---------- reparto del contenido por subnivel ---------- */
const TAG_ORDER = ['core', 'phrase', 'false-friend', 'linker', 'phrasal', 'academic'];
function halves<T>(list: T[], sub: 1 | 2): T[] {
  const mid = Math.ceil(list.length / 2);
  return sub === 1 ? list.slice(0, mid) : list.slice(mid);
}
export function topicsOf(subId: string): GrammarTopic[] {
  return grammarTopics.filter((t) => subOfTopic(t) === subId);
}
export function wordsOf(subId: string): VocabEntry[] {
  const s = subById.get(subId)!;
  const list = vocab.filter((v) => !v.bank && v.level === lvlNum(s.level)).sort((a, b) => TAG_ORDER.indexOf(a.tag) - TAG_ORDER.indexOf(b.tag));
  return halves(list, s.sub);
}
export function readingsOf(subId: string): ReadingText[] {
  const s = subById.get(subId)!;
  return halves(readings.filter((r) => r.level === s.level), s.sub);
}
export function promptsOf(subId: string): WritingPrompt[] {
  const s = subById.get(subId)!;
  return halves(writingPrompts.filter((p) => p.level === s.level), s.sub);
}
export function categoriesOf(subId: string): { cat: GrammarCat; topics: GrammarTopic[] }[] {
  const out = new Map<GrammarCat, GrammarTopic[]>();
  for (const t of topicsOf(subId)) {
    if (!out.has(t.cat!)) out.set(t.cat!, []);
    out.get(t.cat!)!.push(t);
  }
  return [...out.entries()].map(([cat, topics]) => ({ cat, topics }));
}

/* ---------- dominio (0..1), realista ----------
   Tema: 100 aciertos en 7+ días distintos acertando ≥ 80 % (nivel Bronce) = 100 %. Dominar no es ser Maestro: eso son 1.000.
   Palabra: según su repaso espaciado (dominada = acertada en 5+ días y aguanta 2 meses).
   Lectura: mejor resultado de un intento COMPLETO. */
export function topicMastery(s: State, id: string): number {
  return domain(s.ev['t:' + id]);
}
export function wordMastery(s: State, id: string): number {
  return cardMastery(s.srs[id]);
}
export const readingMastery = (s: State, id: string) => (s.readTexts[id]?.best ?? 0) / 100;
const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);

export interface SubProgress {
  grammar: number;
  vocab: number;
  reading: number;
  overall: number;
}
export function subProgress(s: State, subId: string): SubProgress {
  const grammar = avg(topicsOf(subId).map((t) => topicMastery(s, t.id)));
  const vocabM = avg(wordsOf(subId).map((w) => wordMastery(s, w.id)));
  const reading = avg(readingsOf(subId).map((r) => readingMastery(s, r.id)));
  const overall = grammar * 0.45 + vocabM * 0.35 + reading * 0.2;
  return { grammar, vocab: vocabM, reading, overall };
}
export function levelProgress(s: State, level: Level) {
  return avg(SUBLEVELS.filter((x) => x.level === level).map((x) => subProgress(s, x.id).overall));
}
export function totalProgress(s: State) {
  return avg(SUBLEVELS.map((x) => subProgress(s, x.id).overall));
}
export const levelIndex = (l: Level) => LEVELS.indexOf(l);

/** Recuento realista del vocabulario por etapa (solo lo demostrado en días distintos llega a «Dominada»). */
export function vocabStats(s: State, list: VocabEntry[] = vocab) {
  const n: Record<Stage, number> = { new: 0, learning: 0, young: 0, solid: 0, mature: 0 };
  let m = 0;
  for (const v of list) {
    const c = s.srs[v.id];
    n[stage(c)]++;
    m += cardMastery(c);
  }
  return { n, total: list.length, mastery: list.length ? m / list.length : 0, started: list.length - n.new };
}
