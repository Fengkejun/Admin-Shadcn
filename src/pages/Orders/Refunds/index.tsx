import { Badge } from "@/components/ui/badge"
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

const refunds = [
  { id: "RF-001", orderId: "ORD-003", amount: "¥25,600", reason: "商品质量问题", status: "pending" },
  { id: "RF-002", orderId: "ORD-005", amount: "¥8,900", reason: "用户主动取消", status: "approved" },
]

const statusMap: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "待审核", variant: "secondary" },
  approved: { label: "已通过", variant: "default" },
  rejected: { label: "已拒绝", variant: "destructive" },
}

export function RefundsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">退款管理</h1>
        <p className="text-muted-foreground">审核和处理退款请求</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>退款列表</CardTitle>
          <CardDescription>共 {refunds.length} 条退款请求</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>退款号</TableHead>
                <TableHead>原订单</TableHead>
                <TableHead className="text-right">金额</TableHead>
                <TableHead>原因</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {refunds.map((r) => {
                const status = statusMap[r.status]
                return (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-mono text-xs">{r.orderId}</TableCell>
                    <TableCell className="text-right font-medium">{r.amount}</TableCell>
                    <TableCell>{r.reason}</TableCell>
                    <TableCell>
                      <Badge variant={status.variant}>{status.label}</Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
