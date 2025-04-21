# Lumos Study 维护指南

本文档提供了 Lumos Study 智能教育平台的维护指南，包括常见问题排除、性能优化和更新流程。

## 目录

1. [环境设置](#环境设置)
2. [常见问题排除](#常见问题排除)
3. [性能监控和优化](#性能监控和优化)
4. [更新和升级](#更新和升级)
5. [备份和恢复](#备份和恢复)
6. [安全最佳实践](#安全最佳实践)

## 环境设置

### 开发环境

1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/lumos-study.git
   cd lumos-study
   ```

2. 安装依赖：
   ```bash
   pnpm install
   ```

3. 设置环境变量：
   ```bash
   cp .env.example .env.local
   ```
   编辑 `.env.local` 文件，填入必要的 API 密钥和配置。

4. 启动开发服务器：
   ```bash
   pnpm dev
   ```

### 生产环境

生产环境部署在 Vercel 上，详细信息请参阅 [部署指南](./deployment.md)。

## 常见问题排除

### 数据库连接问题

**症状**：应用程序无法连接到数据库，显示连接错误。

**解决方案**：
1. 检查 `.env.local` 或 Vercel 环境变量中的 `DATABASE_URL` 是否正确。
2. 确保数据库服务器正在运行且可访问。
3. 检查防火墙设置，确保应用程序可以访问数据库端口。
4. 验证数据库用户凭据是否正确。

### API 密钥问题

**症状**：AI 功能不工作，显示 API 错误。

**解决方案**：
1. 检查 `.env.local` 或 Vercel 环境变量中的 `OPENAI_API_KEY` 和 `MASTRA_API_KEY` 是否正确。
2. 验证 API 密钥是否有效且未过期。
3. 检查 API 使用限制，确保未超出配额。
4. 查看 API 提供商的状态页面，确认服务是否正常运行。

### 认证问题

**症状**：用户无法登录或注册。

**解决方案**：
1. 检查 `.env.local` 或 Vercel 环境变量中的 `NEXTAUTH_URL` 和 `NEXTAUTH_SECRET` 是否正确。
2. 验证数据库中的用户表是否正确设置。
3. 检查 NextAuth.js 配置是否正确。
4. 查看服务器日志，寻找认证错误信息。

### 构建错误

**症状**：应用程序构建失败。

**解决方案**：
1. 检查构建日志，查找具体错误信息。
2. 确保所有依赖项都已正确安装。
3. 验证代码中没有语法错误或类型错误。
4. 尝试清除缓存并重新构建：
   ```bash
   pnpm clean
   pnpm build
   ```

## 性能监控和优化

### 性能监控

1. **Vercel Analytics**：
   - 在 Vercel 控制台中查看应用程序性能指标。
   - 监控页面加载时间、首次内容绘制 (FCP) 和累积布局偏移 (CLS)。

2. **自定义性能监控**：
   - 使用 `web-vitals` 库收集核心 Web 指标。
   - 在 `app/layout.tsx` 中添加性能监控代码。

### 性能优化

1. **图片优化**：
   - 使用 `next/image` 组件自动优化图片。
   - 确保所有图片都使用适当的尺寸和格式。
   - 使用 `LazyImage` 组件延迟加载不在视口中的图片。

2. **组件优化**：
   - 使用 `React.memo` 避免不必要的组件重渲染。
   - 使用 `useCallback` 和 `useMemo` 缓存函数和计算结果。
   - 使用 `LazyComponent` 延迟加载不在视口中的组件。

3. **API 优化**：
   - 使用 `cachedFetch` 缓存 API 响应。
   - 实现请求批处理，减少 API 调用次数。
   - 使用服务器组件直接获取数据，减少客户端 API 调用。

4. **数据库优化**：
   - 为常用查询添加索引。
   - 优化数据库模式，减少冗余数据。
   - 使用连接池管理数据库连接。

## 更新和升级

### 依赖项更新

1. 检查过时的依赖项：
   ```bash
   pnpm outdated
   ```

2. 更新依赖项：
   ```bash
   pnpm update
   ```

3. 更新特定依赖项：
   ```bash
   pnpm update <package-name>
   ```

4. 更新后测试应用程序，确保一切正常工作。

### Next.js 升级

1. 更新 Next.js 版本：
   ```bash
   pnpm update next
   ```

2. 查阅 [Next.js 升级指南](https://nextjs.org/docs/upgrading)，了解重大变更。

3. 更新后测试应用程序，确保一切正常工作。

### Mastra 升级

1. 更新 Mastra 版本：
   ```bash
   pnpm update @mastra/core @mastra/client-js
   ```

2. 查阅 Mastra 文档，了解 API 变更。

3. 更新 Mastra 配置和代理，适应新版本。

## 备份和恢复

### 数据库备份

1. 创建数据库备份：
   ```bash
   pg_dump -U username -d database_name > backup.sql
   ```

2. 自动化备份：
   - 设置定时任务，定期备份数据库。
   - 将备份存储在安全的位置，如 AWS S3 或 Google Cloud Storage。

### 数据库恢复

1. 从备份恢复数据库：
   ```bash
   psql -U username -d database_name < backup.sql
   ```

2. 验证恢复是否成功：
   - 检查数据库表和记录。
   - 测试应用程序功能。

### 代码备份

1. 使用 Git 进行代码版本控制。
2. 定期推送代码到远程仓库。
3. 为重要版本创建标签和发布。

## 安全最佳实践

### API 密钥管理

1. 不要在代码中硬编码 API 密钥。
2. 使用环境变量存储敏感信息。
3. 定期轮换 API 密钥。
4. 限制 API 密钥的权限范围。

### 用户认证

1. 使用 HTTPS 保护所有通信。
2. 实施强密码策略。
3. 添加双因素认证 (2FA)。
4. 实施登录尝试限制，防止暴力攻击。

### 数据保护

1. 加密敏感数据。
2. 实施适当的访问控制。
3. 定期审查数据访问日志。
4. 遵守数据保护法规，如 GDPR 和 CCPA。

### 依赖项安全

1. 定期更新依赖项，修复安全漏洞。
2. 使用 `pnpm audit` 检查依赖项中的已知漏洞。
3. 考虑使用 Dependabot 自动更新依赖项。

## 联系支持

如有任何问题或需要帮助，请联系：

- **技术支持**：tech-support@lumos-study.com
- **安全问题**：security@lumos-study.com
- **一般查询**：info@lumos-study.com
