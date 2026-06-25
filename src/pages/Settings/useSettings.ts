import { useState, useCallback } from "react"
import { toast } from "sonner"

export interface SettingItem {
  key: string
  label: string
  description: string
  value: boolean
}

const defaultSettings: SettingItem[] = [
  { key: "email_notify", label: "邮件通知", description: "接收订单和系统通知邮件", value: true },
  { key: "sms_notify", label: "短信通知", description: "接收重要事件短信提醒", value: false },
  { key: "push_notify", label: "浏览器推送", description: "接收浏览器实时推送通知", value: true },
  { key: "dark_mode", label: "深色模式", description: "使用深色主题界面", value: false },
  { key: "two_factor", label: "两步验证", description: "登录时启用二次验证", value: true },
  { key: "login_alert", label: "登录提醒", description: "新设备登录时发送提醒", value: true },
]

/**
 * 系统设置逻辑 hook
 * - 开关设置项切换
 * - 持久化到 localStorage
 */
export function useSettings() {
  const [settings, setSettings] = useState<SettingItem[]>(() => {
    try {
      const stored = localStorage.getItem("admin_settings")
      return stored ? JSON.parse(stored) : defaultSettings
    } catch {
      return defaultSettings
    }
  })

  const toggleSetting = useCallback((key: string) => {
    setSettings((prev) => {
      const next = prev.map((s) => (s.key === key ? { ...s, value: !s.value } : s))
      try {
        localStorage.setItem("admin_settings", JSON.stringify(next))
      } catch {
        // ignore
      }
      const item = next.find((s) => s.key === key)
      if (item) {
        toast.success(`${item.label}已${item.value ? "开启" : "关闭"}`)
      }
      return next
    })
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
    try {
      localStorage.setItem("admin_settings", JSON.stringify(defaultSettings))
    } catch {
      // ignore
    }
    toast.success("已恢复默认设置")
  }, [])

  return { settings, toggleSetting, resetSettings }
}
