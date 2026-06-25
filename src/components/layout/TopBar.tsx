import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { menuConfig, type MenuItem } from "@/config/menus"
import { currentUser } from "@/config/permissions"
import {
  Bell,
  LogOut,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { applyTheme, getStoredTheme } from "@/utils/theme"
import { useState } from "react"

/** 从菜单配置中递归查找当前路径对应的面包屑 */
function findBreadcrumbs(
  menus: MenuItem[],
  pathname: string,
  trail: MenuItem[] = []
): MenuItem[] | null {
  for (const item of menus) {
    const current = [...trail, item]
    if (item.path === pathname) return current
    if (item.children) {
      const found = findBreadcrumbs(item.children, pathname, current)
      if (found) return found
    }
  }
  return null
}

/**
 * 顶部导航栏
 * - 面包屑导航（自动从菜单配置生成）
 * - 搜索框
 * - 通知角标
 * - 用户头像下拉菜单
 */
export function TopBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const breadcrumbs = findBreadcrumbs(menuConfig, location.pathname) ?? []

  // 主题切换
  const [isDark, setIsDark] = useState(getStoredTheme() === "dark")
  function handleToggleTheme() {
    const next = isDark ? "light" : "dark"
    setIsDark(!isDark)
    applyTheme(next)
  }

  // 从 localStorage 读取用户信息，fallback 到静态配置
  const userName = (() => {
    try {
      const stored = localStorage.getItem("admin_profile")
      if (stored) {
        const p = JSON.parse(stored)
        if (p.name) return p.name
      }
    } catch {
      // ignore
    }
    return currentUser.name
  })()

  const handleLogout = () => {
    // 清除所有 token（localStorage + sessionStorage）
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_remember")
    sessionStorage.removeItem("admin_token")
    // 跳转回登录页
    navigate("/login", { replace: true })
  }

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      {/* 左侧：面包屑 */}
      <nav className="flex items-center gap-1.5 text-sm">
        {breadcrumbs.map((item, index) => (
          <span key={item.id} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className="text-muted-foreground">/</span>
            )}
            {item.path && index < breadcrumbs.length - 1 ? (
              <Link
                to={item.path}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* 右侧：操作区 */}
      <div className="flex items-center gap-2">
        {/* 搜索 */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="搜索..."
            className="h-8 w-48 pl-8 text-sm"
          />
        </div>

        {/* 通知 */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            3
          </span>
        </Button>

        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={handleToggleTheme}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* 用户头像下拉 */}
        <DropdownMenu>
          <DropdownMenuTrigger
            render={(props) => (
              <Button {...props} variant="ghost" className="h-8 gap-2 px-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    {currentUser.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium sm:inline">
                  {userName}
                </span>
              </Button>
            )}
          />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {currentUser.email}
                  </span>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              个人中心
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              系统设置
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
