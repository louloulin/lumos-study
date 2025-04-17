'use client';

import { useState } from 'react';

type SummaryType = 'concise' | 'detailed' | 'notes';
type SummaryLength = 'short' | 'medium' | 'long';

export function TextSummarizer() {
  const [text, setText] = useState('');
  const [summaryType, setSummaryType] = useState<SummaryType>('concise');
  const [summaryLength, setSummaryLength] = useState<SummaryLength>('medium');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    summary: string;
    keyPoints: string[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.length < 100) {
      setError('请输入至少 100 个字符的文本');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would use the Mastra agent to generate the summary
      // For now, we'll simulate the response
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate a summary based on the text and options
      let summary = '';
      let keyPoints: string[] = [];
      
      if (summaryType === 'concise') {
        summary = '这是一个简洁的摘要，概述了文本的主要内容和观点。摘要长度根据用户选择的长度选项而定，可以是短、中或长。简洁摘要侧重于提供文本的核心信息，省略细节和例子。';
        keyPoints = [
          '文本的主要主题是...',
          '作者的核心观点是...',
          '文本的结论是...',
        ];
      } else if (summaryType === 'detailed') {
        summary = '这是一个详细的摘要，不仅包含文本的主要内容和观点，还包括重要的细节、例子和论据。详细摘要提供更全面的文本概述，适合需要深入了解内容的情况。摘要长度根据用户选择的长度选项而定。';
        keyPoints = [
          '文本的主要主题是...',
          '作者提出的第一个论点是...',
          '支持这个论点的证据包括...',
          '作者提出的第二个论点是...',
          '文本的结论是...',
        ];
      } else if (summaryType === 'notes') {
        summary = '这是以学习笔记形式组织的摘要，包含文本的主要概念、定义、公式和重点。学习笔记格式使用标题、子标题和项目符号，便于学习和复习。笔记的详细程度根据用户选择的长度选项而定。';
        keyPoints = [
          '概念 1: 定义和解释',
          '概念 2: 定义和解释',
          '重要公式: ...',
          '需要记忆的要点: ...',
          '可能的考试问题: ...',
        ];
      }
      
      // Adjust summary length
      if (summaryLength === 'short') {
        summary = summary.split('.').slice(0, 2).join('.') + '.';
      } else if (summaryLength === 'long') {
        summary = summary + ' 这是额外的内容，用于扩展摘要长度，提供更多的上下文和细节。长摘要适合需要全面了解文本内容的情况，几乎包含原文的所有重要信息。';
      }
      
      setResult({
        summary,
        keyPoints,
      });
    } catch (err) {
      setError('生成摘要时出错，请重试');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setText('');
    setSummaryType('concise');
    setSummaryLength('medium');
    setResult(null);
    setError(null);
  };
  
  const handleTryExample = () => {
    setText(`人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支，致力于创造能够模拟人类智能的机器。它涉及开发能够执行通常需要人类智能的任务的计算机系统，如视觉感知、语音识别、决策制定和语言翻译。

人工智能的研究始于20世纪50年代，当时计算机科学家开始探索机器是否可以"思考"。早期的AI研究主要集中在问题解决和符号方法上。到了20世纪80年代，机器学习的概念开始兴起，研究人员开发了能够从数据中学习的算法。

近年来，深度学习的进步极大地推动了AI的发展。深度学习是机器学习的一个子集，使用多层神经网络来分析各种因素。这些进步使得图像和语音识别、自然语言处理等领域取得了显著的成功。

人工智能在各个行业都有广泛的应用。在医疗保健领域，AI可以帮助诊断疾病、分析医学图像和开发个性化治疗方案。在金融领域，AI用于欺诈检测、算法交易和风险评估。在交通领域，自动驾驶汽车使用AI来感知环境并做出决策。在教育领域，AI可以提供个性化学习体验和自动评分系统。

尽管人工智能带来了许多好处，但它也引发了一些伦理和社会问题。隐私问题、算法偏见、就业自动化以及AI系统的透明度和可解释性都是需要考虑的重要问题。随着AI技术的不断发展，确保其负责任和公平的使用变得越来越重要。

人工智能的未来充满了可能性。随着计算能力的增强、数据可用性的提高以及算法的改进，AI有望在解决复杂问题、增强人类能力和改善生活质量方面发挥更大的作用。然而，实现这些潜力需要研究人员、政策制定者和社会各界的共同努力，以确保AI的发展符合人类的最佳利益。`);
    setResult(null);
    setError(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            输入文本
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="粘贴或输入需要摘要的文本..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={8}
          />
          <div className="mt-1 text-xs text-gray-500 flex justify-between">
            <span>{text.length} 个字符</span>
            <button
              type="button"
              onClick={handleTryExample}
              className="text-blue-600 hover:underline"
            >
              使用示例文本
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              摘要类型
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setSummaryType('concise')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryType === 'concise'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                简洁摘要
              </button>
              <button
                type="button"
                onClick={() => setSummaryType('detailed')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryType === 'detailed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                详细摘要
              </button>
              <button
                type="button"
                onClick={() => setSummaryType('notes')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryType === 'notes'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                学习笔记
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              摘要长度
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setSummaryLength('short')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryLength === 'short'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                短
              </button>
              <button
                type="button"
                onClick={() => setSummaryLength('medium')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryLength === 'medium'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                中
              </button>
              <button
                type="button"
                onClick={() => setSummaryLength('long')}
                className={`px-3 py-1 text-sm rounded-md ${
                  summaryLength === 'long'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                长
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
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
            disabled={isLoading || !text.trim() || text.length < 100}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? '生成中...' : '生成摘要'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
      </form>
      
      {result && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">摘要结果</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">摘要</h3>
            <div className="bg-gray-50 p-4 rounded-md text-gray-800">
              {result.summary}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">关键点</h3>
            <ul className="bg-gray-50 p-4 rounded-md text-gray-800 space-y-2">
              {result.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                // 复制摘要到剪贴板
                const content = `摘要：\n${result.summary}\n\n关键点：\n${result.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`;
                navigator.clipboard.writeText(content);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              复制结果
            </button>
            
            <button
              onClick={() => {
                // 将摘要和关键点编码为 URL 参数
                const encodedQuestion = encodeURIComponent('我对这个摘要有疑问，能解释一下其中的概念吗？');
                const encodedContext = encodeURIComponent(`摘要：\n${result.summary}\n\n关键点：\n${result.keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`);
                
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
