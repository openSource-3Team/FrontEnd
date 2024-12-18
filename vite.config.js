import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [], // 외부 모듈 비우기
    },
  },
});
