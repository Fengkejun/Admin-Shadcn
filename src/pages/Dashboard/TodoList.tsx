import { Circle, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { todoPriorityMap, type TodoItem } from "./useDashboard"

interface TodoListProps {
  data: TodoItem[]
  pendingCount: number
}

/** 优先级图标映射 */
const priorityIcon = {
  high: AlertCircle,
  medium: Clock,
  low: Circle,
}

/**
 * 待办事项列表 — 纯 UI 展示
 * - 数据由父组件通过 props 传入
 * - 优先级标签颜色区分
 */
export function TodoList({ data, pendingCount }: TodoListProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>待办事项</CardTitle>
          <CardDescription>您有 {pendingCount} 项待处理</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          查看全部
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((todo) => {
            const priority = todoPriorityMap[todo.priority]
            const Icon = priorityIcon[todo.priority]
            return (
              <div
                key={todo.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50",
                  todo.done && "opacity-60"
                )}
              >
                {todo.done ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      todo.done && "line-through text-muted-foreground"
                    )}
                  >
                    {todo.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      variant={priority.variant}
                      className="h-5 text-[10px] px-1.5"
                    >
                      {priority.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {todo.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
