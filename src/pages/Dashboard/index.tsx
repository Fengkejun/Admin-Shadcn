import { StatCard } from "./StatCard"
import { RevenueChart } from "./RevenueChart"
import { RecentOrders } from "./RecentOrders"
import { TodoList } from "./TodoList"
import { useDashboard } from "./useDashboard"

/**
 * 仪表盘首页 — 纯 UI 组合层
 * 数据与逻辑由 useDashboard hook 提供
 */
export function DashboardPage() {
  const { stats, chartData, orders, todos, pendingTodoCount } = useDashboard()

  return (
    <div className="space-y-6">
      {/* 欢迎区 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">仪表盘</h1>
        <p className="text-muted-foreground">欢迎回来，这是您的业务概览</p>
      </div>

      {/* KPI 指标卡片 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* 图表区 */}
      <RevenueChart data={chartData} />

      {/* 底部：订单 + 待办 */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecentOrders data={orders} />
        </div>
        <div className="lg:col-span-2">
          <TodoList data={todos} pendingCount={pendingTodoCount} />
        </div>
      </div>
    </div>
  )
}
