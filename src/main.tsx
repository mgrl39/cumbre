import { createRoot } from 'react-dom/client';
import '@fontsource-variable/inter';
import '@fontsource-variable/fraunces';
import App from './App.tsx';
import './styles.css';
import { bootSpeech } from './core/speech.ts';

// Sin StrictMode a propósito: las sesiones avanzan en efectos y no deben ejecutarse dos veces.
createRoot(document.getElementById('root')!).render(<App />);
bootSpeech();
