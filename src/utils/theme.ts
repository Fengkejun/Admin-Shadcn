export type Theme = "light" | "dark"

const STORAGE_KEY = "admin_theme"

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
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  const theme: Theme = prefersDark ? "dark" : "light"
  applyTheme(theme)
  return theme
}

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "dark") return "dark"
  } catch {
    // ignore
  }
  return "light"
}
