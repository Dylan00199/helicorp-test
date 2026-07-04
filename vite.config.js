import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  build: {
    // Every page is route-split (see src/router/AnimatedRoutes.jsx), so
    // three.js / @react-three/fiber / @react-three/drei only ever end up in
    // Home's own chunk, not the shared vendor bundle. That chunk still runs
    // ~230KB gzipped on its own -- expected for a real WebGL scene, not a
    // regression to chase. Raising the warning threshold to reflect that
    // instead of silencing it at the default.
    chunkSizeWarningLimit: 1000,
  },
})
