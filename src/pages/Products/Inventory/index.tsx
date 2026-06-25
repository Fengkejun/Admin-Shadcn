import { Badge } from "@/components/ui/badge"
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

const inventory = [
  { id: "P001", name: "企业协作平台年度订阅", stock: 999, reserved: 12, available: 987 },
  { id: "P002", name: "数据分析工具专业版", stock: 150, reserved: 5, available: 145 },
  { id: "P003", name: "API 网关企业授权", stock: 50, reserved: 3, available: 47 },
  { id: "P004", name: "云存储扩容包 500GB", stock: 0, reserved: 0, available: 0 },
]

export function InventoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">库存管理</h1>
        <p className="text-muted-foreground">查看和管理商品库存</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>库存列表</CardTitle>
          <CardDescription>共 {inventory.length} 个商品</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商品</TableHead>
                <TableHead className="text-right">总库存</TableHead>
                <TableHead className="text-right">已预留</TableHead>
                <TableHead className="text-right">可用</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right">{item.stock}</TableCell>
                  <TableCell className="text-right">{item.reserved}</TableCell>
                  <TableCell className="text-right">{item.available}</TableCell>
                  <TableCell>
                    <Badge variant={item.available > 0 ? "default" : "destructive"}>
                      {item.available > 0 ? "正常" : "缺货"}
                    </Badge>
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
