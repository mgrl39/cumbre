/* Valida el contenido: node scripts/validate.ts */
import { grammarItems, grammarTopics, vocab, readings, writingItems, writingPrompts, sentences } from '../src/core/content.ts';
import { norm } from '../src/core/text.ts';
import { gameItem, GAME_DATA_SIZE, type SetId } from '../src/core/minigames.ts';

const errs: string[] = [];
const err = (id: string, m: string) => errs.push(`${id}: ${m}`);

for (const g of grammarItems) {
  if (!g.answers.length || g.answers.some((a) => !a)) err(g.id, 'sin respuesta');
  const blanks = (g.prompt.match(/___/g) || []).length;
  const scenario = g.type === 'mc' && blanks === 0 && g.prompt.trim().endsWith(':');
  if ((g.type === 'mc' || g.type === 'gap') && blanks !== 1 && !scenario) err(g.id, 'debe tener exactamente un ___: ' + g.prompt);
  if (g.type === 'mc') {
    if ((g.options || []).length < 2) err(g.id, 'pocas opciones');
    if ((g.options || []).some((o) => g.answers.map(norm).includes(norm(o)))) err(g.id, 'distractor igual a la respuesta');
  }
  if (g.type === 'trans' && !(g.options?.[0] || '').includes('___')) err(g.id, 'transformación sin ___');
  if (g.type === 'trans' && !g.key) err(g.id, 'transformación sin KEY');
  if (g.type === 'error' && g.answers.some((a) => norm(a) === norm(g.prompt))) err(g.id, 'la frase con error es igual a la corrección');
  if (g.sentence?.includes('___')) err(g.id, 'frase completa con ___');
}
for (const w of writingItems) {
  if (!w.answers.length) err(w.id, 'sin respuesta');
  if (w.type === 'trans' && !(w.start || '').includes('___')) err(w.id, 'transformación sin ___');
  if (w.type === 'linker' && !w.prompt.includes('___')) err(w.id, 'cohesión sin ___');
  if (w.type === 'linker' && w.options?.some((o) => norm(o) === norm(w.answers[0]))) err(w.id, 'distractor igual a la respuesta');
  if (w.type === 'error' && w.answers.some((a) => norm(a) === norm(w.prompt))) err(w.id, 'sin error real');
}
const seen = new Set<string>();
for (const v of vocab) {
  if (!v.es || !v.word) err(v.id, 'entrada incompleta');
  // el vocabulario curado lleva siempre ejemplo; el banco solo en phrasal verbs, modismos y expresiones
  const needsEx = !v.bank ? v.tag !== 'phrase' : v.tag !== 'core';
  if ((needsEx || (v.bank && v.ex)) && !/\*[^*]+\*/.test(v.ex)) err(v.id, 'ejemplo sin *palabra*');
  if (seen.has(v.id)) err(v.id, 'id duplicado');
  seen.add(v.id);
}
for (const r of readings) for (const [i, q] of r.questions.entries()) if (q.answer < 0 || q.answer >= q.options.length) err(`${r.id}#${i}`, 'índice de respuesta inválido');
const rids = new Set<string>();
for (const r of readings) {
  if (rids.has(r.id)) err(r.id, 'lectura duplicada');
  rids.add(r.id);
  const words = r.text.split(/\s+/).length;
  if (r.long && words < 650) err(r.id, `texto largo con solo ${words} palabras`);
}
// juegos: cada ítem se genera, la respuesta está entre las opciones y no se repite como distractor
for (const set of ['irr', 'prep', 'coll', 'formal', 'syn', 'count', 'wf', 'conf', 'real', 'idiom'] as SetId[]) {
  for (let i = 0; i < GAME_DATA_SIZE[set as keyof typeof GAME_DATA_SIZE]; i++) {
    for (const v of set === 'irr' ? [0, 1, 2] : [0]) {
      const ex = gameItem(set, i, v);
      if (!ex) { err(`gm:${set}:${i}`, 'no se genera'); continue; }
      if (!ex.answers.length || ex.answers.some((a) => !a)) err(ex.id, 'sin respuesta');
      if (ex.kind === 'mc') {
        if ((ex.options || []).length < 2) err(ex.id, 'pocas opciones');
        const dup = (ex.options || []).filter((o) => norm(o) === norm(ex.answers[0])).length;
        if (dup !== 1) err(ex.id, 'respuesta repetida o ausente en opciones: ' + ex.options?.join(' / '));
      }
    }
  }
}
// juegos nuevos (conjuntos genéricos y procedurales): 80 preguntas de cada uno, sin repetir, bien formadas
{
  const { ALL_SETS, gameExercise } = await import('../src/core/minigames.ts');
  for (const set of ALL_SETS) {
    const seenIds = new Set<string>();
    for (let i = 0; i < 80; i++) {
      let ex;
      try { ex = gameExercise(set, seenIds); } catch (e) { err(`gm:${set}`, 'excepción: ' + (e as Error).message); break; }
      if (!ex) { err(`gm:${set}`, 'no se genera'); break; }
      seenIds.add(ex.id);
      if (!ex.answers.length || ex.answers.some((a) => !a)) err(ex.id, 'sin respuesta');
      if (ex.kind === 'mc') {
        if ((ex.options || []).length < 2) err(ex.id, 'pocas opciones');
        const dup = (ex.options || []).filter((o) => norm(o) === norm(ex.answers[0])).length;
        if (dup !== 1) err(ex.id, 'respuesta repetida o ausente en opciones: ' + ex.options?.join(' / '));
      }
    }
  }
}
// juegos de gramática: todas las variantes de cada ítem se generan bien y cada tema tiene juegos de sobra
{
  const { grammarVariant, tfCount, TF_NO } = await import('../src/core/generate.ts');
  const { modesFor, allScopes, examSize } = await import('../src/core/grammarGames.ts');
  for (const g of grammarItems) {
    for (let k = 0; k < tfCount(g); k++) {
      const ex = grammarVariant(g, 'tf' + k);
      if (!ex) { err(g.id, 'variante tf' + k + ' no se genera'); continue; }
      const right = grammarVariant(g, 'tf0')!.prompt;
      if (k > 0 && norm(ex.prompt) === norm(right)) err(g.id, 'la variante incorrecta es igual a la correcta: ' + ex.prompt);
      if (k > 0 && ex.answers[0] !== TF_NO) err(g.id, 'tf mal etiquetado');
      if (/___/.test(ex.prompt)) err(g.id, 'tf con hueco: ' + ex.prompt);
    }
    if (g.sentence && /[→"“”…]/.test(g.sentence)) err(g.id, 'frase suelta con diálogo o flecha');
    if (g.type === 'mc' && g.prompt.includes('___')) {
      const fe = grammarVariant(g, 'fe');
      if (!fe || fe.options!.filter((o) => o === fe.answers[0]).length !== 1) err(g.id, 'oído fino mal generado');
    }
    if (g.sentence && (!grammarVariant(g, 'o') || !grammarVariant(g, 'd'))) err(g.id, 'variante ordenar/dictado no se genera');
  }
  let minModes = 99, minTopic = '';
  for (const t of grammarTopics) {
    const n = modesFor('t:' + t.id).length;
    if (n < minModes) { minModes = n; minTopic = t.id; }
    if (n < 6) err(t.id, `solo ${n} juegos disponibles`);
    if (examSize('t:' + t.id) < 10) err(t.id, 'examen con menos de 10 preguntas');
  }
  console.log(`Juegos de gramática: ${allScopes().length} ámbitos · mínimo ${minModes} juegos por tema (${minTopic})`);
}
let prt = 0;
for (let i = 0; i < vocab.filter((v) => v.tag === 'phrasal').length; i++) if (gameItem('prt', i)) prt++;
console.log(`Juegos: ${Object.entries(GAME_DATA_SIZE).map(([k, v]) => `${k} ${v}`).join(' · ')} · partículas ${prt}`);
for (const s of sentences) if (s.text.includes('*') || s.text.includes('___')) err(s.src, 'frase de dictado sucia');

console.log(`Temas: ${grammarTopics.length} · ítems gramática: ${grammarItems.length} · vocabulario: ${vocab.length} · lecturas: ${readings.length} · ítems writing: ${writingItems.length} · tareas de redacción: ${writingPrompts.length} · frases de dictado: ${sentences.length}`);
const byLv: Record<number, number> = {};
grammarItems.forEach((g) => (byLv[g.level] = (byLv[g.level] || 0) + 1));
console.log('Gramática por nivel', byLv);
const vb: Record<number, number> = {};
vocab.forEach((g) => (vb[g.level] = (vb[g.level] || 0) + 1));
console.log('Vocab por nivel', vb);
if (errs.length) {
  console.log(`\n${errs.length} problemas:`);
  errs.forEach((e) => console.log(' - ' + e));
  process.exit(1);
}
console.log('✓ Contenido válido');
