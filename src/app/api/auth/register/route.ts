import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 定义请求体验证模式
const registerSchema = z.object({
  name: z.string().min(2, '姓名至少需要2个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(8, '密码至少需要8个字符'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // 验证请求体
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: '验证失败', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { name, email, password } = result.data;
    
    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: '该邮箱已被注册' },
        { status: 409 }
      );
    }
    
    // 哈希密码
    const hashedPassword = await hash(password, 10);
    
    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
      },
    });
    
    // 创建用户资料
    await prisma.profile.create({
      data: {
        userId: user.id,
        interests: '',
      },
    });
    
    // 返回成功响应，不包含密码
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { message: '注册成功', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('注册错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}
