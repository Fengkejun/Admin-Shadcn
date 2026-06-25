import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMessages } from "./useMessages"

export function MessagesPage() {
  const { messages, unreadCount } = useMessages()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">消息中心</h1>
        <p className="text-muted-foreground">
          您有 {unreadCount} 条未读消息
        </p>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <Card
            key={msg.id}
            className={cn(
              "transition-colors hover:bg-muted/50 cursor-pointer",
              !msg.read && "border-l-2 border-l-primary"
            )}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  {!msg.read && (
                    <Badge variant="default" className="h-4 text-[10px] px-1">
                      新
                    </Badge>
                  )}
                  {msg.title}
                </CardTitle>
                <span className="text-xs text-muted-foreground">
                  {msg.time}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{msg.content}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
