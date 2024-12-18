import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default {
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'], // 문제가 되는 모듈을 추가
    },
  },
};
