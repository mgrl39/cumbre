import { useStore } from '../core/store.ts';
import { itemsByTopic, topicById } from '../core/content.ts';
import { CAT_ICON, CAT_NAME, LEVELS } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { SUBLEVELS, categoriesOf, topicsOf, topicMastery, levelProgress, subProgress, subOfTopic, subById } from '../core/curriculum.ts';
import { Card, LevelBar, Md, Progress, MasteryBar, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';
import type { State } from '../core/store.ts';
import { modesFor, gamesBeaten, scopeTitle, scopeTopics, examSize, EXAM_PASS, GGROUP_NAME, type GGroup } from '../core/grammarGames.ts';
import { pendingFails } from '../core/plans.ts';
import { TIERS, topicTier } from '../core/mastery.ts';

/** Juegos + examen + fallos de un ámbito (tema, categoría, tramo o nivel). */
function GamePanel({ scope, s }: { scope: string; s: State }) {
  const modes = modesFor(scope, s);
  const beaten = gamesBeaten(scope, s);
  const exam = s.exams[scope];
  const nExam = examSize(scope);
  const ids = scopeTopics(scope).map((t) => t.id);
  const fails = pendingFails(s, { topics: ids }, true).length;
  const failsToday = pendingFails(s, { topics: ids }).length;
  return (
    <>
      <div className="section-title">
        <h2>Juega</h2>
        <span className="muted small">{beaten.done} de {beaten.total} juegos superados (ronda completa con 80 % o más). Todo suma a la maestría.</span>
      </div>
      {(Object.keys(GGROUP_NAME) as GGroup[]).map((g) => {
        const ms = modes.filter((m) => m.def.group === g);
        if (!ms.length) return null;
        return (
          <div key={g}>
            <div className="gg-group"><b>{GGROUP_NAME[g].name}</b> <span className="muted small">{GGROUP_NAME[g].desc}</span></div>
            <div className="gg-grid">
              {ms.map((m) => {
                const ok = m.def.score === 'pct' && (m.record ?? 0) >= 80;
                return (
                  <button key={m.def.id} className={'gg' + (ok ? ' done' : '')} onClick={() => go(`#/gg/${scope}/${m.def.id}`)}>
                    <span className="gg-icon">{m.def.icon}</span>
                    <span className="gg-body">
                      <b>{m.def.name}</b>
                      <small>{m.def.desc}</small>
                      <span className="gg-meta">
                        {m.n ? `${m.n} preguntas` : m.def.duration ? `${m.def.duration} s` : 'sin fin'}
                        {m.record !== undefined && <i>{m.def.score === 'pct' ? `${ok ? '✓' : 'mejor'} ${m.record} %` : `🏆 ${m.record}`}</i>}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="section-title">
        <h2>Demuestra</h2>
        <span className="muted small">Sin pistas ni corrección hasta el final.</span>
      </div>
      <div className="gg-grid two">
        <button className={'gg exam' + (exam && exam.best >= EXAM_PASS ? ' done' : '')} onClick={() => go(`#/gx/${scope}`)} disabled={nExam < 4}>
          <span className="gg-icon">📝</span>
          <span className="gg-body">
            <b>Examen</b>
            <small>{nExam} preguntas mezcladas, con tiempo. Se aprueba con {EXAM_PASS} %.</small>
            <span className="gg-meta">
              {exam ? `${exam.n} ${exam.n === 1 ? 'intento' : 'intentos'} · último ${exam.last} %` : 'sin hacer'}
              {exam && <i>{exam.best >= EXAM_PASS ? '✓' : 'mejor'} {exam.best} %</i>}
            </span>
          </span>
        </button>
        <button className="gg" onClick={() => go(`#/fails/${scope}`)} disabled={!failsToday}>
          <span className="gg-icon">🔁</span>
          <span className="gg-body">
            <b>Mis fallos aquí</b>
            <small>{fails ? 'Solo lo que has fallado en esta sección, hasta que lo aciertes en 2 días distintos.' : 'No tienes fallos apuntados en esta sección.'}</small>
            <span className="gg-meta">{fails ? `${failsToday} para hoy · ${fails} apuntados` : '—'}</span>
          </span>
        </button>
      </div>
    </>
  );
}

/** Errores típicos del tema, sacados de sus propios ejercicios. */
function Mistakes({ topicId }: { topicId: string }) {
  const errs = (itemsByTopic.get(topicId) || []).filter((i) => i.type === 'error').slice(0, 6);
  if (!errs.length) return null;
  return (
    <Card>
      <h3>Errores típicos</h3>
      {errs.map((e) => (
        <div key={e.id} className="mistake">
          <span className="bad">✗ {e.prompt}</span>
          <span className="ok">✓ {e.answers[0]}</span>
          {e.note && <span className="muted small">{e.note}</span>}
        </div>
      ))}
    </Card>
  );
}

export function GrammarScopePage({ scope }: { scope: string }) {
  const s = useStore((x) => x);
  const topics = scopeTopics(scope);
  if (!topics.length) return <div className="page">Sección no encontrada</div>;
  return (
    <div className="page">
      <a href="#/grammar" className="back"><Icon name="back" size={16} /> Grammar</a>
      <div className="eyebrow">Juegos de la sección</div>
      <h1>{scopeTitle(scope)}</h1>
      <p className="lede">Los juegos mezclan los {topics.length} temas de esta sección. Cada acierto cuenta para la maestría de su tema.</p>
      <div className="chips">
        {topics.map((t) => (
          <a key={t.id} className="chip" href={`#/grammar/${t.id}`}>{TIERS[topicTier(s, t.id)].icon} {t.title}</a>
        ))}
      </div>
      <GamePanel scope={scope} s={s} />
    </div>
  );
}

function Ring({ pct, size = 34 }: { pct: number; size?: number }) {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;
  return (
    <span className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-bg" fill="none" strokeWidth={4} />
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-fg" fill="none" strokeWidth={4} strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} />
      </svg>
      {size >= 40 && <b>{Math.round(pct * 100)}</b>}
    </span>
  );
}

export default function GrammarPage({ topicId }: { topicId?: string }) {
  const s = useStore((x) => x);
  if (topicId) {
    const t = topicById.get(topicId);
    if (!t) return <div className="page">Tema no encontrado</div>;
    const st = s.topics[t.id];
    const items = itemsByTopic.get(t.id) || [];
    const m = topicMastery(s, t.id);
    const sub = subById.get(subOfTopic(t));
    return (
      <div className="page topic-page">
        <a href="#/grammar" className="back"><Icon name="back" size={16} /> Grammar</a>
        <div className="eyebrow">{sub?.id} · {sub?.title}{t.cat ? ` · ${CAT_NAME[t.cat]}` : ''}</div>
        <h1>{t.title}</h1>
        <div className="rule-line">{t.rule}</div>
        <div className="row gap" style={{ alignItems: 'center' }}>
          <Ring pct={m} size={44} />
          <div className="small">
            <b>Dominio {Math.round(m * 100)} %</b>
            <div className="muted">
              {st ? `${st.c}/${st.s} aciertos en total` : 'Aún sin practicar.'} · El dominio llega al 100 % con 100 aciertos en 7+ días distintos, acertando ≥ 80 %. Maestro son 1.000, con 100 a ciegas en la Rueda.
            </div>
          </div>
        </div>
        <Card>
          <MasteryBar ev={s.ev['t:' + t.id]} blind={s.ev['w:' + t.id]?.h ?? 0} label="Maestría del tema" />
        </Card>
        <div className="section-title">
          <h2>Aprende</h2>
          <span className="muted small">Primero la regla; luego, a jugar.</span>
        </div>
        {t.table && (
          <Card>
            <h3>Tabla</h3>
            <Md text={t.table} />
          </Card>
        )}
        <Card>
          <h3>Explicación</h3>
          <Md text={t.es} />
        </Card>
        <Mistakes topicId={t.id} />
        <button className="btn primary wide" onClick={() => go(`#/topic/${t.id}`)}>
          Práctica guiada: todas las preguntas del tema ({items.length * 2})
        </button>
        <GamePanel scope={'t:' + t.id} s={s} />
      </div>
    );
  }

  const r = s.skills.grammar.r;
  const curLevel = levelOf(r).level;
  return (
    <div className="page">
      <h1>Grammar</h1>
      <LevelBar r={r} />
      <p className="lede">
        Tu nivel: <b>{levelOf(r).label}</b>. La gramática está organizada como un árbol: <b>nivel → tramo → tipo → tema</b>. Cada tema tiene su tabla, su explicación, sus errores típicos, <b>sus juegos</b> y su examen. Y cada nivel, tramo y tipo tiene también los suyos (botón «Juegos»): mezclan todos sus temas.
      </p>
      <div className="row gap">
        <button className="btn primary" onClick={() => go('#/flow/grammar')}><Icon name="play" size={16} /> Flujo de Grammar</button>
        <button className="btn" onClick={() => go('#/game/temas')}><Icon name="target" size={16} /> Mis puntos débiles</button>
      </div>
      {LEVELS.slice(0, 5).map((l) => {
        const lp = levelProgress(s, l);
        const subs = SUBLEVELS.filter((x) => x.level === l);
        const nTopics = subs.reduce((a, x) => a + topicsOf(x.id).length, 0);
        return (
          <details key={l} className="tree-level" open={l === curLevel}>
            <summary>
              <Icon name="chevron" className="chev" />
              <span className="lv">{l}</span>
              <span className="grow">
                <div className="small muted">{nTopics} temas · {subs.map((x) => x.title).join(' · ')}</div>
                <Progress value={lp} max={1} thin />
              </span>
              <b className="small">{Math.round(lp * 100)} %</b>
              <button className="play-link" title={`Juegos y examen de toda la gramática ${l}`} onClick={(e) => (e.preventDefault(), go(`#/grammar/play/l:${l}`))}><Icon name="games" size={13} /> Juegos</button>
            </summary>
            <div className="tree-body">
              {subs.map((sl) => {
                const sp = subProgress(s, sl.id);
                return (
                  <details key={sl.id} className="tree-sub" open>
                    <summary>
                      <Icon name="chevron" size={16} className="chev" />
                      <Ring pct={sp.grammar} size={22} />
                      <b>{sl.id} · {sl.title}</b>
                      <span className="muted small grow">{sl.desc}</span>
                      <button className="play-link" title={`Juegos y examen del tramo ${sl.id}`} onClick={(e) => (e.preventDefault(), go(`#/grammar/play/s:${sl.id}`))}><Icon name="games" size={13} /> Juegos</button>
                    </summary>
                    {categoriesOf(sl.id).map(({ cat, topics }) => (
                      <div key={cat} className="tree-cat">
                        <div className="tree-cat-name">
                          <span>{CAT_ICON[cat]} {CAT_NAME[cat]}</span>
                          <button className="play-link" title="Juegos de este tipo" onClick={() => go(topics.length === 1 ? `#/grammar/${topics[0].id}` : `#/grammar/play/c:${sl.id}:${cat}`)}><Icon name="games" size={13} /> Juegos</button>
                        </div>
                        {topics.map((t) => {
                          const st = s.topics[t.id];
                          const weak = st && st.s >= 4 && st.c / st.s < 0.65;
                          return (
                            <div key={t.id} className="topic-row" onClick={() => go(`#/grammar/${t.id}`)} style={weak ? { borderColor: 'var(--bad)' } : undefined}>
                              <Ring pct={topicMastery(s, t.id)} size={22} />
                              <span className="t-title">{t.title}</span>
                              {weak && <span className="tag warm">a reforzar</span>}
                              <span className="tiny" title={`Maestría: ${TIERS[topicTier(s, t.id)].name}`}>{TIERS[topicTier(s, t.id)].icon}</span>
                              {(() => { const b = gamesBeaten('t:' + t.id, s); return <span className="muted tiny" title="Juegos superados (ronda completa con 80 % o más)">juegos {b.done}/{b.total}</span>; })()}
                              <span className="muted tiny">{Math.round(topicMastery(s, t.id) * 100)} %</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </details>
                );
              })}
            </div>
          </details>
        );
      })}
    </div>
  );
}
