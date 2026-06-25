import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

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
})

export type LoginFormValues = z.infer<typeof loginSchema>

/**
 * 登录页逻辑 hook
 * - 表单状态管理（react-hook-form + zod）
 * - 密码可见性切换
 * - 提交 loading 状态
 */
export function useLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(_data: LoginFormValues) {
    setIsLoading(true)
    // 模拟登录请求
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    
    // 模拟保存 token
    localStorage.setItem("admin_token", "simulated_token_123")

    toast.success("登录成功", {
      description: "欢迎回来，正在跳转至首页...",
    })

    // 跳转到首页
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
