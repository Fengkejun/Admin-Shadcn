import { useState, useMemo } from "react"

export interface UserItem {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
  createdAt: string
}

const mockUsers: UserItem[] = [
  { id: "1", name: "李明", email: "liming@acme.com", role: "管理员", status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "王芳", email: "wangfang@acme.com", role: "编辑", status: "active", createdAt: "2024-02-20" },
  { id: "3", name: "张伟", email: "zhangwei@acme.com", role: "访客", status: "inactive", createdAt: "2024-03-10" },
  { id: "4", name: "刘洋", email: "liuyang@acme.com", role: "编辑", status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "陈静", email: "chenjing@acme.com", role: "管理员", status: "active", createdAt: "2024-05-12" },
]

export function useUsers() {
  const [search, setSearch] = useState("")

  const filteredUsers = useMemo(
    () =>
      mockUsers.filter(
        (u) =>
          u.name.includes(search) || u.email.includes(search)
      ),
    [search]
  )

  return { users: filteredUsers, search, setSearch }
}
