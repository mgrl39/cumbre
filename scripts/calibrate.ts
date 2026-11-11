const mem: Record<string, string> = {};
(globalThis as any).window = globalThis;
(globalThis as any).localStorage = { getItem: (k: string) => mem[k] ?? null, setItem: (k: string, v: string) => (mem[k] = v), removeItem: () => {} };
const { placementPlan } = await import('../src/core/plans.ts');
const { applyResult } = await import('../src/core/progress.ts');
const { getState } = await import('../src/core/store.ts');
const { SKILLS } = await import('../src/core/types.ts');
const { levelOf } = await import('../src/core/rating.ts');
// alumno con nivel real T: acierta ~90 % por debajo, ~75 % en su nivel, ~35 % por encima (+azar en MC)
for (const T of [0, 1, 2, 3, 4, 5, 9]) {
  const out: string[] = [];
  for (let rep = 0; rep < 3; rep++) {
    const plan = placementPlan([...SKILLS]);
    const ctx: any = { answered: 0, correct: 0, run: 0, lives: Infinity, exclude: new Set(), results: [], block: 0 };
    let exs;
    while ((exs = plan.next(ctx))) for (const ex of exs) {
      const p = ex.level < T ? 0.92 : ex.level === T ? 0.75 : ex.level === T + 1 ? 0.3 : 0.1;
      const guess = ex.kind === 'mc' ? 1 / ex.options!.length : 0;
      const ok = Math.random() < guess + (1 - guess) * p;
      ctx.answered++;
      ctx.results.push({ ex, ok });
      applyResult(ex, ok, { placement: true });
    }
    plan.onFinish?.({ answered: ctx.answered, correct: 0, pct: 0, results: ctx.results });
    out.push(SKILLS.map((k) => levelOf(getState().skills[k].r).label).join(' / '));
  }
  console.log(`Nivel real ${T}:`, out.join('  ||  '));
}
