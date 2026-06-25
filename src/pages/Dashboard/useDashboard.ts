import {
  DollarSign,
  Users,
  ShoppingCart,
  TrendingUp,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ── 类型定义 ──

export interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: LucideIcon
  description: string
}

export interface ChartDataPoint {
  month: string
  revenue: number
  orders: number
}

export interface OrderItem {
  id: string
  customer: string
  product: string
  amount: string
  status: "completed" | "processing" | "shipped" | "cancelled"
  date: string
}

export interface TodoItem {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  dueDate: string
  done: boolean
}

// ── 状态映射 ──

export const orderStatusMap: Record<
  OrderItem["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  completed: { label: "已完成", variant: "default" },
  processing: { label: "处理中", variant: "secondary" },
  shipped: { label: "已发货", variant: "outline" },
  cancelled: { label: "已取消", variant: "destructive" },
}

export const todoPriorityMap = {
  high: { label: "紧急", variant: "destructive" as const },
  medium: { label: "普通", variant: "secondary" as const },
  low: { label: "低", variant: "outline" as const },
}

// ── Mock 数据 ──

const stats: StatItem[] = [
  { title: "今日营收", value: "¥12,580", change: "+12.5%", trend: "up", icon: DollarSign, description: "较昨日" },
  { title: "新增用户", value: "+284", change: "+8.2%", trend: "up", icon: Users, description: "较上周同期" },
  { title: "订单总数", value: "1,024", change: "+3.1%", trend: "up", icon: ShoppingCart, description: "较昨日" },
  { title: "转化率", value: "12.5%", change: "-0.4%", trend: "down", icon: TrendingUp, description: "较上周" },
]

const chartData: ChartDataPoint[] = [
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

const orders: OrderItem[] = [
  { id: "ORD-2024-001", customer: "李明", product: "企业协作平台年度订阅", amount: "¥12,800", status: "completed", date: "2024-06-20" },
  { id: "ORD-2024-002", customer: "王芳", product: "数据分析工具专业版", amount: "¥6,400", status: "processing", date: "2024-06-19" },
  { id: "ORD-2024-003", customer: "张伟", product: "API 网关企业授权", amount: "¥25,600", status: "shipped", date: "2024-06-18" },
  { id: "ORD-2024-004", customer: "刘洋", product: "云存储扩容包 500GB", amount: "¥3,200", status: "completed", date: "2024-06-17" },
  { id: "ORD-2024-005", customer: "陈静", product: "安全审计服务季度订阅", amount: "¥8,900", status: "cancelled", date: "2024-06-16" },
]

const todos: TodoItem[] = [
  { id: "1", title: "审核新用户注册申请 (12 件)", priority: "high", dueDate: "今天", done: false },
  { id: "2", title: "处理退款请求 #ORD-2024-003", priority: "high", dueDate: "今天", done: false },
  { id: "3", title: "更新产品定价策略文档", priority: "medium", dueDate: "明天", done: false },
  { id: "4", title: "准备月度数据报告", priority: "medium", dueDate: "本周五", done: false },
  { id: "5", title: "完成安全审计配置", priority: "low", dueDate: "下周一", done: true },
]

/**
 * 仪表盘逻辑 hook
 * - 集中管理所有 mock 数据
 * - TODO: 替换为真实 API 调用
 */
export function useDashboard() {
  return {
    stats,
    chartData,
    orders,
    todos,
    pendingTodoCount: todos.filter((t) => !t.done).length,
  }
}
