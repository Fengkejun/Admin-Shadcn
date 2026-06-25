import { useState, useMemo } from "react"

export interface OrderItem {
  id: string
  customer: string
  amount: string
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  date: string
}

const statusMap: Record<OrderItem["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "待处理", variant: "secondary" },
  processing: { label: "处理中", variant: "secondary" },
  shipped: { label: "已发货", variant: "outline" },
  completed: { label: "已完成", variant: "default" },
  cancelled: { label: "已取消", variant: "destructive" },
}

const mockOrders: OrderItem[] = [
  { id: "ORD-001", customer: "李明", amount: "¥12,800", status: "completed", date: "2024-06-20" },
  { id: "ORD-002", customer: "王芳", amount: "¥6,400", status: "processing", date: "2024-06-19" },
  { id: "ORD-003", customer: "张伟", amount: "¥25,600", status: "shipped", date: "2024-06-18" },
  { id: "ORD-004", customer: "刘洋", amount: "¥3,200", status: "pending", date: "2024-06-17" },
  { id: "ORD-005", customer: "陈静", amount: "¥8,900", status: "cancelled", date: "2024-06-16" },
]

export function useOrders() {
  const [filter, setFilter] = useState<string>("all")

  const filteredOrders = useMemo(
    () =>
      filter === "all"
        ? mockOrders
        : mockOrders.filter((o) => o.status === filter),
    [filter]
  )

  return { orders: filteredOrders, filter, setFilter, statusMap }
}
