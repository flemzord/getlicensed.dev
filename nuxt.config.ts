// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: 'cloudflare-pages',
  },

  modules: [
    '@nuxthub/core',
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
  ],

  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 minute
    '/api/*': { cache: { maxAge: 60 } },
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
