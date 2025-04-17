'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ImageResultProps {
  result: {
    text: string;
    analysis: string;
  };
}

export function ImageResult({ result }: ImageResultProps) {
  const router = useRouter();
  const [question, setQuestion] = useState('');
  
  const handleAskAI = () => {
    if (!question.trim()) return;
    
    // 将问题和识别结果编码为 URL 参数
    const encodedQuestion = encodeURIComponent(question);
    const encodedContext = encodeURIComponent(`图片识别结果：${result.text}\n\n${result.analysis}`);
    
    // 重定向到聊天页面，带上问题和上下文参数
    router.push(`/chat?question=${encodedQuestion}&context=${encodedContext}`);
  };
  
  return (
    <div className="border-t pt-6">
      <h2 className="text-xl font-bold mb-4">识别结果</h2>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">提取的文本</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap">
          {result.text}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-semibold mb-2">AI 分析</h3>
        <div className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap">
          {result.analysis}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="font-semibold mb-2 text-blue-800">向 AI 提问</h3>
        <p className="text-sm text-blue-700 mb-3">
          有关于识别结果的问题？向 AI 导师提问获取更多帮助。
        </p>
        
        <div className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 px-3 py-2 border border-blue-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAskAI}
            disabled={!question.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            提问
          </button>
        </div>
      </div>
    </div>
  );
}
