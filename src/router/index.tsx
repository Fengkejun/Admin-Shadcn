import { createBrowserRouter, Navigate } from "react-router-dom"
import { AppLayout } from "@/components/layout"
import { LoginPage } from "@/pages/Login"
import { DashboardPage } from "@/pages/Dashboard"
import { UsersPage } from "@/pages/Users"
import { RolesPage } from "@/pages/Users/Roles"
import { OrdersPage } from "@/pages/Orders"
import { RefundsPage } from "@/pages/Orders/Refunds"
import { ProductsPage } from "@/pages/Products"
import { InventoryPage } from "@/pages/Products/Inventory"
import { AnalyticsPage } from "@/pages/Analytics"
import { ReportsPage } from "@/pages/Analytics/Reports"
import { MessagesPage } from "@/pages/Messages"
import { SettingsPage } from "@/pages/Settings"
import { NotificationsPage } from "@/pages/Settings/Notifications"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "users/roles", element: <RolesPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "orders/refunds", element: <RefundsPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/inventory", element: <InventoryPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "analytics/reports", element: <ReportsPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "settings/notifications", element: <NotificationsPage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
])
