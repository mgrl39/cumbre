import { Fragment, useState } from 'react';
import { useStore } from '../core/store.ts';
import { LEVELS, SKILLS, SKILL_NAME, type Level, type Skill } from '../core/types.ts';
import { CERT_SECTIONS, CERT_PER, CERT_PASS, certSectionName, certSummary } from '../core/plans.ts';
import { Card, go } from '../ui/common.tsx';
import { SUBLEVELS } from '../core/curriculum.ts';
import { EXAM_PASS, examSize } from '../core/grammarGames.ts';
import { Icon } from '../ui/icons.tsx';

const ICO: Record<string, string> = { grammar: 'grammar', vocab: 'vocab', reading: 'reading', listening: 'listening', writing: 'writing', mixed: 'target' };
type K = Skill | 'mixed';

export default function ExamsPage() {
  const certs = useStore((s) => s.certs);
  const exams = useStore((s) => s.exams);
  const [sel, setSel] = useState<{ k: K; l: Level } | null>(null);
  const rows: K[] = [...SKILLS, 'mixed'];
  const lv = LEVELS.slice(0, 5);
  const passed = Object.values(certs).filter((c) => c.passed).length;
  const cur = sel ? certs[`${sel.k}-${sel.l}`] : undefined;
  return (
    <div className="page">
      <h1>Exámenes</h1>
      <p className="lede">
        En <b>modo examen</b> no hay pistas, ni sonidos, ni corrección por pregunta: respondes todo y al final ves tu nota sobre 10 y, de cada fallo, qué pusiste y cuál era la respuesta. Lo que falles queda apuntado en <a href="#/repaso">Repaso</a>.
      </p>
      <div className="section-title">
        <h2>Gramática</h2>
        <span className="muted small">Por nivel y por tramo. Cada tema tiene además su propio examen dentro de Grammar. Se aprueba con {EXAM_PASS} %.</span>
      </div>
      <div className="exam-grid">
        {lv.map((l) => (
          <div key={l} className="exam-col">
            {[`l:${l}`, ...SUBLEVELS.filter((x) => x.level === l).map((x) => `s:${x.id}`)].map((sc) => {
              const e = exams[sc];
              const name = sc.startsWith('l:') ? `Nivel ${l}` : sc.slice(2);
              return (
                <button key={sc} className={'cert exam-btn' + (e && e.best >= EXAM_PASS ? ' passed' : '')} onClick={() => go(`#/gx/${sc}`)} title={`${examSize(sc)} preguntas`}>
                  <b>{name}</b>
                  <span>{e ? `${e.best >= EXAM_PASS ? '✓ ' : ''}${e.best} %` : `${examSize(sc)} preguntas`}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="section-title">
        <h2>Certificados</h2>
        <span className="muted small">Por skill y nivel.</span>
      </div>
      <p className="lede">
        Cada certificado son <b>{CERT_SECTIONS} mini tests de {CERT_PER} preguntas</b> (unos 5 minutos cada uno). Haz uno cuando te apetezca: se guarda cada parte y puedes repetirla para mejorarla. Con las {CERT_SECTIONS} hechas y una media de {CERT_PASS} % o más, el certificado es tuyo. Sin pistas y con tiempo, pero sin prisa por hacerlos todos.
      </p>
      <div className="muted small" style={{ marginBottom: 10 }}>{passed} certificados conseguidos de {rows.length * lv.length}</div>
      <div className="table-wrap">
        <div className="cert-grid">
          <span />
          {lv.map((l) => <span key={l} className="hd">{l}</span>)}
          {rows.map((k) => (
            <Fragment key={k}>
              <span className="rl"><Icon name={ICO[k]} size={17} /> {k === 'mixed' ? 'Global' : SKILL_NAME[k]}</span>
              {lv.map((l) => {
                const c = certs[`${k}-${l}`];
                const sm = certSummary(c);
                return (
                  <button key={k + l} className={'cert' + (sm.passed ? ' passed' : '') + (sel?.k === k && sel.l === l ? ' sel' : '')} onClick={() => setSel({ k, l })}>
                    <span className="dots">
                      {Array.from({ length: CERT_SECTIONS }, (_, i) => {
                        const v = c?.sections?.[i];
                        return <i key={i} className={v == null ? '' : v >= CERT_PASS ? 'd' : 'm'} />;
                      })}
                    </span>
                    <span>{sm.passed ? '📜 ' + sm.avg + ' %' : sm.done ? `${sm.avg} %` : '—'}</span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      {sel && (
        <Card>
          <div className="row between">
            <h3 style={{ margin: 0 }}>
              {sel.l} · {sel.k === 'mixed' ? 'Global' : SKILL_NAME[sel.k]}
            </h3>
            <span className="muted small">{certSummary(cur).done}/{CERT_SECTIONS} partes · media {certSummary(cur).avg} %</span>
          </div>
          <div className="sections">
            {Array.from({ length: CERT_SECTIONS }, (_, i) => {
              const v = cur?.sections?.[i];
              return (
                <button key={i} className="section-btn" onClick={() => go(`#/exam/${sel.k}/${sel.l}/${i}`)}>
                  <b>{i + 1}. {certSectionName(sel.k, i)}</b>
                  <span>{v == null ? `${CERT_PER} preguntas · sin hacer` : `Mejor: ${v} % · repetir`}</span>
                </button>
              );
            })}
          </div>
        </Card>
      )}
      {!sel && <div className="muted small">Elige una casilla para ver sus mini tests.</div>}
    </div>
  );
}
