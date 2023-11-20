import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    VITE_API_KEY: process.env.VITE_API_KEY,
    VITE_API_KEY_2: process.env.VITE_API_KEY_2,
    VITE_API_KEY_3: process.env.VITE_API_KEY_3,
  }
})
