import { useMemo, useState } from 'react';
import { useStore, update, day } from '../core/store.ts';
import { writingPrompts, writingItems } from '../core/content.ts';
import { analyze, LINKERS } from '../core/writingCheck.ts';
import { checkAchievementsOutside } from '../core/progress.ts';
import { LEVELS } from '../core/types.ts';
import { levelOf, updateRating } from '../core/rating.ts';
import { Card, LevelBar, go } from '../ui/common.tsx';

const RUBRIC = [
  'Respondo a TODO lo que pide la tarea',
  'Hay párrafos claros (intro, desarrollo, cierre)',
  'Uso conectores variados y bien',
  'Varío las estructuras (relativas, pasiva, condicionales…)',
  'Vocabulario preciso, sin repetir',
  'Registro adecuado (formal/informal)',
  'He revisado tiempos verbales, -s de 3ª persona y artículos',
];

export default function WritingPage({ promptId }: { promptId?: string }) {
  const s = useStore((x) => x);
  if (promptId) return <Editor id={promptId} />;
  const counts = { trans: 0, error: 0, translate: 0, linker: 0 };
  writingItems.forEach((w) => counts[w.type]++);
  return (
    <div className="page">
      <h1>Writing</h1>
      <LevelBar r={s.skills.writing.r} />
      <p className="muted">
        Tu nivel: <b>{levelOf(s.skills.writing.r).label}</b>. Dos partes: <b>práctica medible</b> ({counts.trans} transformaciones, {counts.error} errores típicos de hispanohablantes, {counts.translate} traducciones, {counts.linker} de cohesión) que ajusta tu nivel, y <b>escritura libre</b> con un analizador automático, un modelo de respuesta y autoevaluación.
      </p>
      <button className="btn primary" onClick={() => go('#/flow/writing')}>🌊 Práctica de Writing</button>
      {LEVELS.slice(0, 5).map((l) => {
        const list = writingPrompts.filter((p) => p.level === l);
        if (!list.length) return null;
        return (
          <section key={l}>
            <h2>{l}</h2>
            <div className="topic-grid">
              {list.map((p) => {
                const mine = s.essays.filter((e) => e.promptId === p.id);
                return (
                  <Card key={p.id} onClick={() => go(`#/writing/${p.id}`)}>
                    <div className="row between">
                      <b>{p.title}</b>
                      {mine.length > 0 && <span className="ok small">✓ {mine.length}</span>}
                    </div>
                    <div className="muted small">
                      {p.genre} · {p.min}–{p.max} palabras
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
      {s.essays.length > 0 && (
        <>
          <h2>Mis textos</h2>
          {s.essays.slice(0, 20).map((e) => (
            <details key={e.id} className="card">
              <summary>
                {writingPrompts.find((p) => p.id === e.promptId)?.title ?? e.promptId} · {e.words} palabras · {e.score}/100 · {new Date(e.t).toLocaleDateString('es')}
              </summary>
              <p className="essay-text">{e.text}</p>
            </details>
          ))}
        </>
      )}
    </div>
  );
}

function Editor({ id }: { id: string }) {
  const p = writingPrompts.find((x) => x.id === id);
  const key = 'draft:' + id;
  const [text, setText] = useState(() => {
    try {
      return localStorage.getItem(key) || '';
    } catch {
      return '';
    }
  });
  const [submitted, setSubmitted] = useState(false);
  const [checks, setChecks] = useState<boolean[]>(RUBRIC.map(() => false));
  const a = useMemo(() => analyze(text, p ? { min: p.min, max: p.max } : undefined), [text, p]);
  if (!p) return <div className="page">No encontrado</div>;

  const onChange = (v: string) => {
    setText(v);
    try {
      localStorage.setItem(key, v);
    } catch {
      /* sin storage */
    }
  };
  const submit = () => {
    setSubmitted(true);
  };
  const save = () => {
    const self = checks.filter(Boolean).length / RUBRIC.length;
    const score = Math.round(a.score * 0.6 + self * 100 * 0.4);
    update((s) => {
      s.essays.unshift({ id: String(Date.now()), t: Date.now(), promptId: p.id, text, words: a.words, score, self });
      const lvl = LEVELS.indexOf(p.level) + 1;
      // una redacción cuenta como evidencia (ligera) para el nivel de writing
      const ok = score >= 70 && a.words >= p.min * 0.9;
      s.skills.writing.r = updateRating(s.skills.writing.r, Math.max(30, s.skills.writing.n), lvl, ok);
      const d = day(s);
      d.essays++;
      d.writing++;
      const xp = 20 + Math.round(score / 2) + Math.min(60, Math.round(a.words / 5));
      s.xp += xp;
      d.xp += xp;
      s.notices.push(`✍️ Texto guardado: ${score}/100 · +${xp} XP`);
    });
    try {
      localStorage.removeItem(key);
    } catch {
      /* sin storage */
    }
    checkAchievementsOutside();
    go('#/writing');
  };

  return (
    <div className="page narrow">
      <a href="#/writing" className="back">← Writing</a>
      <h1>
        {p.title} <span className="tag">{p.level}</span>
      </h1>
      <Card>
        <div className="muted small">{p.genre} · {p.min}–{p.max} palabras</div>
        <p>{p.task}</p>
        <details>
          <summary>Consejos</summary>
          <ul>
            {p.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </details>
      </Card>
      <textarea rows={14} value={text} onChange={(e) => onChange(e.target.value)} placeholder="Escribe aquí en inglés…" spellCheck={false} />
      <div className="row between small muted">
        <span>
          {a.words} palabras · {a.sentences} frases · media {a.avgLen.toFixed(1)} palabras/frase
        </span>
        <span>{a.words < p.min ? `faltan ${p.min - a.words}` : a.words > p.max ? `sobran ${a.words - p.max}` : '✓ longitud'}</span>
      </div>
      {!submitted ? (
        <button className="btn primary wide" disabled={a.words < 20} onClick={submit}>Analizar mi texto</button>
      ) : (
        <>
          <Card>
            <div className="row between">
              <h3>Análisis automático</h3>
              <span className="big-num">{a.score}<span className="small">/100</span> · ~{a.cefrGuess}</span>
            </div>
            <div className="muted small">Orientativo: detecta patrones, no entiende el contenido. Fíjate sobre todo en los errores marcados.</div>
            {a.findings.map((f, i) => (
              <div key={i} className={'finding ' + f.kind}>
                {f.kind === 'error' ? '❌' : f.kind === 'warn' ? '⚠️' : '✅'} {f.msg} {f.match && <code>{f.match}</code>}
              </div>
            ))}
            <h4>Conectores usados</h4>
            {Object.keys(LINKERS).map((cat) => (
              <div key={cat} className="small">
                <b>{cat}:</b> {a.linkers[cat]?.join(', ') || <span className="muted">ninguno — prueba: {LINKERS[cat].slice(0, 3).join(', ')}</span>}
              </div>
            ))}
            {a.academic.length > 0 && <div className="small"><b>Vocabulario avanzado:</b> {a.academic.join(', ')}</div>}
            {a.repeated.length > 0 && <div className="small"><b>Repites mucho:</b> {a.repeated.map((r) => `${r.w} (×${r.n})`).join(', ')} — busca sinónimos.</div>}
          </Card>
          <details className="card" open>
            <summary><b>Modelo de respuesta ({p.level})</b> — compáralo con el tuyo y roba expresiones</summary>
            <p className="essay-text">{p.model}</p>
          </details>
          <Card>
            <h3>Autoevaluación</h3>
            {RUBRIC.map((r, i) => (
              <label key={i} className="check">
                <input type="checkbox" checked={checks[i]} onChange={() => setChecks(checks.map((c, j) => (j === i ? !c : c)))} /> {r}
              </label>
            ))}
            <div className="muted small">Consejo: reescribe 2–3 frases tuyas usando estructuras del modelo antes de guardar.</div>
          </Card>
          <div className="row gap">
            <button className="btn ghost" onClick={() => setSubmitted(false)}>Seguir editando</button>
            <button className="btn primary" onClick={save}>Guardar y terminar</button>
          </div>
        </>
      )}
    </div>
  );
}
