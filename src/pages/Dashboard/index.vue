<script setup lang="ts">
import { DollarSign, Users, ShoppingCart, TrendingUp, TrendingDown } from "lucide-vue-next"
import RevenueChart from "./RevenueChart.vue"

const stats = [
  { title: "今日营收", value: "¥12,580", change: "+12.5%", trend: "up" as const, icon: DollarSign, desc: "较昨日" },
  { title: "新增用户", value: "+284", change: "+8.2%", trend: "up" as const, icon: Users, desc: "较上周同期" },
  { title: "订单总数", value: "1,024", change: "+3.1%", trend: "up" as const, icon: ShoppingCart, desc: "较昨日" },
  { title: "转化率", value: "12.5%", change: "-0.4%", trend: "down" as const, icon: TrendingUp, desc: "较上周" },
]

const orders = [
  { id: "ORD-001", customer: "李明", amount: "¥12,800", status: "已完成", date: "2024-06-20" },
  { id: "ORD-002", customer: "王芳", amount: "¥6,400", status: "处理中", date: "2024-06-19" },
  { id: "ORD-003", customer: "张伟", amount: "¥25,600", status: "已发货", date: "2024-06-18" },
  { id: "ORD-004", customer: "刘洋", amount: "¥3,200", status: "待处理", date: "2024-06-17" },
  { id: "ORD-005", customer: "陈静", amount: "¥8,900", status: "已取消", date: "2024-06-16" },
]

const todos = [
  { id: "1", title: "审核新用户注册申请 (12 件)", priority: "紧急", due: "今天", done: false },
  { id: "2", title: "处理退款请求 #ORD-2024-003", priority: "紧急", due: "今天", done: false },
  { id: "3", title: "更新产品定价策略文档", priority: "普通", due: "明天", done: false },
  { id: "4", title: "准备月度数据报告", priority: "普通", due: "本周五", done: false },
  { id: "5", title: "完成安全审计配置", priority: "低", due: "下周一", done: true },
]

const statusClass: Record<string, string> = {
  "已完成": "bg-primary text-primary-foreground",
  "处理中": "bg-secondary text-secondary-foreground",
  "已发货": "border border-input text-foreground",
  "待处理": "bg-secondary text-secondary-foreground",
  "已取消": "bg-destructive/10 text-destructive",
}

const priorityClass: Record<string, string> = {
  "紧急": "bg-destructive/10 text-destructive",
  "普通": "bg-secondary text-secondary-foreground",
  "低": "border border-input text-foreground",
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight">仪表盘</h1>
      <p class="text-muted-foreground">欢迎回来，这是您的业务概览</p>
    </div>

    <!-- KPI 卡片 -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="s in stats" :key="s.title" class="rounded-xl border bg-card p-6 text-card-foreground shadow-xs">
        <div class="flex items-center justify-between pb-2">
          <span class="text-sm font-medium text-muted-foreground">{{ s.title }}</span>
          <component :is="s.icon" class="h-4 w-4 text-muted-foreground" />
        </div>
        <div class="text-2xl font-bold">{{ s.value }}</div>
        <div class="flex items-center gap-1 pt-1">
          <span class="flex items-center text-xs font-medium" :class="s.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
            <TrendingUp v-if="s.trend === 'up'" class="mr-1 h-3 w-3" />
            <TrendingDown v-else class="mr-1 h-3 w-3" />
            {{ s.change }}
          </span>
          <span class="text-xs text-muted-foreground">{{ s.desc }}</span>
        </div>
      </div>
    </div>

    <!-- 图表 -->
    <RevenueChart />

    <!-- 订单 + 待办 -->
    <div class="grid gap-6 lg:grid-cols-5">
      <!-- 订单 -->
      <div class="lg:col-span-3 rounded-xl border bg-card shadow-xs">
        <div class="p-6 pb-0">
          <h2 class="text-base font-semibold">最近订单</h2>
          <p class="text-sm text-muted-foreground">最近 5 笔交易记录</p>
        </div>
        <div class="p-6 overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b">
                <th class="h-10 px-2 text-left font-medium text-muted-foreground">订单号</th>
                <th class="h-10 px-2 text-left font-medium text-muted-foreground">客户</th>
                <th class="h-10 px-2 text-right font-medium text-muted-foreground">金额</th>
                <th class="h-10 px-2 text-left font-medium text-muted-foreground">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in orders" :key="o.id" class="border-b transition-colors hover:bg-muted/50">
                <td class="p-2 font-mono text-xs">{{ o.id }}</td>
                <td class="p-2 font-medium">{{ o.customer }}</td>
                <td class="p-2 text-right font-medium">{{ o.amount }}</td>
                <td class="p-2">
                  <span class="inline-flex h-5 items-center rounded-full px-2 text-xs font-medium" :class="statusClass[o.status]">
                    {{ o.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 待办 -->
      <div class="lg:col-span-2 rounded-xl border bg-card shadow-xs">
        <div class="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 class="text-base font-semibold">待办事项</h2>
            <p class="text-sm text-muted-foreground">您有 {{ todos.filter(t => !t.done).length }} 项待处理</p>
          </div>
          <button class="rounded-md border px-3 py-1.5 text-sm hover:bg-accent">查看全部</button>
        </div>
        <div class="p-6 space-y-3">
          <div v-for="t in todos" :key="t.id" class="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50" :class="t.done && 'opacity-60'">
            <div class="mt-0.5 h-4 w-4 shrink-0 rounded-full border-2" :class="t.done ? 'border-emerald-500 bg-emerald-500' : 'border-muted-foreground'" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium" :class="t.done && 'line-through text-muted-foreground'">{{ t.title }}</p>
              <div class="mt-1 flex items-center gap-2">
                <span class="inline-flex h-5 items-center rounded-full px-2 text-[10px] font-medium" :class="priorityClass[t.priority]">{{ t.priority }}</span>
                <span class="text-xs text-muted-foreground">{{ t.due }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
