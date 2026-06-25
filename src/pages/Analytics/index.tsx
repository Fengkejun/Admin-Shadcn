import { useState } from "react"
import { TrendingUp, TrendingDown, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ExportDialog } from "@/components/ExportDialog"
import { exportToExcel, type ExportColumn } from "@/utils/export"
import { useAnalytics, type MetricItem } from "./useAnalytics"

/** 导出列配置 */
const exportColumns: ExportColumn<MetricItem>[] = [
  { header: "指标", key: "label", width: 18 },
  { header: "数值", key: "value", width: 14 },
  { header: "变化", key: "change", width: 10 },
  {
    header: "趋势",
    key: "trend",
    width: 8,
    format: (val) => (val === "up" ? "上升" : "下降"),
  },
]

export function AnalyticsPage() {
  const { metrics } = useAnalytics()
  const [exportOpen, setExportOpen] = useState(false)

  function handleExport(fileName: string) {
    exportToExcel({
      fileName,
      columns: exportColumns,
      data: metrics,
      sheetName: "数据总览",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">数据总览</h1>
          <p className="text-muted-foreground">平台核心数据分析</p>
        </div>
        <Button variant="outline" onClick={() => setExportOpen(true)}>
          <Download className="mr-2 h-4 w-4" />
          导出报表
        </Button>
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
                  m.trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
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

      {/* 导出弹窗 */}
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        onConfirm={handleExport}
        defaultFileName="数据总览报表"
        description="数据报表"
        rowCount={metrics.length}
      />
    </div>
  )
}
