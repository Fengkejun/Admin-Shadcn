/**
 * 权限配置 — 模拟当前用户权限
 * 实际项目中从后端接口获取，存储在用户 store 中
 */

/** 当前用户拥有的权限码集合 */
export const currentUserPermissions = new Set([
  "user:read",
  "user:role:read",
  "order:read",
  "order:refund:read",
  "product:read",
  "product:inventory:read",
  "analytics:read",
  "analytics:report:read",
  "system:read",
  "system:notification:read",
])

/** 当前用户信息 */
export const currentUser = {
  name: "admin",
  email: "admin@acme.com",
  avatar: "", // 留空使用首字母头像
  role: "管理员",
}
