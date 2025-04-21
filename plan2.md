# Lumos Study AI 功能扩展计划

## Mastra 框架概述

Mastra 是一个开源的 TypeScript 代理框架，专为构建 AI 应用和功能而设计。它提供了构建 AI 应用所需的基本组件，包括工作流、代理、RAG、集成、同步和评估。

### 主要功能

- **模型路由**：Mastra 使用 Vercel AI SDK 进行模型路由，提供统一的接口与各种 LLM 提供商交互，包括 OpenAI、Anthropic 和 Google Gemini。
- **代理记忆和工具调用**：使用 Mastra，您可以为代理提供工具（函数）供其调用。您可以持久化代理记忆并根据时间近度、语义相似性或对话线程检索记忆。
- **工作流图**：当您想要以确定性方式执行 LLM 调用时，Mastra 提供了基于图的工作流引擎。您可以定义离散步骤，记录每次运行每个步骤的输入和输出，并将它们输入到可观察性工具中。
- **代理开发环境**：在本地开发代理时，您可以在 Mastra 的代理开发环境中与其聊天并查看其状态和记忆。
- **检索增强生成 (RAG)**：Mastra 提供 API 来处理文档（文本、HTML、Markdown、JSON）并将其分块，创建嵌入并将其存储在向量数据库中。
- **部署**：Mastra 支持将代理和工作流打包到现有的 React、Next.js 或 Node.js 应用程序中，或打包成独立的端点。
- **评估**：Mastra 提供自动化评估指标，使用模型评分、基于规则和统计方法来评估 LLM 输出。

### Mastra 与 AI SDK 的关系

Mastra 利用 Vercel AI SDK 的模型路由、结构化输出和工具调用功能，并在此基础上添加了代理、记忆和工作流等高级功能。Mastra 充当了 AI SDK 之上的一层，帮助团队快速将概念验证转变为生产就绪的应用程序。

### 在项目中使用 Mastra

要在项目中使用 Mastra，需要安装以下依赖项：

```bash
pnpm add @mastra/core @mastra/client-js @ai-sdk/openai
```

然后，您可以创建代理和工具，并将它们集成到您的应用程序中。

本文档详细描述了 Lumos Study 智能教育平台的 AI 功能扩展计划，包括新功能、实现步骤和技术架构。

## 扩展 AI 功能计划

### 1. 个性化学习路径

**目标**：基于用户的学习历史、强项和弱项，创建个性化的学习路径。

**实现步骤**：

1. 创建学习分析系统，跟踪用户的学习活动和表现
2. 开发 AI 模型，分析用户数据并识别知识差距
3. 实现推荐算法，生成个性化学习计划
4. 创建用户界面，展示和管理学习路径

**技术实现**：

```typescript
// src/mastra/agents/learning-path-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 定义学习路径代理
export const learningPathAgent = new Agent({
  name: 'Learning Path Agent',
  instructions: `你是一位教育专家，负责创建个性化学习路径。基于用户的强项和弱项，推荐最适合的学习内容和顺序。

  你的目标是创建一个结构化的学习计划，包括：
  1. 按照逻辑顺序排列的主题列表
  2. 每个主题的学习目标
  3. 每个主题的估计学习时间
  4. 每个主题的优先级（基于学生的弱项）
  5. 学习建议和提示

  请确保你的学习路径是个性化的，充分考虑学生的强项和弱项。`,
  model: openai('gpt-4o'),
});

// src/lib/ai/learning-path.ts
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { learningPathAgent } from '@/mastra/agents/learning-path-agent';

// 定义学习路径的数据结构
const learningPathSchema = z.object({
  topics: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      learningObjectives: z.array(z.string()),
      estimatedTime: z.string(),
      priority: z.number().min(1).max(10),
    })
  ),
  recommendations: z.array(z.string()),
});

export async function generateLearningPath(userId: string, subjectId: string) {
  // 获取用户学习历史
  const userHistory = await prisma.userActivity.findMany({
    where: { userId, subjectId },
    orderBy: { createdAt: 'desc' },
  });

  // 分析用户强项和弱项
  const strengths = analyzeStrengths(userHistory);
  const weaknesses = analyzeWeaknesses(userHistory);

  // 使用 Mastra 代理生成学习路径
  const response = await learningPathAgent.generate([
    {
      role: 'user',
      content: `为这位学生创建一个学习路径。
      学科: ${subjectId}
      强项: ${strengths.join(', ')}
      弱项: ${weaknesses.join(', ')}
      请提供一个结构化的学习计划，包括主题顺序、每个主题的学习目标和估计时间。`,
    }
  ], {
    output: learningPathSchema,
  });

  // 返回结构化的学习路径
  return response.object;
}
```

### 2. 智能辅导系统

**目标**：创建一个能够进行实时辅导的 AI 系统，提供类似人类教师的互动体验。

**实现步骤**：

1. 开发专门的辅导 AI 代理，具有教学技能和策略
2. 实现实时问题诊断和错误分析
3. 创建自适应提示系统，根据用户理解程度调整解释
4. 添加多模态交互，支持语音、图像和文本输入

**技术实现**：

```typescript
// src/mastra/agents/tutor-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { mathTools } from '../tools/math-tools';
import { scienceTools } from '../tools/science-tools';
import { languageTools } from '../tools/language-tools';
import { memoryManager } from '../memory/memory-manager';

export const tutorAgent = new Agent({
  name: 'Tutor Agent',
  instructions: `你是一位经验丰富的教师，专门辅导学生学习各种学科。你的目标是帮助学生理解概念，解决问题，并培养批判性思维。

作为辅导老师，你应该：
1. 诊断学生的理解程度和知识差距
2. 提供清晰、循序渐进的解释
3. 使用苏格拉底式提问法引导学生思考
4. 给予鼓励和建设性反馈
5. 根据学生的反应调整教学方法
6. 提供适当的例子和类比
7. 检查学生的理解并纠正误解

请记住，你的目标不是直接给出答案，而是帮助学生发展解决问题的能力。`,
  model: openai('gpt-4o'),
  tools: {
    ...mathTools,
    ...scienceTools,
    ...languageTools,
  },
  memory: memoryManager.createMemory('tutor'),
});
```

### 3. 多模态内容生成

**目标**：使用 AI 生成多种形式的教育内容，包括图表、图像、交互式练习和模拟。

**实现步骤**：

1. 集成图像生成 API（如 DALL-E 3 或 Midjourney）
2. 开发图表和数据可视化生成系统
3. 创建交互式练习生成器
4. 实现模拟和动画生成功能

**技术实现**：

```typescript
// src/mastra/agents/content-generator-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 定义交互式练习的数据结构
const exerciseSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      type: z.enum(['multiple-choice', 'open-ended']),
      options: z.array(z.string()).optional(),
      answer: z.string(),
      explanation: z.string(),
      hints: z.array(z.string()),
    })
  ),
  topic: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  totalPoints: z.number(),
});

// 创建内容生成代理
export const contentGeneratorAgent = new Agent({
  name: 'Content Generator Agent',
  instructions: `你是一位教育内容创建者，专门设计高质量的教育内容，包括交互式练习、测验和学习资料。

  你的目标是创建清晰、准确、具有教育价值的内容，帮助学生更好地理解和掌握知识。你的内容应该：
  1. 适合目标学生的年龄和知识水平
  2. 包含清晰的指导和解释
  3. 提供适当的挑战性
  4. 遵循教育最佳实践
  5. 具有吸引力和互动性`,
  model: openai('gpt-4o'),
});

// src/lib/ai/content-generator.ts
import { z } from 'zod';
import { contentGeneratorAgent } from '@/mastra/agents/content-generator-agent';

// 图像生成工具函数
export async function generateEducationalImage(prompt: string, style: string) {
  // 注意：图像生成仍然需要使用原生 API，因为 Mastra 当前不直接支持图像生成
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `创建一张教育用途的图像，展示${prompt}。风格：${style}。图像应该清晰、准确、适合学习使用。`,
      n: 1,
      size: "1024x1024",
    }),
  });

  const data = await response.json();
  return data.data[0].url;
}

// 交互式练习生成函数
export async function generateInteractiveExercise(topic: string, difficulty: 'easy' | 'medium' | 'hard') {
  // 使用 Mastra 代理生成交互式练习
  const response = await contentGeneratorAgent.generate([
    {
      role: 'user',
      content: `为以下主题创建一个交互式练习：
      主题: ${topic}
      难度: ${difficulty}

      请提供：
      1. 5个问题，包括多选题和开放式问题
      2. 每个问题的答案
      3. 详细的解释
      4. 提示和线索`,
    }
  ], {
    output: exerciseSchema,
  });

  // 返回结构化的练习数据
  return response.object;
}
```

### 4. 智能评估系统

**目标**：创建 AI 驱动的评估系统，能够评估学生的答案、提供详细反馈并跟踪进步。

**实现步骤**：

1. 开发答案评估算法，支持多种题型
2. 实现详细反馈生成系统
3. 创建进步跟踪和分析工具
4. 设计自适应测试系统，根据学生表现调整难度

**技术实现**：

```typescript
// src/mastra/agents/assessment-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 定义评估结果的数据结构
const evaluationSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  suggestions: z.string(),
  correctParts: z.array(z.string()),
  improvementAreas: z.array(z.string()),
});

// 创建评估代理
export const assessmentAgent = new Agent({
  name: 'Assessment Agent',
  instructions: `你是一位教育评估专家，负责评估学生的答案并提供详细反馈。

  你的目标是提供公正、客观、有建设性的评估，帮助学生理解他们的强项和需要改进的地方。你的评估应该：
  1. 基于提供的评分标准
  2. 识别学生答案中的正确部分
  3. 指出需要改进的地方
  4. 提供具体、可操作的改进建议
  5. 使用鼓励性的语言，即使在指出错误时

  请确保你的评分公正一致，并且反馈具有教育意义。`,
  model: openai('gpt-4o'),
});

// src/lib/ai/assessment.ts
import { prisma } from '@/lib/prisma';
import { assessmentAgent } from '@/mastra/agents/assessment-agent';
import { z } from 'zod';

// 评估结果模式
const evaluationSchema = z.object({
  score: z.number().min(0).max(10),
  feedback: z.string(),
  suggestions: z.string(),
  correctParts: z.array(z.string()),
  improvementAreas: z.array(z.string()),
});

export async function evaluateAnswer(
  questionId: string,
  studentAnswer: string,
  userId: string
) {
  // 获取问题信息
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    include: { correctAnswer: true, rubric: true },
  });

  if (!question) {
    throw new Error('Question not found');
  }

  // 使用 Mastra 代理评估答案
  const response = await assessmentAgent.generate([
    {
      role: 'user',
      content: `评估以下学生答案：
      问题: ${question.content}
      正确答案: ${question.correctAnswer.content}
      评分标准: ${question.rubric.content}
      学生答案: ${studentAnswer}

      请提供：
      1. 分数（满分10分）
      2. 详细反馈，包括正确的部分和需要改进的部分
      3. 改进建议`,
    }
  ], {
    output: evaluationSchema,
  });

  const evaluation = response.object;

  // 保存评估结果
  await prisma.assessment.create({
    data: {
      userId,
      questionId,
      studentAnswer,
      score: evaluation.score,
      feedback: evaluation.feedback,
      suggestions: evaluation.suggestions,
    },
  });

  return evaluation;
}
```

### 5. 协作学习助手

**目标**：创建支持小组学习和协作项目的 AI 助手。

**实现步骤**：

1. 开发小组聊天和协作空间
2. 实现 AI 引导的小组讨论
3. 创建协作项目管理工具
4. 添加同伴评审和反馈系统

**技术实现**：

```typescript
// src/mastra/agents/collaboration-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { collaborationTools } from '../tools/collaboration-tools';
import { memoryManager } from '../memory/memory-manager';

export const collaborationAgent = new Agent({
  name: 'Collaboration Assistant',
  instructions: `你是一位协作学习助手，专门支持学生小组讨论和项目协作。你的目标是促进有效的小组交流，确保所有成员参与，并帮助小组达成共识和完成任务。

作为协作助手，你应该：
1. 引导讨论，确保讨论围绕主题进行
2. 鼓励所有成员发表意见，特别是较少发言的成员
3. 总结讨论要点和不同观点
4. 帮助解决分歧和冲突
5. 提出问题，促进深入思考
6. 提供资源和信息支持
7. 帮助小组制定计划和分配任务
8. 跟踪项目进度并提醒截止日期

请记住，你的角色是引导者而非主导者，应该支持学生自主学习和协作。`,
  model: openai('gpt-4o'),
  tools: collaborationTools,
  memory: memoryManager.createMemory('collaboration'),
});
```

### 6. 多语言支持和文化适应

**目标**：扩展 AI 功能，支持多种语言和适应不同文化背景的学习者。

**实现步骤**：

1. 实现多语言 AI 模型集成
2. 开发文化适应性内容生成
3. 创建语言学习特定工具
4. 添加翻译和语言切换功能

**技术实现**：

```typescript
// src/mastra/agents/language-support-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 定义翻译结果的数据结构
const translationSchema = z.object({
  translatedContent: z.string(),
  notes: z.array(z.string()).optional(),
});

// 定义文化适应结果的数据结构
const culturalAdaptationSchema = z.object({
  adaptedContent: z.string(),
  culturalNotes: z.array(z.string()),
  changedExamples: z.array(z.string()),
});

// 创建语言支持代理
export const languageSupportAgent = new Agent({
  name: 'Language Support Agent',
  instructions: `你是一位语言和文化专家，精通多种语言和文化。你的任务是帮助将教育内容翻译成不同语言，并调整内容以适应不同文化背景的学习者。

  作为翻译师，你应该：
  1. 准确传达原始内容的含义
  2. 保持教育术语的准确性
  3. 考虑目标语言的表达习惯
  4. 保持原始内容的格式和结构

  作为文化适应专家，你应该：
  1. 调整例子和类比以适合目标文化
  2. 替换文化特定的参考和情境
  3. 确保内容在文化上适当且尊重
  4. 考虑目标文化的教育风格和学习偏好

  请确保在进行翻译和文化适应时，保持原始内容的教育目标和核心概念不变。`,
  model: openai('gpt-4o'),
});

// src/lib/ai/language-support.ts
import { languageSupportAgent } from '@/mastra/agents/language-support-agent';
import { z } from 'zod';

const supportedLanguages = [
  'zh-CN', 'en-US', 'es-ES', 'fr-FR', 'de-DE',
  'ja-JP', 'ko-KR', 'ru-RU', 'ar-SA', 'hi-IN'
];

// 翻译结果模式
const translationSchema = z.object({
  translatedContent: z.string(),
  notes: z.array(z.string()).optional(),
});

// 文化适应结果模式
const culturalAdaptationSchema = z.object({
  adaptedContent: z.string(),
  culturalNotes: z.array(z.string()),
  changedExamples: z.array(z.string()),
});

export async function translateContent(
  content: string,
  sourceLanguage: string,
  targetLanguage: string
) {
  if (!supportedLanguages.includes(targetLanguage)) {
    throw new Error(`Language not supported: ${targetLanguage}`);
  }

  // 使用 Mastra 代理进行翻译
  const response = await languageSupportAgent.generate([
    {
      role: 'user',
      content: `请将以下内容从 ${sourceLanguage} 翻译成 ${targetLanguage}，保持原意的同时考虑目标语言的文化背景和表达习惯。

      ${content}

      如果有特定的翻译注意事项，请一并提供。`,
    }
  ], {
    output: translationSchema,
  });

  return response.object.translatedContent;
}

export async function adaptContentForCulture(
  content: string,
  targetCulture: string
) {
  // 使用 Mastra 代理进行文化适应
  const response = await languageSupportAgent.generate([
    {
      role: 'user',
      content: `请调整以下教育内容，使其适合 ${targetCulture} 文化背景的学习者：

      ${content}

      调整应考虑：
      1. 文化相关的例子和类比
      2. 本地化的参考和情境
      3. 文化敏感性和适当性
      4. 教育风格和学习偏好

      请提供调整后的内容，以及文化适应的注释和更改的例子。保持原始内容的教育目标和核心概念不变。`,
    }
  ], {
    output: culturalAdaptationSchema,
  });

  return response.object.adaptedContent;
}
```

### 7. 情感智能和学习动机

**目标**：增强 AI 的情感智能，能够识别和响应学生的情绪状态，提供情感支持和激励。

**实现步骤**：

1. 开发情绪识别系统，分析文本和用户行为
2. 实现个性化激励策略
3. 创建学习动机干预系统
4. 添加情感支持和心理健康资源

**技术实现**：

```typescript
// src/mastra/agents/emotional-intelligence-agent.ts
import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

// 定义情绪分析结果的数据结构
const emotionAnalysisSchema = z.object({
  primaryEmotion: z.string(),
  intensity: z.number().min(1).max(10),
  possibleCauses: z.array(z.string()),
  secondaryEmotions: z.array(z.string()).optional(),
});

// 定义激励消息的数据结构
const motivationalMessageSchema = z.object({
  message: z.string(),
  approach: z.string(),
  focusAreas: z.array(z.string()),
});

// 创建情感智能代理
export const emotionalIntelligenceAgent = new Agent({
  name: 'Emotional Intelligence Agent',
  instructions: `你是一位情感智能和学习动机专家，能够识别情绪状态并提供个性化的支持和激励。

  作为情绪分析师，你应该：
  1. 准确识别文本中表达的情绪
  2. 评估情绪的强度
  3. 分析可能的原因
  4. 识别潜在的次要情绪

  作为学习动机专家，你应该：
  1. 基于学生的情绪状态提供个性化的支持
  2. 考虑学生的学习偏好和动机风格
  3. 提供真诚、支持性且具体的激励
  4. 避免陷入套路和重复的建议

  请确保你的分析和建议是有帮助的，并且尊重学生的情绪状态。`,
  model: openai('gpt-4o'),
});

// src/lib/ai/emotional-intelligence.ts
import { prisma } from '@/lib/prisma';
import { emotionalIntelligenceAgent } from '@/mastra/agents/emotional-intelligence-agent';
import { z } from 'zod';

// 情绪分析结果模式
const emotionAnalysisSchema = z.object({
  primaryEmotion: z.string(),
  intensity: z.number().min(1).max(10),
  possibleCauses: z.array(z.string()),
  secondaryEmotions: z.array(z.string()).optional(),
});

// 激励消息模式
const motivationalMessageSchema = z.object({
  message: z.string(),
  approach: z.string(),
  focusAreas: z.array(z.string()),
});

export async function detectEmotion(text: string) {
  // 使用 Mastra 代理分析情绪
  const response = await emotionalIntelligenceAgent.generate([
    {
      role: 'user',
      content: `分析以下文本中表达的情绪：

      "${text}"

      请提供：
      1. 主要情绪（如：快乐、悲伤、焦虑、困惑、沮丧、兴奋等）
      2. 情绪强度（1-10）
      3. 可能的原因
      4. 次要情绪（如果有的话）`,
    }
  ], {
    output: emotionAnalysisSchema,
  });

  return response.object;
}

export async function generateMotivationalResponse(
  userId: string,
  emotion: string,
  intensity: number,
  context: string
) {
  // 获取用户历史和偏好
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { preferences: true, motivationHistory: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // 使用 Mastra 代理生成激励消息
  const response = await emotionalIntelligenceAgent.generate([
    {
      role: 'user',
      content: `为以下学生生成一条激励消息：

      情绪状态: ${emotion}
      情绪强度: ${intensity}/10
      学习情境: ${context}
      学生偏好: ${user.preferences.motivationStyle}
      历史响应: ${user.motivationHistory.slice(-3).map(h => h.response).join(', ')}

      请提供一条个性化的激励消息，考虑学生的情绪状态和偏好。消息应该真诚、支持性且具体。请也指出你采用的方法和重点关注领域。`,
    }
  ], {
    output: motivationalMessageSchema,
  });

  const motivationalMessage = response.object.message;

  // 保存激励历史
  await prisma.motivationHistory.create({
    data: {
      userId,
      emotion,
      intensity,
      context,
      response: motivationalMessage,
    },
  });

  return motivationalMessage;
}
```

## 实施计划

### 阶段 1：基础扩展（1-2 周）

1. 设计和实现个性化学习路径系统
2. 开发智能辅导代理的基础版本
3. 集成基本的内容生成功能

### 阶段 2：高级功能（2-3 周）

1. 实现智能评估系统
2. 开发协作学习助手
3. 添加多语言支持

### 阶段 3：情感和体验优化（1-2 周）

1. 实现情感智能和学习动机系统
2. 优化用户界面，支持新 AI 功能
3. 进行用户测试和反馈收集

## 技术架构

### 组件图

```
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
| 个性化学习路径系统  |<--->| 用户数据分析引擎    |<--->| 学习内容推荐系统    |
|                     |     |                     |     |                     |
+---------------------+     +---------------------+     +---------------------+
          ^                           ^                           ^
          |                           |                           |
          v                           v                           v
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
| 智能辅导系统        |<--->| Mastra AI 核心      |<--->| 多模态内容生成器    |
|                     |     |                     |     |                     |
+---------------------+     +---------------------+     +---------------------+
          ^                           ^                           ^
          |                           |                           |
          v                           v                           v
+---------------------+     +---------------------+     +---------------------+
|                     |     |                     |     |                     |
| 智能评估系统        |<--->| 协作学习助手        |<--->| 情感智能系统        |
|                     |     |                     |     |                     |
+---------------------+     +---------------------+     +---------------------+
```

### 数据流

1. 用户与平台交互，生成学习数据
2. 数据分析引擎处理用户数据，识别模式和需求
3. AI 系统基于分析结果生成个性化内容和反馈
4. 用户接收 AI 生成的内容，继续学习过程
5. 系统记录用户反应，不断优化 AI 模型

## 文件结构

```
src/
├── lib/
│   └── ai/
│       ├── learning-path.ts      # 个性化学习路径
│       ├── content-generator.ts  # 多模态内容生成
│       ├── assessment.ts         # 智能评估系统
│       ├── language-support.ts   # 多语言支持
│       └── emotional-intelligence.ts # 情感智能
├── mastra/
│   ├── agents/
│   │   ├── tutor-agent.ts        # 智能辅导代理
│   │   └── collaboration-agent.ts # 协作学习助手
│   ├── tools/
│   │   ├── math-tools.ts         # 数学工具
│   │   ├── science-tools.ts      # 科学工具
│   │   ├── language-tools.ts     # 语言工具
│   │   └── collaboration-tools.ts # 协作工具
│   ├── memory/
│   │   └── memory-manager.ts     # 记忆管理系统
│   └── index.ts                # Mastra 初始化
```

## Mastra 工具实现示例

以下是一个数学工具的实现示例：

```typescript
// src/mastra/tools/math-tools.ts
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

// 数学公式求解工具
export const mathSolverTool = createTool({
  id: 'math-solver',
  description: '解决数学问题，包括代数、几何、微积分等',
  inputSchema: z.object({
    problem: z.string().describe('要解决的数学问题'),
    showSteps: z.boolean().default(true).describe('是否显示解题步骤'),
  }),
  execute: async ({ context }, options) => {
    const { problem, showSteps } = context;

    // 实际实现中，这里可以调用数学库或外部 API
    // 这里仅为示例
    const solution = `问题: ${problem}\n解答: x = 5`;
    const steps = showSteps ? `步骤 1: 移项\n步骤 2: 合并\n步骤 3: 求解` : '';

    return {
      solution,
      steps: showSteps ? steps : '',
      result: 'x = 5',
    };
  },
});

// 统计分析工具
export const statisticsAnalysisTool = createTool({
  id: 'statistics-analysis',
  description: '对数据集进行统计分析',
  inputSchema: z.object({
    data: z.array(z.number()).describe('要分析的数据数组'),
    analysisType: z.enum(['basic', 'detailed']).default('basic').describe('分析类型'),
  }),
  execute: async ({ context }) => {
    const { data, analysisType } = context;

    // 计算基本统计量
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const sortedData = [...data].sort((a, b) => a - b);
    const median = sortedData[Math.floor(data.length / 2)];

    const result = {
      mean,
      median,
      min: Math.min(...data),
      max: Math.max(...data),
    };

    // 如果需要详细分析，计算更多统计量
    if (analysisType === 'detailed') {
      const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
      const stdDev = Math.sqrt(variance);

      return {
        ...result,
        variance,
        stdDev,
        quartiles: {
          q1: sortedData[Math.floor(data.length / 4)],
          q3: sortedData[Math.floor(3 * data.length / 4)],
        },
      };
    }

    return result;
  },
});

// 导出所有数学工具
export const mathTools = {
  mathSolver: mathSolverTool,
  statisticsAnalysis: statisticsAnalysisTool,
};
```

## Mastra 记忆系统实现

```typescript
// src/mastra/memory/memory-manager.ts
import { createMemory } from '@mastra/memory';
import { PrismaMemoryStore } from '@mastra/memory/prisma';
import { prisma } from '@/lib/prisma';

// 创建基于 Prisma 的记忆存储
export const memoryStore = new PrismaMemoryStore({
  prisma,
  messageInclude: {
    user: true,
  },
});

// 记忆管理器
export const memoryManager = {
  // 为指定代理创建记忆
  createMemory: (agentName: string) => {
    return createMemory({
      store: memoryStore,
      sessionId: (params) => {
        // 根据用户 ID 和代理名称创建会话 ID
        const userId = params.userId || 'anonymous';
        return `${userId}:${agentName}`;
      },
      // 检索相关记忆的配置
      retrievalConfig: {
        // 最大检索数量
        maxCount: 10,
        // 相似度阈值
        similarityThreshold: 0.7,
        // 按时间近度检索
        timeDecayFactor: 0.01,
      },
    });
  },

  // 清除用户的所有记忆
  clearUserMemory: async (userId: string) => {
    await memoryStore.deleteMessages({
      where: {
        userId,
      },
    });
  },

  // 清除特定会话的记忆
  clearSessionMemory: async (sessionId: string) => {
    await memoryStore.deleteMessages({
      where: {
        sessionId,
      },
    });
  },
};
```

## Mastra 初始化

```typescript
// src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core/logger';

import { tutorAgent } from './agents/tutor-agent';
import { collaborationAgent } from './agents/collaboration-agent';

export const mastra = new Mastra({
  agents: {
    tutorAgent,
    collaborationAgent
  },
  logger: createLogger({ name: 'LumosStudy', level: 'info' }),
  serverMiddleware: [
    {
      handler: (c, next) => {
        console.log('Request received:', c.req.url);
        return next();
      },
    },
  ],
});
```

## 数据库扩展

需要在 Prisma 模式中添加以下新模型：

```prisma
// prisma/schema.prisma

model UserActivity {
  id        String   @id @default(cuid())
  userId    String
  subjectId String
  topicId   String?
  action    String   // 'view', 'complete', 'answer', etc.
  score     Float?
  duration  Int?     // in seconds
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}

model Assessment {
  id            String   @id @default(cuid())
  userId        String
  questionId    String
  studentAnswer String   @db.Text
  score         Float
  feedback      String   @db.Text
  suggestions   String   @db.Text
  createdAt     DateTime @default(now())

  user          User     @relation(fields: [userId], references: [id])
  question      Question @relation(fields: [questionId], references: [id])
}

model Question {
  id            String   @id @default(cuid())
  content       String   @db.Text
  type          String   // 'multiple-choice', 'open-ended', etc.
  difficulty    String   // 'easy', 'medium', 'hard'
  subjectId     String
  topicId       String?
  createdAt     DateTime @default(now())

  correctAnswer CorrectAnswer?
  rubric        Rubric?
  assessments   Assessment[]
}

model CorrectAnswer {
  id         String   @id @default(cuid())
  questionId String   @unique
  content    String   @db.Text

  question   Question @relation(fields: [questionId], references: [id])
}

model Rubric {
  id         String   @id @default(cuid())
  questionId String   @unique
  content    String   @db.Text

  question   Question @relation(fields: [questionId], references: [id])
}

model UserPreferences {
  id               String  @id @default(cuid())
  userId           String  @unique
  language         String  @default("en-US")
  culture          String?
  motivationStyle  String  @default("balanced") // 'positive', 'challenge', 'balanced'
  learningStyle    String  @default("visual")   // 'visual', 'auditory', 'reading', 'kinesthetic'

  user             User    @relation(fields: [userId], references: [id])
}

model MotivationHistory {
  id        String   @id @default(cuid())
  userId    String
  emotion   String
  intensity Int
  context   String
  response  String   @db.Text
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}

// 扩展现有的 User 模型
model User {
  // 现有字段...

  activities        UserActivity[]
  assessments       Assessment[]
  preferences       UserPreferences?
  motivationHistory MotivationHistory[]
}
```

## 客户端集成示例

### 使用 Mastra 客户端

Mastra 提供了客户端库 `@mastra/client-js`，可以用于从前端应用程序与 Mastra 代理进行交互。以下是一个使用示例：

```typescript
// src/lib/mastra-client.ts
import { MastraClient } from '@mastra/client-js';

// 创建 Mastra 客户端实例
export const mastraClient = new MastraClient({
  baseUrl: process.env.MASTRA_API_URL || 'http://localhost:4111',
  apiKey: process.env.MASTRA_API_KEY,
});
```

### 使用 AI SDK 的 useChat 钩子

Mastra 与 AI SDK 的 React 钩子兼容，可以使用 `useChat` 来创建聊天界面：

```tsx
// app/chat/page.tsx
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const [userId, setUserId] = useState('user-123');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    id: userId,
    body: {
      userId,
    },
    onResponse: (response) => {
      // 可以在这里处理响应元数据
      console.log('Response headers:', response.headers.get('X-Agent-Info'));
    },
    onFinish: (message) => {
      console.log('Chat finished:', message);
    },
  });

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">智能学习助手</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 border rounded-lg p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%]`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">正在思考...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="输入你的问题..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          发送
        </button>
      </form>
    </div>
  );
}
```

### 服务器端 API 路由

在服务器端，您可以创建 API 路由来处理客户端请求并与 Mastra 代理交互：

```tsx
// app/api/chat/route.ts
import { mastra } from '@/mastra';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { messages, userId, agentType = 'tutor' } = await req.json();

  // 根据请求类型选择不同的代理
  let agent;
  switch (agentType) {
    case 'tutor':
      agent = mastra.agents.tutorAgent;
      break;
    case 'collaboration':
      agent = mastra.agents.collaborationAgent;
      break;
    case 'content':
      agent = mastra.agents.contentGeneratorAgent;
      break;
    case 'assessment':
      agent = mastra.agents.assessmentAgent;
      break;
    case 'language':
      agent = mastra.agents.languageSupportAgent;
      break;
    case 'emotion':
      agent = mastra.agents.emotionalIntelligenceAgent;
      break;
    default:
      agent = mastra.agents.tutorAgent;
  }

  // 创建流式响应
  const stream = await agent.stream(messages, {
    // 传递用户 ID 给记忆系统
    userId,
    // 允许多步骤工具调用
    maxSteps: 5,
    // 每步完成时的回调
    onStepFinish: ({ text, toolCalls }) => {
      console.log(`Step completed: ${toolCalls?.length || 0} tool calls`);
    },
  });

  // 返回流式响应
  return stream.toDataStreamResponse();
}
```

### 使用结构化输出

您可以使用 Zod 模式来定义结构化输出：

```tsx
// app/api/structured/route.ts
import { mastra } from '@/mastra';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// 定义各种结构化输出模式
const recipeSchema = z.object({
  title: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  prepTime: z.number(),
  cookTime: z.number(),
});

const learningPathSchema = z.object({
  topics: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      learningObjectives: z.array(z.string()),
      estimatedTime: z.string(),
      priority: z.number().min(1).max(10),
    })
  ),
  recommendations: z.array(z.string()),
});

const emotionAnalysisSchema = z.object({
  primaryEmotion: z.string(),
  intensity: z.number().min(1).max(10),
  possibleCauses: z.array(z.string()),
  secondaryEmotions: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  const { prompt, type, userId, subjectId, text } = await req.json();

  // 根据请求类型选择不同的代理和模式
  let agent;
  let schema;
  let messages = [];

  switch (type) {
    case 'recipe':
      agent = mastra.agents.contentGeneratorAgent;
      schema = recipeSchema;
      messages = [
        {
          role: 'user',
          content: `请创建一个食谱： ${prompt}`,
        }
      ];
      break;

    case 'learning-path':
      agent = mastra.agents.learningPathAgent;
      schema = learningPathSchema;
      messages = [
        {
          role: 'user',
          content: `为学科 ${subjectId} 创建一个学习路径。\n${prompt}`,
        }
      ];
      break;

    case 'emotion-analysis':
      agent = mastra.agents.emotionalIntelligenceAgent;
      schema = emotionAnalysisSchema;
      messages = [
        {
          role: 'user',
          content: `分析以下文本中表达的情绪：\n"${text}"`,
        }
      ];
      break;

    default:
      return Response.json({ error: 'Invalid type' }, { status: 400 });
  }

  // 生成结构化输出
  const result = await agent.generate(messages, {
    output: schema,
    userId,
  });

  return Response.json(result.object);
}
```

### 客户端工具调用

您可以在客户端实现工具调用：

```tsx
// app/chat/page.tsx
'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';

export default function ChatPage() {
  const [userId, setUserId] = useState('user-123');
  const [agentType, setAgentType] = useState('tutor');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: {
      userId,
      agentType,
    },
    onToolCall: async (toolCall) => {
      // 处理工具调用
      switch (toolCall.name) {
        case 'searchWeather':
          const { location } = toolCall.arguments;
          // 实现天气搜索逻辑
          const weatherData = await fetchWeather(location);
          return weatherData;

        case 'searchSubject':
          const { subjectName } = toolCall.arguments;
          // 实现学科搜索逻辑
          const subjectData = await fetchSubject(subjectName);
          return subjectData;

        case 'calculateMath':
          const { expression } = toolCall.arguments;
          // 实现数学计算逻辑
          const result = evaluateMathExpression(expression);
          return { result };

        case 'generateImage':
          const { prompt, style } = toolCall.arguments;
          // 调用图像生成 API
          const imageUrl = await generateImage(prompt, style);
          return { url: imageUrl };

        default:
          return null;
      }
    },
  });

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <div className="mb-4 flex space-x-2">
        <select
          value={agentType}
          onChange={(e) => setAgentType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="tutor">辅导助手</option>
          <option value="collaboration">协作助手</option>
          <option value="content">内容生成器</option>
          <option value="emotion">情感支持</option>
          <option value="language">语言助手</option>
        </select>
      </div>

      <h1 className="text-2xl font-bold mb-4">智能学习助手</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 border rounded-lg p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%]`}
          >
            <p>{message.content}</p>
          </div>
        ))}
        {isLoading && <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">正在思考...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="输入你的问题..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          发送
        </button>
      </form>
    </div>
  );
}
```
```

## Mastra 初始化和集成

为了将所有 AI 功能集成到一个统一的系统中，我们需要创建一个 Mastra 实例，并注册所有的代理和工具：

```typescript
// src/mastra/index.ts
import { Mastra } from '@mastra/core';
import { createLogger } from '@mastra/core/logger';

// 导入所有代理
import { tutorAgent } from './agents/tutor-agent';
import { collaborationAgent } from './agents/collaboration-agent';
import { learningPathAgent } from './agents/learning-path-agent';
import { contentGeneratorAgent } from './agents/content-generator-agent';
import { assessmentAgent } from './agents/assessment-agent';
import { languageSupportAgent } from './agents/language-support-agent';
import { emotionalIntelligenceAgent } from './agents/emotional-intelligence-agent';

// 导入工具
import { mathTools } from './tools/math-tools';
import { scienceTools } from './tools/science-tools';
import { languageTools } from './tools/language-tools';
import { collaborationTools } from './tools/collaboration-tools';

// 创建 Mastra 实例
export const mastra = new Mastra({
  agents: {
    tutorAgent,
    collaborationAgent,
    learningPathAgent,
    contentGeneratorAgent,
    assessmentAgent,
    languageSupportAgent,
    emotionalIntelligenceAgent
  },
  logger: createLogger({ name: 'LumosStudy', level: 'info' }),
  serverMiddleware: [
    {
      handler: (c, next) => {
        console.log('Request received:', c.req.url);
        return next();
      },
    },
  ],
});
```

这个中央 Mastra 实例将管理所有的 AI 代理和工具，并提供一个统一的接口来与它们交互。在应用程序的任何部分，您都可以导入这个 Mastra 实例并使用它来访问代理和工具。

## 环境变量配置

为了正确配置 Mastra 和 AI 功能，需要设置以下环境变量：

```env
# OpenAI API 配置
OPENAI_API_KEY=your-openai-api-key

# Mastra 配置
MASTRA_API_URL=https://api.mastra.ai
MASTRA_API_KEY=your-mastra-api-key
```

## 后续计划

完成这些 AI 功能扩展后，我们将继续：

1. 收集用户反馈，迭代改进 AI 功能
2. 探索更高级的 AI 模型和技术
3. 扩展到更多学科和教育领域
4. 开发移动应用，提供随时随地的学习体验
5. 建立教育机构合作伙伴关系，扩大平台影响力
