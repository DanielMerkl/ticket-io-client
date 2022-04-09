import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/utils/jest-setup.ts',
  },
  plugins: [react()],
  server: {
    port: 3001,
  },
});
