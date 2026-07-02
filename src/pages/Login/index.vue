<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useForm } from "vee-validate"
import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2, Lock, Mail, ArrowRight } from "lucide-vue-next"
import { toast } from "@/utils/toast"

const router = useRouter()
const showPassword = ref(false)
const isLoading = ref(false)

const schema = toTypedSchema(z.object({
  email: z.string().min(1, "请输入邮箱地址").email("请输入有效的邮箱地址"),
  password: z.string().min(1, "请输入密码").min(8, "密码至少需要 8 个字符").regex(/[a-z]/, "密码需包含小写字母").regex(/[A-Z]/, "密码需包含大写字母").regex(/[0-9]/, "密码需包含数字"),
  remember: z.boolean(),
}))

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: { email: "", password: "", remember: false },
})
const [email] = defineField("email")
const [password] = defineField("password")
const [remember] = defineField("remember")

const onSubmit = handleSubmit(async (values: { email: string; password: string; remember: boolean }) => {
  isLoading.value = true
  await new Promise((r) => setTimeout(r, 1000))
  isLoading.value = false

  const token = "simulated_token_123"
  if (values.remember) {
    localStorage.setItem("admin_token", token)
    localStorage.setItem("admin_remember", "true")
  } else {
    sessionStorage.setItem("admin_token", token)
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_remember")
  }

  toast.success("欢迎回来")
  router.push("/")
})
</script>

<template>
  <div class="relative min-h-screen lg:grid lg:grid-cols-2">
    <!-- 左侧品牌区 -->
    <div class="relative hidden bg-zinc-900 lg:flex lg:items-center lg:justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-zinc-900 to-zinc-950" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-500/30 via-transparent to-transparent" />
      <div class="relative flex items-center justify-center">
        <div class="absolute h-96 w-96 rounded-full bg-violet-600/20 blur-[100px] animate-pulse" />
        <div class="relative flex items-center justify-center">
          <Lock class="h-24 w-24 text-violet-400/60" />
        </div>
      </div>
    </div>

    <!-- 右侧表单 -->
    <div class="flex items-center justify-center p-6 sm:p-8 lg:p-12">
      <div class="w-full max-w-[420px] space-y-8">
        <div class="flex items-center gap-3 lg:hidden">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
            <Lock class="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <span class="text-lg font-semibold tracking-tight">Acme SaaS</span>
        </div>

        <div class="space-y-2">
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">欢迎回来</h1>
          <p class="text-muted-foreground">登录您的账户以继续使用</p>
        </div>

        <!-- 社交登录 -->
        <div class="grid grid-cols-2 gap-3">
          <button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground" type="button">
            <svg class="h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button class="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-input bg-background text-sm font-medium hover:bg-accent hover:text-accent-foreground" type="button">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </button>
        </div>

        <div class="relative">
          <div class="absolute inset-0 flex items-center"><span class="w-full border-t" /></div>
          <div class="relative flex justify-center text-xs uppercase"><span class="bg-background px-3 text-muted-foreground">或使用邮箱登录</span></div>
        </div>

        <!-- 表单 -->
        <div class="rounded-xl border bg-card p-6 shadow-sm">
          <form @submit.prevent="onSubmit" class="space-y-5">
            <!-- 邮箱 -->
            <div class="space-y-2">
              <label class="text-sm font-medium leading-none">邮箱地址</label>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input v-model="email" placeholder="name@example.com" type="email" class="flex h-11 w-full rounded-md border border-input bg-transparent pl-10 pr-3 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" :class="errors.email && 'border-destructive'" />
              </div>
              <p v-if="errors.email" class="text-sm text-destructive">{{ errors.email }}</p>
            </div>

            <!-- 密码 -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-medium leading-none">密码</label>
                <a href="#" class="text-xs font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400">忘记密码？</a>
              </div>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="flex h-11 w-full rounded-md border border-input bg-transparent pl-10 pr-10 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" :class="errors.password && 'border-destructive'" />
                <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  <EyeOff v-if="showPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
              <p v-if="errors.password" class="text-sm text-destructive">{{ errors.password }}</p>
            </div>

            <!-- 记住我 -->
            <div class="flex items-center gap-2">
              <input v-model="remember" type="checkbox" id="remember" class="h-4 w-4 rounded border-input" />
              <label for="remember" class="text-sm font-normal text-muted-foreground cursor-pointer">记住我的登录状态</label>
            </div>

            <!-- 提交 -->
            <button type="submit" class="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/80 disabled:pointer-events-none disabled:opacity-50" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
              <template v-if="!isLoading">登录 <ArrowRight class="ml-2 h-4 w-4" /></template>
              <template v-else>登录中...</template>
            </button>
          </form>
        </div>

        <div class="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
          演示账号：输入任意邮箱格式（如 <span class="font-medium text-foreground">admin@acme.com</span>）和含大小写字母 + 数字的 8 位密码即可登录
        </div>

        <p class="text-center text-sm text-muted-foreground">
          还没有账户？ <a href="#" class="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400">立即注册</a>
        </p>
      </div>
    </div>
  </div>
</template>
