<script setup lang="ts">
const props = defineProps(['licenseId']);

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface QueryResult {
  rows: Rows[];
  fields: Array<Array<string>>;
}

interface Rows {
  count: number;
  time: Date;
  action: string;
}

const { $client } = useNuxtApp();
const { data: licenses } = await $client.licenseUsage.getById.useQuery({
  id: props.licenseId,
});
const query: QueryResult = licenses.value;
const rows: Rows[] = query.rows;
console.log('rows', rows);
// MAP
const valueSuccess = rows
  .filter((item) => item.action === 'SUCCESS')
  .map((item) => item.count);
const valueExpired = rows
  .filter((item) => item.action === 'EXPIRED')
  .map((item) => item.count);

const labels = rows.map((x) => x.time);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        display: true,
        type: 'time',
        time: {
          parser: 'MM/DD/YYYY',
          tooltipFormat: 'll',
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            day: 'MM/DD/YYYY',
          },
        },
      },
    ],
  },
};
const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'SUCCESS',
      backgroundColor: '#209a2a',
      data: valueSuccess,
    },
    {
      label: 'EXPIRED',
      backgroundColor: '#c1123a',
      data: valueExpired,
    },
  ],
};
</script>

<template>
  <div class="relative isolate">
    <div class="mx-auto max-w-7xl py-10">
      <div class="px-4 sm:px-6 lg:px-8">
      <Line
          id="LineChart"
          :options="chartOptions"
          :data="chartData"
      />
      </div>
  </div>
  </div>
</template>