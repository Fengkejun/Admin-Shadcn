<script setup lang="ts">
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import { Bell, Moon, Sun, Search, Settings, User, LogOut } from "lucide-vue-next"
import { menuConfig, type MenuItem } from "@/config/menus"
import { currentUser } from "@/config/permissions"
import { applyTheme, getStoredTheme } from "@/utils/theme"

const route = useRoute()
const router = useRouter()

const isDark = ref(getStoredTheme() === "dark")
function toggleTheme() {
  isDark.value = !isDark.value
  applyTheme(isDark.value ? "dark" : "light")
}

function findBreadcrumbs(menus: MenuItem[], pathname: string, trail: MenuItem[] = []): MenuItem[] | null {
  for (const item of menus) {
    const current = [...trail, item]
    if (item.path === pathname) return current
    if (item.children) {
      const found = findBreadcrumbs(item.children, pathname, current)
      if (found) return found
    }
  }
  return null
}

const breadcrumbs = computed(() => findBreadcrumbs(menuConfig, route.path) ?? [])

const userName = (() => {
  try {
    const stored = localStorage.getItem("admin_profile")
    if (stored) { const p = JSON.parse(stored); if (p.name) return p.name }
  } catch { /* ignore */ }
  return currentUser.name
})()

function handleLogout() {
  localStorage.removeItem("admin_token")
  localStorage.removeItem("admin_remember")
  sessionStorage.removeItem("admin_token")
  router.replace("/login")
}
</script>

<template>
  <header class="flex h-14 items-center justify-between border-b bg-background px-6">
    <!-- 面包屑 -->
    <nav class="flex items-center gap-1.5 text-sm">
      <span v-for="(item, index) in breadcrumbs" :key="item.id" class="flex items-center gap-1.5">
        <span v-if="index > 0" class="text-muted-foreground">/</span>
        <router-link v-if="item.path && index < breadcrumbs.length - 1" :to="item.path" class="text-muted-foreground hover:text-foreground transition-colors">
          {{ item.label }}
        </router-link>
        <span v-else class="font-medium text-foreground">{{ item.label }}</span>
      </span>
    </nav>

    <!-- 右侧操作区 -->
    <div class="flex items-center gap-2">
      <div class="relative hidden md:block">
        <Search class="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input placeholder="搜索..." class="h-8 w-48 rounded-md border border-input bg-transparent pl-8 pr-3 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />
      </div>

      <button class="relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent">
        <Bell class="h-4 w-4" />
        <span class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">3</span>
      </button>

      <button class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent" @click="toggleTheme">
        <Sun v-if="isDark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
      </button>

      <!-- 用户下拉 -->
      <div class="relative group">
        <button class="flex h-8 items-center gap-2 rounded-md px-2 hover:bg-accent">
          <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
            {{ userName.charAt(0).toUpperCase() }}
          </div>
          <span class="hidden text-sm font-medium sm:inline">{{ userName }}</span>
        </button>
        <div class="invisible absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md group-hover:visible">
          <div class="px-2 py-1.5">
            <p class="text-sm font-medium">{{ userName }}</p>
            <p class="text-xs text-muted-foreground">{{ currentUser.email }}</p>
          </div>
          <div class="my-1 h-px bg-border" />
          <button class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent" @click="router.push('/profile')">
            <User class="h-4 w-4" /> 个人中心
          </button>
          <button class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent" @click="router.push('/settings')">
            <Settings class="h-4 w-4" /> 系统设置
          </button>
          <div class="my-1 h-px bg-border" />
          <button class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-accent" @click="handleLogout">
            <LogOut class="h-4 w-4" /> 退出登录
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
