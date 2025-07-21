import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for simplified imports
    },
  },
  server: {
    port: 3000, // Development server port
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to the backend
        changeOrigin: true, // Ensures correct origin is set
        secure: false, // Disable SSL verification for development
      },
    },
  },
});
