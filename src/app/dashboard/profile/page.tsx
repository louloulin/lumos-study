import { MainLayout } from '@/components/shared/MainLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import { ProfileForm } from '@/components/auth/ProfileForm';

export const metadata: Metadata = {
  title: '个人资料 - Lumos Study',
  description: '编辑您的个人资料和偏好设置',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard/profile');
  }
  
  // 获取用户资料
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { user: true },
  });
  
  if (!profile) {
    // 如果用户没有资料，创建一个空的资料
    await prisma.profile.create({
      data: {
        userId: session.user.id,
        interests: '',
      },
    });
    
    // 重新获取用户资料
    return redirect('/dashboard/profile');
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">个人资料</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <ProfileForm profile={profile} />
        </div>
      </div>
    </MainLayout>
  );
}
