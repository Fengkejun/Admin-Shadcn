<script setup lang="ts">
import { ref, watch } from "vue"
import { RouterView } from "vue-router"
import Sidebar from "./Sidebar.vue"
import TopBar from "./TopBar.vue"

const STORAGE_KEY_SIDEBAR = "admin-sidebar-collapsed"
const STORAGE_KEY_EXPANDED = "admin-sidebar-expanded-ids"

const collapsed = ref(localStorage.getItem(STORAGE_KEY_SIDEBAR) === "true")

function loadExpandedIds(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_EXPANDED)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

const expandedIds = ref<Set<string>>(loadExpandedIds())

watch(collapsed, (v) => localStorage.setItem(STORAGE_KEY_SIDEBAR, String(v)))
watch(expandedIds, (v) => localStorage.setItem(STORAGE_KEY_EXPANDED, JSON.stringify([...v])), { deep: true })

function toggleCollapse() { collapsed.value = !collapsed.value }
function toggleExpand(id: string) {
  const next = new Set(expandedIds.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expandedIds.value = next
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <Sidebar :collapsed="collapsed" :expanded-ids="expandedIds" @toggle-collapse="toggleCollapse" @toggle-expand="toggleExpand" />
    <div class="flex flex-1 flex-col overflow-hidden">
      <TopBar />
      <main class="flex-1 overflow-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
