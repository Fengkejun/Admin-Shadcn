import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/pages/Login/index.vue"),
    },
    {
      path: "/",
      component: () => import("@/components/layout/AppLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        { path: "", redirect: "/dashboard" },
        { path: "dashboard", name: "Dashboard", component: () => import("@/pages/Dashboard/index.vue") },
        { path: "profile", name: "Profile", component: () => import("@/pages/Profile/index.vue") },
        { path: "users", name: "Users", component: () => import("@/pages/Users/index.vue") },
        { path: "users/roles", name: "Roles", component: () => import("@/pages/Users/Roles/index.vue") },
        { path: "orders", name: "Orders", component: () => import("@/pages/Orders/index.vue") },
        { path: "orders/refunds", name: "Refunds", component: () => import("@/pages/Orders/Refunds/index.vue") },
        { path: "products", name: "Products", component: () => import("@/pages/Products/index.vue") },
        { path: "products/inventory", name: "Inventory", component: () => import("@/pages/Products/Inventory/index.vue") },
        { path: "analytics", name: "Analytics", component: () => import("@/pages/Analytics/index.vue") },
        { path: "analytics/reports", name: "Reports", component: () => import("@/pages/Analytics/Reports/index.vue") },
        { path: "messages", name: "Messages", component: () => import("@/pages/Messages/index.vue") },
        { path: "settings", name: "Settings", component: () => import("@/pages/Settings/index.vue") },
        { path: "settings/notifications", name: "Notifications", component: () => import("@/pages/Settings/Notifications/index.vue") },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/login" },
  ],
})

// 路由守卫
router.beforeEach((to) => {
  const token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token")
  if (to.meta.requiresAuth && !token) {
    return { name: "Login" }
  }
  if (to.name === "Login" && token) {
    return { name: "Dashboard" }
  }
})

export default router
