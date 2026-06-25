import { Link, useLocation } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { MenuItem } from "@/config/menus"

interface NavItemProps {
  item: MenuItem
  collapsed?: boolean
  expanded?: boolean
  onToggle?: () => void
}

/**
 * 单个菜单项组件
 * - 叶子节点：渲染为 Link，点击跳转路由
 * - 父节点：渲染为 button，点击展开/折叠子菜单
 * - 折叠态：通过 Tooltip 显示菜单名称
 */
export function NavItem({
  item,
  collapsed = false,
  expanded = false,
  onToggle,
}: NavItemProps) {
  const location = useLocation()
  const isActive = item.path
    ? location.pathname === item.path ||
      (item.path !== "/dashboard" && location.pathname.startsWith(item.path))
    : false
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-primary font-semibold",
        collapsed && "justify-center px-2"
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0",
            isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
          )}
        />
      )}
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.badge !== undefined && (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className="ml-auto h-5 min-w-5 px-1.5 text-xs"
            >
              {item.badge}
            </Badge>
          )}
          {hasChildren && (
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-sidebar-foreground/40 transition-transform duration-200",
                expanded && "rotate-90"
              )}
            />
          )}
        </>
      )}
    </div>
  )

  // 折叠态：Tooltip 提示
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger
          render={
            hasChildren
              ? (props) => (
                  <button {...props} onClick={onToggle} className="w-full">
                    {content}
                  </button>
                )
              : item.path
                ? (props) => (
                    <Link {...props} to={item.path!}>
                      {content}
                    </Link>
                  )
                : undefined
          }
        >
          {content}
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    )
  }

  // 展开态
  if (hasChildren) {
    return (
      <button onClick={onToggle} className="w-full">
        {content}
      </button>
    )
  }

  return item.path ? <Link to={item.path}>{content}</Link> : <div>{content}</div>
}
