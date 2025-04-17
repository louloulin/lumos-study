import { Agent } from '@mastra/core';
import { openai } from '@ai-sdk/openai';
import { Memory } from '@mastra/memory';

// Create memory instance
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

// Create a basic tutor agent with memory
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
  memory: tutorMemory, // 添加记忆系统
});

// Export the agent
export default tutorAgent;
