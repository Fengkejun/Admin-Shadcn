import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod"

/** localStorage / sessionStorage 键名 */
const TOKEN_KEY = "admin_token"
const REMEMBER_KEY = "admin_remember"

/** 登录表单校验规则 */
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "请输入邮箱地址")
    .email("请输入有效的邮箱地址"),
  password: z
    .string()
    .min(1, "请输入密码")
    .min(8, "密码至少需要 8 个字符")
    .regex(/[a-z]/, "密码需包含小写字母")
    .regex(/[A-Z]/, "密码需包含大写字母")
    .regex(/[0-9]/, "密码需包含数字"),
  remember: z.boolean(),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/**
 * 读取持久化的 token
 * - remember=true 时存 localStorage（持久）
 * - remember=false 时存 sessionStorage（会话级）
 */
export function getStoredToken(): string | null {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    sessionStorage.getItem(TOKEN_KEY)
  )
}

/**
 * 登录页逻辑 hook
 * - 表单状态管理（react-hook-form + zod）
 * - 密码可见性切换
 * - 记住我：控制 token 持久化策略
 * - 提交 loading 状态
 */
export function useLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: localStorage.getItem("admin_login_email") || "",
      password: localStorage.getItem("admin_login_password") || "",
      remember: localStorage.getItem(REMEMBER_KEY) === "true",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    // TODO: 对接真实登录接口
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)

    const token = "simulated_token_123"

    // 根据「记住我」选择存储方式并记住账号密码
    if (data.remember) {
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem(REMEMBER_KEY, "true")
      localStorage.setItem("admin_login_email", data.email)
      localStorage.setItem("admin_login_password", data.password)
    } else {
      sessionStorage.setItem(TOKEN_KEY, token)
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REMEMBER_KEY)
      localStorage.removeItem("admin_login_email")
      localStorage.removeItem("admin_login_password")
    }

    toast.success("欢迎回来")

    navigate("/")
  }

  return {
    form,
    showPassword,
    setShowPassword,
    isLoading,
    onSubmit,
  }
}
