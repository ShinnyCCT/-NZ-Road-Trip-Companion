import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          short_name: "NZTrip",
          name: "NZ Road Trip Companion",
          icons: [
            { src: "/kiwi_192.png", type: "image/png", sizes: "192x192" },
            { src: "/kiwi_512.png", type: "image/png", sizes: "512x512" }
          ],
          start_url: ".",
          display: "standalone",
          background_color: "#e4edfe",
          theme_color: #bcd2f9"
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
