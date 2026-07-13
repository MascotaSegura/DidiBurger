import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/DidiBurger/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'burger.png'],
      manifest: {
        name: 'DidiBurger',
        short_name: 'DidiBurger',
        description: 'La mejor comida a tu puerta',
        theme_color: '#F3F4F6',
        background_color: '#F3F4F6',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          },
          {
            src: 'burger.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'burger.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
  ],
})
