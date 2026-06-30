<script setup lang="ts">
import { computed } from "vue"
import { PanelLeft } from "lucide-vue-next"
import { menuConfig, type MenuItem } from "@/config/menus"
import { currentUserPermissions } from "@/config/permissions"
import NavMenu from "./NavMenu.vue"

const props = defineProps<{
  collapsed: boolean
  expandedIds: Set<string>
}>()

const emit = defineEmits<{
  toggleCollapse: []
  toggleExpand: [id: string]
}>()

function filterMenus(menus: MenuItem[], permissions: Set<string>): MenuItem[] {
  return menus
    .filter((item) => !item.permission || permissions.has(item.permission))
    .map((item) => item.children ? { ...item, children: filterMenus(item.children, permissions) } : item)
    .filter((item) => !item.children || item.children.length > 0)
}

const filteredMenus = computed(() => filterMenus(menuConfig, currentUserPermissions))
</script>

<template>
  <aside
    class="relative flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out"
    :class="collapsed ? 'w-[60px]' : 'w-[260px]'"
  >
    <!-- Logo -->
    <div class="flex h-14 items-center border-b px-4" :class="collapsed ? 'justify-center' : 'gap-3'">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">A</div>
      <span v-if="!collapsed" class="text-base font-semibold tracking-tight">Acme Admin</span>
    </div>

    <!-- 菜单 -->
    <div class="flex-1 overflow-y-auto px-3 py-3">
      <NavMenu :items="filteredMenus" :collapsed="collapsed" :expanded-ids="expandedIds" @toggle-expand="(id) => emit('toggleExpand', id)" />
    </div>

    <!-- 折叠按钮 -->
    <div class="border-t p-2">
      <button
        class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        :class="collapsed && 'justify-center px-2'"
        @click="emit('toggleCollapse')"
      >
        <PanelLeft class="h-4 w-4 shrink-0" />
        <span v-if="!collapsed">收起菜单</span>
      </button>
    </div>
  </aside>
</template>
