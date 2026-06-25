import * as XLSX from "xlsx"
import { toast } from "sonner"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExportColumn<T extends Record<string, any> = Record<string, any>> {
  /** 表头显示名 */
  header: string
  /** 数据字段名 */
  key: keyof T & string
  /** 可选：自定义格式化函数 */
  format?: (value: unknown, row: T) => string | number
  /** 可选：列宽（字符数） */
  width?: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ExportOptions<T extends Record<string, any> = Record<string, any>> {
  /** 文件名（不含扩展名） */
  fileName: string
  /** 列配置 */
  columns: ExportColumn<T>[]
  /** 数据源 */
  data: T[]
  /** 工作表名称，默认 "Sheet1" */
  sheetName?: string
}

/**
 * 公共 Excel 导出函数
 * - 根据列配置提取数据
 * - 自动生成表头和列宽
 * - 触发浏览器下载
 *
 * @example
 * ```ts
 * exportToExcel({
 *   fileName: "订单列表",
 *   columns: [
 *     { header: "订单号", key: "id", width: 15 },
 *     { header: "客户", key: "customer", width: 12 },
 *     { header: "金额", key: "amount", width: 10 },
 *   ],
 *   data: orders,
 * })
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function exportToExcel<T extends Record<string, any>>(
  options: ExportOptions<T>
) {
  const { fileName, columns, data, sheetName = "Sheet1" } = options

  try {
    // 1. 构造表头
    const headers = columns.map((col) => col.header)

    // 2. 构造数据行
    const rows = data.map((row) =>
      columns.map((col) => {
        const raw = row[col.key]
        return col.format ? col.format(raw, row) : raw
      })
    )

    // 3. 合并表头 + 数据
    const sheetData = [headers, ...rows]

    // 4. 创建工作表
    const ws = XLSX.utils.aoa_to_sheet(sheetData)

    // 5. 设置列宽
    ws["!cols"] = columns.map((col) => ({
      wch: col.width ?? Math.max(col.header.length * 2, 10),
    }))

    // 6. 创建工作簿并写入
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, sheetName)

    // 7. 触发下载
    XLSX.writeFile(wb, `${fileName}.xlsx`)

    toast.success("导出成功", {
      description: `已生成 ${fileName}.xlsx`,
    })

    return true
  } catch (err) {
    console.error("导出失败:", err)
    toast.error("导出失败", {
      description: "请检查数据后重试",
    })
    return false
  }
}
