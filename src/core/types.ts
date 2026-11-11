export type Skill = 'grammar' | 'vocab' | 'reading' | 'listening' | 'writing';
export const SKILLS: Skill[] = ['grammar', 'vocab', 'reading', 'listening', 'writing'];
export const SKILL_NAME: Record<Skill, string> = {
  grammar: 'Grammar',
  vocab: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
};
export const SKILL_ICON: Record<Skill, string> = {
  grammar: '🧩',
  vocab: '📚',
  reading: '📖',
  listening: '🎧',
  writing: '✍️',
};

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export const LEVELS: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const lvlNum = (l: Level) => LEVELS.indexOf(l) + 1;
export const lvlName = (n: number): Level => LEVELS[Math.max(0, Math.min(5, Math.round(n) - 1))];

/* ---------- Contenido ---------- */

export interface GrammarTopic {
  id: string;
  level: Level;
  title: string;
  /** Una línea: la regla esencial (se muestra al fallar). */
  rule: string;
  /** Explicación en español (markdown ligero). */
  es: string;
  /** Ejercicios en mini-DSL (ver core/content.ts). */
  items: string;
  /** Subnivel dentro del nivel (A1.1 / A1.2…) */
  sub?: 1 | 2;
  /** Categoría dentro del subnivel */
  cat?: GrammarCat;
  /** Tabla de referencia (markdown) */
  table?: string;
}
export type GrammarCat = 'tenses' | 'verbs' | 'modals' | 'nouns' | 'words' | 'clauses' | 'discourse' | 'functions';
export const CAT_NAME: Record<GrammarCat, string> = {
  tenses: 'Tiempos verbales',
  verbs: 'Formas y voz',
  modals: 'Modales',
  nouns: 'Sustantivos y determinantes',
  words: 'Adjetivos, adverbios y preposiciones',
  clauses: 'Oraciones complejas',
  discourse: 'Estilo y cohesión',
  functions: 'Language use (funciones)',
};
export const CAT_ICON: Record<GrammarCat, string> = {
  tenses: '⏳', verbs: '🔧', modals: '🎚️', nouns: '📦', words: '🔤', clauses: '🧬', discourse: '🪶', functions: '💬',
};

export interface GrammarItem {
  id: string;
  topicId: string;
  level: number;
  type: 'mc' | 'gap' | 'error' | 'trans' | 'translate';
  prompt: string;
  answers: string[];
  options?: string[];
  key?: string;
  note?: string;
  /** Frase completa correcta (para dictados, ordenar, oído fino). */
  sentence?: string;
}

export type VocabTag = 'core' | 'academic' | 'linker' | 'phrasal' | 'phrase' | 'false-friend' | 'custom';
export interface VocabEntry {
  id: string;
  word: string;
  pos: string;
  es: string;
  level: number;
  tag: VocabTag;
  /** Ejemplo con la palabra marcada entre *asteriscos*. */
  ex: string;
  note?: string;
  /** Entrada del banco de frecuencia (no curada a mano): no entra en los pasos del Camino. */
  bank?: boolean;
  /** Orden de aparición (nivel + frecuencia): las palabras nuevas salen por este orden. */
  ord?: number;
}

export interface ReadingQuestion {
  q: string;
  options: string[];
  answer: number;
}
export interface ReadingText {
  id: string;
  level: Level;
  /** texto largo (lectura intensiva) */
  long?: boolean;
  /** documento de la vida real (contrato, anuncio, email…) */
  real?: boolean;
  title: string;
  topic: string;
  text: string;
  questions: ReadingQuestion[];
}

export interface WritingItem {
  id: string;
  level: number;
  type: 'trans' | 'error' | 'translate' | 'linker';
  prompt: string;
  key?: string;
  start?: string;
  answers: string[];
  options?: string[];
  note?: string;
}

export interface WritingPrompt {
  id: string;
  level: Level;
  genre: string;
  title: string;
  task: string;
  min: number;
  max: number;
  tips: string[];
  model: string;
}

/* ---------- Ejercicios (lo que se pinta) ---------- */

export interface Exercise {
  id: string;
  skill: Skill;
  level: number;
  kind: 'mc' | 'type' | 'order' | 'learn';
  label: string;
  instruction: string;
  prompt: string;
  options?: string[];
  answers: string[];
  tokens?: string[];
  /** Texto que se lee en voz alta. */
  audio?: string;
  /** Si es true el enunciado no se ve hasta responder (ejercicio de oído). */
  hideText?: boolean;
  passage?: { id: string; title: string; text: string; audioOnly?: boolean };
  explain?: string;
  ruleTopic?: string;
  wordId?: string;
  /** Para dictados: se puntúa por palabras. */
  dictation?: boolean;
  learn?: VocabEntry;
  /** A ciegas (la Rueda): no se dice de qué tema es ni se ofrece la regla hasta después de responder. */
  blind?: boolean;
}
