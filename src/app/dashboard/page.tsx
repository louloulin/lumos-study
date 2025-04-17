import { MainLayout } from '@/components/shared/MainLayout';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '仪表板 - Lumos Study',
  description: '查看您的学习进度和个人资料',
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }
  
  // 获取用户资料
  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
  });
  
  // 获取用户的聊天线程
  const chatThreads = await prisma.chatThread.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  });
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">欢迎回来，{session.user.name || '同学'}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 用户资料卡片 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">个人资料</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">姓名</p>
                <p className="font-medium">{session.user.name || '未设置'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">邮箱</p>
                <p className="font-medium">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">年级</p>
                <p className="font-medium">{profile?.grade || '未设置'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">学校</p>
                <p className="font-medium">{profile?.school || '未设置'}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link 
                href="/dashboard/profile" 
                className="text-blue-600 hover:underline text-sm"
              >
                编辑个人资料
              </Link>
            </div>
          </div>
          
          {/* 最近的聊天 */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4">最近的聊天</h2>
            {chatThreads.length > 0 ? (
              <div className="space-y-3">
                {chatThreads.map((thread) => (
                  <div key={thread.id} className="border-b pb-3 last:border-0">
                    <Link 
                      href={`/chat/${thread.id}`}
                      className="block hover:bg-gray-50 p-2 -mx-2 rounded"
                    >
                      <p className="font-medium">{thread.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(thread.updatedAt).toLocaleString('zh-CN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>您还没有任何聊天记录</p>
                <Link 
                  href="/chat" 
                  className="mt-2 inline-block text-blue-600 hover:underline"
                >
                  开始新的聊天
                </Link>
              </div>
            )}
          </div>
          
          {/* 学习进度 */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-3">
            <h2 className="text-xl font-bold mb-4">学习进度</h2>
            <div className="text-center py-8 text-gray-500">
              <p>您的学习进度将在这里显示</p>
              <Link 
                href="/subjects" 
                className="mt-2 inline-block text-blue-600 hover:underline"
              >
                浏览学科
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
