import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';

  return {
    base: '/',  // ← 加入這行,確保靜態資源路徑正確
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    build: {  // ← 加入 build 配置
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
    },
    plugins: [
      react(),
      VitePWA({
        devOptions: { enabled: true },
        manifestFilename: 'manifest.json',
        includeAssets: ['kiwi_192.png', 'kiwi_512.png'],
        injectRegister: 'auto',
        registerType: 'autoUpdate',
        workbox: {  // ← 加入 workbox 配置
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                }
              }
            }
          ]
        },
        manifest: {
          short_name: "NZTrip",
          name: "NZ Road Trip Companion",
          icons: [
            { src: "/kiwi_192.png", type: "image/png", sizes: "192x192" },
            { src: "/kiwi_512.png", type: "image/png", sizes: "512x512" }
          ],
          start_url: "/",  // ← 改成絕對路徑
          display: "standalone",
          background_color: "#e4edfe",
          theme_color: "#bcd2f9"
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
