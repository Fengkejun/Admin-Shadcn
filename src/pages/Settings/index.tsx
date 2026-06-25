import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useSettings } from "./useSettings"

export function SettingsPage() {
  const { settings, toggleSetting } = useSettings()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">系统设置</h1>
        <p className="text-muted-foreground">管理系统偏好和安全配置</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>偏好设置</CardTitle>
          <CardDescription>管理通知和界面偏好</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings.map((s) => (
            <div
              key={s.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">
                  {s.description}
                </p>
              </div>
              <button
                onClick={() => toggleSetting(s.key)}
                className={`
                  relative h-6 w-11 rounded-full transition-colors
                  ${s.value ? "bg-primary" : "bg-input"}
                `}
              >
                <span
                  className={`
                    absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
                    ${s.value ? "translate-x-5" : "translate-x-0"}
                  `}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
