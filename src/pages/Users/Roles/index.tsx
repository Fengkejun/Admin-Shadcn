import { useState } from "react"
import { MoreHorizontal, Plus, Search, Pencil, Trash2, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useRoles, type RoleItem, type RoleFormValues } from "./useRoles"
import { RoleFormDialog } from "./RoleFormDialog"
import { DeleteConfirmDialog } from "./DeleteConfirmDialog"
import { permissionOptions } from "./useRoles"

/**
 * 角色管理页 — 纯 UI 层
 * 功能：搜索、新增、编辑、删除、权限展示
 */
export function RolesPage() {
  const { roles, search, setSearch, addRole, updateRole, deleteRole } = useRoles()

  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<RoleItem | undefined>()
  const [deletingRole, setDeletingRole] = useState<RoleItem | undefined>()

  function handleAdd() {
    setEditingRole(undefined)
    setFormOpen(true)
  }

  function handleEdit(role: RoleItem) {
    setEditingRole(role)
    setFormOpen(true)
  }

  function handleDeleteClick(role: RoleItem) {
    setDeletingRole(role)
    setDeleteOpen(true)
  }

  function handleFormSubmit(values: RoleFormValues) {
    if (editingRole) {
      updateRole(editingRole.id, values)
    } else {
      addRole(values)
    }
  }

  function handleConfirmDelete() {
    if (deletingRole) {
      deleteRole(deletingRole.id)
      setDeleteOpen(false)
      setDeletingRole(undefined)
    }
  }

  /** 将权限 ID 转为中文标签 */
  function getPermissionLabels(ids: string[]) {
    return ids.map(
      (id) => permissionOptions.find((p) => p.id === id)?.label ?? id
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">角色管理</h1>
            <p className="text-muted-foreground">管理系统角色和权限分配</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            创建角色
          </Button>
        </div>

        {/* 角色列表 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>角色列表</CardTitle>
                <CardDescription>共 {roles.length} 个角色</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索角色..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>角色名</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>权限</TableHead>
                  <TableHead className="text-right">用户数</TableHead>
                  <TableHead>创建时间</TableHead>
                  <TableHead className="w-12">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      暂无角色数据
                    </TableCell>
                  </TableRow>
                ) : (
                  roles.map((role) => {
                    const permLabels = getPermissionLabels(role.permissions)
                    const showCount = 3
                    const visible = permLabels.slice(0, showCount)
                    const extra = permLabels.length - showCount

                    return (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            {role.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground max-w-[200px] truncate">
                          {role.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {visible.map((label) => (
                              <Badge
                                key={label}
                                variant="secondary"
                                className="text-xs"
                              >
                                {label}
                              </Badge>
                            ))}
                            {extra > 0 && (
                              <Tooltip>
                                <TooltipTrigger
                                  render={(props) => (
                                    <Badge
                                      {...props}
                                      variant="outline"
                                      className="text-xs cursor-default"
                                    >
                                      +{extra}
                                    </Badge>
                                  )}
                                />
                                <TooltipContent>
                                  <div className="flex flex-col gap-0.5">
                                    {permLabels.slice(showCount).map((l) => (
                                      <span key={l}>{l}</span>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">{role.userCount}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {role.createdAt}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={(props) => (
                                <Button {...props} variant="ghost" size="icon-sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              )}
                            />
                            <DropdownMenuContent align="end" className="w-36">
                              <DropdownMenuItem onClick={() => handleEdit(role)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                编辑
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => handleDeleteClick(role)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                删除
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 新增/编辑弹窗 */}
        <RoleFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          onSubmit={handleFormSubmit}
          role={editingRole}
        />

        {/* 删除确认弹窗 */}
        <DeleteConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          onConfirm={handleConfirmDelete}
          roleName={deletingRole?.name ?? ""}
          userCount={deletingRole?.userCount ?? 0}
        />
      </div>
    </TooltipProvider>
  )
}
