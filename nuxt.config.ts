// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    preset: "cloudflare-pages"
  },

  modules: [
    "nitro-cloudflare-dev",
    "nuxt-auth-utils",
    "@nuxt/ui",
    "@nuxtjs/tailwindcss"
  ],

  routeRules: {
    // Generated at build time for SEO purpose
    '/': { prerender: true },
    // Cached for 1 minute
    '/api/*': { cache: { maxAge: 60 }},
  },

  tailwindcss: {
    plugins: [
      'tailwindcss/plugin-forms'
    ]
  }
})