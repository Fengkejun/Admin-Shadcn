/**
 * 简易 toast 实现
 * 后续可替换为 vue-sonner 等成熟方案
 */

function createToastEl(message: string, type: "success" | "error" = "success") {
  const container = document.getElementById("toast-container")
  if (!container) return

  const el = document.createElement("div")
  el.className = `
    flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-lg
    animate-in fade-in-0 slide-in-from-top-4
    ${type === "success"
      ? "bg-popover text-popover-foreground border-border"
      : "bg-destructive/10 text-destructive border-destructive/20"
    }
  `
  el.textContent = message
  container.appendChild(el)

  setTimeout(() => {
    el.style.transition = "opacity 200ms, transform 200ms"
    el.style.opacity = "0"
    el.style.transform = "translateY(-8px)"
    setTimeout(() => el.remove(), 200)
  }, 3000)
}

// 确保容器存在
function ensureContainer() {
  if (!document.getElementById("toast-container")) {
    const container = document.createElement("div")
    container.id = "toast-container"
    container.className = "fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2"
    document.body.appendChild(container)
  }
}

export const toast = {
  success(message: string) {
    ensureContainer()
    createToastEl(message, "success")
  },
  error(message: string) {
    ensureContainer()
    createToastEl(message, "error")
  },
}
