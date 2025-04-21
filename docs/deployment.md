# 部署指南

本文档描述了如何将 Lumos Study 智能教育平台部署到 Vercel。

## 前提条件

1. [Vercel 账号](https://vercel.com/signup)
2. [GitHub 账号](https://github.com/join)
3. Lumos Study 项目代码库

## 部署步骤

### 1. 准备环境变量

在部署之前，您需要准备以下环境变量：

- `NEXTAUTH_URL`: 您的应用程序 URL（例如 https://lumos-study.vercel.app）
- `NEXTAUTH_SECRET`: 用于加密会话的密钥（可以使用 `openssl rand -base64 32` 生成）
- `DATABASE_URL`: 您的数据库连接 URL
- `OPENAI_API_KEY`: OpenAI API 密钥
- `MASTRA_API_KEY`: Mastra API 密钥

### 2. 使用 Vercel CLI 部署

1. 安装 Vercel CLI：

```bash
pnpm add -g vercel
```

2. 登录 Vercel：

```bash
vercel login
```

3. 部署项目：

```bash
vercel
```

按照提示进行操作，选择您的 Vercel 团队（如果有），并确认部署设置。

4. 设置环境变量：

在 Vercel 控制台中，导航到您的项目，然后点击"Settings" > "Environment Variables"。添加上述环境变量。

5. 部署到生产环境：

```bash
vercel --prod
```

### 3. 使用 GitHub 集成部署

1. 将您的项目推送到 GitHub 仓库。

2. 在 Vercel 控制台中，点击"New Project"。

3. 导入您的 GitHub 仓库。

4. 配置项目设置：
   - 构建命令：`pnpm build`
   - 输出目录：`.next`
   - 安装命令：`pnpm install`

5. 添加环境变量。

6. 点击"Deploy"。

### 4. 使用 CI/CD 自动部署

项目已配置 GitHub Actions 工作流程，用于自动化测试和部署。

1. 在 GitHub 仓库中，导航到"Settings" > "Secrets and variables" > "Actions"。

2. 添加以下密钥：
   - `VERCEL_TOKEN`: 您的 Vercel API 令牌（可以在 Vercel 控制台的"Settings" > "Tokens"中创建）

3. 推送代码到 `main` 分支，GitHub Actions 将自动运行测试并部署到 Vercel。

## 数据库迁移

在部署之前，您需要确保数据库架构是最新的：

```bash
pnpm prisma migrate deploy
```

## 监控和日志

部署后，您可以在 Vercel 控制台中监控应用程序性能和查看日志：

1. 导航到您的项目。
2. 点击"Analytics"查看性能指标。
3. 点击"Logs"查看应用程序日志。

## 故障排除

### 部署失败

1. 检查构建日志，查找错误信息。
2. 确保所有环境变量都已正确设置。
3. 验证依赖项是否正确安装。

### 应用程序错误

1. 检查应用程序日志。
2. 验证数据库连接是否正常。
3. 确保 API 密钥有效且未过期。

## 生产环境最佳实践

1. 使用环境变量存储敏感信息。
2. 启用 Vercel 的自动 HTTPS。
3. 配置自定义域名（如果需要）。
4. 设置性能监控和警报。
5. 定期备份数据库。
