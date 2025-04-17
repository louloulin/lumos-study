import { MainLayout } from '@/components/shared/MainLayout';
import { MathSolver } from '@/components/features/tools/MathSolver';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '数学问题解算器 - Lumos Study',
  description: '解决各种数学问题，提供详细步骤',
};

export default function MathSolverPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">数学问题解算器</h1>
        <p className="text-gray-600 mb-6">
          输入数学问题，获取详细的解题步骤和解答
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <MathSolver />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">支持的数学类型</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">•</span>
                  <span>代数方程（一元、二元、多元）</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">•</span>
                  <span>不等式和方程组</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">•</span>
                  <span>微积分（导数、积分、极限）</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">•</span>
                  <span>几何问题（面积、体积、角度）</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">•</span>
                  <span>统计和概率问题</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">使用提示</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 尽量清晰准确地描述问题</li>
                  <li>• 对于复杂问题，可以分步骤提问</li>
                  <li>• 可以使用数学符号，如 x^2 表示 x²</li>
                  <li>• 如果解答不清楚，可以要求 AI 进一步解释</li>
                </ul>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">示例问题</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 解方程：2x² - 5x + 3 = 0</li>
                  <li>• 计算 ∫(x²+2x+1)dx</li>
                  <li>• 求函数 f(x) = x³ - 3x² + 2x 的导数</li>
                  <li>• 三角形的三个顶点坐标为 (0,0), (4,0), (2,3)，求面积</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
