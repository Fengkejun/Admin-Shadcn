import { useState, useCallback } from "react"
import { toast } from "sonner"
import { applyTheme, getStoredTheme } from "@/utils/theme"

export interface SettingItem {
  key: string
  label: string
  description: string
  value: boolean
}

function getDefaultSettings(): SettingItem[] {
  const isDark = getStoredTheme() === "dark"
  return [
    { key: "email_notify", label: "邮件通知", description: "接收订单和系统通知邮件", value: true },
    { key: "sms_notify", label: "短信通知", description: "接收重要事件短信提醒", value: false },
    { key: "push_notify", label: "浏览器推送", description: "接收浏览器实时推送通知", value: true },
    { key: "dark_mode", label: "深色模式", description: "使用深色主题界面", value: isDark },
    { key: "two_factor", label: "两步验证", description: "登录时启用二次验证", value: true },
    { key: "login_alert", label: "登录提醒", description: "新设备登录时发送提醒", value: true },
  ]
}

/**
 * 系统设置逻辑 hook
 * - 开关设置项切换
 * - 持久化到 localStorage
 * - 深色模式联动 applyTheme 切换整个页面主题
 */
export function useSettings() {
  const [settings, setSettings] = useState<SettingItem[]>(() => {
    try {
      const stored = localStorage.getItem("admin_settings")
      if (stored) {
        const parsed = JSON.parse(stored) as SettingItem[]
        // 同步 dark_mode 与实际主题
        return parsed.map((s) =>
          s.key === "dark_mode" ? { ...s, value: getStoredTheme() === "dark" } : s
        )
      }
      return getDefaultSettings()
    } catch {
      return getDefaultSettings()
    }
  })

  const toggleSetting = useCallback((key: string) => {
    // 先计算新值，再更新状态和执行副作用
    setSettings((prev) => {
      const next = prev.map((s) =>
        s.key === key ? { ...s, value: !s.value } : s
      )

      // 持久化
      try {
        localStorage.setItem("admin_settings", JSON.stringify(next))
      } catch {
        // ignore
      }

      // 深色模式：切换整个页面主题
      const toggled = next.find((s) => s.key === key)
      if (toggled) {
        if (toggled.key === "dark_mode") {
          applyTheme(toggled.value ? "dark" : "light")
        }
        // toast 使用 setTimeout 避免 StrictMode 双重执行
        setTimeout(() => {
          toast.success(`${toggled.label}已${toggled.value ? "开启" : "关闭"}`)
        }, 0)
      }

      return next
    })
  }, [])

  const resetSettings = useCallback(() => {
    const defaults = getDefaultSettings()
    setSettings(defaults)
    try {
      localStorage.setItem("admin_settings", JSON.stringify(defaults))
    } catch {
      // ignore
    }
    applyTheme("light")
    toast.success("已恢复默认设置")
  }, [])

  return { settings, toggleSetting, resetSettings }
}
