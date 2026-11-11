/* Motor de sesión: pinta cualquier ejercicio, gestiona temporizador, vidas, avisos y resumen. */
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Exercise, Skill } from '../core/types.ts';
import { SKILLS, SKILL_NAME } from '../core/types.ts';
import type { Ctx, Plan, Result } from '../core/plans.ts';
import { applyResult, finishSession, completedMissions, lastGain } from '../core/progress.ts';
import { vocabExercise } from '../core/generate.ts';
import { isCorrect, norm, lev } from '../core/text.ts';
import { speak, stopSpeaking } from '../core/speech.ts';
import { getState, todayLoad } from '../core/store.ts';
import { sfx } from '../core/sfx.ts';
import { levelOf } from '../core/rating.ts';
import { topicById } from '../core/content.ts';
import { Md, Progress, Speak, WordText, go } from './common.tsx';

type Phase = 'q' | 'fb' | 'end';

export function Session({ make }: { make: () => Plan }) {
  const [plan, setPlan] = useState<Plan>(make);
  const ctx = useRef<Ctx>(newCtx(plan));
  const queue = useRef<Exercise[]>([]);
  const [ex, setEx] = useState<Exercise | null>(null);
  const [phase, setPhase] = useState<Phase>('q');
  const [last, setLast] = useState<{ ok: boolean; given: string } | null>(null);
  const [notices, setNotices] = useState<string[]>([]);
  const [endNotes, setEndNotes] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | undefined>();
  const [, force] = useState(0);
  const [clock, setClock] = useState<number | undefined>(plan.duration);
  const capped = useRef(false);
  const steps = useRef(0);
  const ended = useRef(false);
  const start = useRef({ t: Date.now(), xp: getState().xp, missions: completedMissions(), r: snapshot() });

  function newCtx(p: Plan): Ctx {
    return { answered: 0, correct: 0, run: 0, lives: p.lives ?? Infinity, exclude: new Set(), results: [], block: 0 };
  }

  const advance = () => {
    // máximo diario: no hay mínimo, pero sí un tope para no quemarse (repaso y exámenes no cuentan)
    const st = getState();
    if (!plan.exempt && !plan.placement && !plan.exam && ctx.current.answered > 0 && todayLoad(st) >= st.settings.dailyMax) {
      capped.current = true;
      return finish();
    }
    if (!queue.current.length) {
      const more = plan.next(ctx.current);
      if (!more || !more.length) return finish();
      queue.current.push(...more);
    }
    steps.current++;
    const nx = queue.current.shift()!;
    setEx(nx);
    setLast(null);
    setPhase('q');
    const t = nx.kind === 'learn' ? undefined : plan.timer?.(ctx.current);
    setTimeLeft(t !== undefined ? t + (nx.passage && !ctx.current.results.some((r) => r.ex.passage?.id === nx.passage!.id) ? 120 : 0) + (nx.dictation ? 15 : 0) : undefined);
  };

  const finish = () => {
    if (ended.current) return;
    ended.current = true;
    stopSpeaking();
    const c = ctx.current;
    // el % se calcula sobre el total previsto: dejarlo a medias no cuenta como hecho
    const total = Math.max(c.answered, plan.total ?? 0);
    const res: Result = { answered: c.answered, correct: c.correct, total, complete: !plan.total || c.answered >= plan.total, pct: total ? Math.round((c.correct / total) * 100) : 0, results: c.results };
    const extra = plan.onFinish?.(res) ?? [];
    const minutes = c.answered ? Math.max(1, Math.round((Date.now() - start.current.t) / 60000)) : 0;
    const fin = finishSession(minutes, start.current.xp, start.current.missions);
    if (c.answered) sfx('done');
    if (capped.current) extra.unshift(`🌙 Has llegado a tu máximo de hoy (${getState().settings.dailyMax} respuestas). Descansar también es aprender: mañana lo tendrás más asentado. El repaso sigue abierto si quieres.`);
    setEndNotes(extra);
    setNotices((n) => [...n, ...fin]);
    setPhase('end');
  };

  useEffect(() => {
    advance();
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  // reloj global (Contrarreloj)
  useEffect(() => {
    if (clock === undefined || phase === 'end') return;
    if (clock <= 0) {
      finish();
      return;
    }
    const id = setTimeout(() => setClock((t) => (t === undefined ? t : t - 1)), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clock, phase]);

  // temporizador
  useEffect(() => {
    if (phase !== 'q' || timeLeft === undefined) return;
    if (timeLeft <= 0) {
      answer(false, '⏱️ (sin tiempo)');
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => (t === undefined ? t : t - 1)), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase]);

  function answer(ok: boolean, given: string) {
    if (!ex || phase !== 'q') return;
    const c = ctx.current;
    if (ex.kind === 'learn') {
      if (given === 'known' && ex.learn) {
        // «Ya me la sé» no marca nada: hay que demostrarlo. Si aciertas, entra en el repaso como acertada
        // (vuelve mañana y luego cada vez más espaciada); si fallas, empieza a aprenderse.
        const w = ex.learn;
        queue.current = queue.current.filter((q) => q.wordId !== w.id);
        const single = !w.word.includes(' ') && w.tag !== 'phrase';
        queue.current.unshift({ ...vocabExercise(w, single ? 'spell' : 'es-en'), label: 'Demuéstralo', instruction: single ? 'Si te la sabes, escríbela en inglés' : '¿Cómo se dice en inglés?' });
        advance();
        return;
      }
      applyResult(ex, true);
      advance();
      return;
    }
    c.answered++;
    if (ok) {
      c.correct++;
      c.run++;
    } else {
      c.run = 0;
      c.lives--;
    }
    c.results.push({ ex, ok, given });
    const n = applyResult(ex, ok, { placement: plan.placement, exam: plan.exam, run: c.run, given, ev: plan.ev });
    if (n.length) setNotices((x) => [...x, ...n]);
    // examen y prueba de nivel: sin corrección hasta el final (no se sabe si se ha acertado)
    if (plan.exam || plan.placement) {
      sfx('tick');
      advance();
      return;
    }
    sfx(ok ? 'ok' : 'bad');
    setLast({ ok, given });
    setPhase('fb');
    if (plan.fast && ok) {
      const at = steps.current;
      setTimeout(() => {
        if (steps.current === at && !ended.current) advance();
      }, 380);
      return;
    }
    if (ex.audio && ex.hideText) speak(ex.audio);
  }

  const cont = () => {
    if (ctx.current.lives <= 0) return finish();
    advance();
  };

  const restart = () => {
    const p = make();
    ctx.current = newCtx(p);
    queue.current = [];
    start.current = { t: Date.now(), xp: getState().xp, missions: completedMissions(), r: snapshot() };
    setNotices([]);
    setEndNotes([]);
    capped.current = false;
    ended.current = false;
    setClock(p.duration);
    setPlan(p);
    force((x) => x + 1);
  };

  if (phase === 'end') return <Summary plan={plan} ctx={ctx.current} startR={start.current.r} xp={getState().xp - start.current.xp} notices={[...endNotes, ...notices]} onRestart={restart} />;
  if (!ex) return <div className="center muted">Preparando…</div>;
  const c = ctx.current;
  const banner = plan.banner?.(c) ?? (plan.exam ? '📝 Modo examen: sin pistas. Verás la corrección completa al terminar.' : undefined);
  const blind = !!(plan.exam || plan.placement);
  // mientras se ve la corrección, el contador sigue en la pregunta recién respondida
  const qn = phase === 'fb' ? c.answered : c.answered + 1;
  return (
    <div className="session">
      <div className="session-top">
        <button className="icon-btn" onClick={() => (c.answered ? finish() : go(plan.backTo))} title="Terminar">
          ✕
        </button>
        <div className="grow">
          <div className="q-count">
            {ex.kind === 'learn' ? 'Palabra nueva' : plan.total ? <>Pregunta <b>{Math.min(qn, plan.total)}</b> de {plan.total}</> : <>Pregunta <b>{qn}</b>{plan.record ? <span className="muted"> · récord {plan.record}</span> : null}</>}
            <span className="muted q-title"> · {plan.title}</span>
          </div>
          {plan.total ? <Progress value={c.answered} max={plan.total} thin /> : null}
        </div>
        <div className="session-stats">
          {Number.isFinite(c.lives) && <span title="Vidas" className="lives">{'❤️'.repeat(Math.max(0, c.lives))}</span>}
          {plan.exam && <span className="exam-pill" title="Sin pistas: la corrección llega al final">Examen</span>}
          {!blind && c.run >= 3 && <span title="Aciertos seguidos">🔥 {c.run}</span>}
          {!blind && getState().xp > start.current.xp && <span title="Experiencia ganada en esta sesión" className="xp-pill">+{getState().xp - start.current.xp} XP</span>}
          {clock !== undefined && <span className={'timer' + (clock <= 10 ? ' urgent' : '')}>⏳ {clock}s</span>}
          {timeLeft !== undefined && phase === 'q' && <span className={'timer' + (timeLeft <= 5 ? ' urgent' : '')}>⏱ {timeLeft}</span>}
        </div>
      </div>
      {banner && <div className="banner">{banner}</div>}
      <ExerciseView key={steps.current} ex={ex} phase={phase} last={last} onAnswer={answer} onContinue={cont} />
    </div>
  );
}

function snapshot(): Record<Skill, number> {
  const s = getState();
  return Object.fromEntries(SKILLS.map((k) => [k, s.skills[k].r])) as Record<Skill, number>;
}

function Summary({ plan, ctx, startR, xp, notices, onRestart }: { plan: Plan; ctx: Ctx; startR: Record<Skill, number>; xp: number; notices: string[]; onRestart: () => void }) {
  const s = getState();
  // en un examen la nota es sobre el total previsto: lo que no se responde, no puntúa
  const base = plan.exam ? Math.max(ctx.answered, plan.total ?? 0) : ctx.answered;
  const pct = base ? Math.round((ctx.correct / base) * 100) : 0;
  const changed = SKILLS.filter((k) => Math.abs(s.skills[k].r - startR[k]) > 0.004);
  const failed = ctx.results.filter((r) => !r.ok);
  const passed = plan.passPct !== undefined && pct >= plan.passPct;
  return (
    <div className="summary">
      <h2>{plan.title}</h2>
      {plan.exam && ctx.answered > 0 && (
        <div className={'grade ' + (passed ? 'ok' : 'soft')}>
          <b>{(pct / 10).toLocaleString('es', { maximumFractionDigits: 1 })}</b>
          <span>sobre 10 · {passed ? 'aprobado' : `se aprueba con ${plan.passPct ?? 80} %`}</span>
        </div>
      )}
      <div className="big-stats">
        <div><b>{ctx.correct}/{base}</b><span>aciertos</span></div>
        <div><b>{pct}%</b><span>precisión</span></div>
        <div><b>+{xp}</b><span>XP</span></div>
      </div>
      {!plan.exam && plan.passPct !== undefined && ctx.answered > 0 && <div className={'pass ' + (passed ? 'ok' : 'soft')}>{passed ? '✓ Muy bien' : 'Guardado. Cada intento suma: vuelve cuando quieras.'}</div>}
      {notices.length > 0 && (
        <div className="card notices">
          {notices.map((n, i) => (
            <div key={i}>{n}</div>
          ))}
        </div>
      )}
      {failed.length > 0 && !plan.placement && (
        <div className="card">
          <div className="row between">
            <h3 style={{ margin: 0 }}>En qué has fallado ({failed.length})</h3>
            {!window.location.hash.startsWith('#/fails') && <button className="btn small" onClick={() => go('#/fails')}>Repasar fallos →</button>}
          </div>
          <p className="muted small">Quedan apuntados en Repaso hasta que los aciertes en 2 días distintos.</p>
          {failed.slice(-30).map((r, i) => (
            <div key={i} className="fail-row">
              <div className="muted tiny">{r.ex.label}</div>
              {!r.ex.hideText && r.ex.kind !== 'order' && r.ex.prompt && <div className="fail-q">{r.ex.prompt.split('\n').filter(Boolean).join(' · ')}</div>}
              <AnswerCompare ex={r.ex} given={r.given} />
              {r.ex.explain && <div className="fb-explain">💡 {r.ex.explain}</div>}
            </div>
          ))}
        </div>
      )}
      {failed.length === 0 && ctx.answered > 0 && !plan.placement && <div className="pass ok">Sin fallos en esta sesión.</div>}
      {changed.length > 0 && (
        <div className="card">
          <h3>Tu nivel por skill</h3>
          {changed.map((k) => {
            const d = s.skills[k].r - startR[k];
            return (
              <div key={k} className="row between">
                <span>{SKILL_NAME[k]}</span>
                <span>
                  {levelOf(s.skills[k].r).label} <span className={d >= 0 ? 'ok' : 'bad'}>{d >= 0 ? '▲' : '▼'} {Math.abs(Math.round(d * 100))}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="row center gap">
        <button className="btn" onClick={onRestart}>Otra vez</button>
        <button className="btn ghost" onClick={() => go(plan.backTo)}>Volver</button>
      </div>
    </div>
  );
}

/* ======================= Vista de un ejercicio ======================= */

function ExerciseView({ ex, phase, last, onAnswer, onContinue }: { ex: Exercise; phase: Phase; last: { ok: boolean; given: string } | null; onAnswer: (ok: boolean, given: string) => void; onContinue: () => void }) {
  const [input, setInput] = useState('');
  const [picked, setPicked] = useState<number[]>([]);
  const [showRule, setShowRule] = useState(false);
  const [showPassage, setShowPassage] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const answered = phase === 'fb';
  // La misma pulsación de Enter que envía la respuesta no debe saltarse la corrección: se ignora «Continuar»
  // durante un instante tras responder, para que siempre se vea en qué se ha fallado.
  const answeredAt = useRef(0);
  const submit = (ok: boolean, given: string) => {
    answeredAt.current = Date.now();
    onAnswer(ok, given);
  };
  const cont = () => {
    if (Date.now() - answeredAt.current < 450) return;
    onContinue();
  };

  useEffect(() => {
    if (ex.audio && (ex.hideText || ex.kind === 'learn' || ex.skill === 'listening')) {
      const t = setTimeout(() => speak(ex.audio!), 250);
      return () => clearTimeout(t);
    }
  }, [ex]);
  useEffect(() => {
    if (ex.kind === 'type') inputRef.current?.focus();
  }, [ex]);

  const check = () => {
    if (answered) return;
    if (ex.kind === 'type') {
      if (!input.trim()) return;
      submit(isCorrect(input, ex.answers), input);
    } else if (ex.kind === 'order') {
      const s = picked.map((i) => ex.tokens![i]).join(' ');
      submit(isCorrect(s, ex.answers), s);
    }
  };

  // teclado: 1-4 para opciones, Enter para continuar
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (answered && e.key === 'Enter') {
        e.preventDefault();
        cont();
        return;
      }
      if (ex.kind === 'learn' && e.key === 'Enter') {
        e.preventDefault();
        submit(true, '');
        return;
      }
      if (!answered && ex.kind === 'mc' && tag !== 'INPUT' && /^[1-9]$/.test(e.key)) {
        const o = ex.options?.[Number(e.key) - 1];
        if (o !== undefined) submit(ex.answers.includes(o), o);
      }
      if (!answered && ex.kind === 'order' && e.key === 'Enter' && picked.length === ex.tokens?.length) check();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const topic = ex.ruleTopic ? topicById.get(ex.ruleTopic) : undefined;
  const gain = last?.ok ? lastGain() : null;
  const xp = gain?.xp ?? 0;
  // a ciegas (la Rueda): ni tema ni regla hasta haber respondido
  const hidden = !!ex.blind && !answered;
  const label = hidden ? '🎡 La Rueda · a ciegas' : ex.blind ? `🎡 Era: ${ex.label}` : ex.label;

  if (ex.kind === 'learn' && ex.learn) {
    const w = ex.learn;
    return (
      <div className="exercise">
        <div className="ex-label">{ex.label}</div>
        <div className="learn-card">
          <div className="learn-word">
            {w.word} <Speak text={w.word} />
          </div>
          <div className="muted">{w.pos}</div>
          <div className="learn-es">{w.es}</div>
          {w.ex && (
            <div className="learn-ex">
              {w.ex.split(/(\*[^*]+\*)/).map((p, i) => (p.startsWith('*') ? <b key={i}>{p.slice(1, -1)}</b> : p))} <Speak text={w.ex.replace(/\*/g, '')} />
            </div>
          )}
          {w.note && <div className="note">💡 {w.note}</div>}
        </div>
        <div className="learn-actions">
          <button className="btn ghost" onClick={() => submit(true, 'known')} title="Te la preguntamos ahora sin pistas: si aciertas, entra en el repaso como sabida (y se irá comprobando en días distintos)">Ya me la sé: pruébame</button>
          <button className="btn primary grow" onClick={() => submit(true, '')}>Entendido →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="exercise">
      <div className={'ex-label' + (ex.blind ? ' blind' : '')}>{label}</div>
      {ex.passage && (
        <div className="passage">
          <div className="row between">
            <b>{ex.passage.title}</b>
            <span>
              <Speak text={ex.passage.text} label="texto" />
              {!ex.passage.audioOnly && (
                <button className="icon-btn" onClick={() => setShowPassage((v) => !v)}>{showPassage ? 'Ocultar' : 'Mostrar'}</button>
              )}
            </span>
          </div>
          {ex.passage.audioOnly && !answered ? (
            <div className="muted small">🎧 Escucha el texto completo (puedes repetirlo). El texto aparece al responder.</div>
          ) : (
            showPassage && <WordText text={ex.passage.text} />
          )}
        </div>
      )}
      <div className="instruction">{ex.instruction}</div>
      {ex.audio && (ex.hideText || ex.skill === 'listening') && (
        <div className="audio-row">
          <button className="btn audio" onClick={() => speak(ex.audio!)}>🔊 Escuchar</button>
          <button className="btn audio ghost" onClick={() => speak(ex.audio!, { rate: 0.65 })}>🐢 Lento</button>
        </div>
      )}
      {!(ex.hideText && !answered) && ex.prompt && (
        <div className={'prompt' + (ex.prompt.length > 80 ? ' long' : '')}>
          {ex.prompt.split('\n').map((l, i) => (
            <div key={i} className={/^[A-Z]{2,}$/.test(l.trim()) ? 'keyword' : ''}>
              {l}
            </div>
          ))}
          {ex.audio && !ex.hideText && ex.skill !== 'listening' && <Speak text={ex.audio} slow={false} />}
        </div>
      )}

      {ex.kind === 'mc' && (
        <div className={'options' + ((ex.options || []).some((o) => o.length > 40) ? ' stacked' : '')}>
          {ex.options!.map((o, i) => {
            const isAns = ex.answers.includes(o);
            const cls = answered ? (isAns ? ' correct' : o === last?.given ? ' wrong' : ' dim') : '';
            return (
              <button key={i} className={'option' + cls} disabled={answered} onClick={() => submit(isAns, o)}>
                <span className="kbd">{i + 1}</span> {o}
              </button>
            );
          })}
        </div>
      )}

      {ex.kind === 'type' && (
        <div className="type-row">
          <input
            ref={inputRef}
            value={input}
            disabled={answered}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !answered && (e.stopPropagation(), check())}
            placeholder={ex.dictation ? 'Escribe lo que oyes…' : 'Tu respuesta…'}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className={answered ? (last?.ok ? 'correct' : 'wrong') : ''}
          />
          {!answered && <button className="btn primary" onClick={check}>Comprobar</button>}
        </div>
      )}

      {ex.kind === 'order' && (
        <div className="order">
          <div className="order-line">
            {picked.map((ti, k) => (
              <button key={k} className="chip on" disabled={answered} onClick={() => setPicked(picked.filter((_, j) => j !== k))}>
                {ex.tokens![ti]}
              </button>
            ))}
            {!picked.length && <span className="muted small">Toca las palabras en orden…</span>}
          </div>
          <div className="order-bank">
            {ex.tokens!.map((t, i) => (
              <button key={i} className="chip" disabled={answered || picked.includes(i)} onClick={() => setPicked([...picked, i])}>
                {t}
              </button>
            ))}
          </div>
          {!answered && (
            <button className="btn primary" disabled={picked.length !== ex.tokens!.length} onClick={check}>
              Comprobar
            </button>
          )}
        </div>
      )}

      {answered && last && (
        <div className={'feedback ' + (last.ok ? 'ok' : 'bad')}>
          <div className="fb-title">
            {last.ok ? '✓ ¡Correcto!' : '✗ No es correcto'}
            {xp ? <span className="xp-gain" title={gain && gain.parts.length ? `${gain.base} base × ${gain.parts.map((p) => `${p.label} ×${p.mult.toLocaleString('es', { maximumFractionDigits: 2 })}`).join(' × ')}` : 'XP base'}>+{xp} XP{gain && gain.mult > 1.01 ? <i> ×{gain.mult.toLocaleString('es', { maximumFractionDigits: 1 })}</i> : null}</span> : null}
          </div>
          {!last.ok && <AnswerCompare ex={ex} given={last.given} />}
          {last.ok && ex.kind !== 'mc' && (
            <div className="fb-answer">
              <b>{closest(ex, last.given)}</b> {ex.hideText || ex.skill !== 'reading' ? <Speak text={ex.audio && ex.dictation ? ex.audio : fullSentence(ex)} slow={false} /> : null}
            </div>
          )}
          {ex.explain && <div className="fb-explain">💡 {ex.explain}</div>}
          {topic && (
            <button className="link" onClick={() => setShowRule((v) => !v)}>
              {showRule ? 'Ocultar regla' : `📘 Ver regla: ${topic.title}`}
            </button>
          )}
          {showRule && topic && (
            <div className="rule-box">
              {topic.table && <Md text={topic.table} />}
              <Md text={topic.es} />
            </div>
          )}
          <button className="btn primary wide" onClick={cont} autoFocus>
            Continuar ↵
          </button>
        </div>
      )}
    </div>
  );
}

/** La respuesta válida más parecida a lo que escribió (hay ejercicios con varias respuestas correctas). */
function closest(ex: Exercise, given = ''): string {
  const g = norm(given);
  return ex.answers.reduce((best, a) => (lev(norm(a), g) < lev(norm(best), g) ? a : best), ex.answers[0] ?? '');
}

/** Marca qué palabras de `shown` aparecen (en orden) en `ref`. Sin unificar contracciones: se compara lo escrito. */
function markWords(ref: string, shown: string): { word: string; ok: boolean }[] {
  const key = (w: string) => w.toLowerCase().replace(/[’‘`´]/g, "'").replace(/[^a-z0-9']/g, '');
  const a = ref.split(/\s+/).map(key).filter(Boolean);
  const b = shown.split(/\s+/).filter(Boolean);
  const bk = b.map(key);
  const L = Array.from({ length: a.length + 1 }, () => Array(bk.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--) for (let j = bk.length - 1; j >= 0; j--) L[i][j] = a[i] === bk[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ok = Array(bk.length).fill(false);
  for (let i = 0, j = 0; i < a.length && j < bk.length; ) {
    if (a[i] === bk[j]) ok[j++] = (i++, true);
    else if (L[i + 1][j] >= L[i][j + 1]) i++;
    else j++;
  }
  return b.map((word, k) => ({ word, ok: ok[k] || bk[k] === '' }));
}

/** Lo que respondiste frente a lo correcto, con las palabras que no encajan marcadas. */
export function AnswerCompare({ ex, given }: { ex: Exercise; given?: string }) {
  const right = closest(ex, given);
  const none = !given || given.startsWith('⏱');
  const others = ex.kind === 'mc' ? [] : ex.answers.filter((a) => a !== right).slice(0, 2);
  return (
    <div className="cmp">
      <div className="cmp-row bad">
        <span className="cmp-k">Tu respuesta</span>
        <span className="cmp-v">
          {none ? (
            <i>{given || 'sin responder'}</i>
          ) : ex.kind === 'mc' ? (
            given
          ) : (
            markWords(right, given!).map((w, i) => (
              <span key={i} className={w.ok ? '' : 'bad u'}>
                {w.word}{' '}
              </span>
            ))
          )}
        </span>
      </div>
      <div className="cmp-row ok">
        <span className="cmp-k">Correcta</span>
        <span className="cmp-v">
          {ex.kind === 'mc' || none ? (
            <b>{right}</b>
          ) : (
            markWords(given!, right).map((w, i) => (
              <b key={i} className={w.ok ? '' : 'hl'}>
                {w.word}{' '}
              </b>
            ))
          )}{' '}
          {ex.skill !== 'reading' && <Speak text={ex.audio && ex.dictation ? ex.audio : fullSentence(ex)} slow={false} />}
          {others.length > 0 && <div className="muted small">También vale: {others.join('  ·  ')}</div>}
        </span>
      </div>
    </div>
  );
}

function fullSentence(ex: Exercise): string {
  const line = ex.prompt.split('\n').find((l) => l.includes('___'));
  if (line) return line.replace('___', ex.answers[0]).replace(/\s*\([^)]*\)/, '');
  return ex.answers[0];
}

export function useStableMake(fn: () => Plan, key: string) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => fn, [key]);
}
