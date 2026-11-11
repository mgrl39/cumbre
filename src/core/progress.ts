/* Aplica el resultado de cada respuesta a todo el progreso. */
import type { Exercise, Skill } from './types.ts';
import { SKILL_NAME, LEVELS } from './types.ts';
import { vocabById } from './content.ts';
import { update, day, getState, type State } from './store.ts';
import { updateRating, levelOf } from './rating.ts';
import { review } from './srs.ts';
import { ACHIEVEMENTS, titleOf, missionsFor, xpParts } from './gamify.ts';
import { wheelPool } from './wheel.ts';
import { topicById } from './content.ts';
import { streak } from './store.ts';
import { TIERS, DAILY_CAP, emptyEv, recordEv, tierOf, TAG_LABEL, BLIND_NEED } from './mastery.ts';
import { today } from './text.ts';

export interface ResultOpts {
  placement?: boolean;
  /** En exámenes no se toca el repaso espaciado ni los rangos. */
  exam?: boolean;
  run?: number;
  /** lo que respondió (para el registro de fallos) */
  given?: string;
  /** maestría extra de la sesión (p. ej. la del juego) */
  ev?: { key: string; label: string };
}

const MAX_FAILS = 400;
/** Resumen legible del enunciado para el registro de fallos. */
export function promptOf(ex: Exercise): string {
  if (ex.kind === 'order') return 'Ordenar la frase';
  if (ex.hideText) return ex.dictation ? '🎧 Dictado' : '🎧 ' + ex.instruction;
  const p = ex.prompt.split('\n').map((x) => x.trim()).filter(Boolean).join(' · ');
  return (p || ex.instruction).slice(0, 180);
}

export function xpFor(ex: Exercise, ok: boolean, run = 0, o: { exam?: boolean; streak?: number } = {}) {
  if (!ok || ex.kind === 'learn') return 0;
  return xpParts(ex.kind, ex.level, { blind: ex.blind, exam: o.exam, run, streak: o.streak }).xp;
}
/** XP de la última respuesta, con su desglose (para enseñarlo en la corrección). */
let lastXp: ReturnType<typeof xpParts> | null = null;
export const lastGain = () => lastXp;

/** Devuelve los avisos generados (no se muestran hasta acabar la sesión). */
export function applyResult(ex: Exercise, ok: boolean, opts: ResultOpts = {}): string[] {
  const notices: string[] = [];
  if (ex.kind === 'learn') {
    update((s) => {
      if (ex.wordId && !s.srs[ex.wordId]) {
        s.srs[ex.wordId] = { due: Date.now() + 5 * 60_000, ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
        day(s).learned++;
      }
    });
    return notices;
  }
  update((s) => {
    const now = Date.now();
    const d = day(s);
    s.totals.answers++;
    d.n++;
    d[ex.skill]++;
    if (ok) {
      s.totals.correct++;
      d.c++;
    }
    const run = opts.run ?? 0;
    if (run > s.totals.bestRun) s.totals.bestRun = run;
    if (run > d.bestRun) d.bestRun = run;
    const days = streak(s);
    const gained = xpFor(ex, ok, run, { exam: opts.exam, streak: days });
    lastXp = ok ? xpParts(ex.kind, ex.level, { blind: ex.blind, exam: opts.exam, run, streak: days }) : null;
    s.xp += gained;
    d.xp += gained;

    // nivel de la skill (y foto del día para el diario)
    const sk = s.skills[ex.skill];
    d.r0 = d.r0 || {};
    if (d.r0[ex.skill] === undefined) d.r0[ex.skill] = sk.r;
    const before = Math.floor(sk.r);
    const guess = ex.kind === 'mc' && ex.options ? 1 / ex.options.length : 0;
    sk.r = updateRating(sk.r, sk.n, ex.level, ok, guess, opts.placement);
    sk.n++;
    d.r1 = { ...(d.r1 || {}), [ex.skill]: sk.r };
    if (!opts.placement && Math.floor(sk.r) > before) notices.push(`⬆️ ${SKILL_NAME[ex.skill]} sube a ${levelOf(sk.r).level}`);

    const srsId = ex.wordId || ex.id;
    // estadística del ítem
    const it = s.items[ex.id] || { s: 0, c: 0, last: 0, recent: '' };
    it.s++;
    if (ok) it.c++;
    it.last = now;
    it.recent = (it.recent + (ok ? '1' : '0')).slice(-8);
    s.items[ex.id] = it;

    // repaso espaciado (no en exámenes): palabras siempre; resto de ítems solo cuando se fallan (y hasta que se consolidan)
    if (!opts.exam && (ex.wordId || s.srs[srsId] || !ok)) {
      const wasDue = s.srs[srsId] && s.srs[srsId].due <= now;
      s.srs[srsId] = review(s.srs[srsId], ok, now);
      if (wasDue) d.reviews++;
      if (!ex.wordId && ok && s.srs[srsId].reps >= 3) delete s.srs[srsId];
    }

    // registro de fallos: lo fallado queda pendiente hasta acertarlo en 2 días distintos
    const dk = today();
    if (!opts.placement) {
      const f = s.fails[srsId];
      if (!ok) {
        s.fails[srsId] = { n: (f?.n ?? 0) + 1, t: now, g: (opts.given ?? '').slice(0, 160), q: promptOf(ex), a: ex.answers[0] ?? '', sk: ex.skill, l: ex.label, tp: ex.ruleTopic, fix: 0 };
        const keys = Object.keys(s.fails);
        if (keys.length > MAX_FAILS) keys.sort((a, b) => s.fails[a].t - s.fails[b].t).slice(0, keys.length - MAX_FAILS).forEach((k) => delete s.fails[k]);
      } else if (f && f.fd !== dk) {
        f.fix++;
        f.fd = dk;
        if (f.fix >= 2) delete s.fails[srsId];
      }
    }

    // maestría (evaluación continua): global, skill, nivel, grupo de vocabulario, juego y tema
    const bump = (key: string, cap: number, label: string, blindKey?: string) => {
      const e = (s.ev[key] ||= emptyEv());
      const bl = () => (blindKey ? s.ev[blindKey]?.h ?? 0 : undefined);
      const t0 = tierOf(e, bl());
      recordEv(e, ok, cap, dk);
      const t1 = tierOf(e, bl());
      if (t1 > t0) notices.push(`${TIERS[t1].icon} Maestría ${TIERS[t1].name} en ${label} (${e.h.toLocaleString('es')} aciertos en ${e.d} días)`);
    };
    bump('all', DAILY_CAP.all, 'inglés en general');
    bump('sk:' + ex.skill, DAILY_CAP.skill, SKILL_NAME[ex.skill]);
    const lv = Math.max(1, Math.min(5, Math.round(ex.level)));
    bump(`sl:${ex.skill}:${lv}`, DAILY_CAP.level, `${SKILL_NAME[ex.skill]} ${LEVELS[lv - 1]}`);
    const tag = ex.wordId ? vocabById.get(ex.wordId)?.tag ?? (ex.wordId.startsWith('c:') ? 'custom' : undefined) : undefined;
    if (tag) bump('vt:' + tag, DAILY_CAP.group, `vocabulario · ${TAG_LABEL[tag] ?? tag}`);
    if (opts.ev) bump(opts.ev.key, DAILY_CAP.group, opts.ev.label);
    if (ex.ruleTopic) {
      const t = s.topics[ex.ruleTopic] || { s: 0, c: 0, pts: 0, rank: 0, recent: '' };
      t.s++;
      if (ok) t.c++;
      t.recent = (t.recent + (ok ? '1' : '0')).slice(-12);
      d.topics = d.topics || [];
      if (!d.topics.includes(ex.ruleTopic)) d.topics.push(ex.ruleTopic);
      s.topics[ex.ruleTopic] = t;
      const title = topicById.get(ex.ruleTopic)?.title ?? ex.label.replace(/^Grammar · /, '');
      if (ex.blind) {
        // a ciegas: cuenta aparte (y se registra antes, para que pueda desbloquear el nivel del tema)
        const w = (s.ev['w:' + ex.ruleTopic] ||= emptyEv());
        recordEv(w, ok, DAILY_CAP.blind, dk);
      }
      bump('t:' + ex.ruleTopic, DAILY_CAP.topic, `«${title}»`, 'w:' + ex.ruleTopic);
      t.rank = tierOf(s.ev['t:' + ex.ruleTopic], s.ev['w:' + ex.ruleTopic]?.h ?? 0);
      const e = s.ev['t:' + ex.ruleTopic];
      const nx = TIERS[t.rank + 1];
      if (ok && nx && e.h === nx.hits && (s.ev['w:' + ex.ruleTopic]?.h ?? 0) < BLIND_NEED[t.rank + 1])
        notices.push(`🎡 «${title}» ya tiene los ${nx.hits} aciertos de ${nx.name}, pero le faltan aciertos a ciegas (${s.ev['w:' + ex.ruleTopic]?.h ?? 0}/${BLIND_NEED[t.rank + 1]}): se consiguen en la Rueda.`);
    }
    if (ex.blind) {
      bump('wheel', DAILY_CAP.skill, 'la Rueda (a ciegas)');
      if (ex.ruleTopic) {
        const wh = (s.wheel ||= { laps: 0, seen: [], last: {} });
        wh.last[ex.ruleTopic] = now;
        if (!wh.seen.includes(ex.ruleTopic)) wh.seen.push(ex.ruleTopic);
        const pool = wheelPool(s);
        if (pool.length >= 3 && pool.every((id) => wh.seen.includes(id))) {
          wh.laps++;
          wh.seen = [];
          notices.push(`🎡 Vuelta ${wh.laps} a la Rueda completada: han salido los ${pool.length} temas que tienes aprobados. Empieza otra.`);
        }
      }
    }
  });
  return notices;
}

/** Al terminar una sesión: historial de niveles, logros, títulos y misiones. */
export function finishSession(minutes: number, xpBefore: number, missionsBefore: number): string[] {
  const notices: string[] = [];
  update((s) => {
    s.totals.sessions++;
    s.totals.minutes += minutes;
    day(s).minutes = (day(s).minutes || 0) + minutes;
    snapshotLevels(s);
    const t0 = titleOf(xpBefore),
      t1 = titleOf(s.xp);
    if (t1.level > t0.level) notices.push(`🏷️ Nuevo título: ${t1.title} (nivel ${t1.level})`);
    const done = missionsFor(s).filter((m) => m.done).length;
    if (done > missionsBefore) notices.push(`✅ Misión diaria completada (${done}/3)`);
    notices.push(...grantAchievements(s));
  });
  return notices;
}

export function snapshotLevels(s: State) {
  const now = Date.now();
  for (const k of Object.keys(s.skills) as Skill[]) {
    const h = s.skills[k].history;
    const last = h[h.length - 1];
    if (last && now - last.t < 3_600_000) last.r = s.skills[k].r;
    else h.push({ t: now, r: s.skills[k].r });
    if (h.length > 400) h.splice(0, h.length - 400);
  }
}

export function grantAchievements(s: State): string[] {
  const out: string[] = [];
  for (const a of ACHIEVEMENTS) {
    if (!s.achievements[a.id] && a.test(s)) {
      s.achievements[a.id] = Date.now();
      out.push(`${a.icon} Logro: ${a.name}`);
    }
  }
  return out;
}

/** Para acciones fuera de sesión (guardar redacción, texto...): avisos de uno en uno. */
export function checkAchievementsOutside() {
  update((s) => {
    s.notices.push(...grantAchievements(s));
  });
}

export const completedMissions = () => missionsFor(getState()).filter((m) => m.done).length;

export function recordReading(id: string, pct: number, wpm?: number) {
  update((s) => {
    const prev = s.readTexts[id];
    s.readTexts[id] = { best: Math.max(prev?.best ?? 0, pct), t: Date.now(), wpm: wpm ?? prev?.wpm };
    day(s).texts++;
  });
}
