# Lumos Study - 智能教育平台

本文档概述了使用 Bun、Next.js、Shadcn UI 和 Mastra 构建 Lumos Study 智能教育平台的计划，该平台灵感来源于 QuestionAI。

## 1. 项目概述

Lumos Study 将是一个 AI 驱动的教育平台，帮助学生学习并解决各学科问题。平台将具有以下特点：

- AI 驱动的问题解答和作业辅导
- 特定学科的学习模块
- 数学问题和方程式的图像识别
- 教科书和文章的摘要工具
- 具有记忆功能的交互式聊天界面
- 用户认证和学习进度跟踪

## 2. 技术栈

- **运行环境**: Bun
- **前端框架**: Next.js (App Router)
- **UI 组件**: Shadcn UI
- **AI 集成**: Mastra
- **样式**: Tailwind CSS
- **认证**: NextAuth.js / Auth.js
- **数据库**: Supabase (PostgreSQL)
- **部署**: Vercel
- **聊天界面**: @assistant-ui/react 组件库

## 3. 项目结构

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
├── .env                      # 环境变量
├── next.config.js            # Next.js 配置
├── tailwind.config.js        # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 项目依赖
```

## 4. 实施计划

### 阶段 1: 项目设置和基本结构（第 1 周）

1. **初始化项目** ✅
   - 使用 Bun 设置 Next.js 项目 ✅
   - 配置 Shadcn UI ✅
   - 设置 Tailwind CSS ✅
   - 配置 TypeScript ✅
   - 安装 @assistant-ui/react 及相关依赖 ✅

2. **创建基本 UI 组件** ✅
   - 实现布局组件 ✅
   - 创建导航组件 ✅
   - 设计登陆页面 ✅
   - 设置响应式设计 ✅

3. **认证系统**
   - 实现用户注册和登录
   - 使用 NextAuth.js 设置认证
   - 创建用户资料

### 阶段 2: AI 与 Mastra 集成（第 2 周）

1. **设置 Mastra** ✅
   - 使用 OpenAI/Anthropic 配置 Mastra ✅
   - 创建基本 AI 代理 ✅
   - 实现对话历史的记忆系统 ✅

2. **实现聊天界面** ✅
   - 使用 @assistant-ui/react 组件库创建聊天 UI ✅
   - 实现实时流式响应 ✅
   - 添加消息历史和上下文 ✅
   - 集成 @assistant-ui/react-markdown 用于格式化输出 ✅

3. **开发基本工具** ✅
   - 实现问题解答工具 ✅
   - 创建数学问题解算器 ✅
   - 开发文本摘要工具 ✅

### 阶段 3: 特定学科功能（第 3 周）

1. **数学模块**
   - 实现方程式识别
   - 创建逐步问题解决方案
   - 开发交互式数学练习

2. **科学模块**
   - 创建生物、化学和物理部分
   - 实现科学概念解释
   - 开发交互式科学模拟

3. **人文模块**
   - 实现历史和文学部分
   - 创建论文辅助工具
   - 开发语言学习功能

### 阶段 4: 高级功能和优化（第 4 周）

1. **图像识别**
   - 实现问题解决的图像上传
   - 创建文本提取的 OCR
   - 开发手写识别
   - 在 assistant-ui 聊天界面中集成图像处理功能

2. **个性化**
   - 实现用户偏好设置
   - 基于用户进度创建学习路径
   - 开发推荐系统

3. **性能优化**
   - 优化 API 调用
   - 实现缓存策略
   - 提高加载时间
   - 优化 assistant-ui 组件渲染性能

### 阶段 5: 测试和部署（第 5 周）

1. **测试**
   - 进行单元和集成测试
   - 执行用户验收测试
   - 修复错误和问题

2. **部署**
   - 部署到 Vercel
   - 设置 CI/CD 流程
   - 配置生产环境

3. **文档**
   - 创建用户文档
   - 记录代码库
   - 准备维护指南

## 5. 关键功能详情

### AI 聊天界面（使用 assistant-ui）

- 与 AI 导师的实时对话
- 具有记忆功能的上下文感知响应
- 特定学科专业知识
- 文件和图像上传功能
- 编程帮助的代码执行
- 使用 @assistant-ui/react 实现专业聊天界面
- 支持 Markdown 格式化输出
- 聊天历史记录和会话管理

### 问题解决

- 数学问题的逐步解决方案
- 科学问题解释
- 人文问题的历史背景
- 语言翻译和语法检查
- 编程代码辅助

### 学习工具

- 闪卡创建和学习
- 从内容生成测验
- 笔记摘要
- 思维导图创建
- 进度跟踪

### 用户体验

- 个性化仪表板
- 学习进度可视化
- 收藏和保存重要内容
- 暗/亮模式
- 移动响应式设计

## 6. AI 代理配置

### 主导师代理

```typescript
export const tutorAgent = new Agent({
  name: "Lumos 导师",
  instructions: `你是一个教育 AI 导师，旨在帮助学生学习和解决问题。
  根据学生的年级水平和学科调整你的回答。
  提供逐步解释而不仅仅是答案。
  使用例子来说明概念。
  鼓励和支持学生。`,
  model: openai("gpt-4o"),
  memory: tutorMemory,
  tools: {
    mathSolver,
    imageRecognition,
    textSummarizer,
    webSearch,
    codeExecutor
  }
});
```

### 特定学科代理

```typescript
export const mathAgent = new Agent({
  name: "数学导师",
  instructions: `你是一个专业的数学导师...`,
  model: openai("gpt-4o"),
  tools: { mathSolver, equationRenderer }
});

export const scienceAgent = new Agent({
  name: "科学导师",
  instructions: `你是一个专业的科学导师...`,
  model: openai("gpt-4o"),
  tools: { moleculeVisualizer, experimentSimulator }
});

// 其他学科代理...
```

### 聊天界面集成

```typescript
// 在前端使用 assistant-ui 组件
import { AssistantUI, useAssistant } from '@assistant-ui/react';
import { MarkdownRenderer } from '@assistant-ui/react-markdown';
import { mastraClient } from '@/lib/mastra-client';

export function ChatInterface() {
  const agent = mastraClient.getAgent('tutorAgent');

  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    api: {
      sendMessage: async (message) => {
        return await agent.generate(message);
      }
    }
  });

  return (
    <AssistantUI
      messages={messages}
      input={input}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      messageRenderer={MarkdownRenderer}
    />
  );
}
```

## 7. 数据库架构

### 用户表
- id (主键)
- email (邮箱)
- name (姓名)
- created_at (创建时间)
- updated_at (更新时间)
- preferences (偏好设置，JSON)

### 对话表
- id (主键)
- user_id (外键)
- title (标题)
- created_at (创建时间)
- updated_at (更新时间)

### 消息表
- id (主键)
- conversation_id (外键)
- role (角色：用户/助手)
- content (内容)
- created_at (创建时间)

### 用户进度表
- id (主键)
- user_id (外键)
- subject (学科)
- topic (主题)
- proficiency_level (熟练度)
- last_interaction (最后交互时间)

## 8. API 路由

- `/api/auth/*` - 认证端点
- `/api/chat` - AI 交互的聊天 API
- `/api/upload` - 文件上传端点
- `/api/subjects` - 特定学科端点
- `/api/progress` - 用户进度跟踪
- `/api/tools/*` - 教育工具端点
- `/api/assistant-ui/*` - assistant-ui 相关端点

## 9. 部署策略

1. **开发环境**
   - 使用 Bun 进行本地开发
   - 环境变量管理
   - 本地数据库设置

2. **测试环境**
   - Vercel 预览部署
   - 测试数据库
   - 有限的 AI 配额

3. **生产环境**
   - Vercel 生产部署
   - 生产数据库
   - 完整的 AI 功能
   - 监控和分析

## 10. 未来增强功能

- 语音交互功能
- 点对点辅导集成
- 家长/教师仪表板
- 与学校 LMS 平台集成
- 移动应用程序
- 离线功能
- 多语言支持
- 无障碍改进
- 高级 assistant-ui 定制主题

## 11. 成功指标

- 用户参与度（在平台上花费的时间）
- 问题解决成功率
- 用户留存率
- 学习进度指标
- 用户满意度调查
- 性能基准

## 12. 资源和参考

- [Next.js 文档](https://nextjs.org/docs)
- [Shadcn UI 文档](https://ui.shadcn.com)
- [Mastra 文档](https://docs.mastra.ai)
- [Bun 文档](https://bun.sh/docs)
- [Supabase 文档](https://supabase.com/docs)
- [Vercel 文档](https://vercel.com/docs)
- [Assistant UI 文档](https://assistant-ui.com)
- [QuestionAI 参考](https://www.questionai.com)

## 13. 开发日志

### 2024-04-17

- 初始化项目，设置 Next.js、Shadcn UI 和 Tailwind CSS
- 创建基本 UI 组件：Navbar、Footer 和 MainLayout
- 设计响应式首页，包括英雄区、特性展示和号召性用语区域
- 设置 Mastra 客户端配置和基本 AI 代理
- 实现基本聊天界面
- 创建学科和工具页面
- 添加 Playwright 测试配置和测试用例
- 创建项目文档

### 2024-04-18

- 实现对话历史的记忆系统，使用 @mastra/memory 包
- 添加工作记忆功能，用于存储学生信息
- 改进聊天界面，增加时间戳和消息样式
- 添加记忆系统测试用例
- 编写记忆系统文档
