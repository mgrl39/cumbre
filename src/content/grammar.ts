import type { GrammarCat, GrammarTopic } from '../core/types.ts';
import { LEVELS } from '../core/types.ts';
import { GRAMMAR_A } from './grammarA.ts';
import { GRAMMAR_B1 } from './grammarB.ts';
import { GRAMMAR_B2, GRAMMAR_C1 } from './grammarC.ts';
import { GRAMMAR_EXTRA } from './grammarExtra.ts';
import { GRAMMAR_TABLES } from './grammarTables.ts';
import { GRAMMAR_NEW_A } from './grammarNewA.ts';
import { GRAMMAR_NEW_B } from './grammarNewB.ts';
import { GRAMMAR_MORE } from './grammarMore.ts';
import { GRAMMAR_GEN } from './grammarGen.ts';

/* Árbol: nivel → subnivel (1/2) → categoría → tema. [subnivel, categoría] */
const META: Record<string, [1 | 2, GrammarCat]> = {
  'to-be': [1, 'verbs'], 'present-simple': [1, 'tenses'], 'articles-basic': [1, 'nouns'], 'plurals-demonstratives': [1, 'nouns'], possessives: [1, 'nouns'],
  'there-is': [2, 'nouns'], 'can-ability': [2, 'modals'], 'prep-time': [2, 'words'], frequency: [2, 'words'], imperatives: [2, 'verbs'], 'questions-basic': [2, 'clauses'],
  'present-continuous': [1, 'tenses'], 'past-simple': [1, 'tenses'], 'past-continuous': [1, 'tenses'], comparatives: [1, 'words'], 'adjectives-adverbs': [1, 'words'], 'prep-place': [1, 'words'],
  quantifiers: [2, 'nouns'], 'future-basic': [2, 'tenses'], 'present-perfect-basic': [2, 'tenses'], 'modals-obligation': [2, 'modals'], 'verb-patterns-basic': [2, 'verbs'], 'indefinite-pronouns': [2, 'nouns'], 'fn-requests-offers': [2, 'functions'],
  'pp-vs-past': [1, 'tenses'], 'pp-continuous': [1, 'tenses'], 'past-perfect': [1, 'tenses'], 'conditionals-012': [1, 'clauses'], 'few-little': [1, 'nouns'], 'fn-agree': [1, 'functions'], 'fn-opinions': [1, 'functions'], 'fn-clarification': [1, 'functions'],
  'passive-basic': [2, 'verbs'], 'passive-tenses': [2, 'verbs'], 'relative-defining': [2, 'clauses'], 'reported-statements': [2, 'clauses'], 'used-to': [2, 'tenses'], 'modals-deduction': [2, 'modals'], 'too-enough-so-such': [2, 'words'], 'questions-indirect': [2, 'clauses'], 'gerund-infinitive-b1': [2, 'verbs'], 'fn-refusal': [2, 'functions'], 'fn-probability': [2, 'functions'],
  'conditionals-3-mixed': [1, 'clauses'], 'passive-advanced': [1, 'verbs'], 'relative-nondefining': [1, 'clauses'], 'reporting-verbs': [1, 'clauses'], 'modals-past': [1, 'modals'], 'fn-regret-criticism': [1, 'functions'],
  wish: [2, 'clauses'], 'future-advanced': [2, 'tenses'], 'gerund-infinitive-meaning': [2, 'verbs'], 'contrast-linkers': [2, 'discourse'], 'articles-advanced': [2, 'nouns'], 'fn-persuasion': [2, 'functions'],
  inversion: [1, 'discourse'], cleft: [1, 'discourse'], 'participle-clauses': [1, 'clauses'], 'subjunctive-formal': [1, 'verbs'], 'conditionals-alternatives': [1, 'clauses'],
  hedging: [2, 'discourse'], 'ellipsis-substitution': [2, 'discourse'], 'emphasis-c1': [2, 'words'], 'advanced-linking': [2, 'discourse'],
};

const ALL = [...GRAMMAR_A, ...GRAMMAR_B1, ...GRAMMAR_B2, ...GRAMMAR_C1, ...GRAMMAR_EXTRA, ...GRAMMAR_NEW_A, ...GRAMMAR_NEW_B];
export const GRAMMAR: GrammarTopic[] = ALL.map((t, i) => {
  const m = META[t.id] ?? (t.sub && t.cat ? [t.sub, t.cat] : undefined);
  if (!m) throw new Error('Tema sin META: ' + t.id);
  // los ejercicios añadidos van siempre al final: así los ids de los anteriores no cambian
  const items = [t.items, GRAMMAR_MORE[t.id], GRAMMAR_GEN[t.id]].filter(Boolean).join('\n');
  return { ...t, items, sub: m[0], cat: m[1], table: GRAMMAR_TABLES[t.id] ?? t.table, _i: i } as GrammarTopic & { _i: number };
}).sort((a, b) => LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || a.sub! - b.sub! || (a as unknown as { _i: number })._i - (b as unknown as { _i: number })._i);
