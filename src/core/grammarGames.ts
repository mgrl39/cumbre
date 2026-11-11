/* Juegos de gramática por sección. Un «ámbito» (scope) es un tema, una categoría de un tramo, un tramo o un nivel:
     t:<tema> · c:<tramo>:<categoría> · s:<tramo> · l:<nivel>
   Cada ámbito tiene los mismos juegos, generados a partir de sus ítems, además de su examen. */
import type { Exercise, GrammarCat, GrammarItem, GrammarTopic, Level } from './types.ts';
import { CAT_NAME, LEVELS } from './types.ts';
import { grammarTopics, itemsByTopic, topicById } from './content.ts';
import { grammarVariant, tfCount } from './generate.ts';
import { getState, update, type State } from './store.ts';
import { rnd, shuffle } from './text.ts';
import { SUBLEVELS, subById, subOfTopic } from './curriculum.ts';
import type { Ctx, Plan } from './plans.ts';

export function scopeTopics(scope: string): GrammarTopic[] {
  const [kind, a, b] = scope.split(':');
  if (kind === 't') return topicById.has(a) ? [topicById.get(a)!] : [];
  if (kind === 's') return grammarTopics.filter((t) => subOfTopic(t) === a);
  if (kind === 'c') return grammarTopics.filter((t) => subOfTopic(t) === a && t.cat === b);
  if (kind === 'l') return grammarTopics.filter((t) => t.level === a);
  return [];
}
export function scopeTitle(scope: string): string {
  const [kind, a, b] = scope.split(':');
  if (kind === 't') return topicById.get(a)?.title ?? 'Tema';
  if (kind === 's') return `${a} · ${subById.get(a)?.title ?? ''}`;
  if (kind === 'c') return `${a} · ${CAT_NAME[b as GrammarCat] ?? b}`;
  if (kind === 'l') return `Gramática ${a}`;
  return 'Gramática';
}
export const scopeBack = (scope: string) => (scope.startsWith('t:') ? `#/grammar/${scope.slice(2)}` : `#/grammar/play/${scope}`);
export const scopeItems = (scope: string): GrammarItem[] => scopeTopics(scope).flatMap((t) => itemsByTopic.get(t.id) || []);
export const allScopes = (): string[] => [
  ...grammarTopics.map((t) => 't:' + t.id),
  ...SUBLEVELS.map((s) => 's:' + s.id),
  ...LEVELS.slice(0, 5).map((l: Level) => 'l:' + l),
];

export type GMode = string;
export type GGroup = 'basico' | 'escribir' | 'oido' | 'reto';
export const GGROUP_NAME: Record<GGroup, { name: string; desc: string }> = {
  basico: { name: 'Reconocer', desc: 'Un toque por pregunta: elegir, detectar, ordenar.' },
  escribir: { name: 'Producir', desc: 'Aquí escribes tú. Es lo que más enseña.' },
  oido: { name: 'De oído', desc: 'La misma gramática, entrando por la oreja.' },
  reto: { name: 'Retos', desc: 'Con vidas, reloj o sin red. Para cuando ya lo llevas bien.' },
};
type Gen = { it: GrammarItem; make: () => Exercise | null };
export interface GModeDef {
  id: GMode;
  icon: string;
  name: string;
  desc: string;
  group: GGroup;
  /** cómo se mide el récord: % de una ronda completa o nº de aciertos */
  score: 'pct' | 'hits';
  /** preguntas de la ronda (por defecto 10) */
  n?: number;
  lives?: number;
  duration?: number;
  timer?: number;
  fast?: boolean;
  /** a ciegas: no se ve de qué tema es cada pregunta */
  blind?: boolean;
  /** respeta el orden del pool (de fácil a difícil) */
  sorted?: boolean;
  pool: (items: GrammarItem[], s: State) => Gen[];
}

const words = (s?: string) => (s ? s.split(' ').length : 0);
const tf = (it: GrammarItem): Gen => ({
  it,
  // la mitad de las veces la frase es correcta; la otra mitad lleva uno de los errores
  make: () => grammarVariant(it, 'tf' + (Math.random() < 0.5 ? 0 : 1 + rnd(tfCount(it) - 1))),
});
const nat = (it: GrammarItem): Gen => ({ it, make: () => grammarVariant(it) });
const vr = (it: GrammarItem, v: string): Gen => ({ it, make: () => grammarVariant(it, v) });
/** solo los ítems para los que la variante existe */
const vrs = (items: GrammarItem[], v: string): Gen[] => items.filter((i) => grammarVariant(i, v)).map((i) => vr(i, v));
const P = {
  mc: (x: GrammarItem[]) => x.filter((i) => i.type === 'mc').map(nat),
  tf: (x: GrammarItem[]) => x.filter((i) => tfCount(i) > 0).map(tf),
  gap: (x: GrammarItem[]) => x.filter((i) => i.type === 'gap').map(nat),
  err: (x: GrammarItem[]) => x.filter((i) => i.type === 'error').map(nat),
  tr: (x: GrammarItem[]) => x.filter((i) => i.type === 'translate').map(nat),
  kw: (x: GrammarItem[]) => x.filter((i) => i.type === 'trans').map(nat),
  ord: (x: GrammarItem[]) => x.filter((i) => words(i.sentence) >= 4 && words(i.sentence) <= 14).map((i) => vr(i, 'o')),
  dic: (x: GrammarItem[]) => x.filter((i) => words(i.sentence) >= 3 && words(i.sentence) <= 14).map((i) => vr(i, 'd')),
  fe: (x: GrammarItem[]) => x.filter((i) => i.type === 'mc' && i.prompt.includes('___') && (i.options?.length ?? 0) >= 1).map((i) => vr(i, 'fe')),
  written: (x: GrammarItem[]) => x.filter((i) => i.type !== 'mc').map(nat),
  all: (x: GrammarItem[]) => [...x.map(nat), ...P.tf(x), ...P.ord(x)],
};
const unseen = (x: GrammarItem[], s: State) => x.filter((i) => !s.items[i.id]);
const weak = (x: GrammarItem[], s: State) => x.filter((i) => { const st = s.items[i.id]; return !!st && (st.c < st.s || st.recent.endsWith('0')); });

export const GMODES: GModeDef[] = [
  /* ---- reconocer ---- */
  { id: 'elige', group: 'basico', icon: '🎯', name: 'Elige', desc: 'Un toque: la opción correcta. Si aciertas, pasa sola.', score: 'pct', fast: true, pool: P.mc },
  { id: 'vf', group: 'basico', icon: '✅', name: '¿Correcta o no?', desc: 'Ves una frase: ¿está bien o tiene trampa?', score: 'pct', fast: true, timer: 15, pool: P.tf },
  { id: 'hueco', group: 'basico', icon: '🧩', name: 'Hueco con opciones', desc: 'Los huecos de escribir, con cuatro opciones para elegir.', score: 'pct', fast: true, pool: (x) => vrs(x, 'gm') },
  { id: 'senala', group: 'basico', icon: '👆', name: 'Señala el error', desc: 'No la corrijas: toca la palabra que está mal.', score: 'pct', fast: true, pool: (x) => vrs(x, 'ew') },
  { id: 'reconoce', group: 'basico', icon: '🪞', name: 'Reconoce la traducción', desc: 'Frase en español: ¿cuál es su inglés correcto?', score: 'pct', fast: true, pool: (x) => vrs(x, 'tm') },
  { id: 'inversa', group: 'basico', icon: '↩️', name: 'Traducción inversa', desc: 'Frase en inglés: ¿qué significa exactamente?', score: 'pct', fast: true, pool: (x) => vrs(x, 'ti') },
  { id: 'ordena', group: 'basico', icon: '🧱', name: 'Ordena', desc: 'Monta la frase palabra a palabra.', score: 'pct', pool: P.ord },
  { id: 'calienta', group: 'basico', icon: '☕', name: 'Calentamiento', desc: 'Cinco de elegir para arrancar sin pereza.', score: 'pct', n: 5, fast: true, pool: P.mc },
  { id: 'nuevo', group: 'basico', icon: '🆕', name: 'Solo lo nuevo', desc: 'Únicamente las preguntas que todavía no has visto.', score: 'pct', pool: (x, s) => unseen(x, s).map(nat) },
  /* ---- producir ---- */
  { id: 'completa', group: 'escribir', icon: '⌨️', name: 'Completa', desc: 'Escribe tú la forma que falta, sin opciones.', score: 'pct', pool: P.gap },
  { id: 'sinopciones', group: 'escribir', icon: '🚫', name: 'Escríbela', desc: 'Ves las opciones, pero la respuesta la tecleas tú.', score: 'pct', pool: (x) => vrs(x, 'ty') },
  { id: 'primera', group: 'escribir', icon: '🔡', name: 'Primera letra', desc: 'Escribe lo que falta con la inicial como única pista.', score: 'pct', pool: (x) => vrs(x, 'fl') },
  { id: 'error', group: 'escribir', icon: '🩺', name: 'Caza el error', desc: 'La frase está mal: escríbela bien.', score: 'pct', pool: P.err },
  { id: 'traduce', group: 'escribir', icon: '🌍', name: 'Traduce', desc: 'Del español al inglés, usando la regla.', score: 'pct', pool: P.tr },
  { id: 'transforma', group: 'escribir', icon: '🔄', name: 'Transforma', desc: 'Di lo mismo con la palabra clave.', score: 'pct', pool: P.kw },
  { id: 'escritura', group: 'escribir', icon: '✍️', name: 'Todo escrito', desc: 'Doce preguntas y ninguna de elegir.', score: 'pct', n: 12, pool: P.written },
  { id: 'escalera', group: 'escribir', icon: '🪜', name: 'Escalera', desc: 'De elegir a transformar: cada peldaño cuesta más.', score: 'pct', n: 15, sorted: true, pool: (x) => [...shuffle(P.mc(x)).slice(0, 3), ...shuffle(P.gap(x)).slice(0, 3), ...shuffle(P.err(x)).slice(0, 3), ...shuffle(P.tr(x)).slice(0, 3), ...shuffle(P.kw(x)).slice(0, 3)] },
  { id: 'debiles', group: 'escribir', icon: '🎯', name: 'Lo que fallas', desc: 'Solo las preguntas de aquí que has fallado alguna vez.', score: 'pct', pool: (x, s) => weak(x, s).map(nat) },
  /* ---- de oído ---- */
  { id: 'dictado', group: 'oido', icon: '🎧', name: 'Dictado', desc: 'Escucha la frase y escríbela.', score: 'pct', pool: P.dic },
  { id: 'oido', group: 'oido', icon: '👂', name: 'Oído fino', desc: '¿Qué frase has oído exactamente?', score: 'pct', pool: P.fe },
  { id: 'escucha', group: 'oido', icon: '🔊', name: 'Escucha y completa', desc: 'Oyes la frase entera; escribe la palabra del hueco.', score: 'pct', pool: (x) => vrs(x, 'lg') },
  { id: 'eco', group: 'oido', icon: '🗣️', name: 'Escucha y ordena', desc: 'Oyes la frase y la montas con las piezas.', score: 'pct', pool: (x) => P.ord(x).map((g) => vr(g.it, 'oa')) },
  { id: 'oidomix', group: 'oido', icon: '🎼', name: 'Maratón de oído', desc: 'Dictado, oído fino y huecos de oído. 3 vidas.', score: 'hits', lives: 3, pool: (x) => [...P.dic(x), ...P.fe(x), ...vrs(x, 'lg')] },
  /* ---- retos ---- */
  { id: 'mezcla', group: 'reto', icon: '🎲', name: 'Mezcla', desc: 'Un poco de todo, en una ronda.', score: 'pct', n: 12, pool: P.all },
  { id: 'ciegas', group: 'reto', icon: '🙈', name: 'A ciegas', desc: 'Mezcla sin decirte el tema de cada pregunta. XP ×2.', score: 'pct', n: 12, blind: true, pool: (x) => x.map(nat) },
  { id: 'express', group: 'reto', icon: '🚀', name: 'Exprés', desc: 'Cinco preguntas de todo tipo. Dos minutos.', score: 'pct', n: 5, pool: P.all },
  { id: 'maraton', group: 'reto', icon: '🏃', name: 'Maratón', desc: 'Treinta preguntas seguidas de todo tipo.', score: 'pct', n: 30, pool: P.all },
  { id: 'perfecta', group: 'reto', icon: '💎', name: 'Ronda perfecta', desc: 'Diez seguidas. Un solo fallo y se acabó.', score: 'pct', lives: 1, pool: (x) => x.map(nat) },
  { id: 'jefe', group: 'reto', icon: '👹', name: 'Jefe final', desc: 'Quince escritas, 45 s cada una y solo dos vidas.', score: 'pct', n: 15, lives: 2, timer: 45, pool: P.written },
  { id: 'relampago', group: 'reto', icon: '⚡', name: 'Relámpago', desc: 'De elegir, a 6 segundos por pregunta.', score: 'pct', fast: true, timer: 6, pool: P.mc },
  { id: 'racha', group: 'reto', icon: '🔥', name: 'Supervivencia', desc: 'Sin fin y con 3 vidas: ¿cuántas seguidas?', score: 'hits', lives: 3, pool: P.all },
  { id: 'muerte', group: 'reto', icon: '💀', name: 'Muerte súbita', desc: 'Sin fin y con una sola vida.', score: 'hits', lives: 1, pool: (x) => x.map(nat) },
  { id: 'zen', group: 'reto', icon: '🧘', name: 'Zen', desc: 'Sin vidas ni reloj: practica hasta que quieras parar.', score: 'hits', pool: P.all },
  { id: 'crono', group: 'reto', icon: '⏱️', name: 'Contrarreloj', desc: '60 segundos. Todo lo que puedas.', score: 'hits', duration: 60, fast: true, pool: (x) => [...P.mc(x), ...P.tf(x)] },
  { id: 'sprintvf', group: 'reto', icon: '🏁', name: 'Sprint ¿sí o no?', desc: '45 segundos de «¿correcta o no?».', score: 'hits', duration: 45, fast: true, pool: P.tf },
  { id: 'cronoescrito', group: 'reto', icon: '⌛', name: 'Contrarreloj escrito', desc: 'Dos minutos escribiendo: huecos y correcciones.', score: 'hits', duration: 120, pool: (x) => [...P.gap(x), ...P.err(x)] },
];
export const gmode = (id: string) => GMODES.find((m) => m.id === id);

/** Generadores disponibles de un modo para una lista de ítems. */
export function modePool(items: GrammarItem[], mode: GMode, s: State = getState()): Gen[] {
  return gmode(mode)?.pool(items, s) ?? [];
}
export const MIN_POOL = 3;
export const roundSize = (mode: GMode, pool: number) => Math.min(gmode(mode)?.n ?? 10, pool);

export interface ModeInfo {
  def: GModeDef;
  /** preguntas distintas disponibles */
  pool: number;
  /** preguntas de una ronda (0 = sin fin) */
  n: number;
  record?: number;
}
export function modesFor(scope: string, s: State = getState()): ModeInfo[] {
  const items = scopeItems(scope);
  return GMODES.map((def) => {
    const pool = def.pool(items, s).length;
    return { def, pool, n: def.score === 'hits' ? 0 : roundSize(def.id, pool), record: s.records[`tg:${scope}:${def.id}`] };
  }).filter((m) => m.pool >= MIN_POOL || (m.record !== undefined && m.pool > 0));
}
/** Juegos de un ámbito superados (ronda completa con ≥ 80 %). Los que dependen de tu historial no cuentan. */
const DYNAMIC = new Set(['nuevo', 'debiles']);
export function gamesBeaten(scope: string, s: State = getState()) {
  const ms = modesFor(scope, s).filter((m) => m.def.score === 'pct' && !DYNAMIC.has(m.def.id));
  return { done: ms.filter((m) => (m.record ?? 0) >= 80).length, total: ms.length };
}

/** Orden de salida: primero lo que nunca has visto o más fallas; después, al azar. */
function ordered(gens: Gen[]): Gen[] {
  const s = getState();
  const w = (g: Gen) => {
    const st = s.items[g.it.id];
    return st ? st.c / st.s : -1;
  };
  return shuffle(gens).sort((a, b) => Math.round(w(a) * 4) - Math.round(w(b) * 4));
}

export function grammarGamePlan(scope: string, mode: GMode): Plan {
  const def = gmode(mode)!;
  const pool = modePool(scopeItems(scope), mode);
  const key = `tg:${scope}:${mode}`;
  const title = `${def.name} · ${scopeTitle(scope)}`;
  const backTo = scopeBack(scope);
  const fast = !!def.fast;
  let queue: Gen[] = [];
  const lastItem = { id: '' };
  const one = (): Exercise[] => {
    for (let tries = 0; tries < 40; tries++) {
      if (!queue.length) queue = def.sorted ? [...pool] : ordered(pool);
      const g = queue.shift()!;
      if (g.it.id === lastItem.id && pool.length > 1) continue;
      const ex = g.make();
      if (ex) {
        lastItem.id = g.it.id;
        return [def.blind ? { ...ex, blind: true } : ex];
      }
    }
    return [];
  };
  const rec = (v: number, fmt: (x: number) => string): string[] => {
    const prev = getState().records[key] ?? 0;
    if (v > prev) {
      update((s) => void (s.records[key] = v));
      return [`🏆 Nuevo récord: ${fmt(v)}`];
    }
    return [`Récord: ${fmt(prev)}`];
  };
  const timer = def.timer ? () => def.timer : undefined;
  if (def.score === 'hits') {
    return {
      title, backTo, fast, next: one, timer, record: getState().records[key] || undefined, lives: def.lives, duration: def.duration,
      onFinish: (r) => (r.answered ? rec(r.correct, (x) => `${x} aciertos`) : []),
    };
  }
  const n = roundSize(mode, pool.length);
  return {
    title, backTo, fast, total: n, timer, lives: def.lives,
    banner: def.blind ? () => '🙈 A ciegas: no te digo de qué tema es · XP ×2' : undefined,
    next: (c: Ctx) => (c.answered >= n ? null : one()),
    onFinish: (r) => {
      if (!r.complete) return [def.lives ? `Se acabaron las vidas: ${r.correct} de ${n}. Para que cuente hay que llegar al final.` : `Ronda a medias: ${r.correct} de ${n}. Para que cuente hay que terminarla.`];
      const out = rec(r.pct, (x) => `${x} %`);
      if (r.pct >= 80) out.unshift(`✓ Juego superado (${r.pct} %)`);
      else out.unshift(`${r.pct} %: el juego se da por superado con 80 % o más.`);
      return out;
    },
  };
}

/* ---------- Examen de un ámbito: sin pistas ni corrección hasta el final ---------- */
export const EXAM_PASS = 80;
export const examSize = (scope: string) => {
  const kind = scope[0];
  const max = kind === 't' ? 15 : kind === 'c' ? 16 : kind === 's' ? 20 : 30;
  return Math.min(max, scopeItems(scope).length);
};
export function grammarExamPlan(scope: string): Plan {
  const n = examSize(scope);
  // reparto equilibrado entre los temas del ámbito
  const byTopic = scopeTopics(scope).map((t) => shuffle(itemsByTopic.get(t.id) || []));
  const list: GrammarItem[] = [];
  for (let i = 0; list.length < n && byTopic.some((l) => l.length > i); i++) for (const l of shuffle(byTopic)) if (l[i] && list.length < n) list.push(l[i]);
  const exs = shuffle(list).map((it) => grammarVariant(it)!);
  return {
    title: `Examen · ${scopeTitle(scope)}`,
    backTo: scopeBack(scope),
    exam: true,
    exempt: true,
    total: exs.length,
    passPct: EXAM_PASS,
    timer: () => 60,
    next: (c) => (c.answered < exs.length ? [exs[c.answered]] : null),
    onFinish: (r) => {
      if (!r.complete) return ['Examen sin terminar: no se guarda. Un examen solo cuenta si lo acabas.'];
      const prev = getState().exams[scope];
      update((s) => {
        s.exams[scope] = { best: Math.max(prev?.best ?? 0, r.pct), last: r.pct, t: Date.now(), n: (prev?.n ?? 0) + 1 };
      });
      const first = !prev || prev.best < EXAM_PASS;
      if (r.pct >= EXAM_PASS) return [first ? `📝 Examen aprobado: ${r.pct} %` : `Examen: ${r.pct} % (mejor: ${Math.max(prev!.best, r.pct)} %)`];
      return [`Examen: ${r.pct} %. Se aprueba con ${EXAM_PASS} %. Repasa los fallos y vuelve otro día.`];
    },
  };
}
