/* Mapa: el recorrido completo A1 → C1 como grafo. Cada tramo (subnivel) es un nodo central del que cuelgan
   sus temas de gramática, su paquete de vocabulario y sus lecturas, cada uno con su % de dominio REAL
   (evaluación continua: lo visto una vez cuenta casi nada; lo demostrado en días distintos, sí). */
import { useStore } from '../core/store.ts';
import { SUBLEVELS, topicsOf, wordsOf, readingsOf, subProgress, topicMastery, wordMastery, readingMastery, totalProgress, vocabStats } from '../core/curriculum.ts';
import { CAT_NAME, LEVELS, SKILLS, SKILL_NAME } from '../core/types.ts';
import { vocab, readings } from '../core/content.ts';
import { TIERS, topicTier } from '../core/mastery.ts';
import { Card, MasteryBar, StageBar, go } from '../ui/common.tsx';

const COLS = 3;
const W = 210 + COLS * (205 + 14) + 6;
const HUB_X = 92;
const COL0 = 210;
const NODE_W = 205;
const NODE_H = 38;
const GAP_Y = 10;
const GAP_X = 14;

type Node = { key: string; label: string; sub?: string; pct: number; href: string; kind: 'topic' | 'vocab' | 'reading'; tier?: number };

function Ring({ x, y, r, pct, w = 4 }: { x: number; y: number; r: number; pct: number; w?: number }) {
  const c = 2 * Math.PI * r;
  return (
    <g transform={`rotate(-90 ${x} ${y})`}>
      <circle cx={x} cy={y} r={r} className="node-track" strokeWidth={w} />
      {pct > 0.004 && <circle cx={x} cy={y} r={r} className={'node-arc' + (pct >= 0.999 ? ' full' : '')} strokeWidth={w} strokeDasharray={`${Math.max(1.5, c * pct)} ${c}`} />}
    </g>
  );
}
const trunc = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + '…' : s);
const pctTxt = (p: number) => (p > 0 && p < 0.01 ? '<1 %' : `${Math.floor(p * 100)} %`);

export default function MapPage() {
  const s = useStore((x) => x);
  let y = 30;
  const blocks = SUBLEVELS.map((sl) => {
    const words = wordsOf(sl.id);
    const reads = readingsOf(sl.id);
    const nodes: Node[] = [
      { key: sl.id + ':v', label: `Vocabulario clave (${words.length})`, pct: words.length ? words.reduce((a, w) => a + wordMastery(s, w.id), 0) / words.length : 0, href: '#/vocab', kind: 'vocab' },
      { key: sl.id + ':r', label: `Lecturas (${reads.length})`, pct: reads.length ? reads.reduce((a, r) => a + readingMastery(s, r.id), 0) / reads.length : 0, href: '#/reading', kind: 'reading' },
      ...topicsOf(sl.id).map((t) => ({ key: t.id, label: t.title, sub: t.cat ? CAT_NAME[t.cat] : '', pct: topicMastery(s, t.id), href: `#/grammar/${t.id}`, kind: 'topic' as const, tier: topicTier(s, t.id) })),
    ];
    const rows = Math.ceil(nodes.length / COLS);
    const h = Math.max(96, rows * (NODE_H + GAP_Y) - GAP_Y + 28);
    const top = y;
    y += h + 26;
    const placed = nodes.map((n, i) => ({ ...n, x: COL0 + (i % COLS) * (NODE_W + GAP_X), y: top + 14 + Math.floor(i / COLS) * (NODE_H + GAP_Y) }));
    return { sl, top, h, cy: top + h / 2, nodes: placed, prog: subProgress(s, sl.id) };
  });
  const H = y + 10;
  const total = totalProgress(s);
  const bank = LEVELS.slice(0, 5).map((l, i) => ({ l, ...vocabStats(s, vocab.filter((v) => v.level === i + 1)) }));
  const read = LEVELS.slice(0, 5).map((l) => {
    const rs = readings.filter((r) => r.level === l);
    return { l, total: rs.length, done: rs.filter((r) => s.readTexts[r.id]).length, avg: rs.length ? rs.reduce((a, r) => a + readingMastery(s, r.id), 0) / rs.length : 0 };
  });
  return (
    <div className="page wide">
      <h1>Mapa</h1>
      <p className="lede">
        Todo el recorrido: <b>{pctTxt(total)}</b> dominado. Es un número exigente a propósito: un tema llega al 100 % con 100 aciertos repartidos en 7+ días (acertando ≥ 80 %), y una palabra cuando aguanta 2 meses sin verla. Lo hecho a medias se ve a medias.
      </p>

      <div className="map-summary">
        <Card>
          <h3>Maestría por skill</h3>
          <MasteryBar ev={s.ev.all} label="General" compact />
          {SKILLS.map((k) => (
            <MasteryBar key={k} ev={s.ev['sk:' + k]} label={SKILL_NAME[k]} compact />
          ))}
        </Card>
        <Card>
          <h3>Vocabulario (8.000)</h3>
          {bank.map((b) => (
            <div key={b.l} className="map-row">
              <span className="map-row-l">{b.l}</span>
              <StageBar n={b.n} total={b.total} thin />
              <span className="muted tiny">{b.n.mature}/{b.total}</span>
            </div>
          ))}
          <div className="legend-row tiny">
            <span className="legend-item"><i className="s-mature" />Dominada</span>
            <span className="legend-item"><i className="s-solid" />Sólida</span>
            <span className="legend-item"><i className="s-young" />Consolidando</span>
            <span className="legend-item"><i className="s-learning" />Aprendiendo</span>
          </div>
          <a className="small" href="#/vocab">Ir a Vocabulary →</a>
        </Card>
        <Card>
          <h3>Lecturas ({readings.length})</h3>
          {read.map((r) => (
            <div key={r.l} className="map-row">
              <span className="map-row-l">{r.l}</span>
              <div className="progress thin"><div style={{ width: `${r.avg * 100}%` }} /></div>
              <span className="muted tiny">{r.done}/{r.total}</span>
            </div>
          ))}
          <div className="muted tiny">La barra es la media de tu mejor intento completo en cada texto.</div>
          <a className="small" href="#/reading">Ir a Reading →</a>
        </Card>
      </div>

      <div className="map-legend">
        <span>◯ sin empezar</span>
        <span>◔ en marcha: el anillo muestra el dominio real</span>
        <span>● dominado (demostrado en días distintos)</span>
        <span>{TIERS.slice(1).map((t) => `${t.icon} ${t.name}`).join(' · ')}</span>
      </div>
      <div className="map-wrap">
        <svg className="map-svg" width="100%" style={{ minWidth: 720 }} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mapa del currículo">
          {blocks.slice(1).map((b, i) => (
            <line key={b.sl.id} x1={HUB_X} x2={HUB_X} y1={blocks[i].cy + 44} y2={b.cy - 44} className="edge spine" />
          ))}
          {blocks.map((b) => (
            <g key={b.sl.id}>
              {b.nodes.map((n) => (
                <path key={n.key} className={'edge' + (n.pct > 0 ? ' live' : '')} d={`M${HUB_X + 44},${b.cy} C${COL0 - 50},${b.cy} ${COL0 - 50},${n.y + NODE_H / 2} ${n.x},${n.y + NODE_H / 2}`} />
              ))}
              <g className="node" onClick={() => go('#/path')}>
                <circle cx={HUB_X} cy={b.cy} r={44} className="hub-bg" />
                <Ring x={HUB_X} y={b.cy} r={38} pct={b.prog.overall} w={5} />
                <text x={HUB_X} y={b.cy - 4} textAnchor="middle" fontSize={17} fontWeight={700}>{b.sl.id}</text>
                <text x={HUB_X} y={b.cy + 15} textAnchor="middle" fontSize={12} className="lbl-muted">{pctTxt(b.prog.overall)}</text>
                <text x={HUB_X} y={b.cy + 62} textAnchor="middle" fontSize={11} className="lbl-muted">{trunc(b.sl.title, 18)}</text>
              </g>
              {b.nodes.map((n) => (
                <g key={n.key} className="node" onClick={() => go(n.href)}>
                  <title>{`${n.label}: ${pctTxt(n.pct)}${n.tier ? ` · ${TIERS[n.tier].name}` : ''}`}</title>
                  <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx={10} className={'node-bg' + (n.kind !== 'topic' ? ' alt' : '') + (n.pct >= 0.999 ? ' done' : '')} />
                  <Ring x={n.x + 19} y={n.y + NODE_H / 2} r={10} pct={n.pct} w={3.5} />
                  <text x={n.x + 36} y={n.y + (n.sub ? 16 : 23)} fontSize={12} fontWeight={n.kind === 'topic' ? 500 : 650}>{trunc(n.label, !n.sub ? 23 : n.tier ? 24 : 27)}</text>
                  {n.sub && <text x={n.x + 36} y={n.y + 30} fontSize={9.5} className="lbl-muted">{trunc(n.sub, 30 - pctTxt(n.pct).length)} · {pctTxt(n.pct)}</text>}
                  {!n.sub && <text x={n.x + NODE_W - 10} y={n.y + 23} fontSize={11} textAnchor="end" className="lbl-muted">{pctTxt(n.pct)}</text>}
                  {n.tier ? <text x={n.x + NODE_W - 10} y={n.y + 16} fontSize={11} textAnchor="end">{TIERS[n.tier].icon}</text> : null}
                </g>
              ))}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
