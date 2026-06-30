import type { Component } from "vue"
import {
  LayoutDashboard, Users, ShoppingCart, BarChart3, Settings,
  FileText, Package, Bell, Shield, Palette, Database,
  UserCircle, CreditCard, TrendingUp, Inbox,
} from "lucide-vue-next"

export interface MenuItem {
  id: string
  label: string
  path?: string
  icon?: Component
  permission?: string
  badge?: string | number
  children?: MenuItem[]
  visible?: boolean
}

export const menuConfig: MenuItem[] = [
  { id: "dashboard", label: "仪表盘", icon: LayoutDashboard, path: "/dashboard" },
  {
    id: "users", label: "用户管理", icon: Users, permission: "user:read",
    children: [
      { id: "users-list", label: "用户列表", icon: UserCircle, path: "/users", permission: "user:read" },
      { id: "users-roles", label: "角色管理", icon: Shield, path: "/users/roles", permission: "user:role:read" },
    ],
  },
  {
    id: "orders", label: "订单管理", icon: ShoppingCart, permission: "order:read",
    children: [
      { id: "orders-list", label: "订单列表", icon: FileText, path: "/orders", permission: "order:read" },
      { id: "orders-refunds", label: "退款管理", icon: CreditCard, path: "/orders/refunds", permission: "order:refund:read" },
    ],
  },
  {
    id: "products", label: "商品管理", icon: Package, permission: "product:read",
    children: [
      { id: "products-list", label: "商品列表", icon: Package, path: "/products", permission: "product:read" },
      { id: "products-inventory", label: "库存管理", icon: Database, path: "/products/inventory", permission: "product:inventory:read" },
    ],
  },
  {
    id: "analytics", label: "数据分析", icon: BarChart3, permission: "analytics:read",
    children: [
      { id: "analytics-overview", label: "数据总览", icon: TrendingUp, path: "/analytics", permission: "analytics:read" },
      { id: "analytics-reports", label: "报表导出", icon: FileText, path: "/analytics/reports", permission: "analytics:report:read" },
    ],
  },
  { id: "messages", label: "消息中心", icon: Bell, path: "/messages", badge: 3 },
  {
    id: "settings", label: "系统设置", icon: Settings, permission: "system:read",
    children: [
      { id: "settings-basic", label: "基础设置", icon: Palette, path: "/settings", permission: "system:read" },
      { id: "settings-notifications", label: "通知设置", icon: Inbox, path: "/settings/notifications", permission: "system:notification:read" },
    ],
  },
]
