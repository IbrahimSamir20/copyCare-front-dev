import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {},
  },
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});