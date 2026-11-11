/* Generadores de los juegos rápidos a partir de src/content/games.ts.
   Cada ítem tiene id estable `gm:<set>:<n>` para poder repasarlo (repaso espaciado) si se falla. */
import type { Exercise, Skill } from './types.ts';
import { IRREGULAR, PREPOSITIONS, COLLOCATIONS, FORMAL, SYNONYMS, COUNTABLE, WORD_FORMATION, CONFUSABLES, REAL_LIFE, IDIOMS } from '../content/games.ts';
import { grammarItems, vocab, markedWord, readings, sentences, vocabByWord } from './content.ts';
import { SETS2 } from '../content/games2.ts';
import type { VocabEntry } from './types.ts';
import { lvlNum } from './types.ts';
import { pick, shuffle, uniq } from './text.ts';

type Row = string[];
const rows = (src: string): Row[] =>
  src
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(' | ').map((x) => x.trim()));
const alts = (s: string) => s.split(' / ').map((x) => x.trim()).filter(Boolean);
const clamp = (n: number) => Math.max(1, Math.min(5, n));
/** Nivel aproximado por posición: los datos van de fácil a difícil. */
const lvAt = (base: number, i: number, len: number) => clamp(base - 1 + Math.floor((i / len) * 3));

export type SetId = string;
type OldSet = 'irr' | 'prep' | 'coll' | 'formal' | 'syn' | 'count' | 'wf' | 'conf' | 'real' | 'idiom';

/* ---------- conjuntos genéricos (games2.ts): `enunciado | respuesta | d1 / d2 / d3 | explicación?` ---------- */
interface GenSet { kind: 'mc' | 'type'; skill: Skill; base: number; label: string; instruction: string; src?: string }
export const GEN: Record<string, GenSet> = {
  gerinf: { kind: 'mc', skill: 'grammar', base: 3, label: 'Gerundio o infinitivo', instruction: 'Elige la forma correcta del verbo' },
  quant: { kind: 'mc', skill: 'grammar', base: 2, label: 'Cuantificadores', instruction: 'Elige el cuantificador' },
  art: { kind: 'mc', skill: 'grammar', base: 2, label: 'Artículos', instruction: 'a, an, the o nada (—)' },
  tags: { kind: 'mc', skill: 'grammar', base: 3, label: 'Question tags', instruction: 'Elige la coletilla' },
  link: { kind: 'mc', skill: 'writing', base: 3, label: 'Conectores en contexto', instruction: 'Elige el conector que encaja' },
  anton: { kind: 'mc', skill: 'vocab', base: 3, label: 'Antónimos', instruction: '¿Qué palabra significa lo contrario?' },
  prefix: { kind: 'mc', skill: 'vocab', base: 3, label: 'Prefijos negativos', instruction: 'Elige la forma negativa correcta' },
  plural: { kind: 'type', skill: 'grammar', base: 2, label: 'Plurales', instruction: 'Escribe el plural' },
  compar: { kind: 'type', skill: 'grammar', base: 2, label: 'Comparativos', instruction: 'Escribe la forma que se pide' },
  ukus: { kind: 'mc', skill: 'vocab', base: 3, label: 'Británico / americano', instruction: '¿Cómo se dice en la otra variante?' },
  binom: { kind: 'mc', skill: 'vocab', base: 4, label: 'Parejas fijas', instruction: 'Completa la expresión' },
  ocloze: { kind: 'type', skill: 'grammar', base: 4, label: 'Open cloze', instruction: 'Escribe UNA palabra que complete la frase' },
  mcloze: { kind: 'mc', skill: 'vocab', base: 4, label: 'Multiple-choice cloze', instruction: 'Elige la palabra que encaja (significado y colocación)' },
  emph: { kind: 'mc', skill: 'grammar', base: 5, label: 'Inversión y énfasis', instruction: 'Elige la estructura correcta' },
  spell: { kind: 'mc', skill: 'writing', base: 3, label: 'Ortografía', instruction: '¿Cuál está bien escrita?' },
  odd: { kind: 'mc', skill: 'vocab', base: 2, label: 'El intruso', instruction: '¿Cuál no pertenece al grupo?' },
  defin: { kind: 'mc', skill: 'vocab', base: 4, label: 'Definiciones', instruction: '¿Qué palabra se define?' },
  defw: { kind: 'type', skill: 'vocab', base: 4, label: 'Definición → palabra', instruction: 'Escribe la palabra que se define', src: 'defin' },
  adjn: { kind: 'mc', skill: 'vocab', base: 4, label: 'Colocaciones C1', instruction: 'Elige la palabra que se combina de forma natural' },
  pphr: { kind: 'mc', skill: 'grammar', base: 3, label: 'Frases preposicionales', instruction: 'Elige la preposición' },
  cond: { kind: 'mc', skill: 'grammar', base: 3, label: 'Condicionales', instruction: 'Elige la forma correcta' },
  abbr: { kind: 'mc', skill: 'reading', base: 3, label: 'Abreviaturas', instruction: '¿Qué significa?' },
  prov: { kind: 'mc', skill: 'vocab', base: 4, label: 'Refranes', instruction: 'Completa el refrán' },
  email: { kind: 'mc', skill: 'writing', base: 3, label: 'Frases de email', instruction: 'Elige la frase adecuada (registro formal)' },
  signs: { kind: 'mc', skill: 'reading', base: 2, label: 'Carteles y avisos', instruction: '¿Qué quiere decir?' },
  rhyme: { kind: 'mc', skill: 'listening', base: 3, label: 'Rimas', instruction: '¿Qué palabra rima?' },
};
const DATA2: Record<string, Row[]> = {};
for (const [k, g] of Object.entries(GEN)) DATA2[k] = rows(SETS2[g.src ?? k] ?? '');

/* ---------- números y horas en palabras ---------- */
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
export function numberWords(n: number): string {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? '-' + ONES[n % 10] : '');
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ' and ' + numberWords(n % 100) : ''}`;
  if (n < 1_000_000) return `${numberWords(Math.floor(n / 1000))} thousand${n % 1000 ? (n % 1000 < 100 ? ' and ' : ' ') + numberWords(n % 1000) : ''}`;
  return `${numberWords(Math.floor(n / 1_000_000))} million${n % 1_000_000 ? ' ' + numberWords(n % 1_000_000) : ''}`;
}
export function timeWords(min: number): string {
  const h = Math.floor(min / 60) % 12 || 12;
  const m = min % 60;
  const nh = (h % 12) + 1;
  if (m === 0) return `${ONES[h]} o'clock`;
  if (m === 15) return `quarter past ${ONES[h]}`;
  if (m === 30) return `half past ${ONES[h]}`;
  if (m === 45) return `quarter to ${ONES[nh]}`;
  return m < 30 ? `${numberWords(m)} past ${ONES[h]}` : `${numberWords(60 - m)} to ${ONES[nh]}`;
}
const clock = (min: number) => `${Math.floor(min / 60) % 12 || 12}:${String(min % 60).padStart(2, '0')}`;
const fmtN = (n: number) => n.toLocaleString('en-US');
const numLevel = (n: number) => (n < 100 ? 1 : n < 1000 ? 2 : n < 10000 ? 3 : n < 1_000_000 ? 4 : 5);
function randomNumber(level = 2): number {
  const r = (a: number, b: number) => a + Math.floor(Math.random() * (b - a));
  if (level <= 1) return r(11, 100);
  if (level === 2) return r(100, 1000);
  if (level === 3) return r(1000, 10000);
  if (level === 4) return r(10_000, 1_000_000);
  return r(1_000_000, 99_000_000);
}

/* ---------- juegos con palabras del banco ---------- */
export type WordMode = 'ana' | 'let' | 'ini';
export const wordOk = (e: VocabEntry) => /^[a-z]{4,14}$/i.test(e.word);
export function wordGame(e: VocabEntry, mode: WordMode): Exercise {
  const base = { id: `${e.id}:${mode}`, skill: 'vocab' as Skill, level: e.level, kind: 'type' as const, wordId: e.id, answers: [e.word], explain: `${e.word} = ${e.es}` };
  if (mode === 'ana') {
    let sc = e.word;
    for (let i = 0; i < 8 && sc === e.word; i++) sc = shuffle(e.word.split('')).join('');
    return { ...base, label: 'Anagrama', instruction: 'Ordena las letras para formar la palabra', prompt: `${sc.toUpperCase().split('').join(' ')}\n\n${e.es}` };
  }
  if (mode === 'let') {
    const hide = new Set(shuffle(e.word.split('').map((_, i) => i).slice(1)).slice(0, Math.ceil(e.word.length * 0.45)));
    return { ...base, label: 'Letras que faltan', instruction: 'Escribe la palabra completa', prompt: `${e.word.split('').map((c, i) => (hide.has(i) ? '_' : c)).join(' ')}\n\n${e.es}` };
  }
  return { ...base, label: 'Primera letra', instruction: 'Escribe la palabra en inglés', prompt: `${e.es}\n\nEmpieza por «${e.word[0]}» · ${e.word.length} letras` };
}

const DATA: Record<OldSet, Row[]> = {
  irr: rows(IRREGULAR),
  prep: rows(PREPOSITIONS),
  coll: rows(COLLOCATIONS),
  formal: rows(FORMAL),
  syn: rows(SYNONYMS),
  count: rows(COUNTABLE),
  wf: rows(WORD_FORMATION),
  conf: rows(CONFUSABLES),
  real: rows(REAL_LIFE),
  idiom: rows(IDIOMS),
};
export const GAME_DATA_SIZE: Record<string, number> = Object.fromEntries([...Object.entries(DATA), ...Object.entries(DATA2)].map(([k, v]) => [k, v.length]));

function mc(id: string, skill: Skill, level: number, label: string, instruction: string, prompt: string, answer: string, wrong: string[], explain?: string, audio?: string): Exercise {
  const ds = uniq(wrong.filter((w) => w.toLowerCase() !== answer.toLowerCase())).slice(0, 3);
  return { id, skill, level, kind: 'mc', label, instruction, prompt, options: shuffle([answer, ...ds]), answers: [answer], explain, audio };
}

/* ---------- un ejercicio por conjunto (índice concreto) ---------- */
export function gameItem(set: SetId, i: number, variant = 0): Exercise | null {
  switch (set) {
    case 'irr': {
      const r = DATA.irr[i];
      if (!r) return null;
      const [base, past, pp, es, lv] = r;
      const level = Number(lv) || 2;
      const others = DATA.irr.filter((x) => x !== r);
      const id = `gm:irr:${i}`;
      const explain = `${base} → ${past} → ${pp} (${es})`;
      if (variant === 1) return { id, skill: 'grammar', level, kind: 'type', label: 'Irregulares', instruction: 'Escribe el participio (3ª columna)', prompt: `${base} · ${es}`, answers: alts(pp), explain, audio: base };
      if (variant === 2) return mc(id, 'grammar', level, 'Irregulares', '¿Cuál es el participio?', `${base} (${es})`, alts(pp)[0], [alts(past)[0] !== alts(pp)[0] ? alts(past)[0] : base + 'en', base.replace(/e?$/, 'ed'), ...shuffle(others).map((x) => alts(x[2])[0])], explain);
      return mc(id, 'grammar', level, 'Irregulares', '¿Cuál es el pasado simple?', `${base} (${es})`, alts(past)[0], [base.replace(/e?$/, 'ed'), alts(pp)[0] !== alts(past)[0] ? alts(pp)[0] : base + 't', ...shuffle(others).map((x) => alts(x[1])[0])], explain);
    }
    case 'prep': {
      const r = DATA.prep[i];
      if (!r) return null;
      return mc(`gm:prep:${i}`, 'grammar', lvAt(3, i, DATA.prep.length), 'Preposiciones', 'Elige la preposición', r[0], r[1], alts(r[2] ?? ''), `${r[0].replace('___', r[1].toUpperCase())}`);
    }
    case 'coll': {
      const r = DATA.coll[i];
      if (!r) return null;
      return mc(`gm:coll:${i}`, 'vocab', lvAt(3, i, DATA.coll.length), 'Combinaciones', '¿Qué verbo va con esto?', r[0], r[1], alts(r[2] ?? ''), `Se dice «${r[0].replace('___', r[1])}». En inglés las combinaciones (collocations) se aprenden en bloque.`);
    }
    case 'formal': {
      const r = DATA.formal[i];
      if (!r) return null;
      return mc(`gm:formal:${i}`, 'writing', lvAt(4, i, DATA.formal.length), 'Formal / informal', 'Versión formal (escrito académico o profesional)', r[0], r[1], alts(r[2] ?? ''), `${r[0]} → ${r[1]}`);
    }
    case 'syn': {
      const r = DATA.syn[i];
      if (!r) return null;
      return mc(`gm:syn:${i}`, 'vocab', lvAt(4, i, DATA.syn.length), 'Sinónimos', '¿Qué palabra significa casi lo mismo?', r[0], r[1], alts(r[2] ?? ''), `${r[0]} ≈ ${r[1]}`);
    }
    case 'count': {
      const r = DATA.count[i];
      if (!r) return null;
      const u = r[1] === 'u';
      return mc(`gm:count:${i}`, 'grammar', lvAt(2, i, DATA.count.length), 'Contable / incontable', '¿Contable o incontable?', r[0], u ? 'Incontable' : 'Contable', [u ? 'Contable' : 'Incontable'],
        u ? `«${r[0]}» es incontable: sin a/an ni plural → some ${r[0]}, much ${r[0]}, a piece of ${r[0]}.` : `«${r[0]}» es contable: a/an, plural, many.`);
    }
    case 'wf': {
      const r = DATA.wf[i];
      if (!r) return null;
      return { id: `gm:wf:${i}`, skill: 'vocab', level: lvAt(4, i, DATA.wf.length), kind: 'type', label: 'Formación de palabras', instruction: 'Escribe la forma correcta de la palabra en MAYÚSCULAS', prompt: r[0], answers: alts(r[1]) };
    }
    case 'conf': {
      const r = DATA.conf[i];
      if (!r) return null;
      return mc(`gm:conf:${i}`, 'writing', lvAt(3, i, DATA.conf.length), 'Confusables', 'Elige la palabra correcta', r[0], r[1], alts(r[2] ?? ''), r[0].replace('___', r[1].toUpperCase()));
    }
    case 'real': {
      const r = DATA.real[i];
      if (!r) return null;
      const good = alts(r[1]);
      return mc(`gm:real:${i}`, 'vocab', lvAt(3, i, DATA.real.length), 'Vida real', '¿Qué dirías?', r[0], good[0], alts(r[2] ?? ''), good.length > 1 ? `También vale: ${good.slice(1).join(' · ')}` : undefined);
    }
    case 'idiom': {
      const r = DATA.idiom[i];
      if (!r) return null;
      const others = shuffle(DATA.idiom.filter((x) => x !== r)).map((x) => x[1]);
      return mc(`gm:idiom:${i}`, 'vocab', lvAt(4, i, DATA.idiom.length), 'Expresiones', `¿Qué significa «${r[0]}»?`, r[2] ?? r[0], r[1], others, `${r[0]} = ${r[1]}`, r[2]);
    }
    case 'ok': {
      const errs = grammarItems.filter((g) => g.type === 'error');
      const it = errs[i];
      if (!it) return null;
      const right = variant === 1;
      const sentence = right ? it.answers[0] : it.prompt;
      return {
        id: `gm:ok:${i}:${variant}`, skill: 'grammar', level: it.level, kind: 'mc', label: '¿Correcta o no?', instruction: '¿Esta frase es correcta?',
        prompt: sentence, options: ['✓ Correcta', '✗ Tiene un error'], answers: [right ? '✓ Correcta' : '✗ Tiene un error'],
        explain: right ? `Correcta.${it.note ? ' ' + it.note : ''}` : `Lo correcto: «${it.answers[0]}».${it.note ? ' ' + it.note : ''}`, ruleTopic: it.topicId,
      };
    }
    case 'prt': {
      const ph = vocab.filter((v) => v.tag === 'phrasal');
      const e = ph[i];
      const m = e && markedWord(e.ex);
      if (!e || !m || m.split(' ').length < 2) return null;
      const [verb, ...rest] = m.split(' ');
      const part = rest.join(' ');
      const pool = uniq(ph.map((v) => markedWord(v.ex)?.split(' ').slice(1).join(' ')).filter((x): x is string => !!x && x !== part));
      return { ...mc(`${e.id}:prt`, 'vocab', e.level, 'Partículas', 'Completa el phrasal verb', e.ex.replace(/\*[^*]+\*/, `${verb} ___`), part, shuffle(pool), `${e.word} = ${e.es}`), wordId: e.id };
    }
    case 'num': {
      const n = i;
      const flip = (x: number) => {
        // trece/treinta, quince/cincuenta… la confusión clásica
        const t = x % 100;
        if (t >= 13 && t <= 19) return x - t + (t - 10) * 10;
        if (t >= 30 && t % 10 === 0) return x - t + 10 + t / 10;
        return x + 10;
      };
      const s = String(n);
      const swap = s.length >= 2 ? Number(s.slice(0, -2) + s[s.length - 1] + s[s.length - 2]) : n + 1;
      const wrong = [flip(n), swap, n + (n >= 1000 ? 1000 : 100), n >= 1000 ? Number(s[0] + s.slice(2)) : n + 1, n + 11].filter((x) => x !== n && x > 0).map(fmtN);
      return { ...mc(`gm:num:${n}`, 'listening', numLevel(n), 'Números de oído', 'Escucha: ¿qué número has oído?', '', fmtN(n), wrong, `${fmtN(n)} = ${numberWords(n)}`, numberWords(n)), hideText: true, prompt: numberWords(n) };
    }
    case 'hr': {
      const m = i % 720;
      const wrong = [(m + 720 - 2 * (m % 60) + 60) % 720, (m + 60) % 720, (m + 30) % 720, (m + 15) % 720, (m + 660) % 720].filter((x) => x !== m).map(clock);
      return { ...mc(`gm:hr:${m}`, 'listening', m % 15 === 0 ? 1 : 2, 'La hora de oído', 'Escucha: ¿qué hora es?', '', clock(m), wrong, `${clock(m)} = ${timeWords(m)}`, `It's ${timeWords(m)}`), hideText: true, prompt: `It's ${timeWords(m)}.` };
    }
    case 'tit': {
      const r = readings[i];
      if (!r) return null;
      const body = r.text.replace(/\s+/g, ' ').split(' ');
      const others = shuffle(readings.filter((x) => x.id !== r.id && x.level === r.level)).map((x) => x.title);
      return mc(`gm:tit:${i}`, 'reading', lvlNum(r.level), 'Titulares', 'Lee el comienzo: ¿qué título le corresponde?', body.slice(0, 55).join(' ') + (body.length > 55 ? '…' : ''), r.title, others, `Texto: «${r.title}» (${r.level})`);
    }
    case 'clz': {
      const r = readings[i];
      if (!r) return null;
      const ss = r.text.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/).filter((x) => x.split(' ').length >= 7 && x.split(' ').length <= 32);
      const sn = ss[variant % Math.max(1, ss.length)];
      if (!sn) return null;
      // se vacía la palabra más larga que esté en el banco de vocabulario
      const cands = (sn.match(/[A-Za-z]{5,}/g) || []).filter((w) => vocabByWord.has(w.toLowerCase())).sort((a, b) => b.length - a.length);
      const w = cands[0];
      if (!w) return null;
      const e = vocabByWord.get(w.toLowerCase())!;
      const ds = shuffle(vocab.filter((v) => v.pos === e.pos && Math.abs(v.level - e.level) <= 1 && /^[a-z]+$/.test(v.word) && v.word !== e.word)).slice(0, 12).map((v) => v.word);
      return mc(`gm:clz:${i}:${variant}`, 'reading', lvlNum(r.level), 'Cloze de lectura', 'Elige la palabra que falta en esta frase de un texto', sn.replace(new RegExp(`\\b${w}\\b`), '___'), w.toLowerCase() === w ? w : w.toLowerCase(), ds, `${e.word} = ${e.es} · del texto «${r.title}»`);
    }
    case 'miss': {
      const sn = sentences[i];
      if (!sn) return null;
      const ws = sn.text.split(' ');
      if (ws.length < 5 || ws.length > 16) return null;
      const idx = ws.map((w, k) => ({ w: w.replace(/[^A-Za-z']/g, ''), k })).filter((x) => x.w.length >= 4 && x.k > 0).sort((a, b) => b.w.length - a.w.length)[0];
      if (!idx) return null;
      return { id: `gm:miss:${i}`, skill: 'listening', level: sn.level, kind: 'type', label: 'Palabra perdida', instruction: 'Escucha la frase y escribe la palabra que falta', prompt: ws.map((w, k) => (k === idx.k ? w.replace(idx.w, '___') : w)).join(' '), audio: sn.text, answers: [idx.w], explain: sn.text };
    }
    case 'bee': {
      const e = vocab[i];
      if (!e) return null;
      return { id: `${e.id}:bee`, skill: 'listening', level: e.level, kind: 'type', label: 'Spelling bee', instruction: 'Escucha y escribe la palabra', prompt: `${e.word} = ${e.es}`, hideText: true, audio: e.word, answers: [e.word], wordId: e.id, explain: `${e.word} = ${e.es}` };
    }
  }
  const g = GEN[set];
  const r = DATA2[set]?.[i];
  if (!g || !r) return null;
  const level = lvAt(g.base, i, DATA2[set].length);
  const id = `gm:${set}:${i}`;
  if (g.src) return { id, skill: g.skill, level, kind: 'type', label: g.label, instruction: g.instruction, prompt: r[0], answers: alts(r[1]), explain: `${r[0]} → ${alts(r[1])[0]}` };
  if (g.kind === 'type') return { id, skill: g.skill, level, kind: 'type', label: g.label, instruction: g.instruction, prompt: r[0], answers: alts(r[1]), explain: r[2] || (r[0].includes('___') ? r[0].replace('___', alts(r[1])[0].toUpperCase()) : `${r[0]} → ${alts(r[1])[0]}`) };
  return mc(id, g.skill, level, g.label, g.instruction, r[0], r[1], alts(r[2] ?? ''), r[3] || (r[0].includes('___') ? r[0].replace('___', r[1].toUpperCase()) : `${r[0]} → ${r[1]}`));
}

function sizeOf(set: SetId): number {
  if (set === 'ok') return grammarItems.filter((g) => g.type === 'error').length;
  if (set === 'prt') return vocab.filter((v) => v.tag === 'phrasal').length;
  if (set === 'bee') return vocab.length;
  if (set === 'tit' || set === 'clz') return readings.length;
  if (set === 'miss') return sentences.length;
  if (set === 'hr') return 144;
  if (set in DATA2) return DATA2[set].length;
  return DATA[set as OldSet]?.length ?? 0;
}

/** Elige un ítem al azar del conjunto, cerca del nivel pedido y sin repetir en la sesión. */
export function gameExercise(set: SetId, exclude: Set<string>, level?: number, forceVariant?: number): Exercise {
  const n = sizeOf(set);
  for (let tries = 0; tries < 40; tries++) {
    const i = set === 'num' ? randomNumber(Math.max(1, (level ?? 2) + (Math.random() < 0.3 ? -1 : 0))) : set === 'hr' ? Math.floor(Math.random() * n) * 5 : Math.floor(Math.random() * n);
    const variant = forceVariant ?? (set === 'irr' ? Math.floor(Math.random() * 3) : set === 'ok' ? Math.floor(Math.random() * 2) : set === 'clz' ? Math.floor(Math.random() * 12) : 0);
    const ex = gameItem(set, i, variant);
    if (!ex) continue;
    const key = set === 'ok' ? ex.id.replace(/:\d$/, '') : ex.id;
    if (exclude.has(key) && tries < 35) continue;
    if (level !== undefined && Math.abs(ex.level - level) > 1 && tries < 25 && set !== 'num' && set !== 'hr') continue;
    if (set === 'bee' && (ex.answers[0].includes(' ') || ex.answers[0].length < 4) && tries < 35) continue;
    exclude.add(key);
    return ex;
  }
  for (let i = 0; i < 50; i++) {
    const ex = gameItem(set, set === 'num' ? 42 + i : i, forceVariant ?? 0);
    if (ex) return ex;
  }
  return gameItem('prep', 0)!;
}

/** Para el repaso espaciado: reconstruye el ejercicio desde su id. */
export function gameFromId(id: string): Exercise | null {
  const [, set, i, v] = id.split(':');
  return gameItem(set as SetId, Number(i), Number(v) || 0);
}

/** Mezcla rápida (Contrarreloj): solo ejercicios de elegir. */
export const FAST_SETS: SetId[] = ['prep', 'coll', 'syn', 'count', 'conf', 'irr', 'ok', 'real', 'formal', 'gerinf', 'quant', 'art', 'anton', 'prefix', 'pphr', 'spell', 'odd', 'binom'];
/** Todos los conjuntos de elegir o escribir (para «Todoterreno»). */
export const ALL_SETS: SetId[] = ['prep', 'coll', 'syn', 'count', 'conf', 'irr', 'ok', 'real', 'formal', 'wf', 'idiom', 'prt', ...Object.keys(GEN)];
export const randomFast = (exclude: Set<string>, level?: number) => {
  let ex = gameExercise(pick(FAST_SETS), exclude, level);
  if (ex.kind !== 'mc') ex = gameExercise('prep', exclude, level);
  return ex;
};
