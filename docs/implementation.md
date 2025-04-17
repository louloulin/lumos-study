# Lumos Study 实现文档

本文档记录了 Lumos Study 智能教育平台的实现过程和关键功能。

## 已实现功能

### 1. 项目初始化和基本设置

- 使用 Bun 设置 Next.js 项目
- 配置 Shadcn UI 和 Tailwind CSS
- 设置 TypeScript
- 安装 @assistant-ui/react 及相关依赖

### 2. 基本 UI 组件

- **Navbar 组件**：实现顶部导航栏，包含首页、学科、AI 聊天和学习工具链接
- **Footer 组件**：实现页脚，包含链接和版权信息
- **MainLayout 组件**：创建主布局，包含 Navbar 和 Footer
- **响应式设计**：使用 Tailwind CSS 实现响应式布局，适配不同设备

### 3. 页面实现

- **首页**：设计包含英雄区、特性展示和号召性用语区域的响应式首页
- **聊天页面**：实现基本聊天界面，支持消息发送和接收
- **学科页面**：展示不同学习学科，包括数学、科学、语言和人文
- **工具页面**：展示学习工具，包括文本摘要工具、数学问题解算器、图像识别和闪卡学习

### 4. AI 与 Mastra 集成

- 设置 Mastra 客户端配置
- 创建基本的 AI 导师代理
- 实现聊天界面与 Mastra 的基本集成

### 5. 测试

- 创建 Playwright 测试配置
- 编写首页、聊天页面、学科页面和工具页面的测试用例

### 6. 文档

- 创建项目文档结构
- 编写项目概述、开发指南和组件文档

## 实现细节

### 主要组件结构

```
src/
├── app/                      # Next.js App Router
│   ├── chat/                 # AI 聊天界面
│   ├── subjects/             # 特定学科页面
│   ├── tools/                # 教育工具
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── components/               # UI 组件
│   ├── features/             # 特定功能组件
│   │   └── chat/             # 聊天相关组件
│   └── shared/               # 共享组件
│       ├── Footer.tsx        # 页脚组件
│       ├── MainLayout.tsx    # 主布局组件
│       └── Navbar.tsx        # 导航栏组件
├── lib/                      # 实用函数
│   ├── mastra-client.ts      # Mastra 客户端配置
│   └── utils.ts              # 通用工具
└── mastra/                   # Mastra 配置
    └── agents/               # AI 代理
        └── tutor-agent.ts    # 导师代理
```

### 聊天界面实现

聊天界面使用 React 的状态管理实现了基本的消息发送和接收功能：

```tsx
export function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  
  const handleInputChange = (value: string) => {
    setInput(value);
  };
  
  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = { 
        role: 'assistant' as const, 
        content: `这是对"${input}"的回复。在实际实现中，这将使用 Mastra 客户端生成响应。` 
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant' as const, 
        content: '发生错误，请稍后再试。' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
}
```

### Mastra 客户端配置

Mastra 客户端配置使用 OpenAI 的 GPT-4o 模型：

```typescript
import { createClient } from '@mastra/client-js';
import { openai } from '@ai-sdk/openai';

// Create a Mastra client instance
export const mastraClient = createClient({
  apiKey: process.env.OPENAI_API_KEY || '',
  llm: openai({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
  }),
});
```

### 导师代理实现

导师代理使用 Mastra 的 Agent 类实现：

```typescript
import { Agent } from '@mastra/core';
import { openai } from '@ai-sdk/openai';

// Create a basic tutor agent
export const tutorAgent = new Agent({
  name: "Lumos 导师",
  instructions: `你是一个教育 AI 导师，旨在帮助学生学习和解决问题。
  根据学生的年级水平和学科调整你的回答。
  提供逐步解释而不仅仅是答案。
  使用例子来说明概念。
  鼓励和支持学生。`,
  model: openai({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
  }),
});
```

## 下一步计划

1. **认证系统**
   - 实现用户注册和登录
   - 使用 NextAuth.js 设置认证
   - 创建用户资料

2. **对话历史的记忆系统**
   - 实现 Mastra 记忆功能
   - 保存和加载聊天历史

3. **特定学科功能**
   - 实现数学模块
   - 实现科学模块
   - 实现人文模块

4. **高级功能**
   - 实现图像识别
   - 添加个性化功能
   - 优化性能

## 测试结果

目前已经编写了基本的 Playwright 测试用例，但需要进一步完善和修复。测试覆盖了以下方面：

- 首页标题和内容
- 导航链接
- 聊天界面元素和功能
- 学科页面内容
- 工具页面内容

## 已知问题

1. 聊天界面需要与 Mastra 进行实际集成
2. 测试用例需要更新以适应当前的实现
3. 需要添加环境变量配置 OpenAI API 密钥
