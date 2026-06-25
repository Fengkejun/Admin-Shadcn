import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { initTheme } from "@/utils/theme"
import "./index.css"
import App from "./App.tsx"

// 初始化主题（在渲染前执行，避免闪烁）
initTheme()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
