/* Utilidades de texto: normalizar respuestas, comparar, barajar, lematizar. */

export const rnd = (n: number) => Math.floor(Math.random() * n);
export const pick = <T,>(a: T[]): T => a[rnd(a.length)];
export function shuffle<T>(a: T[]): T[] {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
export const uniq = <T,>(a: T[]) => [...new Set(a)];

const PRON = '(i|you|he|she|it|we|they|that|there|what|who|where|here|how)';
const CONTRACT: [RegExp, string][] = [
  [/\bcan ?not\b/g, "can't"],
  [/\bwill not\b/g, "won't"],
  [/\bshall not\b/g, "shan't"],
  [/\b(do|does|did|is|are|was|were|have|has|had|would|could|should|must|need|might) not\b/g, "$1n't"],
  [new RegExp(`\\b${PRON} am\\b`, 'g'), "$1'm"],
  [new RegExp(`\\b${PRON} (is|has)\\b`, 'g'), "$1's"],
  [new RegExp(`\\b${PRON} are\\b`, 'g'), "$1're"],
  [new RegExp(`\\b${PRON} have\\b`, 'g'), "$1've"],
  [new RegExp(`\\b${PRON} will\\b`, 'g'), "$1'll"],
  [new RegExp(`\\b${PRON} (would|had)\\b`, 'g'), "$1'd"],
  [/\blet us\b/g, "let's"],
];

/** Forma canónica para comparar: minúsculas, sin puntuación, contracciones unificadas. */
export function norm(s: string): string {
  let t = s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:"()¿¡…\-–—]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  for (const [re, rep] of CONTRACT) t = t.replace(re, rep);
  return t;
}

export function isCorrect(input: string, answers: string[]): boolean {
  const n = norm(input);
  if (!n) return false;
  return answers.some((a) => norm(a) === n);
}

export function lev(a: string, b: string): number {
  const m = a.length,
    n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}

/** Para dictados: compara palabra a palabra y devuelve qué palabras de la referencia fallaron. */
export function wordDiff(input: string, ref: string): { word: string; ok: boolean }[] {
  const a = norm(input).split(' ');
  const b = ref.split(/\s+/);
  const bn = b.map((w) => norm(w));
  // LCS para alinear
  const m = a.length,
    n = bn.length;
  const L = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--)
    for (let j = n - 1; j >= 0; j--) L[i][j] = a[i] === bn[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ok = Array(n).fill(false);
  let i = 0,
    j = 0;
  while (i < m && j < n) {
    if (a[i] === bn[j]) {
      ok[j] = true;
      i++;
      j++;
    } else if (L[i + 1][j] >= L[i][j + 1]) i++;
    else j++;
  }
  return b.map((word, k) => ({ word, ok: ok[k] || bn[k] === '' }));
}

export function tokenizeWords(s: string): string[] {
  return s.split(/\s+/).filter(Boolean);
}

/** Lematizador muy simple para buscar en el diccionario. Devuelve candidatos. */
export function lemmaCandidates(raw: string): string[] {
  const w = raw.toLowerCase().replace(/[’']s$/, '').replace(/[^a-z'-]/g, '');
  const c = [w];
  const add = (x: string) => x.length > 1 && c.push(x);
  if (w.endsWith('ies')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ied')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) add(w.slice(0, -2));
  if (w.endsWith('s')) add(w.slice(0, -1));
  if (w.endsWith('ed')) {
    add(w.slice(0, -2));
    add(w.slice(0, -1));
    if (/(.)\1ed$/.test(w)) add(w.slice(0, -3));
  }
  if (w.endsWith('ing')) {
    add(w.slice(0, -3));
    add(w.slice(0, -3) + 'e');
    if (/(.)\1ing$/.test(w)) add(w.slice(0, -4));
  }
  if (w.endsWith('ly')) {
    add(w.slice(0, -2));
    if (w.endsWith('ily')) add(w.slice(0, -3) + 'y');
  }
  if (w.endsWith('er')) add(w.slice(0, -2));
  if (w.endsWith('est')) add(w.slice(0, -3));
  return uniq(c);
}

export function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  const s = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = s.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}

export function splitSentences(text: string): string[] {
  return (text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || []).map((s) => s.trim()).filter(Boolean);
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
