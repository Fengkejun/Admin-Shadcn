import { useState } from "react"

export interface SettingItem {
  key: string
  label: string
  description: string
  value: boolean
}

const defaultSettings: SettingItem[] = [
  { key: "email_notify", label: "邮件通知", description: "接收订单和系统通知邮件", value: true },
  { key: "sms_notify", label: "短信通知", description: "接收重要事件短信提醒", value: false },
  { key: "dark_mode", label: "深色模式", description: "使用深色主题界面", value: false },
  { key: "two_factor", label: "两步验证", description: "登录时启用二次验证", value: true },
]

export function useSettings() {
  const [settings, setSettings] = useState(defaultSettings)

  const toggleSetting = (key: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: !s.value } : s))
    )
  }

  return { settings, toggleSetting }
}
