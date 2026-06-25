import { cn } from "@/lib/utils"
import { NavItem } from "./NavItem"
import type { MenuItem } from "@/config/menus"

interface NavMenuProps {
  items: MenuItem[]
  collapsed?: boolean
  expandedIds: Set<string>
  onToggle: (id: string) => void
  level?: number
}

/**
 * 递归菜单组件
 * - 支持无限层级嵌套
 * - level 控制缩进深度
 * - 展开/折叠带高度过渡动画
 */
export function NavMenu({
  items,
  collapsed = false,
  expandedIds,
  onToggle,
  level = 0,
}: NavMenuProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {items.map((item) => {
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedIds.has(item.id)

        return (
          <div key={item.id}>
            {/* 菜单项 */}
            <div
              style={{ paddingLeft: collapsed ? 0 : level * 12 }}
              className={cn(collapsed && "flex justify-center")}
            >
              <NavItem
                item={item}
                collapsed={collapsed}
                expanded={isExpanded}
                onToggle={hasChildren ? () => onToggle(item.id) : undefined}
              />
            </div>

            {/* 子菜单 — 带展开/折叠动画 */}
            {hasChildren && !collapsed && (
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200 ease-in-out",
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="ml-3 border-l border-sidebar-border pl-3 pt-0.5">
                  <NavMenu
                    items={item.children!}
                    collapsed={collapsed}
                    expandedIds={expandedIds}
                    onToggle={onToggle}
                    level={level + 1}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
