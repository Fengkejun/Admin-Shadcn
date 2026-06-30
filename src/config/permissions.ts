export const currentUserPermissions = new Set([
  "user:read", "user:role:read", "order:read", "order:refund:read",
  "product:read", "product:inventory:read", "analytics:read",
  "analytics:report:read", "system:read", "system:notification:read",
])

export const currentUser = {
  name: "admin",
  email: "admin@acme.com",
  avatar: "",
  role: "管理员",
}
