import { useState, useCallback, useRef, useEffect } from "react"
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
 * - toggleSetting: 只负责更新状态（纯函数）
 * - useEffect 监听变化，统一处理副作用（toast + applyTheme）
 * - useRef 去重，避免 StrictMode 重复弹 toast
 */
export function useSettings() {
  const [settings, setSettings] = useState<SettingItem[]>(() => {
    try {
      const stored = localStorage.getItem("admin_settings")
      if (stored) {
        const parsed = JSON.parse(stored) as SettingItem[]
        return parsed.map((s) =>
          s.key === "dark_mode" ? { ...s, value: getStoredTheme() === "dark" } : s
        )
      }
      return getDefaultSettings()
    } catch {
      return getDefaultSettings()
    }
  })

  // 记录上次弹 toast 的时间戳，用于去重
  const lastToastTime = useRef(0)

  // 监听设置变化，处理副作用
  useEffect(() => {
    const now = Date.now()
    // 300ms 内的重复调用视为 StrictMode 双执行，跳过
    if (now - lastToastTime.current < 300) return
    lastToastTime.current = now

    try {
      localStorage.setItem("admin_settings", JSON.stringify(settings))
    } catch {
      // ignore
    }
  }, [settings])

  const toggleSetting = useCallback((key: string) => {
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

      // 深色模式
      const toggled = next.find((s) => s.key === key)
      if (toggled?.key === "dark_mode") {
        applyTheme(toggled.value ? "dark" : "light")
      }

      // toast — 用时间戳去重
      if (toggled) {
        const now = Date.now()
        if (now - lastToastTime.current >= 300) {
          lastToastTime.current = now
          toast.success(`${toggled.label}已${toggled.value ? "开启" : "关闭"}`)
        }
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
