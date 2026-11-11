/*
 * Parser del contenido (mini-DSL) e índices.
 *
 * Gramática / escritura, una línea por ítem (campos separados por " | ", alternativas por " / ", nota tras " # "):
 *   frase con ___ | respuesta / alternativa                     → hueco escrito
 *   frase con ___ | correcta | distractor / distractor          → opción múltiple
 *   ! frase con error | frase corregida / alternativa           → corrige el error
 *   > frase original | KEYWORD | inicio ___ final | respuesta   → transformación (keyword)
 *   = frase en español | traducción / alternativa              → traducción
 * Vocabulario: palabra | categoría | significado | ejemplo con *palabra* # nota
 */
import type { GrammarItem, GrammarTopic, Level, VocabEntry, VocabTag, WritingItem, ReadingText, WritingPrompt } from './types.ts';
import { lvlNum } from './types.ts';
import { GRAMMAR } from '../content/grammar.ts';
import { VOCAB_BLOCKS } from '../content/vocab.ts';
import { VOCAB_BLOCKS_2 } from '../content/vocab2.ts';
import { BANK } from '../content/bank/index.ts';
import { READINGS as READINGS_1 } from '../content/reading.ts';
import { READINGS_2 } from '../content/reading2.ts';
import { READINGS_3 } from '../content/reading3.ts';
import { READINGS_4 } from '../content/reading4.ts';
import { READINGS_5 } from '../content/reading5.ts';
import { READINGS_6 } from '../content/reading6.ts';
import { READINGS_7 } from '../content/reading7.ts';
import { READINGS_8 } from '../content/reading8.ts';
const READINGS = [...READINGS_1, ...READINGS_2, ...READINGS_3, ...READINGS_4, ...READINGS_5, ...READINGS_6, ...READINGS_7, ...READINGS_8];
import { WRITING_BLOCKS as WRITING_BLOCKS_1, WRITING_PROMPTS as WRITING_PROMPTS_1 } from '../content/writing.ts';
import { WRITING_BLOCKS_2, WRITING_PROMPTS_2 } from '../content/writing2.ts';
const WRITING_BLOCKS = [...WRITING_BLOCKS_1, ...WRITING_BLOCKS_2];
const WRITING_PROMPTS = [...WRITING_PROMPTS_1, ...WRITING_PROMPTS_2];

const alts = (s: string) => s.split(' / ').map((x) => x.trim()).filter(Boolean);

function splitNote(line: string): [string, string | undefined] {
  const i = line.indexOf(' # ');
  return i < 0 ? [line, undefined] : [line.slice(0, i), line.slice(i + 3).trim()];
}

/** Frase que sirve suelta (dictado, ordenar): sin diálogos, flechas ni puntos suspensivos. */
const loose = (x: string | undefined) => (x && !/[→"“”…]/.test(x) ? x : undefined);

export function parseLine(raw: string, id: string, level: number, topicId: string): GrammarItem | null {
  let line = raw.trim();
  if (!line || line.startsWith('//')) return null;
  const [body, note] = splitNote(line);
  line = body;
  if (line.startsWith('!')) {
    const [prompt, ans] = line.slice(1).split(' | ').map((x) => x.trim());
    const answers = alts(ans);
    return { id, topicId, level, type: 'error', prompt, answers, note, sentence: loose(answers[0]) };
  }
  if (line.startsWith('>')) {
    const [orig, key, start, ans] = line.slice(1).split(' | ').map((x) => x.trim());
    const answers = alts(ans);
    return { id, topicId, level, type: 'trans', prompt: orig, key, answers, note, options: [start], sentence: loose(start.replace('___', answers[0])) };
  }
  if (line.startsWith('=')) {
    const [prompt, ans] = line.slice(1).split(' | ').map((x) => x.trim());
    const answers = alts(ans);
    return { id, topicId, level, type: 'translate', prompt, answers, note, sentence: loose(answers[0]) };
  }
  const parts = line.split(' | ').map((x) => x.trim());
  const answers = alts(parts[1] || '');
  // los diálogos y las frases con flecha no sirven como frase suelta (dictado, ordenar)
  const sentence = parts[0].includes('___') && !/[→"“”…]/.test(parts[0]) ? parts[0].replace('___', answers[0]).replace(/\s*\([^)]*\)/, '') : undefined;
  if (parts.length >= 3) return { id, topicId, level, type: 'mc', prompt: parts[0], answers, options: alts(parts[2]), note, sentence };
  return { id, topicId, level, type: 'gap', prompt: parts[0], answers, note, sentence };
}

/* ---------- Gramática ---------- */
export const grammarTopics: GrammarTopic[] = GRAMMAR;
export const topicById = new Map(GRAMMAR.map((t) => [t.id, t]));
export const grammarItems: GrammarItem[] = [];
export const itemsByTopic = new Map<string, GrammarItem[]>();
for (const t of GRAMMAR) {
  const list: GrammarItem[] = [];
  t.items.split('\n').forEach((l) => {
    const it = parseLine(l, `g:${t.id}:${list.length}`, lvlNum(t.level), t.id);
    if (it) list.push(it);
  });
  itemsByTopic.set(t.id, list);
  grammarItems.push(...list);
}

/* ---------- Vocabulario ---------- */
export const vocab: VocabEntry[] = [];
export const vocabById = new Map<string, VocabEntry>();
export const vocabByWord = new Map<string, VocabEntry>();
const slug = (w: string) => w.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
for (const b of [...VOCAB_BLOCKS, ...VOCAB_BLOCKS_2]) {
  for (const raw of b.list.split('\n')) {
    const l = raw.trim();
    if (!l || l.startsWith('//')) continue;
    const [body, note] = splitNote(l);
    const [word, pos, es, ex] = body.split(' | ').map((x) => x.trim());
    let id = `v:${slug(word)}`;
    if (vocabById.has(id)) id += `-${b.tag}`;
    const e: VocabEntry = { id, word, pos, es, ex: ex || '', level: lvlNum(b.level), tag: b.tag as VocabTag, note };
    vocab.push(e);
    vocabById.set(id, e);
    if (!vocabByWord.has(word.toLowerCase())) vocabByWord.set(word.toLowerCase(), e);
  }
}
/* Banco de ~7.700 palabras por frecuencia (NGSL/NAWL + listas Cambridge B1/B2/C1).
   Formato: «#N» cambia el nivel; cada línea «palabra|pos|español[|ejemplo con *palabra*]». */
const POS_TAG: Record<string, VocabTag> = { pv: 'phrasal', id: 'phrase' };
export const BANK_SIZE = (() => {
  let n = 0;
  for (const src of BANK) {
    let lv = 3;
    for (const raw of src.split('\n')) {
      const l = raw.trim();
      if (!l) continue;
      if (l[0] === '#') {
        lv = Number(l.slice(1)) || lv;
        continue;
      }
      const [word, pos, es, ex] = l.split('|').map((x) => x.trim());
      if (!word || !es || vocabByWord.has(word.toLowerCase())) continue;
      let id = `v:${slug(word)}`;
      if (vocabById.has(id)) id += '-b';
      if (vocabById.has(id)) continue;
      const e: VocabEntry = { id, word, pos, es, ex: ex || '', level: lv, tag: POS_TAG[pos] || 'core', bank: true, ord: vocab.length };
      vocab.push(e);
      vocabById.set(id, e);
      vocabByWord.set(word.toLowerCase(), e);
      n++;
    }
  }
  return n;
})();
vocab.forEach((v, i) => v.ord ??= i);
export const cleanEx = (ex: string) => ex.replace(/\*/g, '');
export const markedWord = (ex: string) => (ex.match(/\*([^*]+)\*/) || [])[1];

/* ---------- Lectura ---------- */
export const readings: ReadingText[] = READINGS;
export const readingById = new Map(READINGS.map((r) => [r.id, r]));

/* ---------- Escritura ---------- */
export const writingItems: WritingItem[] = [];
for (const b of WRITING_BLOCKS) {
  let k = 0;
  for (const raw of b.list.split('\n')) {
    const it = parseLine(raw, `w:${b.id}:${k}`, lvlNum(b.level), b.id);
    if (!it) continue;
    k++;
    const type: WritingItem['type'] = it.type === 'mc' || it.type === 'gap' ? 'linker' : it.type;
    writingItems.push({
      id: it.id,
      level: it.level,
      type,
      prompt: it.prompt,
      key: it.key,
      start: it.options && it.type === 'trans' ? it.options[0] : undefined,
      answers: it.answers,
      options: it.type === 'mc' ? it.options : undefined,
      note: it.note,
    });
  }
}
export const writingPrompts: WritingPrompt[] = WRITING_PROMPTS;

/* ---------- Banco de frases para dictado ---------- */
export interface Sentence {
  text: string;
  level: number;
  src: string;
}
export const sentences: Sentence[] = [];
for (const v of vocab) if (v.ex && v.tag !== 'phrase') sentences.push({ text: cleanEx(v.ex), level: Math.max(1, v.level), src: v.id });
for (const g of grammarItems) if (g.sentence && !g.sentence.includes('___')) sentences.push({ text: g.sentence, level: g.level, src: g.id });

export function itemsAtLevel<T extends { level: number }>(list: T[], lv: number): T[] {
  for (let d = 0; d < 5; d++) {
    const r = list.filter((x) => Math.abs(x.level - lv) === d);
    if (r.length) return r;
  }
  return list;
}

export function levelCount(l: Level) {
  const n = lvlNum(l);
  return {
    grammar: grammarItems.filter((x) => x.level === n).length,
    vocab: vocab.filter((x) => x.level === n).length,
    reading: readings.filter((x) => x.level === l).length,
    writing: writingItems.filter((x) => x.level === n).length,
  };
}
