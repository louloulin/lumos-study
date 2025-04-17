import { MainLayout } from '@/components/shared/MainLayout';
import Link from 'next/link';

const tools = [
  {
    id: 'summarizer',
    name: '文本摘要工具',
    description: '将长文本和教科书内容转化为简洁的摘要',
    icon: '📝',
  },
  {
    id: 'math-solver',
    name: '数学问题解算器',
    description: '解决各种数学问题，提供详细步骤',
    icon: '🧮',
  },
  {
    id: 'image-recognition',
    name: '图像识别',
    description: '上传图片获取文本提取和问题解答',
    icon: '📷',
  },
  {
    id: 'flashcards',
    name: '闪卡学习',
    description: '创建和学习闪卡，提高记忆效率',
    icon: '🗂️',
  },
];

export default function ToolsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">学习工具</h1>
        <p className="mb-6 text-gray-600">
          使用我们的智能学习工具提升学习效率。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div key={tool.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{tool.icon}</div>
              <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <Link 
                href={`/tools/${tool.id}`}
                className="text-blue-600 hover:underline"
              >
                使用工具 →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
