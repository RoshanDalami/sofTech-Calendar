import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // strategies: "generateSW",
      filename: "sw.ts",
      injectRegister: "inline",
      srcDir: "src/service-worker",
      strategies: "injectManifest",
      includeAssets: ["**/*.{js,css,html,ico,png,json}", "**/data/*.{js,css,html,ico,png,json}"],
      manifest: {
        name: "Miti - Nepali Calendar",
        short_name: "Miti",
        description: "Minimal Nepali Calendar Progressive Web App",
        edge_side_panel: {
          preferred_width: 360,
        },

        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "ne",
        scope: "/",
        theme_color: "#4f46e5",
        orientation: "portrait-primary",
        categories: ["books", "lifestyle", "productivity", "utilities"],
        icons: [
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        dir: "ltr",
        display_override: ["window-controls-overlay", "standalone"],
        shortcuts: [
          {
            name: "Homepage",
            url: "/",
            description: "Go to homepage",
            icons: [
              {
                src: "/icons/home.png",
                sizes: "96x96",
              },
            ],
          },
          {
            name: "Date Converter",
            url: "converter",
            description: "Go to date converter",
            icons: [
              {
                src: "/icons/converter.png",
                sizes: "96x96",
              },
            ],
          },
        ],
        screenshots: [
          {
            src: "/screenshots/image1.png",
            sizes: "1357x678",
            type: "image/png",
          },
          {
            src: "/screenshots/image2.png",
            sizes: "1357x678",
            type: "image/png",
          },
          {
            src: "/screenshots/image3.png",
            sizes: "1357x678",
            type: "image/png",
          },
          {
            src: "/screenshots/image4.png",
            sizes: "1357x678",
            type: "image/png",
          },
          {
            src: "/screenshots/image5.png",
            sizes: "1357x678",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
      // workbox: {
      //   navigateFallbackDenylist: [/^\/api/],
      //   offlineGoogleAnalytics: true,
      //   globPatterns: ["**/*.{js,css,html,ico,png,json}", "**/data/*.{js,css,html,ico,png,json}"],
      //   runtimeCaching: [
      //     {
      //       urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      //       handler: "CacheFirst",
      //       options: {
      //         cacheName: "google-fonts-cache",
      //         expiration: {
      //           maxEntries: 10,
      //           maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //     {
      //       urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      //       handler: "CacheFirst",
      //       options: {
      //         cacheName: "gstatic-fonts-cache",
      //         expiration: {
      //           maxEntries: 10,
      //           maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //     {
      //       // cache api call /events for 10 days with newtwork first strategy, use relative path
      //       urlPattern: /\/api\/.*/i,
      //       handler: "NetworkFirst",
      //       options: {
      //         backgroundSync: {
      //           name: "events",
      //           options: {
      //             maxRetentionTime: 60 * 60 * 24 * 10, // <== 10 days
      //           },
      //         },

      //         fetchOptions: {
      //           credentials: "include",
      //         },

      //         cacheName: "events-cache",
      //         expiration: {
      //           maxEntries: 10,
      //           maxAgeSeconds: 60 * 60 * 24 * 10, // <== 10 days
      //         },
      //         cacheableResponse: {
      //           statuses: [0, 200],
      //         },
      //       },
      //     },
      //   ],
      // },
    }),
  ],
});
