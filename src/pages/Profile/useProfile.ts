import { useState, useCallback } from "react"
import { toast } from "sonner"

export interface UserProfile {
  name: string
  email: string
  phone: string
  role: string
  department: string
  bio: string
  avatar: string
}

const defaultProfile: UserProfile = {
  name: "admin",
  email: "admin@acme.com",
  phone: "13800138000",
  role: "管理员",
  department: "技术部",
  bio: "系统管理员，负责平台的日常运维和管理。",
  avatar: "",
}

/**
 * 个人信息逻辑 hook
 * - 读取/保存个人信息
 * - 模拟持久化（localStorage）
 */
export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem("admin_profile")
      return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile
    } catch {
      return defaultProfile
    }
  })

  const [isEditing, setIsEditing] = useState(false)

  const updateProfile = useCallback((values: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...values }
      try {
        localStorage.setItem("admin_profile", JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
    toast.success("保存成功", { description: "个人信息已更新" })
    setIsEditing(false)
  }, [])

  const updateAvatar = useCallback((avatarUrl: string) => {
    setProfile((prev) => {
      const next = { ...prev, avatar: avatarUrl }
      try {
        localStorage.setItem("admin_profile", JSON.stringify(next))
      } catch {
        // ignore
      }
      return next
    })
    toast.success("头像已更新")
  }, [])

  return {
    profile,
    isEditing,
    setIsEditing,
    updateProfile,
    updateAvatar,
  }
}
