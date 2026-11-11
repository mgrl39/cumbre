import { useMemo, useState } from 'react';
import { useStore, update } from '../core/store.ts';
import { textLevel } from '../core/writingCheck.ts';
import { checkAchievementsOutside } from '../core/progress.ts';
import { speak, stopSpeaking } from '../core/speech.ts';
import { Card, WordText, lookup } from '../ui/common.tsx';

/* Lector libre: pega cualquier artículo, apuntes o temario en inglés. */
export default function Lector() {
  const s = useStore((x) => x);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [reading, setReading] = useState(false);

  const stats = useMemo(() => {
    const words = text.match(/[A-Za-z][A-Za-z'’-]*/g) || [];
    if (!words.length) return null;
    let inDict = 0,
      known = 0;
    const unknown = new Map<string, number>();
    const toLearn = new Map<string, number>();
    for (const w of words) {
      const e = lookup(w);
      if (e) {
        inDict++;
        if (s.srs[e.id]) known++;
        else if (e.level >= 3) toLearn.set(e.word, (toLearn.get(e.word) || 0) + 1);
      } else if (w.length > 6) unknown.set(w.toLowerCase(), (unknown.get(w.toLowerCase()) || 0) + 1);
    }
    return {
      words: words.length,
      inDict,
      known,
      lv: textLevel(text),
      minutes: Math.ceil(words.length / 150),
      unknown: [...unknown.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
      toLearn: [...toLearn.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30),
    };
  }, [text, s.srs]);

  const save = () => {
    update((x) => {
      x.savedTexts.unshift({ id: String(Date.now()), title: title || text.slice(0, 40) + '…', text, t: Date.now() });
      x.savedTexts = x.savedTexts.slice(0, 50);
    });
    checkAchievementsOutside();
  };

  if (reading)
    return (
      <div className="page narrow">
        <button className="link" onClick={() => (stopSpeaking(), setReading(false))}>← Volver al editor</button>
        <h1>{title || 'Lectura'}</h1>
        <div className="row gap small">
          <button className="btn small" onClick={() => speak(text)}>🔊 Leer en voz alta</button>
          <button className="btn small ghost" onClick={stopSpeaking}>⏹</button>
        </div>
        <Card className="reading-text">
          <WordText text={text} highlight />
        </Card>
        <div className="legend small muted">
          <span className="w w-dict">en el diccionario</span> <span className="w w-known">en tu repaso</span> <span className="w w-unknown">fuera del diccionario: tócala, búscala y guárdala con tu traducción</span>
        </div>
      </div>
    );

  return (
    <div className="page">
      <h1>Lector</h1>
      <p className="muted">
        Para tu objetivo real: <b>entender artículos y estudiar temario en inglés</b>. Pega un texto (un paper, una noticia, apuntes…) y te digo su dificultad aproximada, qué palabras del diccionario aún no tienes y cuáles no conoce la app. Toca cualquier palabra para verla, buscarla en un diccionario externo y guardarla con tu traducción en tu repaso.
      </p>
      <input placeholder="Título (opcional)" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea rows={10} placeholder="Pega aquí el texto en inglés…" value={text} onChange={(e) => setText(e.target.value)} />
      {stats && (
        <>
          <div className="big-stats">
            <div><b>{stats.lv.cefr}</b><span>dificultad aprox.</span></div>
            <div><b>{stats.words}</b><span>palabras · {stats.minutes} min</span></div>
            <div><b>{Math.round((stats.inDict / stats.words) * 100)}%</b><span>cubierto por el diccionario</span></div>
          </div>
          <div className="row gap">
            <button className="btn primary" onClick={() => setReading(true)}>📖 Leer con ayuda</button>
            <button className="btn ghost" onClick={save}>💾 Guardar en mi biblioteca</button>
          </div>
          <div className="grid2">
            {stats.toLearn.length > 0 && (
              <Card>
                <h3>Vocabulario útil que aún no estudias</h3>
                <div className="chips">
                  {stats.toLearn.map(([w, n]) => {
                    const e = lookup(w)!;
                    return (
                      <button key={w} className="chip" title={e.es} onClick={() => update((x) => void (x.srs[e.id] ||= { due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 }))}>
                        {w} <span className="muted">×{n}</span> +
                      </button>
                    );
                  })}
                </div>
                <div className="muted small">Pulsa para añadirlas a tu repaso.</div>
              </Card>
            )}
            {stats.unknown.length > 0 && (
              <Card>
                <h3>Palabras largas fuera del diccionario</h3>
                <div className="chips">
                  {stats.unknown.map(([w, n]) => (
                    <a key={w} className="chip" href={`https://www.wordreference.com/enes/${encodeURIComponent(w)}`} target="_blank" rel="noreferrer">
                      {w} <span className="muted">×{n}</span>
                    </a>
                  ))}
                </div>
                <div className="muted small">Suelen ser términos técnicos de tu campo. Guárdalas desde «Leer con ayuda».</div>
              </Card>
            )}
          </div>
        </>
      )}
      {s.savedTexts.length > 0 && (
        <>
          <h3>Mi biblioteca</h3>
          {s.savedTexts.map((t) => (
            <Card key={t.id} className="row between">
              <span className="clickable" onClick={() => (setText(t.text), setTitle(t.title), setReading(true))}>
                📄 {t.title} <span className="muted small">{new Date(t.t).toLocaleDateString('es')}</span>
              </span>
              <button className="icon-btn" onClick={() => update((x) => void (x.savedTexts = x.savedTexts.filter((y) => y.id !== t.id)))}>🗑️</button>
            </Card>
          ))}
        </>
      )}
      {s.customWords.length > 0 && (
        <>
          <h3>Mis palabras ({s.customWords.length})</h3>
          <div className="chips">
            {s.customWords.map((c) => (
              <span key={c.id} className="chip" title={c.ex}>
                {c.word} = {c.es}
                <button className="icon-btn" onClick={() => update((x) => { x.customWords = x.customWords.filter((y) => y.id !== c.id); delete x.srs[c.id]; })}>✕</button>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
