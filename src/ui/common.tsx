import { useState, type ReactNode } from 'react';
import { speak } from '../core/speech.ts';
import { levelOf } from '../core/rating.ts';
import { lemmaCandidates } from '../core/text.ts';
import { vocabByWord } from '../core/content.ts';
import { getState, update } from '../core/store.ts';
import type { VocabEntry } from '../core/types.ts';
import { TAG_NAME } from '../core/generate.ts';
import type { Ev } from '../core/store.ts';
import { TIERS, tierProgress, recentAcc } from '../core/mastery.ts';
import { STAGE_NAME, type Stage } from '../core/srs.ts';

export const go = (h: string) => {
  window.location.hash = h;
};

export function Speak({ text, slow = true, label }: { text: string; slow?: boolean; label?: string }) {
  return (
    <span className="speak">
      <button className="icon-btn" title="Escuchar" onClick={(e) => (e.stopPropagation(), speak(text))}>
        🔊{label ? ` ${label}` : ''}
      </button>
      {slow && (
        <button className="icon-btn" title="Lento" onClick={(e) => (e.stopPropagation(), speak(text, { rate: 0.7 }))}>
          🐢
        </button>
      )}
    </span>
  );
}

export function LevelBar({ r, compact }: { r: number; compact?: boolean }) {
  const pct = Math.max(0, Math.min(100, ((r - 1) / 5) * 100));
  const { label } = levelOf(r);
  return (
    <div className={'levelbar' + (compact ? ' compact' : '')}>
      <div className="levelbar-track">
        {[1, 2, 3, 4].map((i) => (
          <span key={i} className="tick" style={{ left: `${(i / 5) * 100}%` }} />
        ))}
        <span className="goal" style={{ left: '80%' }} />
        <div className="levelbar-fill" style={{ width: `${pct}%` }} />
      </div>
      {!compact && (
        <div className="levelbar-labels">
          {['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
      {compact && <span className="levelbar-text">{label}</span>}
    </div>
  );
}

export function Progress({ value, max, thin }: { value: number; max: number; thin?: boolean }) {
  return (
    <div className={'progress' + (thin ? ' thin' : '')}>
      <div style={{ width: `${max ? Math.min(100, (value / max) * 100) : 0}%` }} />
    </div>
  );
}

/** Markdown ligero: **negrita**, `código`, listas "- ", ejemplos "> ", títulos "## ". */
export function Md({ text }: { text: string }) {
  const inline = (s: string) =>
    s.split(/(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_)/g).map((p, i) =>
      p.startsWith('**') ? <b key={i}>{p.slice(2, -2)}</b> : p.startsWith('`') ? <code key={i}>{p.slice(1, -1)}</code> : p.startsWith('_') && p.endsWith('_') && p.length > 2 ? <i key={i}>{p.slice(1, -1)}</i> : p,
    );
  const out: ReactNode[] = [];
  let list: ReactNode[] = [];
  let table: string[][] = [];
  const cells = (l: string) => l.replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
  const flush = () => {
    if (list.length) out.push(<ul key={out.length}>{list}</ul>);
    list = [];
    if (table.length) {
      const [head, ...body] = table;
      out.push(
        <div className="md-table" key={out.length}>
          <table>
            <thead>
              <tr>{head.map((c, j) => <th key={j}>{inline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, k) => (
                <tr key={k}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
    }
    table = [];
  };
  text
    .trim()
    .split('\n')
    .forEach((raw, i) => {
      const l = raw.trim();
      if (l.startsWith('|')) {
        if (list.length) {
          out.push(<ul key={out.length}>{list}</ul>);
          list = [];
        }
        if (!/^\|[\s:|-]+\|?$/.test(l)) table.push(cells(l));
        return;
      }
      if (table.length) flush();
      if (l.startsWith('- ')) {
        list.push(<li key={i}>{inline(l.slice(2))}</li>);
        return;
      }
      flush();
      if (!l) return;
      if (l.startsWith('## ')) out.push(<h3 key={i}>{inline(l.slice(3))}</h3>);
      else if (l.startsWith('> '))
        out.push(
          <div key={i} className="md-ex">
            <span>{inline(l.slice(2))}</span>
            <Speak text={l.slice(2).replace(/\*\*|`|_|\(.*?\)|→.*$/g, '')} slow={false} />
          </div>,
        );
      else out.push(<p key={i}>{inline(l)}</p>);
    });
  flush();
  return <div className="md">{out}</div>;
}

export function lookup(raw: string): VocabEntry | undefined {
  const s = getState();
  for (const c of lemmaCandidates(raw)) {
    const v = vocabByWord.get(c);
    if (v) return v;
    const cw = s.customWords.find((x) => x.word.toLowerCase() === c);
    if (cw) return { id: cw.id, word: cw.word, pos: '', es: cw.es, ex: cw.ex, level: 4, tag: 'custom' };
  }
  return undefined;
}

/** Texto con palabras clicables: muestra significado, permite añadir a repaso o a "mis palabras". */
export function WordText({ text, highlight }: { text: string; highlight?: boolean }) {
  const [sel, setSel] = useState<{ word: string; sentence: string } | null>(null);
  const paragraphs = text.split(/\n+/);
  return (
    <div className="wordtext">
      {paragraphs.map((p, pi) => (
        <p key={pi}>
          {p.split(/(\s+)/).map((tok, i) => {
            if (/^\s+$/.test(tok) || !/[A-Za-z]/.test(tok)) return tok;
            const m = tok.match(/^([^A-Za-z]*)([A-Za-z'’-]+)(.*)$/);
            if (!m) return tok;
            const entry = highlight ? lookup(m[2]) : undefined;
            const known = entry && getState().srs[entry.id];
            const cls = 'w' + (highlight && entry ? (known ? ' w-known' : ' w-dict') : highlight ? ' w-unknown' : '');
            return (
              <span key={i}>
                {m[1]}
                <span className={cls} onClick={() => setSel({ word: m[2], sentence: p })}>
                  {m[2]}
                </span>
                {m[3]}
              </span>
            );
          })}
        </p>
      ))}
      {sel && <Gloss word={sel.word} sentence={sel.sentence} onClose={() => setSel(null)} />}
    </div>
  );
}

export function Gloss({ word, sentence, onClose }: { word: string; sentence: string; onClose: () => void }) {
  const entry = lookup(word);
  const [es, setEs] = useState('');
  const [added, setAdded] = useState(false);
  const inSrs = entry && getState().srs[entry.id];
  const sent = (sentence.match(new RegExp(`[^.!?]*\\b${word.replace(/[^A-Za-z]/g, '.')}\\b[^.!?]*[.!?]?`)) || [sentence])[0].trim();
  const addToSrs = (id: string) => {
    update((s) => {
      if (!s.srs[id]) s.srs[id] = { due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
    });
    setAdded(true);
  };
  const addCustom = () => {
    if (!es.trim()) return;
    const id = 'c:' + word.toLowerCase();
    update((s) => {
      if (!s.customWords.some((c) => c.id === id)) s.customWords.push({ id, word: word.toLowerCase(), es: es.trim(), ex: sent.replace(new RegExp(`\\b${word}\\b`), `*${word}*`), t: Date.now() });
      s.srs[id] = { due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
    });
    setAdded(true);
  };
  const q = encodeURIComponent(word.toLowerCase());
  return (
    <div className="gloss-backdrop" onClick={onClose}>
      <div className="gloss" onClick={(e) => e.stopPropagation()}>
        <div className="gloss-head">
          <b>{entry?.word ?? word}</b> <Speak text={entry?.word ?? word} />
          <button className="icon-btn close" onClick={onClose}>✕</button>
        </div>
        {entry ? (
          <>
            <div className="gloss-es">
              {entry.es} <span className="muted">{entry.pos} · {TAG_NAME[entry.tag]}</span>
            </div>
            {entry.note && <div className="muted small">{entry.note}</div>}
            {entry.ex && <div className="gloss-ex">{entry.ex.replace(/\*/g, '')}</div>}
            {inSrs || added ? <div className="ok small">✓ En tu repaso</div> : <button className="btn small" onClick={() => addToSrs(entry.id)}>+ Añadir a repaso</button>}
          </>
        ) : added ? (
          <div className="ok small">✓ Guardada en «Mis palabras» y en repaso</div>
        ) : (
          <>
            <div className="muted small">No está en el diccionario de la app. Búscala y guárdala con tu traducción:</div>
            <div className="row">
              <input value={es} onChange={(e) => setEs(e.target.value)} placeholder="significado en español" onKeyDown={(e) => e.key === 'Enter' && addCustom()} />
              <button className="btn small" onClick={addCustom}>Guardar</button>
            </div>
          </>
        )}
        <div className="gloss-links">
          <a href={`https://www.wordreference.com/enes/${q}`} target="_blank" rel="noreferrer">WordReference</a>
          <a href={`https://dictionary.cambridge.org/dictionary/english-spanish/${q}`} target="_blank" rel="noreferrer">Cambridge</a>
          <a href={`https://www.oxfordlearnersdictionaries.com/search/english/?q=${q}`} target="_blank" rel="noreferrer">Oxford</a>
          <a href={`https://youglish.com/pronounce/${q}/english`} target="_blank" rel="noreferrer">YouGlish</a>
        </div>
      </div>
    </div>
  );
}

export function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div className={'card ' + className + (onClick ? ' clickable' : '')} onClick={onClick}>
      {children}
    </div>
  );
}

/** Maestría por evaluación continua: nivel actual (10 / 100 / 300 / 600 / 1.000 aciertos en días distintos) y lo que falta. */
export function MasteryBar({ ev, label, compact, blind }: { ev?: Ev; label?: string; compact?: boolean; blind?: number }) {
  const p = tierProgress(ev, blind);
  const t = TIERS[p.tier];
  const acc = Math.round(recentAcc(ev) * 100);
  return (
    <div className={'mastery' + (compact ? ' compact' : '')}>
      <div className="mastery-head">
        {label && <span className="mastery-label">{label}</span>}
        <span className={'tier-chip t' + p.tier}>
          {t.icon} {t.name}
        </span>
      </div>
      <div className="mastery-track" aria-label={`Progreso hacia ${p.next?.name ?? 'el máximo'}`}>
        <div style={{ width: `${Math.round(p.pct * 100)}%` }} />
      </div>
      <div className="mastery-meta">
        {p.next ? (
          <>
            <span>
              <b>{p.hits.toLocaleString('es')}</b>/{p.next.hits.toLocaleString('es')} aciertos
            </span>
            <span>
              <b>{p.days}</b>/{p.next.days} días
            </span>
            {p.blindNeed ? (
              <span title="Aciertos a ciegas: en la Rueda, sin saber de qué tema es la pregunta">
                <b>{p.blind}</b>/{p.blindNeed} a ciegas
              </span>
            ) : null}
            {ev && ev.h + ev.m > 0 && <span>{acc} % reciente</span>}
            <span className="muted">→ {p.next.icon} {p.next.name}</span>
          </>
        ) : (
          <span>
            {p.hits.toLocaleString('es')} aciertos en {p.days} días · nivel máximo
          </span>
        )}
      </div>
    </div>
  );
}

const STAGE_ORDER: Stage[] = ['mature', 'solid', 'young', 'learning'];
export function StageBar({ n, total, thin }: { n: Record<Stage, number>; total: number; thin?: boolean }) {
  return (
    <div className={'stagebar' + (thin ? ' thin' : '')} role="img" aria-label={STAGE_ORDER.map((k) => `${STAGE_NAME[k]} ${n[k]}`).join(', ')}>
      {STAGE_ORDER.map((k) => (n[k] ? <i key={k} className={'s-' + k} style={{ width: `${(n[k] / Math.max(1, total)) * 100}%` }} title={`${STAGE_NAME[k]}: ${n[k]}`} /> : null))}
    </div>
  );
}
