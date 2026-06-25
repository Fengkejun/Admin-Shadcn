import {
  ArrowRight,
  Command,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Navigate } from "react-router-dom"
import { GithubIcon, GoogleIcon } from "./icons"
import { useLogin, getStoredToken } from "./useLogin"

/**
 * 登录页 — 纯 UI 层
 * 所有逻辑（表单校验、提交、状态）由 useLogin hook 提供
 */
export function LoginPage() {
  const { form, showPassword, setShowPassword, isLoading, onSubmit } =
    useLogin()

  // 路由守卫：已登录则跳转首页
  if (getStoredToken()) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* 左侧 — 品牌预留区 */}
      <div className="relative hidden bg-zinc-900 lg:flex lg:items-center lg:justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-transparent" />

        {/* 居中 Logo 与动画效果 */}
        <div className="relative flex items-center justify-center">
          {/* 背景光晕，呼吸动画 */}
          <div className="absolute h-96 w-96 rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />

          {/* 循环旋转的图标组合 */}
          <div className="relative flex items-center justify-center">
            <Command
              className="absolute h-64 w-64 text-violet-500/20 animate-spin"
              style={{ animationDuration: '20s' }}
              strokeWidth={0.5}
            />
            <Command
              className="relative h-40 w-40 text-violet-400/60 animate-spin"
              style={{ animationDuration: '15s', animationDirection: 'reverse' }}
              strokeWidth={1}
            />
            <Lock className="absolute h-10 w-10 text-violet-300" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* 右侧 — 登录表单 */}
      <div className="flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[420px] space-y-8">
          {/* 移动端 Logo */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
              <Lock className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Acme SaaS
            </span>
          </div>

          {/* 标题 */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              欢迎回来
            </h1>
            <p className="text-muted-foreground">登录您的账户以继续使用</p>
          </div>

          {/* 社交登录 */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 w-full" type="button">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            <Button variant="outline" className="h-11 w-full" type="button">
              <GithubIcon className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </div>

          {/* 分隔线 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">
                或使用邮箱登录
              </span>
            </div>
          </div>

          {/* 表单 */}
          <Card className="border-0 shadow-none sm:border sm:shadow-sm">
            <CardHeader className="sr-only">
              <CardTitle>登录</CardTitle>
              <CardDescription>输入您的邮箱和密码</CardDescription>
            </CardHeader>
            <CardContent className="px-0 sm:px-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  {/* 邮箱 */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱地址</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="name@example.com"
                              type="email"
                              autoCapitalize="none"
                              autoComplete="email"
                              autoCorrect="off"
                              disabled={isLoading}
                              className="h-11 pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 密码 */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                          <FormLabel>密码</FormLabel>
                          <a
                            href="#"
                            className="text-xs font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                          >
                            忘记密码？
                          </a>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              placeholder="••••••••"
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password"
                              disabled={isLoading}
                              className="h-11 pl-10 pr-10"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 记住我 */}
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                          记住我的登录状态
                        </FormLabel>
                      </FormItem>
                    )}
                  />

                  {/* 提交 */}
                  <Button
                    type="submit"
                    className="h-11 w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登录中...
                      </>
                    ) : (
                      <>
                        登录
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* 演示提示 */}
          <div className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
            演示账号：输入任意邮箱格式（如 <span className="font-medium text-foreground">admin@acme.com</span>）和含大小写字母 + 数字的 8 位密码即可登录
          </div>

          {/* 注册链接 */}
          <p className="text-center text-sm text-muted-foreground">
            还没有账户？{" "}
            <a
              href="#"
              className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
            >
              立即注册
            </a>
          </p>

          {/* 条款 */}
          <p className="text-center text-xs text-muted-foreground/70">
            登录即表示您同意我们的{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-foreground"
            >
              服务条款
            </a>{" "}
            和{" "}
            <a
              href="#"
              className="underline underline-offset-4 hover:text-foreground"
            >
              隐私政策
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
