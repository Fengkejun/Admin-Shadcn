import { createApp } from "vue"
import { initTheme } from "@/utils/theme"
import router from "@/router"
import App from "./App.vue"
import "./index.css"

initTheme()

const app = createApp(App)
app.use(router)
app.mount("#app")
