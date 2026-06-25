import { useState, useMemo, useCallback } from "react"
import { toast } from "sonner"

export interface RoleItem {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: string
}

export interface RoleFormValues {
  name: string
  description: string
  permissions: string[]
}

/** 可选权限列表 */
export const permissionOptions = [
  { id: "user:read", label: "查看用户" },
  { id: "user:write", label: "编辑用户" },
  { id: "user:delete", label: "删除用户" },
  { id: "order:read", label: "查看订单" },
  { id: "order:write", label: "编辑订单" },
  { id: "order:refund:read", label: "查看退款" },
  { id: "product:read", label: "查看商品" },
  { id: "product:write", label: "编辑商品" },
  { id: "analytics:read", label: "查看数据" },
  { id: "analytics:report:read", label: "导出报表" },
  { id: "system:read", label: "查看设置" },
  { id: "system:write", label: "修改设置" },
]

const initialRoles: RoleItem[] = [
  {
    id: "1",
    name: "管理员",
    description: "拥有所有系统权限",
    permissions: permissionOptions.map((p) => p.id),
    userCount: 2,
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "编辑",
    description: "可编辑内容和商品",
    permissions: ["user:read", "order:read", "product:read", "product:write", "analytics:read"],
    userCount: 5,
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    name: "访客",
    description: "仅查看权限",
    permissions: ["user:read", "order:read", "product:read"],
    userCount: 12,
    createdAt: "2024-02-01",
  },
]

/**
 * 角色管理逻辑 hook
 * - 搜索过滤
 * - 新增 / 编辑 / 删除角色
 */
export function useRoles() {
  const [roles, setRoles] = useState<RoleItem[]>(initialRoles)
  const [search, setSearch] = useState("")

  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.includes(search) || r.description.includes(search)
      ),
    [roles, search]
  )

  const addRole = useCallback((values: RoleFormValues) => {
    const newRole: RoleItem = {
      id: String(Date.now()),
      ...values,
      userCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setRoles((prev) => [newRole, ...prev])
    toast.success("创建成功", { description: `角色 ${values.name} 已添加` })
  }, [])

  const updateRole = useCallback((id: string, values: RoleFormValues) => {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...values } : r))
    )
    toast.success("更新成功", { description: `角色 ${values.name} 已更新` })
  }, [])

  const deleteRole = useCallback((id: string) => {
    const role = roles.find((r) => r.id === id)
    if (role && role.userCount > 0) {
      toast.error("无法删除", { description: `角色 ${role.name} 下还有 ${role.userCount} 个用户` })
      return false
    }
    setRoles((prev) => prev.filter((r) => r.id !== id))
    toast.success("删除成功", { description: `角色 ${role?.name} 已删除` })
    return true
  }, [roles])

  return {
    roles: filteredRoles,
    search,
    setSearch,
    addRole,
    updateRole,
    deleteRole,
  }
}
