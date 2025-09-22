import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Vite configuration with React SWC plugin and Vitest setup
// Ensures test files in tests/ are discovered and jsdom is used
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'], // Load jest-dom matchers
    include: ['tests/**/*.test.{js,jsx}'], // Explicitly include test files
  },
});