# Lumos Study 认证系统文档

本文档描述了 Lumos Study 智能教育平台中实现的认证系统，该系统使用 NextAuth.js 和 Prisma 来管理用户认证和用户资料。

## 概述

认证系统是 AI 教育平台的核心组件，它使用户能够创建账户、登录、管理个人资料，并获得个性化的学习体验。Lumos Study 使用 NextAuth.js 和 Prisma 来实现这一功能。

## 技术栈

- **NextAuth.js**: 用于处理认证流程
- **Prisma**: 用于数据库操作
- **SQLite**: 用作开发环境的数据库
- **bcrypt**: 用于密码哈希

## 数据模型

认证系统使用以下 Prisma 模型：

```prisma
// NextAuth.js Models
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          String    @default("user")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  accounts      Account[]
  sessions      Session[]
  profile       Profile?
  chatThreads   ChatThread[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// Application Models
model Profile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio         String?
  grade       String?
  school      String?
  interests   String
  preferences String    @default("{}")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 认证流程

### 注册流程

1. 用户访问注册页面 (`/auth/signup`)
2. 用户填写注册表单（姓名、邮箱、密码）
3. 表单提交到 `/api/auth/register` 端点
4. 服务器验证表单数据
5. 密码使用 bcrypt 进行哈希处理
6. 创建新用户和用户资料
7. 用户自动登录并重定向到仪表板

### 登录流程

1. 用户访问登录页面 (`/auth/signin`)
2. 用户填写登录表单（邮箱、密码）
3. NextAuth.js 验证凭据
4. 如果验证成功，创建会话并重定向到仪表板
5. 如果验证失败，显示错误消息

### 第三方认证

系统支持使用 Google 账号登录：

```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
}),
```

## 用户资料管理

用户可以在个人资料页面 (`/dashboard/profile`) 管理以下信息：

- 姓名
- 个人简介
- 年级
- 学校
- 兴趣爱好

更新资料的请求发送到 `/api/profile` 端点，该端点使用 Prisma 更新数据库中的用户资料。

## 路由保护

使用中间件保护需要认证的路由：

```typescript
// 需要认证的路径
const authRoutes = ['/dashboard', '/chat'];

// 检查当前路径是否需要认证
const isAuthRoute = authRoutes.some(route => 
  request.nextUrl.pathname.startsWith(route)
);

// 如果是认证路由但用户未登录，重定向到登录页面
if (isAuthRoute && !isAuthenticated) {
  const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
  return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, request.url));
}
```

## 用户界面组件

### 登录表单

登录表单组件 (`SignInForm`) 提供以下功能：

- 邮箱和密码输入
- 记住我选项
- 忘记密码链接
- Google 登录选项
- 注册链接

### 注册表单

注册表单组件 (`SignUpForm`) 提供以下功能：

- 姓名、邮箱和密码输入
- 密码确认
- 服务条款和隐私政策同意
- Google 注册选项
- 登录链接

### 用户菜单

用户菜单组件 (`UserMenu`) 在导航栏中显示：

- 未登录时：登录和注册按钮
- 登录后：用户头像、姓名和下拉菜单（仪表板、个人资料、设置、退出登录）

### 个人资料表单

个人资料表单组件 (`ProfileForm`) 允许用户更新个人信息：

- 姓名
- 个人简介
- 年级（下拉选择）
- 学校
- 兴趣爱好

## 测试

认证系统的测试包括：

1. 注册流程测试
2. 登录流程测试
3. 个人资料更新测试

```typescript
test('auth flow - sign up, sign in, and profile update', async ({ page }) => {
  // 生成随机邮箱以避免冲突
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  
  // 注册测试
  await page.goto('/auth/signup');
  await page.getByLabel('姓名').fill('测试用户');
  await page.getByLabel('邮箱').fill(randomEmail);
  await page.getByLabel('密码').fill('Password123!');
  await page.getByLabel('确认密码').fill('Password123!');
  await page.getByLabel('我同意').check();
  await page.getByRole('button', { name: '注册' }).click();
  
  // 检查是否重定向到仪表板
  await expect(page).toHaveURL('/dashboard');
  
  // 登录测试
  // ...
  
  // 个人资料更新测试
  // ...
});
```

## 安全考虑

1. **密码安全**：使用 bcrypt 进行密码哈希，不存储明文密码
2. **CSRF 保护**：NextAuth.js 提供内置的 CSRF 保护
3. **会话管理**：使用 JWT 策略管理会话
4. **路由保护**：使用中间件保护需要认证的路由
5. **输入验证**：使用 Zod 验证所有用户输入

## 未来改进

1. **邮箱验证**：添加邮箱验证功能
2. **密码重置**：实现忘记密码和密码重置功能
3. **双因素认证**：添加双因素认证支持
4. **角色和权限**：实现更细粒度的角色和权限系统
5. **社交登录**：添加更多社交登录选项（微信、微博等）
6. **登录历史**：记录用户登录历史和设备信息
7. **账户锁定**：实现账户锁定机制，防止暴力破解
