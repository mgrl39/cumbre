import { useEffect, useState } from 'react';
import { useStore, update, getState } from '../core/store.ts';
import { GAMES, GROUP_NAME, GAME_LENGTHS, hasLengths, type GameGroup } from '../core/plans.ts';
import { vocab } from '../core/content.ts';
import { shuffle } from '../core/text.ts';
import { applyResult } from '../core/progress.ts';
import { vocabExercise } from '../core/generate.ts';
import { Card, go } from '../ui/common.tsx';
import { TIERS, tierOf } from '../core/mastery.ts';
import { GMODES } from '../core/grammarGames.ts';

export default function GamesPage() {
  const records = useStore((s) => s.records);
  const ev = useStore((s) => s.ev);
  const groups = Object.keys(GROUP_NAME) as GameGroup[];
  const played = GAMES.filter((g) => ev['gm:' + g.id]).length;
  return (
    <div className="page">
      <h1>Juegos</h1>
      <p className="lede">{GAMES.length + 1} juegos adaptados a tu nivel. Cada uno tiene dos modos: <b>∞ infinito</b> (con vidas, hasta que caigas: récord de aciertos) o <b>de 10, 20 o 30 preguntas</b> (sin vidas: récord de tu mejor partida completa). Cada acierto da XP y suma a la maestría del juego. Has jugado a {played} de {GAMES.length}. Además, cada tema, tramo y nivel de <a href="#/grammar">Grammar</a> tiene sus propios {GMODES.length} juegos.</p>
      <div className="chips" style={{ marginBottom: 8 }}>
        {groups.map((g) => (
          <a key={g} className="chip" href={`#/games`} onClick={(e) => { e.preventDefault(); document.getElementById('grp-' + g)?.scrollIntoView({ behavior: 'smooth' }); }}>{GROUP_NAME[g].name} <b>{GAMES.filter((x) => x.group === g).length + (g === 'quick' ? 1 : 0)}</b></a>
        ))}
      </div>
      {groups.map((g) => (
        <section key={g} id={'grp-' + g}>
          <div className="section-title">
            <h2>{GROUP_NAME[g].name}</h2>
            <span className="muted small">{GROUP_NAME[g].desc}</span>
          </div>
          <div className="game-grid">
            {GAMES.filter((x) => x.group === g).map((x) => (
              <div key={x.id} className="game">
                <span className="g-top">
                  <span className="g-icon">{x.icon}</span>
                  <span className="row gap" style={{ alignItems: 'center' }}>
                    {records[x.id] ? <span className="rec" title="Récord en modo infinito">🏆 {records[x.id]}</span> : null}
                    <span className={'tier-chip t' + tierOf(ev['gm:' + x.id])} title={`Maestría del juego: ${ev['gm:' + x.id]?.h ?? 0} aciertos en ${ev['gm:' + x.id]?.d ?? 0} días`}>{TIERS[tierOf(ev['gm:' + x.id])].icon} {TIERS[tierOf(ev['gm:' + x.id])].name}</span>
                  </span>
                </span>
                <b>{x.name}</b>
                <small>{x.desc}</small>
                <div className="g-modes">
                  <button className="g-mode inf" onClick={() => go(`#/game/${x.id}`)} title={hasLengths(x.id) ? 'Infinito: con vidas, hasta caer' : 'Jugar'}>
                    {hasLengths(x.id) ? '∞' : 'Jugar'}
                  </button>
                  {hasLengths(x.id) &&
                    GAME_LENGTHS.map((n) => (
                      <button key={n} className="g-mode" onClick={() => go(`#/game/${x.id}/${n}`)} title={records[`${x.id}:${n}`] !== undefined ? `Récord: ${records[`${x.id}:${n}`]}/${n}` : `${n} preguntas`}>
                        {n}
                        {records[`${x.id}:${n}`] !== undefined && <i>{records[`${x.id}:${n}`]}</i>}
                      </button>
                    ))}
                </div>
              </div>
            ))}
            {g === 'quick' && (
              <button className="game" onClick={() => go('#/pairs')}>
                <span className="g-top">
                  <span className="g-icon">🃏</span>
                  {records.parejas ? <span className="rec">🏆 {records.parejas}s</span> : null}
                </span>
                <b>Parejas</b>
                <small>Une 6 palabras con su significado lo más rápido posible.</small>
              </button>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

/* Parejas: une inglés-español contra el reloj (récord = menor tiempo, guardado como segundos) */
export function Pairs() {
  const make = () => {
    const s = getState();
    const lv = Math.max(1, Math.min(5, Math.floor(s.skills.vocab.r)));
    const pool = vocab.filter((v) => Math.abs(v.level - lv) <= 1 && v.tag !== 'phrase' && v.es.length < 40);
    const set = shuffle(pool).slice(0, 6);
    return { set, left: shuffle(set), right: shuffle(set) };
  };
  const [g, setG] = useState(make);
  const [selL, setSelL] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [bad, setBad] = useState<string | null>(null);
  const [t0, setT0] = useState(Date.now());
  const [now, setNow] = useState(Date.now());
  const [errors, setErrors] = useState(0);
  const finished = done.length === g.set.length;
  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [finished]);
  const secs = Math.round(((finished ? now : Date.now()) - t0) / 1000);

  const pickR = (id: string) => {
    if (!selL) return;
    const e = g.set.find((x) => x.id === selL)!;
    const ok = selL === id;
    applyResult(vocabExercise(e, 'en-es'), ok);
    if (ok) {
      const nd = [...done, id];
      setDone(nd);
      if (nd.length === g.set.length) {
        const total = Math.round((Date.now() - t0) / 1000) + errors * 3;
        setNow(Date.now());
        const prev = getState().records.parejas;
        if (!prev || total < prev) update((s) => void (s.records.parejas = total));
      }
    } else {
      setErrors((x) => x + 1);
      setBad(id);
      setTimeout(() => setBad(null), 400);
    }
    setSelL(null);
  };
  const again = () => {
    setG(make());
    setDone([]);
    setSelL(null);
    setErrors(0);
    setT0(Date.now());
    setNow(Date.now());
  };
  return (
    <div className="page narrow">
      <div className="row between">
        <a href="#/games" className="back">← Juegos</a>
        <span>⏱ {secs}s · ✗ {errors} (+3s c/u)</span>
      </div>
      <h1>Parejas</h1>
      <div className="pairs">
        <div>
          {g.left.map((v) => (
            <button key={v.id} className={'option' + (done.includes(v.id) ? ' correct' : selL === v.id ? ' selected' : '')} disabled={done.includes(v.id)} onClick={() => setSelL(v.id)}>
              {v.word}
            </button>
          ))}
        </div>
        <div>
          {g.right.map((v) => (
            <button key={v.id} className={'option' + (done.includes(v.id) ? ' correct' : bad === v.id ? ' wrong' : '')} disabled={done.includes(v.id)} onClick={() => pickR(v.id)}>
              {v.es}
            </button>
          ))}
        </div>
      </div>
      {finished && (
        <Card className="center">
          <h2>¡Hecho en {secs + errors * 3}s!</h2>
          <div className="muted">Récord: {getState().records.parejas}s</div>
          <button className="btn primary" onClick={again}>Otra ronda</button>
        </Card>
      )}
    </div>
  );
}
