import { useState } from 'react';
import { today } from '../core/text.ts';
import { useStore, streak } from '../core/store.ts';
import { SKILLS, SKILL_NAME, LEVELS, type Skill } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { ACHIEVEMENTS, titleOf, weekXp, xpForLevel } from '../core/gamify.ts';
import { TIERS, tierOf, TAG_LABEL, topicTier, masterPct, blindHits, MASTER_TIER, PASS_TIER } from '../core/mastery.ts';
import { GAMES } from '../core/plans.ts';
import { grammarTopics } from '../core/content.ts';
import { stage } from '../core/srs.ts';
import { Card, LevelBar, MasteryBar } from '../ui/common.tsx';
import { YearHeatmap } from './DiaryPage.tsx';

const COLOR: Record<Skill, string> = { grammar: 'var(--series-1)', vocab: 'var(--series-2)', reading: 'var(--series-3)', listening: 'var(--series-4)', writing: 'var(--series-5)' };

function LevelChart() {
  const s = useStore((x) => x);
  const [hover, setHover] = useState<number | null>(null);
  const times = [...new Set(SKILLS.flatMap((k) => s.skills[k].history.map((h) => h.t)))].sort((a, b) => a - b);
  if (times.length < 2) return <div className="muted small">La gráfica aparecerá cuando tengas varias sesiones.</div>;
  const W = 640, H = 220, L = 34, R = 10, T = 10, B = 22;
  const x = (i: number) => L + (i / (times.length - 1)) * (W - L - R);
  const y = (r: number) => T + (1 - (r - 1) / 5) * (H - T - B);
  // valor de cada skill en cada instante (último conocido)
  const series = SKILLS.map((k) => {
    const h = s.skills[k].history;
    let j = -1;
    return times.map((t) => {
      while (j + 1 < h.length && h[j + 1].t <= t) j++;
      return j >= 0 ? h[j].r : null;
    });
  });
  return (
    <div className="chart">
      <div className="legend-row">
        {SKILLS.map((k) => (
          <span key={k} className="legend-item">
            <i style={{ background: COLOR[k] }} />
            {SKILL_NAME[k]}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="chart-svg" onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * W;
          setHover(Math.max(0, Math.min(times.length - 1, Math.round(((px - L) / (W - L - R)) * (times.length - 1)))));
        }}>
        {LEVELS.map((l, i) => (
          <g key={l}>
            <line x1={L} x2={W - R} y1={y(i + 1)} y2={y(i + 1)} className={'grid' + (l === 'C1' ? ' goal-line' : '')} />
            <text x={4} y={y(i + 1) + 4} className="axis">{l}</text>
          </g>
        ))}
        {series.map((pts, si) => (
          <polyline key={si} fill="none" stroke={COLOR[SKILLS[si]]} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round"
            points={pts.map((r, i) => (r === null ? '' : `${x(i)},${y(r)}`)).filter(Boolean).join(' ')} />
        ))}
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={T} y2={H - B} className="crosshair" />
            {series.map((pts, si) => pts[hover] !== null && <circle key={si} cx={x(hover)} cy={y(pts[hover]!)} r={4} fill={COLOR[SKILLS[si]]} stroke="var(--surface)" strokeWidth={2} />)}
          </g>
        )}
        <text x={L} y={H - 4} className="axis">{new Date(times[0]).toLocaleDateString('es')}</text>
        <text x={W - R} y={H - 4} className="axis" textAnchor="end">{new Date(times[times.length - 1]).toLocaleDateString('es')}</text>
      </svg>
      {hover !== null && (
        <div className="tooltip">
          <b>{new Date(times[hover]).toLocaleString('es', { dateStyle: 'short', timeStyle: 'short' })}</b>
          {SKILLS.map((k, si) => series[si][hover] !== null && (
            <div key={k}><i style={{ background: COLOR[k] }} /> {SKILL_NAME[k]}: {levelOf(series[si][hover]!).label}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StatsPage() {
  const s = useStore((x) => x);
  const t = titleOf(s.xp);
  const words = Object.entries(s.srs).filter(([id]) => id.startsWith('v:') || id.startsWith('c:'));
  const mature = words.filter(([, c]) => stage(c) === 'mature').length;
  const acc = s.totals.answers ? Math.round((s.totals.correct / s.totals.answers) * 100) : 0;
  const avg = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const topicTiers = TIERS.map((_, i) => grammarTopics.filter((g) => topicTier(s, g.id) === i).length);
  const gTopics = avg(grammarTopics.map((g) => masterPct(s.ev['t:' + g.id], blindHits(s, g.id))));
  const gSkills = avg(SKILLS.flatMap((k) => [1, 2, 3, 4, 5].map((l) => masterPct(s.ev[`sl:${k}:${l}`]))));
  const gGroups = avg(Object.keys(TAG_LABEL).filter((x) => x !== 'custom').map((x) => masterPct(s.ev['vt:' + x])));
  const gGames = avg(GAMES.map((g) => masterPct(s.ev['gm:' + g.id])));
  const gWords = Math.min(1, mature / 8000);
  const combo = [
    { name: 'Gramática', detail: `${grammarTopics.length} temas × 1.000 aciertos (100 a ciegas) · ${topicTiers[MASTER_TIER]} en Maestro`, pct: gTopics },
    { name: 'Vocabulario', detail: `8.000 palabras dominadas · llevas ${mature.toLocaleString('es')}`, pct: gWords },
    { name: 'Grupos de vocabulario', detail: '6 grupos × 1.000 aciertos', pct: gGroups },
    { name: 'Skills por nivel', detail: '5 skills × 5 niveles × 1.000 aciertos', pct: gSkills },
    { name: 'Juegos', detail: `${GAMES.length} juegos × 1.000 aciertos`, pct: gGames },
    { name: 'Maestría combinada', detail: 'la media de todo lo anterior', pct: avg([gTopics, gWords, gGroups, gSkills, gGames]) },
  ];
  return (
    <div className="page">
      <h1>Progreso</h1>
      <div className="big-stats">
        <div><b>{t.level}</b><span>{t.title}</span></div>
        <div><b>{streak(s)}</b><span>días de racha</span></div>
        <div><b>{s.totals.answers.toLocaleString('es')}</b><span>respuestas · {acc}%</span></div>
        <div><b>{mature}/{words.length}</b><span>palabras dominadas</span></div>
      </div>
      <Card>
        <div className="row between wrap">
          <h3 style={{ margin: 0 }}>Experiencia</h3>
          <span className="muted small">Nivel {t.level} · {t.title} · faltan {(t.next - s.xp).toLocaleString('es')} XP para el nivel {t.level + 1}</span>
        </div>
        <div className="xp-track big"><div style={{ width: `${t.pct}%` }} /></div>
        <div className="wheel-stats">
          <div><b>{s.xp.toLocaleString('es')}</b><span>XP total</span></div>
          <div><b>{weekXp(s).toLocaleString('es')}</b><span>XP últimos 7 días</span></div>
          <div><b>{(s.days[today()]?.xp ?? 0).toLocaleString('es')}</b><span>XP hoy</span></div>
          <div><b>×{(1 + Math.min(0.5, streak(s) * 0.02)).toLocaleString('es', { maximumFractionDigits: 2 })}</b><span>por tu racha de días</span></div>
          <div><b>{xpForLevel(t.level + 9).toLocaleString('es')}</b><span>XP para el nivel {t.level + 10}</span></div>
        </div>
        <p className="muted small" style={{ marginBottom: 0 }}>
          El XP premia lo que cuesta: base por nivel de la pregunta (10–18) · respuesta <b>escrita ×1,25</b> · <b>a ciegas en la Rueda ×2</b> · <b>examen ×1,5</b> · racha de aciertos hasta ×1,5 · días seguidos hasta ×1,5 (+2 % por día). Los multiplicadores se combinan. Los niveles no tienen tope.
        </p>
      </Card>
      <Card>
        <h3>Camino a Maestro</h3>
        <p className="muted small">Todo lo que se puede dominar, junto. Una unidad es Maestra con 1.000 aciertos en 30+ días distintos; el vocabulario, palabra a palabra, con cada una acertada en 5+ días y aguantando 2 meses.</p>
        <div className="master-rows">
          {combo.map((c) => (
            <div key={c.name} className="master-row">
              <span className="grow"><b>{c.name}</b> <span className="muted small">{c.detail}</span></span>
              <div className="mastery-track"><div style={{ width: `${Math.max(c.pct > 0 ? 1 : 0, c.pct * 100)}%` }} /></div>
              <span className="master-pct">{c.pct > 0 && c.pct < 0.001 ? '<0,1' : (c.pct * 100).toLocaleString('es', { maximumFractionDigits: 1 })} %</span>
            </div>
          ))}
        </div>
        <div className="ladder">
          {TIERS.map((r, i) => (
            <div key={r.name}><b>{r.icon} {topicTiers[i]}</b>{r.name}</div>
          ))}
        </div>
        <p className="muted small" style={{ marginBottom: 0 }}>Temas de gramática en cada nivel de maestría. Aprobados: {topicTiers.slice(PASS_TIER).reduce((a, b) => a + b, 0)} de {grammarTopics.length}.</p>
      </Card>
      <Card>
        <h3>Maestría</h3>
        <p className="muted small">
          Evaluación continua: cada nivel pide aciertos <b>y</b> días distintos (✅ Aprobado 10 en 2 días · 🥉 Bronce 100 en 7 · 🥈 Plata 300 en 14 · 🥇 Oro 600 en 21 · 👑 Maestro 1.000 en 30). Aprobar es el principio; Maestro son mil ejercicios acertados de cada parte. Cada día cuentan como máximo 150 aciertos por skill: repetir mucho un solo día no sustituye volver otro día.
        </p>
        <div className="mastery-grid">
          <MasteryBar ev={s.ev.all} label="Inglés en general" />
          {SKILLS.map((k) => (
            <MasteryBar key={k} ev={s.ev['sk:' + k]} label={SKILL_NAME[k]} />
          ))}
        </div>
      </Card>
      <Card>
        <h3>Maestría de todo</h3>
        <p className="muted small">Cada cosa que practicas tiene su propia maestría, con las mismas reglas (aciertos en días distintos). ○ = aún sin aprobar.</p>
        <h4>Cada skill en cada nivel</h4>
        <div className="table-wrap">
          <table className="tier-table">
            <thead>
              <tr><th />{LEVELS.slice(0, 5).map((l) => <th key={l}>{l}</th>)}</tr>
            </thead>
            <tbody>
              {SKILLS.map((k) => (
                <tr key={k}>
                  <th>{SKILL_NAME[k]}</th>
                  {LEVELS.slice(0, 5).map((l, i) => {
                    const e = s.ev[`sl:${k}:${i + 1}`];
                    const t = tierOf(e);
                    return (
                      <td key={l} className={'tc t' + t} title={`${SKILL_NAME[k]} ${l}: ${TIERS[t].name}${e ? ` · ${e.h} aciertos en ${e.d} días` : ''}`}>
                        <span>{TIERS[t].icon}</span>
                        <small>{e ? e.h : ''}</small>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4>Grupos de vocabulario</h4>
        <div className="mastery-grid">
          {Object.keys(TAG_LABEL).filter((t) => t !== 'custom' || s.ev['vt:custom']).map((t) => (
            <MasteryBar key={t} ev={s.ev['vt:' + t]} label={TAG_LABEL[t]} compact />
          ))}
        </div>
        <h4>Juegos</h4>
        <div className="rank-grid">
          {GAMES.map((g) => {
            const e = s.ev['gm:' + g.id];
            const r = TIERS[tierOf(e)];
            return (
              <a key={g.id} href="#/games" className={'rank-cell' + (e ? '' : ' empty')} title={`${g.name}: ${r.name}${e ? ` · ${e.h} aciertos en ${e.d} días` : ''}`}>
                <span>{r.icon}</span>
                <span className="small">{g.icon} {g.name}</span>
              </a>
            );
          })}
        </div>
      </Card>
      <Card>
        <h3>Nivel por skill</h3>
        {SKILLS.map((k) => (
          <div key={k} className="skill-row">
            <div className="skill-name">{SKILL_NAME[k]}</div>
            <LevelBar r={s.skills[k].r} compact />
            <span className="muted small">{s.skills[k].n} resp.</span>
          </div>
        ))}
        <LevelChart />
      </Card>
      <Card>
        <div className="row between"><h3>Actividad (6 meses)</h3><a className="small" href="#/diary">Ver el diario completo →</a></div>
        <YearHeatmap metric="n" weeks={26} big={false} onSelect={() => (window.location.hash = '#/diary')} />
      </Card>
      <Card>
        <h3>Maestría por tema de gramática</h3>
        <p className="muted small">Por tema cuentan como máximo 25 aciertos al día. De Bronce en adelante hacen falta además aciertos <b>a ciegas</b> en <a href="#/rueda">la Rueda</a> (5 · 20 · 50 · 100).</p>
        <div className="rank-grid">
          {grammarTopics.map((g) => {
            const e = s.ev['t:' + g.id];
            const r = TIERS[topicTier(s, g.id)];
            return (
              <a key={g.id} href={`#/grammar/${g.id}`} className={'rank-cell' + (e ? '' : ' empty')} title={`${g.title}: ${r.name}${e ? ` · ${e.h} aciertos en ${e.d} días` : ''}`}>
                <span>{r.icon}</span>
                <span className="small">{g.title}</span>
              </a>
            );
          })}
        </div>
      </Card>
      <Card>
        <h3>Logros ({Object.keys(s.achievements).length}/{ACHIEVEMENTS.length})</h3>
        <div className="ach-grid">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.id} className={'ach' + (s.achievements[a.id] ? ' got' : '')} title={a.desc}>
              <span className="ach-icon">{a.icon}</span>
              <b>{a.name}</b>
              <span className="muted small">{a.desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
