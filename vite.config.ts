import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' => el build funciona abierto desde cualquier carpeta o hosting estático (GitHub Pages, Netlify...)
export default defineConfig({ plugins: [react()], base: './' });
