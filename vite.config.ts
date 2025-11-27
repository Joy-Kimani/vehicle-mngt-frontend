import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
})
// 'primary': '#0E1B2D', // Deep Midnight Blue
//         'accent': '#B7894F',  // Rich Gold
//         'background': '#EFECE5', // Warm Sand/Beige