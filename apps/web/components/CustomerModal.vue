<template>
  <div>
    <UButton @click="ticketsModalOpen = true"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Add customer
    </UButton>

    <UModal v-model="ticketsModalOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Create a new customer
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="ticketsModalOpen = false" />
          </div>
        </template>

        <template #default>
          <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup label="Name of Customer" name="name">
              <UInput v-model="state.name" />
            </UFormGroup>

            <UButton type="submit" class="bg-indigo-600 hover:bg-indigo-900">
              Submit
            </UButton>
          </UForm>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const toast = useToast();
const ticketsModalOpen = ref(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [ticketsModalOpen],
    handler: () => {
      ticketsModalOpen.value = false;
    },
  },
});

import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const schema = z.object({
  name: z.string().min(3, 'Must be at least 3 characters'),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { $client } = useNuxtApp();

  const add = await $client.customer.add.mutate(event.data);
  ticketsModalOpen.value = false;
  toast.add({
    title: 'Customer created',
  });
  await refreshNuxtData();
}
</script>