import { describe, test, expect, vi, beforeEach } from 'vitest';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { compare } from 'bcryptjs';
import { PrismaAdapter } from '@auth/prisma-adapter';

// 模拟 prisma 客户端
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

// 模拟 bcryptjs
vi.mock('bcryptjs', () => ({
  compare: vi.fn(),
}));

// 模拟 PrismaAdapter
vi.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: vi.fn().mockReturnValue({}),
}));

describe('认证系统', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('authOptions 应该包含必要的配置', () => {
    expect(authOptions).toHaveProperty('adapter');
    expect(authOptions).toHaveProperty('providers');
    expect(authOptions).toHaveProperty('callbacks');
    expect(authOptions).toHaveProperty('pages');
    expect(authOptions).toHaveProperty('session');
  });

  test('应该使用 PrismaAdapter', () => {
    expect(PrismaAdapter).toHaveBeenCalled();
  });

  test('应该包含 CredentialsProvider', () => {
    const credentialsProvider = authOptions.providers.find(
      (provider) => provider.id === 'credentials'
    );
    
    expect(credentialsProvider).toBeDefined();
    expect(credentialsProvider).toHaveProperty('name', 'Credentials');
    expect(credentialsProvider).toHaveProperty('credentials');
    expect(credentialsProvider?.credentials).toHaveProperty('email');
    expect(credentialsProvider?.credentials).toHaveProperty('password');
  });

  test('应该有自定义登录页面', () => {
    expect(authOptions.pages).toHaveProperty('signIn', '/auth/signin');
  });

  test('应该使用 JWT 会话策略', () => {
    expect(authOptions.session).toHaveProperty('strategy', 'jwt');
  });
});
