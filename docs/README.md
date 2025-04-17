# Lumos Study 文档

本文档提供了 Lumos Study 智能教育平台的开发和使用指南。

## 目录

1. [项目概述](./overview.md)
2. [开发指南](./development.md)
3. [组件文档](./components.md)
4. [Mastra 集成](./mastra.md)
5. [测试指南](./testing.md)

## 快速开始

### 安装依赖

```bash
bun install
```

### 开发环境运行

```bash
bun run dev
```

### 构建生产版本

```bash
bun run build
```

### 运行测试

```bash
npx playwright test
```

## 项目结构

```
lumos-study/
├── app/                      # Next.js App Router
│   ├── api/                  # API 路由
│   ├── (auth)/               # 认证路由
│   ├── dashboard/            # 用户仪表板
│   ├── subjects/             # 特定学科页面
│   ├── chat/                 # AI 聊天界面
│   ├── tools/                # 教育工具
│   └── layout.tsx            # 根布局
├── components/               # UI 组件
│   ├── ui/                   # Shadcn UI 组件
│   ├── features/             # 特定功能组件
│   │   └── chat/             # 聊天相关组件（使用 assistant-ui）
│   └── shared/               # 共享组件
├── lib/                      # 实用函数
│   ├── utils.ts              # 通用工具
│   ├── mastra-client.ts      # Mastra 客户端配置
│   └── db.ts                 # 数据库工具
├── mastra/                   # Mastra 配置
│   ├── agents/               # AI 代理
│   ├── tools/                # 自定义工具
│   ├── memory/               # 记忆配置
│   └── index.ts              # Mastra 初始化
├── public/                   # 静态资源
├── styles/                   # 全局样式
├── types/                    # TypeScript 类型
├── tests/                    # 测试文件
├── docs/                     # 文档
├── .env                      # 环境变量
├── next.config.js            # Next.js 配置
├── tailwind.config.js        # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 项目依赖
```
