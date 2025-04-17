import { MainLayout } from '@/components/shared/MainLayout';
import { ChatInterface } from '@/components/features/chat/ChatInterface';

export default function ChatPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">AI 学习助手</h1>
        <p className="mb-6 text-gray-600">
          与我们的 AI 导师聊天，获取学习帮助和问题解答。
        </p>
        <div className="bg-white rounded-lg shadow-md p-4 h-[600px]">
          <ChatInterface />
        </div>
      </div>
    </MainLayout>
  );
}
