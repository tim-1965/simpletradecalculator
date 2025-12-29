import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Use the default esbuild minifier to avoid requiring the optional "terser" dependency
    // during Netlify builds.
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'icons': ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
