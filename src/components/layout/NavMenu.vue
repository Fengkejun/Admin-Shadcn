<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next"
import { useRoute, useRouter } from "vue-router"
import type { MenuItem } from "@/config/menus"

const props = defineProps<{
  items: MenuItem[]
  collapsed: boolean
  expandedIds: Set<string>
  level?: number
}>()

const emit = defineEmits<{ toggleExpand: [id: string] }>()

const route = useRoute()
const router = useRouter()
const level = props.level ?? 0

function isActive(item: MenuItem): boolean {
  if (!item.path) return false
  return route.path === item.path || (item.path !== "/dashboard" && route.path.startsWith(item.path))
}

function handleClick(item: MenuItem) {
  if (item.children?.length) {
    emit("toggleExpand", item.id)
  } else if (item.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <div v-for="item in items" :key="item.id">
      <!-- 菜单项 -->
      <div :style="{ paddingLeft: collapsed ? 0 : level * 12 + 'px' }" :class="collapsed && 'flex justify-center'">
        <button
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          :class="[
            isActive(item) && 'bg-sidebar-accent text-sidebar-primary font-semibold',
            collapsed && 'justify-center px-2',
          ]"
          @click="handleClick(item)"
        >
          <component
            v-if="item.icon"
            :is="item.icon"
            class="h-4 w-4 shrink-0"
            :class="isActive(item) ? 'text-sidebar-primary' : 'text-sidebar-foreground/60'"
          />
          <template v-if="!collapsed">
            <span class="flex-1 truncate text-left">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" class="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1.5 text-xs">
              {{ item.badge }}
            </span>
            <ChevronRight
              v-if="item.children?.length"
              class="h-4 w-4 shrink-0 text-sidebar-foreground/40 transition-transform duration-200"
              :class="expandedIds.has(item.id) && 'rotate-90'"
            />
          </template>
        </button>
      </div>

      <!-- 子菜单 -->
      <div
        v-if="item.children?.length && !collapsed"
        class="overflow-hidden transition-all duration-200 ease-in-out"
        :class="expandedIds.has(item.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="ml-3 border-l border-sidebar-border pl-3 pt-0.5">
          <NavMenu
            :items="item.children"
            :collapsed="collapsed"
            :expanded-ids="expandedIds"
            :level="level + 1"
            @toggle-expand="(id) => emit('toggleExpand', id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
