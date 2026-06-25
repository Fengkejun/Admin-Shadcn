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
import { orderStatusMap, type OrderItem } from "./useDashboard"

interface RecentOrdersProps {
  data: OrderItem[]
}

/**
 * 最近订单表格 — 纯 UI 展示
 * - 数据由父组件通过 props 传入
 * - 状态标签颜色区分
 */
export function RecentOrders({ data }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>最近订单</CardTitle>
        <CardDescription>最近 5 笔交易记录</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单号</TableHead>
              <TableHead>客户</TableHead>
              <TableHead className="hidden sm:table-cell">商品</TableHead>
              <TableHead className="text-right">金额</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => {
              const status = orderStatusMap[order.status]
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell className="hidden max-w-[200px] truncate sm:table-cell">
                    {order.product}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {order.amount}
                  </TableCell>
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
  )
}
