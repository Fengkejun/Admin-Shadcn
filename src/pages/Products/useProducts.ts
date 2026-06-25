export interface ProductItem {
  id: string
  name: string
  price: string
  stock: number
  status: "on_sale" | "off_shelf"
}

const mockProducts: ProductItem[] = [
  { id: "P001", name: "企业协作平台年度订阅", price: "¥12,800", stock: 999, status: "on_sale" },
  { id: "P002", name: "数据分析工具专业版", price: "¥6,400", stock: 150, status: "on_sale" },
  { id: "P003", name: "API 网关企业授权", price: "¥25,600", stock: 50, status: "on_sale" },
  { id: "P004", name: "云存储扩容包 500GB", price: "¥3,200", stock: 0, status: "off_shelf" },
]

export function useProducts() {
  return { products: mockProducts }
}
