/* La Rueda: lo que ya has aprobado vuelve, girando, SIN decirte de qué tema es.
   Con la regla delante cualquiera acierta «present simple»; lo que demuestra que sabes inglés es acertarlo
   cuando la pregunta llega mezclada con todo lo demás y nadie te dice qué se está evaluando.

   - Entra en la Rueda todo tema aprobado (paso del Camino hecho, examen del tema aprobado o nivel «Aprobado»).
   - Gira: siempre sale el tema que lleva más tiempo sin salir; cuando han salido todos, se completa una vuelta.
   - Cada acierto a ciegas cuenta para la maestría del tema Y para su contador «a ciegas», imprescindible para
     subir de Bronce en adelante (ver BLIND_NEED en mastery.ts).
   - Una de cada cuatro preguntas es una palabra que ya has aprendido, para producirla (no reconocerla). */
import type { Exercise } from './types.ts';
import { lvlNum } from './types.ts';
import type { State } from './store.ts';
import { getState } from './store.ts';
import { grammarTopics, itemsByTopic, topicById } from './content.ts';
import { grammarExercise, grammarVariant, tfCount, vocabExercise, findWord } from './generate.ts';
import { tierOf, PASS_TIER } from './mastery.ts';
import { pick, shuffle } from './text.ts';

export const WHEEL_MIN = 3;

/** ¿Tema aprobado? (aprobar ≠ dominar: aprobar solo te da derecho a que la Rueda te lo pregunte) */
export function topicPassed(s: State, id: string): boolean {
  const t = topicById.get(id);
  if (!t) return false;
  return !!s.path[`${t.level}:g:${id}`]?.done || (s.exams[`t:${id}`]?.best ?? 0) >= 80 || tierOf(s.ev['t:' + id]) >= PASS_TIER;
}
export const passedTopics = (s: State): string[] => grammarTopics.filter((t) => topicPassed(s, t.id)).map((t) => t.id);

/** Temas que giran en la Rueda. Si aún hay menos de 3 aprobados, se completa con lo ya practicado. */
export function wheelPool(s: State): string[] {
  const passed = passedTopics(s);
  if (passed.length >= WHEEL_MIN) return passed;
  const practised = grammarTopics.filter((t) => !passed.includes(t.id) && (s.topics[t.id]?.s ?? 0) >= 6).map((t) => t.id);
  return [...passed, ...practised];
}

export function wheelStatus(s: State) {
  const pool = wheelPool(s);
  const seen = (s.wheel?.seen ?? []).filter((id) => pool.includes(id));
  return {
    pool,
    passed: passedTopics(s).length,
    ready: pool.length >= WHEEL_MIN,
    laps: s.wheel?.laps ?? 0,
    seen: seen.length,
    blind: s.ev.wheel?.h ?? 0,
    blindMiss: s.ev.wheel?.m ?? 0,
  };
}

/** Siguiente tema: el que no ha salido en esta vuelta y lleva más tiempo sin salir. */
function nextTopic(s: State, skip: Set<string>): string | undefined {
  const pool = wheelPool(s);
  if (!pool.length) return undefined;
  const seen = new Set(s.wheel?.seen ?? []);
  const last = s.wheel?.last ?? {};
  let cand = pool.filter((id) => !seen.has(id) && !skip.has(id));
  if (!cand.length) cand = pool.filter((id) => !skip.has(id));
  if (!cand.length) cand = pool;
  const oldest = Math.min(...cand.map((id) => last[id] ?? 0));
  // entre los más antiguos (misma franja de 1 h) se elige al azar para que el orden no se aprenda
  return pick(cand.filter((id) => (last[id] ?? 0) <= oldest + 3_600_000));
}

/** Una pregunta de gramática a ciegas. `skip` = temas ya servidos en esta sesión (aún sin responder). */
export function wheelGrammar(exclude: Set<string>, skip: Set<string> = new Set()): Exercise | null {
  const s = getState();
  const tid = nextTopic(s, skip);
  if (!tid) return null;
  skip.add(tid);
  const items = shuffle(itemsByTopic.get(tid) || []);
  // primero lo que más fallas o no has visto; nunca repetido en la sesión
  const scored = items
    .filter((it) => !exclude.has(it.id))
    .map((it) => {
      const st = s.items[it.id];
      return { it, w: !st ? 2 : 1 + (1 - st.c / st.s) * 3 };
    })
    .sort((a, b) => b.w - a.w);
  const it = (scored.length ? pick(scored.slice(0, Math.max(3, Math.ceil(scored.length / 3)))) : { it: items[0] }).it;
  if (!it) return null;
  exclude.add(it.id);
  let ex: Exercise | null = null;
  const r = Math.random();
  if (r < 0.12 && tfCount(it) > 0) ex = grammarVariant(it, 'tf' + Math.floor(Math.random() * Math.min(2, tfCount(it))));
  else if (r < 0.22 && it.sentence && it.sentence.split(' ').length >= 4 && it.sentence.split(' ').length <= 12) ex = grammarExercise(it, true);
  ex = ex ?? grammarExercise(it);
  return { ...ex, blind: true };
}

/** Una palabra ya aprendida, para producirla. */
export function wheelWord(exclude: Set<string>): Exercise | null {
  const s = getState();
  const ids = Object.keys(s.srs).filter((id) => (id.startsWith('v:') || id.startsWith('c:')) && (s.srs[id].reps ?? 0) >= 1 && !exclude.has(id));
  if (ids.length < 8) return null;
  for (let i = 0; i < 6; i++) {
    const id = pick(ids);
    const e = findWord(id);
    if (!e) continue;
    exclude.add(id);
    const single = !e.word.includes(' ') && e.tag !== 'phrase';
    return { ...vocabExercise(e, single && Math.random() < 0.6 ? 'spell' : 'es-en'), blind: true };
  }
  return null;
}

export function wheelExercise(exclude: Set<string>, skip: Set<string>, n: number): Exercise | null {
  if (n % 4 === 3) {
    const w = wheelWord(exclude);
    if (w) return w;
  }
  return wheelGrammar(exclude, skip);
}

/** Nivel medio de lo que gira (para mostrar). */
export const wheelLevels = (s: State) => {
  const out = [0, 0, 0, 0, 0];
  for (const id of wheelPool(s)) out[lvlNum(topicById.get(id)!.level) - 1]++;
  return out;
};
