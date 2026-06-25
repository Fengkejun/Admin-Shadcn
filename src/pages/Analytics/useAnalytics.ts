export interface MetricItem {
  label: string
  value: string
  change: string
  trend: "up" | "down"
}

const mockMetrics: MetricItem[] = [
  { label: "页面浏览量", value: "128,430", change: "+15.2%", trend: "up" },
  { label: "独立访客", value: "42,180", change: "+8.7%", trend: "up" },
  { label: "平均停留时长", value: "4m 32s", change: "-2.1%", trend: "down" },
  { label: "跳出率", value: "32.4%", change: "-1.5%", trend: "up" },
]

export function useAnalytics() {
  return { metrics: mockMetrics }
}
