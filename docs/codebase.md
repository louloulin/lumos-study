# Lumos Study 代码库文档

本文档提供了 Lumos Study 智能教育平台代码库的概述和详细说明。

## 架构概述

Lumos Study 采用现代 Web 应用程序架构，基于 Next.js 框架构建，使用 App Router 实现服务器组件和客户端组件的混合渲染。

### 技术栈

- **前端框架**：Next.js 15.3.0（App Router）
- **UI 组件库**：Shadcn UI（基于 Tailwind CSS）
- **状态管理**：React Hooks + Context API
- **样式**：Tailwind CSS
- **数据获取**：React Server Components + SWR
- **认证**：NextAuth.js / Auth.js
- **数据库**：Prisma ORM + PostgreSQL
- **AI 集成**：Mastra + OpenAI API
- **测试**：Vitest + Playwright

### 架构图

```
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
|  Next.js App     |     |  Mastra AI       |     |  PostgreSQL      |
|  (Frontend)      |<--->|  (AI Services)   |<--->|  (Database)      |
|                  |     |                  |     |                  |
+------------------+     +------------------+     +------------------+
        ^                        ^
        |                        |
        v                        v
+------------------+     +------------------+
|                  |     |                  |
|  NextAuth.js     |     |  OpenAI API      |
|  (Auth)          |     |  (LLM)           |
|                  |     |                  |
+------------------+     +------------------+
```

## 目录结构

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
│   │   └── chat/             # 聊天相关组件
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
├── tests/                    # 测试套件
│   ├── unit/                 # 单元测试
│   ├── integration/          # 集成测试
│   └── e2e/                  # 端到端测试
└── docs/                     # 文档
```

## 核心模块

### 1. 认证系统

认证系统使用 NextAuth.js 实现，支持电子邮件/密码认证和第三方认证（如 Google、GitHub）。

**主要文件**：
- `app/api/auth/[...nextauth]/route.ts`：NextAuth.js 配置和路由处理
- `app/(auth)/signin/page.tsx`：登录页面
- `app/(auth)/signup/page.tsx`：注册页面
- `components/features/auth/`：认证相关组件

### 2. AI 聊天系统

AI 聊天系统使用 Mastra 和 OpenAI API 实现，支持上下文感知对话和文件处理。

**主要文件**：
- `app/chat/page.tsx`：聊天页面
- `components/features/chat/`：聊天相关组件
- `mastra/agents/chat-agent.ts`：聊天 AI 代理配置
- `mastra/memory/`：对话记忆系统

### 3. 学科系统

学科系统提供结构化的学习内容，包括学科、主题和子主题。

**主要文件**：
- `app/subjects/page.tsx`：学科列表页面
- `app/subjects/[subjectId]/page.tsx`：学科详情页面
- `app/subjects/[subjectId]/[topicId]/page.tsx`：主题详情页面
- `components/features/subjects/`：学科相关组件
- `lib/subjects.ts`：学科数据和工具函数

### 4. 工具系统

工具系统提供各种教育工具，如数学问题解算器、文本摘要和图像识别。

**主要文件**：
- `app/tools/page.tsx`：工具列表页面
- `app/tools/[toolId]/page.tsx`：特定工具页面
- `components/features/tools/`：工具相关组件
- `lib/tools/`：工具实现和工具函数

### 5. 数据库系统

数据库系统使用 Prisma ORM 和 PostgreSQL 实现，存储用户数据、聊天历史和学习进度。

**主要文件**：
- `prisma/schema.prisma`：Prisma 数据库模式
- `lib/prisma.ts`：Prisma 客户端配置
- `lib/db.ts`：数据库工具函数

## 关键概念

### 1. 服务器组件与客户端组件

Lumos Study 使用 Next.js App Router 的服务器组件和客户端组件：

- **服务器组件**：用于数据获取和初始渲染，减少客户端 JavaScript 大小
- **客户端组件**：用于交互式 UI 元素，如表单和动画

示例：
```tsx
// 服务器组件
// app/subjects/page.tsx
export default async function SubjectsPage() {
  const subjects = await getSubjects();
  return <SubjectList subjects={subjects} />;
}

// 客户端组件
// components/features/subjects/SubjectList.tsx
'use client';

export function SubjectList({ subjects }) {
  const [filter, setFilter] = useState('all');
  // ...
}
```

### 2. 数据获取

Lumos Study 使用多种数据获取方法：

- **服务器组件**：直接使用 `async/await` 获取数据
- **客户端组件**：使用 SWR 进行数据获取和缓存
- **API 路由**：使用 Next.js API 路由处理客户端请求

### 3. AI 集成

Lumos Study 使用 Mastra 框架集成 AI 功能：

- **AI 代理**：定义 AI 行为和能力
- **工具**：扩展 AI 功能的自定义工具
- **记忆系统**：存储和检索对话历史

## 扩展指南

### 1. 添加新学科

要添加新学科，请按照以下步骤操作：

1. 在 `data/subjects.ts` 中添加新学科数据
2. 在 `data/topics.ts` 中添加相关主题数据
3. 创建必要的资源（图片、视频等）

### 2. 添加新工具

要添加新工具，请按照以下步骤操作：

1. 在 `app/tools/[toolId]/` 中创建新工具页面
2. 在 `components/features/tools/` 中创建工具组件
3. 在 `lib/tools/` 中实现工具逻辑
4. 在 `data/tools.ts` 中注册新工具

### 3. 自定义 AI 行为

要自定义 AI 行为，请按照以下步骤操作：

1. 在 `mastra/agents/` 中修改或创建新的 AI 代理
2. 在 `mastra/tools/` 中添加自定义工具
3. 在 `mastra/memory/` 中自定义记忆系统

## 性能优化

Lumos Study 实现了多种性能优化：

1. **组件懒加载**：使用 `LazyComponent` 延迟加载不在视口中的组件
2. **图片懒加载**：使用 `LazyImage` 延迟加载不在视口中的图片
3. **API 缓存**：使用 `cachedFetch` 缓存 API 响应
4. **记忆化**：使用 `React.memo` 和 `useCallback` 减少不必要的重渲染
5. **代码分割**：使用 Next.js 的自动代码分割减少初始加载时间

## 测试策略

Lumos Study 使用多层测试策略：

1. **单元测试**：使用 Vitest 测试独立函数和组件
2. **集成测试**：使用 Playwright 测试组件交互
3. **端到端测试**：使用 Playwright 测试完整用户流程

## 部署流程

Lumos Study 使用 Vercel 进行部署，配置了 GitHub Actions 进行 CI/CD：

1. 代码推送到 GitHub
2. GitHub Actions 运行测试
3. 测试通过后，自动部署到 Vercel
4. Vercel 执行构建和部署

详细信息请参阅 [部署指南](./deployment.md)。
