import { useEffect, useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartDataPoint } from "./useDashboard"

interface RevenueChartProps {
  data: ChartDataPoint[]
}

/**
 * 读取 CSS 变量的计算值
 * 用于 recharts 等不支持 CSS 变量的库
 */
function useCssVar(name: string): string {
  const [value, setValue] = useState(() => {
    try {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim()
    } catch {
      return ""
    }
  })

  useEffect(() => {
    // 监听 class 变化以同步主题切换
    const observer = new MutationObserver(() => {
      try {
        const v = getComputedStyle(document.documentElement)
          .getPropertyValue(name)
          .trim()
        setValue(v)
      } catch {
        // ignore
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [name])

  return value
}

/**
 * 收入趋势图
 * - 主题感知：颜色从 CSS 变量实时读取
 * - 切换深色模式时图表自动更新
 */
export function RevenueChart({ data }: RevenueChartProps) {
  const primary = useCssVar("--color-primary")
  const chart2 = useCssVar("--color-chart-2")
  const mutedFg = useCssVar("--color-muted-foreground")
  const border = useCssVar("--color-border")
  const card = useCssVar("--color-card")

  return (
    <Card>
      <CardHeader>
        <CardTitle>收入趋势</CardTitle>
        <CardDescription>近 12 个月营收与订单数据</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chart2} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chart2} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={border} />
              <XAxis
                dataKey="month"
                tick={{ fill: mutedFg, fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: border }}
              />
              <YAxis
                tick={{ fill: mutedFg, fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: border }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: card,
                  border: `1px solid ${border}`,
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: mutedFg,
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="收入 (¥)"
                stroke={primary}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="orders"
                name="订单数"
                stroke={chart2}
                fillOpacity={1}
                fill="url(#colorOrders)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
