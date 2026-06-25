import { Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  roleName: string
  userCount: number
}

/**
 * 角色删除确认弹窗
 * - 有关联用户时提示无法删除
 * - 无关联用户时二次确认
 */
export function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  roleName,
  userCount,
}: DeleteConfirmDialogProps) {
  const canDelete = userCount === 0

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 className="text-destructive" />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {canDelete ? "确认删除" : "无法删除"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete
              ? <>确定要删除角色 <span className="font-medium text-foreground">{roleName}</span> 吗？此操作不可撤销。</>
              : <>角色 <span className="font-medium text-foreground">{roleName}</span> 下还有 <span className="font-medium text-foreground">{userCount}</span> 个用户，请先迁移用户后再删除。</>
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{canDelete ? "取消" : "知道了"}</AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction variant="destructive" onClick={onConfirm}>
              删除
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
