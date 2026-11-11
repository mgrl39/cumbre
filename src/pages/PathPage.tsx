import { useMemo } from 'react';
import { useStore } from '../core/store.ts';
import { buildPath, stepIcon, stepValue, unitProgress, STEP_DONE } from '../core/plans.ts';
import { Progress, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';

export default function PathPage() {
  const s = useStore((x) => x);
  const units = useMemo(buildPath, []);
  const all = units.flatMap((u) => u.steps);
  const total = all.reduce((a, st) => a + stepValue(s.path[st.id]), 0);
  const firstOpen = all.find((st) => !s.path[st.id]?.done)?.id;
  const curUnit = units.find((u) => u.steps.some((x) => x.id === firstOpen))?.id;
  return (
    <div className="page">
      <h1>El Camino</h1>
      <p className="lede">
        {units.length} tramos, desde cero y en orden: gramática, vocabulario por paquetes, lecturas, oído y escritura. Todo está abierto. Cada paso guarda tu mejor resultado <b>sobre el total de preguntas</b>: si lo dejas a la mitad, cuenta solo lo que acertaste. Se marca como hecho al completarlo entero con ≥ {STEP_DONE} %.
      </p>
      <Progress value={total} max={all.length} />
      <div className="muted small">{Math.floor((total / all.length) * 100)} % del camino · {all.filter((x) => s.path[x.id]?.done).length}/{all.length} pasos hechos</div>
      {units.map((u) => {
        const up = unitProgress(s.path, u);
        return (
          <details key={u.id} className="unit unit-details card" open={u.id === curUnit}>
            <summary>
              <div className="unit-head">
                <div className="grow">
                  <h2><span className="unit-badge">{u.id}</span>{u.title}</h2>
                  <div className="muted small">{u.desc} · {u.steps.length} pasos</div>
                  <Progress value={up} max={1} thin />
                </div>
                <b>{Math.floor(up * 100)} %</b>
              </div>
            </summary>
            <div className="steps">
              {u.steps.map((st) => {
                const p = s.path[st.id];
                return (
                  <button key={st.id} className={'step' + (p?.done ? ' done' : '') + (st.id === firstOpen ? ' current' : '') + (st.type === 'boss' ? ' boss' : '')} onClick={() => go(`#/step/${encodeURIComponent(st.id)}`)} title={st.title}>
                    <span className="step-icon">{p?.done ? <Icon name="check" size={16} /> : stepIcon(st.type)}</span>
                    <span className="step-title">{st.title}</span>
                    {p && <span className={'step-best' + (p.done ? '' : ' partial')} title={p.done ? 'Completado' : 'A medias o por debajo del ' + STEP_DONE + ' %'}>{p.best}%</span>}
                    {p && !p.done && <span className="step-fill" style={{ width: `${stepValue(p) * 100}%` }} />}
                  </button>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}
