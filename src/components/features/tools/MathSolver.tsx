'use client';

import { useState } from 'react';
import tutorAgent from '@/mastra/agents/tutor-agent';

export function MathSolver() {
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    problem: string;
    solution: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problem.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would use the Mastra agent to solve the problem
      // For now, we'll simulate the response
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a solution based on the problem type
      let solution = '';
      
      if (problem.includes('=') && (problem.includes('x') || problem.includes('y'))) {
        // Equation solving
        solution = `解答：
${problem}
首先，我们将方程整理为标准形式。
假设这是一个二次方程：ax² + bx + c = 0
我们可以使用求根公式：x = (-b ± √(b² - 4ac)) / (2a)
计算判别式 Δ = b² - 4ac
...
因此，方程的解为 x = ...`;
      } else if (problem.includes('∫')) {
        // Integration
        solution = `解答：
${problem}
这是一个积分问题。
我们可以使用积分公式：∫xⁿdx = xⁿ⁺¹/(n+1) + C
分解被积函数...
逐项积分...
整理得到最终结果：...`;
      } else if (problem.includes('导数') || problem.includes('求导')) {
        // Differentiation
        solution = `解答：
${problem}
这是一个求导问题。
我们可以使用导数公式：(xⁿ)' = nxⁿ⁻¹
对函数逐项求导...
整理得到最终结果：...`;
      } else if (problem.includes('概率') || problem.includes('统计')) {
        // Probability/Statistics
        solution = `解答：
${problem}
这是一个概率/统计问题。
我们需要确定概率空间和事件...
计算概率...
因此，所求概率为...`;
      } else {
        // General math problem
        solution = `解答：
${problem}
分析问题...
应用相关数学知识...
计算过程...
因此，答案是...`;
      }
      
      setResult({
        problem,
        solution,
      });
    } catch (err) {
      setError('处理问题时出错，请重试');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setProblem('');
    setResult(null);
    setError(null);
  };
  
  const handleTryExample = (example: string) => {
    setProblem(example);
    setResult(null);
    setError(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
            输入数学问题
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="例如：解方程 2x² - 5x + 3 = 0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button
              type="button"
              onClick={() => handleTryExample('解方程：2x² - 5x + 3 = 0')}
              className="px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded-md"
            >
              示例 1
            </button>
            <button
              type="button"
              onClick={() => handleTryExample('计算 ∫(x²+2x+1)dx')}
              className="px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded-md"
            >
              示例 2
            </button>
            <button
              type="button"
              onClick={() => handleTryExample('求函数 f(x) = x³ - 3x² + 2x 的导数')}
              className="px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded-md"
            >
              示例 3
            </button>
          </div>
          
          <div className="flex space-x-2">
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                重置
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !problem.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isLoading ? '计算中...' : '解答问题'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
      </form>
      
      {result && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">解答结果</h2>
          
          <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap">
            {result.solution}
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => {
                // 复制结果到剪贴板
                navigator.clipboard.writeText(result.solution);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              复制结果
            </button>
            
            <button
              onClick={() => {
                // 将问题和解答编码为 URL 参数
                const encodedQuestion = encodeURIComponent(`我对这个问题有疑问：${result.problem}`);
                const encodedContext = encodeURIComponent(`问题：${result.problem}\n\n解答：${result.solution}`);
                
                // 重定向到聊天页面，带上问题和上下文参数
                window.location.href = `/chat?question=${encodedQuestion}&context=${encodedContext}`;
              }}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              向 AI 提问
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
