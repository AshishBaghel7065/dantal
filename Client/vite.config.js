import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window',
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: '@import "node_modules/summernote/dist/summernote.css";'
      }
    }
  },
 resolve: {
    alias: {
      'codemirror': 'node_modules/codemirror',
    }
  }
})
