# Admin Shadcn

基于 **React 19 + shadcn/ui + Tailwind CSS v4** 的现代化后台管理系统模板，开箱即用，适合快速搭建 B 端管理平台并进行二次开发。

## 🔗 在线预览

**[https://admin-shadcn-o5gnra4bj-fengkejuns-projects.vercel.app](https://admin-shadcn-o5gnra4bj-fengkejuns-projects.vercel.app)**

> 演示账号：输入任意邮箱格式（如 `admin@acme.com`）和含大小写字母 + 数字的 8 位密码即可登录

## ✨ 特性

- **React 19** + **TypeScript 6** + **Vite 8** — 最新技术栈
- **shadcn/ui (v4)** — 可定制的高质量 UI 组件
- **Tailwind CSS v4** — 原子化 CSS，oklch 色彩空间
- **React Router v7** — 文件级路由配置
- **Zod + React Hook Form** — 类型安全的表单校验
- **Recharts** — 数据可视化图表
- **完整的登录页** — 表单校验、社交登录、密码可见性切换
- **仪表盘** — KPI 卡片、收入趋势图、订单表格、待办事项
- **13 个路由页面** — 用户管理、订单、商品、数据分析、消息、系统设置
- **可折叠侧边栏** — 无限层级递归菜单，localStorage 持久化
- **RBAC 权限过滤** — 菜单按权限码自动过滤
- **深色模式** — 完整的 light/dark 主题支持

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19, TypeScript 6 |
| 构建 | Vite 8 |
| UI | shadcn/ui, Tailwind CSS v4, Lucide Icons |
| 路由 | React Router v7 |
| 表单 | React Hook Form, Zod |
| 图表 | Recharts |
| 原语 | @base-ui/react |

## 🚀 快速开始

```bash
# 克隆项目
git clone git@github.com:Fengkejun/Admin-Shadcn.git
cd Admin-Shadcn

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📁 项目结构

```
src/
├── components/
│   ├── layout/          # 布局组件
│   │   ├── AppLayout.tsx    # 主布局壳
│   │   ├── Sidebar.tsx      # 侧边栏
│   │   ├── NavMenu.tsx      # 递归菜单
│   │   ├── NavItem.tsx      # 菜单项
│   │   └── TopBar.tsx       # 顶部导航栏
│   └── ui/              # shadcn/ui 组件
├── config/
│   ├── menus.ts         # 菜单配置（层级嵌套 + 权限码）
│   └── permissions.ts   # 用户权限 mock
├── pages/
│   ├── Login/           # 登录页
│   │   ├── index.tsx        # UI 层
│   │   ├── useLogin.ts      # 逻辑层
│   │   └── icons.tsx        # 图标
│   ├── Dashboard/       # 仪表盘
│   │   ├── index.tsx        # UI 组合层
│   │   ├── useDashboard.ts  # 数据 + 类型
│   │   ├── StatCard.tsx     # KPI 卡片
│   │   ├── RevenueChart.tsx # 收入趋势图
│   │   ├── RecentOrders.tsx # 订单表格
│   │   └── TodoList.tsx     # 待办事项
│   ├── Users/           # 用户管理
│   ├── Orders/          # 订单管理
│   ├── Products/        # 商品管理
│   ├── Analytics/       # 数据分析
│   ├── Messages/        # 消息中心
│   └── Settings/        # 系统设置
├── router/
│   └── index.tsx        # 路由配置
├── lib/
│   └── utils.ts         # cn() 工具函数
├── App.tsx
├── main.tsx
└── index.css            # Tailwind + shadcn 主题变量
```

## 🎨 页面拆分规范

每个页面遵循 **UI / 逻辑分离** 模式：

```
pages/Example/
├── index.tsx        # 纯 UI 渲染，调用 useXxx hook
├── useXxx.ts        # 自定义 hook：状态、数据、业务逻辑
└── components/      # 页面级子组件（可选）
```

## 🔐 权限系统

菜单数据支持 `permission` 字段，配合后端 RBAC 模型过滤：

```ts
// src/config/menus.ts
{
  id: "users",
  label: "用户管理",
  permission: "user:read",  // 需要此权限码才显示
  children: [...]
}
```

前端通过 `filterMenus()` 递归过滤无权限菜单，路由层可配合守卫防止越权访问。

## 📄 License

MIT
