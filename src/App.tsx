import { useEffect, useState } from 'react';
import { Icon } from './ui/icons.tsx';
import { streak } from './core/store.ts';
import { useStore, update, getState } from './core/store.ts';
import type { Level, Skill } from './core/types.ts';
import { SKILLS } from './core/types.ts';
import { Session } from './ui/Session.tsx';
import { flowPlan, reviewPlan, placementPlan, certPlan, stepPlan, allSteps, GAMES, gamePlan, provePlan, failsPlan, wheelPlan, type Plan } from './core/plans.ts';
import { grammarGamePlan, grammarExamPlan, scopeTopics, scopeBack, gmode, type GMode } from './core/grammarGames.ts';
import { pickFor, readingExercises } from './core/generate.ts';
import { readingById, itemsByTopic, topicById } from './core/content.ts';
import { grammarExercise } from './core/generate.ts';
import { shuffle } from './core/text.ts';
import { recordReading } from './core/progress.ts';
import Home from './pages/Home.tsx';
import Placement from './pages/Placement.tsx';
import PathPage from './pages/PathPage.tsx';
import GrammarPage, { GrammarScopePage } from './pages/GrammarPage.tsx';
import RuedaPage from './pages/RuedaPage.tsx';
import { wheelStatus } from './core/wheel.ts';
import RepasoPage from './pages/RepasoPage.tsx';
import VocabPage from './pages/VocabPage.tsx';
import ReadingPage from './pages/ReadingPage.tsx';
import Lector from './pages/Lector.tsx';
import WritingPage from './pages/WritingPage.tsx';
import GamesPage, { Pairs } from './pages/GamesPage.tsx';
import ExamsPage from './pages/ExamsPage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import GuidePage from './pages/GuidePage.tsx';
import DiaryPage from './pages/DiaryPage.tsx';
import MapPage from './pages/MapPage.tsx';
import ListeningPage from './pages/ListeningPage.tsx';

function useHash() {
  const [h, setH] = useState(window.location.hash || '#/');
  useEffect(() => {
    const f = () => {
      setH(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return h;
}

type NavItem = { h: string; icon: string; name: string };
const NAV: { group: string; items: NavItem[] }[] = [
  { group: '', items: [
    { h: '#/', icon: 'home', name: 'Hoy' },
    { h: '#/path', icon: 'path', name: 'Camino' },
    { h: '#/rueda', icon: 'wheel', name: 'La Rueda' },
    { h: '#/repaso', icon: 'repeat', name: 'Repaso' },
    { h: '#/map', icon: 'map', name: 'Mapa' },
  ] },
  { group: 'Aprender', items: [
    { h: '#/grammar', icon: 'grammar', name: 'Grammar' },
    { h: '#/vocab', icon: 'vocab', name: 'Vocabulary' },
    { h: '#/reading', icon: 'reading', name: 'Reading' },
    { h: '#/listening', icon: 'listening', name: 'Listening' },
    { h: '#/writing', icon: 'writing', name: 'Writing' },
    { h: '#/lector', icon: 'lector', name: 'Lector' },
  ] },
  { group: 'Jugar y medir', items: [
    { h: '#/games', icon: 'games', name: 'Juegos' },
    { h: '#/exams', icon: 'exams', name: 'Exámenes' },
  ] },
  { group: 'Tú', items: [
    { h: '#/diary', icon: 'diary', name: 'Diario' },
    { h: '#/stats', icon: 'stats', name: 'Progreso' },
    { h: '#/guide', icon: 'guide', name: 'Guía' },
    { h: '#/settings', icon: 'settings', name: 'Ajustes' },
  ] },
];
const MOBILE = ['#/', '#/path', '#/rueda', '#/repaso', '#/games'];
const ALL_NAV = NAV.flatMap((g) => g.items);
const isActive = (h: string, hash: string) => (h === '#/' ? hash === '#/' || hash === '' : hash === h || hash.startsWith(h + '/'));

/** Construye el plan de sesión a partir de la ruta. */
function planFor(parts: string[]): (() => Plan) | null {
  const [a, b, c] = parts;
  if (a === 'flow') return () => flowPlan(b as Skill | undefined);
  if (a === 'review') return () => reviewPlan();
  if (a === 'wheel') return wheelStatus(getState()).ready ? () => wheelPlan(Number(b) || 20) : null;
  if (a === 'placement' && b === 'run') return () => placementPlan((c || SKILLS.join(',')).split(',') as Skill[]);
  if (a === 'exam') return () => certPlan(b as Skill | 'mixed', c as Level, Number(parts[3]) || 0);
  if (a === 'prove') return () => provePlan(Number(b) || 1);
  if (a === 'fails') {
    if (!b) return () => failsPlan();
    if (SKILLS.includes(b as Skill)) return () => failsPlan({ skill: b as Skill });
    const topics = scopeTopics(b).map((t) => t.id);
    return topics.length ? () => failsPlan({ topics }, scopeBack(b)) : null;
  }
  if (a === 'gg') return scopeTopics(b).length && gmode(c) ? () => grammarGamePlan(b, c as GMode) : null;
  if (a === 'gx') return scopeTopics(b).length ? () => grammarExamPlan(b) : null;
  if (a === 'step') {
    const step = allSteps().find((s) => s.id === decodeURIComponent(b));
    return step ? () => stepPlan(step) : null;
  }
  if (a === 'game') {
    const g = GAMES.find((x) => x.id === b);
    return g ? () => gamePlan(g, Number(c) || undefined) : null;
  }
  if (a === 'topic') {
    const t = topicById.get(b);
    if (!t) return null;
    return () => {
      const items = shuffle(itemsByTopic.get(t.id) || []);
      let i = 0;
      return {
        title: t.title,
        backTo: `#/grammar/${t.id}`,
        next: () => (i < items.length * 2 ? [grammarExercise(items[i % items.length], i++ >= items.length && !!items[(i - 1) % items.length].sentence)] : null),
        total: items.length * 2,
      };
    };
  }
  if (a === 'read') {
    const t = readingById.get(b);
    if (!t) return null;
    return () => {
      let given = false;
      return {
        title: t.title,
        backTo: '#/reading',
        total: t.questions.length,
        next: () => (given ? null : ((given = true), readingExercises(t, c === 'audio'))),
        onFinish: (r) => {
          recordReading(t.id, r.pct, Number(sessionStorage.getItem('wpm:' + t.id) || 0) || undefined);
          return [`Lectura: ${r.pct} %`];
        },
      };
    };
  }
  if (a === 'practice') {
    const k = b as Skill;
    if (c) {
      return () => ({ title: `Práctica`, backTo: '#/vocab', next: (cx) => pickFor('vocab', { tag: c, exclude: cx.exclude }) });
    }
    return () => flowPlan(k);
  }
  return null;
}

export default function App() {
  const hash = useHash();
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const theme = useStore((s) => s.settings.theme);
  const notices = useStore((s) => s.notices);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const make = planFor(parts);
  const inSession = !!make || parts[0] === 'pairs';

  let page: JSX.Element;
  if (make) page = <Session key={hash} make={make} />;
  else if (parts[0] === 'pairs') page = <Pairs key={hash} />;
  else
    switch (parts[0]) {
      case undefined:
        page = <Home />;
        break;
      case 'placement':
        page = <Placement />;
        break;
      case 'path':
        page = <PathPage />;
        break;
      case 'grammar':
        page = parts[1] === 'play' && parts[2] ? <GrammarScopePage scope={parts[2]} /> : <GrammarPage topicId={parts[1]} />;
        break;
      case 'rueda':
      case 'wheel':
        page = <RuedaPage />;
        break;
      case 'repaso':
        page = <RepasoPage />;
        break;
      case 'vocab':
        page = <VocabPage />;
        break;
      case 'reading':
        page = <ReadingPage textId={parts[1]} />;
        break;
      case 'lector':
        page = <Lector />;
        break;
      case 'writing':
        page = <WritingPage promptId={parts[1]} />;
        break;
      case 'games':
        page = <GamesPage />;
        break;
      case 'exams':
        page = <ExamsPage />;
        break;
      case 'stats':
        page = <StatsPage />;
        break;
      case 'settings':
        page = <SettingsPage />;
        break;
      case 'guide':
        page = <GuidePage />;
        break;
      case 'diary':
        page = <DiaryPage />;
        break;
      case 'map':
        page = <MapPage />;
        break;
      case 'listening':
        page = <ListeningPage />;
        break;
      default:
        page = <Home />;
    }

  return (
    <div className={'app' + (inSession ? ' in-session' : '')}>
      {!inSession && <Sidebar hash={hash} />}
      <main className="main">{page}</main>
      {!inSession && <MobileBar hash={hash} />}
      {!inSession && notices.length > 0 && (
        <div className="toast" onClick={() => update((s) => void s.notices.shift())}>
          {notices[0]} <span className="small" style={{ opacity: 0.7 }}>{notices.length > 1 ? `(+${notices.length - 1})` : ''} · OK</span>
        </div>
      )}
    </div>
  );
}

function Sidebar({ hash }: { hash: string }) {
  const st = useStore(streak);
  return (
    <nav className="nav">
      <a className="brand" href="#/">
        <span className="brand-mark"><Icon name="peak" size={20} /></span>
        <span>
          <div className="brand-name">Cumbre</div>
          <div className="brand-sub">Aprende inglés de verdad</div>
        </span>
      </a>
      {NAV.map((g) => (
        <div key={g.group}>
          {g.group && <div className="nav-group">{g.group}</div>}
          {g.items.map((n) => (
            <a key={n.h} href={n.h} className={'nav-item' + (isActive(n.h, hash) ? ' active' : '')}>
              <Icon name={n.icon} size={18} />
              <span>{n.name}</span>
            </a>
          ))}
        </div>
      ))}
      <div className="nav-foot">
        <div className="nav-streak"><Icon name="flame" size={16} /> {st} {st === 1 ? 'día' : 'días'}</div>
        <div>Poco a poco, cada día un poco mejor.</div>
      </div>
    </nav>
  );
}

function MobileBar({ hash }: { hash: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [hash]);
  const inMore = !MOBILE.some((h) => isActive(h, hash));
  return (
    <>
      <div className="mobile-bar">
        {MOBILE.map((h) => {
          const n = ALL_NAV.find((x) => x.h === h)!;
          return (
            <a key={h} href={h} className={isActive(h, hash) ? 'active' : ''}>
              <Icon name={n.icon} size={21} />
              {n.name}
            </a>
          );
        })}
        <button className={inMore ? 'active' : ''} onClick={() => setOpen(true)}>
          <Icon name="more" size={21} />
          Más
        </button>
      </div>
      <div className={'more-sheet' + (open ? ' open' : '')} onClick={() => setOpen(false)}>
        <div className="more-panel" onClick={(e) => e.stopPropagation()}>
          {ALL_NAV.filter((n) => !MOBILE.includes(n.h)).map((n) => (
            <a key={n.h} href={n.h} className={isActive(n.h, hash) ? 'active' : ''}>
              <Icon name={n.icon} size={22} />
              {n.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
