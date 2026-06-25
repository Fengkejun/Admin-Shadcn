import { useCallback, useMemo } from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TooltipProvider } from "@/components/ui/tooltip"
import { NavMenu } from "./NavMenu"
import { menuConfig, type MenuItem } from "@/config/menus"
import { currentUserPermissions } from "@/config/permissions"

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
}

/**
 * 根据用户权限过滤菜单
 * - 无 permission 字段的菜单项始终显示
 * - 有 permission 字段的需要用户拥有对应权限
 * - 父菜单过滤后无子菜单则隐藏父菜单
 */
function filterMenus(menus: MenuItem[], permissions: Set<string>): MenuItem[] {
  return menus
    .filter(
      (item) => !item.permission || permissions.has(item.permission)
    )
    .map((item) =>
      item.children
        ? { ...item, children: filterMenus(item.children, permissions) }
        : item
    )
    .filter(
      (item) => !item.children || item.children.length > 0
    )
}

/**
 * 侧边栏组件
 * - 展开/折叠状态由父组件管理，支持 localStorage 持久化
 * - 菜单展开项由父组件管理，支持 localStorage 持久化
 * - 自动根据用户权限过滤菜单
 */
export function Sidebar({
  collapsed,
  onToggleCollapse,
  expandedIds,
  onToggleExpand,
}: SidebarProps) {
  // 权限过滤后的菜单数据
  const filteredMenus = useMemo(
    () => filterMenus(menuConfig, currentUserPermissions),
    []
  )

  const handleToggleExpand = useCallback(
    (id: string) => {
      onToggleExpand(id)
    },
    [onToggleExpand]
  )

  return (
    <TooltipProvider delay={0}>
      <aside
        className={cn(
          "relative flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
          collapsed ? "w-[60px]" : "w-[260px]"
        )}
      >
        {/* Logo 区域 */}
        <div
          className={cn(
            "flex h-14 items-center border-b px-4",
            collapsed ? "justify-center" : "gap-3"
          )}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            A
          </div>
          {!collapsed && (
            <span className="text-base font-semibold tracking-tight">
              Acme Admin
            </span>
          )}
        </div>

        {/* 菜单区域 */}
        <ScrollArea className="flex-1 px-3 py-3">
          <NavMenu
            items={filteredMenus}
            collapsed={collapsed}
            expandedIds={expandedIds}
            onToggle={handleToggleExpand}
          />
        </ScrollArea>

        {/* 折叠按钮 */}
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn("w-full", !collapsed && "justify-start gap-2")}
            onClick={onToggleCollapse}
          >
            <PanelLeft className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="text-sm">收起菜单</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
