<script setup lang="ts">
import {CheckIcon} from "@heroicons/vue/20/solid";

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

</script>

<template>
  <div class="bg-white">
    <Header />

    <main class="isolate">
      <NuxtPage />
    </main>

    <Footer />
  </div>
</template>