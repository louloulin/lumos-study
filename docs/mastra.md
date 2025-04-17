# Lumos Study Mastra 集成文档

本文档提供了 Lumos Study 项目中 Mastra AI 集成的详细说明。

## Mastra 概述

[Mastra](https://docs.mastra.ai) 是一个强大的 AI 开发框架，用于构建、部署和监控 AI 应用程序。在 Lumos Study 项目中，我们使用 Mastra 来创建 AI 代理，处理自然语言交互，并提供智能学习体验。

## 安装和设置

### 依赖安装

Lumos Study 使用以下 Mastra 相关包：

```bash
bun add @mastra/client-js @mastra/core @ai-sdk/openai
```

### 客户端配置

Mastra 客户端配置位于 `src/lib/mastra-client.ts`：

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

// Export a function to get the client
export function getMastraClient() {
  return mastraClient;
}
```

### 环境变量

确保在 `.env.local` 文件中设置以下环境变量：

```
OPENAI_API_KEY=your_openai_api_key
```

## AI 代理

### 导师代理

导师代理是 Lumos Study 的主要 AI 代理，用于回答学生问题和提供学习指导。

**位置**: `src/mastra/agents/tutor-agent.ts`

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

// Export the agent
export default tutorAgent;
```

### 使用代理

在前端组件中使用 AI 代理：

```typescript
import tutorAgent from '@/mastra/agents/tutor-agent';

// 在组件中使用
const response = await tutorAgent.generate('如何解二次方程？');
```

## 聊天界面集成

### 使用 assistant-ui

Lumos Study 使用 `@assistant-ui/react` 组件库创建聊天界面，并与 Mastra 代理集成。

**位置**: `src/components/features/chat/ChatInterface.tsx`

```typescript
'use client';

import { useState } from 'react';
import { AssistantUI, useAssistant } from '@assistant-ui/react';
import { MarkdownRenderer } from '@assistant-ui/react-markdown';
import { getMastraClient } from '@/lib/mastra-client';

export function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    api: {
      sendMessage: async (message) => {
        setIsLoading(true);
        try {
          // 在实际实现中，这将使用 Mastra 客户端生成响应
          await new Promise(resolve => setTimeout(resolve, 1000));
          return `这是对"${message}"的回复。在实际实现中，这将使用 Mastra 客户端生成响应。`;
        } catch (error) {
          console.error('Error sending message:', error);
          return '发生错误，请稍后再试。';
        } finally {
          setIsLoading(false);
        }
      }
    }
  });

  return (
    <AssistantUI
      messages={messages}
      input={input}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      messageRenderer={MarkdownRenderer}
      placeholder="输入您的问题..."
      sendButtonText="发送"
      className="h-full"
    />
  );
}
```

## 记忆系统

### 设置记忆

为了实现对话历史的记忆系统，我们可以使用 Mastra 的记忆功能：

```typescript
import { Agent } from '@mastra/core';
import { openai } from '@ai-sdk/openai';
import { createMemory } from '@mastra/memory';

// 创建记忆实例
const tutorMemory = createMemory({
  type: 'buffer',
  maxMessages: 10,
});

// 创建带有记忆的代理
export const tutorAgent = new Agent({
  name: "Lumos 导师",
  instructions: `你是一个教育 AI 导师...`,
  model: openai({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
  }),
  memory: tutorMemory,
});
```

## 自定义工具

### 创建工具

Mastra 允许创建自定义工具来扩展 AI 代理的功能：

```typescript
import { createTool } from '@mastra/core';

// 创建数学解算器工具
export const mathSolver = createTool({
  name: 'mathSolver',
  description: '解决数学问题并提供详细步骤',
  parameters: {
    type: 'object',
    properties: {
      problem: {
        type: 'string',
        description: '要解决的数学问题',
      },
    },
    required: ['problem'],
  },
  handler: async ({ problem }) => {
    // 实现数学问题解决逻辑
    return `问题: ${problem}\n解答: ...`;
  },
});

// 在代理中使用工具
export const tutorAgent = new Agent({
  name: "Lumos 导师",
  instructions: `你是一个教育 AI 导师...`,
  model: openai({
    apiKey: process.env.OPENAI_API_KEY || '',
    model: 'gpt-4o',
  }),
  tools: {
    mathSolver,
  },
});
```

## 流式响应

### 实现流式响应

为了提供更好的用户体验，我们可以实现流式响应：

```typescript
import { useAssistant } from '@assistant-ui/react';
import tutorAgent from '@/mastra/agents/tutor-agent';

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    api: {
      sendMessage: async (message, { onProgress }) => {
        const stream = await tutorAgent.generateStream(message);
        
        let fullResponse = '';
        for await (const chunk of stream) {
          fullResponse += chunk;
          onProgress?.(fullResponse);
        }
        
        return fullResponse;
      }
    }
  });
  
  // 组件渲染...
}
```

## 最佳实践

### 性能优化

- 使用流式响应减少感知延迟
- 实现缓存机制减少重复请求
- 优化提示工程以获得更好的响应

### 错误处理

- 实现适当的错误处理和重试机制
- 提供用户友好的错误消息
- 记录错误以便调试

### 安全考虑

- 保护 API 密钥和敏感信息
- 实现内容过滤和安全检查
- 遵循 AI 伦理准则

## 进阶功能

### 多代理系统

为不同学科创建专门的代理：

```typescript
// 数学代理
export const mathAgent = new Agent({
  name: "数学导师",
  instructions: `你是一个专业的数学导师...`,
  model: openai({ model: 'gpt-4o' }),
  tools: { mathSolver },
});

// 科学代理
export const scienceAgent = new Agent({
  name: "科学导师",
  instructions: `你是一个专业的科学导师...`,
  model: openai({ model: 'gpt-4o' }),
  tools: { experimentSimulator },
});
```

### 代理网络

创建协作的代理网络：

```typescript
import { AgentNetwork } from '@mastra/core';

export const educationNetwork = new AgentNetwork({
  agents: {
    tutor: tutorAgent,
    math: mathAgent,
    science: scienceAgent,
  },
  defaultAgent: 'tutor',
});
```

## 故障排除

### 常见问题

- API 密钥错误：确保环境变量正确设置
- 响应超时：检查网络连接和 API 限制
- 内容过滤：调整提示以避免触发内容过滤器

### 调试技巧

- 使用 `console.log` 记录请求和响应
- 检查 API 调用的状态码和错误消息
- 使用 Mastra 的调试工具分析代理行为
