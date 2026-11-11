import { useSyncExternalStore } from 'react';
import { useStore, streak, todayLoad } from '../core/store.ts';
import { SKILLS, SKILL_NAME } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { titleOf, missionsFor } from '../core/gamify.ts';
import { wheelStatus } from '../core/wheel.ts';
import { buildPath, allSteps, unitProgress, stepIcon, pendingFails } from '../core/plans.ts';
import { update } from '../core/store.ts';
import { totalProgress, vocabStats } from '../core/curriculum.ts';
import { neuralStatus, subscribeNeural } from '../core/speech.ts';
import { Card, LevelBar, Progress, StageBar, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';
import { today } from '../core/text.ts';

const SKILL_ICO: Record<string, string> = { grammar: 'grammar', vocab: 'vocab', reading: 'reading', listening: 'listening', writing: 'writing' };
const ADVICE: Record<string, string> = {
  grammar: 'Lo que más te frena ahora es la gramática. Un rato de Flujo de Grammar o un paso del Camino al día lo arregla: cada fallo te enseña la regla con su tabla.',
  vocab: 'Te falta vocabulario. Unas pocas palabras nuevas al día y el repaso espaciado hacen el resto.',
  reading: 'Lee un poco cada día: un texto de tu nivel o un artículo real en el Lector.',
  listening: 'Entrena el oído con dictados cortos: primero en lento y luego a velocidad normal.',
  writing: 'Escribe: corrige errores típicos y, de vez en cuando, un texto libre con el analizador.',
};
const greeting = () => {
  const h = new Date().getHours();
  return h < 6 ? 'Buenas noches' : h < 13 ? 'Buenos días' : h < 21 ? 'Buenas tardes' : 'Buenas noches';
};

export default function Home() {
  const s = useStore((x) => x);
  const voice = useSyncExternalStore(subscribeNeural, neuralStatus);
  const t = titleOf(s.xp);
  const st = streak(s);
  const due = Object.values(s.srs).filter((c) => c.due <= Date.now()).length;
  const placed = SKILLS.filter((k) => s.skills[k].placed);
  const weakest = [...SKILLS].sort((a, b) => s.skills[a].r - s.skills[b].r)[0];
  const d = s.days[today()];
  const load = todayLoad(s);
  const max = s.settings.dailyMax;
  const atCap = load >= max;
  const units = buildPath();
  const unit = units.find((u) => unitProgress(s.path, u) < 0.999) ?? units[units.length - 1];
  const next = allSteps().find((x) => !s.path[x.id]?.done);
  const total = totalProgress(s);
  const vs = vocabStats(s);
  const deltas = SKILLS.map((k) => ({ k, d: (d?.r1?.[k] ?? 0) - (d?.r0?.[k] ?? 0) })).filter((x) => Math.abs(x.d) > 0.004);
  const ideas = missionsFor(s);
  const fails = pendingFails(s).length;
  const first = allSteps()[0];
  const wh = wheelStatus(s);

  return (
    <div className="page">
      <header className="hello">
        <div>
          <div className="eyebrow">{new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
          <h1>{greeting()}.</h1>
          <div className="xp-line" title="Cada respuesta acertada da XP; con XP subes de nivel y de título">
            <span className="xp-level">Nv {t.level}</span>
            <span className="muted">{t.title}</span>
            <div className="xp-track"><div style={{ width: `${t.pct}%` }} /></div>
            <span className="muted tiny">{s.xp.toLocaleString('es')} / {t.next.toLocaleString('es')} XP</span>
          </div>
        </div>
        <div className="stat-chips">
          <div className="stat-chip warm" title="Días seguidos con algo de práctica">
            <Icon name="flame" />
            <div><b>{st}</b><span> {st === 1 ? 'día' : 'días'}<br />de racha</span></div>
          </div>
          <div className="stat-chip" title="Dominio real de todo el recorrido (demostrado en días distintos)">
            <Icon name="target" />
            <div><b>{total > 0 && total < 0.01 ? '<1' : Math.floor(total * 100)} %</b><span><br />dominado</span></div>
          </div>
        </div>
      </header>

      {placed.length < 5 && !s.settings.zero && (
        <Card className="cta">
          <div>
            <b>¿Por dónde empezamos?</b>
            <div className="muted small">Si no sabes nada de inglés, empieza desde cero: el Camino te lleva paso a paso, primero la regla y luego a practicarla. Si ya sabes algo, una prueba corta por skill ajusta la dificultad.</div>
          </div>
          <div className="row gap wrap">
            <button className="btn primary" onClick={() => (update((x) => void (x.settings.zero = true)), go(`#/step/${encodeURIComponent(first.id)}`))}>Empiezo de cero</button>
            <button className="btn" onClick={() => go('#/placement')}>Ya sé algo: prueba de nivel</button>
          </div>
        </Card>
      )}

      <div className="today">
        <div className="today-main">
          {atCap ? (
            <div className="start-card" onClick={() => due && go('#/review')} style={{ cursor: due ? 'pointer' : 'default' }}>
              <b>Por hoy, suficiente 🌙</b>
              <span>Has llegado a tu máximo de {max} respuestas. Lo aprendido se asienta descansando. {due ? 'Si te apetece, el repaso sigue abierto.' : 'Mañana más.'}</span>
              {due > 0 && <span className="go">Repasar {due} <Icon name="arrow" size={18} /></span>}
            </div>
          ) : (
            <button className="start-card" onClick={() => go('#/flow')}>
              <b>{load ? 'Seguir donde lo dejaste' : 'Empezar un rato'}</b>
              <span>Flujo adaptado a ti: mezcla lo que más te cuesta con repaso. Para cuando quieras; lo que hagas, cuenta.</span>
              <span className="go">
                Empezar <Icon name="arrow" size={18} />
              </span>
            </button>
          )}
          <div className="quick-row">
            <button className="quick wheel" onClick={() => go(wh.ready ? '#/wheel' : '#/rueda')}>
              <span className="q-icon"><Icon name="wheel" /></span>
              <span>
                <b>La Rueda {wh.ready && <span className="pill">XP ×2</span>}</b>
                <small>{wh.ready ? `A ciegas: ${wh.pool.length} temas aprobados giran sin decirte cuál es. Vuelta ${wh.laps + 1} · ${wh.seen}/${wh.pool.length}.` : 'Aprueba 3 temas y empezarán a volver sin avisar de qué tema son.'}</small>
              </span>
            </button>
            <button className="quick warm" onClick={() => go('#/repaso')}>
              <span className="q-icon"><Icon name="repeat" /></span>
              <span>
                <b>Repaso {due + fails > 0 && <span className="pill">{due + fails}</span>}</b>
                <small>{fails ? `${fails} ${fails === 1 ? 'fallo' : 'fallos'} por corregir${due ? ` · ${due} repasos` : ''}` : due ? 'Repasar es lo que hace que no se olvide.' : 'Nada pendiente. ¡Al día!'}</small>
              </span>
            </button>
            <button className="quick" onClick={() => go(next ? `#/step/${encodeURIComponent(next.id)}` : '#/path')}>
              <span className="q-icon"><Icon name="path" /></span>
              <span>
                <b>Siguiente paso</b>
                <small>{next ? `${stepIcon(next.type)} ${next.title}` : 'Camino completado 🎉'}</small>
              </span>
            </button>
            <button className="quick" onClick={() => go('#/games')}>
              <span className="q-icon"><Icon name="games" /></span>
              <span>
                <b>Algo rápido</b>
                <small>Juegos de 1 minuto para días flojos.</small>
              </span>
            </button>
            <button className="quick" onClick={() => go('#/lector')}>
              <span className="q-icon"><Icon name="lector" /></span>
              <span>
                <b>Leer algo real</b>
                <small>Pega un artículo y te ayuda con lo que no sepas.</small>
              </span>
            </button>
          </div>
        </div>

        <Card className="day-card">
          <h3>
            Hoy <a className="small" href="#/diary">Diario →</a>
          </h3>
          <div className="day-nums">
            <div><b>{load}</b><span>respuestas</span></div>
            <div><b>{d?.reviews ?? 0}</b><span>repasos</span></div>
            <div><b>{d?.learned ?? 0}</b><span>palabras nuevas</span></div>
          </div>
          <a className="words-goal small" href="#/vocab">
            <span className="row between"><span>Palabras dominadas</span><b>{vs.n.mature.toLocaleString('es')} / 8.000</b></span>
            <StageBar n={vs.n} total={8000} thin />
            <span className="muted tiny">{vs.started.toLocaleString('es')} en marcha · dominada = acertada en 5+ días y aguanta 2 meses</span>
          </a>
          {deltas.length ? (
            deltas.map(({ k, d: dv }) => (
              <div key={k} className="row between small">
                <span>{SKILL_NAME[k]}</span>
                <span className={'delta ' + (dv >= 0 ? 'up' : 'down')}>{dv >= 0 ? '▲' : '▼'} {Math.abs(Math.round(dv * 100))} pts</span>
              </div>
            ))
          ) : (
            <div className="muted small">Aún no has practicado hoy. No pasa nada: aquí verás cuánto avanzas.</div>
          )}
          <Progress value={load} max={max} thin />
          <div className="cap-note">Sin mínimo. Máximo del día: {max} respuestas (los repasos no cuentan).</div>
        </Card>
      </div>

      {voice.state !== 'ready' && s.settings.engine === 'neural' && (
        <Card className="cta">
          <div>
            <b>Activa la voz natural</b>
            <div className="muted small">La voz del sistema suena robótica. La voz neuronal (~60 MB, una sola vez) funciona sin servidor y suena humana.</div>
          </div>
          <button className="btn" onClick={() => go('#/settings')}>
            {voice.state === 'loading' ? `Descargando ${voice.progress} %` : 'Activar'}
          </button>
        </Card>
      )}

      <div className="grid2" style={{ marginTop: 14 }}>
        <Card>
          <div className="row between">
            <h3>Tu nivel por skill</h3>
            <a className="small" href="#/stats">Detalle →</a>
          </div>
          {SKILLS.map((k) => (
            <div key={k} className="skill-row clickable" onClick={() => go(`#/flow/${k}`)} title={`Practicar ${SKILL_NAME[k]}`}>
              <div className="skill-name">
                <Icon name={SKILL_ICO[k]} size={17} /> {SKILL_NAME[k]}
              </div>
              <LevelBar r={s.skills[k].r} compact />
            </div>
          ))}
          <div className="advice">{ADVICE[weakest]}</div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card className="clickable" onClick={() => go('#/path')}>
            <div className="eyebrow">Tramo actual · {unit.id}</div>
            <h3 style={{ marginTop: 4 }}>{unit.title}</h3>
            <div className="muted small">{unit.desc}</div>
            <Progress value={unitProgress(s.path, unit)} max={1} />
            <div className="small muted">{Math.round(unitProgress(s.path, unit) * 100)} % del tramo · lo hecho a medias también cuenta</div>
          </Card>
          <Card>
            <h3>Ideas para hoy <span className="muted small">(opcionales)</span></h3>
            {ideas.map((m) => (
              <div key={m.key} className="mission">
                <div className="row between small">
                  <span>{m.done ? '✓ ' : ''}{m.text}</span>
                  <span className="muted">{m.progress}/{m.goal}</span>
                </div>
                <Progress value={m.progress} max={m.goal} thin />
              </div>
            ))}
          </Card>
        </div>
      </div>
      <div className="muted small center" style={{ marginTop: 18 }}>
        Media actual: {levelOf(SKILLS.reduce((a, k) => a + s.skills[k].r, 0) / 5).label} · {s.xp.toLocaleString('es')} XP
      </div>
    </div>
  );
}
