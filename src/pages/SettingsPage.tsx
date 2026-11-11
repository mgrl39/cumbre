import { useEffect, useState, useSyncExternalStore } from 'react';
import { sfx } from '../core/sfx.ts';
import { useStore, update, exportJSON, importJSON, replaceState, freshState } from '../core/store.ts';
import { NEURAL_VOICES, loadNeural, neuralStatus, subscribeNeural, storedVoices, systemVoices, speak, ttsAvailable } from '../core/speech.ts';
import { Card } from '../ui/common.tsx';
import { Icon } from '../ui/icons.tsx';

const SAMPLE = 'Reading research papers in English is a skill you can master, one small step at a time.';

export default function SettingsPage() {
  const st = useStore((s) => s.settings);
  const voice = useSyncExternalStore(subscribeNeural, neuralStatus);
  const [stored, setStored] = useState<string[]>([]);
  const [sys, setSys] = useState(systemVoices());
  const [msg, setMsg] = useState('');
  useEffect(() => {
    storedVoices().then(setStored);
    const id = setTimeout(() => setSys(systemVoices()), 600);
    return () => clearTimeout(id);
  }, [voice.state]);
  const set = (patch: Partial<typeof st>) => update((s) => void Object.assign(s.settings, patch));

  const chooseVoice = (id: string) => {
    set({ neuralVoice: id, engine: 'neural' });
    if (stored.includes(id) || voice.state === 'ready') loadNeural(id);
  };

  const doExport = () => {
    const blob = new Blob([exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `cumbre-english-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const doImport = (f: File) => {
    f.text().then((t) => {
      try {
        importJSON(t);
        setMsg('✓ Progreso importado');
      } catch (e) {
        setMsg('✗ ' + (e as Error).message);
      }
    });
  };

  const isReady = voice.state === 'ready' && voice.voice === st.neuralVoice;
  return (
    <div className="page narrow">
      <h1>Ajustes</h1>

      <Card>
        <h3>Voz</h3>
        <div className="seg" style={{ marginBottom: 10 }}>
          <button className={st.engine === 'neural' ? 'on' : ''} onClick={() => set({ engine: 'neural' })}>Natural (neuronal)</button>
          <button className={st.engine === 'system' ? 'on' : ''} onClick={() => set({ engine: 'system' })}>Del sistema</button>
        </div>
        {st.engine === 'neural' ? (
          <>
            <p className="muted small">
              Voces <b>Piper</b> que se ejecutan en tu navegador (sin servidor). Cada voz se descarga una vez (~60 MB) y queda guardada para usarla sin conexión.
            </p>
            <label>
              Voz
              <select value={st.neuralVoice} onChange={(e) => chooseVoice(e.target.value)}>
                {NEURAL_VOICES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} · {v.mb} MB{stored.includes(v.id) ? ' · ✓ descargada' : ''}
                  </option>
                ))}
              </select>
            </label>
            <div className="voice-status">
              <span className={'dot ' + (isReady ? 'on' : voice.state === 'loading' ? 'busy' : voice.state === 'error' ? 'err' : '')} />
              <span className="grow">
                {isReady
                  ? 'Lista. Todo el audio de la app usa esta voz.'
                  : voice.state === 'loading'
                    ? `Descargando y preparando… ${voice.progress} %`
                    : voice.state === 'error'
                      ? `No se pudo cargar (${voice.error}). Mientras tanto se usa la voz del sistema.`
                      : stored.includes(st.neuralVoice)
                        ? 'Descargada. Pulsa «Cargar» para activarla.'
                        : 'Sin descargar. Mientras tanto se usa la voz del sistema.'}
              </span>
              {!isReady && voice.state !== 'loading' && (
                <button className="btn small primary" onClick={() => loadNeural(st.neuralVoice)}>
                  <Icon name="download" size={16} /> {stored.includes(st.neuralVoice) ? 'Cargar' : 'Descargar'}
                </button>
              )}
            </div>
            {voice.state === 'loading' && <div className="progress"><div style={{ width: `${voice.progress}%` }} /></div>}
          </>
        ) : (
          <>
            {!ttsAvailable() && <div className="bad">Tu navegador no tiene síntesis de voz.</div>}
            <label>
              Voz inglesa del sistema
              <select value={st.voice} onChange={(e) => set({ voice: e.target.value })}>
                <option value="">Automática</option>
                {sys.map((v) => (
                  <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                ))}
              </select>
            </label>
            <div className="muted small">En Linux suele ser espeak (robótica). Recomendamos la voz natural.</div>
          </>
        )}
        <label style={{ marginTop: 8 }}>
          Velocidad: {st.rate.toFixed(2)}×
          <input type="range" min={0.6} max={1.3} step={0.05} value={st.rate} onChange={(e) => set({ rate: Number(e.target.value) })} />
        </label>
        <button className="btn small" onClick={() => speak(SAMPLE)}>
          <Icon name="volume" size={16} /> Probar
        </button>
      </Card>

      <Card>
        <h3>Ritmo</h3>
        <p className="muted small">Aquí no hay mínimo diario: haz lo que te apetezca. Lo que sí hay es un <b>máximo</b>, para no quemarte y dejar que lo aprendido se asiente. El repaso nunca cuenta para el máximo.</p>
        <label>
          Máximo de respuestas al día: <b>{st.dailyMax}</b>
          <input type="range" min={50} max={800} step={25} value={st.dailyMax} onChange={(e) => set({ dailyMax: Number(e.target.value) })} />
        </label>
        <label>
          Máximo de palabras nuevas al día: <b>{st.newWordsMax}</b>
          <input type="range" min={5} max={50} step={5} value={st.newWordsMax} onChange={(e) => set({ newWordsMax: Number(e.target.value) })} />
        </label>
        <label className="check">
          <input type="checkbox" checked={st.sound} onChange={(e) => (set({ sound: e.target.checked }), e.target.checked && sfx('ok', true))} /> Sonidos de acierto y fallo
          <button className="link small" onClick={(e) => (e.preventDefault(), sfx('ok', true))}>▶ acierto</button>
          <button className="link small" onClick={(e) => (e.preventDefault(), sfx('bad', true))}>▶ fallo</button>
        </label>
        <label className="check">
          <input type="checkbox" checked={st.timer} onChange={(e) => set({ timer: e.target.checked })} /> Temporizador suave en el Flujo a partir del 4º bloque
        </label>
      </Card>

      <Card>
        <h3>Apariencia</h3>
        <div className="seg">
          {(['auto', 'light', 'dark'] as const).map((t) => (
            <button key={t} className={st.theme === t ? 'on' : ''} onClick={() => set({ theme: t })}>
              {t === 'auto' ? 'Automático' : t === 'light' ? 'Claro' : 'Oscuro'}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h3>Tu progreso</h3>
        <p className="muted small">Todo se guarda solo en este navegador (no hay servidor). Exporta una copia de vez en cuando o para pasarla a otro dispositivo.</p>
        <div className="row gap wrap">
          <button className="btn" onClick={doExport}>Exportar</button>
          <label className="btn">
            Importar
            <input type="file" accept="application/json" hidden onChange={(e) => e.target.files?.[0] && doImport(e.target.files[0])} />
          </label>
          <button className="btn danger" onClick={() => confirm('¿Borrar TODO el progreso? No se puede deshacer.') && replaceState(freshState())}>Reiniciar</button>
        </div>
        {msg && <div className="small">{msg}</div>}
      </Card>
    </div>
  );
}
