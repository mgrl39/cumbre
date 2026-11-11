/* La Rueda: lo aprobado vuelve a ciegas, girando. Aquí se ve qué gira, cuánto llevas y qué le falta a cada tema. */
import { useStore } from '../core/store.ts';
import { wheelStatus, topicPassed, WHEEL_MIN } from '../core/wheel.ts';
import { topicById, grammarTopics } from '../core/content.ts';
import { TIERS, BLIND_NEED, topicTier, blindHits, recentAcc, MASTER_TIER } from '../core/mastery.ts';
import { Card, go } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';

const ago = (t?: number) => {
  if (!t) return 'aún no ha salido';
  const d = Math.floor((Date.now() - t) / 86_400_000);
  return d <= 0 ? 'ha salido hoy' : d === 1 ? 'salió ayer' : `salió hace ${d} días`;
};

export default function RuedaPage() {
  const s = useStore((x) => x);
  const w = wheelStatus(s);
  const seen = new Set(s.wheel?.seen ?? []);
  const last = s.wheel?.last ?? {};
  const R = 70;
  const C = 2 * Math.PI * R;
  const pct = w.pool.length ? w.seen / w.pool.length : 0;
  const acc = w.blind + w.blindMiss ? Math.round((w.blind / (w.blind + w.blindMiss)) * 100) : 0;
  const rows = w.pool
    .map((id) => ({ id, t: topicById.get(id)!, tier: topicTier(s, id), blind: blindHits(s, id), ev: s.ev['w:' + id], last: last[id] ?? 0, inLap: seen.has(id), passed: topicPassed(s, id) }))
    .sort((a, b) => Number(a.inLap) - Number(b.inLap) || a.last - b.last);
  const masters = grammarTopics.filter((t) => topicTier(s, t.id) >= MASTER_TIER).length;

  return (
    <div className="page">
      <h1>La Rueda</h1>
      <p className="lede">
        Con la tabla delante, cualquiera acierta. Aquí lo que ya has <b>aprobado</b> vuelve a salir, girando, <b>sin decirte de qué tema es</b>: ni título, ni regla, ni pista hasta que respondas. Eso es lo que de verdad mide tu inglés. Cada acierto a ciegas da <b>XP ×2</b> y es obligatorio para subir un tema de Bronce a Maestro.
      </p>

      <Card>
        <div className="wheel-hero">
          <div className="wheel-ring">
            <svg viewBox="0 0 168 168" aria-hidden="true">
              <circle className="trk" cx="84" cy="84" r={R} />
              <circle className="arc" cx="84" cy="84" r={R} strokeDasharray={C} strokeDashoffset={C * (1 - pct)} />
            </svg>
            <div className="mid">
              <b>{w.seen}/{w.pool.length}</b>
              <span>temas en la<br />vuelta {w.laps + 1}</span>
            </div>
          </div>
          <div>
            <div className="wheel-stats">
              <div><b>{w.laps}</b><span>vueltas completas</span></div>
              <div><b>{w.blind.toLocaleString('es')}</b><span>aciertos a ciegas</span></div>
              <div><b>{acc} %</b><span>acierto a ciegas</span></div>
              <div><b>{w.passed}/{grammarTopics.length}</b><span>temas aprobados</span></div>
              <div><b>{masters}</b><span>temas en Maestro</span></div>
            </div>
            {w.ready ? (
              <div className="row gap wrap">
                <button className="btn primary" onClick={() => go('#/wheel/20')}><Icon name="wheel" size={16} /> Girar la Rueda (20)</button>
                <button className="btn" onClick={() => go('#/wheel/10')}>10 rápidas</button>
                <button className="btn" onClick={() => go('#/wheel/40')}>40 seguidas</button>
              </div>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                La Rueda empieza a girar cuando tengas <b>{WHEEL_MIN} temas aprobados</b> (llevas {w.pool.length}). Un tema se aprueba completando su paso del <a href="#/path">Camino</a> con ≥ 80 %, aprobando su examen o con 10 aciertos en 2 días distintos.
              </p>
            )}
            <p className="muted small" style={{ marginBottom: 0 }}>
              También gira sola: en el <b>Flujo</b>, uno de cada tres bloques es de la Rueda, y los repasos y controles del Camino mezclan preguntas a ciegas.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3>Aprobar no es dominar</h3>
        <div className="steps-3">
          <div><b>1 · Aprendes</b>Lees la regla, miras la tabla y practicas el tema sabiendo cuál es.</div>
          <div><b>2 · Apruebas</b>Con 10 aciertos en 2 días (o su paso / examen) el tema entra en la Rueda.</div>
          <div><b>3 · Lo demuestras</b>La Rueda te lo pregunta mezclado y a ciegas, una y otra vez, durante meses.</div>
        </div>
        <div className="ladder">
          {TIERS.slice(1).map((t, i) => (
            <div key={t.name}>
              <b>{t.icon} {t.name}</b>
              {t.hits.toLocaleString('es')} aciertos<br />{t.days} días distintos<br />{BLIND_NEED[i + 1] ? `${BLIND_NEED[i + 1]} a ciegas` : 'sin mínimo a ciegas'}
            </div>
          ))}
        </div>
        <p className="muted small" style={{ marginBottom: 0 }}>
          Cada día solo cuentan 25 aciertos por tema y 10 a ciegas por tema: Maestro son <b>1.000 ejercicios acertados en al menos 40 días distintos</b>, y además hay que mantener el 70 % reciente. No hay atajos.
        </p>
      </Card>

      {rows.length > 0 && (
        <Card>
          <div className="row between wrap">
            <h3 style={{ margin: 0 }}>Lo que gira ({rows.length})</h3>
            <span className="muted small">Primero, lo que toca en esta vuelta</span>
          </div>
          <div className="wheel-list" style={{ marginTop: 12 }}>
            {rows.map((r) => {
              const need = BLIND_NEED[Math.min(MASTER_TIER, r.tier + 1)] || BLIND_NEED[2];
              return (
                <div key={r.id} className={'wheel-item' + (r.inLap ? '' : ' due')}>
                  <div className="row between">
                    <a href={`#/grammar/${r.id}`}>{r.t.title}</a>
                    <span className={'tier-chip t' + r.tier}>{TIERS[r.tier].icon} {TIERS[r.tier].name}</span>
                  </div>
                  <div className="wheel-mini"><div style={{ width: `${Math.min(100, (r.blind / need) * 100)}%` }} /></div>
                  <div className="row between muted tiny">
                    <span>{r.blind}/{need} a ciegas{r.ev && r.ev.h + r.ev.m >= 4 ? ` · ${Math.round(recentAcc(r.ev) * 100)} %` : ''}</span>
                    <span>{r.t.level} · {r.inLap ? '✓ en esta vuelta' : ago(r.last)}{r.passed ? '' : ' · en prácticas'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
