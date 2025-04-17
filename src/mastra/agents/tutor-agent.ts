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
