/* Repaso: lo que has fallado (con tu respuesta y la correcta), el repaso espaciado y los temas flojos. */
import { useState } from 'react';
import { useStore } from '../core/store.ts';
import { SKILLS, SKILL_NAME, type Skill } from '../core/types.ts';
import { pendingFails } from '../core/plans.ts';
import { topicById } from '../core/content.ts';
import { recentAcc } from '../core/mastery.ts';
import { today } from '../core/text.ts';
import { Card, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';

const ago = (t: number) => {
  const d = Math.floor((Date.now() - t) / 86_400_000);
  return d <= 0 ? 'hoy' : d === 1 ? 'ayer' : `hace ${d} días`;
};

export default function RepasoPage() {
  const s = useStore((x) => x);
  const [skill, setSkill] = useState<Skill | 'all'>('all');
  const [n, setN] = useState(15);
  const all = pendingFails(s, {}, true);
  const todo = pendingFails(s);
  const dk = today();
  const due = Object.values(s.srs).filter((c) => c.due <= Date.now()).length;
  const bySkill = SKILLS.map((k) => ({ k, total: all.filter(([, f]) => f.sk === k).length, todo: todo.filter(([, f]) => f.sk === k).length })).filter((x) => x.total);
  const list = all.filter(([, f]) => skill === 'all' || f.sk === skill);
  // temas de gramática flojos: menos del 70 % en las últimas respuestas, con al menos 4 respondidas
  const weak = Object.entries(s.topics)
    .filter(([id, t]) => topicById.has(id) && t.s >= 4)
    .map(([id, t]) => ({ id, acc: recentAcc(s.ev['t:' + id]) || t.c / t.s, fails: all.filter(([, f]) => f.tp === id).length }))
    .filter((x) => x.acc < 0.7 || x.fails >= 3)
    .sort((a, b) => a.acc - b.acc)
    .slice(0, 8);

  return (
    <div className="page">
      <h1>Repaso</h1>
      <p className="lede">
        Aquí vuelve lo que ya te han preguntado y <b>has fallado</b>. Cada fallo se queda apuntado con lo que respondiste y con la respuesta correcta, y solo se borra cuando lo aciertas en <b>2 días distintos</b>. Acertarlo hoy lo quita de la tanda de hoy; mañana vuelve para confirmarlo.
      </p>

      <div className="repaso-top">
        <Card className="repaso-main">
          <div className="eyebrow">Fallos pendientes</div>
          <div className="repaso-num">
            <b>{todo.length}</b>
            <span>para hoy{all.length > todo.length ? ` · ${all.length - todo.length} ya corregidos hoy, vuelven mañana` : ''}</span>
          </div>
          <button className="btn primary" disabled={!todo.length} onClick={() => go('#/fails')}>
            <Icon name="repeat" size={16} /> {todo.length ? `Repasar mis fallos (${Math.min(20, todo.length)})` : all.length ? 'Hecho por hoy' : 'Sin fallos pendientes'}
          </button>
          {bySkill.length > 0 && (
            <div className="chips" style={{ marginTop: 12 }}>
              {bySkill.map(({ k, todo: t, total }) => (
                <button key={k} className="chip" disabled={!t} onClick={() => go(`#/fails/${k}`)} title={`${total} fallos apuntados en ${SKILL_NAME[k]}`}>
                  {SKILL_NAME[k]} <b>{t}</b>
                </button>
              ))}
            </div>
          )}
        </Card>
        <Card>
          <div className="eyebrow">Repaso espaciado</div>
          <div className="repaso-num">
            <b>{due}</b>
            <span>palabras y preguntas a las que hoy les toca volver</span>
          </div>
          <button className="btn" disabled={!due} onClick={() => go('#/review')}>
            {due ? 'Repasar ahora' : 'Nada pendiente'}
          </button>
          <p className="muted small" style={{ marginBottom: 0 }}>Cada palabra vuelve cada vez más tarde si la aciertas, y al día siguiente si la fallas.</p>
        </Card>
      </div>

      {weak.length > 0 && (
        <Card>
          <h3>Temas que más te cuestan</h3>
          <div className="weak-list">
            {weak.map((w) => (
              <div key={w.id} className="weak-row">
                <a href={`#/grammar/${w.id}`} className="grow">{topicById.get(w.id)!.title}</a>
                <span className="muted small">{Math.round(w.acc * 100)} % reciente{w.fails ? ` · ${w.fails} fallos` : ''}</span>
                <button className="btn small" disabled={!todo.some(([, f]) => f.tp === w.id)} onClick={() => go(`#/fails/t:${w.id}`)}>Repasar</button>
                <button className="btn small ghost" onClick={() => go(`#/grammar/${w.id}`)}>Ver regla</button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card>
        <div className="row between" style={{ flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ margin: 0 }}>Lo que has fallado ({list.length})</h3>
          <div className="chips">
            <button className={'chip' + (skill === 'all' ? ' on' : '')} onClick={() => setSkill('all')}>Todo</button>
            {bySkill.map(({ k }) => (
              <button key={k} className={'chip' + (skill === k ? ' on' : '')} onClick={() => setSkill(k)}>{SKILL_NAME[k]}</button>
            ))}
          </div>
        </div>
        {!list.length && <p className="muted">Nada apuntado. Cuando falles algo en cualquier sesión, juego o examen, aparecerá aquí.</p>}
        {list.slice(0, n).map(([id, f]) => (
          <div key={id} className="fail-row">
            <div className="row between">
              <span className="muted tiny">{f.l}</span>
              <span className="muted tiny">
                {f.n > 1 ? `fallado ${f.n} veces · ` : ''}{ago(f.t)} · {f.fd === dk ? 'corregido hoy, falta otro día' : f.fix ? 'corregido 1 de 2 días' : 'sin corregir'}
              </span>
            </div>
            <div className="fail-q">{f.q}</div>
            <div className="cmp">
              <div className="cmp-row bad"><span className="cmp-k">Tu respuesta</span><span className="cmp-v">{f.g || <i>sin responder</i>}</span></div>
              <div className="cmp-row ok"><span className="cmp-k">Correcta</span><span className="cmp-v"><b>{f.a}</b></span></div>
            </div>
          </div>
        ))}
        {list.length > n && <button className="link" onClick={() => setN(n + 30)}>Ver más ({list.length - n})</button>}
      </Card>
    </div>
  );
}
