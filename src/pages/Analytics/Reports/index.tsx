import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { exportToExcel, type ExportColumn } from "@/utils/export"

interface ReportRecord {
  id: string
  name: string
  type: string
  date: string
  size: string
}

const reports: ReportRecord[] = [
  { id: "1", name: "2024年6月营收报表", type: "Excel", date: "2024-06-20", size: "2.4 MB" },
  { id: "2", name: "2024年Q2用户增长报告", type: "PDF", date: "2024-06-15", size: "1.8 MB" },
  { id: "3", name: "2024年5月订单明细", type: "CSV", date: "2024-05-31", size: "5.2 MB" },
]

const exportColumns: ExportColumn<ReportRecord>[] = [
  { header: "报表名称", key: "name", width: 28 },
  { header: "类型", key: "type", width: 8 },
  { header: "大小", key: "size", width: 10 },
  { header: "生成日期", key: "date", width: 14 },
]

export function ReportsPage() {
  function handleDownload(report: ReportRecord) {
    exportToExcel({
      fileName: report.name,
      columns: exportColumns,
      data: [report],
      sheetName: "报表信息",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">报表导出</h1>
          <p className="text-muted-foreground">下载和管理数据报表</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((report) => (
          <Card key={report.id} className="transition-colors hover:bg-muted/50">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{report.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.type} · {report.size} · {report.date}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(report)}
              >
                <Download className="mr-2 h-4 w-4" />
                下载
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
