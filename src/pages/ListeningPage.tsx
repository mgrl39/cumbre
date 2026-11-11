import { useSyncExternalStore } from 'react';
import { useStore } from '../core/store.ts';
import { readings } from '../core/content.ts';
import { levelOf } from '../core/rating.ts';
import { LEVELS } from '../core/types.ts';
import { neuralStatus, subscribeNeural } from '../core/speech.ts';
import { Card, LevelBar, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';

const MODES = [
  { h: '#/flow/listening', icon: 'play', name: 'Flujo de Listening', desc: 'Mezcla adaptada: dictados, oído fino, palabras y textos.' },
  { h: '#/game/dictado', icon: 'writing', name: 'Dictado', desc: 'Oyes una frase y la escribes. La mejor forma de afinar el oído.' },
  { h: '#/game/oido', icon: 'listening', name: 'Oído fino', desc: 'I worked / I\'ve worked / I\'d worked: distingue lo que suena casi igual.' },
  { h: '#/game/spelling', icon: 'vocab', name: 'Spelling bee', desc: 'Oyes una palabra y la escribes bien.' },
];

export default function ListeningPage() {
  const s = useStore((x) => x);
  const voice = useSyncExternalStore(subscribeNeural, neuralStatus);
  const r = s.skills.listening.r;
  return (
    <div className="page">
      <h1>Listening</h1>
      <LevelBar r={r} />
      <p className="lede">
        Tu nivel: <b>{levelOf(r).label}</b>. Entrena con frases cortas y, cuando te veas con ganas, escucha textos completos sin leerlos. Usa el botón 🐢 para oír en lento: no es trampa, es la forma de empezar.
      </p>
      {voice.state !== 'ready' && s.settings.engine === 'neural' && (
        <Card className="cta">
          <div>
            <b>Mejor con la voz natural</b>
            <div className="muted small">La voz neuronal suena humana y se entiende mucho mejor que la del sistema.</div>
          </div>
          <button className="btn" onClick={() => go('#/settings')}>Activar</button>
        </Card>
      )}
      <div className="game-grid">
        {MODES.map((m) => (
          <button key={m.h} className="game" onClick={() => go(m.h)}>
            <span className="g-icon"><Icon name={m.icon} size={22} /></span>
            <b>{m.name}</b>
            <small>{m.desc}</small>
          </button>
        ))}
      </div>
      <div className="section-title">
        <h2>Textos para escuchar</h2>
        <span className="muted small">Solo audio · el texto aparece al responder</span>
      </div>
      {LEVELS.slice(0, 5).map((l) => {
        const list = readings.filter((x) => x.level === l && !x.long);
        if (!list.length) return null;
        return (
          <div key={l}>
            <h4>{l}</h4>
            <div className="topic-grid">
              {list.map((t) => (
                <Card key={t.id} onClick={() => go(`#/read/${t.id}/audio`)}>
                  <div className="row between">
                    <b>{t.title}</b>
                    {t.real && <span className="tag warm">vida real</span>}
                  </div>
                  <div className="muted small">{t.topic} · {t.questions.length} preguntas</div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
