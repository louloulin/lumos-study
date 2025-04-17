# Lumos Study 开发指南

本文档提供了 Lumos Study 项目的开发指南，包括环境设置、开发流程和最佳实践。

## 环境设置

### 前提条件

- [Bun](https://bun.sh/) (v1.0.0 或更高版本)
- [Node.js](https://nodejs.org/) (v18.0.0 或更高版本)
- [Git](https://git-scm.com/)

### 安装步骤

1. 克隆仓库

```bash
git clone https://github.com/yourusername/lumos-study.git
cd lumos-study
```

2. 安装依赖

```bash
bun install
```

3. 设置环境变量

创建 `.env.local` 文件并添加必要的环境变量：

```
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. 启动开发服务器

```bash
bun run dev
```

现在，你可以在浏览器中访问 `http://localhost:3000` 查看应用程序。

## 开发流程

### 分支策略

- `main`: 生产分支，只接受来自 `develop` 的合并请求
- `develop`: 开发分支，包含最新的开发代码
- `feature/*`: 功能分支，用于开发新功能
- `bugfix/*`: 修复分支，用于修复 bug
- `release/*`: 发布分支，用于准备新版本发布

### 提交规范

使用语义化提交消息：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更改
- `style`: 不影响代码含义的更改（空格、格式化等）
- `refactor`: 既不修复 bug 也不添加功能的代码更改
- `perf`: 提高性能的代码更改
- `test`: 添加或修正测试
- `chore`: 对构建过程或辅助工具的更改

示例：`feat: 添加用户认证功能`

### 代码风格

- 使用 TypeScript 类型
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 React Hooks
- 使用 Tailwind CSS 进行样式设计

## 项目结构

### 目录说明

- `src/app`: Next.js App Router 页面和路由
- `src/components`: React 组件
  - `ui`: Shadcn UI 组件
  - `features`: 特定功能组件
  - `shared`: 共享组件
- `src/lib`: 实用函数和工具
- `src/mastra`: Mastra AI 集成
- `public`: 静态资源
- `tests`: 测试文件
- `docs`: 项目文档

### 组件开发

创建新组件时，遵循以下结构：

```tsx
// 导入依赖
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 定义 Props 接口
interface ButtonProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

// 组件实现
export function Button({
  variant = 'default',
  size = 'md',
  children,
  onClick,
  className,
}: ButtonProps) {
  // 组件逻辑
  
  // 返回 JSX
  return (
    <button
      className={cn(
        'rounded-md font-medium',
        {
          'bg-gray-200 text-gray-800': variant === 'default',
          'bg-blue-600 text-white': variant === 'primary',
          'bg-gray-800 text-white': variant === 'secondary',
        },
        {
          'px-2 py-1 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

## 最佳实践

### 性能优化

- 使用 `React.memo` 和 `useMemo` 减少不必要的重渲染
- 实现代码分割和懒加载
- 优化图像和静态资源
- 使用 Next.js 的 ISR 和 SSG 功能

### 可访问性

- 使用语义化 HTML
- 添加适当的 ARIA 属性
- 确保键盘导航可用
- 提供足够的颜色对比度

### 测试

- 编写单元测试和集成测试
- 使用 Playwright 进行端到端测试
- 测试覆盖关键功能和用户流程

## 部署

### Vercel 部署

1. 在 Vercel 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量
4. 部署应用程序

### 其他部署选项

- Netlify
- AWS Amplify
- 自托管服务器

## 故障排除

### 常见问题

- 依赖安装失败：尝试清除缓存并重新安装
- API 请求失败：检查环境变量和 API 密钥
- 构建错误：检查 TypeScript 类型和导入路径

### 获取帮助

- 查阅项目文档
- 提交 GitHub Issue
- 联系项目维护者
