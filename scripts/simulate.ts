/* Simulación headless de sesiones: node scripts/simulate.ts */
const mem: Record<string, string> = {};
(globalThis as any).window = globalThis;
(globalThis as any).localStorage = { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => (mem[k] = v), removeItem: (k: string) => delete mem[k] };

const { flowPlan, placementPlan, certPlan, buildPath, stepPlan, GAMES, reviewPlan, gamePlan } = await import('../src/core/plans.ts');
const { applyResult, finishSession } = await import('../src/core/progress.ts');
const { getState } = await import('../src/core/store.ts');
const { SKILLS } = await import('../src/core/types.ts');
const { levelOf } = await import('../src/core/rating.ts');
const { isCorrect } = await import('../src/core/text.ts');

type Plan = ReturnType<typeof flowPlan>;
let problems = 0;
function run(name: string, plan: Plan, max = 200, skill = 0.7) {
  const ctx: any = { answered: 0, correct: 0, run: 0, lives: plan.lives ?? Infinity, exclude: new Set(), results: [], block: 0 };
  let steps = 0;
  try {
    while (steps++ < max) {
      const exs = plan.next(ctx);
      if (!exs || !exs.length) break;
      for (const ex of exs) {
        if (!ex || !ex.id || !ex.skill) { problems++; console.log('  ✗ ejercicio inválido en', name, ex); continue; }
        if (ex.kind === 'mc' && (!ex.options || !ex.options.some((o: string) => ex.answers.includes(o)))) { problems++; console.log('  ✗ MC sin respuesta correcta', ex.id, ex.options, ex.answers); }
        if (ex.kind === 'mc' && new Set(ex.options).size !== ex.options!.length) { problems++; console.log('  ✗ opciones duplicadas', ex.id, ex.options); }
        if (ex.kind === 'order' && !isCorrect(ex.answers[0], ex.answers)) { problems++; console.log('  ✗ order', ex.id); }
        if (ex.kind === 'type' && !isCorrect(ex.answers[0], ex.answers)) { problems++; console.log('  ✗ type no acepta su propia respuesta', ex.id); }
        if (ex.kind === 'mc' && (ex.options?.length ?? 0) < 2) { problems++; console.log('  ✗ MC con <2 opciones', ex.id); }
        if (ex.kind === 'learn') { applyResult(ex, true); continue; }
        // alumno simulado: acierta más en niveles bajos
        const ok = Math.random() < Math.min(0.97, skill + (3 - ex.level) * 0.15);
        ctx.answered++; if (ok) { ctx.correct++; ctx.run++; } else { ctx.run = 0; ctx.lives--; }
        ctx.results.push({ ex, ok });
        applyResult(ex, ok, { placement: plan.placement, exam: plan.exam, run: ctx.run, given: ok ? ex.answers[0] : 'x', ev: plan.ev });
        if (ctx.lives <= 0) break;
      }
      if (ctx.lives <= 0) break;
    }
    const pct = ctx.answered ? Math.round((ctx.correct / ctx.answered) * 100) : 0;
    const total = Math.max(ctx.answered, plan.total ?? 0);
    const notes = plan.onFinish?.({ answered: ctx.answered, correct: ctx.correct, total, complete: !plan.total || ctx.answered >= plan.total, pct: total ? Math.round((ctx.correct / total) * 100) : 0, results: ctx.results }) ?? [];
    finishSession(1, 0, 0);
    console.log(`✓ ${name}: ${ctx.answered} resp, ${pct}% ${notes.slice(0, 2).join(' | ')}`);
  } catch (e) {
    problems++;
    console.log(`✗ ${name}:`, e);
  }
}

run('placement', placementPlan([...SKILLS]));
console.log('  niveles:', SKILLS.map((k) => `${k} ${levelOf(getState().skills[k].r).label}`).join(', '));
run('flow', flowPlan(), 400);
for (const k of SKILLS) run('flow-' + k, flowPlan(k), 60);
run('review', reviewPlan(), 100);
// el repaso debe poder resolver todos los ids que haya en el SRS (incluidos los de juegos)
const { pickReview } = await import('../src/core/generate.ts');

for (const k of [...SKILLS, 'mixed'] as const) for (const l of ['A1', 'A2', 'B1', 'B2', 'C1'] as const) for (let sec = 0; sec < 4; sec++) run(`cert ${k} ${l} #${sec}`, certPlan(k, l, sec));
console.log('  certificados conseguidos:', Object.values(getState().certs).filter((c) => c.passed).length);
const steps = buildPath().flatMap((u) => u.steps);
console.log('Pasos del camino:', steps.length, buildPath().map((u) => `${u.id}:${u.steps.length}`).join(' '));
for (const st of steps) run('step ' + st.id, stepPlan(st), 60, 0.95);
// La Rueda: preguntas a ciegas de temas ya aprobados
{
  const { wheelPlan } = await import('../src/core/plans.ts');
  const { wheelStatus } = await import('../src/core/wheel.ts');
  for (let i = 0; i < 6; i++) run('wheel #' + i, wheelPlan(20), 40, 0.85);
  const st = getState();
  console.log('  rueda:', JSON.stringify(wheelStatus(st)).slice(0, 200), '· vueltas', st.wheel?.laps ?? 0);
}
for (const g of GAMES) run('game ' + g.id, gamePlan(g), 80);
for (const g of GAMES) run('game ' + g.id + ' ×10', gamePlan(g, 10), 80);
// juegos y exámenes de gramática de cada ámbito
{
  const { allScopes, modesFor, grammarGamePlan, grammarExamPlan } = await import('../src/core/grammarGames.ts');
  const before = problems;
  let n = 0;
  const log = console.log;
  console.log = () => {};
  // por defecto, una muestra (1 de cada 5 ámbitos); con --full, todos (tarda varios minutos)
  const full = process.argv.includes('--full');
  for (const sc of allScopes().filter((_, i) => full || i % 5 === 0)) {
    for (const m of modesFor(sc)) { run(`gg ${sc} ${m.def.id}`, grammarGamePlan(sc, m.def.id), 40, 0.8); n++; }
    run(`gx ${sc}`, grammarExamPlan(sc), 60, 0.8); n++;
  }
  console.log = log;
  console.log(`✓ juegos y exámenes de gramática: ${n} sesiones, ${problems - before} problemas · exámenes guardados: ${Object.keys(getState().exams).length}`);
}
// repaso de fallos: todos los fallos apuntados se pueden reconstruir
{
  const { failsPlan, pendingFails } = await import('../src/core/plans.ts');
  const { exerciseFromId } = await import('../src/core/generate.ts');
  const all = Object.keys(getState().fails);
  const lost = all.filter((id) => !exerciseFromId(id));
  if (lost.length) { problems++; console.log('  ✗ fallos sin reconstruir:', lost.slice(0, 10)); }
  console.log(`  fallos apuntados: ${all.length} · pendientes hoy: ${pendingFails(getState()).length} · sin reconstruir: ${lost.length}`);
  run('fails', failsPlan(), 60, 0.9);
  run('fails grammar', failsPlan({ skill: 'grammar' }), 60, 0.9);
}
run('review final', reviewPlan(), 300);
{
  const bad = Object.keys(getState().srs).filter((id) => { const e = new Set<string>(); for (const k of Object.keys(getState().srs)) if (k !== id) e.add('rv:' + k); return !pickReview(e); });
  // ids no vencidos no se devuelven: forzamos due = 0 para comprobar que todos se pueden reconstruir
  const st = getState(); for (const id of Object.keys(st.srs)) st.srs[id].due = 0;
  const unres = Object.keys(st.srs).filter((id) => { const e = new Set<string>(); for (const k of Object.keys(st.srs)) if (k !== id) e.add('rv:' + k); return !pickReview(e); });
  if (unres.length) { problems++; console.log('  ✗ ids de repaso sin reconstruir:', unres.slice(0, 10)); }
  console.log('  repaso: ' + Object.keys(st.srs).length + ' ids, sin reconstruir: ' + unres.length + (bad.length ? '' : ''));
}
console.log('Logros:', Object.keys(getState().achievements).length, '· XP', getState().xp, '· SRS', Object.keys(getState().srs).length);
console.log(problems ? `\n${problems} PROBLEMAS` : '\n✓ Sin problemas');
process.exit(problems ? 1 : 0);
