/*
 * Voz. Dos motores, ambos 100 % en el navegador:
 *  - "neural": Piper (VITS) ejecutado con onnxruntime-web en WASM. El modelo (~60 MB) se descarga una vez
 *    desde Hugging Face y queda guardado en el navegador (OPFS). Suena natural.
 *  - "system": la Web Speech API (depende del sistema: en Linux suele ser espeak, muy robótica). Solo de respaldo.
 */
import { getState } from './store.ts';

export const NEURAL_VOICES: { id: string; name: string; mb: number }[] = [
  { id: 'en_US-hfc_female-medium', name: '🇺🇸 Mujer (clara) — recomendada', mb: 63 },
  { id: 'en_US-hfc_male-medium', name: '🇺🇸 Hombre (claro)', mb: 63 },
  { id: 'en_GB-cori-medium', name: '🇬🇧 Mujer británica', mb: 63 },
  { id: 'en_GB-alan-medium', name: '🇬🇧 Hombre británico', mb: 63 },
  { id: 'en_US-lessac-medium', name: '🇺🇸 Mujer (narradora)', mb: 63 },
  { id: 'en_US-ryan-high', name: '🇺🇸 Hombre (alta calidad, más lenta)', mb: 116 },
];

const ORT_VERSION = '1.31.1';
const WASM_PATHS = {
  onnxWasm: `https://cdn.jsdelivr.net/npm/onnxruntime-web@${ORT_VERSION}/dist/`,
  piperData: 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.data',
  piperWasm: 'https://cdn.jsdelivr.net/npm/@diffusionstudio/piper-wasm@1.0.0/build/piper_phonemize.wasm',
};

/* ---------------- estado observable del motor neuronal ---------------- */
export type NeuralStatus = { state: 'off' | 'loading' | 'ready' | 'error'; progress: number; voice: string; error?: string };
let status: NeuralStatus = { state: 'off', progress: 0, voice: '' };
const subs = new Set<() => void>();
const setStatus = (p: Partial<NeuralStatus>) => {
  status = { ...status, ...p };
  subs.forEach((f) => f());
};
export const neuralStatus = () => status;
export const subscribeNeural = (f: () => void) => {
  subs.add(f);
  return () => subs.delete(f);
};

type Session = { predict: (t: string) => Promise<Blob> };
let session: Session | null = null;
let loadingVoice = '';

export async function storedVoices(): Promise<string[]> {
  try {
    const tts = await import('@mintplex-labs/piper-tts-web');
    return await tts.stored();
  } catch {
    return [];
  }
}

/** Carga (y si hace falta descarga) la voz neuronal. Idempotente. */
export async function loadNeural(voice = getState().settings.neuralVoice): Promise<boolean> {
  if (status.state === 'ready' && status.voice === voice) return true;
  if (loadingVoice === voice) return false;
  loadingVoice = voice;
  setStatus({ state: 'loading', progress: 0, voice, error: undefined });
  try {
    const tts = await import('@mintplex-labs/piper-tts-web');
    const TS = tts.TtsSession as unknown as { _instance: unknown; create: (o: object) => Promise<Session> };
    TS._instance = null; // la librería es singleton: forzamos sesión nueva al cambiar de voz
    session = await TS.create({
      voiceId: voice,
      wasmPaths: WASM_PATHS,
      progress: (p: { url: string; loaded: number; total: number }) => {
        if (p.url.endsWith('.onnx') && p.total) setStatus({ progress: Math.round((p.loaded / p.total) * 100) });
      },
    });
    cache.clear();
    setStatus({ state: 'ready', progress: 100 });
    return true;
  } catch (e) {
    session = null;
    setStatus({ state: 'error', error: String((e as Error)?.message || e) });
    return false;
  } finally {
    loadingVoice = '';
  }
}

/** Al arrancar: si la voz ya está descargada, se carga sola en segundo plano. */
export async function bootSpeech() {
  const st = getState().settings;
  if (st.engine !== 'neural') return;
  const stored = await storedVoices();
  if (stored.includes(st.neuralVoice)) loadNeural(st.neuralVoice);
}

/* ---------------- síntesis con caché y cola (ONNX no admite llamadas concurrentes) ---------------- */
const cache = new Map<string, Promise<string>>();
let chain: Promise<unknown> = Promise.resolve();

function synth(text: string): Promise<string> {
  const key = text.trim();
  const hit = cache.get(key);
  if (hit) return hit;
  const p = (chain = chain.then(async () => {
    const blob = await session!.predict(key);
    return URL.createObjectURL(blob);
  })) as Promise<string>;
  cache.set(key, p);
  p.catch(() => cache.delete(key));
  if (cache.size > 300) {
    const first = cache.keys().next().value as string;
    cache.get(first)?.then((u) => URL.revokeObjectURL(u));
    cache.delete(first);
  }
  return p;
}

/** Precalcula el audio (p. ej. del siguiente ejercicio) para que suene al instante. */
export function prefetch(text: string) {
  if (useNeural() && text) synth(text).catch(() => {});
}

const useNeural = () => getState().settings.engine === 'neural' && status.state === 'ready' && !!session;

/* ---------------- reproducción ---------------- */
let gen = 0;
let audio: HTMLAudioElement | null = null;
const synthApi = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
let sysVoices: SpeechSynthesisVoice[] = [];
if (synthApi) {
  const load = () => (sysVoices = synthApi.getVoices().filter((v) => v.lang.toLowerCase().startsWith('en')));
  load();
  synthApi.onvoiceschanged = load;
}
export const systemVoices = () => sysVoices;
export const ttsAvailable = () => !!synthApi || typeof Audio !== 'undefined';

export interface SpeakOpts {
  rate?: number;
  onEnd?: () => void;
  /** Para lecturas largas: índice de la frase que suena. */
  onSentence?: (i: number) => void;
}

export function stopSpeaking() {
  gen++;
  audio?.pause();
  audio = null;
  synthApi?.cancel();
}

export function splitForSpeech(text: string): string[] {
  return (text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || []).map((s) => s.trim()).filter(Boolean);
}

export function speak(text: string, opts: SpeakOpts = {}) {
  stopSpeaking();
  const my = gen;
  const rate = (opts.rate ?? 1) * getState().settings.rate;
  if (!useNeural()) {
    systemSpeak(text, rate, opts, my);
    return;
  }
  const parts = text.length > 220 || opts.onSentence ? splitForSpeech(text) : [text];
  const play = async (i: number) => {
    if (my !== gen) return;
    if (i >= parts.length) return opts.onEnd?.();
    opts.onSentence?.(i);
    try {
      const url = await synth(parts[i]);
      if (i + 1 < parts.length) synth(parts[i + 1]).catch(() => {});
      if (my !== gen) return;
      const a = new Audio(url);
      a.playbackRate = rate;
      a.preservesPitch = true;
      audio = a;
      a.onended = () => play(i + 1);
      await a.play();
    } catch {
      if (my === gen) systemSpeak(parts.slice(i).join(' '), rate, opts, my);
    }
  };
  play(0);
}

function systemSpeak(text: string, rate: number, opts: SpeakOpts, my: number) {
  if (!synthApi) return opts.onEnd?.();
  const u = new SpeechSynthesisUtterance(text);
  const pref = getState().settings.voice;
  const v =
    sysVoices.find((x) => x.name === pref) ||
    sysVoices.find((x) => /natural|neural|online|google/i.test(x.name)) ||
    sysVoices.find((x) => /en[-_](US|GB)/i.test(x.lang)) ||
    sysVoices[0];
  if (v) {
    u.voice = v;
    u.lang = v.lang;
  } else u.lang = 'en-US';
  u.rate = rate;
  u.onend = () => my === gen && opts.onEnd?.();
  synthApi.speak(u);
}
