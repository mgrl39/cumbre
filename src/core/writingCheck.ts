/*
 * Analizador de redacciones 100 % en el navegador.
 * No sustituye a un profesor, pero detecta: longitud, variedad de frases, conectores, vocabulario académico,
 * repeticiones, registro informal y errores típicos de hispanohablantes.
 */
import { vocab } from './content.ts';
import { countSyllables, splitSentences, lemmaCandidates } from './text.ts';

export interface Finding {
  kind: 'error' | 'warn' | 'good';
  msg: string;
  match?: string;
}

/* Errores típicos de hispanohablantes (regex → explicación + corrección sugerida) */
const SPANISH_ERRORS: [RegExp, string][] = [
  [/\bpeople (is|was|has)\b/i, '«people» es plural: people are / were / have'],
  [/\bI have (\d+|twenty|thirty|forty) years\b/i, 'La edad va con «be»: I am 30 (years old)'],
  [/\bdepend(s|ed|ing)? of\b/i, 'depend ON, no «depend of»'],
  [/\bexplain (me|him|her|us|them)\b/i, 'explain something TO someone: explain it to me'],
  [/\bmore (better|worse|easier|bigger|faster|cheaper|important than)\b/i, 'Comparativo doble o mal formado: better (no more better)'],
  [/\bthe (life|society|nature|happiness|technology) (is|has)\b/i, 'Con sentido general no se usa «the»: Life is…, Society is… (revisa si sobra «the»)'],
  [/\bthe people (think|say|believe)\b/i, 'Para «la gente» en general: People think… (sin the)'],
  [/\bmake (a|the) question\b/i, 'ask a question (no make)'],
  [/\bmake (a|my|the) (photo|picture)\b/i, 'take a photo/picture'],
  [/\bin the (morning|afternoon) of\b/i, 'Usa ON con días concretos: on the morning of Monday → on Monday morning'],
  [/\b(is|are|was) agree\b/i, '«agree» es un verbo: I agree / I don\'t agree (no «I am agree»)'],
  [/\bI am agree\b/i, 'I agree (no I am agree)'],
  [/\bactually\b/i, 'Ojo: «actually» = en realidad, NO «actualmente» (currently / nowadays)'],
  [/\beventually\b/i, 'Ojo: «eventually» = al final/finalmente, NO «eventualmente»'],
  [/\bfor to\b/i, '«para + infinitivo» = to + verbo (no «for to»)'],
  [/\b(a|an) (informations|advices|furnitures|news|knowledges|evidences)\b/i, 'Incontable: information, advice, furniture… no llevan a/an ni plural'],
  [/\b(informations|advices|furnitures|knowledges|evidences|researches)\b/i, 'Incontable: no lleva -s (information, advice, research…)'],
  [/\bit'?s (very )?important that (he|she|they|we|people) (don't|doesn't)\b/i, 'Registro formal: it is important that they not… / it is important for them not to…'],
  [/\bsince (\d+ )?(years|months|days|weeks)\b/i, 'Duración: FOR two years; momento de inicio: SINCE 2020'],
  [/\bdiscuss about\b/i, 'discuss something (sin about)'],
  [/\bmarried with\b/i, 'married TO someone'],
  [/\barrive to\b/i, 'arrive IN (ciudad/país) / AT (lugar)'],
  [/\bsay (me|him|her|us|them)\b/i, 'say something (to someone) / TELL someone something'],
  [/\b(is|it) depends\b/i, '«It depends» (sin is)'],
  [/\bthere (is|are) (a lot of )?people that\b/i, 'Para personas mejor «who»: people who…'],
  [/\bin (monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i, 'Días con ON: on Monday'],
  [/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|january|february|march|april|june|july|august|september|october|november|december|english|spanish)\b/, 'Días, meses e idiomas van en mayúscula en inglés'],
  [/\bi\b/, '«I» (yo) siempre en mayúscula'],
  [/\bhow it is called\b/i, 'Pregunta directa: What is it called?'],
  [/\b(can|could|must|should|will|would|might) to\b/i, 'Tras un modal, infinitivo sin «to»: can go, must do'],
  [/\bdidn'?t (went|did|saw|came|had|made|took|said|got|knew|thought)\b/i, 'Tras did/didn\'t, verbo en forma base: didn\'t go'],
  [/\b(he|she|it) (have|do|go|want|need|like|think) /, '3ª persona del singular: he has / she goes / it needs'],
  [/\bwho's (car|house|book)\b/i, 'Posesivo: whose (no who\'s)'],
  [/\bin spite (that|of that)\b/i, 'in spite of + sustantivo/-ing; although + frase'],
  [/\bdespite of\b/i, '«despite» no lleva «of» (despite / in spite of)'],
  [/\balthough\b[^.]*,\s*but\b/i, 'No combines although… but… en la misma frase'],
  [/\bthe most (good|bad)\b/i, 'Superlativo irregular: the best / the worst'],
  [/\bsuggest (him|her|me|them|us) to\b/i, 'suggest + -ing / suggest that someone (should) do'],
  [/\bas (a )?conclusion\b/i, 'Mejor: In conclusion / To conclude'],
  [/\bin the other hand\b/i, 'ON the other hand'],
  [/\bin my opinion,? I think\b/i, 'Redundante: In my opinion… o I think… (no ambos)'],
  [/\bcontrol(ar)? the (situation|stress) of\b/i, 'Revisa el calco del español'],
  [/\bassist(ed)? (to|the) (class|meeting|conference|lecture)\b/i, 'Falso amigo: asistir a = attend (assist = ayudar)'],
  [/\bsensible\b/i, 'Falso amigo: sensible = sensato. «Sensible» en español = sensitive'],
  [/\bfabric\b/i, 'Falso amigo: fabric = tela. «Fábrica» = factory'],
  [/\bcareer\b/i, 'Ojo: career = trayectoria profesional. «Carrera universitaria» = degree'],
];

const INFORMAL: [RegExp, string][] = [
  [/\b(gonna|wanna|gotta|kinda|sorta)\b/i, 'Muy informal para un texto escrito'],
  [/\b(stuff|things like that|a lot of|lots of|pretty (good|bad|much))\b/i, 'Informal: en registro formal usa a great deal of / numerous / considerable…'],
  [/\b(get|got|gets|getting)\b/i, '«get» es muy comodín; en registro formal: obtain, become, receive, understand…'],
  [/\b(really|very|so) (good|bad|big|important)\b/i, 'Busca un adjetivo más preciso: crucial, excellent, substantial, detrimental…'],
  [/!{1,}/, 'Las exclamaciones restan formalidad'],
];

export const LINKERS: Record<string, string[]> = {
  'Adición': ['moreover', 'furthermore', 'in addition', 'additionally', 'besides', 'what is more', 'not only'],
  'Contraste': ['however', 'nevertheless', 'nonetheless', 'although', 'even though', 'whereas', 'while', 'despite', 'in spite of', 'on the other hand', 'conversely', 'yet'],
  'Causa / efecto': ['therefore', 'consequently', 'as a result', 'thus', 'hence', 'due to', 'owing to', 'because of', 'since', 'as a consequence', 'this means that', 'which leads to'],
  'Ejemplos': ['for example', 'for instance', 'such as', 'namely', 'in particular', 'to illustrate'],
  'Opinión / matiz': ['arguably', 'it could be argued', 'it seems', 'to some extent', 'admittedly', 'undoubtedly', 'clearly', 'in my view', 'from my perspective'],
  'Orden / conclusión': ['firstly', 'secondly', 'finally', 'in conclusion', 'to conclude', 'to sum up', 'overall', 'all things considered', 'ultimately'],
};

const academicSet = new Set(vocab.filter((v) => v.tag === 'academic' || v.level >= 5).map((v) => v.word.toLowerCase()));
const STOP = new Set('the a an and or but of to in on at for with by from is are was were be been being it this that these those i you he she we they my your his her our their as not no do does did have has had can could will would should may might must so if than then there here which who whom what when where why how all any some more most such very also just about into over after before up down out its'.split(' '));

export interface Analysis {
  words: number;
  sentences: number;
  avgLen: number;
  longest: number;
  lexical: number;
  grade: number;
  cefrGuess: string;
  linkers: Record<string, string[]>;
  academic: string[];
  repeated: { w: string; n: number }[];
  findings: Finding[];
  score: number;
}

export function analyze(text: string, target?: { min: number; max: number }): Analysis {
  const sents = splitSentences(text);
  const words = (text.match(/[A-Za-z']+/g) || []);
  const lw = words.map((w) => w.toLowerCase());
  const n = words.length;
  const syl = words.reduce((a, w) => a + countSyllables(w), 0);
  const avgLen = sents.length ? n / sents.length : 0;
  const grade = n ? 0.39 * avgLen + 11.8 * (syl / n) - 15.59 : 0;
  const content = lw.filter((w) => !STOP.has(w));
  const lexical = content.length ? new Set(content).size / content.length : 0;
  const findings: Finding[] = [];

  for (const [re, msg] of SPANISH_ERRORS) {
    const m = text.match(re);
    if (m) {
      const isFalseFriendNote = /Ojo|Falso amigo/.test(msg);
      findings.push({ kind: isFalseFriendNote ? 'warn' : 'error', msg, match: m[0] });
    }
  }
  for (const [re, msg] of INFORMAL) {
    const m = text.match(re);
    if (m) findings.push({ kind: 'warn', msg, match: m[0] });
  }
  // frases demasiado largas o sin puntuación
  sents.forEach((s) => {
    const k = s.split(/\s+/).length;
    if (k > 40) findings.push({ kind: 'warn', msg: `Frase muy larga (${k} palabras): divídela o usa mejor la puntuación`, match: s.slice(0, 50) + '…' });
  });
  // frases que empiezan igual
  const starts: Record<string, number> = {};
  sents.forEach((s) => {
    const f = s.split(/\s+/).slice(0, 1).join(' ').toLowerCase();
    starts[f] = (starts[f] || 0) + 1;
  });
  Object.entries(starts).forEach(([w, k]) => {
    if (k >= 3 && sents.length >= 5) findings.push({ kind: 'warn', msg: `${k} frases empiezan por «${w}»: varía la estructura` });
  });

  const linkers: Record<string, string[]> = {};
  const low = ' ' + text.toLowerCase().replace(/\s+/g, ' ') + ' ';
  for (const [cat, list] of Object.entries(LINKERS)) {
    const found = list.filter((l) => new RegExp(`\\b${l}\\b`).test(low));
    if (found.length) linkers[cat] = found;
  }
  const academic = [...new Set(lw.filter((w) => lemmaCandidates(w).some((c) => academicSet.has(c))))];
  const freq: Record<string, number> = {};
  content.forEach((w) => w.length > 3 && (freq[w] = (freq[w] || 0) + 1));
  const repeated = Object.entries(freq)
    .filter(([, k]) => k >= Math.max(3, n / 60))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w, k]) => ({ w, n: k }));

  // estructuras complejas (indicadores de B2/C1)
  const complex: [RegExp, string][] = [
    [/\b(which|who|whom|whose)\b/i, 'oraciones de relativo'],
    [/\b(had|would) have \w+ed\b|\bif \w+ had\b/i, 'condicionales complejos'],
    [/\b(is|are|was|were|be|been) \w+(ed|en)\b/i, 'pasiva'],
    [/\b(not only|never have|rarely|seldom|no sooner|hardly)\b/i, 'inversión / énfasis'],
    [/\b(what \w+ (need|want|matters) is|it is \w+ that|it was \w+ who)\b/i, 'cleft sentences'],
    [/\b(having \w+ed|\w+ing the \w+,)\b/i, 'participle clauses'],
    [/\b(might|may|could|would) (well )?(be|have)\b/i, 'hedging (matizar)'],
  ];
  const complexFound = complex.filter(([re]) => re.test(text)).map(([, n2]) => n2);
  if (complexFound.length) findings.push({ kind: 'good', msg: `Estructuras avanzadas: ${complexFound.join(', ')}` });
  const nLinkCats = Object.keys(linkers).length;
  if (nLinkCats >= 3) findings.push({ kind: 'good', msg: `Buena cohesión: conectores de ${nLinkCats} tipos` });
  else if (n > 60) findings.push({ kind: 'warn', msg: 'Pocos conectores: añade de contraste (however, whereas) y causa (therefore, as a result)' });
  if (academic.length >= 5) findings.push({ kind: 'good', msg: `Vocabulario académico/avanzado: ${academic.length} palabras` });
  if (target) {
    if (n < target.min) findings.push({ kind: 'warn', msg: `Te quedas corto: ${n} de ${target.min}–${target.max} palabras` });
    if (n > target.max * 1.2) findings.push({ kind: 'warn', msg: `Te pasas: ${n} palabras (máx. ${target.max})` });
  }

  // puntuación orientativa (0–100)
  const errors = findings.filter((f) => f.kind === 'error').length;
  let score = 40;
  score += Math.min(15, nLinkCats * 4);
  score += Math.min(15, academic.length * 2);
  score += Math.min(10, complexFound.length * 2.5);
  score += lexical > 0.7 ? 10 : lexical > 0.55 ? 5 : 0;
  score += avgLen >= 12 && avgLen <= 25 ? 10 : avgLen >= 8 ? 5 : 0;
  score -= errors * 6;
  score -= findings.filter((f) => f.kind === 'warn').length * 2;
  if (target && n < target.min) score -= 10;
  score = Math.max(0, Math.min(100, Math.round(score)));

  const cefrGuess = n < 30 ? '—' : score >= 85 ? 'C1' : score >= 70 ? 'B2' : score >= 55 ? 'B1' : score >= 40 ? 'A2' : 'A1';
  return { words: n, sentences: sents.length, avgLen, longest: Math.max(0, ...sents.map((s) => s.split(/\s+/).length)), lexical, grade, cefrGuess, linkers, academic, repeated, findings, score };
}

/** Dificultad estimada de un texto para el lector (Flesch-Kincaid → CEFR aproximado). */
export function textLevel(text: string) {
  const sents = splitSentences(text);
  const words = text.match(/[A-Za-z']+/g) || [];
  if (!words.length) return { grade: 0, cefr: '—' };
  const syl = words.reduce((a, w) => a + countSyllables(w), 0);
  const grade = 0.39 * (words.length / Math.max(1, sents.length)) + 11.8 * (syl / words.length) - 15.59;
  const cefr = grade < 3 ? 'A1' : grade < 5 ? 'A2' : grade < 8 ? 'B1' : grade < 11 ? 'B2' : grade < 14 ? 'C1' : 'C2';
  return { grade, cefr };
}
