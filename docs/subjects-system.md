# Lumos Study 特定学科功能文档

本文档描述了 Lumos Study 智能教育平台中实现的特定学科功能，包括数学、科学、语言和人文学科。

## 概述

特定学科功能是 AI 教育平台的核心组件，它为学生提供结构化的学习内容和交互式学习体验。Lumos Study 实现了多个学科模块，每个模块包含多个主题，每个主题包含详细的学习内容。

## 数据模型

特定学科功能使用以下数据模型：

```typescript
// 主题类型定义
export interface Topic {
  id: string;
  title: string;
  description: string;
  level: 'basic' | 'intermediate' | 'advanced';
  content?: string;
}

// 学科类型定义
export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}
```

## 学科模块

### 数学模块

数学模块包含以下主题：

- **代数**：学习代数基础、方程式和函数
- **几何**：学习平面几何和空间几何
- **微积分**：学习导数、积分和微分方程

每个主题包含详细的学习内容，使用 Markdown 格式编写，包括概念解释、公式、例题和练习。

### 科学模块

科学模块包含以下主题：

- **物理**：学习力学、电磁学和热力学
- **化学**：学习元素、化合物和化学反应
- **生物学**：学习细胞、遗传和生态系统

科学模块的内容包括科学概念解释、实验指导和交互式科学模拟。

### 语言模块

语言模块包含以下主题：

- **中文**：学习中文语法、阅读和写作
- **英语**：学习英语语法、词汇和会话
- **文学**：学习文学作品、文学理论和写作技巧

语言模块的内容包括语法规则、词汇学习、阅读理解和写作指导。

### 人文模块

人文模块包含以下主题：

- **历史**：学习中国历史和世界历史
- **地理**：学习自然地理和人文地理
- **政治**：学习政治理论、法律和国际关系

人文模块的内容包括历史事件、地理知识、政治理论和社会科学概念。

## 页面和组件

### 学科页面

学科页面 (`/subjects`) 显示所有可用的学科，每个学科以卡片形式展示，包括学科名称、描述、图标和主题数量。

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {subjects.map((subject) => (
    <div key={subject.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${subject.color} text-3xl mb-4`}>
        {subject.icon}
      </div>
      <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
      <p className="text-gray-600 mb-4">{subject.description}</p>
      <div className="flex justify-between items-center">
        <Link 
          href={`/subjects/${subject.id}`}
          className="text-blue-600 hover:underline"
        >
          浏览 {subject.name} →
        </Link>
        <span className="text-sm text-gray-500">{subject.topics.length} 个主题</span>
      </div>
    </div>
  ))}
</div>
```

### 学科详情页面

学科详情页面 (`/subjects/[subjectId]`) 显示特定学科的详细信息，包括学科名称、描述、图标和主题列表。页面分为两部分：侧边栏和内容区域。

```tsx
<div className="flex flex-col md:flex-row gap-8">
  <div className="md:w-1/4">
    <SubjectSidebar subject={subject} />
  </div>
  
  <div className="md:w-3/4">
    <SubjectContent subject={subject} />
  </div>
</div>
```

### 主题详情页面

主题详情页面 (`/subjects/[subjectId]/[topicId]`) 显示特定主题的详细信息，包括主题名称、描述、难度级别和内容。页面同样分为侧边栏和内容区域。

```tsx
<div className="flex flex-col md:flex-row gap-8">
  <div className="md:w-1/4">
    <SubjectSidebar subject={subject} />
  </div>
  
  <div className="md:w-3/4">
    <TopicContent subject={subject} topic={topic} />
  </div>
</div>
```

### 学科侧边栏组件

学科侧边栏组件 (`SubjectSidebar`) 显示学科的主题列表，按难度级别分组（基础、中级、高级）。当前选中的主题会高亮显示。

```tsx
<div className="bg-white rounded-lg shadow-md p-4">
  <h2 className="text-xl font-bold mb-4">主题列表</h2>
  
  {basicTopics.length > 0 && (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">基础</h3>
      <ul className="space-y-1">
        {basicTopics.map(topic => (
          <li key={topic.id}>
            <Link
              href={`/subjects/${subject.id}/${topic.id}`}
              className={cn(
                'block px-3 py-2 rounded-md text-sm',
                currentTopicId === topic.id
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {topic.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )}
  
  {/* 中级和高级主题类似 */}
</div>
```

### 学科内容组件

学科内容组件 (`SubjectContent`) 显示学科的概览信息，包括学科名称、描述、图标和学习路径。学习路径按难度级别分组，显示每个主题的卡片。

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <div className="flex justify-between items-start mb-6">
    <div>
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${subject.color} text-2xl mb-4`}>
        {subject.icon}
      </div>
      <h2 className="text-2xl font-bold">{subject.name}</h2>
      <p className="text-gray-600 mt-1">{subject.description}</p>
    </div>
    
    <AskAIButton subject={subject.name} />
  </div>
  
  <SubjectOverview subject={subject} />
</div>
```

### 主题内容组件

主题内容组件 (`TopicContent`) 显示主题的详细内容，包括主题名称、描述、难度级别和 Markdown 格式的内容。如果主题没有内容，会显示一个提示，建议用户向 AI 导师询问。

```tsx
<div className="bg-white rounded-lg shadow-md p-6">
  <div className="flex justify-between items-start mb-6">
    <div>
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${subject.color} text-2xl mb-4`}>
        {subject.icon}
      </div>
      <h2 className="text-2xl font-bold">{topic.title}</h2>
      <p className="text-gray-600 mt-1">{topic.description}</p>
      <div className="mt-2">
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
          topic.level === 'basic' 
            ? 'bg-green-100 text-green-800' 
            : topic.level === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
        }`}>
          {topic.level === 'basic' 
            ? '基础' 
            : topic.level === 'intermediate'
              ? '中级'
              : '高级'}
        </span>
      </div>
    </div>
    
    <AskAIButton subject={`${subject.name} - ${topic.title}`} />
  </div>
  
  <div className="border-t pt-6 mt-6">
    {topic.content ? (
      <div className="prose prose-blue max-w-none">
        <ReactMarkdown>{topic.content}</ReactMarkdown>
      </div>
    ) : (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">该主题的内容正在开发中...</p>
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => window.location.href = `/chat?question=请介绍${topic.title}的基本知识&subject=${subject.name}`}
        >
          向 AI 导师了解更多
        </button>
      </div>
    )}
  </div>
</div>
```

### "询问 AI"按钮组件

"询问 AI"按钮组件 (`AskAIButton`) 允许用户向 AI 导师提问关于特定学科或主题的问题。点击按钮会显示一个弹出框，用户可以输入问题，然后被重定向到聊天页面，带上问题和学科参数。

```tsx
<div className="relative">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    询问 AI 导师
  </button>
  
  {isOpen && (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 p-4">
      <h3 className="text-lg font-bold mb-2">向 AI 导师提问</h3>
      <p className="text-sm text-gray-600 mb-3">
        关于{subject}的任何问题，AI 导师都会尽力解答。
      </p>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={`请输入您关于${subject}的问题...`}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          rows={3}
        />
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            取消
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            提交问题
          </button>
        </div>
      </form>
    </div>
  )}
</div>
```

## 工具函数

特定学科功能使用以下工具函数：

```typescript
// 获取所有学科
export function getAllSubjects(): Subject[] {
  return subjects;
}

// 获取特定学科
export function getSubjectData(subjectId: string): Subject | undefined {
  return subjects.find(subject => subject.id === subjectId);
}

// 获取特定学科的特定主题
export function getTopicData(subjectId: string, topicId: string): Topic | undefined {
  const subject = getSubjectData(subjectId);
  if (!subject) return undefined;
  
  return subject.topics.find(topic => topic.id === topicId);
}
```

## 测试

特定学科功能的测试包括：

1. **学科页面测试**：验证学科页面显示所有学科、描述和导航链接
2. **学科详情页面测试**：验证学科详情页面显示学科信息、主题列表和"询问 AI"按钮
3. **主题详情页面测试**：验证主题详情页面显示主题信息、内容和侧边栏导航

```typescript
test('subjects page displays all subjects correctly', async ({ page }) => {
  await page.goto('/subjects');
  
  // Check page title
  await expect(page).toHaveTitle(/学科/);
  
  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学科');
  
  // Check all subjects are displayed
  await expect(page.getByRole('heading', { name: '数学' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '科学' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '语言' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '人文' })).toBeVisible();
  
  // Check subject descriptions
  await expect(page.getByText('包括代数、几何、微积分等数学学科')).toBeVisible();
  await expect(page.getByText('包括物理、化学、生物等科学学科')).toBeVisible();
  
  // Check navigation links
  await expect(page.getByText('浏览 数学')).toBeVisible();
  await expect(page.getByText('浏览 科学')).toBeVisible();
});
```

## 未来改进

1. **数据库存储**：将学科和主题数据存储在数据库中，而不是硬编码在代码中
2. **用户进度跟踪**：记录用户在每个主题的学习进度
3. **交互式练习**：添加更多交互式练习和测验
4. **视频内容**：集成视频教程和讲解
5. **社区讨论**：为每个主题添加讨论区，让学生可以互相帮助
6. **个性化学习路径**：基于用户的学习风格和进度推荐个性化的学习路径
7. **内容搜索**：实现全文搜索功能，让用户可以搜索特定的学习内容
