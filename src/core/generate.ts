/* Generadores de ejercicios a partir del contenido. Todo adaptativo al nivel de cada skill. */
import type { Exercise, GrammarItem, ReadingText, Skill, VocabEntry, WritingItem } from './types.ts';
import { lvlNum } from './types.ts';
import {
  grammarItems, itemsByTopic, topicById, vocab, vocabById, readings, writingItems, sentences, cleanEx, markedWord, itemsAtLevel,
} from './content.ts';
import { getState, update } from './store.ts';
import { targetLevel } from './rating.ts';
import { pick, shuffle, uniq, rnd, today, norm } from './text.ts';
import { dueIds } from './srs.ts';
import { gameFromId } from './minigames.ts';

export interface PickOpts {
  level?: number;
  exclude?: Set<string>;
  placement?: boolean;
  exam?: boolean;
  topicId?: string;
  tag?: string;
  noLearn?: boolean;
}

/** Elige ítems priorizando: no vistos, fallados recientemente y no repetidos en la sesión. */
function choose<T extends { id: string }>(list: T[], exclude?: Set<string>): T {
  const s = getState();
  const pool = list.filter((x) => !exclude?.has(x.id));
  const src = pool.length ? pool : list;
  const now = Date.now();
  const weighted = src.map((x) => {
    const st = s.items[x.id];
    let w = 1;
    if (!st) w = 3;
    else {
      const acc = st.c / st.s;
      w = 0.6 + (1 - acc) * 3;
      if (now - st.last < 10 * 60_000) w *= 0.2;
    }
    return { x, w };
  });
  let t = Math.random() * weighted.reduce((a, b) => a + b.w, 0);
  for (const { x, w } of weighted) if ((t -= w) <= 0) return x;
  return weighted[weighted.length - 1].x;
}

/* ================= GRAMMAR ================= */

export function grammarExercise(it: GrammarItem, asOrder = false): Exercise {
  const topic = topicById.get(it.topicId);
  const base = {
    id: it.id,
    skill: 'grammar' as Skill,
    level: it.level,
    label: `Grammar · ${topic?.title ?? ''}`,
    explain: it.note ? `${it.note}` : topic?.rule,
    ruleTopic: it.topicId,
  };
  if (asOrder && it.sentence) {
    return { ...base, id: it.id + ':o', kind: 'order', instruction: 'Ordena las palabras para formar la frase correcta', prompt: '', tokens: shuffle(it.sentence.split(' ')), answers: [it.sentence] };
  }
  switch (it.type) {
    case 'mc':
      return { ...base, kind: 'mc', instruction: 'Elige la opción correcta', prompt: it.prompt, options: shuffle([it.answers[0], ...(it.options || [])]), answers: [it.answers[0]] };
    case 'gap':
      return { ...base, kind: 'type', instruction: 'Escribe lo que falta (usa la forma correcta)', prompt: it.prompt, answers: it.answers };
    case 'error':
      return { ...base, kind: 'type', instruction: 'La frase tiene un error. Escríbela corregida.', prompt: it.prompt, answers: it.answers };
    case 'trans':
      return {
        ...base, kind: 'type',
        instruction: 'Completa la 2ª frase para que signifique lo mismo. Usa la palabra en MAYÚSCULAS sin cambiarla.',
        prompt: `${it.prompt}\n\n${it.key}\n${it.options?.[0] ?? ''}`, answers: it.answers,
      };
    case 'translate':
      return { ...base, kind: 'type', instruction: 'Traduce al inglés', prompt: it.prompt, answers: it.answers };
  }
}

/* Variantes de un ítem de gramática (para los juegos de cada tema). El id es `<id del ítem>:<variante>` y se
   puede reconstruir (repaso de fallos): o = ordenar · tfN = ¿correcta o no? · d = dictado · fe = oído fino. */
export const TF_YES = '✓ Correcta';
export const TF_NO = '✗ Incorrecta';
const NOTHING = /^(—|–|-|∅|\(nothing\)|\(nada\))$/;
export function fillGap(prompt: string, w: string): string {
  const out = prompt.replace('___', NOTHING.test(w.trim()) ? '' : w).replace(/\s*\([^)]*\)/, '').replace(/\s{2,}/g, ' ').replace(/\s+([.,?!])/g, '$1').trim();
  return out.charAt(0).toUpperCase() + out.slice(1);
}
/** Nº de variantes «¿correcta o no?» de un ítem (0 = no sirve para ese juego). */
export function tfCount(it: GrammarItem): number {
  if (it.type === 'error') return 2;
  if (it.type === 'mc' && it.prompt.includes('___')) return 1 + (it.options?.length ?? 0);
  return 0;
}
export function grammarVariant(it: GrammarItem, v = ''): Exercise | null {
  const topic = topicById.get(it.topicId);
  const base = { skill: 'grammar' as Skill, level: it.level, ruleTopic: it.topicId };
  if (!v) return grammarExercise(it);
  if (v[0] === 'o' && v !== 'oa') return it.sentence ? { ...grammarExercise(it, true), id: `${it.id}:${v}` } : null;
  if (v.startsWith('tf')) {
    const k = Number(v.slice(2)) || 0;
    if (k >= tfCount(it)) return null;
    const right = it.type === 'error' ? it.answers[0] : fillGap(it.prompt, it.answers[0]);
    const shown = k === 0 ? right : it.type === 'error' ? it.prompt : fillGap(it.prompt, it.options![k - 1]);
    return {
      ...base, id: `${it.id}:${v}`, kind: 'mc', label: `Grammar · ${topic?.title ?? ''}`, instruction: '¿Esta frase es correcta?', prompt: shown,
      options: [TF_YES, TF_NO], answers: [k === 0 ? TF_YES : TF_NO],
      explain: k === 0 ? it.note ?? topic?.rule : `Lo correcto: ${right}${it.note ? ' · ' + it.note : ''}`,
    };
  }
  if (v === 'd') {
    if (!it.sentence) return null;
    return { ...base, id: `${it.id}:d`, skill: 'listening', kind: 'type', dictation: true, label: `Grammar · ${topic?.title ?? ''} · Dictado`, instruction: 'Escucha y escribe exactamente lo que oyes', prompt: it.sentence, hideText: true, audio: it.sentence, answers: [it.sentence], explain: topic?.rule };
  }
  if (v === 'fe') {
    if (it.type !== 'mc' || !it.prompt.includes('___')) return null;
    const right = fillGap(it.prompt, it.answers[0]);
    const options = uniq(shuffle([right, ...(it.options || []).map((o) => fillGap(it.prompt, o))]));
    if (options.length < 2) return null;
    return { ...base, id: `${it.id}:fe`, skill: 'listening', kind: 'mc', label: `Grammar · ${topic?.title ?? ''} · Oído fino`, instruction: 'Escucha con atención: ¿qué frase has oído exactamente?', prompt: '', audio: right, options, answers: [right], explain: it.note ?? topic?.rule };
  }
  /* --- variantes añadidas (juegos de gramática ×3) --- */
  const label = `Grammar · ${topic?.title ?? ''}`;
  const mates = () => (itemsByTopic.get(it.topicId) || []).filter((x) => x.id !== it.id);
  const gapMc = it.type === 'mc' && it.prompt.includes('___');
  const stripHint = (p: string) => p.replace(/\s*\([^)]*\)\s*$/, '').replace(/\s*\([^)]*\)/, '');
  if (v === 'gm') {
    // hueco con opciones: las alternativas son respuestas de otros huecos del mismo tema
    if (it.type !== 'gap') return null;
    const good = it.answers[0];
    const ds = uniq(shuffle(mates().filter((x) => x.type === 'gap' || x.type === 'mc').map((x) => x.answers[0]))).filter((x) => !it.answers.some((a) => norm(a) === norm(x)) && !NOTHING.test(x)).slice(0, 3);
    if (ds.length < 2) return null;
    return { ...base, id: `${it.id}:gm`, kind: 'mc', label, instruction: 'Elige lo que falta', prompt: it.prompt, options: shuffle([good, ...ds]), answers: [good], explain: it.note ?? topic?.rule };
  }
  if (v === 'ty' || v === 'fl') {
    // sin opciones: lo que normalmente eliges, ahora lo escribes (fl: con la primera letra de pista)
    if (!gapMc || NOTHING.test(it.answers[0].trim())) return null;
    const a = it.answers[0];
    return {
      ...base, id: `${it.id}:${v}`, kind: 'type', label, instruction: v === 'fl' ? 'Escribe lo que falta (te doy la primera letra)' : 'Decide cuál es y escríbela tú (sin tocar)',
      prompt: v === 'fl' ? `${it.prompt}\n\nEmpieza por «${a[0]}» · ${a.length} letras` : `${it.prompt}\n\n${shuffle([a, ...(it.options || [])]).join('  ·  ')}`, answers: it.answers, explain: it.note ?? topic?.rule,
    };
  }
  if (v === 'ew') {
    // señala la palabra que está mal
    if (it.type !== 'error') return null;
    const clean = (w: string) => w.replace(/^[^\w']+|[^\w']+$/g, '');
    const right = new Set(it.answers[0].split(' ').map((w) => clean(w).toLowerCase()));
    const ws = uniq(it.prompt.split(' ').map(clean).filter(Boolean));
    const bad = ws.filter((w) => !right.has(w.toLowerCase()));
    if (bad.length !== 1 || ws.length < 4) return null;
    const others = shuffle(ws.filter((w) => w !== bad[0])).slice(0, 3);
    return { ...base, id: `${it.id}:ew`, kind: 'mc', label, instruction: '¿Qué palabra está mal o sobra?', prompt: it.prompt, options: shuffle([bad[0], ...others]), answers: [bad[0]], explain: `Lo correcto: ${it.answers[0]}${it.note ? ' · ' + it.note : ''}` };
  }
  if (v === 'tm' || v === 'ti') {
    // traducción con opciones (tm: es→en · ti: en→es)
    if (it.type !== 'translate') return null;
    const tr = mates().filter((x) => x.type === 'translate');
    const good = v === 'tm' ? it.answers[0] : it.prompt;
    const ds = uniq(shuffle(tr).map((x) => (v === 'tm' ? x.answers[0] : x.prompt))).filter((x) => x !== good).slice(0, 3);
    if (ds.length < 2) return null;
    return v === 'tm'
      ? { ...base, id: `${it.id}:tm`, kind: 'mc', label, instruction: '¿Cuál es la traducción correcta?', prompt: it.prompt, options: shuffle([good, ...ds]), answers: [good], explain: it.note ?? topic?.rule }
      : { ...base, id: `${it.id}:ti`, kind: 'mc', label, instruction: '¿Qué significa esta frase?', prompt: it.answers[0], audio: it.answers[0], options: shuffle([good, ...ds]), answers: [good], explain: it.note ?? topic?.rule };
  }
  if (v === 'lg') {
    // escucha la frase entera y escribe la palabra que falta
    if (!gapMc || NOTHING.test(it.answers[0].trim())) return null;
    return { ...base, id: `${it.id}:lg`, skill: 'listening', kind: 'type', label: `${label} · Escucha y completa`, instruction: 'Escucha la frase y escribe lo que falta', prompt: stripHint(it.prompt), audio: fillGap(it.prompt, it.answers[0]), answers: it.answers, explain: it.note ?? topic?.rule };
  }
  if (v === 'oa') {
    // escucha y ordena
    if (!it.sentence) return null;
    return { ...grammarExercise(it, true), id: `${it.id}:oa`, skill: 'listening', label: `${label} · Escucha y ordena`, instruction: 'Escucha la frase y móntala en orden', audio: it.sentence };
  }
  return null;
}

export function pickGrammar(o: PickOpts = {}): Exercise[] {
  const s = getState();
  let list: GrammarItem[];
  if (o.topicId) list = itemsByTopic.get(o.topicId) || [];
  else {
    const lv = o.level ?? (o.placement ? Math.round(s.skills.grammar.r) : targetLevel(s.skills.grammar.r));
    list = itemsAtLevel(grammarItems, lv);
    // fundamentos: si un tema por debajo de tu nivel va flojo, se cuela con más frecuencia
    if (!o.placement && !o.exam && Math.random() < 0.35) {
      const weak = [...itemsByTopic.keys()].filter((tid) => {
        const t = s.topics[tid];
        const tl = lvlNum(topicById.get(tid)!.level);
        return tl <= Math.floor(s.skills.grammar.r) + 0 && t && t.s >= 4 && t.c / t.s < 0.7;
      });
      if (weak.length) list = itemsByTopic.get(pick(weak))!;
    }
  }
  const it = choose(list, o.exclude);
  const canOrder = !o.placement && !o.exam && it.sentence && it.sentence.split(' ').length >= 4 && it.sentence.split(' ').length <= 12;
  return [grammarExercise(it, !!canOrder && Math.random() < 0.12)];
}

/* ================= VOCABULARY ================= */

const allVocab = (): VocabEntry[] => {
  const s = getState();
  const custom: VocabEntry[] = s.customWords.map((c) => ({ id: c.id, word: c.word, pos: '', es: c.es, ex: c.ex, level: 4, tag: 'custom' }));
  return custom.length ? [...vocab, ...custom] : vocab;
};
export const findWord = (id: string) => vocabById.get(id) || allVocab().find((v) => v.id === id);

function distractors(e: VocabEntry, n: number, field: 'es' | 'word'): string[] {
  const pool = allVocab().filter((v) => v.id !== e.id && v[field] !== e[field]);
  const same = pool.filter((v) => (v.pos === e.pos || v.tag === e.tag) && Math.abs(v.level - e.level) <= 1);
  const src = same.length >= n * 2 ? same : pool;
  return uniq(shuffle(src).map((v) => v[field])).filter((x) => x.toLowerCase() !== e[field].toLowerCase()).slice(0, n);
}

export function learnCard(e: VocabEntry): Exercise {
  return { id: e.id + ':learn', skill: 'vocab', level: e.level, kind: 'learn', label: 'Palabra nueva', instruction: 'Escúchala, lee el ejemplo y quédate con ella', prompt: e.word, answers: [], learn: e, wordId: e.id, audio: e.word };
}

type VMode = 'en-es' | 'es-en' | 'gap' | 'spell' | 'audio';
export function vocabExercise(e: VocabEntry, mode: VMode): Exercise {
  const base = { id: `${e.id}:${mode}`, skill: 'vocab' as Skill, level: e.level, wordId: e.id, label: `Vocabulary · ${tagName(e.tag)}`, explain: `${e.word} = ${e.es}${e.note ? ' · ' + e.note : ''}${e.ex ? '\n' + cleanEx(e.ex) : ''}` };
  const marked = markedWord(e.ex);
  if (mode === 'gap' && marked) {
    const opts = e.tag === 'phrase' ? [] : allVocab().filter((v) => v.id !== e.id && v.pos === e.pos && markedWord(v.ex)).map((v) => markedWord(v.ex)!);
    const ds = uniq(shuffle(opts)).filter((x) => x.toLowerCase() !== marked.toLowerCase()).slice(0, 3);
    if (ds.length === 3)
      return { ...base, kind: 'mc', instruction: 'Completa la frase con la palabra adecuada', prompt: e.ex.replace(/\*[^*]+\*/, '___'), options: shuffle([marked, ...ds]), answers: [marked] };
    mode = 'en-es';
  }
  if (mode === 'es-en') return { ...base, kind: 'mc', instruction: '¿Cómo se dice en inglés?', prompt: e.es, options: shuffle([e.word, ...distractors(e, 3, 'word')]), answers: [e.word] };
  if (mode === 'spell') return { ...base, kind: 'type', instruction: 'Escríbelo en inglés', prompt: `${e.es}${e.pos ? ` (${e.pos})` : ''}`, answers: [e.word, ...e.word.split(' / ')] };
  if (mode === 'audio') return { ...base, skill: 'listening', kind: 'mc', instruction: 'Escucha: ¿qué significa?', prompt: e.word, hideText: true, audio: e.word, options: shuffle([e.es, ...distractors(e, 3, 'es')]), answers: [e.es] };
  return { ...base, kind: 'mc', instruction: '¿Qué significa?', prompt: e.word, audio: e.word, options: shuffle([e.es, ...distractors(e, 3, 'es')]), answers: [e.es] };
}

export const TAG_NAME: Record<string, string> = {
  core: 'General', academic: 'Académico', linker: 'Conectores', phrasal: 'Phrasal verbs', phrase: 'Para defenderte', 'false-friend': 'Falsos amigos', custom: 'Mis palabras',
};
const tagName = (t: string) => TAG_NAME[t] || t;

function modeFor(e: VocabEntry, reps: number): VMode {
  const opts: VMode[] = reps === 0 ? ['en-es', 'gap'] : reps < 3 ? ['en-es', 'es-en', 'gap', 'gap'] : ['es-en', 'gap', 'spell', 'en-es'];
  if (e.tag === 'phrase') return pick(['es-en', 'en-es']);
  return pick(opts);
}

/** Siguiente palabra nueva: por orden de frecuencia, la mitad de las veces del nivel objetivo
 *  y la otra mitad del nivel más bajo que aún tenga palabras pendientes (sin bajar de 2 niveles por debajo). */
export function nextNew(lv: number, tag?: string, exclude?: Set<string>): VocabEntry | undefined {
  const s = getState();
  const fresh = vocab.filter((v) => !s.srs[v.id] && !exclude?.has(v.id) && v.level <= lv && v.level >= lv - 2 && (!tag || v.tag === tag));
  if (!fresh.length) return undefined;
  const atLv = fresh.filter((v) => v.level === Math.min(lv, 5));
  const src = atLv.length && Math.random() < 0.5 ? atLv : fresh.sort((a, b) => a.level - b.level || (a.ord ?? 0) - (b.ord ?? 0));
  return src[rnd(Math.min(6, src.length))];
}

export function pickVocab(o: PickOpts = {}): Exercise[] {
  const s = getState();
  const exclude = o.exclude;
  // 1) repaso espaciado pendiente
  if (!o.placement && !o.exam && Math.random() < 0.45) {
    const due = dueIds(s, 'v:').filter((id) => !exclude?.has(id + ':x')).map(findWord).filter(Boolean) as VocabEntry[];
    const due2 = due.concat(dueIds(s, 'c:').map(findWord).filter(Boolean) as VocabEntry[]);
    if (due2.length) {
      const e = due2[rnd(Math.min(5, due2.length))];
      exclude?.add(e.id + ':x');
      return [vocabExercise(e, modeFor(e, s.srs[e.id]?.reps ?? 0))];
    }
  }
  const lv = o.level ?? (o.placement ? Math.round(s.skills.vocab.r) : targetLevel(s.skills.vocab.r));
  // máximo de palabras nuevas al día: pasado el tope, se practica con las que ya conoces
  const capped = !o.placement && !o.exam && (s.days[today()]?.learned ?? 0) >= s.settings.newWordsMax;
  let pool = itemsAtLevel(o.tag ? vocab.filter((v) => v.tag === o.tag) : vocab, lv);
  if (capped) {
    const known = pool.filter((v) => s.srs[v.id]);
    if (known.length >= 4) pool = known;
  }
  const fresh = !capped && !o.placement && !o.exam && !o.noLearn && Math.random() < 0.7 ? nextNew(lv, o.tag, exclude) : undefined;
  const e = fresh ?? choose(pool, exclude);
  exclude?.add(e.id);
  if (o.placement || o.exam) return [vocabExercise(e, Math.random() < 0.7 ? 'en-es' : 'gap')];
  const card = s.srs[e.id];
  if (!card && !o.noLearn && !capped) return [learnCard(e), vocabExercise(e, 'en-es')];
  return [vocabExercise(e, modeFor(e, card?.reps ?? 0))];
}

/* ================= LISTENING ================= */

export function dictation(lv: number, exclude?: Set<string>): Exercise {
  const maxWords = lv <= 2 ? 9 : lv === 3 ? 13 : 18;
  const pool = itemsAtLevel(sentences.filter((x) => x.text.split(' ').length <= maxWords && x.text.split(' ').length >= 3), lv).map((x) => ({ ...x, id: 'd:' + x.src }));
  const sn = choose(pool, exclude);
  return { id: sn.id, skill: 'listening', level: sn.level, kind: 'type', dictation: true, label: 'Listening · Dictado', instruction: 'Escucha y escribe exactamente lo que oyes', prompt: sn.text, hideText: true, audio: sn.text, answers: [sn.text] };
}

export function fineEar(lv: number, exclude?: Set<string>): Exercise | null {
  const pool = itemsAtLevel(grammarItems.filter((g) => g.type === 'mc' && g.sentence && g.prompt.includes('___')), lv);
  if (!pool.length) return null;
  const it = choose(pool, exclude);
  const fill = (w: string) => it.prompt.replace('___', w).replace(/\s*\([^)]*\)/, '');
  const options = shuffle([it.answers[0], ...(it.options || [])]).map(fill);
  return { id: 'fe:' + it.id, skill: 'listening', level: it.level, kind: 'mc', label: 'Listening · Oído fino', instruction: 'Escucha con atención: ¿qué frase has oído exactamente?', prompt: '', audio: fill(it.answers[0]), options: uniq(options), answers: [fill(it.answers[0])], ruleTopic: undefined, explain: topicById.get(it.topicId)?.rule };
}

export function pickListening(o: PickOpts = {}): Exercise[] {
  const s = getState();
  const lv = o.level ?? (o.placement ? Math.round(s.skills.listening.r) : targetLevel(s.skills.listening.r));
  const x = Math.random();
  if (!o.placement && x < 0.12) {
    const texts = readings.filter((r) => Math.abs(lvlNum(r.level) - lv) <= 0 && r.text.length < 1800);
    if (texts.length) return readingExercises(pick(texts), true).slice(0, 4);
  }
  if (x < 0.45) {
    const f = fineEar(lv, o.exclude);
    if (f) return [f];
  }
  if (x < 0.55 && !o.exam) {
    const e = choose(itemsAtLevel(vocab, lv), o.exclude);
    return [vocabExercise(e, 'audio')];
  }
  return [dictation(lv, o.exclude)];
}

/* ================= READING ================= */

export function readingExercises(t: ReadingText, audioOnly = false): Exercise[] {
  return t.questions.map((q, i) => ({
    id: `r:${t.id}:${i}${audioOnly ? ':a' : ''}`,
    skill: (audioOnly ? 'listening' : 'reading') as Skill,
    level: lvlNum(t.level),
    kind: 'mc' as const,
    label: `${audioOnly ? 'Listening' : 'Reading'} · ${t.title}`,
    instruction: audioOnly ? 'Escucha el texto (sin leerlo) y responde' : 'Lee el texto y responde',
    prompt: q.q,
    options: q.options.length === 3 && q.options[0] === 'True' ? q.options : shuffle(q.options),
    answers: [q.options[q.answer]],
    passage: { id: t.id, title: t.title, text: t.text, audioOnly },
  }));
}

export function pickReading(o: PickOpts = {}): Exercise[] {
  const s = getState();
  const lv = o.level ?? (o.placement ? Math.round(s.skills.reading.r) : targetLevel(s.skills.reading.r));
  const withLv = readings.map((r) => ({ id: r.id, level: lvlNum(r.level) }));
  const ids = new Set(itemsAtLevel(withLv, lv).map((r) => r.id));
  const src = readings.filter((r) => ids.has(r.id));
  const unread = src.filter((r) => !s.readTexts[r.id] && !o.exclude?.has(r.id));
  const notNow = src.filter((r) => !o.exclude?.has(r.id));
  const t = unread.length ? pick(unread) : notNow.length ? notNow.sort((a, b) => (s.readTexts[a.id]?.t ?? 0) - (s.readTexts[b.id]?.t ?? 0))[0] : pick(src);
  o.exclude?.add(t.id);
  const ex = readingExercises(t);
  return o.placement ? ex.slice(0, 3) : ex;
}

/* ================= WRITING ================= */

export function writingExercise(w: WritingItem): Exercise {
  const base = { id: w.id, skill: 'writing' as Skill, level: w.level, explain: w.note };
  switch (w.type) {
    case 'trans':
      return { ...base, kind: 'type', label: 'Writing · Transformación', instruction: 'Completa la 2ª frase para que signifique lo mismo. Usa la palabra en MAYÚSCULAS sin cambiarla (2–5 palabras).', prompt: `${w.prompt}\n\n${w.key}\n${w.start}`, answers: w.answers };
    case 'error':
      return { ...base, kind: 'type', label: 'Writing · Errores típicos', instruction: 'Hay un error típico de hispanohablante. Escribe la frase corregida.', prompt: w.prompt, answers: w.answers };
    case 'translate':
      return { ...base, kind: 'type', label: 'Writing · Traducción', instruction: 'Traduce al inglés (natural, no palabra por palabra)', prompt: w.prompt, answers: w.answers };
    case 'linker':
      return w.options
        ? { ...base, kind: 'mc', label: 'Writing · Cohesión', instruction: 'Elige el conector o la expresión que mejor encaja', prompt: w.prompt, options: shuffle([w.answers[0], ...w.options]), answers: [w.answers[0]] }
        : { ...base, kind: 'type', label: 'Writing · Cohesión', instruction: 'Completa el hueco', prompt: w.prompt, answers: w.answers };
  }
}

export function pickWriting(o: PickOpts = {}): Exercise[] {
  const s = getState();
  const lv = o.level ?? (o.placement ? Math.round(s.skills.writing.r) : targetLevel(s.skills.writing.r));
  // ordenar frases: construcción de frases (útil en niveles bajos)
  if (!o.placement && !o.exam && lv <= 3 && Math.random() < 0.25) {
    const g = choose(itemsAtLevel(grammarItems.filter((x) => x.sentence && x.sentence.split(' ').length >= 5 && x.sentence.split(' ').length <= 12), lv), o.exclude);
    const ex = grammarExercise(g, true);
    return [{ ...ex, skill: 'writing', label: 'Writing · Construye la frase', ruleTopic: undefined }];
  }
  return [writingExercise(choose(itemsAtLevel(writingItems, lv), o.exclude))];
}

/* ================= Selector general ================= */

export function pickFor(skill: Skill, o: PickOpts = {}): Exercise[] {
  switch (skill) {
    case 'grammar':
      return pickGrammar(o);
    case 'vocab':
      return pickVocab(o);
    case 'listening':
      return pickListening(o);
    case 'reading':
      return pickReading(o);
    case 'writing':
      return pickWriting(o);
  }
}

/** Repaso: ítems vencidos del repaso espaciado de cualquier skill. */
export function pickReview(exclude?: Set<string>): Exercise[] | null {
  const s = getState();
  const ids = dueIds(s).filter((id) => !exclude?.has('rv:' + id));
  for (const id of ids.slice(0, 30)) {
    exclude?.add('rv:' + id);
    const ex = reviewOne(s, id);
    if (ex && ex[0]) return ex;
    // id huérfano (contenido que ya no existe): se retira del repaso
    update((st) => void delete st.srs[id]);
  }
  return null;
}

/** Reconstruye un ejercicio a partir de su id (repaso de fallos). */
export function exerciseFromId(id: string): Exercise | null {
  return reviewOne(getState(), id)?.[0] ?? null;
}

function reviewOne(s: ReturnType<typeof getState>, id: string): Exercise[] | null {
  if (id.startsWith('gm:')) {
    const g = gameFromId(id);
    return g ? [g] : null;
  }
  if (id.startsWith('v:') || id.startsWith('c:')) {
    const e = findWord(id);
    return e ? [vocabExercise(e, modeFor(e, s.srs[id]?.reps ?? 0))] : null;
  }
  if (id.startsWith('g:')) {
    const m = id.match(/^(g:[^:]+:\d+)(?::(.+))?$/);
    const it = m && grammarItems.find((g) => g.id === m[1]);
    if (!it) return null;
    // lo que se falló ordenando se repasa en su forma normal; el resto, en la misma variante
    const v = m![2] && (m![2][0] !== 'o' || m![2] === 'oa') ? m![2] : '';
    const ex = grammarVariant(it, v) ?? grammarExercise(it);
    return [ex];
  }
  if (id.startsWith('w:')) {
    const it = writingItems.find((w) => w.id === id);
    return it ? [writingExercise(it)] : null;
  }
  if (id.startsWith('d:')) {
    const src = id.slice(2);
    const sn = sentences.find((x) => x.src === src);
    return sn ? [{ id, skill: 'listening', level: sn.level, kind: 'type', dictation: true, label: 'Listening · Dictado', instruction: 'Escucha y escribe exactamente lo que oyes', prompt: sn.text, hideText: true, audio: sn.text, answers: [sn.text] }] : null;
  }
  if (id.startsWith('r:')) {
    const [, tid, qi, a] = id.split(':');
    const t = readings.find((r) => r.id === tid);
    return t ? [readingExercises(t, a === 'a')[Number(qi)]] : null;
  }
  if (id.startsWith('fe:')) {
    const it = grammarItems.find((g) => g.id === id.slice(3));
    if (it) {
      const f = fineEar(it.level, new Set(grammarItems.filter((g) => g.id !== it.id).map((g) => g.id)));
      return f ? [f] : null;
    }
  }
  return null;
}
