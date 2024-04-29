// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare-pages',
    rollupConfig: {
      external: ['cloudflare:sockets', 'pg-native'],
    },
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  build: {
    transpile: ['trpc-nuxt'],
  },

  modules: [
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-cloudflare-analytics',
    "@nuxtjs/sitemap"
  ],

  cloudflareAnalytics: {
    token: 'f39782652df14122b6c0f5c7d6f9b438',
  },

  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 minute
    '/api/*': { cache: { maxAge: 60 } },
    // Not indexed by search engines
    '/dashboard/*': { robots: false },
    '/dashboard': { robots: false },
  },

  hub: {
    database: true,
  },

  ui: {
    icons: ['heroicons'],
  },

  tailwindcss: {
    config: {
      plugins: ['tailwindcss/plugin-forms'],
    },
  },
});