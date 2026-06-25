import { useState } from "react"
import { Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ExportDialog } from "@/components/ExportDialog"
import { exportToExcel, type ExportColumn } from "@/utils/export"
import { useOrders, type OrderItem } from "./useOrders"

/** 导出列配置 */
const exportColumns: ExportColumn<OrderItem>[] = [
  { header: "订单号", key: "id", width: 15 },
  { header: "客户", key: "customer", width: 12 },
  { header: "金额", key: "amount", width: 12 },
  {
    header: "状态",
    key: "status",
    width: 10,
    format: (val) => {
      const map: Record<string, string> = {
        pending: "待处理",
        processing: "处理中",
        shipped: "已发货",
        completed: "已完成",
        cancelled: "已取消",
      }
      return map[val as string] ?? (val as string)
    },
  },
  { header: "日期", key: "date", width: 14 },
]

export function OrdersPage() {
  const { orders, statusMap } = useOrders()
  const [exportOpen, setExportOpen] = useState(false)

  function handleExport(fileName: string) {
    exportToExcel({
      fileName,
      columns: exportColumns,
      data: orders,
      sheetName: "订单列表",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">订单管理</h1>
          <p className="text-muted-foreground">查看和管理所有订单</p>
        </div>
        <Button onClick={() => setExportOpen(true)}>
          <Download className="mr-2 h-4 w-4" />
          导出订单
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>订单列表</CardTitle>
          <CardDescription>共 {orders.length} 条订单</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>订单号</TableHead>
                <TableHead>客户</TableHead>
                <TableHead className="text-right">金额</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>日期</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const status = statusMap[order.status]
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-xs">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customer}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {order.date}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 导出弹窗 */}
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        onConfirm={handleExport}
        defaultFileName="订单列表"
        description="订单数据"
        rowCount={orders.length}
      />
    </div>
  )
}
