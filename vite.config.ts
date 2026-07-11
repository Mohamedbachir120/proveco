import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Note: If you are deploying to a GitHub Pages repository 
  // (e.g., https://username.github.io/repo-name/), you MUST 
  // uncomment the line below and put your repo name in it:
  base: '/proveco/',
  
  plugins: [
    react(), 
    tailwindcss(), 
    viteSingleFile()
  ],
  build: {
    assetsInlineLimit: 100000000, // Forces all assets to be inlined
    cssCodeSplit: false,          // Prevents CSS from being split
  }
})