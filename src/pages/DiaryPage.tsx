/* Diario: qué hiciste cada día, cuánto repasaste y cuánto avanzaste. Heatmap grande de un año. */
import { useEffect, useRef, useState } from 'react';
import { useStore, streak, type DayStat } from '../core/store.ts';
import { SKILLS, SKILL_NAME, type Skill } from '../core/types.ts';
import { topicById } from '../core/content.ts';
import { today } from '../core/text.ts';
import { Card } from '../ui/common.tsx';

type Metric = 'n' | 'reviews' | 'minutes' | 'xp';
const METRIC: Record<Metric, { name: string; steps: number[] }> = {
  n: { name: 'Respuestas', steps: [1, 20, 60, 120] },
  reviews: { name: 'Repasos', steps: [1, 10, 25, 50] },
  minutes: { name: 'Minutos', steps: [1, 10, 25, 45] },
  xp: { name: 'XP', steps: [1, 150, 400, 800] },
};
const COLOR: Record<Skill, string> = { grammar: 'var(--series-1)', vocab: 'var(--series-2)', reading: 'var(--series-3)', listening: 'var(--series-4)', writing: 'var(--series-5)' };
const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const val = (d: DayStat | undefined, m: Metric) => (d ? (m === 'n' ? d.n - d.reviews : d[m] ?? 0) : 0);
const fmtDay = (k: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }) => new Date(k + 'T12:00:00').toLocaleDateString('es', opts);

export function YearHeatmap({ metric, selected, onSelect, weeks = 53, big = true }: { metric: Metric; selected?: string; onSelect?: (k: string) => void; weeks?: number; big?: boolean }) {
  const days = useStore((s) => s.days);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (wrap.current) wrap.current.scrollLeft = wrap.current.scrollWidth;
  }, []);
  const steps = METRIC[metric].steps;
  const start = new Date();
  start.setHours(12);
  const dow = (start.getDay() + 6) % 7; // lunes = 0
  start.setDate(start.getDate() - dow - 7 * (weeks - 1));
  const todayK = today();
  const cells: JSX.Element[] = [];
  const months: JSX.Element[] = [];
  const d = new Date(start);
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const m = d.getMonth();
    months.push(<span key={w}>{m !== lastMonth && d.getDate() <= 7 ? d.toLocaleDateString('es', { month: 'short' }) : ''}</span>);
    if (d.getDate() <= 7) lastMonth = m;
    for (let i = 0; i < 7; i++) {
      const k = key(d);
      const future = k > todayK;
      const v = val(days[k], metric);
      const lvl = v <= 0 ? 0 : steps.filter((s) => v >= s).length;
      cells.push(
        future ? (
          <span key={k} className="heat empty" />
        ) : (
          <button
            key={k}
            className={`heat h${lvl}` + (k === todayK ? ' today' : '') + (k === selected ? ' sel' : '')}
            title={`${fmtDay(k)}: ${v} ${METRIC[metric].name.toLowerCase()}`}
            onClick={() => onSelect?.(k)}
          />
        ),
      );
      d.setDate(d.getDate() + 1);
    }
  }
  return (
    <div className="heatmap-wrap" ref={wrap}>
      <div className={'heat-months' + (big ? ' big' : '')}>{months}</div>
      <div className={'heatmap' + (big ? ' big' : '')}>{cells}</div>
    </div>
  );
}

function bestStreak(days: Record<string, DayStat>) {
  const ks = Object.keys(days).filter((k) => days[k].n > 0).sort();
  let best = 0,
    cur = 0,
    prev: Date | null = null;
  for (const k of ks) {
    const d = new Date(k + 'T12:00:00');
    cur = prev && Math.round((d.getTime() - prev.getTime()) / 864e5) === 1 ? cur + 1 : 1;
    best = Math.max(best, cur);
    prev = d;
  }
  return best;
}

function DayDetail({ k, d }: { k: string; d?: DayStat }) {
  if (!d || !d.n) return <Card><h3>{fmtDay(k, { weekday: 'long', day: 'numeric', month: 'long' })}</h3><div className="muted">Día de descanso. También forman parte del camino.</div></Card>;
  const acc = d.n ? Math.round((d.c / d.n) * 100) : 0;
  const total = SKILLS.reduce((a, s) => a + (d[s] || 0), 0) || 1;
  const deltas = SKILLS.map((s) => ({ s, v: (d.r1?.[s] ?? 0) - (d.r0?.[s] ?? 0) })).filter((x) => Math.abs(x.v) > 0.004);
  return (
    <Card>
      <h3>{fmtDay(k, { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
      <div className="kpis">
        <div className="kpi"><b>{d.n - d.reviews}</b><span>respuestas nuevas</span></div>
        <div className="kpi"><b>{d.reviews}</b><span>repasos</span></div>
        <div className="kpi"><b>{d.learned}</b><span>palabras nuevas</span></div>
        <div className="kpi"><b>{acc} %</b><span>aciertos</span></div>
        <div className="kpi"><b>{d.minutes || '—'}</b><span>minutos</span></div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 6 }}>En qué lo dedicaste</div>
      <div className="stackbar">
        {SKILLS.filter((s) => d[s]).map((s) => (
          <i key={s} style={{ width: `${(d[s] / total) * 100}%`, background: COLOR[s] }} title={`${SKILL_NAME[s]}: ${d[s]}`} />
        ))}
      </div>
      <div className="legend-row" style={{ marginTop: 6 }}>
        {SKILLS.filter((s) => d[s]).map((s) => (
          <span key={s} className="legend-item"><i style={{ background: COLOR[s] }} />{SKILL_NAME[s]} {d[s]}</span>
        ))}
      </div>
      <div className="eyebrow" style={{ margin: '14px 0 6px' }}>Cuánto avanzaste</div>
      {deltas.length ? (
        deltas.map(({ s, v }) => (
          <div key={s} className="row between small" style={{ padding: '3px 0' }}>
            <span>{SKILL_NAME[s]}</span>
            <span className={'delta ' + (v >= 0 ? 'up' : 'down')}>{v >= 0 ? '▲' : '▼'} {Math.abs(Math.round(v * 100))} pts de nivel</span>
          </div>
        ))
      ) : (
        <div className="muted small">Sin cambios de nivel registrados ese día.</div>
      )}
      {(d.texts > 0 || d.essays > 0) && <div className="small" style={{ marginTop: 8 }}>{d.texts ? `📖 ${d.texts} lectura(s) ` : ''}{d.essays ? `✍️ ${d.essays} texto(s) escrito(s)` : ''}</div>}
      {d.topics && d.topics.length > 0 && (
        <>
          <div className="eyebrow" style={{ margin: '14px 0 6px' }}>Temas de gramática tocados</div>
          <div className="chips">
            {d.topics.map((t) => topicById.get(t) && <a key={t} className="tag grey" href={`#/grammar/${t}`}>{topicById.get(t)!.title}</a>)}
          </div>
        </>
      )}
    </Card>
  );
}

export default function DiaryPage() {
  const s = useStore((x) => x);
  const [metric, setMetric] = useState<Metric>('n');
  const [sel, setSel] = useState(today());
  const active = Object.entries(s.days).filter(([, d]) => d.n > 0).sort((a, b) => b[0].localeCompare(a[0]));
  const totalReviews = active.reduce((a, [, d]) => a + d.reviews, 0);
  const avg = active.length ? Math.round(active.reduce((a, [, d]) => a + d.n, 0) / active.length) : 0;
  return (
    <div className="page">
      <h1>Diario</h1>
      <p className="lede">Cada día que practicas, aunque sea poco, queda aquí. Mira cuánto avanzas y, sobre todo, cuánto repasas: el repaso es lo que convierte lo que ves en lo que sabes.</p>
      <div className="kpis">
        <div className="kpi"><b>{streak(s)}</b><span>días de racha</span></div>
        <div className="kpi"><b>{bestStreak(s.days)}</b><span>mejor racha</span></div>
        <div className="kpi"><b>{active.length}</b><span>días con práctica</span></div>
        <div className="kpi"><b>{totalReviews.toLocaleString('es')}</b><span>repasos en total</span></div>
        <div className="kpi"><b>{avg}</b><span>respuestas por día activo</span></div>
      </div>
      <Card>
        <div className="row between wrap" style={{ gap: 10, marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>Tu año</h3>
          <div className="seg">
            {(Object.keys(METRIC) as Metric[]).map((m) => (
              <button key={m} className={metric === m ? 'on' : ''} onClick={() => setMetric(m)}>{METRIC[m].name}</button>
            ))}
          </div>
        </div>
        <YearHeatmap metric={metric} selected={sel} onSelect={setSel} />
        <div className="row between wrap small" style={{ marginTop: 8, gap: 8 }}>
          <span className="muted">Toca un día para ver el detalle.</span>
          <span className="heat-legend">
            Menos <i style={{ background: 'var(--heat-0)' }} /><i style={{ background: 'var(--heat-1)' }} /><i style={{ background: 'var(--heat-2)' }} /><i style={{ background: 'var(--heat-3)' }} /><i style={{ background: 'var(--heat-4)' }} /> Más
          </span>
        </div>
      </Card>
      <DayDetail k={sel} d={s.days[sel]} />
      <div className="section-title"><h2>Últimos días</h2></div>
      {active.length === 0 && <div className="muted">Todavía no hay días registrados.</div>}
      <div className="day-list">
        {active.slice(0, 21).map(([k, d]) => {
          const tot = SKILLS.reduce((a, x) => a + (d[x] || 0), 0) || 1;
          const up = SKILLS.reduce((a, x) => a + Math.max(0, (d.r1?.[x] ?? 0) - (d.r0?.[x] ?? 0)), 0);
          return (
            <div key={k} className={'day-row' + (k === sel ? ' sel' : '')} onClick={() => (setSel(k), window.scrollTo({ top: 0, behavior: 'smooth' }))}>
              <div className="d-date">{fmtDay(k)}<small>{d.n - d.reviews} nuevas · {d.reviews} repasos</small></div>
              <div className="stackbar">
                {SKILLS.filter((x) => d[x]).map((x) => <i key={x} style={{ width: `${(d[x] / tot) * 100}%`, background: COLOR[x] }} />)}
              </div>
              <span className={'delta ' + (up > 0.004 ? 'up' : '')}>{up > 0.004 ? `▲ ${Math.round(up * 100)}` : '—'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
