import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@app': path.resolve(__dirname, './src/app'),
      '@api': path.resolve(__dirname, './src/api'),
      '@actions': path.resolve(__dirname, './src/actions'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@router': path.resolve(__dirname, './src/router'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@loaders': path.resolve(__dirname, './src/loaders'),
      '@validation': path.resolve(__dirname, './src/validation'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@styles': path.resolve(__dirname, './src/styles'),
    }
  }
});