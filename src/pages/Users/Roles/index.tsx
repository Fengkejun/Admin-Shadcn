import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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

const roles = [
  { id: "1", name: "管理员", description: "拥有所有权限", users: 2 },
  { id: "2", name: "编辑", description: "可编辑内容和商品", users: 5 },
  { id: "3", name: "访客", description: "仅查看权限", users: 12 },
]

export function RolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">角色管理</h1>
          <p className="text-muted-foreground">管理系统角色和权限分配</p>
        </div>
        <Button>创建角色</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>角色列表</CardTitle>
          <CardDescription>共 {roles.length} 个角色</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>角色名</TableHead>
                <TableHead>描述</TableHead>
                <TableHead className="text-right">用户数</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {role.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {role.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{role.users}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
