export type Theme = "light" | "dark"

const STORAGE_KEY = "admin_theme"

/**
 * 应用主题
 * - 在 <html> 上切换 dark class
 * - 持久化到 localStorage
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === "dark") {
    root.classList.add("dark")
  } else {
    root.classList.remove("dark")
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore
  }
}

/**
 * 初始化主题
 * - 优先读取 localStorage
 * - 其次跟随系统 prefers-color-scheme
 * - 默认 light
 */
export function initTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (stored === "dark" || stored === "light") {
      applyTheme(stored)
      return stored
    }
  } catch {
    // ignore
  }

  // 跟随系统
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const theme: Theme = prefersDark ? "dark" : "light"
  applyTheme(theme)
  return theme
}

/**
 * 获取当前主题
 */
export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "dark") return "dark"
  } catch {
    // ignore
  }
  return "light"
}
