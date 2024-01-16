import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      shared: resolve(__dirname, 'src/shared'),
      widgets: resolve(__dirname, 'src/widgets'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
