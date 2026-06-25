import { RotateCcw, Shield, Bell, Palette, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSettings } from "./useSettings"

/**
 * 系统设置页面
 * - 通知设置
 * - 安全设置
 * - 界面设置
 * - 恢复默认
 */
export function SettingsPage() {
  const { settings, toggleSetting, resetSettings } = useSettings()

  // 按分类分组
  const notificationSettings = settings.filter((s) =>
    ["email_notify", "sms_notify", "push_notify"].includes(s.key)
  )
  const securitySettings = settings.filter((s) =>
    ["two_factor", "login_alert"].includes(s.key)
  )
  const appearanceSettings = settings.filter((s) =>
    ["dark_mode"].includes(s.key)
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">系统设置</h1>
          <p className="text-muted-foreground">管理系统偏好和安全配置</p>
        </div>
        <Button variant="outline" onClick={resetSettings}>
          <RotateCcw className="mr-2 h-4 w-4" />
          恢复默认
        </Button>
      </div>

      {/* 通知设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>通知设置</CardTitle>
              <CardDescription>管理消息通知渠道</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {notificationSettings.map((s) => (
            <ToggleRow key={s.key} item={s} onToggle={toggleSetting} />
          ))}
        </CardContent>
      </Card>

      {/* 安全设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>安全设置</CardTitle>
              <CardDescription>账户安全和登录保护</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {securitySettings.map((s) => (
            <ToggleRow key={s.key} item={s} onToggle={toggleSetting} />
          ))}
        </CardContent>
      </Card>

      {/* 外观设置 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>外观设置</CardTitle>
              <CardDescription>界面主题和显示偏好</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {appearanceSettings.map((s) => (
            <ToggleRow key={s.key} item={s} onToggle={toggleSetting} />
          ))}
        </CardContent>
      </Card>

      {/* 账户信息 */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <div>
              <CardTitle>账户信息</CardTitle>
              <CardDescription>当前登录账户的基本信息</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoItem label="用户名" value="admin" />
            <InfoItem label="角色" value="管理员" />
            <InfoItem label="邮箱" value="admin@acme.com" />
            <InfoItem label="上次登录" value="2024-06-20 14:30" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/** 开关行组件 */
function ToggleRow({
  item,
  onToggle,
}: {
  item: { key: string; label: string; description: string; value: boolean }
  onToggle: (key: string) => void
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div>
        <p className="text-sm font-medium">{item.label}</p>
        <p className="text-xs text-muted-foreground">{item.description}</p>
      </div>
      <button
        onClick={() => onToggle(item.key)}
        className={`
          relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors
          ${item.value ? "bg-primary" : "bg-input"}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
            ${item.value ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  )
}

/** 信息项组件 */
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}
