# Lumos Study - 智能教育平台

[English Version](./README.md)

Lumos Study 是一个 AI 驱动的教育平台，旨在帮助学生学习并解决各学科问题。该平台利用先进的 AI 技术提供个性化学习体验、交互式问题解决和全面的教育工具。

## 功能特点

### AI 聊天界面
- 与 AI 导师的实时对话
- 具有记忆功能的上下文感知响应
- 特定学科专业知识
- 文件和图像上传功能
- 编程帮助的代码执行
- 使用 @assistant-ui/react 实现专业聊天界面
- 支持 Markdown 格式化输出
- 聊天历史记录和会话管理

### 特定学科学习
- 数学模块，支持方程式识别
- 科学模块（生物、化学、物理）
- 人文模块（历史、文学）
- 语言学习工具
- 逐步问题解决方案

### 高级学习工具
- 数学问题和文本提取的图像识别
- 提供逐步解决方案的数学问题解算器
- 支持多种摘要类型的文本摘要工具
- 闪卡创建和学习系统
- 交互式练习和模拟

### 性能优化
- 增强的 API 调用，支持重试、超时和缓存
- 组件和图像懒加载
- 移动设备的触摸手势支持
- 适应所有屏幕尺寸的响应式设计
- 优化的渲染性能

## 技术栈

- **运行环境**: Bun
- **前端框架**: Next.js (App Router)
- **UI 组件**: Shadcn UI
- **AI 集成**: Mastra
- **样式**: Tailwind CSS
- **认证**: NextAuth.js / Auth.js
- **数据库**: Supabase (PostgreSQL)
- **部署**: Vercel
- **聊天界面**: @assistant-ui/react 组件库

## 开始使用

### 前提条件

- Node.js 18+ 或 Bun
- pnpm (推荐)

### 安装

1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/lumos-study.git
   cd lumos-study
   ```

2. 安装依赖
   ```bash
   pnpm install
   ```

3. 设置环境变量
   ```bash
   cp .env.example .env.local
   ```
   然后编辑 `.env.local` 文件，填入您的 API 密钥和配置。

4. 运行开发服务器
   ```bash
   pnpm dev
   ```

5. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用程序。

### 数据库设置

1. 在 `.env.local` 中设置数据库连接

2. 运行 Prisma 迁移
   ```bash
   pnpm prisma migrate dev
   ```

## 测试

项目包含全面的测试套件：

```bash
# 运行单元测试
pnpm test:unit

# 运行集成测试
pnpm test:integration

# 运行端到端测试
pnpm test:e2e

# 运行所有测试
pnpm test
```

## 部署

应用程序配置为在 Vercel 上部署：

```bash
pnpm build
vercel deploy
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

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m '添加一些惊人的功能'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件。

## 致谢

- [Next.js](https://nextjs.org)
- [Shadcn UI](https://ui.shadcn.com)
- [Mastra](https://docs.mastra.ai)
- [Bun](https://bun.sh)
- [Supabase](https://supabase.com)
- [Vercel](https://vercel.com)
- [Assistant UI](https://assistant-ui.com)
