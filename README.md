# Admin Shadcn - Vue

基于 **Vue 3 + Tailwind CSS v4** 的现代化后台管理系统模板，从 React 版本迁移而来。

## 🔗 在线预览

**[https://admin-shadcn-o5gnra4bj-fengkejuns-projects.vercel.app](https://admin-shadcn-o5gnra4bj-fengkejuns-projects.vercel.app)**

> 演示账号：输入任意邮箱格式（如 `admin@acme.com`）和含大小写字母 + 数字的 8 位密码即可登录

## ✨ 特性

- **Vue 3** + **TypeScript 6** + **Vite 8** — 最新技术栈
- **Tailwind CSS v4** — 原子化 CSS，oklch 色彩空间
- **Vue Router 4** — 文件级路由配置
- **VeeValidate + Zod** — 类型安全的表单校验
- **Chart.js + vue-chartjs** — 数据可视化图表
- **完整的登录页** — 表单校验、社交登录、密码可见性切换
- **仪表盘** — KPI 卡片、收入趋势图、订单表格、待办事项
- **可折叠侧边栏** — 无限层级递归菜单
- **深色模式** — 完整的 light/dark 主题支持

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3, TypeScript 6 |
| 构建 | Vite 8 |
| UI | Tailwind CSS v4, Lucide Icons |
| 路由 | Vue Router 4 |
| 表单 | VeeValidate, Zod |
| 图表 | Chart.js, vue-chartjs |

## 🚀 快速开始

```bash
# 克隆项目
git clone git@github.com:Fengkejun/Admin-Shadcn.git
cd Admin-Shadcn
git checkout vue

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
│   │   ├── AppLayout.vue    # 主布局壳
│   │   ├── Sidebar.vue      # 侧边栏
│   │   ├── NavMenu.vue      # 递归菜单
│   │   └── TopBar.vue       # 顶部导航栏
├── config/
│   ├── menus.ts         # 菜单配置
│   └── permissions.ts   # 用户权限
├── pages/
│   ├── Login/           # 登录页
│   ├── Dashboard/       # 仪表盘
│   └── ...              # 其他页面
├── router/
│   └── index.ts         # 路由配置
├── utils/
│   ├── theme.ts         # 主题管理
│   └── toast.ts         # Toast 提示
├── lib/
│   └── utils.ts         # cn() 工具函数
├── App.vue
├── main.ts
└── index.css            # Tailwind 主题变量
```

## 📄 License

MIT
