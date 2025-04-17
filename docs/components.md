# Lumos Study 组件文档

本文档提供了 Lumos Study 项目中使用的主要组件的说明和用法。

## 共享组件

### MainLayout

`MainLayout` 是应用程序的主要布局组件，包含导航栏和页脚。

**位置**: `src/components/shared/MainLayout.tsx`

**用法**:

```tsx
import { MainLayout } from '@/components/shared/MainLayout';

export default function MyPage() {
  return (
    <MainLayout>
      <div>页面内容</div>
    </MainLayout>
  );
}
```

**Props**:

| 属性 | 类型 | 描述 |
|------|------|------|
| children | ReactNode | 布局内的内容 |

### Navbar

`Navbar` 是应用程序的导航栏组件，提供主要导航链接。

**位置**: `src/components/shared/Navbar.tsx`

**用法**:

```tsx
import { Navbar } from '@/components/shared/Navbar';

export default function MyComponent() {
  return (
    <div>
      <Navbar />
      <div>其他内容</div>
    </div>
  );
}
```

**Props**:

| 属性 | 类型 | 描述 |
|------|------|------|
| className | string | 可选的额外 CSS 类名 |

### Footer

`Footer` 是应用程序的页脚组件，包含链接和版权信息。

**位置**: `src/components/shared/Footer.tsx`

**用法**:

```tsx
import { Footer } from '@/components/shared/Footer';

export default function MyComponent() {
  return (
    <div>
      <div>页面内容</div>
      <Footer />
    </div>
  );
}
```

**Props**:

| 属性 | 类型 | 描述 |
|------|------|------|
| className | string | 可选的额外 CSS 类名 |

## 聊天组件

### ChatInterface

`ChatInterface` 是使用 assistant-ui 实现的聊天界面组件。

**位置**: `src/components/features/chat/ChatInterface.tsx`

**用法**:

```tsx
import { ChatInterface } from '@/components/features/chat/ChatInterface';

export default function ChatPage() {
  return (
    <div className="h-[600px]">
      <ChatInterface />
    </div>
  );
}
```

**功能**:

- 使用 `useAssistant` hook 管理聊天状态
- 集成 Mastra 客户端进行 AI 响应生成
- 支持 Markdown 格式化输出
- 显示加载状态

## 页面组件

### 首页 (Home)

首页组件展示平台的主要功能和特点。

**位置**: `src/app/page.tsx`

**部分**:

- 英雄部分：展示平台标题和简介
- 特点部分：展示平台的主要功能
- CTA 部分：鼓励用户开始使用平台

### 聊天页面 (ChatPage)

聊天页面提供与 AI 导师交互的界面。

**位置**: `src/app/chat/page.tsx`

### 学科页面 (SubjectsPage)

学科页面展示可用的学习学科。

**位置**: `src/app/subjects/page.tsx`

### 工具页面 (ToolsPage)

工具页面展示可用的学习工具。

**位置**: `src/app/tools/page.tsx`

## 使用 Shadcn UI 组件

Lumos Study 使用 Shadcn UI 组件库。以下是一些常用组件的用法示例：

### 按钮

```tsx
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <Button variant="default">默认按钮</Button>
    <Button variant="destructive">危险按钮</Button>
    <Button variant="outline">轮廓按钮</Button>
    <Button variant="secondary">次要按钮</Button>
    <Button variant="ghost">幽灵按钮</Button>
    <Button variant="link">链接按钮</Button>
  );
}
```

### 卡片

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>卡片标题</CardTitle>
        <CardDescription>卡片描述</CardDescription>
      </CardHeader>
      <CardContent>
        <p>卡片内容</p>
      </CardContent>
      <CardFooter>
        <p>卡片页脚</p>
      </CardFooter>
    </Card>
  );
}
```

## 自定义组件开发指南

### 创建新组件

1. 在适当的目录中创建新文件（`ui`、`features` 或 `shared`）
2. 使用 TypeScript 接口定义 Props
3. 实现组件逻辑
4. 使用 Tailwind CSS 进行样式设计
5. 导出组件

### 组件最佳实践

- 使用函数式组件和 React Hooks
- 保持组件专注于单一职责
- 使用 TypeScript 类型提高代码质量
- 使用 `cn` 工具函数组合 CSS 类名
- 提供合理的默认值和类型检查
