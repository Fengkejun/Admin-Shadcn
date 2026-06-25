import { useState, useCallback, useEffect } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { TopBar } from "./TopBar"

/** localStorage 键名 */
const STORAGE_KEY_SIDEBAR = "admin-sidebar-collapsed"
const STORAGE_KEY_EXPANDED = "admin-sidebar-expanded-ids"

/** 从 localStorage 读取初始状态 */
function loadCollapsed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_SIDEBAR) === "true"
  } catch {
    return false
  }
}

function loadExpandedIds(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_EXPANDED)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

/**
 * 应用主布局
 * - 左侧可折叠侧边栏
 * - 顶部导航栏（面包屑 + 用户操作）
 * - 内容区域（路由出口）
 * - 侧边栏展开/折叠和菜单展开项均持久化到 localStorage
 */
export function AppLayout() {
  const [collapsed, setCollapsed] = useState(loadCollapsed)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(loadExpandedIds)

  // 持久化侧边栏折叠状态
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SIDEBAR, String(collapsed))
    } catch {
      // ignore
    }
  }, [collapsed])

  // 持久化菜单展开项
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_EXPANDED,
        JSON.stringify([...expandedIds])
      )
    } catch {
      // ignore
    }
  }, [expandedIds])

  const handleToggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev)
  }, [])

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // 路由守卫放在最后 — hooks 必须在条件判断之前全部调用
  const token =
    localStorage.getItem("admin_token") ||
    sessionStorage.getItem("admin_token")
  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        expandedIds={expandedIds}
        onToggleExpand={handleToggleExpand}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
