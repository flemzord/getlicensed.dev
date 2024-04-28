<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

useSeoMeta({
  title: 'Login',
});
</script>

<template>
  <div
    class="rounded-xl divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow max-w-sm w-full bg-white/75 dark:bg-white/5 backdrop-blur"
  >
    <div class="px-4 py-5 sm:p-6">
      <div class="w-full max-w-sm space-y-6">
        <div class="text-center">
          <div class="mb-2 pointer-events-none">
            <span
              class="i-heroicons-lock-closed w-8 h-8 flex-shrink-0 text-gray-900 dark:text-white"
            />
          </div>
          <p class="text-2xl text-gray-900 dark:text-white font-bold">
            Welcome
          </p>
        </div>
        <div class="gap-y-6 flex flex-col flex-col-reverse">
          <div class="space-y-3">
            <a href="/api/auth/github">
              <button
                type="button"
                class="focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 font-medium rounded-full text-sm gap-x-2 px-3 py-2 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 w-full flex justify-center items-center"
              >
                <span
                  class="i-simple-icons-github flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span class="">Continue with GitHub</span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
