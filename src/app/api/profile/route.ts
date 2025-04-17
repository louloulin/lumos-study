import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 定义请求体验证模式
const profileSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  bio: z.string().optional(),
  grade: z.string().optional(),
  school: z.string().optional(),
  interests: z.string().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: '未授权' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // 验证请求体
    const result = profileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: '验证失败', errors: result.error.errors },
        { status: 400 }
      );
    }
    
    const { name, bio, grade, school, interests } = result.data;
    
    // 更新用户名
    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });
    
    // 更新用户资料
    const profile = await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        grade,
        school,
        interests,
      },
      create: {
        userId: session.user.id,
        bio,
        grade,
        school,
        interests,
      },
    });
    
    return NextResponse.json(
      { message: '资料已更新', profile },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新资料错误:', error);
    return NextResponse.json(
      { message: '服务器错误，请稍后再试' },
      { status: 500 }
    );
  }
}
