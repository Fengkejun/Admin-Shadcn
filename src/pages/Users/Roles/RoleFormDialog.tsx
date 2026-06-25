import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  permissionOptions,
  type RoleItem,
  type RoleFormValues,
} from "./useRoles"

const roleSchema = z.object({
  name: z.string().min(1, "请输入角色名称").max(20, "名称不超过 20 个字符"),
  description: z.string().min(1, "请输入角色描述").max(100, "描述不超过 100 个字符"),
  permissions: z.array(z.string()).min(1, "请至少选择一项权限"),
})

interface RoleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: RoleFormValues) => void
  role?: RoleItem
}

/**
 * 角色表单弹窗
 * - 新增/编辑共用
 * - 权限多选 Checkbox
 */
export function RoleFormDialog({
  open,
  onOpenChange,
  onSubmit,
  role,
}: RoleFormDialogProps) {
  const isEdit = !!role
  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  })

  useEffect(() => {
    if (role) {
      form.reset({
        name: role.name,
        description: role.description,
        permissions: role.permissions,
      })
    } else {
      form.reset({ name: "", description: "", permissions: [] })
    }
  }, [role, form])

  function handleSubmit(values: z.infer<typeof roleSchema>) {
    onSubmit(values)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "编辑角色" : "创建角色"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "修改角色信息和权限后保存" : "填写角色信息并分配权限"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id="role-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>角色名称</FormLabel>
                  <FormControl>
                    <Input placeholder="如：运营、财务" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>角色描述</FormLabel>
                  <FormControl>
                    <Input placeholder="简要描述该角色的职责" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 权限多选 */}
            <FormField
              control={form.control}
              name="permissions"
              render={() => (
                <FormItem>
                  <FormLabel>权限配置</FormLabel>
                  <div className="grid grid-cols-2 gap-2 rounded-lg border p-3">
                    {permissionOptions.map((perm) => (
                      <FormField
                        key={perm.id}
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(perm.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, perm.id])
                                    : field.onChange(
                                        field.value?.filter((v) => v !== perm.id)
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {perm.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            取消
          </Button>
          <Button type="submit" form="role-form">
            {isEdit ? "保存" : "创建"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
