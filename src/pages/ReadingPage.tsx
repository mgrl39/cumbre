import { useEffect, useRef, useState } from 'react';
import { useStore } from '../core/store.ts';
import { readings, readingById } from '../core/content.ts';
import { LEVELS } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { speak, stopSpeaking } from '../core/speech.ts';
import { Card, LevelBar, WordText, go } from '../ui/common.tsx';

export default function ReadingPage({ textId }: { textId?: string }) {
  const s = useStore((x) => x);
  if (textId) return <Reader id={textId} />;
  const lv = Math.floor(s.skills.reading.r);
  return (
    <div className="page">
      <h1>Reading</h1>
      <LevelBar r={s.skills.reading.r} />
      <p className="muted">
        Tu nivel: <b>{levelOf(s.skills.reading.r).label}</b>. Lee el texto entero, toca cualquier palabra para ver su significado y añadirla a tu repaso, y después responde. Truco: lee primero <b>sin</b> tocar palabras y adivina por contexto; luego relee comprobando. Para textos reales, usa el <a href="#/lector">Lector</a>.
      </p>
      {LEVELS.slice(0, 5).map((l, i) => {
        const list = readings.filter((r) => r.level === l);
        if (!list.length) return null;
        return (
          <section key={l}>
            <h2>
              {l} {i + 1 === lv && <span className="tag">tu nivel</span>} {i + 1 === lv + 1 && <span className="tag">reto</span>}
            </h2>
            <div className="topic-grid">
              {list.map((r) => {
                const done = s.readTexts[r.id];
                return (
                  <Card key={r.id} onClick={() => go(`#/reading/${r.id}`)}>
                    <div className="row between">
                      <b>{r.title}</b>
                      {done && <span className={done.best >= 80 ? 'ok' : 'muted'}>{done.best}%</span>}
                    </div>
                    <div className="muted small">
                      {r.topic} · {r.text.split(/\s+/).length} palabras
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Reader({ id }: { id: string }) {
  const t = readingById.get(id);
  const start = useRef(Date.now());
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  if (!t) return <div className="page">Texto no encontrado</div>;
  const words = t.text.split(/\s+/).length;
  const toQuestions = (audio = false) => {
    const mins = (Date.now() - start.current) / 60000;
    const wpm = Math.round(words / Math.max(0.3, mins));
    try {
      sessionStorage.setItem('wpm:' + t.id, String(wpm));
    } catch {
      /* sin storage */
    }
    go(`#/read/${t.id}${audio ? '/audio' : ''}`);
  };
  return (
    <div className="page narrow">
      <a href="#/reading" className="back">← Reading</a>
      <h1>
        {t.title} <span className="tag">{t.level}</span>
      </h1>
      <div className="muted small">
        {t.topic} · {words} palabras ·{' '}
        <button
          className="link"
          onClick={() => {
            if (playing) {
              stopSpeaking();
              setPlaying(false);
            } else {
              setPlaying(true);
              speak(t.text, { onEnd: () => setPlaying(false) });
            }
          }}
        >
          {playing ? '⏹ Parar' : '🔊 Escuchar el texto'}
        </button>
      </div>
      <Card className="reading-text">
        <WordText text={t.text} highlight />
      </Card>
      <div className="legend small muted">
        <span className="w w-dict">palabra del diccionario</span> <span className="w w-known">en tu repaso</span> — toca cualquiera para ver su significado.
      </div>
      <div className="row gap">
        <button className="btn primary" onClick={() => toQuestions()}>Responder preguntas ({t.questions.length})</button>
        <button className="btn ghost" onClick={() => toQuestions(true)}>🎧 Modo oído (sin texto)</button>
      </div>
    </div>
  );
}
