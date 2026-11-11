import { useMemo, useState } from 'react';
import { useStore, update } from '../core/store.ts';
import { vocabStats } from '../core/curriculum.ts';
import { vocab, cleanEx } from '../core/content.ts';
import { stage, STAGE_NAME, STAGE_HINT, type Stage } from '../core/srs.ts';
import { TAG_NAME } from '../core/generate.ts';
import { LEVELS } from '../core/types.ts';
import { levelOf } from '../core/rating.ts';
import { Card, LevelBar, Speak, StageBar, go } from '../ui/common.tsx';

export default function VocabPage() {
  const s = useStore((x) => x);
  const [q, setQ] = useState('');
  const [tag, setTag] = useState('');
  const [lv, setLv] = useState(0);
  const [st, setSt] = useState<Stage | ''>('');
  const all = useMemo(() => [...vocab, ...s.customWords.map((c) => ({ id: c.id, word: c.word, pos: '', es: c.es, ex: c.ex, level: 4, tag: 'custom' as const, note: undefined }))], [s.customWords]);
  const counts: Record<Stage, number> = { new: 0, learning: 0, young: 0, solid: 0, mature: 0 };
  all.forEach((v) => counts[stage(s.srs[v.id])]++);
  const due = Object.keys(s.srs).filter((id) => (id.startsWith('v:') || id.startsWith('c:')) && s.srs[id].due <= Date.now()).length;
  const list = all.filter(
    (v) =>
      (!tag || v.tag === tag) &&
      (!lv || v.level === lv) &&
      (!st || stage(s.srs[v.id]) === st) &&
      (!q || v.word.toLowerCase().includes(q.toLowerCase()) || v.es.toLowerCase().includes(q.toLowerCase())),
  );
  const tags = Object.keys(TAG_NAME);
  const vs = vocabStats(s);
  const packs = LEVELS.slice(0, 5).map((l, i) => ({ l, lv: i + 1, ...vocabStats(s, vocab.filter((v) => v.level === i + 1)) }));
  return (
    <div className="page">
      <h1>Vocabulary</h1>
      <LevelBar r={s.skills.vocab.r} />
      <p className="muted">
        Tu nivel: <b>{levelOf(s.skills.vocab.r).label}</b>. {all.length.toLocaleString('es')} entradas: vocabulario general por frecuencia, <b>académico</b> (para artículos y temario), conectores, phrasal verbs, falsos amigos y frases para defenderte. Las palabras que tocas en las lecturas y el Lector también entran aquí.
      </p>
      <Card className="goal-card">
        <div className="row between wrap">
          <h3 style={{ margin: 0 }}>Objetivo: 8.000 palabras dominadas</h3>
          <b className="big-num">{vs.n.mature.toLocaleString('es')} <span className="muted small">/ 8.000</span></b>
        </div>
        <StageBar n={vs.n} total={8000} />
        <p className="muted small" style={{ margin: '8px 0 0' }}>
          Una palabra solo cuenta como <b>dominada</b> cuando la has acertado en 5+ días distintos y aguanta 2 meses sin verla. Llevas {vs.started.toLocaleString('es')} en marcha. Cada día entran unas pocas nuevas (máximo {s.settings.newWordsMax}), por frecuencia. Si una ya la sabes, «Ya me la sé: pruébame» te la pregunta sin pistas.
        </p>
        <div className="packs">
          {packs.map((p) => (
            <div key={p.l} className="pack">
              <div className="row between small"><b>{p.l}</b><span className="muted" title="dominadas / total">{p.n.mature}/{p.total}</span></div>
              <StageBar n={p.n} total={p.total} thin />
              <div className="muted tiny">{p.started} en marcha</div>
              {p.n.new > 0 && (
                <button className="link small" title={`Test de 20 palabras de ${p.l} que aún no tienes dominadas`} onClick={() => go(`#/prove/${p.lv}`)}>Demostrar →</button>
              )}
            </div>
          ))}
        </div>
      </Card>
      <div className="stage-row">
        {(Object.keys(counts) as Stage[]).map((k) => (
          <div key={k} className={'stage-box s-' + k} title={STAGE_HINT[k]}>
            <b>{counts[k]}</b>
            <span>{STAGE_NAME[k]}</span>
          </div>
        ))}
      </div>
      <div className="row gap wrap">
        <button className="btn primary" onClick={() => go('#/flow/vocab')}>🌊 Aprender y practicar</button>
        <button className="btn" disabled={!due} onClick={() => go('#/review')}>🔁 Repasar ({due})</button>
        <button className="btn ghost" onClick={() => go('#/pairs')}>🃏 Parejas</button>
      </div>
      <h3>Practicar por grupo</h3>
      <div className="row gap wrap">
        {tags.filter((t) => t !== 'core' && (t !== 'custom' || s.customWords.length >= 4)).map((t) => (
          <button key={t} className="btn small ghost" onClick={() => go(`#/practice/vocab/${t}`)}>
            {TAG_NAME[t]}
          </button>
        ))}
      </div>
      <h3>Diccionario</h3>
      <div className="filters">
        <input placeholder="Buscar en inglés o español…" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">Todos los grupos</option>
          {tags.map((t) => (
            <option key={t} value={t}>{TAG_NAME[t]}</option>
          ))}
        </select>
        <select value={lv} onChange={(e) => setLv(Number(e.target.value))}>
          <option value={0}>Todos los niveles</option>
          {LEVELS.slice(0, 5).map((l, i) => (
            <option key={l} value={i + 1}>{l}</option>
          ))}
        </select>
        <select value={st} onChange={(e) => setSt(e.target.value as Stage)}>
          <option value="">Cualquier estado</option>
          {(Object.keys(STAGE_NAME) as Stage[]).map((k) => (
            <option key={k} value={k}>{STAGE_NAME[k]}</option>
          ))}
        </select>
      </div>
      <div className="muted small">{list.length} resultados</div>
      <div className="word-list">
        {list.slice(0, 300).map((v) => {
          const sg = stage(s.srs[v.id]);
          return (
            <Card key={v.id} className="word-row">
              <div className="row between">
                <span>
                  <b>{v.word}</b> <span className="muted small">{v.pos}</span> <Speak text={v.word} slow={false} />
                </span>
                <span className="small">
                  <span className="tag">{LEVELS[v.level - 1]}</span> <span className={'stage-dot s-' + sg}>{STAGE_NAME[sg]}</span>
                </span>
              </div>
              <div>{v.es}</div>
              {v.ex && <div className="muted small">{cleanEx(v.ex)}</div>}
              {v.note && <div className="small note">💡 {v.note}</div>}
              {s.srs[v.id] && <WordEvidence c={s.srs[v.id]} />}
              {sg === 'new' && (
                <button className="link small" onClick={() => update((x) => void (x.srs[v.id] = { due: Date.now(), ivl: 0, ease: 2.5, reps: 0, lapses: 0 }))}>
                  + añadir a repaso
                </button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function WordEvidence({ c }: { c: import('../core/store.ts').SrsCard }) {
  const days = Math.round((c.due - Date.now()) / 86_400_000);
  return (
    <div className="evidence tiny muted">
      ✓ {c.h ?? 0} aciertos · {c.dd ?? 0} {c.dd === 1 ? 'día' : 'días distintos'} · {c.lapses} fallos · {days <= 0 ? 'toca repasar' : `próximo repaso en ${days} d`}
    </div>
  );
}
