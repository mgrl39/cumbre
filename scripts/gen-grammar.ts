/* Genera ejercicios de gramática a partir de plantillas (sujetos × verbos × complementos) con conjugación real.
   Salida: src/content/grammarGen.ts (GRAMMAR_GEN: tema → líneas en el mini-DSL). Se anexan al final de cada tema,
   así los ids de los ejercicios escritos a mano no cambian. Determinista (semilla fija): node scripts/gen-grammar.ts */
import { writeFileSync } from 'node:fs';

/* ---------- azar con semilla ---------- */
let seed = 20261111;
const rand = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const shuffle = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------- léxico ---------- */
interface Subj { s: string; p: 1 | 2 | 3 | 4; pro: string; obj: string; poss: string; refl: string }
const S: Subj[] = [
  { s: 'I', p: 1, pro: 'I', obj: 'me', poss: 'my', refl: 'myself' },
  { s: 'You', p: 2, pro: 'you', obj: 'you', poss: 'your', refl: 'yourself' },
  { s: 'He', p: 3, pro: 'he', obj: 'him', poss: 'his', refl: 'himself' },
  { s: 'She', p: 3, pro: 'she', obj: 'her', poss: 'her', refl: 'herself' },
  { s: 'We', p: 4, pro: 'we', obj: 'us', poss: 'our', refl: 'ourselves' },
  { s: 'They', p: 4, pro: 'they', obj: 'them', poss: 'their', refl: 'themselves' },
  { s: 'My brother', p: 3, pro: 'he', obj: 'him', poss: 'his', refl: 'himself' },
  { s: 'My parents', p: 4, pro: 'they', obj: 'them', poss: 'their', refl: 'themselves' },
  { s: 'Anna', p: 3, pro: 'she', obj: 'her', poss: 'her', refl: 'herself' },
  { s: 'The children', p: 4, pro: 'they', obj: 'them', poss: 'their', refl: 'themselves' },
  { s: 'Our teacher', p: 3, pro: 'she', obj: 'her', poss: 'her', refl: 'herself' },
  { s: 'Tom and Lucy', p: 4, pro: 'they', obj: 'them', poss: 'their', refl: 'themselves' },
];
const PRON = S.slice(0, 6);
const S3 = S.filter((x) => x.p === 3);
const mid = (x: Subj) => (/^(I|Anna|Tom)\b/.test(x.s) ? x.s : x.s.charAt(0).toLowerCase() + x.s.slice(1));
const be = (x: Subj) => (x.p === 1 ? 'am' : x.p === 3 ? 'is' : 'are');
const was = (x: Subj) => (x.p === 1 || x.p === 3 ? 'was' : 'were');
const has = (x: Subj) => (x.p === 3 ? 'has' : 'have');
const does = (x: Subj) => (x.p === 3 ? 'does' : 'do');
const others = (v: string, all: string[]) => all.filter((x) => x !== v);

/** [base, 3ª persona, pasado, participio, -ing, complemento] */
type V = [string, string, string, string, string, string];
const VERBS: V[] = [
  ['work', 'works', 'worked', 'worked', 'working', 'in a bank'],
  ['play', 'plays', 'played', 'played', 'playing', 'tennis'],
  ['study', 'studies', 'studied', 'studied', 'studying', 'English'],
  ['live', 'lives', 'lived', 'lived', 'living', 'near the station'],
  ['watch', 'watches', 'watched', 'watched', 'watching', 'TV'],
  ['go', 'goes', 'went', 'gone', 'going', 'to the gym'],
  ['have', 'has', 'had', 'had', 'having', 'lunch at home'],
  ['do', 'does', 'did', 'done', 'doing', 'the shopping'],
  ['eat', 'eats', 'ate', 'eaten', 'eating', 'fish'],
  ['drink', 'drinks', 'drank', 'drunk', 'drinking', 'coffee'],
  ['write', 'writes', 'wrote', 'written', 'writing', 'emails'],
  ['speak', 'speaks', 'spoke', 'spoken', 'speaking', 'French'],
  ['drive', 'drives', 'drove', 'driven', 'driving', 'to work'],
  ['take', 'takes', 'took', 'taken', 'taking', 'the bus'],
  ['make', 'makes', 'made', 'made', 'making', 'dinner'],
  ['buy', 'buys', 'bought', 'bought', 'buying', 'bread'],
  ['meet', 'meets', 'met', 'met', 'meeting', 'friends'],
  ['get', 'gets', 'got', 'got', 'getting', 'up early'],
  ['cook', 'cooks', 'cooked', 'cooked', 'cooking', 'pasta'],
  ['clean', 'cleans', 'cleaned', 'cleaned', 'cleaning', 'the kitchen'],
  ['walk', 'walks', 'walked', 'walked', 'walking', 'to school'],
  ['listen', 'listens', 'listened', 'listened', 'listening', 'to music'],
  ['teach', 'teaches', 'taught', 'taught', 'teaching', 'maths'],
  ['run', 'runs', 'ran', 'run', 'running', 'in the park'],
  ['swim', 'swims', 'swam', 'swum', 'swimming', 'in the sea'],
  ['sing', 'sings', 'sang', 'sung', 'singing', 'in a choir'],
  ['wear', 'wears', 'wore', 'worn', 'wearing', 'a suit'],
  ['sell', 'sells', 'sold', 'sold', 'selling', 'cars'],
  ['read', 'reads', 'read', 'read', 'reading', 'the news'],
  ['sleep', 'sleeps', 'slept', 'slept', 'sleeping', 'on the sofa'],
];
const irregular = (v: V) => v[2] !== v[0] + 'ed' && v[2] !== v[0] + 'd' && !/ied$/.test(v[2]);
/** forma regularizada (incorrecta) de un irregular: goed, eated… */
const fakePast = (v: V) => (v[0].endsWith('e') ? v[0] + 'd' : v[0] + 'ed');

/* ---------- recogida ---------- */
const OUT: Record<string, string[]> = {};
const add = (topic: string, ...lines: string[]) => (OUT[topic] ||= []).push(...lines);
const mc = (prompt: string, ans: string, wrong: string[], note?: string) => `${prompt} | ${ans} | ${[...new Set(wrong)].filter((w) => w !== ans).join(' / ')}${note ? ' # ' + note : ''}`;
const gap = (prompt: string, ...ans: string[]) => `${prompt} | ${ans.join(' / ')}`;
const err = (bad: string, good: string, note?: string) => `! ${bad} | ${good}${note ? ' # ' + note : ''}`;
/** recorre combinaciones barajadas sin agotar siempre los mismos sujetos */
function each<A, B>(as: A[], bs: B[], n: number, fn: (a: A, b: B, i: number) => void) {
  const A2 = shuffle(as), B2 = shuffle(bs);
  for (let i = 0; i < n; i++) fn(A2[i % A2.length], B2[(i * 7 + Math.floor(i / B2.length)) % B2.length], i);
}

/* ================= A1 ================= */
{
  const C = ['tired', 'happy', 'late', 'hungry', 'ready', 'busy', 'at home', 'at work', 'from Spain', 'in the garden', 'very tall', 'cold', 'on holiday', 'in the kitchen', 'thirsty', 'bored'];
  const BE = ['am', 'is', 'are'];
  each(S, C, 84, (x, c, i) => {
    const b = be(x);
    const k = i % 4;
    if (k === 0) add('to-be', mc(`${x.s} ___ ${c}.`, b, others(b, BE)));
    if (k === 1) add('to-be', gap(`${x.s} ___ (not / be) ${c}.`, ...(b === 'am' ? ["'m not", 'am not'] : [`${b}n't`, `${b} not`, `'${b === 'is' ? 's' : 're'} not`])));
    if (k === 2) add('to-be', mc(`___ ${mid(x)} ${c}?`, cap(b), others(b, BE).map(cap)));
    if (k === 3) add('to-be', err(`${x.s} ${others(b, BE)[i % 2]} ${c}.`, `${x.s} ${b} ${c}.`));
  });
  const WAS = ['was', 'were'];
  const T = ['yesterday', 'last night', 'this morning', 'last week', 'on Sunday'];
  each(S, C, 80, (x, c, i) => {
    const w = was(x), t = T[i % T.length];
    const k = i % 4;
    if (k === 0) add('was-were', mc(`${x.s} ___ ${c} ${t}.`, w, [others(w, WAS)[0], be(x)]));
    if (k === 1) add('was-were', gap(`${x.s} ___ (not / be) ${c} ${t}.`, `${w}n't`, `${w} not`));
    if (k === 2) add('was-were', mc(`___ ${mid(x)} ${c} ${t}?`, cap(w), [cap(others(w, WAS)[0]), 'Did']));
    if (k === 3) add('was-were', err(`${x.s} ${others(w, WAS)[0]} ${c} ${t}.`, `${x.s} ${w} ${c} ${t}.`));
  });
}
{
  const FREQ = ['every day', 'on Mondays', 'every week', 'at weekends', 'every morning'];
  each(S, VERBS, 102, (x, v, i) => {
    const three = x.p === 3;
    const f = three ? v[1] : v[0], o = three ? v[0] : v[1];
    const dn = three ? "doesn't" : "don't", dno = three ? "don't" : "doesn't";
    const t = FREQ[i % FREQ.length];
    const k = i % 6;
    if (k === 0) add('present-simple', mc(`${x.s} ___ ${v[5]} ${t}.`, f, [o, v[4]]));
    if (k === 1) add('present-simple', mc(`${x.s} ___ ${v[5]}.`, `${dn} ${v[0]}`, [`${dno} ${v[0]}`, `${dn} ${v[1]}`]));
    if (k === 2 && x.p !== 1) add('present-simple', mc(`___ ${mid(x)} ${v[0]} ${v[5]}?`, cap(does(x)), [three ? 'Do' : 'Does', three ? 'Is' : 'Are']));
    if (k === 3) add('present-simple', gap(`${x.s} ___ (${v[0]}) ${v[5]} ${t}.`, f));
    if (k === 4) add('present-simple', gap(`${x.s} ___ (not / ${v[0]}) ${v[5]}.`, `${dn} ${v[0]}`, `${does(x)} not ${v[0]}`));
    if (k === 5) add('present-simple', three ? err(`${x.s} ${dno} ${v[0]} ${v[5]}.`, `${x.s} ${dn} ${v[0]} ${v[5]}.`, 'Con he / she / it: doesn’t.') : err(`${x.s} ${v[1]} ${v[5]} ${t}.`, `${x.s} ${v[0]} ${v[5]} ${t}.`, 'La -s solo va con he / she / it.'));
  });
  each(S3, VERBS, 12, (x, v, i) => add('present-simple', err(`${x.s} ${v[0]} ${v[5]} ${FREQ[i % FREQ.length]}.`, `${x.s} ${v[1]} ${v[5]} ${FREQ[i % FREQ.length]}.`, 'Con he / she / it el verbo lleva -s.')));
}
{
  const N: [string, 'a' | 'an'][] = [['engineer', 'an'], ['teacher', 'a'], ['actor', 'an'], ['doctor', 'a'], ['artist', 'an'], ['nurse', 'a'], ['architect', 'an'], ['student', 'a'], ['electrician', 'an'], ['pilot', 'a'], ['accountant', 'an'], ['lawyer', 'a'], ['waiter', 'a'], ['editor', 'an']];
  const T2: [string, 'a' | 'an'][] = [['umbrella', 'an'], ['book', 'a'], ['apple', 'an'], ['car', 'a'], ['orange', 'an'], ['old house', 'an'], ['university', 'a'], ['uniform', 'a'], ['idea', 'an'], ['European city', 'a'], ['hour', 'an'], ['egg', 'an'], ['big dog', 'a'], ['interesting film', 'an'], ['one-way ticket', 'a'], ['honest answer', 'an']];
  each(S3, N, 22, (x, [n, a], i) => {
    const wrong = a === 'a' ? 'an' : 'a';
    if (i % 2 === 0) add('articles-basic', mc(`${x.s} is ___ ${n}.`, a, [wrong, '—']));
    else add('articles-basic', i % 4 === 1 ? err(`${x.s} is ${n}.`, `${x.s} is ${a} ${n}.`, 'Las profesiones llevan a / an.') : err(`${x.s} is ${wrong} ${n}.`, `${x.s} is ${a} ${n}.`));
  });
  const FR = ['I have ___ @.', 'There is ___ @ on the table.', 'It is ___ @.', 'She wants ___ @.', 'We need ___ @.'];
  T2.forEach(([n, a], i) => {
    const fr = FR[i % FR.length].replace('@', n);
    add('articles-basic', mc(fr, a, [a === 'a' ? 'an' : 'a', '—']));
    if (i % 2 === 0) add('articles-basic', err(fr.replace('___', a === 'a' ? 'an' : 'a'), fr.replace('___', a), a === 'an' ? 'Delante de sonido vocálico: an.' : 'Delante de sonido consonántico: a.'));
  });
}
{
  const N: [string, string, string][] = [['book', 'books', 'bookes'], ['box', 'boxes', 'boxs'], ['child', 'children', 'childs'], ['man', 'men', 'mans'], ['woman', 'women', 'womans'], ['watch', 'watches', 'watchs'], ['baby', 'babies', 'babys'], ['knife', 'knives', 'knifes'], ['foot', 'feet', 'foots'], ['bus', 'buses', 'buss'], ['glass', 'glasses', 'glasss'], ['city', 'cities', 'citys'], ['tooth', 'teeth', 'tooths'], ['person', 'people', 'persons'], ['shelf', 'shelves', 'shelfs'], ['tomato', 'tomatoes', 'tomatos'], ['mouse', 'mice', 'mouses'], ['dress', 'dresses', 'dresss'], ['key', 'keys', 'keies'], ['sandwich', 'sandwiches', 'sandwichs']];
  const NUM = ['two', 'three', 'four', 'five', 'six'];
  N.forEach(([sg, pl, bad], i) => {
    add('plurals-demonstratives', gap(`I can see ${NUM[i % 5]} ___ (${sg}).`, pl));
    if (i % 2 === 0) add('plurals-demonstratives', err(`There are ${NUM[(i + 1) % 5]} ${bad} here.`, `There are ${NUM[(i + 1) % 5]} ${pl} here.`));
    const k = i % 4;
    if (k === 0) add('plurals-demonstratives', mc(`___ ${pl} here are new.`, 'These', ['This', 'That']));
    if (k === 1) add('plurals-demonstratives', mc(`___ ${sg} over there is old.`, 'That', ['Those', 'These']));
    if (k === 2) add('plurals-demonstratives', mc(`___ ${sg} here is mine.`, 'This', ['These', 'Those']));
    if (k === 3) add('plurals-demonstratives', mc(`___ ${pl} over there are old.`, 'Those', ['That', 'This']));
    if (i % 3 === 0) add('plurals-demonstratives', err(`This ${pl} are new.`, `These ${pl} are new.`, 'Con plural: these / those.'));
  });
}
{
  const P: [string, string, string, string][] = [['I', 'my', 'mine', 'me'], ['you', 'your', 'yours', 'you'], ['she', 'her', 'hers', 'she'], ['we', 'our', 'ours', 'us'], ['they', 'their', 'theirs', 'them']];
  const N = ['book', 'car', 'house', 'phone', 'bag', 'dog', 'bike', 'laptop', 'umbrella', 'coat'];
  each(P, N, 40, ([sub, adj, pron, obj], n, i) => {
    const k = i % 4;
    if (k === 0) add('possessives', mc(`This is ___ ${n}. (${sub})`, adj, [pron, obj === adj ? sub : obj].filter((w) => w !== adj)));
    if (k === 1) add('possessives', mc(`This ${n} is ___ . (${sub})`, pron, [adj, obj]));
    if (k === 2) add('possessives', err(`This is ${pron} ${n}.`, `This is ${adj} ${n}.`, 'Delante del sustantivo: my, your, her, our, their.'));
    if (k === 3) add('possessives', err(`That ${n} is ${adj}.`, `That ${n} is ${pron}.`, 'Sin sustantivo detrás: mine, yours, hers, ours, theirs.'));
  });
  const NAMES = ['Anna', 'Tom', 'my sister', 'the teacher', 'Mr Brown', 'my parents', 'the children', 'Lucy'];
  NAMES.forEach((nm, i) => {
    const pl = nm === 'my parents';
    const good = pl ? `${nm}'` : `${nm}'s`;
    add('possessives', mc(`This is ___ ${N[i]}.`, good, [nm, pl ? `${nm}s's` : `${nm}s`]));
  });
}
{
  const P: [string, string, string, string][] = [['I', 'me', 'my', 'yo'], ['he', 'him', 'his', 'él'], ['she', 'her', 'hers', 'ella'], ['we', 'us', 'our', 'nosotros'], ['they', 'them', 'their', 'ellos']];
  const VO = ['I know', 'Do you like', 'Can you help', 'I often see', 'Please call', 'We love', 'Wait for', 'Listen to', 'She works with', 'Look at'];
  const VS = ['live in Rome', 'work in a hospital', 'like chocolate', 'play football', 'speak English'];
  each(P, VO, 30, ([sub, obj, poss, es], f, i) => {
    if (sub === 'I' && f.startsWith('I ')) return;
    if (sub === 'we' && f.startsWith('We ')) return;
    const q = f.startsWith('Do') || f.startsWith('Can');
    if (i % 3 !== 2) add('pronouns-subject-object', mc(`${f} ___${q ? '?' : '.'} (${es})`, obj, [sub, poss].filter((w) => w !== obj)));
    else add('pronouns-subject-object', err(`${f} ${sub}${q ? '?' : '.'}`, `${f} ${obj}${q ? '?' : '.'}`, 'Después de un verbo o preposición: me, him, her, us, them.'));
  });
  P.forEach(([sub, obj, , es], i) => {
    const third = sub === 'he' || sub === 'she';
    const v = VS[i].replace(/^(\w+)/, (m) => (third ? (m === 'like' ? 'likes' : m + 's') : m));
    add('pronouns-subject-object', mc(`___ ${v}. (${es})`, cap(sub), [cap(obj), sub === 'she' ? 'Hers' : cap(P[i][2])]));
    add('pronouns-subject-object', err(`${cap(obj)} ${v}.`, `${cap(sub)} ${v}.`, 'Como sujeto: I, he, she, we, they.'));
  });
}
{
  const O = ['a car', 'two brothers', 'a new phone', 'blue eyes', 'a big house', 'a dog', 'a headache', 'a bike', 'three children', 'a good job', 'long hair', 'a cold'];
  each(S, O, 44, (x, o, i) => {
    const h = has(x), ho = h === 'has' ? 'have' : 'has';
    const k = i % 4;
    if (k === 0) add('have-got', mc(`${x.s} ___ ${o}.`, `${h} got`, [`${ho} got`, `${does(x)} got`]));
    if (k === 1) add('have-got', gap(`${x.s} ___ (not / have got) ${o}.`, `${h}n't got`, `${h} not got`));
    if (k === 2) add('have-got', mc(`___ ${mid(x)} got ${o}?`, cap(h), [cap(ho), cap(does(x))]));
    if (k === 3) add('have-got', err(`${x.s} ${ho} got ${o}.`, `${x.s} ${h} got ${o}.`));
  });
}
{
  const SG = ['a book on the table', 'a park near here', 'a bank in this street', 'a cat under the chair', 'a good restaurant in town', 'a problem with the car', 'a letter for you', 'a supermarket next to the school'];
  const PL = ['two chairs in the room', 'three people at the door', 'many shops in the centre', 'four windows in the kitchen', 'two beds in the room', 'lots of students in the class', 'five eggs in the fridge', 'some apples in the bag'];
  const UN = ['some milk in the fridge', 'some water in the bottle', 'some cheese on the plate', 'some coffee in the cup'];
  SG.forEach((c, i) => {
    add('there-is', mc(`There ___ ${c}.`, 'is', ['are', 'have']));
    add('there-is', i % 2 ? mc(`___ there ${c}?`, 'Is', ['Are', 'Has']) : gap(`There ___ (not / be) ${c}.`, "isn't", 'is not'));
    if (i % 2 === 0) add('there-is', err(`There are ${c}.`, `There is ${c}.`));
    else add('there-is', err(`It has ${c}.`, `There is ${c}.`, 'Para decir «hay»: there is / there are.'));
  });
  PL.forEach((c, i) => {
    add('there-is', mc(`There ___ ${c}.`, 'are', ['is', 'have']));
    add('there-is', i % 2 ? mc(`___ there ${c.replace(/^some /, 'any ')}?`, 'Are', ['Is', 'Have']) : gap(`There ___ (be) ${c}.`, 'are'));
    if (i % 2 === 0) add('there-is', err(`There is ${c}.`, `There are ${c}.`, 'Con plural: there are.'));
  });
  UN.forEach((c) => {
    add('there-is', mc(`There ___ ${c}.`, 'is', ['are', 'have'], 'Incontable: there is.'));
    add('there-is', mc(`There isn't ___ ${c.replace(/^some /, '')}.`, 'any', ['some', 'a']));
  });
}
{
  const A = ['swim', 'drive', 'cook', 'speak French', 'play the piano', 'ride a bike', 'dance', 'sing', 'ski', 'use a computer', 'run fast', 'play chess', 'read music', 'speak three languages'];
  each(S, A, 80, (x, a, i) => {
    const k = i % 5;
    if (k === 0) add('can-ability', mc(`${x.s} ___ ${a} very well.`, 'can', ['cans', 'can to']));
    if (k === 1) add('can-ability', mc(`${x.s} ___ ${a}.`, "can't", [`${does(x)}n't can`, 'not can']));
    if (k === 2 && x.p !== 1) add('can-ability', mc(`___ ${mid(x)} ${a}?`, 'Can', [cap(does(x)) + ' can', 'Cans']));
    if (k === 3) add('can-ability', err(`${x.s} can to ${a}.`, `${x.s} can ${a}.`, 'Después de can, el verbo va sin «to».'));
    if (k === 4) add('can-ability', x.p === 3 ? err(`${x.s} cans ${a}.`, `${x.s} can ${a}.`, 'can no cambia con he / she / it.') : gap(`${x.s} ___ (can / not) ${a}.`, "can't", 'cannot'));
  });
}
{
  const ADV = ['always', 'usually', 'often', 'sometimes', 'never', 'hardly ever', 'rarely'];
  const BEC = ['late', 'tired', 'at home on Sundays', 'busy', 'happy', 'hungry in the morning'];
  each(S, ADV, 20, (x, a, i) => {
    const c = BEC[i % BEC.length];
    if (i % 2 === 0) add('frequency', mc(`${x.s} ___ ${c}.`, `${be(x)} ${a}`, [`${a} ${be(x)}`, `${a} be`]));
    else add('frequency', err(`${x.s} ${a} ${be(x)} ${c}.`, `${x.s} ${be(x)} ${a} ${c}.`, 'Con el verbo to be, el adverbio va detrás.'));
  });
  each(S, VERBS, 36, (x, v, i) => {
    const a = ADV[i % ADV.length];
    const f = x.p === 3 ? v[1] : v[0], o = x.p === 3 ? v[0] : v[1];
    if (i % 3 === 0) add('frequency', mc(`${x.s} ___ ${v[5]}.`, `${a} ${f}`, [`${f} ${a}`, `${a} ${o}`]));
    if (i % 3 === 1) add('frequency', err(`${x.s} ${f} ${a} ${v[5]}.`, `${x.s} ${a} ${f} ${v[5]}.`, 'El adverbio de frecuencia va delante del verbo principal.'));
    if (i % 3 === 2) add('frequency', mc(`How ___ ${does(x)} ${mid(x)} ${v[0]} ${v[5]}?`, 'often', ['many', 'much']));
  });
}
{
  const I: [string, string][] = [['Open', 'the window'], ['Close', 'the door'], ['Turn off', 'the light'], ['Sit', 'down'], ['Listen', 'to me'], ['Wait', 'here'], ['Come', 'in'], ['Call', 'me later'], ['Take', 'an umbrella'], ['Wash', 'your hands'], ['Help', 'me with this'], ['Look', 'at this photo'], ['Write', 'your name here'], ['Drive', 'slowly'], ['Tell', 'me the truth'], ['Bring', 'your passport'], ['Read', 'the instructions'], ['Switch off', 'your phone']];
  I.forEach(([v, r], i) => {
    const w = v.split(' ');
    const third = (/(ch|sh|s|x)$/.test(w[0]) ? w[0] + 'es' : w[0] + 's') + (w[1] ? ' ' + w[1] : '');
    const k = i % 4;
    if (k === 0) add('imperatives', mc(`___ ${r}, please.`, v, [third, `To ${v.toLowerCase()}`]));
    if (k === 1) add('imperatives', mc(`___ ${r}!`, `Don't ${v.toLowerCase()}`, [`Not ${v.toLowerCase()}`, `Doesn't ${v.toLowerCase()}`]));
    if (k === 2) add('imperatives', err(`Not ${v.toLowerCase()} ${r}.`, `Don't ${v.toLowerCase()} ${r}.`, 'Imperativo negativo: don’t + verbo.'));
    if (k === 3) add('imperatives', err(`Don't to ${v.toLowerCase()} ${r}.`, `Don't ${v.toLowerCase()} ${r}.`));
    add('imperatives', gap(`___ (not / ${v.toLowerCase()}) ${r}.`, `Don't ${v.toLowerCase()}`, `Do not ${v.toLowerCase()}`));
  });
  const B = ['quiet', 'careful', 'late', 'afraid', 'patient', 'silly', 'rude', 'on time'];
  B.forEach((b, i) => {
    const neg = ['late', 'afraid', 'silly', 'rude'].includes(b);
    add('imperatives', neg ? mc(`___ ${b}!`, "Don't be", ['Not be', "Don't are"]) : mc(`___ ${b}!`, 'Be', ['Are', 'Being']));
    if (i % 2) add('imperatives', mc(`Let's ___ ${['to the cinema', 'home', 'for a walk', 'out tonight'][i % 4]}.`, 'go', ['to go', 'going']));
  });
}
{
  const Q: [string, string, string][] = [['Where', 'live', ''], ['Where', 'work', ''], ['What time', 'get up', ''], ['What', 'study', ''], ['Where', 'go', 'on Saturdays'], ['What', 'have', 'for breakfast'], ['When', 'play', 'tennis'], ['How', 'get', 'to work'], ['What', 'do', 'at weekends'], ['Why', 'want', 'that job']];
  const SQ = S.filter((x) => x.p !== 1);
  each(SQ, Q, 24, (x, [wh, v, r], i) => {
    const d = does(x), tail = r ? ' ' + r : '';
    const k = i % 3;
    if (k === 0) add('questions-basic', mc(`${wh} ___ ${mid(x)} ${v}${tail}?`, d, [d === 'does' ? 'do' : 'does', be(x)]));
    if (k === 1) add('questions-basic', err(`${wh} ${mid(x)} ${x.p === 3 ? (v === 'study' ? 'studies' : v === 'go' ? 'goes' : v === 'have' ? 'has' : v === 'do' ? 'does' : v.replace(/^(\w+)/, '$1s')) : v}${tail}?`, `${wh} ${d} ${mid(x)} ${v}${tail}?`, 'Pregunta: palabra interrogativa + do / does + sujeto + verbo.'));
    if (k === 2) add('questions-basic', mc(`${wh} did ${mid(x)} ___${tail} yesterday?`, v, [v === 'study' ? 'studied' : v === 'go' ? 'went' : v === 'have' ? 'had' : v === 'do' ? 'did' : v === 'get up' ? 'got up' : v === 'get' ? 'got' : v + (v.endsWith('e') ? 'd' : 'ed'), v.split(' ')[0] + 'ing' + (v.includes(' ') ? ' ' + v.split(' ')[1] : '')]));
  });
  each(SQ, ['doing', 'reading', 'cooking', 'watching', 'eating', 'making'], 10, (x, g, i) =>
    add('questions-basic', i % 2 ? mc(`What ___ ${mid(x)} ${g}?`, be(x), [be(x) === 'is' ? 'are' : 'is', does(x)]) : err(`What ${mid(x)} ${be(x)} ${g}?`, `What ${be(x)} ${mid(x)} ${g}?`, 'En las preguntas, el verbo to be va delante del sujeto.')),
  );
  each(SQ, ['from', 'today', 'now', 'so late'], 8, (x, r, i) => add('questions-basic', mc(`${r === 'from' ? 'Where' : r === 'so late' ? 'Why' : 'How'} ___ ${mid(x)} ${r}?`, be(x), [be(x) === 'is' ? 'are' : 'is', does(x)])));
}
{
  const GOV: [string, string][] = [['like', 'likes'], ['love', 'loves'], ['hate', 'hates'], ['enjoy', 'enjoys'], ["don't mind", "doesn't mind"], ["can't stand", "can't stand"]];
  const ACT: [string, string, string][] = [['swim', 'swimming', ''], ['cook', 'cooking', ''], ['read', 'reading', 'in bed'], ['dance', 'dancing', ''], ['get', 'getting', 'up early'], ['watch', 'watching', 'films'], ['play', 'playing', 'tennis'], ['travel', 'travelling', 'by train'], ['run', 'running', ''], ['shop', 'shopping', 'for clothes'], ['study', 'studying', 'at night'], ['drive', 'driving', 'in the city'], ['write', 'writing', 'letters'], ['sit', 'sitting', 'in the sun']];
  each(S, ACT, 48, (x, [b, g, r], i) => {
    const gv = GOV[i % GOV.length][x.p === 3 ? 1 : 0];
    const tail = r ? ' ' + r : '';
    const third = b === 'study' ? 'studies' : /(ch|sh)$/.test(b) ? b + 'es' : b + 's';
    const k = i % 3;
    if (k === 0) add('like-ing', mc(`${x.s} ${gv} ___${tail}.`, g, [b, third]));
    if (k === 1) add('like-ing', gap(`${x.s} ${gv} ___ (${b})${tail}.`, g));
    if (k === 2) add('like-ing', err(`${x.s} ${gv} ${b}${tail}.`, `${x.s} ${gv} ${g}${tail}.`, 'like / love / hate / enjoy + verbo en -ing.'));
  });
}

/* ================= A2 ================= */
{
  each(S, VERBS, 90, (x, v, i) => {
    const b = be(x), bo = b === 'is' ? 'are' : 'is';
    const k = i % 5;
    if (k === 0) add('present-continuous', mc(`${x.s} ___ ${v[5]} at the moment.`, `${b} ${v[4]}`, [`${bo} ${v[4]}`, v[4]]));
    if (k === 1) add('present-continuous', gap(`${x.s} ___ (${v[0]}) ${v[5]} right now.`, `${b} ${v[4]}`, `'${b === 'am' ? 'm' : b === 'is' ? 's' : 're'} ${v[4]}`));
    if (k === 2) add('present-continuous', gap(`${x.s} ___ (not / ${v[0]}) ${v[5]} today.`, ...(b === 'am' ? [`'m not ${v[4]}`, `am not ${v[4]}`] : [`${b}n't ${v[4]}`, `${b} not ${v[4]}`, `'${b === 'is' ? 's' : 're'} not ${v[4]}`])));
    if (k === 3 && x.p !== 1) add('present-continuous', mc(`___ ${mid(x)} ${v[4]} ${v[5]} now?`, cap(b), [cap(bo), cap(does(x))]));
    if (k === 4) add('present-continuous', err(`${x.s} ${b} ${v[0]} ${v[5]} at the moment.`, `${x.s} ${b} ${v[4]} ${v[5]} at the moment.`, 'be + verbo en -ing.'));
  });
}
{
  const T = ['yesterday', 'last week', 'two days ago', 'last night', 'on Monday', 'last summer'];
  each(S, VERBS.filter((v) => v[0] !== 'read'), 102, (x, v, i) => {
    const t = T[i % T.length];
    const k = i % 6;
    const irr = irregular(v);
    if (k === 0) add('past-simple', mc(`${x.s} ___ ${v[5]} ${t}.`, v[2], [v[1], v[3] !== v[2] ? v[3] : v[4]]));
    if (k === 1) add('past-simple', mc(`${x.s} ___ ${v[5]} ${t}.`, `didn't ${v[0]}`, [`didn't ${v[2]}`, `${does(x)}n't ${v[0]}`]));
    if (k === 2) add('past-simple', mc(`___ ${mid(x)} ${v[0]} ${v[5]} ${t}?`, 'Did', [cap(does(x)), cap(was(x))]));
    if (k === 3) add('past-simple', gap(`${x.s} ___ (${v[0]}) ${v[5]} ${t}.`, v[2]));
    if (k === 4) add('past-simple', irr ? err(`${x.s} ${fakePast(v)} ${v[5]} ${t}.`, `${x.s} ${v[2]} ${v[5]} ${t}.`, `${v[0]} es irregular: ${v[2]}.`) : err(`Did ${mid(x)} ${v[2]} ${v[5]} ${t}?`, `Did ${mid(x)} ${v[0]} ${v[5]} ${t}?`, 'Después de did, el verbo va en forma base.'));
    if (k === 5) add('past-simple', err(`${x.s} didn't ${v[2]} ${v[5]} ${t}.`, `${x.s} didn't ${v[0]} ${v[5]} ${t}.`, 'Después de didn’t, el verbo va en forma base.'));
  });
}
{
  const EV = ['when the phone rang', 'when I arrived', 'when it started to rain', 'when the lights went out', 'at eight o’clock last night', 'when we saw them'];
  each(S, VERBS, 80, (x, v, i) => {
    const w = was(x), wo = w === 'was' ? 'were' : 'was', e = EV[i % EV.length];
    const k = i % 4;
    if (k === 0) add('past-continuous', mc(`${x.s} ___ ${v[5]} ${e}.`, `${w} ${v[4]}`, [`${be(x)} ${v[4]}`, `${wo} ${v[4]}`]));
    if (k === 1) add('past-continuous', gap(`${x.s} ___ (${v[0]}) ${v[5]} ${e}.`, `${w} ${v[4]}`));
    if (k === 2) add('past-continuous', gap(`${x.s} ___ (not / ${v[0]}) ${v[5]} ${e}.`, `${w}n't ${v[4]}`, `${w} not ${v[4]}`));
    if (k === 3) add('past-continuous', i % 8 === 3 ? err(`${x.s} ${wo} ${v[4]} ${v[5]} ${e}.`, `${x.s} ${w} ${v[4]} ${v[5]} ${e}.`) : err(`${x.s} ${w} ${v[0]} ${v[5]} ${e}.`, `${x.s} ${w} ${v[4]} ${v[5]} ${e}.`, 'was / were + verbo en -ing.'));
  });
}
const ADJ: [string, string, string, string, string, string][] = [
  ['tall', 'taller', 'tallest', 'My brother', 'my father', 'building in the city'],
  ['big', 'bigger', 'biggest', 'An elephant', 'a horse', 'city in the country'],
  ['small', 'smaller', 'smallest', 'A mouse', 'a cat', 'room in the house'],
  ['old', 'older', 'oldest', 'My grandfather', 'my father', 'church in town'],
  ['cheap', 'cheaper', 'cheapest', 'The bus', 'the train', 'hotel in the area'],
  ['expensive', 'more expensive', 'most expensive', 'A house', 'a flat', 'restaurant in town'],
  ['good', 'better', 'best', 'This film', 'the last one', 'player in the team'],
  ['bad', 'worse', 'worst', 'This hotel', 'the other one', 'film of the year'],
  ['easy', 'easier', 'easiest', 'This exercise', 'the last one', 'question in the exam'],
  ['difficult', 'more difficult', 'most difficult', 'Chinese', 'Spanish', 'subject at school'],
  ['hot', 'hotter', 'hottest', 'July', 'May', 'month of the year'],
  ['cold', 'colder', 'coldest', 'January', 'March', 'month of the year'],
  ['interesting', 'more interesting', 'most interesting', 'This book', 'the film', 'museum in the city'],
  ['heavy', 'heavier', 'heaviest', 'This bag', 'that one', 'box in the room'],
  ['beautiful', 'more beautiful', 'most beautiful', 'This beach', 'that one', 'park in the city'],
  ['dangerous', 'more dangerous', 'most dangerous', 'A lion', 'a dog', 'road in the country'],
  ['long', 'longer', 'longest', 'The Nile', 'the Thames', 'river in the country'],
  ['busy', 'busier', 'busiest', 'Monday', 'Sunday', 'airport in the world'],
  ['fast', 'faster', 'fastest', 'A plane', 'a train', 'runner in the school'],
  ['comfortable', 'more comfortable', 'most comfortable', 'The sofa', 'the chair', 'bed in the hotel'],
];
const wrongComp = (a: (typeof ADJ)[number]) => (a[1].startsWith('more ') ? a[0] + 'er' : `more ${a[0]}`);
const wrongSup = (a: (typeof ADJ)[number]) => (a[2].startsWith('most ') ? a[0] + 'est' : `most ${a[0]}`);
{
  ADJ.forEach((a, i) => {
    const [adj, comp, sup, A, B, n] = a;
    add('comparatives', mc(`${A} is ___ than ${B}.`, comp, [wrongComp(a), sup]));
    add('comparatives', mc(`It's the ___ ${n}.`, sup, [comp, wrongSup(a)]));
    if (i % 2 === 0) add('comparatives', gap(`${A} is ___ (${adj}) than ${B}.`, comp));
    else add('comparatives', gap(`It's the ___ (${adj}) ${n}.`, sup));
    if (i % 3 === 0) add('comparatives', err(`${A} is ${wrongComp(a)} than ${B}.`, `${A} is ${comp} than ${B}.`));
    if (i % 3 === 1) add('comparatives', err(`${A} is ${comp} that ${B}.`, `${A} is ${comp} than ${B}.`, 'Comparativo + than.'));
    if (i % 3 === 2) add('comparatives', mc(`${B.charAt(0).toUpperCase() + B.slice(1)} isn't as ___ as ${A.charAt(0).toLowerCase() === A.charAt(0) ? A : /^(My|This|The|A|An)\b/.test(A) ? A.charAt(0).toLowerCase() + A.slice(1) : A}.`, adj, [comp, sup]));
    // B2: comparativos avanzados
    if (i % 2 === 0) add('comparatives-advanced', mc(`${A} is ___ ${comp} than ${B}.`, i % 4 === 0 ? 'much' : 'far', ['very', 'more']));
    else add('comparatives-advanced', mc(`${A} is twice as ___ as ${B}.`, adj, [comp, sup]));
    if (i % 3 === 0) add('comparatives-advanced', mc(`It's one of the ___ ${n.replace(/^(\w+)/, (m) => (m.endsWith('y') ? m.slice(0, -1) + 'ies' : /(ch|x|s)$/.test(m) ? m + 'es' : m + 's'))}.`, sup, [comp, wrongSup(a)]));
    if (i % 3 === 1) add('comparatives-advanced', err(`${A} is very ${comp} than ${B}.`, `${A} is much ${comp} than ${B}.`, 'Con comparativos: much / far / a lot, no «very».'));
    if (i % 3 === 2) add('comparatives-advanced', mc(`${A} is by ___ the ${sup} I know.`, 'far', ['much', 'very']));
    if (i % 4 === 1) add('comparatives-advanced', gap(`The ${comp} it is, the ___ (good) I like it.`, 'better'));
    if (i % 4 === 3) add('comparatives-advanced', mc(`${A} is slightly ___ than ${B}.`, comp, [adj, sup]));
  });
}
{
  const P: [string, string, string, string][] = [['careful', 'carefully', 'drives', 'driver'], ['quick', 'quickly', 'learns', 'learner'], ['slow', 'slowly', 'walks', 'walker'], ['bad', 'badly', 'sings', 'singer'], ['good', 'well', 'plays', 'player'], ['quiet', 'quietly', 'speaks', 'speaker'], ['hard', 'hard', 'works', 'worker'], ['fast', 'fast', 'runs', 'runner'], ['beautiful', 'beautifully', 'dances', 'dancer'], ['clear', 'clearly', 'writes', 'writer'], ['dangerous', 'dangerously', 'drives', 'driver'], ['patient', 'patiently', 'teaches', 'teacher'], ['brilliant', 'brilliantly', 'cooks', 'cook'], ['terrible', 'terribly', 'swims', 'swimmer']];
  each(S3, P, 42, (x, [adj, adv, v, n], i) => {
    const same = adj === adv;
    const wrongAdv = adj === 'good' ? 'goodly' : adj === 'hard' ? 'hardly' : adj === 'fast' ? 'fastly' : adj;
    const k = i % 3;
    if (k === 0) add('adjectives-adverbs', mc(`${x.s} ${v} ___ .`, adv, same ? [wrongAdv, `very ${adj}ly`] : [adj, `very ${adj}`]));
    if (k === 1) add('adjectives-adverbs', mc(`${x.s} is a ___ ${n}.`, adj, same ? [wrongAdv, `very ${wrongAdv}`] : [adv, `very ${adv}`]));
    if (k === 2) add('adjectives-adverbs', same ? err(`${x.s} ${v} very ${wrongAdv}.`, `${x.s} ${v} very ${adv}.`, `${adj}: el adverbio es igual que el adjetivo.`) : err(`${x.s} ${v} very ${adj}.`, `${x.s} ${v} very ${adv}.`, 'Para decir cómo se hace algo: adverbio.'));
  });
}
{
  const UNC = ['milk', 'water', 'sugar', 'money', 'time', 'rice', 'bread', 'coffee', 'homework', 'furniture', 'information', 'traffic'];
  const CNT = ['apples', 'eggs', 'chairs', 'friends', 'books', 'students', 'cars', 'tomatoes', 'people', 'emails', 'photos', 'questions'];
  UNC.forEach((n, i) => {
    add('quantifiers', mc(`How ___ ${n} ${n === 'traffic' ? 'is there' : 'do we have'}?`, 'much', ['many', 'lot']));
    if (i % 2 === 0) add('quantifiers', mc(`There isn't ___ ${n}.`, 'much', ['many', 'a']));
    else add('quantifiers', mc(`We have ___ ${n}.`, 'some', ['any', 'a']));
    if (i % 3 === 0) add('quantifiers', err(`How many ${n} ${n === 'traffic' ? 'is there' : 'do we have'}?`, `How much ${n} ${n === 'traffic' ? 'is there' : 'do we have'}?`, `${n} es incontable: how much.`));
    if (i % 3 === 1) add('quantifiers', mc(`Is there ___ ${n}?`, 'any', ['a', 'many']));
    if (i % 3 === 2) add('quantifiers', mc(`There's ___ ${n}.`, 'a lot of', ['many', 'a lot']));
  });
  CNT.forEach((n, i) => {
    add('quantifiers', mc(`How ___ ${n} are there?`, 'many', ['much', 'lot']));
    if (i % 2 === 0) add('quantifiers', mc(`There aren't ___ ${n}.`, 'many', ['much', 'a']));
    else add('quantifiers', mc(`Are there ___ ${n}?`, 'any', ['much', 'a']));
    if (i % 3 === 0) add('quantifiers', err(`How much ${n} are there?`, `How many ${n} are there?`, 'Contable en plural: how many.'));
    if (i % 3 === 1) add('quantifiers', err(`There aren't much ${n}.`, `There aren't many ${n}.`));
    if (i % 3 === 2) add('quantifiers', mc(`There are ___ ${n}.`, 'a lot of', ['much', 'a lot']));
  });
  // B1: few / little
  const SHOP_C = ['eggs', 'apples', 'tomatoes', 'potatoes', 'biscuits', 'oranges', 'onions', 'bananas', 'lemons', 'carrots'];
  const SHOP_U = ['milk', 'sugar', 'rice', 'bread', 'coffee', 'butter', 'cheese', 'flour', 'oil', 'juice'];
  SHOP_U.forEach((n, i) => {
    add('few-little', mc(`There is very ___ ${n} left, so we must buy some.`, 'little', ['few', 'a few']));
    add('few-little', mc(`There is ___ ${n} left, so we don't need to buy any.`, 'a little', ['a few', 'few']));
    if (i % 2 === 0) add('few-little', err(`There is a few ${n} left.`, `There is a little ${n} left.`, `${n} es incontable: (a) little.`));
  });
  SHOP_C.forEach((n, i) => {
    add('few-little', mc(`There are very ___ ${n} left, so we must buy some more.`, 'few', ['little', 'a little']));
    add('few-little', mc(`There are ___ ${n} left, so we don't need any more.`, 'a few', ['a little', 'little']));
    if (i % 2 === 0) add('few-little', err(`There are a little ${n} left.`, `There are a few ${n} left.`, 'Contable en plural: (a) few.'));
  });
}
{
  each(S, VERBS, 85, (x, v, i) => {
    const b = be(x);
    const k = i % 5;
    if (k === 0) add('future-basic', mc(`I think ${mid(x)} ___ ${v[5]} tomorrow.`, `will ${v[0]}`, [`will ${v[1]}`, `will ${v[4]}`]));
    if (k === 1) add('future-basic', mc(`${x.s} ___ ${v[5]} tomorrow.`, `won't ${v[0]}`, [`won't ${v[1]}`, `${does(x)}n't will ${v[0]}`]));
    if (k === 2) add('future-basic', mc(`${x.s} ___ going to ${v[0]} ${v[5]} next week.`, b, [b === 'is' ? 'are' : 'is', 'will']));
    if (k === 3) add('future-basic', gap(`${x.s} ${b} going ___ (${v[0]}) ${v[5]} next month.`, `to ${v[0]}`));
    if (k === 4) add('future-basic', i % 10 === 4 ? err(`${x.s} will to ${v[0]} ${v[5]} tomorrow.`, `${x.s} will ${v[0]} ${v[5]} tomorrow.`, 'will + verbo sin «to».') : err(`${x.s} ${b} going ${v[0]} ${v[5]} next week.`, `${x.s} ${b} going to ${v[0]} ${v[5]} next week.`, 'be going to + verbo.'));
  });
}
{
  const EXP = VERBS.filter((v) => !['live', 'get', 'work', 'have', 'sleep', 'read'].includes(v[0]));
  each(S, EXP, 90, (x, v, i) => {
    const h = has(x), ho = h === 'has' ? 'have' : 'has';
    const irr = v[2] !== v[3];
    const k = i % 6;
    if (k === 0) add('present-perfect-basic', mc(`${x.s} ___ already ${v[3]} ${v[5]}.`, h, [ho, 'did']));
    if (k === 1) add('present-perfect-basic', irr ? mc(`${x.s} ${h} never ___ ${v[5]}.`, v[3], [v[2], v[0], v[4]].slice(0, v[0] === v[3] ? 3 : 2)) : mc(`${x.s} ${h} never ___ ${v[5]}.`, v[3], [v[0], v[4]]));
    if (k === 2) add('present-perfect-basic', gap(`${x.s} ___ (${v[0]}) ${v[5]} many times.`, `${h} ${v[3]}`, `'${h === 'has' ? 's' : 've'} ${v[3]}`));
    if (k === 3) add('present-perfect-basic', gap(`${x.s} ___ (not / ${v[0]}) ${v[5]} yet.`, `${h}n't ${v[3]}`, `${h} not ${v[3]}`));
    if (k === 4 && x.p !== 1) add('present-perfect-basic', mc(`___ ${mid(x)} ever ${v[3]} ${v[5]}?`, cap(h), [cap(ho), 'Did']));
    if (k === 5) add('present-perfect-basic', irr ? err(`${x.s} ${h} ${v[2]} ${v[5]} before.`, `${x.s} ${h} ${v[3]} ${v[5]} before.`, `Participio de ${v[0]}: ${v[3]}.`) : err(`${x.s} ${ho} ${v[3]} ${v[5]} before.`, `${x.s} ${h} ${v[3]} ${v[5]} before.`));
  });
  // B1: present perfect o pasado simple
  const PAST_T = ['yesterday', 'last week', 'in 2019', 'two days ago', 'last night'];
  each(S, EXP, 80, (x, v, i) => {
    const h = has(x), t = PAST_T[i % PAST_T.length];
    const k = i % 5;
    if (k === 0) add('pp-vs-past', mc(`${x.s} ___ ${v[5]} ${t}.`, v[2], [`${h} ${v[3]}`, `${h} been ${v[4]}`], 'Con un momento acabado del pasado: pasado simple.'));
    if (k === 1) add('pp-vs-past', mc(`${x.s} ___ ${v[5]} twice so far this year.`, `${h} ${v[3]}`, [`${be(x)} ${v[4]}`, `${was(x)} ${v[4]}`]));
    if (k === 2) add('pp-vs-past', gap(`${x.s} ___ (${v[0]}) ${v[5]} ${t}.`, v[2]));
    if (k === 3) add('pp-vs-past', err(`${x.s} ${h} ${v[3]} ${v[5]} ${t}.`, `${x.s} ${v[2]} ${v[5]} ${t}.`, `Con «${t}» no se usa el present perfect.`));
    if (k === 4) add('pp-vs-past', gap(`${x.s} ___ (never / ${v[0]}) ${v[5]} in ${x.poss} life.`, `${h} never ${v[3]}`, `'${h === 'has' ? 's' : 've'} never ${v[3]}`));
  });
}
{
  const GOV_TO = ['wanted', 'needed', 'decided', 'hoped', 'planned', 'promised', 'agreed', 'refused', 'offered', 'managed', 'expected'];
  const GOV_ING = ['enjoyed', 'finished', 'avoided', "didn't mind", 'kept', 'suggested', 'missed', 'practised', 'considered', 'gave up', "couldn't stand", 'imagined'];
  const ACT: [string, string, string][] = [['buy', 'buying', 'a new car'], ['move', 'moving', 'to London'], ['change', 'changing', 'jobs'], ['cook', 'cooking', 'dinner'], ['work', 'working', 'at weekends'], ['travel', 'travelling', 'alone'], ['speak', 'speaking', 'in public'], ['get', 'getting', 'up early'], ['pay', 'paying', 'the bill'], ['wait', 'waiting', 'for the bus'], ['drive', 'driving', 'at night'], ['study', 'studying', 'abroad'], ['go', 'going', 'to the dentist'], ['play', 'playing', 'chess'], ['write', 'writing', 'the report'], ['live', 'living', 'in the city'], ['run', 'running', 'a marathon'], ['sell', 'selling', 'the house']];
  const SS = S.filter((x) => x.p !== 2);
  const run = (topic: string, to: string[], ing: string[], n: number) =>
    each(SS, ACT, n, (x, [b, g, r], i) => {
      const isTo = i % 2 === 0;
      const gv = isTo ? to[Math.floor(i / 2) % to.length] : ing[Math.floor(i / 2) % ing.length];
      const good = isTo ? `to ${b}` : g, bad = isTo ? g : `to ${b}`;
      const k = Math.floor(i / 2) % 3;
      if (k === 0) add(topic, mc(`${x.s} ${gv} ___ ${r}.`, good, [bad, b]));
      if (k === 1) add(topic, gap(`${x.s} ${gv} ___ (${b}) ${r}.`, good));
      if (k === 2) add(topic, err(`${x.s} ${gv} ${bad} ${r}.`, `${x.s} ${gv} ${good} ${r}.`, isTo ? `${gv.replace(/ed$|d$/, '')}… + to + infinitivo.` : `Detrás de «${gv}» va el verbo en -ing.`));
    });
  run('verb-patterns-basic', GOV_TO.slice(0, 6), GOV_ING.slice(0, 4), 48);
  run('gerund-infinitive-b1', GOV_TO.slice(5), GOV_ING.slice(3), 60);
}
{
  const FOR = ['two years', 'a long time', 'six months', 'ages', 'three days', 'ten minutes', 'a week', 'many years'];
  const SINCE = ['2015', 'Monday', 'last summer', 'I was a child', 'nine o’clock', 'January', 'my birthday', 'we met'];
  const FR: [string, string][] = [['lived here', 'I have'], ['known her', 'We have'], ['worked in this company', 'She has'], ['had this car', 'They have'], ['been married', 'He has'], ['studied English', 'I have'], ['been waiting', 'We have']];
  const AGO: string[] = ['She moved here', 'We met', 'He started this job', 'They got married', 'I bought this car', 'The film started', 'I saw her', 'He left'];
  FOR.forEach((t, i) => {
    const [vp, s] = FR[i % FR.length];
    add('for-since-ago', mc(`${s} ${vp} ___ ${t}.`, 'for', ['since', 'ago']));
    add('for-since-ago', mc(`${AGO[i]} ${t} ___ .`, 'ago', ['since', 'for']));
    if (i % 2 === 0) add('for-since-ago', err(`${s} ${vp} since ${t}.`, `${s} ${vp} for ${t}.`, 'for + duración; since + momento de inicio.'));
    else add('for-since-ago', err(`${AGO[i]} since ${t}.`, `${AGO[i]} ${t} ago.`, 'Con pasado simple: … ago.'));
  });
  SINCE.forEach((t, i) => {
    const [vp, s] = FR[(i + 3) % FR.length];
    add('for-since-ago', mc(`${s} ${vp} ___ ${t}.`, 'since', ['for', 'ago']));
    if (i % 2 === 0) add('for-since-ago', err(`${s} ${vp} for ${t}.`, `${s} ${vp} since ${t}.`, 'since + momento de inicio.'));
    else add('for-since-ago', gap(`${s} ${vp} ___ ${t}. (for / since)`, 'since'));
  });
  FR.forEach(([vp, s], i) => add('for-since-ago', mc(`How long ___ ${s.split(' ')[0].toLowerCase() === 'i' ? 'you' : s.split(' ')[0].toLowerCase()} ${vp}?`, s.split(' ')[0] === 'I' ? 'have' : s.split(' ')[1], [s.split(' ')[1] === 'has' ? 'does' : 'do', s.split(' ')[1] === 'has' ? 'is' : 'are'].concat(i > 99 ? ['x'] : []))));
}
{
  const T: [string, string, string][] = [['It', 'rain later', 'rains later'], ['She', 'be at home', 'is at home'], ['We', 'go to the beach', 'goes to the beach'], ['He', 'come to the party', 'comes to the party'], ['They', 'be late', 'are late'], ['I', 'buy a new phone', 'buys a new phone'], ['The shop', 'be closed', 'is closed'], ['You', 'need a coat', 'needs a coat'], ['Anna', 'call tonight', 'calls tonight'], ['The train', 'arrive early', 'arrives early']];
  T.forEach(([s, vp, v3], i) => {
    const m = i % 2 ? 'may' : 'might';
    add('may-might', mc(`${s} ___ ${vp}.`, m, [`${m}s`, `${m} to`]));
    add('may-might', mc(`${s} ${m} ___ ${vp.split(' ').slice(1).join(' ')}.`, vp.split(' ')[0], [`to ${vp.split(' ')[0]}`, v3.split(' ')[0]]));
    add('may-might', i % 2 ? err(`${s} ${m} to ${vp}.`, `${s} ${m} ${vp}.`, 'may / might + verbo sin «to».') : err(`${s} ${m} ${v3}.`, `${s} ${m} ${vp}.`, 'Detrás de un modal, forma base.'));
    add('may-might', mc(`${s} ___ ${vp}. I'm not sure.`, `${m} not`, [`${does({ p: s === 'I' || s === 'We' || s === 'They' || s === 'You' ? 4 : 3 } as Subj)}n't ${m}`, `not ${m}`]));
  });
}
{
  const P: [string, string, string][] = [['She went to the shop', 'buy', 'some bread'], ["I'm saving money", 'buy', 'a car'], ['He went to the library', 'borrow', 'a book'], ['We use a knife', 'cut', 'bread'], ['She phoned', 'say', 'thank you'], ["They're going to Paris", 'see', 'the Eiffel Tower'], ['I got up early', 'catch', 'the first train'], ["He's studying hard", 'pass', 'his exams'], ['She went to the bank', 'get', 'some money'], ['We stopped', 'have', 'a coffee'], ['I need a pen', 'sign', 'the form'], ['He turned on the TV', 'watch', 'the news'], ["She's learning English", 'get', 'a better job'], ["I went to the chemist's", 'buy', 'some aspirin'], ['They came', 'help', 'us'], ['He called', 'ask', 'a question'], ['We went to the station', 'meet', 'my aunt'], ['I opened the window', 'let', 'some air in']];
  P.forEach(([m, v, r], i) => {
    add('infinitive-purpose', mc(`${m} ___ ${r}.`, `to ${v}`, [`for ${v}`, `for to ${v}`]));
    add('infinitive-purpose', i % 2 ? err(`${m} for ${v} ${r}.`, `${m} to ${v} ${r}.`, 'Finalidad: to + infinitivo (nunca «for + verbo»).') : gap(`${m} ___ (${v}) ${r}.`, `to ${v}`));
    if (i % 3 === 0) add('infinitive-purpose', err(`${m} for to ${v} ${r}.`, `${m} to ${v} ${r}.`));
  });
}
{
  const T: [string, string, string, string][] = [["I'll call you when I", 'get', 'home', 'I'], ["She'll text us as soon as she", 'lands', '', 'she'], ["We'll start when everyone", 'is', 'here', 'x'], ['Wait here until I', 'come', 'back', 'I'], ["He'll buy a car after he", 'passes', 'his test', 'he'], ["I'll finish this before the boss", 'arrives', '', 'x'], ["They'll tell us when they", 'have', 'the results', 'they'], ["Don't leave before she", 'calls', '', 'she'], ["We'll go out when the rain", 'stops', '', 'x'], ["I'll help you as soon as I", 'finish', 'this email', 'I'], ["She'll be happy when she", 'hears', 'the news', 'she'], ['Turn off the lights before you', 'leave', '', 'you'], ["We won't eat until Dad", 'gets', 'home', 'x'], ["I'll tell him when I", 'see', 'him', 'I'], ['Call me as soon as the plane', 'lands', '', 'x'], ["He'll move out when he", 'finds', 'a job', 'he'], ["I'll wait until the shop", 'opens', '', 'x'], ["They'll celebrate after they", 'win', 'the match', 'they'], ["You'll feel better when you", 'eat', 'something', 'you'], ["She'll reply when she", 'has', 'time', 'she']];
  const baseOf = (f: string) => ({ is: 'be', has: 'have', passes: 'pass' } as Record<string, string>)[f] ?? (f.endsWith('s') && !['pass'].includes(f) ? f.slice(0, -1) : f);
  T.forEach(([m, f, r, _], i) => {
    const tail = r ? ' ' + r : '';
    const b = baseOf(f);
    add('time-clauses', mc(`${m} ___${tail}.`, f, [`will ${b}`, `would ${b}`], 'Tras when / as soon as / before / after / until: presente, no will.'));
    if (i % 2 === 0) add('time-clauses', err(`${m} will ${b}${tail}.`, `${m} ${f}${tail}.`, 'En la oración de tiempo no se usa will.'));
    else add('time-clauses', gap(`${m} ___ (${b})${tail}.`, f));
  });
}

/* ================= B1 ================= */
{
  const DUR: [string, string, string][] = [['work', 'working', 'here'], ['study', 'studying', 'English'], ['wait', 'waiting', 'for the bus'], ['read', 'reading', 'that book'], ['play', 'playing', 'video games'], ['cook', 'cooking', ''], ['clean', 'cleaning', 'the house'], ['run', 'running', ''], ['drive', 'driving', ''], ['watch', 'watching', 'TV'], ['live', 'living', 'in this flat'], ['learn', 'learning', 'to drive'], ['look', 'looking', 'for a job'], ['write', 'writing', 'emails']];
  const T = ['for two hours', 'since nine o’clock', 'all morning', 'for ages', 'since Monday', 'for three weeks'];
  each(S, DUR, 80, (x, [b, g, r], i) => {
    const h = has(x), t = T[i % T.length], tail = r ? ' ' + r : '';
    const k = i % 5;
    if (k === 0) add('pp-continuous', mc(`${x.s} ___${tail} ${t}.`, `${h} been ${g}`, [`${be(x)} ${g}`, `${h} ${g}`]));
    if (k === 1) add('pp-continuous', gap(`${x.s} ___ (${b})${tail} ${t}.`, `${h} been ${g}`, `'${h === 'has' ? 's' : 've'} been ${g}`));
    if (k === 2) add('pp-continuous', err(`${x.s} ${be(x)} ${g}${tail} ${t}.`, `${x.s} ${h} been ${g}${tail} ${t}.`, 'Acción que empezó antes y sigue: have / has been + -ing.'));
    if (k === 3 && x.p !== 1) add('pp-continuous', mc(`How long ___ ${mid(x)} been ${g}${tail}?`, h, [be(x), does(x)]));
    if (k === 4) add('pp-continuous', gap(`${x.s} ___ (not / ${b})${tail} ${t.replace(/^(for|since) .*/, 'for very long')}.`, `${h}n't been ${g}`, `${h} not been ${g}`));
  });
}
{
  const C: V[] = [['finish', '', 'finished', 'finished', '', 'the report'], ['leave', '', 'left', 'left', '', 'the office'], ['pay', '', 'paid', 'paid', '', 'the bill'], ['make', '', 'made', 'made', '', 'dinner'], ['clean', '', 'cleaned', 'cleaned', '', 'the kitchen'], ['lose', '', 'lost', 'lost', '', 'the tickets'], ['forget', '', 'forgot', 'forgotten', '', 'the password'], ['find', '', 'found', 'found', '', 'a solution'], ['sell', '', 'sold', 'sold', '', 'the car'], ['eat', '', 'ate', 'eaten', '', 'everything'], ['go', '', 'went', 'gone', '', 'home'], ['see', '', 'saw', 'seen', '', 'the film'], ['take', '', 'took', 'taken', '', 'the last train'], ['write', '', 'wrote', 'written', '', 'the email'], ['do', '', 'did', 'done', '', 'the washing-up'], ['break', '', 'broke', 'broken', '', 'the window']];
  const W = ['By the time we arrived,', 'When I got home,', 'Before the meeting started,', 'When the police came,', 'By nine o’clock,'];
  each(S.filter((x) => x.p !== 1), C, 80, (x, v, i) => {
    const w = W[i % W.length];
    const k = i % 4;
    if (k === 0) add('past-perfect', mc(`${w} ${mid(x)} ___ ${v[5]}.`, `had ${v[3]}`, [`${has(x)} ${v[3]}`, v[2] !== v[3] ? `had ${v[2]}` : `had ${v[0]}`]));
    if (k === 1) add('past-perfect', gap(`${w} ${mid(x)} ___ (already / ${v[0]}) ${v[5]}.`, `had already ${v[3]}`, `'d already ${v[3]}`));
    if (k === 2) add('past-perfect', err(`${w} ${mid(x)} ${has(x)} already ${v[3]} ${v[5]}.`, `${w} ${mid(x)} had already ${v[3]} ${v[5]}.`, 'Anterior a otro momento del pasado: had + participio.'));
    if (k === 3) add('past-perfect', gap(`${w} ${mid(x)} ___ (not / ${v[0]}) ${v[5]} yet.`, `hadn't ${v[3]}`, `had not ${v[3]}`));
  });
}
const COND: [string, string, string, string, string, string, string][] = [
  // [base, 3ª, pasado, participio, resto] → [resultado base, participio del resultado + resto]
  ['study', 'studies', 'studied', 'studied', 'harder', 'pass', 'passed the exam'],
  ['leave', 'leaves', 'left', 'left', 'now', 'catch', 'caught the train'],
  ['save', 'saves', 'saved', 'saved', 'more money', 'buy', 'bought a car'],
  ['eat', 'eats', 'ate', 'eaten', 'less sugar', 'feel', 'felt better'],
  ['practise', 'practises', 'practised', 'practised', 'every day', 'improve', 'improved quickly'],
  ['take', 'takes', 'took', 'taken', 'a taxi', 'arrive', 'arrived on time'],
  ['sleep', 'sleeps', 'slept', 'slept', 'more', 'have', 'had more energy'],
  ['wear', 'wears', 'wore', 'worn', 'a coat', 'stay', 'stayed warm'],
  ['get', 'gets', 'got', 'got', 'up earlier', 'have', 'had time for breakfast'],
  ['work', 'works', 'worked', 'worked', 'harder', 'get', 'got a promotion'],
  ['go', 'goes', 'went', 'gone', 'by bike', 'save', 'saved money'],
  ['drink', 'drinks', 'drank', 'drunk', 'more water', 'feel', 'felt less tired'],
  ['miss', 'misses', 'missed', 'missed', 'the bus', 'be', 'been late'],
  ['ask', 'asks', 'asked', 'asked', 'for help', 'finish', 'finished sooner'],
  ['book', 'books', 'booked', 'booked', 'early', 'pay', 'paid less'],
];
{
  each(PRON, COND, 136, (x, c, i) => {
    const [b, s3, p, pp, r, rb, rpp] = c;
    const pres = x.p === 3 ? s3 : b;
    const rest = rpp.split(' ').slice(1).join(' ');
    const k = i % 8;
    // primera
    if (k === 0) add('conditionals-012', mc(`If ${x.pro} ${pres} ${r}, ${x.pro} ___ ${rest}.`, `will ${rb}`, [`would ${rb}`, `would have ${rpp.split(' ')[0]}`]));
    if (k === 1) add('conditionals-012', mc(`If ${x.pro} ___ ${r}, ${x.pro} will ${rb} ${rest}.`, pres, [`will ${b}`, `would ${b}`], 'En la oración con if: presente, no will.'));
    if (k === 2) add('conditionals-012', err(`If ${x.pro} will ${b} ${r}, ${x.pro} will ${rb} ${rest}.`, `If ${x.pro} ${pres} ${r}, ${x.pro} will ${rb} ${rest}.`, 'Después de if no se usa will.'));
    // segunda
    if (k === 3) add('conditionals-012', mc(`If ${x.pro} ${p} ${r}, ${x.pro} ___ ${rest}.`, `would ${rb}`, [`will ${rb}`, `would have ${rpp.split(' ')[0]}`]));
    if (k === 4) add('conditionals-012', mc(`If ${x.pro} ___ ${r}, ${x.pro} would ${rb} ${rest}.`, p, [`would ${b}`, `will ${b}`]));
    if (k === 5) add('conditionals-012', gap(`If ${x.pro} ___ (${b}) ${r}, ${x.pro} would ${rb} ${rest}.`, p));
    if (k === 6) add('conditionals-012', err(`If ${x.pro} would ${b} ${r}, ${x.pro} would ${rb} ${rest}.`, `If ${x.pro} ${p} ${r}, ${x.pro} would ${rb} ${rest}.`, 'Después de if no se usa would: pasado simple.'));
    if (k === 7) add('conditionals-012', gap(`If ${x.pro} ${pres} ${r}, ${x.pro} ___ (${rb}) ${rest}.`, `will ${rb}`, `'ll ${rb}`));
    // tercera (B2)
    const k3 = i % 5;
    if (k3 === 0) add('conditionals-3-mixed', mc(`If ${x.pro} had ${pp} ${r}, ${x.pro} ___ ${rest}.`, `would have ${rpp.split(' ')[0]}`, [`would ${rb}`, `will have ${rpp.split(' ')[0]}`]));
    if (k3 === 1) add('conditionals-3-mixed', mc(`If ${x.pro} ___ ${r}, ${x.pro} would have ${rpp}.`, `had ${pp}`, [`would have ${pp}`, `has ${pp}`]));
    if (k3 === 2) add('conditionals-3-mixed', gap(`If ${x.pro} ___ (${b}) ${r}, ${x.pro} would have ${rpp}.`, `had ${pp}`, `'d ${pp}`));
    if (k3 === 3) add('conditionals-3-mixed', err(`If ${x.pro} would have ${pp} ${r}, ${x.pro} would have ${rpp}.`, `If ${x.pro} had ${pp} ${r}, ${x.pro} would have ${rpp}.`, 'Tercera condicional: if + had + participio.'));
    if (k3 === 4) add('conditionals-3-mixed', gap(`If ${x.pro} had ${pp} ${r}, ${x.pro} ___ (${rb}) ${rest}.`, `would have ${rpp.split(' ')[0]}`, `would've ${rpp.split(' ')[0]}`));
  });
}
{
  each(S, VERBS, 85, (x, v, i) => {
    const k = i % 5;
    if (k === 0) add('used-to', mc(`${x.s} ___ ${v[5]}, but not any more.`, `used to ${v[0]}`, [`use to ${v[0]}`, `used to ${v[4]}`]));
    if (k === 1) add('used-to', mc(`${x.s} ___ ${v[5]} in the past.`, `didn't use to ${v[0]}`, [`usedn't ${v[0]}`, `didn't use ${v[0]}`]));
    if (k === 2) add('used-to', gap(`${x.s} ___ (${v[0]}) ${v[5]} years ago, but not now.`, `used to ${v[0]}`));
    if (k === 3) add('used-to', err(`${x.s} use to ${v[0]} ${v[5]} years ago.`, `${x.s} used to ${v[0]} ${v[5]} years ago.`));
    if (k === 4) add('used-to', mc(`${x.s} ${be(x)} used to ___ ${v[5]} now.`, v[4], [v[0], v[2] === v[0] ? v[1] : v[2]], 'be used to + -ing = estar acostumbrado.'));
  });
}
const OBJ: [string, boolean, string, string, string, string | null, string | null][] = [
  ['The report', false, 'write', 'wrote', 'written', 'every month', 'last week'],
  ['The windows', true, 'clean', 'cleaned', 'cleaned', 'every week', 'yesterday'],
  ['The bill', false, 'pay', 'paid', 'paid', 'at the end of the month', 'last night'],
  ['These cars', true, 'make', 'made', 'made', 'in Germany', 'in 2010'],
  ['The letters', true, 'send', 'sent', 'sent', 'every morning', 'on Friday'],
  ['The room', false, 'paint', 'painted', 'painted', 'every year', 'last summer'],
  ['English', false, 'speak', 'spoke', 'spoken', 'all over the world', null],
  ['The bridge', false, 'build', 'built', 'built', null, 'in 1890'],
  ['The thief', false, 'catch', 'caught', 'caught', null, 'two days ago'],
  ['The tickets', true, 'sell', 'sold', 'sold', 'online', 'in ten minutes'],
  ['Dinner', false, 'serve', 'served', 'served', 'at eight', 'very late'],
  ['The keys', true, 'find', 'found', 'found', null, 'in the garden'],
  ['The match', false, 'cancel', 'cancelled', 'cancelled', null, 'because of the rain'],
  ['Two men', true, 'arrest', 'arrested', 'arrested', null, 'last night'],
  ['Coffee', false, 'grow', 'grew', 'grown', 'in Brazil', null],
  ['The photos', true, 'take', 'took', 'taken', null, 'in Paris'],
  ['The car', false, 'steal', 'stole', 'stolen', null, 'last night'],
  ['The rooms', true, 'clean', 'cleaned', 'cleaned', 'every day', null],
  ['This book', false, 'translate', 'translated', 'translated', 'into ten languages', 'in 1995'],
  ['The parcels', true, 'deliver', 'delivered', 'delivered', 'before noon', 'this morning'],
  ['The film', false, 'direct', 'directed', 'directed', null, 'by a young woman'],
  ['Many houses', true, 'destroy', 'destroyed', 'destroyed', null, 'in the storm'],
];
{
  const s3 = (b: string) => (/(ch|sh|s|x)$/.test(b) ? b + 'es' : b + 's');
  OBJ.forEach(([o, pl, b, p, pp, tp, tpast], i) => {
    const is = pl ? 'are' : 'is', wasF = pl ? 'were' : 'was';
    const wrongPP = p !== pp ? p : b;
    if (tp) {
      add('passive-basic', mc(`${o} ___ ${tp}.`, `${is} ${pp}`, [`${is} ${wrongPP}`, pl ? b : s3(b)]));
      add('passive-basic', i % 2 ? gap(`${o} ___ (${b}) ${tp}.`, `${is} ${pp}`) : err(`${o} ${is} ${wrongPP} ${tp}.`, `${o} ${is} ${pp} ${tp}.`, 'Pasiva: be + participio.'));
      if (i % 3 === 0) add('passive-basic', err(`${o} ${pl ? 'is' : 'are'} ${pp} ${tp}.`, `${o} ${is} ${pp} ${tp}.`));
    }
    if (tpast) {
      add('passive-basic', mc(`${o} ___ ${tpast}.`, `${wasF} ${pp}`, [`${wasF} ${wrongPP}`, p === pp ? `${is} ${b}` : `${pl ? 'have' : 'has'} ${pp}`]));
      add('passive-basic', i % 2 ? err(`${o} ${p} ${tpast}.`, `${o} ${wasF} ${pp} ${tpast}.`, 'El sujeto recibe la acción: pasiva.') : gap(`${o} ___ (${b}) ${tpast}.`, `${wasF} ${pp}`));
      if (i % 3 === 1) add('passive-basic', gap(`${o} ___ (not / ${b}) ${tpast}.`, `${wasF}n't ${pp}`, `${wasF} not ${pp}`));
    }
    // otros tiempos
    const hv = pl ? 'have' : 'has';
    const k = i % 5;
    if (k === 0) add('passive-tenses', mc(`${o} ___ next week.`, `will be ${pp}`, [`will ${pp}`, `will be ${b}`]), gap(`${o} ___ (${b}) right now.`, `${is} being ${pp}`));
    if (k === 1) add('passive-tenses', mc(`${o} ___ right now.`, `${is} being ${pp}`, [`${is} been ${pp}`, `${is} ${b}ing`.replace('eing', 'ing')]), gap(`${o} ___ (already / ${b}).`, `${hv} already been ${pp}`));
    if (k === 2) add('passive-tenses', mc(`${o} ___ already been ${pp}.`, hv, [pl ? 'has' : 'have', 'will']), gap(`${o} ___ (${b}) tomorrow.`, `will be ${pp}`));
    if (k === 3) add('passive-tenses', mc(`${o} must ___ by Friday.`, `be ${pp}`, [pp, `be ${b}`]), err(`${o} will ${pp} next week.`, `${o} will be ${pp} next week.`, 'Pasiva con will: will be + participio.'));
    if (k === 4) add('passive-tenses', mc(`${o} ${is} going to ___ soon.`, `be ${pp}`, [pp, `being ${pp}`]), err(`${o} ${hv} ${pp} already.`, `${o} ${hv} already been ${pp}.`, 'Present perfect pasivo: have / has been + participio.'));
    add('passive-tenses', i % 2 ? mc(`${o} ___ when I arrived.`, `${wasF} being ${pp}`, [`${wasF} been ${pp}`, `${is} being ${pp}`]) : mc(`${o} can ___ online.`, `be ${pp}`, [`${pp}`, `to be ${pp}`]));
  });
}
{
  const PPL: [string, string, string][] = [['The woman', 'lives next door', 'is a doctor'], ['The man', 'called yesterday', 'is my uncle'], ['The teacher', 'teaches us maths', 'is very patient'], ['The people', 'work here', 'are very friendly'], ['The boy', 'won the prize', 'is only ten'], ['The students', 'passed the exam', 'were delighted'], ['A friend', 'helped me', 'is coming tonight'], ['The girl', 'sits next to me', 'is from Peru'], ['The waiter', 'served us', 'was very polite'], ['The woman', 'I met at the party', 'is a pilot']];
  const TH: [string, string, string][] = [['The book', 'I bought', 'is great'], ['The film', 'we saw last night', 'was boring'], ['The phone', 'is on the table', 'is mine'], ['The car', 'costs a lot', 'is electric'], ['The bus', 'goes to the airport', 'leaves at six'], ['The cake', 'you made', 'was delicious'], ['The keys', 'were on the desk', 'have disappeared'], ['The email', 'she sent', 'was very long'], ['The shoes', 'I ordered', 'are too small'], ['The song', 'is playing now', 'is my favourite']];
  const PL: [string, string, string][] = [['The town', 'I was born', 'is very small'], ['The hotel', 'we stayed', 'was near the beach'], ['The restaurant', 'we had dinner', 'is closed now'], ['The school', 'she works', 'is in the centre'], ['The house', 'I grew up', 'has been sold'], ['The shop', 'I bought this', 'is in King Street'], ['The park', 'we used to play', 'is now a car park'], ['The office', 'he works', 'is on the fifth floor']];
  const WH: [string, string, string][] = [['The man', 'car was stolen', 'went to the police'], ['The woman', 'dog barks all night', 'lives upstairs'], ['The girl', 'mother is a doctor', 'is in my class'], ['A friend', 'brother lives in Rome', 'invited us'], ['The neighbour', 'son plays the drums', 'has moved'], ['The writer', 'books I love', 'is giving a talk'], ['The student', 'phone rang in class', 'apologised'], ['The family', 'house burned down', 'is staying with us']];
  PPL.forEach(([a, c, e], i) => {
    add('relative-defining', mc(`${a} ___ ${c} ${e}.`, 'who', ['which', 'where']));
    if (i % 2 === 0) add('relative-defining', err(`${a} which ${c} ${e}.`, `${a} who ${c} ${e}.`, 'Para personas: who (o that).'));
  });
  TH.forEach(([a, c, e], i) => {
    add('relative-defining', mc(`${a} ___ ${c} ${e}.`, 'which', ['who', 'where']));
    if (i % 2 === 0) add('relative-defining', err(`${a} who ${c} ${e}.`, `${a} which ${c} ${e}.`, 'Para cosas: which (o that).'));
  });
  PL.forEach(([a, c, e], i) => {
    add('relative-defining', mc(`${a} ___ ${c} ${e}.`, 'where', ['which', 'who']));
    if (i % 2 === 0) add('relative-defining', err(`${a} which ${c} ${e}.`, `${a} where ${c} ${e}.`, 'Para lugares «en los que» pasa algo: where.'));
  });
  WH.forEach(([a, c, e], i) => {
    add('relative-defining', mc(`${a} ___ ${c} ${e}.`, 'whose', ['who', 'which']));
    if (i % 2 === 0) add('relative-defining', err(`${a} who his ${c} ${e}.`, `${a} whose ${c} ${e}.`, 'cuyo / cuya = whose.'));
  });
}
{
  const SP: [string, string][] = [['he', 'He'], ['she', 'She']];
  each(SP, VERBS.filter((v) => v[0] !== 'read'), 90, ([sp, Sp], v, i) => {
    const k = i % 6;
    if (k === 0) add('reported-statements', mc(`"I ${v[0]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[5]}.`, v[2], [v[1], `has ${v[3]}`]));
    if (k === 1) add('reported-statements', mc(`"I'm ${v[4]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[5]}.`, `was ${v[4]}`, [`is ${v[4]}`, `has been ${v[4]}`]));
    if (k === 2) add('reported-statements', mc(`"I ${v[2]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[5]}.`, `had ${v[3]}`, [`has ${v[3]}`, `would ${v[0]}`]));
    if (k === 3) add('reported-statements', mc(`"I will ${v[0]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[5]}.`, `would ${v[0]}`, [`will ${v[0]}`, `would ${v[2] === v[0] ? v[1] : v[2]}`]));
    if (k === 4) add('reported-statements', gap(`"I can ${v[0]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[0]} ${v[5]}.`, 'could'));
    if (k === 5) add('reported-statements', gap(`"I have ${v[3]} ${v[5]}," ${sp} said. → ${Sp} said ${sp} ___ ${v[5]}.`, `had ${v[3]}`, `'d ${v[3]}`));
  });
  ['tired', 'busy', 'ready', 'late', 'hungry', 'ill'].forEach((a, i) => {
    const sp = i % 2 ? 'she' : 'he', Sp = cap(sp);
    add('reported-statements', err(`${Sp} said me that ${sp} was ${a}.`, `${Sp} told me that ${sp} was ${a}. / ${Sp} said that ${sp} was ${a}.`, 'say something · tell someone something.'));
  });
}
{
  const TOO: [string, string, string][] = [['This coffee is', 'hot', 'drink'], ['This bag is', 'heavy', 'carry'], ['The water is', 'cold', 'swim in'], ['He is', 'young', 'drive'], ['The shelf is', 'high', 'reach'], ["I'm", 'tired', 'go out'], ['The test was', 'difficult', 'finish'], ["It's", 'late', 'call her'], ['The soup is', 'salty', 'eat'], ['This box is', 'big', 'fit in the car']];
  const EN: [string, string, string][] = [["He isn't", 'old', 'drive'], ["She isn't", 'tall', 'reach the shelf'], ["The room isn't", 'big', 'hold fifty people'], ["I'm not", 'strong', 'lift it'], ["We aren't", 'rich', 'buy that house'], ["The water isn't", 'warm', 'swim in'], ["It isn't", 'light', 'read outside'], ["They aren't", 'fast', 'win the race']];
  const SO: [string, string, string, boolean][] = [['hot', 'day', 'we stayed in', true], ['good', 'film', 'I saw it twice', true], ['boring', 'lecture', 'I fell asleep', true], ['expensive', 'restaurant', 'we left', true], ['long', 'journey', 'we were exhausted', true], ['nice', 'people', 'we stayed longer', false], ['loud', 'music', "I couldn't hear you", false], ['difficult', 'exam', 'nobody passed', true], ['funny', 'story', "we couldn't stop laughing", true], ['cold', 'night', 'the pipes froze', true]];
  TOO.forEach(([s, a, v], i) => {
    add('too-enough-so-such', mc(`${s} ___ ${a} to ${v}.`, 'too', ['enough', 'so']));
    if (i % 2 === 0) add('too-enough-so-such', err(`${s} too much ${a} to ${v}.`, `${s} too ${a} to ${v}.`, 'too + adjetivo (sin «much»).'));
  });
  EN.forEach(([s, a, v], i) => {
    add('too-enough-so-such', mc(`${s} ${a} ___ to ${v}.`, 'enough', ['too', 'so']));
    add('too-enough-so-such', i % 2 ? err(`${s} enough ${a} to ${v}.`, `${s} ${a} enough to ${v}.`, 'adjetivo + enough.') : mc(`${s} ___ to ${v}.`, `${a} enough`, [`enough ${a}`, `too ${a} enough`]));
  });
  SO.forEach(([a, n, r, art], i) => {
    const an = art ? (/^[aeiou]/.test(a) ? 'an ' : 'a ') : '';
    const was2 = n === 'people' ? 'They were' : 'It was';
    add('too-enough-so-such', mc(`The ${n} ${n === 'people' ? 'were' : 'was'} ___ ${a} that ${r}.`, 'so', ['such', 'too']));
    add('too-enough-so-such', mc(`${was2} ___ ${an}${a} ${n} that ${r}.`, 'such', ['so', 'too']));
    if (i % 2 === 0) add('too-enough-so-such', err(`${was2} so ${an}${a} ${n} that ${r}.`, `${was2} such ${an}${a} ${n} that ${r}.`, 'such + (a/an) + adjetivo + sustantivo.'));
  });
}
{
  const R = S.filter((x) => x.p !== 2).map((x) => ({ x, r: x.refl }));
  const VP: [string, string][] = [['hurt', ''], ['cut', 'with a knife'], ['enjoyed', 'at the party'], ['introduced', 'to the group'], ['taught', 'to play the guitar'], ['looked at', 'in the mirror'], ['bought', 'a present'], ['blamed', 'for the mistake'], ['made', 'a sandwich'], ['locked', 'out of the house'], ['burnt', 'on the oven'], ['prepared', 'for the exam']];
  const wrongRefl: Record<string, string> = { myself: 'meself', himself: 'hisself', herself: 'sheself', ourselves: 'ourself', themselves: 'theirselves' };
  each(R, VP, 42, ({ x, r }, [v, tail], i) => {
    const t = tail ? ' ' + tail : '';
    const k = i % 3;
    if (k === 0) add('reflexive', mc(`${x.s} ${v} ___${t}.`, r, [x.obj, wrongRefl[r]]));
    if (k === 1) add('reflexive', err(`${x.s} ${v} ${wrongRefl[r]}${t}.`, `${x.s} ${v} ${r}${t}.`));
    if (k === 2) add('reflexive', gap(`${x.s} ${v} ___${t}. (${x.pro})`, r));
  });
}
{
  const PV: [string, string, string, string, 'it' | 'them'][] = [['turn', 'on', 'the light', 'The light', 'it'], ['turn', 'off', 'the TV', 'The TV', 'it'], ['pick', 'up', 'the keys', 'The keys', 'them'], ['put', 'on', 'your coat', 'Your coat', 'it'], ['take', 'off', 'your shoes', 'Your shoes', 'them'], ['throw', 'away', 'the box', 'The box', 'it'], ['fill', 'in', 'the form', 'The form', 'it'], ['look', 'up', 'the word', 'The word', 'it'], ['give', 'back', 'the money', 'The money', 'it'], ['switch', 'off', 'the computer', 'The computer', 'it'], ['write', 'down', 'the address', 'The address', 'it'], ['try', 'on', 'the trousers', 'The trousers', 'them'], ['put', 'away', 'the toys', 'The toys', 'them'], ['wake', 'up', 'the children', 'The children', 'them'], ['call', 'back', 'the client', 'The client', 'them']];
  PV.forEach(([v, p, o, O, pr], i) => {
    add('phrasal-order', mc(`${O}? I'll ___ now.`, `${v} ${pr} ${p}`, [`${v} ${p} ${pr}`, `${p} ${v} ${pr}`]));
    add('phrasal-order', err(`Could you ${v} ${p} ${pr}, please?`, `Could you ${v} ${pr} ${p}, please?`, 'Con pronombre, va en medio: verbo + it / them + partícula.'));
    if (i % 2 === 0) add('phrasal-order', mc(`Could you ___ , please?`, `${v} ${o} ${p}`, [`${v} ${p} ${pr}`, `${p} ${v} ${o}`], `También vale: ${v} ${p} ${o}.`));
    else add('phrasal-order', gap(`Don't forget to ___ . (${v} ${p} / ${pr})`, `${v} ${pr} ${p}`));
  });
  const INS: [string, string, string, string][] = [['look', 'after', 'her children', 'them'], ['look', 'for', 'my glasses', 'them'], ['get', 'on', 'the bus', 'it'], ['run', 'into', 'an old friend', 'him'], ['wait', 'for', 'the manager', 'her'], ['deal', 'with', 'the problem', 'it'], ['listen', 'to', 'the teacher', 'her'], ['depend', 'on', 'my parents', 'them']];
  INS.forEach(([v, p, o, pr], i) => {
    add('phrasal-order', mc(`I have to ___ . (${o})`, `${v} ${p} ${pr}`, [`${v} ${pr} ${p}`, `${p} ${v} ${pr}`], 'Verbo + preposición: el pronombre va detrás.'));
    if (i % 2 === 0) add('phrasal-order', err(`I have to ${v} ${pr} ${p}.`, `I have to ${v} ${p} ${pr}.`, `${v} ${p} es inseparable.`));
  });
}
{
  const I: [string, string, string][] = [['Open', 'open', 'the window'], ['Close', 'close', 'the door'], ['Turn off', 'turn off', 'the light'], ['Sit', 'sit', 'down'], ['Listen', 'listen', 'carefully'], ['Wait', 'wait', 'outside'], ['Call', 'call', 'the doctor'], ['Take', 'take', 'an umbrella'], ['Wash', 'wash', 'the dishes'], ['Help', 'help', 'your sister'], ['Write', 'write', 'your name'], ['Drive', 'drive', 'slowly'], ['Bring', 'bring', 'the documents'], ['Finish', 'finish', 'the report'], ['Be', 'be', 'quiet'], ['Stay', 'stay', 'here']];
  const WHO: [string, string][] = [['he told me', 'He told me'], ['she told us', 'She told us'], ['the teacher told them', 'The teacher told them'], ['my boss asked me', 'My boss asked me'], ['she asked him', 'She asked him'], ['the doctor told her', 'The doctor told her']];
  each(WHO, I, 85, ([w, W], [Imp, b, r], i) => {
    const k = i % 5;
    if (k === 0) add('reported-commands', mc(`"${Imp} ${r}," ${w}. → ${W} ___ ${r}.`, `to ${b}`, [b, `that ${b}`]));
    if (k === 1) add('reported-commands', mc(`"Don't ${b} ${r}," ${w}. → ${W} ___ ${r}.`, `not to ${b}`, [`don't ${b}`, `to don't ${b}`]));
    if (k === 2) add('reported-commands', err(`${W} ${b} ${r}.`, `${W} to ${b} ${r}.`, 'tell / ask + persona + to + infinitivo.'));
    if (k === 3) add('reported-commands', gap(`"${Imp} ${r}," ${w}. → ${W} ___ (${b}) ${r}.`, `to ${b}`));
    if (k === 4) add('reported-commands', err(`${W} don't ${b} ${r}.`, `${W} not to ${b} ${r}.`, 'Orden negativa: not to + infinitivo.'));
  });
}
{
  const Q: [string, string][] = [['Where is the station?', 'where the station is'], ['What time does the train leave?', 'what time the train leaves'], ['Is she at home?', 'if she is at home'], ['Where does he work?', 'where he works'], ['How much does it cost?', 'how much it costs'], ['When did they arrive?', 'when they arrived'], ['Can I park here?', 'if I can park here'], ['Why was she late?', 'why she was late'], ['What does this word mean?', 'what this word means'], ['Does this bus go to the centre?', 'if this bus goes to the centre'], ['Where can I buy a ticket?', 'where I can buy a ticket'], ['Who is that man?', 'who that man is'], ['How old is your brother?', 'how old your brother is'], ['Did he pass the exam?', 'if he passed the exam'], ['What time is it?', 'what time it is'], ['Where have they gone?', 'where they have gone'], ['Is there a bank near here?', 'if there is a bank near here'], ['How long does the journey take?', 'how long the journey takes']];
  const OP = ['Could you tell me', 'Do you know', 'I wonder', "I'd like to know", 'Can you tell me', 'Have you any idea'];
  Q.forEach(([d, ind], i) => {
    const o = OP[i % OP.length];
    const end = o.startsWith('I') ? '.' : '?';
    const wrong = d.replace('?', '').replace(/^(\w)/, (m) => m.toLowerCase());
    const wrong2 = ind.startsWith('if ') ? ind.replace(/^if /, '') : ind.replace(/^(\w+(?: \w+)?) (.*)$/, (_, a, b2) => `${a} does ${b2}`);
    add('questions-indirect', mc(`${o} ___${end}`, ind, [wrong, wrong2].filter((w) => w !== ind)));
    add('questions-indirect', i % 2 ? err(`${o} ${wrong}${end}`, `${o} ${ind}${end}`, 'En la pregunta indirecta el orden es el de una afirmación.') : gap(`${d} → ${o} ___${end}`, ind, ...(ind.startsWith('if ') ? [ind.replace(/^if /, 'whether ')] : [])));
  });
}
{
  const D: [string, string, string, string][] = [['She is interested', 'in', 'history', 'on'], ["He's very good", 'at', 'maths', 'in'], ["I'm afraid", 'of', 'spiders', 'from'], ["We're proud", 'of', 'our team', 'for'], ["She's keen", 'on', 'tennis', 'of'], ["I'm worried", 'about', 'the exam', 'for'], ['Who is responsible', 'for', 'this mess', 'of'], ['Your phone is similar', 'to', 'mine', 'with'], ['This is different', 'from', 'the others', 'of'], ['The town is famous', 'for', 'its cheese', 'by'], ["I'm tired", 'of', 'waiting', 'from'], ["She's married", 'to', 'a doctor', 'with'], ['It depends', 'on', 'the weather', 'of'], ["I'm listening", 'to', 'the radio', 'at'], ["We're waiting", 'for', 'the bus', 'to'], ['He applied', 'for', 'the job', 'to'], ['This book belongs', 'to', 'me', 'for'], ['Do you believe', 'in', 'ghosts', 'on'], ['She succeeded', 'in', 'passing the test', 'on'], ['He insisted', 'on', 'paying', 'in'], ['She apologised', 'for', 'being late', 'of'], ['They complained', 'about', 'the noise', 'for'], ['The team consists', 'of', 'ten people', 'in'], ['You can rely', 'on', 'me', 'in'], ['He suffers', 'from', 'headaches', 'of'], ["I'll pay", 'for', 'the tickets', 'by'], ['I agree', 'with', 'you', 'to'], ["Don't laugh", 'at', 'him', 'of'], ["She's allergic", 'to', 'cats', 'of'], ["I'm fed up", 'with', 'this weather', 'of'], ["He's capable", 'of', 'anything', 'to'], ["We're excited", 'about', 'the trip', 'for']];
  D.forEach(([a, p, o, w], i) => {
    const q = a.startsWith('Do ') || a.startsWith('Who ') ? '?' : '.';
    const w2 = ['at', 'in', 'on', 'of', 'for', 'to', 'with', 'about', 'from'].filter((x) => x !== p && x !== w)[i % 7];
    add('dependent-prepositions', mc(`${a} ___ ${o}${q}`, p, [w, w2]));
    if (i % 2 === 0) add('dependent-prepositions', err(`${a} ${w} ${o}${q}`, `${a} ${p} ${o}${q}`));
  });
}

/* ================= B2 – C1 ================= */
{
  const HAVE: [string, string, string, string][] = [['my hair', 'cut', 'cut', 'cutting'], ['the car', 'repair', 'repaired', 'repairing'], ['the house', 'paint', 'painted', 'painting'], ['my eyes', 'test', 'tested', 'testing'], ['the windows', 'clean', 'cleaned', 'cleaning'], ['a suit', 'make', 'made', 'making'], ['my photo', 'take', 'taken', 'taking'], ['the computer', 'fix', 'fixed', 'fixing'], ['the roof', 'replace', 'replaced', 'replacing'], ['my teeth', 'check', 'checked', 'checking'], ['the carpets', 'clean', 'cleaned', 'cleaning'], ['the documents', 'translate', 'translated', 'translating']];
  const TN: [string, string][] = [['I had', 'last week'], ["I'm having", 'tomorrow'], ["I'm going to have", 'next month'], ["I've just had", ''], ['I need to have', 'soon'], ['We had', 'yesterday']];
  each(TN, HAVE, 36, ([h, t], [o, b, pp, g], i) => {
    const tail = t ? ' ' + t : '';
    const k = i % 3;
    if (k === 0) add('passive-advanced', mc(`${h} ${o} ___${tail}.`, pp, [pp === b ? `to ${b}` : b, g], 'have + objeto + participio = encargar que te lo hagan.'));
    if (k === 1) add('passive-advanced', gap(`${h} ${o} ___ (${b})${tail}.`, pp));
    if (k === 2) add('passive-advanced', err(`${h} ${pp === b ? g : b} ${o}${tail}.`.replace(/^(I had|We had|I've just had|I'm having|I'm going to have|I need to have) /, (m) => m), `${h} ${o} ${pp}${tail}.`, 'Orden: have + objeto + participio.'));
  });
  const SAID: [string, string, string, string][] = [['He', 'is', 'be very rich', 'being very rich'], ['She', 'is', 'have left the country', 'having left the country'], ['They', 'are', 'live abroad', 'living abroad'], ['The company', 'is', 'be losing money', 'being losing money'], ['The painting', 'is', 'be worth millions', 'being worth millions'], ['He', 'is', 'have stolen the money', 'having stolen the money'], ['The president', 'is', 'be considering it', 'being considering it'], ['They', 'are', 'own three houses', 'owning three houses']];
  const REP = ['said', 'believed', 'thought', 'known', 'reported', 'expected'];
  SAID.forEach(([s, b, inf, wr], i) => {
    const r = REP[i % REP.length];
    add('passive-advanced', mc(`${s} ${b} ${r} ___ .`, `to ${inf}`, [wr, inf]));
    if (i % 2 === 0) add('passive-advanced', err(`${s} ${b} ${r} that ${inf.replace(/^be /, 'is ')}.`.replace('that have', 'that has').replace('that live', 'that live').replace('that own', 'that own'), `${s} ${b} ${r} to ${inf}.`, 'Sujeto + is said / believed + to + infinitivo.'));
  });
}
{
  const M = ['must have', "can't have", 'might have', 'should have', 'could have', "shouldn't have", 'may have', "needn't have"];
  const VP: [string, string, string, string][] = [['miss', 'missed', 'missing', 'the train'], ['forget', 'forgotten', 'forgot', 'the keys'], ['leave', 'left', 'leaving', 'early'], ['take', 'taken', 'took', 'the wrong bus'], ['see', 'seen', 'saw', 'the message'], ['go', 'gone', 'went', 'home'], ['lose', 'lost', 'losing', 'the phone'], ['eat', 'eaten', 'ate', 'something bad'], ['be', 'been', 'was', 'very tired'], ['break', 'broken', 'broke', 'the window'], ['write', 'written', 'wrote', 'that letter'], ['know', 'known', 'knew', 'the truth'], ['tell', 'told', 'telling', 'everyone'], ['spend', 'spent', 'spending', 'so much'], ['do', 'done', 'did', 'it on purpose'], ['buy', 'bought', 'buying', 'so much food']];
  each(S.filter((x) => x.p !== 1), VP, 92, (x, [b, pp, w, r], i) => {
    const m = M[i % M.length];
    const k = i % 4;
    if (k === 0) add('modals-past', mc(`${x.s} ${m} ___ ${r}.`, pp, [b, w]));
    if (k === 1) add('modals-past', mc(`${x.s} ${m.split(' ')[0]} ___ ${pp} ${r}.`, 'have', ['has', 'had']));
    if (k === 2) add('modals-past', err(`${x.s} ${m.replace('have', 'has')} ${pp} ${r}.`, `${x.s} ${m} ${pp} ${r}.`, 'modal + have (nunca has) + participio.'));
    if (k === 3) add('modals-past', gap(`${x.s} ${m} ___ (${b}) ${r}.`, pp));
  });
}
{
  const PERF: [string, string, string, string, string][] = [['By next June,', 'she', 'finish', 'finished', 'her degree'], ['By 2030,', 'they', 'build', 'built', 'the new airport'], ['By the end of the month,', 'I', 'save', 'saved', 'enough money'], ['By ten o’clock,', 'we', 'leave', 'left', ''], ['By Friday,', 'he', 'write', 'written', 'the report'], ['By the time you arrive,', 'I', 'cook', 'cooked', 'dinner'], ['By next year,', 'she', 'live', 'lived', 'here for a decade'], ['By the end of the course,', 'you', 'learn', 'learnt', 'a thousand words'], ['By tomorrow morning,', 'they', 'repair', 'repaired', 'the road'], ['By the age of thirty,', 'he', 'visit', 'visited', 'fifty countries'], ['By midnight,', 'we', 'drive', 'driven', 'six hundred kilometres'], ['By December,', 'the company', 'open', 'opened', 'ten new shops']];
  const CONT: [string, string, string, string, string][] = [['This time tomorrow,', 'I', 'fly', 'flying', 'to Rome'], ['At nine tonight,', 'we', 'watch', 'watching', 'the final'], ['This time next week,', 'she', 'lie', 'lying', 'on a beach'], ['In an hour,', 'he', 'drive', 'driving', 'home'], ['Tomorrow morning,', 'I', 'sit', 'sitting', 'in the exam room'], ['At midnight,', 'they', 'sleep', 'sleeping', ''], ['This time next year,', 'we', 'live', 'living', 'in Canada'], ['At six o’clock,', 'she', 'cook', 'cooking', 'dinner'], ['Next Monday at ten,', 'he', 'give', 'giving', 'a presentation'], ['During the match,', 'I', 'work', 'working', ''], ['At noon tomorrow,', 'they', 'travel', 'travelling', 'to Paris'], ['All next week,', 'we', 'paint', 'painting', 'the house']];
  PERF.forEach(([t, s, b, pp, r], i) => {
    const tail = r ? ' ' + r : '';
    add('future-advanced', mc(`${t} ${s} ___${tail}.`, `will have ${pp}`, [`will has ${pp}`, `will have ${b}`]));
    add('future-advanced', i % 2 ? gap(`${t} ${s} ___ (${b})${tail}.`, `will have ${pp}`, `'ll have ${pp}`) : err(`${t} ${s} will has ${pp}${tail}.`, `${t} ${s} will have ${pp}${tail}.`, 'Future perfect: will have + participio.'));
  });
  CONT.forEach(([t, s, b, g, r], i) => {
    const tail = r ? ' ' + r : '';
    add('future-advanced', mc(`${t} ${s} ___${tail}.`, `will be ${g}`, [`will ${g}`, `will be ${b}`]));
    add('future-advanced', i % 2 ? gap(`${t} ${s} ___ (${b})${tail}.`, `will be ${g}`, `'ll be ${g}`) : err(`${t} ${s} will ${g}${tail}.`, `${t} ${s} will be ${g}${tail}.`, 'Future continuous: will be + -ing.'));
  });
}
{
  const PRES: [string, string, string][] = [['had', 'have', 'a car'], ['could', 'can', 'swim'], ['knew', 'know', 'the answer'], ['lived', 'live', 'nearer the centre'], ['spoke', 'speak', 'German'], ['had', 'have', 'more free time'], ['earned', 'earn', 'more money'], ['understood', 'understand', 'this lesson']];
  const PAST: [string, string, string][] = [['had studied', 'study', 'harder last year'], ["hadn't eaten", 'not / eat', 'so much last night'], ["hadn't told", 'not / tell', 'him the secret'], ['had gone', 'go', 'to the concert'], ['had brought', 'bring', 'an umbrella'], ["hadn't spent", 'not / spend', 'all the money'], ['had listened', 'listen', 'to her advice'], ['had taken', 'take', 'that job'], ["hadn't said", 'not / say', 'anything'], ['had saved', 'save', 'more when I was young']];
  const W: [string, string][] = [['I wish I', 'I'], ['She wishes she', 'she'], ['We wish we', 'we'], ['They wish they', 'they'], ['He wishes he', 'he'], ['If only I', 'I']];
  each(W, PRES, 30, ([w], [p, b, r], i) => {
    const k = i % 3;
    if (k === 0) add('wish', mc(`${w} ___ ${r}.`, p, [b, `would ${b}`]));
    if (k === 1) add('wish', gap(`${w} ___ (${b}) ${r}.`, p));
    if (k === 2) add('wish', err(`${w} ${b === 'can' ? 'can' : `would ${b}`} ${r}.`, `${w} ${p} ${r}.`, 'wish + pasado simple para hablar del presente.'));
  });
  each(W, PAST, 30, ([w], [p, b, r], i) => {
    const base = b.replace('not / ', '');
    const neg = b.startsWith('not');
    const pastSimple: Record<string, string> = { study: 'studied', eat: 'ate', tell: 'told', go: 'went', bring: 'brought', spend: 'spent', listen: 'listened', take: 'took', say: 'said', save: 'saved' };
    const k = i % 3;
    if (k === 0) add('wish', mc(`${w} ___ ${r}.`, p, [neg ? `didn't ${base}` : pastSimple[base], neg ? `wouldn't ${base}` : `would ${base}`], 'wish + past perfect para lamentar algo pasado.'));
    if (k === 1) add('wish', gap(`${w} ___ (${b}) ${r}.`, p, p.replace("hadn't", 'had not')));
    if (k === 2) add('wish', err(`${w} ${neg ? `wouldn't have ${p.split(' ')[1]}` : `would have ${p.split(' ')[1]}`} ${r}.`, `${w} ${p} ${r}.`, 'Tras wish no se usa would have: past perfect.'));
  });
  const ANN = ['stop making that noise', 'listen to me', 'tidy your room', 'be more careful', 'call more often', 'stop interrupting'];
  ANN.forEach((a, i) => add('wish', mc(`I wish you ___ ${a.split(' ').slice(1).join(' ')}.`, `would ${a.split(' ')[0]}`, [`will ${a.split(' ')[0]}`, a.split(' ')[0] === 'be' ? 'are' : `${a.split(' ')[0]}`].filter((_, j) => j < 2 || i < 0), 'wish + would para quejarse de algo que molesta.')));
}
{
  const P: [string, string, string][] = [['it was raining', 'the rain', 'we went for a walk'], ['he was tired', 'his tiredness', 'he kept working'], ['the traffic was heavy', 'the heavy traffic', 'we arrived on time'], ['she was ill', 'her illness', 'she went to work'], ['the price was high', 'the high price', 'they bought it'], ['it was cold', 'the cold', "he wasn't wearing a coat"], ['he is eighty', 'his age', 'he runs every day'], ['the film was long', 'its length', 'I enjoyed it'], ['she had little experience', 'her lack of experience', 'she got the job'], ['the weather was bad', 'the bad weather', 'the match went ahead'], ['the hotel was noisy', 'the noise', 'we slept well'], ['he studied hard', 'his hard work', 'he failed the exam']];
  P.forEach(([c, np, r], i) => {
    add('contrast-linkers', mc(`___ ${c}, ${r}.`, 'Although', ['Despite', 'However']));
    add('contrast-linkers', mc(`___ ${np}, ${r}.`, 'Despite', ['Although', 'However']));
    const k = i % 4;
    if (k === 0) add('contrast-linkers', mc(`In spite ___ ${np}, ${r}.`, 'of', ['from', 'that']), err(`Despite ${c}, ${r}.`, `Although ${c}, ${r}. / Despite ${np}, ${r}.`, 'despite + sustantivo / -ing; although + oración.'));
    if (k === 1) add('contrast-linkers', mc(`${cap(c)}. ___ , ${r}.`, 'However', ['Although', 'Despite']), err(`Despite of ${np}, ${r}.`, `Despite ${np}, ${r}. / In spite of ${np}, ${r}.`, 'despite va sin «of».'));
    if (k === 2) add('contrast-linkers', mc(`Even ___ ${c}, ${r}.`, 'though', ['although', 'despite']), err(`Although ${np}, ${r}.`, `Despite ${np}, ${r}. / In spite of ${np}, ${r}.`));
    if (k === 3) add('contrast-linkers', mc(`${cap(c)}. ___ , ${r}.`, 'Nevertheless', ['Whereas', 'Despite']), gap(`___ the fact that ${c}, ${r}.`, 'Despite', 'In spite of'));
  });
}
{
  const TO: [string, string, string][] = [['refused', 'help', 'us'], ['promised', 'call', 'back'], ['agreed', 'wait', 'a little longer'], ['offered', 'drive', 'me home'], ['threatened', 'leave', 'the company']];
  const OTO: [string, string, string][] = [['advised me', 'see', 'a doctor'], ['reminded him', 'lock', 'the door'], ['encouraged her', 'apply', 'for the job'], ['persuaded them', 'stay', 'another night'], ['invited us', 'come', 'to the wedding'], ['warned us not', 'touch', 'the wire']];
  const ING: [string, string, string, string][] = [['admitted', 'take', 'taking', 'the money'], ['denied', 'break', 'breaking', 'the window'], ['suggested', 'go', 'going', 'by train'], ['recommended', 'book', 'booking', 'early'], ['regretted', 'say', 'saying', 'that']];
  const PREP: [string, string, string, string, string][] = [['apologised', 'for', 'being', 'late', 'of'], ['accused him', 'of', 'lying', '', 'for'], ['insisted', 'on', 'paying', 'the bill', 'in'], ['congratulated her', 'on', 'passing', 'the exam', 'for'], ['blamed me', 'for', 'losing', 'the keys', 'of'], ['thanked us', 'for', 'coming', '', 'of'], ['warned them', 'against', 'swimming', 'there', 'of'], ['prevented us', 'from', 'leaving', '', 'of']];
  const WHO = ['He', 'She', 'They', 'The teacher', 'My boss', 'The doctor'];
  const ing = (b: string) => ({ see: 'seeing', lock: 'locking', apply: 'applying', stay: 'staying', come: 'coming', touch: 'touching', help: 'helping', call: 'calling', wait: 'waiting', drive: 'driving', leave: 'leaving' } as Record<string, string>)[b];
  [...TO, ...OTO].forEach(([g, b, r], i) => {
    const w = WHO[i % WHO.length];
    add('reporting-verbs', mc(`${w} ${g} ___ ${r}.`, `to ${b}`, [ing(b), b]));
    add('reporting-verbs', i % 2 ? err(`${w} ${g} ${ing(b)} ${r}.`, `${w} ${g} to ${b} ${r}.`, `${g.split(' ')[0]} + to + infinitivo.`) : gap(`${w} ${g} ___ (${b}) ${r}.`, `to ${b}`));
  });
  ING.forEach(([g, b, gg, r], i) => {
    const w = WHO[(i + 2) % WHO.length];
    add('reporting-verbs', mc(`${w} ${g} ___ ${r}.`, gg, [`to ${b}`, b]), err(`${w} ${g} to ${b} ${r}.`, `${w} ${g} ${gg} ${r}.`, `${g} + -ing.`), gap(`${w} ${g} ___ (${b}) ${r}.`, gg));
  });
  PREP.forEach(([g, p, gg, r, wr], i) => {
    const w = WHO[(i + 1) % WHO.length], tail = r ? ' ' + r : '';
    add('reporting-verbs', mc(`${w} ${g} ___ ${gg}${tail}.`, p, [wr, 'to']), err(`${w} ${g} ${wr} ${gg}${tail}.`, `${w} ${g} ${p} ${gg}${tail}.`, `${g.split(' ')[0]} … ${p} + -ing.`));
  });
}
{
  const T: [string, string, string][] = [['I thought', 'it', 'rain'], ['She said', 'she', 'call me'], ['We knew', 'he', 'be late'], ['He promised', 'he', 'help us'], ['They hoped', 'the weather', 'improve'], ['I was sure', 'you', 'like it'], ['Nobody imagined', 'she', 'win'], ['The forecast said', 'it', 'snow'], ['He told me', 'they', 'arrive at six'], ['I never thought', 'we', 'meet again']];
  const G: [string, string, string, string][] = [['I', 'was', 'call you', 'I forgot'], ['She', 'was', 'buy it', 'it was too expensive'], ['We', 'were', 'go out', 'it started raining'], ['He', 'was', 'tell her', 'he changed his mind'], ['They', 'were', 'move house', "they couldn't find one"], ['I', 'was', 'study', 'I fell asleep'], ['We', 'were', 'invite them', 'we lost their number'], ['She', 'was', 'resign', 'they offered her more money']];
  T.forEach(([m, s, v], i) => {
    add('future-in-past', mc(`${m} ${s} ___ ${v}.`, 'would', ['will', 'is going to'].map((w) => (w === 'is going to' && ['you', 'we', 'they'].includes(s) ? 'are going to' : w))));
    add('future-in-past', i % 2 ? err(`${m} ${s} will ${v}.`, `${m} ${s} would ${v}.`, 'Futuro visto desde el pasado: would.') : gap(`${m} ${s} ___ (will) ${v}.`, 'would'));
  });
  G.forEach(([s, w, v, r], i) => {
    add('future-in-past', mc(`${s} ___ going to ${v}, but ${r}.`, w, [w === 'was' ? 'were' : 'was', s === 'I' ? 'am' : w === 'was' ? 'is' : 'are']));
    add('future-in-past', mc(`${s} ${w} going ___ , but ${r}.`, `to ${v}`, [v, `${v.split(' ')[0]}ing ${v.split(' ').slice(1).join(' ')}`.trim().replace('moveing', 'moving').replace('inviteing', 'inviting')]));
    if (i % 2 === 0) add('future-in-past', err(`${s} ${s === 'I' ? 'am' : w === 'was' ? 'is' : 'are'} going to ${v}, but ${r}.`, `${s} ${w} going to ${v}, but ${r}.`, 'Plan que no se cumplió: was / were going to.'));
  });
}
{
  const GOV = ['insisted', 'demanded', 'recommended', 'suggested', 'proposed', 'requested'];
  const IT = ['It is essential', 'It is vital', 'It is important', 'It is imperative'];
  const VP: [string, string, string][] = [['be', 'is', 'present at the meeting'], ['arrive', 'arrives', 'on time'], ['pay', 'pays', 'in advance'], ['sign', 'signs', 'the contract'], ['see', 'sees', 'a specialist'], ['take', 'takes', 'a few days off'], ['submit', 'submits', 'the report by Friday'], ['attend', 'attends', 'the course'], ['wear', 'wears', 'a helmet'], ['apologise', 'apologises', 'in public'], ['be', 'is', 'informed immediately'], ['leave', 'leaves', 'at once']];
  const WHO = ['he', 'she', 'the manager', 'every student', 'the patient', 'each member'];
  each(WHO, VP, 48, (w, [b, s3, r], i) => {
    const past = b === 'be' ? 'was' : ({ arrive: 'arrived', pay: 'paid', sign: 'signed', see: 'saw', take: 'took', submit: 'submitted', attend: 'attended', wear: 'wore', apologise: 'apologised', leave: 'left' } as Record<string, string>)[b];
    const k = i % 4;
    if (k === 0) add('subjunctive-formal', mc(`They ${GOV[i % GOV.length]} that ${w} ___ ${r}.`, b, [s3, past], 'Subjuntivo formal: forma base, también con he / she.'));
    if (k === 1) add('subjunctive-formal', mc(`${IT[i % IT.length]} that ${w} ___ ${r}.`, b, [s3, `will ${b}`]));
    if (k === 2) add('subjunctive-formal', err(`They ${GOV[i % GOV.length]} that ${w} ${s3} ${r}.`, `They ${GOV[i % GOV.length]} that ${w} ${b} ${r}. / They ${GOV[i % GOV.length]} that ${w} should ${b} ${r}.`));
    if (k === 3) add('subjunctive-formal', mc(`The doctor ${GOV[(i + 2) % GOV.length]} that ${w} ___ ${r}.`, `not ${b}`, [`doesn't ${b}`, `not ${s3}`], 'Negativo: not + forma base.'));
  });
}
{
  const PPL: [string, string, string][] = [['My brother', 'lives in Rome', 'is a chef'], ['Mrs Green', 'teaches us French', 'is retiring'], ['Our neighbour', 'has three dogs', 'is very friendly'], ['Dr Shaw', 'I met last year', 'gave a talk'], ['My sister', 'you met yesterday', 'sends her regards'], ['The mayor', 'was elected in May', 'has resigned']];
  const TH: [string, string, string][] = [['The Eiffel Tower', 'was built in 1889', 'attracts millions of visitors'], ['This phone', 'I bought last week', 'is already broken'], ['Their house', 'has a huge garden', 'is for sale'], ['Her latest novel', 'came out in May', 'is a bestseller'], ['The museum', 'opens at ten', 'is free on Sundays'], ['My car', 'is ten years old', 'never breaks down']];
  const PL: [string, string, string][] = [['Oxford', 'I studied', 'is a beautiful city'], ['The café', 'we first met', 'has closed'], ['Seville', 'my parents live', 'is very hot in summer'], ['The village', 'I grew up', 'has only one shop']];
  const WH: [string, string, string][] = [['Anna', 'brother works with me', 'is coming too'], ['Mr Lee', 'car was stolen', 'called the police'], ['The author', 'books have sold millions', 'lives in Dublin'], ['My neighbour', 'daughter is a pilot', 'travels a lot']];
  const CL: [string, string][] = [['He passed the exam', 'surprised everyone'], ['She arrived late', 'annoyed the boss'], ['It rained all week', 'ruined our holiday'], ['They won the match', 'made the fans very happy'], ['He forgot my birthday', 'really hurt me'], ['The train was cancelled', 'meant we missed the flight']];
  PPL.forEach(([a, c, e], i) => {
    add('relative-nondefining', mc(`${a}, ___ ${c}, ${e}.`, 'who', ['that', 'which']));
    if (i % 2 === 0) add('relative-nondefining', err(`${a}, that ${c}, ${e}.`, `${a}, who ${c}, ${e}.`, 'Entre comas no se usa that.'));
  });
  TH.forEach(([a, c, e], i) => {
    add('relative-nondefining', mc(`${a}, ___ ${c}, ${e}.`, 'which', ['that', 'what']));
    if (i % 2 === 0) add('relative-nondefining', err(`${a}, that ${c}, ${e}.`, `${a}, which ${c}, ${e}.`, 'Entre comas no se usa that.'));
  });
  PL.forEach(([a, c, e]) => add('relative-nondefining', mc(`${a}, ___ ${c}, ${e}.`, 'where', ['which', 'that']), err(`${a}, which ${c}, ${e}.`, `${a}, where ${c}, ${e}.`)));
  WH.forEach(([a, c, e]) => add('relative-nondefining', mc(`${a}, ___ ${c}, ${e}.`, 'whose', ['who', 'which']), gap(`${a}, ___ ${c}, ${e}. (cuyo/a)`, 'whose')));
  CL.forEach(([a, e]) => add('relative-nondefining', mc(`${a}, ___ ${e}.`, 'which', ['what', 'that'], 'which puede referirse a toda la oración anterior.'), err(`${a}, what ${e}.`, `${a}, which ${e}.`)));
}
{
  const T: [string, string, string, string, string][] = [
    ['Never', 'have I seen', 'I have seen', 'did I seen', 'such a mess'],
    ['Rarely', 'does she complain', 'she complains', 'she does complain', 'about anything'],
    ['Not only', 'did he apologise', 'he apologised', 'he did apologise', 'but he also paid for the damage'],
    ['Hardly', 'had we arrived', 'we had arrived', 'did we arrived', 'when it started to snow'],
    ['No sooner', 'had I sat down', 'I had sat down', 'did I sat down', 'than the doorbell rang'],
    ['Only then', 'did I understand', 'I understood', 'I did understand', 'the problem'],
    ['Under no circumstances', 'should you sign', 'you should sign', 'you sign', 'that contract'],
    ['Little', 'did they know', 'they knew', 'they did know', 'what was coming'],
    ['Seldom', 'do we get', 'we get', 'we do get', 'such an opportunity'],
    ['At no time', 'was the public', 'the public was', 'did the public be', 'in danger'],
    ['Not until later', 'did she realise', 'she realised', 'she did realise', 'her mistake'],
    ['Only after the exam', 'did he relax', 'he relaxed', 'he did relax', ''],
    ['On no account', 'must you tell', 'you must tell', 'you tell', 'anyone'],
    ['Nowhere', 'will you find', 'you will find', 'you find', 'a better price'],
    ['Scarcely', 'had she spoken', 'she had spoken', 'did she spoken', 'when he interrupted'],
    ['Not once', 'did they thank', 'they thanked', 'they did thank', 'us'],
    ['Only later', 'did we learn', 'we learnt', 'we did learn', 'the truth'],
    ['In no way', 'is he', 'he is', 'does he be', 'responsible for this'],
    ['Never before', 'had I felt', 'I had felt', 'did I felt', 'so nervous'],
    ['Only by working together', 'can we solve', 'we can solve', 'we solve', 'this'],
    ['Not until the last minute', 'did he tell', 'he told', 'he did tell', 'us'],
    ['So tired', 'was she', 'she was', 'did she be', 'that she fell asleep at once'],
  ];
  T.forEach(([adv, inv, norm, w, r], i) => {
    const tail = r ? ' ' + r : '';
    add('inversion', mc(`${adv} ___${tail}.`, inv, [norm, w]));
    add('inversion', i % 2 ? err(`${adv} ${norm}${tail}.`, `${adv} ${inv}${tail}.`, 'Tras un adverbio negativo o restrictivo al principio: auxiliar + sujeto.') : gap(`${adv} ___${tail}. (${norm})`, inv));
  });
}
{
  const IT: [string, string, string, string][] = [['John', 'who', 'broke the window', 'which'], ['my sister', 'who', 'told me', 'which'], ['in 2010', 'that', 'they first met', 'when it'], ['the noise', 'that', 'woke me up', 'what'], ['in Paris', 'that', 'we got engaged', 'where it'], ['the manager', 'who', 'made the decision', 'which'], ['yesterday', 'that', 'I heard the news', 'when it'], ['your attitude', 'that', 'worries me', 'what'], ['because of the rain', 'that', 'we stayed in', 'why'], ['my parents', 'who', 'paid for it', 'which']];
  const WHAT: [string, string, string][] = [['What I need', 'is', 'a long holiday'], ['What she wants', 'is', 'a pay rise'], ['What annoys me', 'is', 'his arrogance'], ['What we need', 'is', 'more time'], ['What I like about him', 'is', 'his honesty'], ['What surprised me', 'was', 'the price'], ['What worries them', 'is', 'the cost'], ['What he did', 'was', 'call the police'], ['All I want', 'is', 'some peace and quiet'], ['The thing that bothers me', 'is', 'the noise']];
  IT.forEach(([f, rel, r, w], i) => {
    add('cleft', mc(`It was ${f} ___ ${r}.`, rel, [w, 'what', 'whom'].filter((x, j, a) => a.indexOf(x) === j && x !== rel)));
    add('cleft', i % 2 ? err(`It was ${f} what ${r}.`, `It was ${f} ${rel} ${r}.`, 'It was … who / that …') : mc(`___ ${f} ${rel} ${r}.`, 'It was', ['There was', 'What was']));
  });
  WHAT.forEach(([s, b, c], i) => {
    add('cleft', mc(`${s} ___ ${c}.`, b, [b === 'is' ? 'are' : 'were', 'it is']));
    add('cleft', i % 2 ? err(`${s.replace(/^What/, 'That what')} ${b} ${c}.`.replace('All I want', 'All what I want').replace('The thing that', 'The thing what'), `${s} ${b} ${c}.`) : mc(`___ ${s.split(' ').slice(1).join(' ')} ${b} ${c}.`, s.split(' ')[0], s.startsWith('What') ? ['That', 'Which'] : s.startsWith('All') ? ['Everything what', 'What all'] : ['What', 'It']));
  });
}
{
  const T: [string, string, string, string][] = [["You'd better", 'leave', 'now', 'or you’ll miss the train'], ["We'd better", 'take', 'an umbrella', 'it looks like rain'], ["She'd better", 'see', 'a doctor', ''], ["He'd better", 'apologise', '', ''], ["I'd better", 'go', 'now', "it's getting late"], ["They'd better", 'book', 'in advance', ''], ["You'd better", 'hurry', 'up', ''], ["We'd better", 'ask', 'for directions', ''], ["You'd better", 'check', 'the oil', 'before the trip'], ["She'd better", 'start', 'studying', '']];
  const NEG: [string, string, string][] = [["You'd better", 'be', 'late'], ["We'd better", 'tell', 'him'], ["You'd better", 'touch', 'that'], ["He'd better", 'forget', 'again'], ["I'd better", 'eat', 'any more'], ["They'd better", 'make', 'any noise']];
  T.forEach(([s, v, r, e], i) => {
    const tail = `${r ? ' ' + r : ''}${e ? ', ' + e : ''}`;
    add('had-better', mc(`${s} ___${tail}.`, v, [`to ${v}`, v.endsWith('e') ? v.slice(0, -1) + 'ing' : v + 'ing']));
    add('had-better', i % 2 ? err(`${s} to ${v}${tail}.`, `${s} ${v}${tail}.`, 'had better + verbo sin «to».') : mc(`${s.replace("'d better", '')} ___ better ${v}${tail}.`, 'had', ['should', 'have']));
    if (i % 3 === 0) add('had-better', err(`${s.replace("'d", ' have')} ${v}${tail}.`, `${s.replace("'d", ' had')} ${v}${tail}.`, "'d better = had better."));
  });
  NEG.forEach(([s, v, r]) => add('had-better', mc(`${s} ___ ${r}.`, `not ${v}`, [`don't ${v}`, `not to ${v}`]), err(`${s.replace("'d", " hadn't")} ${v} ${r}.`, `${s} not ${v} ${r}.`, 'Negativo: had better not + verbo.')));
}
{
  const SQ: [string, string, string, string][] = [['Who', 'broke', 'break', 'the window'], ['Who', 'called', 'call', 'you last night'], ['What', 'happened', 'happen', 'at the party'], ['Who', 'wrote', 'write', 'this book'], ['Who', 'won', 'win', 'the match'], ['Who', 'told', 'tell', 'you that'], ['How many people', 'came', 'come', 'to the party'], ['Who', 'made', 'make', 'this cake'], ['What', 'caused', 'cause', 'the accident'], ['Who', 'paid', 'pay', 'the bill']];
  const PS: [string, string, string, string][] = [['Who', 'lives', 'live', 'in that house'], ['What', 'makes', 'make', 'you happy'], ['Which team', 'plays', 'play', 'here'], ['Who', 'knows', 'know', 'the answer'], ['Who', 'wants', 'want', 'more coffee']];
  const OQ: [string, string, string, string][] = [['Who did you', 'see', 'saw', 'at the party'], ['What did she', 'say', 'said', ''], ['Who does he', 'work', 'works', 'with'], ['What did they', 'buy', 'bought', ''], ['Who did you', 'call', 'called', 'last night'], ['What does she', 'want', 'wants', ''], ['Who did he', 'invite', 'invited', ''], ['What did you', 'eat', 'ate', 'for lunch']];
  SQ.forEach(([w, p, b, r], i) => {
    add('object-questions', mc(`${w} ___ ${r}?`, p, [`did ${b}`, `did ${p}`], 'Si preguntas por el sujeto, no hay did.'));
    add('object-questions', i % 2 ? err(`${w} did ${b} ${r}?`, `${w} ${p} ${r}?`, 'Pregunta de sujeto: sin auxiliar.') : gap(`${w} ___ (${b}) ${r}? (pasado)`, p));
  });
  PS.forEach(([w, s3, b, r]) => add('object-questions', mc(`${w} ___ ${r}?`, s3, [`does ${b}`, `do ${b}`]), err(`${w} does ${b} ${r}?`, `${w} ${s3} ${r}?`, 'Pregunta de sujeto: sin auxiliar.')));
  OQ.forEach(([q, b, w, r], i) => {
    const tail = r ? ' ' + r : '';
    add('object-questions', mc(`${q} ___${tail}?`, b, [w, b.endsWith('e') ? b.slice(0, -1) + 'ing' : b + 'ing']));
    if (i % 2 === 0) add('object-questions', err(`${q} ${w}${tail}?`, `${q} ${b}${tail}?`, 'Con do / does / did, el verbo va en forma base.'));
  });
}

/* ---------- salida ---------- */
const TARGET = 100;
let total = 0;
const body = Object.entries(OUT)
  .map(([topic, lines]) => {
    const uniq = [...new Set(lines)];
    const pick = shuffle(uniq).slice(0, TARGET);
    total += pick.length;
    return `  '${topic}': \`\n${pick.join('\n').replace(/`/g, "'").replace(/\$\{/g, '$ {')}\n\`,`;
  })
  .join('\n');
writeFileSync(
  new URL('../src/content/grammarGen.ts', import.meta.url),
  `/* GENERADO por scripts/gen-grammar.ts — no editar a mano. Ejercicios construidos con plantillas y conjugación real;\n   se anexan al final de cada tema. */\nexport const GRAMMAR_GEN: Record<string, string> = {\n${body}\n};\n`,
);
console.log(`grammarGen.ts: ${Object.keys(OUT).length} temas, ${total} ejercicios`);
console.log(Object.entries(OUT).map(([k, v]) => `${k} ${Math.min(TARGET, new Set(v).size)}`).join(' · '));
