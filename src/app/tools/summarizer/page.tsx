import { MainLayout } from '@/components/shared/MainLayout';
import { TextSummarizer } from '@/components/features/tools/TextSummarizer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '文本摘要工具 - Lumos Study',
  description: '将长文本和教科书内容转化为简洁的摘要',
};

export default function SummarizerPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">文本摘要工具</h1>
        <p className="text-gray-600 mb-6">
          将长文本和教科书内容转化为简洁的摘要，帮助快速理解关键概念
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <TextSummarizer />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">使用说明</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">1</span>
                  <span>粘贴或输入需要摘要的文本内容</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">2</span>
                  <span>选择摘要类型和长度</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">3</span>
                  <span>点击"生成摘要"按钮</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">4</span>
                  <span>查看生成的摘要和关键点</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">摘要类型</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    <span className="font-medium">简洁摘要：</span>
                    提供文本的简短概述，适合快速了解内容
                  </li>
                  <li>
                    <span className="font-medium">详细摘要：</span>
                    包含更多细节和关键点，适合深入学习
                  </li>
                  <li>
                    <span className="font-medium">学习笔记：</span>
                    以学习笔记的形式组织内容，包含重点和问题
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">最佳实践</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 输入完整的段落或章节以获得更好的结果</li>
                  <li>• 对于教科书内容，包含标题和小标题</li>
                  <li>• 文本长度建议在 500-5000 字之间</li>
                  <li>• 可以使用"向 AI 提问"功能询问摘要中的概念</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
