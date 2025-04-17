import { MainLayout } from '@/components/shared/MainLayout';
import { FlashcardManager } from '@/components/features/tools/FlashcardManager';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '闪卡学习 - Lumos Study',
  description: '创建和学习闪卡，提高记忆效率',
};

export default function FlashcardsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">闪卡学习</h1>
        <p className="text-gray-600 mb-6">
          创建和学习闪卡，利用间隔重复提高记忆效率
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <FlashcardManager />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">闪卡学习法</h2>
              <p className="text-gray-700 mb-4">
                闪卡是一种高效的学习工具，利用间隔重复原理帮助记忆知识点。研究表明，与传统学习方法相比，闪卡可以提高记忆效率高达 70%。
              </p>
              
              <h3 className="font-semibold mb-2">使用方法</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">1</span>
                  <span>创建包含问题和答案的闪卡</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">2</span>
                  <span>查看问题，尝试回答</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">3</span>
                  <span>翻转卡片查看正确答案</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">4</span>
                  <span>根据记忆程度评价自己</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">5</span>
                  <span>系统会根据评价安排复习时间</span>
                </li>
              </ul>
              
              <h3 className="font-semibold mb-2">创建有效闪卡的技巧</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 每张卡片只包含一个概念或问题</li>
                <li>• 使用简洁明了的语言</li>
                <li>• 问题应该具体且明确</li>
                <li>• 答案应该简短但完整</li>
                <li>• 使用图像和例子增强记忆</li>
                <li>• 定期复习，特别是困难的卡片</li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">AI 辅助功能</h3>
                <p className="text-sm text-gray-600">
                  使用"AI 生成闪卡"功能，可以从文本中自动提取关键概念并创建闪卡。只需粘贴学习材料，AI 将为您生成高质量的问答对。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
