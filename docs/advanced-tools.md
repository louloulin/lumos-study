# Lumos Study 高级工具功能文档

本文档描述了 Lumos Study 智能教育平台中实现的高级工具功能，包括图像识别和高级学习工具。

## 概述

高级工具功能是 AI 教育平台的重要组成部分，它为学生提供了强大的学习辅助工具，帮助他们更高效地学习和解决问题。Lumos Study 实现了多种高级工具，包括图像识别、数学问题解算器、文本摘要工具和闪卡学习功能。

## 图像识别

图像识别功能允许用户上传包含文本或数学问题的图片，系统会自动识别图片中的内容并提供解答。

### 功能特点

- **图像上传**：支持拖放或点击上传图片，支持 JPG、PNG、GIF 格式，最大 5MB
- **文本提取**：自动从图片中提取文本内容
- **数学公式识别**：识别图片中的数学公式并提供解答
- **AI 分析**：对提取的内容进行 AI 分析和解释
- **问题解答**：用户可以向 AI 提问关于识别结果的问题

### 实现细节

图像识别功能使用以下组件：

- `ImageUploader`：处理图片上传和预览
- `ImageResult`：显示识别结果和 AI 分析

```tsx
// 图像上传组件
<div
  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
  onClick={() => fileInputRef.current?.click()}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
>
  <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    accept="image/jpeg,image/png,image/gif"
    className="hidden"
  />
  
  <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
  
  <p className="text-lg font-medium text-gray-700 mb-2">
    点击或拖放图片到此处上传
  </p>
  <p className="text-sm text-gray-500">
    支持 JPG, PNG, GIF 格式，最大 5MB
  </p>
</div>
```

## 数学问题解算器

数学问题解算器是一个强大的工具，可以解决各种数学问题，并提供详细的解题步骤。

### 功能特点

- **多种数学类型**：支持代数方程、不等式、微积分、几何和统计问题
- **详细解题步骤**：提供逐步解题过程，帮助学生理解解题思路
- **示例问题**：提供常见数学问题的示例，方便用户快速开始
- **AI 提问**：用户可以向 AI 提问关于解题过程的问题

### 实现细节

数学问题解算器使用以下组件：

- `MathSolver`：处理数学问题的输入和解答

```tsx
// 数学问题解算器表单
<form onSubmit={handleSubmit} className="mb-6">
  <div className="mb-4">
    <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
      输入数学问题
    </label>
    <textarea
      id="problem"
      value={problem}
      onChange={(e) => setProblem(e.target.value)}
      placeholder="例如：解方程 2x² - 5x + 3 = 0"
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
    />
  </div>
  
  <div className="flex justify-between items-center">
    <div className="space-x-2">
      <button
        type="button"
        onClick={() => handleTryExample('解方程：2x² - 5x + 3 = 0')}
        className="px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded-md"
      >
        示例 1
      </button>
      {/* 更多示例按钮 */}
    </div>
    
    <button
      type="submit"
      disabled={isLoading || !problem.trim()}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
    >
      {isLoading ? '计算中...' : '解答问题'}
    </button>
  </div>
</form>
```

## 文本摘要工具

文本摘要工具可以将长文本和教科书内容转化为简洁的摘要，帮助学生快速理解关键概念。

### 功能特点

- **多种摘要类型**：支持简洁摘要、详细摘要和学习笔记格式
- **自定义摘要长度**：支持短、中、长三种摘要长度
- **关键点提取**：自动提取文本中的关键点
- **示例文本**：提供示例文本，方便用户快速体验
- **AI 提问**：用户可以向 AI 提问关于摘要内容的问题

### 实现细节

文本摘要工具使用以下组件：

- `TextSummarizer`：处理文本输入和摘要生成

```tsx
// 摘要类型选择
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    摘要类型
  </label>
  <div className="flex space-x-2">
    <button
      type="button"
      onClick={() => setSummaryType('concise')}
      className={`px-3 py-1 text-sm rounded-md ${
        summaryType === 'concise'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      简洁摘要
    </button>
    <button
      type="button"
      onClick={() => setSummaryType('detailed')}
      className={`px-3 py-1 text-sm rounded-md ${
        summaryType === 'detailed'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      详细摘要
    </button>
    <button
      type="button"
      onClick={() => setSummaryType('notes')}
      className={`px-3 py-1 text-sm rounded-md ${
        summaryType === 'notes'
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      学习笔记
    </button>
  </div>
</div>
```

## 闪卡学习功能

闪卡学习功能允许用户创建和学习闪卡，利用间隔重复原理提高记忆效率。

### 功能特点

- **闪卡创建**：支持手动创建闪卡和 AI 生成闪卡
- **闪卡管理**：支持编辑、删除和分类闪卡
- **闪卡学习**：支持翻转卡片、评价记忆程度和安排复习时间
- **本地存储**：使用 localStorage 保存闪卡数据
- **间隔重复**：根据用户对记忆程度的评价，自动安排下次复习时间

### 实现细节

闪卡学习功能使用以下组件：

- `FlashcardManager`：管理闪卡的创建、编辑和学习
- `Flashcard`：显示单个闪卡
- `FlashcardCreator`：创建新闪卡
- `FlashcardStudy`：学习闪卡

```tsx
// 闪卡数据模型
export interface FlashcardType {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed: Date | null;
  nextReview: Date | null;
  difficulty: 'easy' | 'medium' | 'hard';
}

// 闪卡学习组件
<div
  className={`border rounded-lg overflow-hidden mb-6 cursor-pointer ${
    isFlipped ? 'bg-blue-50' : 'bg-white'
  }`}
  onClick={handleFlip}
>
  <div className="p-6">
    <div className="flex justify-between items-start mb-4">
      <span className="text-sm text-gray-500">{currentCard.category}</span>
      <span className="text-sm text-gray-500">
        {isFlipped ? '答案' : '问题'} (点击翻转)
      </span>
    </div>
    
    <div className="min-h-[200px] flex items-center justify-center">
      <p className="text-center text-lg">
        {isFlipped ? currentCard.answer : currentCard.question}
      </p>
    </div>
  </div>
</div>
```

## 工具与 AI 聊天集成

所有高级工具都与 AI 聊天功能集成，用户可以将工具的结果转发到聊天页面，向 AI 提问更多问题。

### 实现细节

工具与 AI 聊天的集成使用 URL 参数传递问题和上下文：

```tsx
// 将问题和上下文编码为 URL 参数
const encodedQuestion = encodeURIComponent('我对这个摘要有疑问，能解释一下其中的概念吗？');
const encodedContext = encodeURIComponent(`摘要：\n${result.summary}\n\n关键点：\n${result.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`);

// 重定向到聊天页面，带上问题和上下文参数
window.location.href = `/chat?question=${encodedQuestion}&context=${encodedContext}`;
```

## 测试

高级工具功能的测试包括：

1. **工具页面测试**：验证工具页面显示所有工具、描述和导航链接
2. **图像识别工具测试**：验证图像上传组件和使用说明的显示
3. **数学问题解算器测试**：验证输入表单、示例按钮和支持的数学类型的显示
4. **文本摘要工具测试**：验证输入表单、摘要类型按钮和摘要长度选项的显示
5. **闪卡学习工具测试**：验证闪卡管理、创建按钮和使用说明的显示

```typescript
test('tools page displays all learning tools', async ({ page }) => {
  await page.goto('/tools');
  
  // Check page title
  await expect(page).toHaveTitle(/学习工具/);
  
  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学习工具');
  
  // Check all tools are displayed
  await expect(page.getByRole('heading', { name: '文本摘要工具' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '数学问题解算器' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '图像识别' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '闪卡学习' })).toBeVisible();
  
  // Check tool descriptions
  await expect(page.getByText('将长文本和教科书内容转化为简洁的摘要')).toBeVisible();
  await expect(page.getByText('解决各种数学问题，提供详细步骤')).toBeVisible();
  await expect(page.getByText('上传图片获取文本提取和问题解答')).toBeVisible();
  
  // Check navigation links
  await expect(page.getByText('使用工具 →')).toHaveCount(4);
});
```

## 未来改进

1. **图像识别**：
   - 集成真实的 OCR API，如 Google Vision API 或 Tesseract.js
   - 添加手写数学公式识别
   - 支持多语言文本识别

2. **数学问题解算器**：
   - 集成专业的数学引擎，如 Wolfram Alpha API
   - 添加图形绘制功能
   - 支持更复杂的数学问题类型

3. **文本摘要工具**：
   - 添加多语言支持
   - 实现自定义摘要风格
   - 添加文本分析功能，如情感分析和关键词提取

4. **闪卡学习功能**：
   - 添加云同步功能，在多设备间同步闪卡
   - 实现更智能的间隔重复算法
   - 添加图片和音频支持

5. **工具与 AI 聊天集成**：
   - 实现更无缝的集成，直接在聊天界面中使用工具
   - 添加工具使用历史记录
   - 实现工具推荐功能，根据用户问题推荐合适的工具
