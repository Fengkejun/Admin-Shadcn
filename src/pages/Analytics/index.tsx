import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAnalytics } from "./useAnalytics"

export function AnalyticsPage() {
  const { metrics } = useAnalytics()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">数据总览</h1>
        <p className="text-muted-foreground">平台核心数据分析</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {m.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{m.value}</div>
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-medium pt-1",
                  m.trend === "up" ? "text-emerald-600" : "text-red-600"
                )}
              >
                {m.trend === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {m.change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
