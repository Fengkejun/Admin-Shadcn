import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (fileName: string) => void
  /** 默认文件名 */
  defaultFileName?: string
  /** 导出描述，如 "订单数据" */
  description?: string
  /** 数据条数 */
  rowCount?: number
}

/**
 * 导出文件名输入弹窗
 * - 用户自定义文件名
 * - 显示即将导出的数据条数
 * - 回车确认
 */
export function ExportDialog({
  open,
  onOpenChange,
  onConfirm,
  defaultFileName = "导出数据",
  description = "数据",
  rowCount,
}: ExportDialogProps) {
  const [fileName, setFileName] = useState(defaultFileName)

  // 打开时重置文件名
  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setFileName(defaultFileName)
    }
    onOpenChange(nextOpen)
  }

  function handleConfirm() {
    const name = fileName.trim() || defaultFileName
    onConfirm(name)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            导出 {description}
          </DialogTitle>
          <DialogDescription>
            {rowCount !== undefined
              ? `即将导出 ${rowCount} 条${description}，请输入文件名`
              : `请输入导出文件名`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="export-filename">文件名</Label>
          <div className="flex items-center gap-2">
            <Input
              id="export-filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="请输入文件名"
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              autoFocus
            />
            <span className="shrink-0 text-sm text-muted-foreground">
              .xlsx
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm}>
            <Download className="mr-2 h-4 w-4" />
            导出
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
