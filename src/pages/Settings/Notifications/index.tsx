import { Bell, Mail, MessageSquare } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const channels = [
  { id: "email", icon: Mail, label: "邮件通知", description: "订单更新、系统告警发送至邮箱", enabled: true },
  { id: "sms", icon: MessageSquare, label: "短信通知", description: "重要事件发送短信提醒", enabled: false },
  { id: "push", icon: Bell, label: "推送通知", description: "浏览器实时推送通知", enabled: true },
]

export function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">通知设置</h1>
        <p className="text-muted-foreground">配置消息通知渠道</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>通知渠道</CardTitle>
          <CardDescription>选择接收通知的方式</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {channels.map((ch) => {
            const Icon = ch.icon
            return (
              <div
                key={ch.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{ch.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {ch.description}
                    </p>
                  </div>
                </div>
                <button
                  className={`
                    relative h-6 w-11 rounded-full transition-colors
                    ${ch.enabled ? "bg-primary" : "bg-input"}
                  `}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform
                      ${ch.enabled ? "translate-x-5" : "translate-x-0"}
                    `}
                  />
                </button>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
