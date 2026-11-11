/* Planes de sesión: Flujo, Camino, prueba de nivel, exámenes, juegos. Un plan = generador de ejercicios + reglas. */
import type { Exercise, Level, Skill } from './types.ts';
import { LEVELS, SKILLS, SKILL_NAME, lvlNum } from './types.ts';
import { getState, update, type State, type Fail } from './store.ts';
import { grammarTopics, itemsByTopic, vocab, readings, readingById, topicById } from './content.ts';
import { pickFor, pickReview, grammarExercise, learnCard, vocabExercise, readingExercises, pickVocab, exerciseFromId } from './generate.ts';
import { shuffle, pick, today } from './text.ts';
import { levelOf, pCorrect } from './rating.ts';
import { recordReading } from './progress.ts';
import { gameExercise, randomFast, wordGame, wordOk, ALL_SETS, type SetId, type WordMode } from './minigames.ts';
import { grammarVariant, writingExercise } from './generate.ts';
import { grammarItems, writingItems } from './content.ts';
import type { GrammarCat, VocabEntry } from './types.ts';
import { CAT_NAME, CAT_ICON } from './types.ts';
import { SUBLEVELS, topicsOf, wordsOf, readingsOf } from './curriculum.ts';
import { wheelExercise, wheelStatus } from './wheel.ts';

export interface Ctx {
  answered: number;
  correct: number;
  run: number;
  lives: number;
  exclude: Set<string>;
  results: { ex: Exercise; ok: boolean; given?: string }[];
  block: number;
  blockSkill?: Skill;
}
export interface Result {
  answered: number;
  correct: number;
  /** total previsto (o respondidas, si la sesión es infinita) */
  total: number;
  /** se respondieron todas las previstas */
  complete: boolean;
  /** aciertos / total previsto */
  pct: number;
  results: { ex: Exercise; ok: boolean; given?: string }[];
}
export interface Plan {
  title: string;
  /** Devuelve el siguiente grupo de ejercicios o null para terminar. */
  next: (c: Ctx) => Exercise[] | null;
  total?: number;
  timer?: (c: Ctx) => number | undefined;
  lives?: number;
  placement?: boolean;
  exam?: boolean;
  /** Etiqueta del bloque actual (Flujo). */
  banner?: (c: Ctx) => string | undefined;
  onFinish?: (r: Result) => string[];
  /** Solo informativo: no hay "suspensos", se muestra como referencia amable. */
  passPct?: number;
  backTo: string;
  /** Duración total en segundos (Contrarreloj). */
  duration?: number;
  /** Modo rápido: si aciertas pasa sola a la siguiente; si fallas te enseña la respuesta. */
  fast?: boolean;
  /** No cuenta para el máximo diario (repaso). */
  exempt?: boolean;
  /** récord actual (juegos infinitos) */
  record?: number;
  /** maestría propia de la sesión (cada juego tiene la suya) */
  ev?: { key: string; label: string };
}

/* ================= FLUJO ================= */
/* Sesión sin fin. Cambia de bloque cada 8 preguntas. Prioriza la skill más floja y el repaso pendiente.
   La intensidad sube: a partir del 4º bloque aparece temporizador y se acorta. */
const BLOCK = 8;
export function flowPlan(only?: Skill): Plan {
  let current: Skill | 'review' | 'wheel' = 'grammar';
  const skip = new Set<string>();
  const chooseBlock = (c: Ctx): Skill | 'review' | 'wheel' => {
    const s = getState();
    if (only) return only;
    const dueCount = Object.values(s.srs).filter((x) => x.due <= Date.now()).length;
    if (dueCount >= 10 && c.block % 4 === 3) return 'review';
    // la Rueda: uno de cada tres bloques pregunta a ciegas lo ya aprobado
    if (c.block % 3 === 2 && wheelStatus(s).ready) return 'wheel';
    // peso inverso al nivel: lo flojo sale más, pero todo sale
    const min = Math.min(...SKILLS.map((k) => s.skills[k].r));
    const weights = SKILLS.map((k) => ({ k, w: 1 + 2.5 * Math.max(0, 1.5 - (s.skills[k].r - min)) * (k === c.blockSkill ? 0.3 : 1) }));
    let t = Math.random() * weights.reduce((a, b) => a + b.w, 0);
    for (const { k, w } of weights) if ((t -= w) <= 0) return k;
    return 'grammar';
  };
  let inBlock = 0;
  return {
    title: only ? `Flujo · ${SKILL_NAME[only]}` : 'Flujo',
    backTo: '#/',
    next: (c) => {
      if (inBlock === 0 || inBlock >= BLOCK) {
        current = chooseBlock(c);
        c.block++;
        c.blockSkill = current === 'review' || current === 'wheel' ? undefined : current;
        inBlock = 0;
      }
      let ex: Exercise[] | null = null;
      if (current === 'review') ex = pickReview(c.exclude);
      if (current === 'wheel') {
        const w = wheelExercise(c.exclude, skip, inBlock);
        ex = w ? [w] : null;
      }
      if (!ex) ex = pickFor(current === 'review' ? 'vocab' : current === 'wheel' ? 'grammar' : current, { exclude: c.exclude });
      inBlock += ex.filter((e) => e.kind !== 'learn').length;
      for (const e of ex) c.exclude.add(e.id);
      return ex;
    },
    timer: (c) => (getState().settings.timer && c.block >= 4 && !only ? Math.max(15, 45 - (c.block - 4) * 4) : undefined),
    banner: () => {
      if (current === 'review') return '🔁 Bloque de repaso';
      if (current === 'wheel') return '🎡 La Rueda · a ciegas: no te digo de qué tema es · XP ×2';
      const r = getState().skills[current].r;
      return `${SKILL_NAME[current]} · ${levelOf(r).level}`;
    },
  };
}

export function reviewPlan(): Plan {
  return {
    title: 'Repaso espaciado',
    backTo: '#/',
    exempt: true,
    next: (c) => pickReview(c.exclude),
  };
}

/* ================= LA RUEDA ================= */
export function wheelPlan(n = 20): Plan {
  const skip = new Set<string>();
  let served = 0;
  return {
    title: 'La Rueda',
    backTo: '#/rueda',
    total: n,
    ev: undefined,
    banner: () => '🎡 A ciegas: no te digo de qué tema es cada pregunta. Lo verás al responder · XP ×2',
    next: (c) => {
      if (c.answered >= n) return null;
      const ex = wheelExercise(c.exclude, skip, served++);
      return ex ? [ex] : null;
    },
    onFinish: (r) => {
      if (!r.answered) return [];
      const st = wheelStatus(getState());
      return [`🎡 ${r.correct} de ${r.answered} a ciegas. Vuelta ${st.laps + 1}: han salido ${st.seen} de ${st.pool.length} temas.`];
    },
  };
}

/* ================= REPASO DE FALLOS ================= */
/* Todo lo que fallas (en cualquier sesión, juego o examen) queda apuntado con lo que respondiste y la respuesta
   correcta. Sale de la lista cuando lo aciertas en 2 días distintos; mientras tanto vuelve a salir aquí. */
export interface FailFilter {
  skill?: Skill;
  /** tema de gramática, o ámbito: lista de temas */
  topics?: string[];
}
export function pendingFails(s: State, f: FailFilter = {}, all = false): [string, Fail][] {
  const dk = today();
  return Object.entries(s.fails)
    .filter(([, x]) => (all || x.fd !== dk) && (!f.skill || x.sk === f.skill) && (!f.topics || (!!x.tp && f.topics.includes(x.tp))))
    .sort((a, b) => b[1].t - a[1].t);
}
export function failsPlan(f: FailFilter = {}, backTo = '#/repaso'): Plan {
  const ids = pendingFails(getState(), f).map(([id]) => id);
  const total = Math.min(20, ids.length);
  let i = 0;
  return {
    title: 'Repaso de fallos',
    backTo,
    exempt: true,
    total,
    next: (c) => {
      while (i < ids.length && c.answered < total) {
        const id = ids[i++];
        const ex = exerciseFromId(id);
        if (ex) return [ex];
        update((st) => void delete st.fails[id]);
      }
      return null;
    },
    onFinish: (r) => {
      if (!r.answered) return [];
      const left = pendingFails(getState(), f, true).length;
      return [`${r.correct} de ${r.answered} corregidos hoy. ${left ? `Quedan ${left} en la lista: cada uno sale de ella al acertarlo en 2 días distintos.` : 'Lista de fallos vacía.'}`];
    },
  };
}

/* ================= PRUEBA DE NIVEL (test adaptativo bayesiano, por skill) ================= */
/* Se mantiene una distribución de probabilidad sobre tu nivel (0.6–6.4). Cada respuesta la actualiza con el mismo
   modelo que usa el resto de la app (pCorrect). La siguiente pregunta se elige donde más informa (p≈50 %) y el
   resultado final es la media de la distribución. */
const PLACEMENT_N: Record<Skill, number> = { grammar: 15, vocab: 16, reading: 12, listening: 12, writing: 12 };
const GRID = Array.from({ length: 117 }, (_, i) => 0.6 + i * 0.05);
function prior() {
  const p = GRID.map((t) => Math.exp(-((t - 3) ** 2) / (2 * 1.8 ** 2)));
  const z = p.reduce((a, b) => a + b, 0);
  return p.map((x) => x / z);
}
const mean = (post: number[]) => GRID.reduce((a, t, i) => a + t * post[i], 0);

export function placementPlan(skills: Skill[]): Plan {
  let idx = 0;
  let count = 0;
  let seen = 0;
  let post = prior();
  const finalize = (k: Skill) => {
    const m = Math.min(6, mean(post));
    update((s) => {
      s.skills[k].r = m;
      s.skills[k].n = Math.max(s.skills[k].n, 60);
      s.skills[k].placed = true;
    });
  };
  const absorb = (c: Ctx) => {
    for (; seen < c.results.length; seen++) {
      const { ex, ok } = c.results[seen];
      const guess = ex.kind === 'mc' && ex.options ? 1 / ex.options.length : 0;
      post = post.map((w, i) => {
        const p = pCorrect(GRID[i], ex.level, guess);
        return w * (ok ? p : 1 - p);
      });
      const z = post.reduce((a, b) => a + b, 0) || 1;
      post = post.map((x) => x / z);
    }
  };
  return {
    title: skills.length > 1 ? 'Prueba de nivel completa' : `Prueba de nivel · ${SKILL_NAME[skills[0]]}`,
    placement: true,
    backTo: '#/placement',
    total: skills.reduce((a, k) => a + PLACEMENT_N[k], 0),
    banner: () => (skills[idx] ? `${SKILL_NAME[skills[idx]]} · pregunta ${Math.min(count + 1, PLACEMENT_N[skills[idx]])}/${PLACEMENT_N[skills[idx]]}` : undefined),
    next: (c) => {
      absorb(c);
      if (count >= PLACEMENT_N[skills[idx]]) {
        finalize(skills[idx]);
        idx++;
        count = 0;
        post = prior();
      }
      if (idx >= skills.length) return null;
      const k = skills[idx];
      const level = Math.max(1, Math.min(5, Math.round(mean(post) + 0.6)));
      const ex = pickFor(k, { placement: true, level, exclude: c.exclude }).filter((e) => e.kind !== 'learn');
      // lectura: preferimos preguntas de 4 opciones (menos azar que True/False/Not given)
      const four = ex.filter((e) => (e.options?.length ?? 0) >= 4);
      const rd = four.length >= 3 ? four : ex;
      const take = k === 'reading' ? rd.slice(0, Math.min(3, PLACEMENT_N[k] - count)) : ex.slice(0, 1);
      count += take.length;
      take.forEach((e) => c.exclude.add(e.id));
      return take;
    },
    onFinish: (r) => {
      // si se abandona a mitad, la skill en curso cuenta solo con 5+ respuestas
      const cx = { results: r.results } as Ctx;
      absorb(cx);
      if (idx < skills.length && count >= 5) finalize(skills[idx]);
      const s = getState();
      return skills.slice(0, idx + 1).filter((k) => s.skills[k].placed).map((k) => `${SKILL_NAME[k]}: ${levelOf(s.skills[k].r).label}`);
    },
  };
}

/* ================= CERTIFICACIONES (mini tests) ================= */
/* Cada certificado = 4 mini tests de 12 preguntas. Haces uno cuando te apetezca; se guarda cada uno.
   El certificado se obtiene con los 4 hechos y una media ≥ 75 %. Sin prisas: cada sección puede repetirse. */
export const CERT_SECTIONS = 4;
export const CERT_PER = 12;
export const CERT_PASS = 75;
const SECTION_NAME: Record<Skill | 'mixed', string[]> = {
  grammar: ['Formas', 'Uso', 'Transformación', 'Mixto'],
  vocab: ['Significado', 'Contexto', 'Producción', 'Mixto'],
  reading: ['Texto 1', 'Texto 2', 'Texto 3', 'Texto 4'],
  listening: ['Dictado', 'Comprensión', 'Oído fino', 'Mixto'],
  writing: ['Errores', 'Registro', 'Reescritura', 'Mixto'],
  mixed: ['Gramática + vocabulario', 'Comprensión', 'Escritura + oído', 'Todo'],
};
export const certSectionName = (k: Skill | 'mixed', i: number) => SECTION_NAME[k][i] ?? `Parte ${i + 1}`;
export interface CertState {
  score: number;
  t: number;
  passed: boolean;
  sections?: (number | null)[];
}
export function certSummary(c: CertState | undefined) {
  const secs = c?.sections ?? [];
  const done = secs.filter((x) => x !== null && x !== undefined) as number[];
  const avg = done.length ? Math.round(done.reduce((a, b) => a + b, 0) / done.length) : 0;
  return { done: done.length, avg, passed: !!c?.passed };
}

export function certPlan(skill: Skill | 'mixed', level: Level, section = 0): Plan {
  const N = CERT_PER;
  const lv = lvlNum(level);
  const key = `${skill}-${level}`;
  const mixedSkills: Skill[][] = [['grammar', 'vocab'], ['reading'], ['writing', 'listening'], [...SKILLS]];
  return {
    title: `${level} · ${skill === 'mixed' ? 'Global' : SKILL_NAME[skill]} · ${certSectionName(skill, section)} (${section + 1}/${CERT_SECTIONS})`,
    exam: true,
    total: N,
    passPct: CERT_PASS,
    backTo: '#/exams',
    exempt: true,
    timer: () => (skill === 'reading' ? 75 : 45),
    next: (c) => {
      if (c.answered >= N) return null;
      const k = skill === 'mixed' ? mixedSkills[section][c.answered % mixedSkills[section].length] : skill;
      const ex = pickFor(k, { level: lv, exam: true, exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn');
      const take = k === 'reading' ? ex.slice(0, N - c.answered) : ex.slice(0, 1);
      take.forEach((e) => c.exclude.add(e.id));
      return take;
    },
    onFinish: (r) => {
      if (r.answered < Math.ceil(N / 2)) return ['Mini test sin terminar: no se guarda. Vuelve cuando quieras.'];
      let msg = '';
      update((s) => {
        const prev = (s.certs[key] as CertState | undefined) ?? { score: 0, t: 0, passed: false };
        const sections = [...(prev.sections ?? Array(CERT_SECTIONS).fill(null))];
        sections[section] = Math.max(sections[section] ?? 0, r.pct);
        const sum = certSummary({ ...prev, sections });
        const passed = prev.passed || (sum.done === CERT_SECTIONS && sum.avg >= CERT_PASS);
        s.certs[key] = { score: sum.avg, t: Date.now(), passed, sections };
        msg = passed && !prev.passed
          ? `📜 ¡Certificado ${level} conseguido! Media ${sum.avg} %.`
          : `Mini test guardado (${r.pct} %). Llevas ${sum.done}/${CERT_SECTIONS} partes, media ${sum.avg} %.`;
      });
      return [msg];
    },
  };
}

/* ================= EL CAMINO (10 subniveles) ================= */
/* Todo abierto. Cada paso guarda tu mejor % sobre el TOTAL de preguntas (si lo dejas a medias, cuenta solo lo que
   acertaste). Solo se marca «hecho» si lo completas entero con ≥ 80 %. Nada se salta sin demostrarlo. */
export type StepType = 'grammar' | 'vocab' | 'reading' | 'listening' | 'writing' | 'review' | 'boss';
export interface Step {
  id: string;
  level: Level;
  type: StepType;
  title: string;
  topicId?: string;
  words?: string[];
  textId?: string;
}
export interface Unit {
  id: string;
  level: Level;
  title: string;
  desc: string;
  steps: Step[];
}
const STEP_ICON: Record<StepType, string> = { grammar: '🧩', vocab: '📚', reading: '📖', listening: '🎧', writing: '✍️', review: '🔁', boss: '🏁' };
export const stepIcon = (t: StepType) => STEP_ICON[t];
/** Un paso cuenta como "hecho" si se completa entero con ≥ 80 %. Su valor es su % real (sin redondear hacia arriba). */
export const STEP_DONE = 80;
export const stepValue = (p?: { best: number }) => Math.min(1, (p?.best ?? 0) / 100);

let pathCache: Unit[] | null = null;
export function buildPath(): Unit[] {
  if (pathCache) return pathCache;
  pathCache = SUBLEVELS.map((sl) => {
    const level = sl.level;
    const G: Step[] = topicsOf(sl.id).map((t) => ({ id: `${level}:g:${t.id}`, level, type: 'grammar', title: t.title, topicId: t.id }));
    const words = wordsOf(sl.id);
    const V: Step[] = [];
    for (let i = 0; i < words.length; i += 10) {
      const chunk = words.slice(i, i + 10);
      V.push({ id: `${sl.id}:v:${i / 10}`, level, type: 'vocab', title: `Palabras: ${chunk.slice(0, 3).map((w) => w.word).join(', ')}…`, words: chunk.map((w) => w.id) });
    }
    const R: Step[] = readingsOf(sl.id).map((r) => ({ id: `${level}:r:${r.id}`, level, type: 'reading', title: r.title, textId: r.id }));
    const steps: Step[] = [];
    let li = 0,
      wi = 0;
    while (G.length || V.length || R.length) {
      if (G.length) steps.push(G.shift()!);
      if (V.length) steps.push(V.shift()!);
      if (G.length) steps.push(G.shift()!);
      if (R.length) steps.push(R.shift()!);
      if (steps.length % 6 < 3) steps.push({ id: `${sl.id}:l:${li}`, level, type: 'listening', title: `Oído ${sl.id} · ${++li}` });
      else steps.push({ id: `${sl.id}:w:${wi}`, level, type: 'writing', title: `Escritura ${sl.id} · ${++wi}` });
      if (V.length) steps.push(V.shift()!);
      if (steps.length % 12 === 0) steps.push({ id: `${sl.id}:rv:${steps.length}`, level, type: 'review', title: 'Repaso' });
    }
    steps.push({ id: `${sl.id}:rv:end`, level, type: 'review', title: 'Repaso del tramo' });
    steps.push({ id: `${sl.id}:boss`, level, type: 'boss', title: `Control ${sl.id}` });
    return { id: sl.id, level, title: sl.title, desc: sl.desc, steps };
  });
  return pathCache;
}
export const allSteps = () => buildPath().flatMap((u) => u.steps);
export function unitProgress(path: Record<string, { best: number }>, u: Unit) {
  return u.steps.reduce((a, st) => a + stepValue(path[st.id]), 0) / u.steps.length;
}

export function stepPlan(step: Step): Plan {
  const lv = lvlNum(step.level);
  const finish = (r: Result) => {
    if (!r.answered) return [];
    update((s) => {
      const p = s.path[step.id] || { best: 0, done: false };
      p.best = Math.max(p.best, r.pct);
      p.done = p.done || (r.complete && r.pct >= STEP_DONE);
      p.answered = (p.answered ?? 0) + r.answered;
      s.path[step.id] = p;
    });
    if (r.complete && r.pct >= STEP_DONE) return [`🛤️ Paso completado: ${step.title} (${r.pct} %)`];
    if (!r.complete) return [`Paso a medias: ${r.correct} de ${r.total} (${r.pct} %). Se guarda tal cual; para darlo por hecho hay que completarlo con ≥ ${STEP_DONE} %.`];
    return [`Paso terminado con ${r.pct} %. Se marca como hecho a partir del ${STEP_DONE} %: vuelve otro día y lo subes.`];
  };
  const base = { title: step.title, backTo: '#/path', onFinish: finish };

  if (step.type === 'grammar') {
    const items = shuffle(itemsByTopic.get(step.topicId!) || []);
    const list = items.slice(0, 12).map((it, i) => grammarExercise(it, i % 5 === 4 && !!it.sentence));
    return { ...base, total: list.length, next: (c) => (c.answered < list.length ? [list[c.answered]] : null) };
  }
  if (step.type === 'vocab') {
    const ws = step.words!.map((id) => vocab.find((v) => v.id === id)!).filter(Boolean);
    const queue: Exercise[] = [];
    ws.forEach((w) => queue.push(learnCard(w)));
    shuffle(ws).forEach((w) => queue.push(vocabExercise(w, 'en-es')));
    shuffle(ws).forEach((w) => queue.push(vocabExercise(w, w.tag === 'phrase' ? 'es-en' : 'gap')));
    let i = 0;
    return { ...base, total: ws.length * 2, next: () => (i < queue.length ? [queue[i++]] : null) };
  }
  if (step.type === 'reading') {
    const t = readingById.get(step.textId!)!;
    const q = readingExercises(t);
    let given = false;
    return {
      ...base,
      total: q.length,
      next: () => {
        if (given) return null;
        given = true;
        return q;
      },
      onFinish: (r) => {
        if (r.answered) recordReading(t.id, r.pct);
        return finish(r);
      },
    };
  }
  const N = step.type === 'boss' ? 16 : step.type === 'review' ? 12 : 10;
  const wskip = new Set<string>();
  return {
    ...base,
    total: N,
    // el control de cada tramo es un examen: sin pistas y con la corrección al final
    exam: step.type === 'boss',
    next: (c) => {
      if (c.answered >= N) return null;
      if (step.type === 'review' && c.answered % 2 === 0) {
        const rv = pickReview(c.exclude);
        if (rv) return rv;
      }
      // en los repasos y controles, parte de las preguntas llegan a ciegas desde la Rueda
      if ((step.type === 'review' || step.type === 'boss') && c.answered % 2 === 1 && wheelStatus(getState()).ready) {
        const w = wheelExercise(c.exclude, wskip, c.answered);
        if (w) return [w];
      }
      let k: Skill;
      if (step.type === 'listening') k = 'listening';
      else if (step.type === 'writing') k = 'writing';
      else k = pick(['grammar', 'grammar', 'vocab', 'vocab', 'listening', 'writing'] as Skill[]);
      const ex = pickFor(k, { level: lv, exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn' && !e.passage);
      const one = ex.length ? ex.slice(0, 1) : pickFor('grammar', { level: lv, exclude: c.exclude });
      one.forEach((e) => c.exclude.add(e.id));
      return one;
    },
  };
}

/* ================= JUEGOS ================= */
export type GameGroup = 'quick' | 'classic' | 'hard' | 'words' | 'use' | 'ear' | 'life' | 'blind';
export const GROUP_NAME: Record<GameGroup, { name: string; desc: string }> = {
  quick: { name: 'Rápidos', desc: 'Para días con pocas ganas: un toque por pregunta, si aciertas pasa sola.' },
  classic: { name: 'Clásicos', desc: 'Práctica de siempre, con vidas y récord.' },
  hard: { name: 'Duros', desc: 'Para cuando te sientas fuerte: textos largos, combinaciones, vida real.' },
  words: { name: 'Palabras', desc: 'Ortografía, formas, anagramas y vocabulario nivel a nivel.' },
  use: { name: 'Use of English', desc: 'Los formatos de los exámenes avanzados: cloze, transformaciones, inversión, colocaciones.' },
  ear: { name: 'De oído', desc: 'Números, horas, rimas y frases que hay que cazar al vuelo.' },
  life: { name: 'Inglés real', desc: 'Carteles, emails, abreviaturas, refranes y textos de verdad.' },
  blind: { name: 'A ciegas', desc: 'Mezclas sin decirte el tema: como la Rueda, pero por categorías. XP ×2.' },
};
export interface GameDef {
  id: string;
  icon: string;
  name: string;
  desc: string;
  group: GameGroup;
  plan: () => Plan;
}
const record = (id: string, v: number): string[] => {
  const prev = Object.hasOwn(getState().records, id) ? getState().records[id] : 0;
  if (v > prev) {
    update((s) => {
      s.records[id] = v;
    });
    return [`🏆 Nuevo récord: ${v}`];
  }
  return [`Récord actual: ${prev}`];
};
function endless(id: string, title: string, mk: (c: Ctx) => Exercise[], extra: Partial<Plan> = {}): Plan {
  return { title, backTo: '#/games', next: mk, onFinish: (r) => record(id, r.correct), ...extra };
}
const lvOf = (k: Skill) => Math.max(1, Math.min(5, Math.floor(getState().skills[k].r)));
/** Juego rápido sobre un conjunto de datos: 3 vidas, avance automático. */
const setGame = (id: string, title: string, set: SetId, skill: Skill, extra: Partial<Plan> = {}): Plan =>
  endless(id, title, (c) => [gameExercise(set, c.exclude, lvOf(skill))], { lives: 3, fast: true, ...extra });


/* ---------- ayudas de los juegos añadidos ---------- */
function wordPick(c: Ctx, lv: number, ok: (e: VocabEntry) => boolean = () => true): VocabEntry {
  let pool = vocab.filter((v) => Math.abs(v.level - lv) <= 1 && ok(v) && !c.exclude.has(v.id));
  if (pool.length < 5) pool = vocab.filter(ok);
  const e = pick(pool);
  c.exclude.add(e.id);
  return e;
}
const wordPlan = (id: string, title: string, mode: WordMode): Plan =>
  endless(id, title, (c) => [wordGame(wordPick(c, lvOf('vocab'), wordOk), mode)], { lives: 3 });
const vocabModePlan = (id: string, title: string, mode: 'es-en' | 'spell' | 'audio' | 'gap', extra: Partial<Plan> = {}): Plan =>
  endless(id, title, (c) => [vocabExercise(wordPick(c, lvOf('vocab'), (e) => (mode === 'spell' ? wordOk(e) : mode === 'gap' ? !!e.ex && e.tag !== 'phrase' : true)), mode)], { lives: 3, ...extra });
const vocabLevelPlan = (lv: number): Plan =>
  endless('vocab-' + LEVELS[lv - 1].toLowerCase(), `Vocabulario ${LEVELS[lv - 1]}`, (c) => {
    const e = wordPick(c, lv, (v) => v.level === lv);
    return [vocabExercise(e, pick(['en-es', 'es-en', 'gap', wordOk(e) ? 'spell' : 'es-en'] as const))];
  }, { lives: 3 });
/** Mezcla a ciegas de una categoría de gramática (hasta un nivel por encima del tuyo). */
function catPlan(cat: GrammarCat): Plan {
  return endless('cat-' + cat, `A ciegas · ${CAT_NAME[cat]}`, (c) => {
    const lv = lvOf('grammar');
    const topics = grammarTopics.filter((t) => t.cat === cat);
    const near = topics.filter((t) => lvlNum(t.level) <= lv + 1);
    const items = (near.length >= 2 ? near : topics).flatMap((t) => itemsByTopic.get(t.id) || []);
    const fresh = items.filter((i) => !c.exclude.has(i.id));
    const it = pick(fresh.length ? fresh : items);
    c.exclude.add(it.id);
    return [{ ...grammarExercise(it), blind: true }];
  }, { lives: 3, banner: () => '🙈 A ciegas: no te digo de qué tema es · XP ×2' });
}
const KWT = () => [
  ...grammarItems.filter((i) => i.type === 'trans').map((i) => () => grammarExercise(i)),
  ...writingItems.filter((w) => w.type === 'trans').map((w) => () => writingExercise(w)),
];
function fromList(c: Ctx, list: (() => Exercise | null)[], lv?: number): Exercise[] {
  for (let i = 0; i < 40; i++) {
    const ex = pick(list)();
    if (!ex || (c.exclude.has(ex.id) && i < 30) || (lv !== undefined && Math.abs(ex.level - lv) > 1 && i < 20)) continue;
    c.exclude.add(ex.id);
    return [ex];
  }
  return pickFor('grammar', { exclude: c.exclude });
}
const UOE_SEQ: (SetId | 'kwt')[] = ['mcloze', 'mcloze', 'mcloze', 'mcloze', 'mcloze', 'mcloze', 'ocloze', 'ocloze', 'ocloze', 'ocloze', 'ocloze', 'ocloze', 'wf', 'wf', 'wf', 'wf', 'kwt', 'kwt', 'kwt', 'kwt'];
const UOE_PART = (n: number) => (n < 6 ? 'Parte 1 · Multiple-choice cloze' : n < 12 ? 'Parte 2 · Open cloze' : n < 16 ? 'Parte 3 · Word formation' : 'Parte 4 · Key word transformation');

export const GAMES: GameDef[] = [
  /* ---- rápidos ---- */
  { id: 'lluvia', group: 'quick', icon: '🌧️', name: 'Lluvia', desc: 'Gramática: el tiempo baja cada 5 aciertos (de 20 s a 5 s).', plan: () => endless('lluvia', 'Lluvia', (c) => pickFor('grammar', { exclude: c.exclude, noLearn: true }), { lives: 3, fast: true, timer: (c) => Math.max(5, 20 - Math.floor(c.correct / 5) * 2) }) },
  { id: 'relampago', group: 'quick', icon: '⚡', name: 'Relámpago', desc: 'Vocabulario a 8 segundos por pregunta. 3 vidas.', plan: () => endless('relampago', 'Relámpago', (c) => pickVocab({ exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn'), { lives: 3, fast: true, timer: () => 8 }) },
  { id: 'contrarreloj', group: 'quick', icon: '⏱️', name: 'Contrarreloj 60 s', desc: 'Un minuto. Responde todo lo que puedas: preposiciones, irregulares, sinónimos…', plan: () => endless('contrarreloj', 'Contrarreloj 60 s', (c) => [randomFast(c.exclude, lvOf('grammar'))], { duration: 60, fast: true }) },
  { id: 'muerte', group: 'quick', icon: '💀', name: 'Muerte súbita', desc: 'Una sola vida. Empieza fácil y sube de nivel cada 5 aciertos.', plan: () => endless('muerte', 'Muerte súbita', (c) => {
      const lv = Math.min(5, 1 + Math.floor(c.correct / 5));
      const k = pick(['grammar', 'vocab', 'writing'] as Skill[]);
      return Math.random() < 0.35 ? [randomFast(c.exclude, lv)] : pickFor(k, { level: lv, exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn').slice(0, 1);
    }, { lives: 1, fast: true, timer: () => 20 }) },
  { id: 'correcta', group: 'quick', icon: '✅', name: '¿Correcta o no?', desc: 'Ves una frase: ¿está bien o tiene un error? Dos botones, cero excusas.', plan: () => setGame('correcta', '¿Correcta o no?', 'ok', 'grammar', { timer: () => 10 }) },
  { id: 'irregulares', group: 'quick', icon: '🔤', name: 'Irregulares', desc: 'go-went-gone y los 90 verbos que más se usan.', plan: () => setGame('irregulares', 'Irregulares', 'irr', 'grammar') },
  { id: 'preposiciones', group: 'quick', icon: '📍', name: 'Preposiciones', desc: 'interested in, depend on, good at… la eterna batalla.', plan: () => setGame('preposiciones', 'Preposiciones', 'prep', 'grammar', { timer: () => 12 }) },
  { id: 'contables', group: 'quick', icon: '🧮', name: 'Contable o no', desc: 'advice, news, furniture… ¿se pueden contar?', plan: () => setGame('contables', 'Contable o no', 'count', 'grammar', { timer: () => 6 }) },
  { id: 'sinonimos', group: 'quick', icon: '🔁', name: 'Sinónimos', desc: 'Encuentra la palabra que significa casi lo mismo.', plan: () => setGame('sinonimos', 'Sinónimos', 'syn', 'vocab', { timer: () => 10 }) },
  { id: 'confusables', group: 'quick', icon: '🌀', name: 'Confusables', desc: 'their/there, affect/effect, lose/loose… las que se confunden.', plan: () => setGame('confusables', 'Confusables', 'conf', 'writing', { timer: () => 10 }) },
  { id: 'particulas', group: 'quick', icon: '🧷', name: 'Partículas', desc: 'carry ___ the plan: out, up, off… completa el phrasal verb.', plan: () => setGame('particulas', 'Partículas', 'prt', 'vocab') },
  /* ---- clásicos ---- */
  { id: 'maraton', group: 'classic', icon: '🏃', name: 'Maratón', desc: 'Todas las skills mezcladas. 3 vidas. ¿Hasta dónde llegas?', plan: () => endless('maraton', 'Maratón', (c) => pickFor(SKILLS[c.answered % 5] === 'reading' ? 'grammar' : SKILLS[c.answered % 5], { exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn'), { lives: 3 }) },
  { id: 'dictado', group: 'classic', icon: '📝', name: 'Dictado infinito', desc: 'Dictados encadenados a tu nivel de Listening. 3 vidas.', plan: () => endless('dictado', 'Dictado infinito', (c) => pickFor('listening', { exclude: c.exclude, level: lvOf('listening') }).filter((e) => e.dictation || e.kind === 'mc').slice(0, 1), { lives: 3 }) },
  { id: 'spelling', group: 'classic', icon: '🐝', name: 'Spelling bee', desc: 'Oyes una palabra y la escribes. Ortografía + oído.', plan: () => endless('spelling', 'Spelling bee', (c) => [gameExercise('bee', c.exclude, lvOf('vocab'))], { lives: 3 }) },
  { id: 'oido', group: 'classic', icon: '👂', name: 'Oído fino', desc: 'Distingue frases casi iguales (I worked / I\'ve worked…).', plan: () => endless('oido', 'Oído fino', (c) => {
      const ex = pickFor('listening', { exclude: c.exclude });
      return ex.filter((e) => e.label.includes('Oído fino')).length ? ex : pickFor('listening', { exclude: c.exclude });
    }, { lives: 3 }) },
  { id: 'errores', group: 'classic', icon: '🩺', name: 'Cazaerrores', desc: 'Frases con errores típicos de hispanohablantes: corrígelas.', plan: () => endless('errores', 'Cazaerrores', (c) => {
      for (let i = 0; i < 6; i++) {
        const ex = pickFor('writing', { exclude: c.exclude });
        if (ex[0].label.includes('Errores')) return ex;
      }
      return pickFor('writing', { exclude: c.exclude });
    }, { lives: 3 }) },
  { id: 'falsos', group: 'classic', icon: '🎭', name: 'Falsos amigos', desc: 'actually, sensible, library… que no te engañen.', plan: () => endless('falsos', 'Falsos amigos', (c) => pickVocab({ tag: 'false-friend', exclude: c.exclude, noLearn: true, level: 3 }).filter((e) => e.kind !== 'learn'), { lives: 3, fast: true }) },
  { id: 'conectores', group: 'classic', icon: '🔗', name: 'Conectores', desc: 'However, whereas, hence… el pegamento del inglés académico.', plan: () => endless('conectores', 'Conectores', (c) => pickVocab({ tag: 'linker', exclude: c.exclude, noLearn: true, level: lvOf('vocab') }).filter((e) => e.kind !== 'learn'), { lives: 3 }) },
  { id: 'phrasal', group: 'classic', icon: '🧲', name: 'Phrasal verbs', desc: 'Carry out, come up with, put off… sin miedo.', plan: () => endless('phrasal', 'Phrasal verbs', (c) => pickVocab({ tag: 'phrasal', exclude: c.exclude, noLearn: true, level: lvOf('vocab') }).filter((e) => e.kind !== 'learn'), { lives: 3 }) },
  { id: 'builder', group: 'classic', icon: '🧱', name: 'Constructor', desc: 'Ordena frases cada vez más largas.', plan: () => endless('builder', 'Constructor', (c) => {
      const lv = Math.min(5, 1 + Math.floor(c.correct / 6));
      const items = grammarTopics.filter((t) => lvlNum(t.level) === lv).flatMap((t) => itemsByTopic.get(t.id) || []).filter((i) => i.sentence && i.sentence.split(' ').length >= 4);
      const it = pick(items);
      return [{ ...grammarExercise(it, true), id: it.id + ':o:' + c.answered }];
    }, { lives: 3 }) },
  { id: 'temas', group: 'classic', icon: '🎯', name: 'Puntos débiles', desc: 'Solo los temas de gramática donde más fallas.', plan: () => endless('temas', 'Puntos débiles', (c) => {
      const s = getState();
      const weak = Object.entries(s.topics).filter(([, t]) => t.s >= 3).sort((a, b) => a[1].c / a[1].s - b[1].c / b[1].s).slice(0, 5).map(([id]) => id).filter((id) => topicById.has(id));
      return pickFor('grammar', { exclude: c.exclude, topicId: weak.length ? pick(weak) : undefined });
    }, { lives: 3 }) },
  /* ---- duros ---- */
  { id: 'textacos', group: 'hard', icon: '📜', name: 'Textacos', desc: 'Un texto largo de nivel C1 (650–900 palabras) con preguntas cronometradas.', plan: () => {
      const s = getState();
      const longs = readings.filter((r) => r.long);
      const t = shuffle(longs).sort((a, b) => (s.readTexts[a.id]?.best ?? -1) - (s.readTexts[b.id]?.best ?? -1))[0];
      const q = readingExercises(t);
      let given = false;
      return {
        title: `Textaco: ${t.title}`, backTo: '#/games', total: q.length, timer: () => 60,
        next: () => (given ? null : ((given = true), q)),
        onFinish: (r) => {
          if (r.answered) recordReading(t.id, r.pct);
          return record('textacos', r.correct);
        },
      };
    } },
  { id: 'combina', group: 'hard', icon: '🤝', name: 'Combinaciones', desc: 'make or do? take or have? Las collocations que delatan a un no nativo.', plan: () => setGame('combina', 'Combinaciones', 'coll', 'vocab', { fast: false }) },
  { id: 'vidareal', group: 'hard', icon: '🏙️', name: 'Vida real', desc: 'Situaciones de la calle: ¿qué dirías tú? Sin traducir del español.', plan: () => setGame('vidareal', 'Vida real', 'real', 'vocab', { fast: false }) },
  { id: 'formal', group: 'hard', icon: '🎩', name: 'Formal / informal', desc: 'get → obtain, buy → purchase: sube el registro de tu escritura.', plan: () => setGame('formal', 'Formal / informal', 'formal', 'writing', { fast: false }) },
  { id: 'palabras', group: 'hard', icon: '🧬', name: 'Formación de palabras', desc: 'decide → decision → decisive. Escribe la forma correcta (tipo Cambridge).', plan: () => setGame('palabras', 'Formación de palabras', 'wf', 'vocab', { fast: false }) },
  { id: 'idioms', group: 'hard', icon: '🦜', name: 'Idioms', desc: 'a piece of cake, the last straw… lo que no se entiende traduciendo.', plan: () => setGame('idioms', 'Idioms', 'idiom', 'vocab', { fast: false }) },
  { id: 'academico', group: 'hard', icon: '🎓', name: 'Académico', desc: 'Vocabulario para entender papers, artículos y temario.', plan: () => endless('academico', 'Académico', (c) => pickVocab({ tag: 'academic', exclude: c.exclude, noLearn: true, level: Math.max(4, lvOf('vocab')) }).filter((e) => e.kind !== 'learn'), { lives: 3 }) },
  /* ---- rápidos (nuevos) ---- */
  { id: 'gerinf', group: 'quick', icon: '🪢', name: 'Gerundio o infinitivo', desc: 'enjoy doing, want to do, stop to do / stop doing…', plan: () => setGame('gerinf', 'Gerundio o infinitivo', 'gerinf', 'grammar', { timer: () => 12 }) },
  { id: 'cuantos', group: 'quick', icon: '⚖️', name: 'Cuantificadores', desc: 'much, many, few, little, plenty, hardly any…', plan: () => setGame('cuantos', 'Cuantificadores', 'quant', 'grammar', { timer: () => 12 }) },
  { id: 'articulos', group: 'quick', icon: '🅰️', name: 'Artículos', desc: 'a, an, the… o nada. El error más repetido en español.', plan: () => setGame('articulos', 'Artículos', 'art', 'grammar', { timer: () => 10 }) },
  { id: 'coletillas', group: 'quick', icon: '❓', name: 'Question tags', desc: '…, isn\'t it? …, did they? …, shall we?', plan: () => setGame('coletillas', 'Question tags', 'tags', 'grammar', { timer: () => 12 }) },
  { id: 'antonimos', group: 'quick', icon: '↔️', name: 'Antónimos', desc: 'Encuentra la palabra que significa lo contrario.', plan: () => setGame('antonimos', 'Antónimos', 'anton', 'vocab', { timer: () => 10 }) },
  { id: 'prefijos', group: 'quick', icon: '🚫', name: 'Prefijos negativos', desc: 'un-, in-, im-, il-, ir-, dis-, mis-: ¿cuál le toca?', plan: () => setGame('prefijos', 'Prefijos negativos', 'prefix', 'vocab', { timer: () => 10 }) },
  { id: 'frasesprep', group: 'quick', icon: '🧭', name: 'Frases preposicionales', desc: 'on purpose, by chance, at risk, out of order…', plan: () => setGame('frasesprep', 'Frases preposicionales', 'pphr', 'grammar', { timer: () => 8 }) },
  { id: 'ortografia', group: 'quick', icon: '🔠', name: 'Ortografía', desc: 'accommodation, definitely, receive… ¿cuál está bien?', plan: () => setGame('ortografia', 'Ortografía', 'spell', 'writing', { timer: () => 10 }) },
  { id: 'intruso', group: 'quick', icon: '🕵️', name: 'El intruso', desc: 'Cuatro palabras y una no pinta nada. ¿Cuál?', plan: () => setGame('intruso', 'El intruso', 'odd', 'vocab', { timer: () => 15 }) },
  { id: 'parejas-fijas', group: 'quick', icon: '👫', name: 'Parejas fijas', desc: 'safe and sound, pros and cons, by and large…', plan: () => setGame('parejas-fijas', 'Parejas fijas', 'binom', 'vocab', { timer: () => 10 }) },
  { id: 'condicionales', group: 'quick', icon: '🔀', name: 'Condicionales', desc: 'Cero, primera, segunda, tercera, mixtas y wish.', plan: () => setGame('condicionales', 'Condicionales', 'cond', 'grammar', { timer: () => 15 }) },
  /* ---- palabras ---- */
  { id: 'plurales', group: 'words', icon: '👥', name: 'Plurales', desc: 'child → children, crisis → crises. Escríbelos.', plan: () => setGame('plurales', 'Plurales', 'plural', 'grammar', { fast: false }) },
  { id: 'comparativos', group: 'words', icon: '📶', name: 'Comparativos', desc: 'good → better → the best. Escribe la forma.', plan: () => setGame('comparativos', 'Comparativos', 'compar', 'grammar', { fast: false }) },
  { id: 'irregulares2', group: 'words', icon: '✏️', name: 'Irregulares escritos', desc: 'Sin opciones: escribe tú el participio.', plan: () => endless('irregulares2', 'Irregulares escritos', (c) => [gameExercise('irr', c.exclude, lvOf('grammar'), 1)], { lives: 3 }) },
  { id: 'ukus', group: 'words', icon: '🌎', name: 'Británico / americano', desc: 'lift / elevator, autumn / fall, colour / color.', plan: () => setGame('ukus', 'Británico / americano', 'ukus', 'vocab') },
  { id: 'definiciones', group: 'words', icon: '📖', name: 'Definiciones', desc: 'Definición en inglés: elige la palabra. Sin español.', plan: () => setGame('definiciones', 'Definiciones', 'defin', 'vocab', { fast: false }) },
  { id: 'definiciones2', group: 'words', icon: '🖊️', name: 'Definición → palabra', desc: 'La misma definición, pero la palabra la escribes tú.', plan: () => setGame('definiciones2', 'Definición → palabra', 'defw', 'vocab', { fast: false }) },
  { id: 'anagrama', group: 'words', icon: '🔀', name: 'Anagrama', desc: 'Letras desordenadas y su significado: forma la palabra.', plan: () => wordPlan('anagrama', 'Anagrama', 'ana') },
  { id: 'letras', group: 'words', icon: '🕳️', name: 'Letras que faltan', desc: 'a _ c o _ m _ d a t _ o n: complétala.', plan: () => wordPlan('letras', 'Letras que faltan', 'let') },
  { id: 'inicial', group: 'words', icon: '🔡', name: 'Primera letra', desc: 'Significado + inicial + nº de letras: escríbela.', plan: () => wordPlan('inicial', 'Primera letra', 'ini') },
  { id: 'traductor', group: 'words', icon: '🇪🇸', name: 'Traductor', desc: 'Del español al inglés, eligiendo entre cuatro.', plan: () => vocabModePlan('traductor', 'Traductor', 'es-en', { fast: true }) },
  { id: 'teclado', group: 'words', icon: '⌨️', name: 'A teclado', desc: 'Del español al inglés, escribiendo. Sin opciones.', plan: () => vocabModePlan('teclado', 'A teclado', 'spell') },
  { id: 'huecos', group: 'words', icon: '🧩', name: 'Huecos', desc: 'Una frase real con hueco: ¿qué palabra falta?', plan: () => vocabModePlan('huecos', 'Huecos', 'gap', { fast: true }) },
  ...[1, 2, 3, 4, 5].map((lv): GameDef => ({ id: 'vocab-' + LEVELS[lv - 1].toLowerCase(), group: 'words', icon: ['🌱', '🌿', '🌳', '🏔️', '🌋'][lv - 1], name: `Vocabulario ${LEVELS[lv - 1]}`, desc: `Solo palabras de ${LEVELS[lv - 1]}: significado, traducción, hueco y escritura.`, plan: () => vocabLevelPlan(lv) })),
  /* ---- Use of English ---- */
  { id: 'uoe', group: 'use', icon: '🎓', name: 'Use of English', desc: 'Prueba de 20: cloze de opciones, cloze abierto, formación de palabras y transformaciones.', plan: () => {
      const kw = KWT();
      return {
        title: 'Use of English', backTo: '#/games', total: UOE_SEQ.length, passPct: 60,
        banner: (c) => UOE_PART(Math.min(c.answered, UOE_SEQ.length - 1)),
        next: (c) => {
          if (c.answered >= UOE_SEQ.length) return null;
          const k = UOE_SEQ[c.answered];
          return k === 'kwt' ? fromList(c, kw) : [gameExercise(k, c.exclude)];
        },
        onFinish: (r) => (r.complete ? record('uoe', r.correct) : [`Prueba a medias: ${r.correct} de ${UOE_SEQ.length}.`]),
      };
    } },
  { id: 'mcloze', group: 'use', icon: '🔘', name: 'Multiple-choice cloze', desc: 'Cuatro palabras parecidas y solo una se combina bien.', plan: () => setGame('mcloze', 'Multiple-choice cloze', 'mcloze', 'vocab', { fast: false }) },
  { id: 'ocloze', group: 'use', icon: '🕳️', name: 'Open cloze', desc: 'Falta UNA palabra gramatical. Sin opciones.', plan: () => setGame('ocloze', 'Open cloze', 'ocloze', 'grammar', { fast: false }) },
  { id: 'kwt', group: 'use', icon: '🔑', name: 'Key word transformations', desc: 'Di lo mismo con la palabra clave, sin cambiarla.', plan: () => { const kw = KWT(); return endless('kwt', 'Key word transformations', (c) => fromList(c, kw, Math.max(3, lvOf('writing'))), { lives: 3 }); } },
  { id: 'inversion', group: 'use', icon: '🔃', name: 'Inversión y énfasis', desc: 'Never have I…, Not only did he…, What I need is…', plan: () => setGame('inversion', 'Inversión y énfasis', 'emph', 'grammar', { fast: false }) },
  { id: 'colocaciones', group: 'use', icon: '🧲', name: 'Colocaciones C1', desc: 'heavy rain, bitterly disappointed, stark contrast…', plan: () => setGame('colocaciones', 'Colocaciones C1', 'adjn', 'vocab', { fast: false }) },
  { id: 'conectores2', group: 'use', icon: '🪢', name: 'Conectores en contexto', desc: 'despite / although / nevertheless / albeit: el que encaja.', plan: () => setGame('conectores2', 'Conectores en contexto', 'link', 'writing', { fast: false }) },
  { id: 'traduce', group: 'use', icon: '🌍', name: 'Traducción directa', desc: 'Frases en español: escríbelas en inglés.', plan: () => { const list = grammarItems.filter((i) => i.type === 'translate').map((i) => () => grammarExercise(i)); return endless('traduce', 'Traducción directa', (c) => fromList(c, list, lvOf('grammar')), { lives: 3 }); } },
  /* ---- de oído ---- */
  { id: 'numeros', group: 'ear', icon: '🔢', name: 'Números de oído', desc: 'thirteen o thirty, 1,514 o 1,540: cada vez más largos.', plan: () => endless('numeros', 'Números de oído', (c) => [gameExercise('num', c.exclude, Math.min(5, 1 + Math.floor(c.correct / 4)))], { lives: 3 }) },
  { id: 'horas', group: 'ear', icon: '🕰️', name: 'La hora de oído', desc: 'quarter to nine, twenty past six… ¿qué hora es?', plan: () => setGame('horas', 'La hora de oído', 'hr', 'listening', { fast: false }) },
  { id: 'perdida', group: 'ear', icon: '🎧', name: 'Palabra perdida', desc: 'Oyes la frase entera y escribes la palabra que falta.', plan: () => setGame('perdida', 'Palabra perdida', 'miss', 'listening', { fast: false }) },
  { id: 'eco', group: 'ear', icon: '🗣️', name: 'Escucha y ordena', desc: 'Oyes la frase y la montas con las piezas.', plan: () => { const list = grammarItems.filter((i) => i.sentence && i.sentence.split(' ').length >= 4 && i.sentence.split(' ').length <= 12).map((i) => () => grammarVariant(i, 'oa')); return endless('eco', 'Escucha y ordena', (c) => fromList(c, list, lvOf('listening')), { lives: 3 }); } },
  { id: 'rimas', group: 'ear', icon: '🎵', name: 'Rimas', desc: 'though, through, tough, cough: la ortografía engaña.', plan: () => setGame('rimas', 'Rimas', 'rhyme', 'listening', { fast: false }) },
  { id: 'escucha', group: 'ear', icon: '👂', name: 'Escucha y traduce', desc: 'Oyes una palabra sin verla: ¿qué significa?', plan: () => vocabModePlan('escucha', 'Escucha y traduce', 'audio') },
  /* ---- inglés real ---- */
  { id: 'carteles', group: 'life', icon: '🪧', name: 'Carteles y avisos', desc: 'MIND THE GAP, TO LET, NO THROUGH ROAD… ¿qué quieren decir?', plan: () => setGame('carteles', 'Carteles y avisos', 'signs', 'reading', { fast: false }) },
  { id: 'emails', group: 'life', icon: '📧', name: 'Frases de email', desc: 'La frase formal correcta para cada situación.', plan: () => setGame('emails', 'Frases de email', 'email', 'writing', { fast: false }) },
  { id: 'abreviaturas', group: 'life', icon: '🔤', name: 'Abreviaturas', desc: 'e.g., i.e., ASAP, FYI, et al., ETA…', plan: () => setGame('abreviaturas', 'Abreviaturas', 'abbr', 'reading') },
  { id: 'refranes', group: 'life', icon: '🦉', name: 'Refranes', desc: 'Better late than…, Every cloud has a silver…', plan: () => setGame('refranes', 'Refranes', 'prov', 'vocab') },
  { id: 'titulares', group: 'life', icon: '📰', name: 'Titulares', desc: 'Lees el arranque de un texto: ¿cuál es su título?', plan: () => setGame('titulares', 'Titulares', 'tit', 'reading', { fast: false }) },
  { id: 'cloze', group: 'life', icon: '📄', name: 'Cloze de lectura', desc: 'Frases sacadas de las lecturas, con una palabra borrada.', plan: () => setGame('cloze', 'Cloze de lectura', 'clz', 'reading', { fast: false }) },
  /* ---- a ciegas ---- */
  ...(Object.keys(CAT_NAME) as GrammarCat[]).map((cat): GameDef => ({ id: 'cat-' + cat, group: 'blind', icon: CAT_ICON[cat], name: CAT_NAME[cat], desc: `Todos los temas de «${CAT_NAME[cat].toLowerCase()}» mezclados, sin decirte cuál es.`, plan: () => catPlan(cat) })),
  { id: 'todoterreno', group: 'blind', icon: '🚙', name: 'Todoterreno', desc: 'Una pregunta de cada juego, al azar. 3 vidas.', plan: () => endless('todoterreno', 'Todoterreno', (c) => [gameExercise(pick(ALL_SETS), c.exclude, lvOf('grammar'))], { lives: 3 }) },
  { id: 'sorpresa', group: 'blind', icon: '🎁', name: 'Examen sorpresa', desc: '12 preguntas de todo, a ciegas y sin corrección hasta el final.', plan: () => ({
      title: 'Examen sorpresa', backTo: '#/games', total: 12, exam: true, exempt: true, passPct: 70,
      next: (c) => {
        if (c.answered >= 12) return null;
        const k = (['grammar', 'vocab', 'writing', 'listening', 'grammar', 'vocab'] as Skill[])[c.answered % 6];
        const ex = pickFor(k, { level: lvOf(k), exam: true, exclude: c.exclude, noLearn: true }).filter((e) => e.kind !== 'learn' && !e.passage).slice(0, 1);
        ex.forEach((e) => c.exclude.add(e.id));
        return ex.length ? ex.map((e) => ({ ...e, blind: true })) : null;
      },
      onFinish: (r) => (r.complete ? record('sorpresa', r.correct) : ['Examen sin terminar: no se guarda.']),
    }) },
];

/* Dos modos de juego: infinito (con vidas, hasta caer; récord = aciertos) o de longitud fija (10 / 20 / 30
   preguntas, sin vidas; récord = mejor resultado completo). */
export const GAME_LENGTHS = [10, 20, 30] as const;
const NO_LENGTH = new Set(['contrarreloj', 'textacos', 'muerte', 'uoe', 'sorpresa']);
export const hasLengths = (id: string) => !NO_LENGTH.has(id);
export function gamePlan(g: GameDef, n?: number): Plan {
  const base = g.plan();
  const ev = { key: 'gm:' + g.id, label: `el juego «${g.name}»` };
  if (!n || !hasLengths(g.id)) return { ...base, ev, record: getState().records[g.id] || undefined };
  const key = `${g.id}:${n}`;
  return {
    ...base,
    ev,
    title: `${base.title} · ${n} preguntas`,
    total: n,
    lives: undefined,
    next: (c) => (c.answered >= n ? null : base.next(c)),
    onFinish: (r) => {
      if (!r.complete) return [`Partida a medias: ${r.correct} aciertos de ${n}. No cuenta para el récord de ${n}.`];
      const prev = getState().records[key] ?? 0;
      if (r.correct > prev) {
        update((s) => {
          s.records[key] = r.correct;
        });
        return [`🏆 Nuevo récord en ${n}: ${r.correct}/${n}`];
      }
      return [`Récord en ${n}: ${prev}/${n}`];
    },
  };
}

/* «Demuéstralo»: 20 palabras pendientes de un nivel, sin pistas. Lo acertado entra en el repaso como acertado
   (y se irá comprobando en días distintos); lo fallado empieza a aprenderse. Nunca se marca nada como sabido. */
export function provePlan(level: number): Plan {
  const s = getState();
  const pool = shuffle(vocab.filter((v) => v.level === level && !s.srs[v.id])).slice(0, 20);
  const list = pool.map((w, i) => {
    const single = !w.word.includes(' ') && w.tag !== 'phrase';
    return { ...vocabExercise(w, single && i % 2 === 0 ? 'spell' : 'es-en'), label: `Demuéstralo · ${LEVELS[level - 1]}` };
  });
  return {
    title: `Demuestra ${LEVELS[level - 1]}`,
    backTo: '#/vocab',
    total: list.length,
    next: (c) => (c.answered < list.length ? [list[c.answered]] : null),
    onFinish: (r) =>
      r.answered
        ? [`${r.correct} de ${r.answered} demostradas. Entran en tu repaso y se irán comprobando en días distintos; solo llegan a «Dominada» si aguantan semanas.`]
        : [],
  };
}
