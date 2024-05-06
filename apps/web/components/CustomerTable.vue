<template>
  <div class="relative isolate">
    <div class="mx-auto max-w-7xl py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="mt-2 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    <a href="#" class="group inline-flex">
                      Name
                      <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Created At
                      <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" aria-hidden="true" />
                        </span>
                    </a>
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    <a href="#" class="group inline-flex">
                      Updated At
                      <span class="invisible ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                          <ChevronDownIcon class="invisible ml-2 h-5 w-5 flex-none rounded text-gray-400 group-hover:visible group-focus:visible" aria-hidden="true" />
                        </span>
                    </a>
                  </th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-0">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="token of customer" :key="token.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ token.name }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ token.createdAt }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ token.updatedAt }}</td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm sm:pr-0">
                      <UButton @click="deleteToken(token.id)" class="bg-red-600 hover:bg-red-500">
                        Delete
                      </UButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
const toast = useToast();

const { $client } = useNuxtApp();

const { data: customer } = await $client.customer.all.useQuery();

async function deleteToken(id) {
  await $client.customer.delete.mutate({ id });
  toast.add({ title: 'Customer deleted', timeout: 5000, color: 'red' });
  await refreshNuxtData();
}
</script>