# Lumos Study 记忆系统文档

本文档描述了 Lumos Study 智能教育平台中实现的记忆系统，该系统使用 Mastra 的记忆功能来维护对话历史和上下文。

## 概述

记忆系统是 AI 教育平台的核心组件，它使 AI 导师能够记住与学生的对话历史，从而提供连贯的帮助和个性化的学习体验。Lumos Study 使用 Mastra 的记忆系统来实现这一功能。

## 实现细节

### 记忆配置

记忆系统使用 `@mastra/memory` 包中的 `Memory` 类进行配置：

```typescript
import { Memory } from '@mastra/memory';

// 创建记忆实例
const tutorMemory = new Memory({
  options: {
    lastMessages: 20, // 保存最近的 20 条消息
    workingMemory: {
      enabled: true,
      template: `# 学生信息
- **年级水平**:
- **感兴趣的学科**:
- **学习目标**:
- **学习偏好**:
`,
    },
  },
});
```

### 工作记忆

工作记忆是一种持久化的记忆形式，用于存储关于学生的重要信息，如年级水平、感兴趣的学科、学习目标和学习偏好。这些信息在整个对话过程中都可用，并且可以随时更新。

工作记忆使用 Markdown 格式存储，这使得信息结构化且易于阅读。

### 对话线程

每个学生的对话都在一个独立的线程中进行，这使得系统能够为不同的学生维护不同的上下文：

```typescript
// 创建一个新的对话线程
useEffect(() => {
  const createThread = async () => {
    try {
      // 在实际实现中，这将使用 Mastra 的记忆系统创建一个新线程
      const newThreadId = `thread-${Math.random().toString(36).substring(2, 9)}`;
      setThreadId(newThreadId);
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };
  
  if (!threadId) {
    createThread();
  }
}, [threadId]);
```

### 消息处理

聊天界面组件处理消息的发送和接收，并使用线程 ID 来维护对话上下文：

```typescript
const handleSubmit = async () => {
  if (!input.trim() || !threadId) return;
  
  // 创建用户消息
  const userMessage: Message = { 
    id: `msg-${Date.now()}`, 
    role: 'user', 
    content: input,
    timestamp: new Date()
  };
  
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsLoading(true);
  
  try {
    // 使用 Mastra 代理生成响应
    const response = await simulateMastraResponse(input, threadId);
    
    const assistantMessage: Message = { 
      id: `msg-${Date.now()}`, 
      role: 'assistant', 
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);
  } catch (error) {
    console.error('Error sending message:', error);
    // 错误处理...
  } finally {
    setIsLoading(false);
  }
};
```

## 使用 Mastra 代理

Lumos Study 使用 Mastra 的 `Agent` 类创建 AI 导师代理，并将记忆系统与代理集成：

```typescript
import { Agent } from '@mastra/core';
import { openai } from '@ai-sdk/openai';
import { Memory } from '@mastra/memory';

// 创建记忆实例
const tutorMemory = new Memory({
  options: {
    lastMessages: 20,
    workingMemory: {
      enabled: true,
      template: `# 学生信息...`,
    },
  },
});

// 创建带有记忆的导师代理
export const tutorAgent = new Agent({
  name: "Lumos 导师",
  instructions: `你是一个教育 AI 导师，旨在帮助学生学习和解决问题。
  根据学生的年级水平和学科调整你的回答。
  提供逐步解释而不仅仅是答案。
  使用例子来说明概念。
  鼓励和支持学生。
  记得之前的对话，以便提供连贯的帮助。
  当你了解到学生的信息时，请更新工作记忆。`,
  model: openai('gpt-4o'),
  memory: tutorMemory,
});
```

## 测试

记忆系统的测试包括：

1. **基本功能测试**：验证聊天界面的基本元素和功能
2. **对话测试**：验证消息的发送和接收
3. **记忆测试**：验证系统能够维护对话上下文

```typescript
test('chat memory system maintains conversation context', async ({ page }) => {
  await page.goto('/chat');

  // 第一条关于数学的消息
  await page.getByPlaceholder('输入您的问题...').fill('我需要数学帮助');
  await page.getByRole('button', { name: '发送' }).click();
  
  // 等待响应
  await expect(page.getByText('数学是一门非常有趣的学科')).toBeVisible({ timeout: 5000 });
  
  // 后续问题
  await page.getByPlaceholder('输入您的问题...').fill('我需要帮助解决二次方程');
  await page.getByRole('button', { name: '发送' }).click();
  
  // 检查对话是否保持了关于数学的上下文
  await expect(page.getByText('数学')).toBeVisible({ timeout: 5000 });
});
```

## 未来改进

1. **持久化存储**：实现数据库存储，使对话历史在会话之间保持
2. **语义搜索**：添加语义搜索功能，使 AI 能够检索相关的历史对话
3. **多用户支持**：实现用户认证和多用户支持，为每个用户维护独立的记忆
4. **记忆摘要**：实现长对话的自动摘要，以减少上下文长度
5. **记忆可视化**：为用户提供查看和编辑其记忆的界面
