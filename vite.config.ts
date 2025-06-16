import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({ command}) => {
  if (command === 'serve') {
    // dev server
    return {
      plugins: [react(),tailwindcss()],
      base: '/Portfolio/',  // dev server runs at root
    }
  } else {
    // build
    return {
      plugins: [react(),tailwindcss()],
      base: '/Portfolio/',  // production base path
    }
  }
})
