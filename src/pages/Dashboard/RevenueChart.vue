<script setup lang="ts">
import { computed } from "vue"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  Title, Tooltip, Legend, Filler,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const props = defineProps<{ data?: { month: string; revenue: number; orders: number }[] }>()

const chartData = computed(() => {
  const d = props.data ?? [
    { month: "1月", revenue: 4200, orders: 320 },
    { month: "2月", revenue: 5100, orders: 380 },
    { month: "3月", revenue: 4800, orders: 350 },
    { month: "4月", revenue: 6200, orders: 420 },
    { month: "5月", revenue: 5600, orders: 390 },
    { month: "6月", revenue: 7100, orders: 480 },
    { month: "7月", revenue: 6800, orders: 460 },
    { month: "8月", revenue: 8200, orders: 520 },
    { month: "9月", revenue: 7500, orders: 490 },
    { month: "10月", revenue: 9100, orders: 580 },
    { month: "11月", revenue: 8600, orders: 550 },
    { month: "12月", revenue: 10200, orders: 640 },
  ]
  return {
    labels: d.map((i) => i.month),
    datasets: [
      {
        label: "收入 (¥)",
        data: d.map((i) => i.revenue),
        borderColor: "oklch(0.205 0.02 285.823)",
        backgroundColor: "oklch(0.205 0.02 285.823 / 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
      {
        label: "订单数",
        data: d.map((i) => i.orders),
        borderColor: "oklch(0.6 0.118 184.704)",
        backgroundColor: "oklch(0.6 0.118 184.704 / 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top" as const },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
}
</script>

<template>
  <div class="rounded-xl border bg-card p-6 shadow-xs">
    <h2 class="text-base font-semibold">收入趋势</h2>
    <p class="text-sm text-muted-foreground mb-4">近 12 个月营收与订单数据</p>
    <div class="h-[300px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
