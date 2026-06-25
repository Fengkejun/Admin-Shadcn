import { useState, useMemo, useCallback } from "react"
import { toast } from "sonner"

export interface UserItem {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  createdAt: string
}

/** 新增/编辑表单的值 */
export interface UserFormValues {
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

const initialUsers: UserItem[] = [
  { id: "1", name: "李明", email: "liming@acme.com", role: "管理员", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "王芳", email: "wangfang@acme.com", role: "编辑", status: "active", createdAt: "2024-02-20" },
  { id: "3", name: "张伟", email: "zhangwei@acme.com", role: "访客", status: "inactive", createdAt: "2024-03-10" },
  { id: "4", name: "刘洋", email: "liuyang@acme.com", role: "编辑", status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "陈静", email: "chenjing@acme.com", role: "管理员", status: "active", createdAt: "2024-05-12" },
]

/** 角色选项 */
export const roleOptions = ["管理员", "编辑", "访客"]

/**
 * 用户管理逻辑 hook
 * - 搜索过滤
 * - 新增用户
 * - 编辑用户
 * - 删除用户
 */
export function useUsers() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers)
  const [search, setSearch] = useState("")

  // 搜索过滤
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.includes(search) ||
          u.email.includes(search) ||
          u.role.includes(search)
      ),
    [users, search]
  )

  // 新增用户
  const addUser = useCallback((values: UserFormValues) => {
    const newUser: UserItem = {
      id: String(Date.now()),
      ...values,
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers((prev) => [newUser, ...prev])
    toast.success("创建成功", { description: `用户 ${values.name} 已添加` })
  }, [])

  // 编辑用户
  const updateUser = useCallback((id: string, values: UserFormValues) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...values } : u))
    )
    toast.success("更新成功", { description: `用户 ${values.name} 信息已更新` })
  }, [])

  // 删除用户
  const deleteUser = useCallback((id: string) => {
    const user = users.find((u) => u.id === id)
    setUsers((prev) => prev.filter((u) => u.id !== id))
    toast.success("删除成功", { description: `用户 ${user?.name} 已删除` })
  }, [users])

  // 切换用户状态
  const toggleStatus = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    )
  }, [])

  return {
    users: filteredUsers,
    search,
    setSearch,
    addUser,
    updateUser,
    deleteUser,
    toggleStatus,
  }
}
