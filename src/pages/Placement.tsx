import { useState } from 'react';
import { useStore } from '../core/store.ts';
import { SKILLS, SKILL_ICON, SKILL_NAME, type Skill } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { Card, go } from '../ui/common.tsx';

const DESC: Record<Skill, string> = {
  grammar: '14 preguntas: tiempos verbales, condicionales, pasiva, inversión…',
  vocab: '16 palabras: desde lo básico hasta vocabulario académico C1.',
  reading: '3 textos cortos con preguntas de comprensión.',
  listening: '12 audios: dictados, frases casi iguales y palabras.',
  writing: '10 ítems: transformaciones, errores típicos, traducción y cohesión.',
};

export default function Placement() {
  const s = useStore((x) => x);
  const [sel, setSel] = useState<Skill[]>(SKILLS.filter((k) => !s.skills[k].placed).length ? SKILLS.filter((k) => !s.skills[k].placed) : [...SKILLS]);
  const toggle = (k: Skill) => setSel(sel.includes(k) ? sel.filter((x) => x !== k) : [...sel, k]);
  return (
    <div className="page">
      <h1>Prueba de nivel</h1>
      <p className="muted">
        Es <b>adaptativa</b>: si aciertas, sube la dificultad; si fallas, baja. Así se encuentra tu nivel real en pocas preguntas. Cada skill se mide <b>por separado</b>: puedes ser B2 en vocabulario y A2 en gramática, y la app te entrenará en consecuencia.
        No uses diccionario: si no lo sabes, responde lo que creas — el resultado es más útil.
      </p>
      <div className="grid2">
        {SKILLS.map((k) => (
          <Card key={k} className={sel.includes(k) ? 'selected' : ''} onClick={() => toggle(k)}>
            <div className="row between">
              <b>{SKILL_ICON[k]} {SKILL_NAME[k]}</b>
              <span>{sel.includes(k) ? '☑️' : '⬜'}</span>
            </div>
            <div className="muted small">{DESC[k]}</div>
            {s.skills[k].placed && <div className="small">Nivel actual: <b>{levelOf(s.skills[k].r).label}</b></div>}
          </Card>
        ))}
      </div>
      <button className="btn primary wide" disabled={!sel.length} onClick={() => go(`#/placement/run/${sel.join(',')}`)}>
        Empezar ({sel.length} {sel.length === 1 ? 'skill' : 'skills'})
      </button>
      <p className="muted small">Repetir una prueba reinicia el nivel de esa skill (no borra palabras, rangos ni XP).</p>
    </div>
  );
}
