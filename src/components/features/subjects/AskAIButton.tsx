'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AskAIButtonProps {
  subject: string;
}

export function AskAIButton({ subject }: AskAIButtonProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    // 将问题编码为 URL 参数
    const encodedQuestion = encodeURIComponent(question);
    // 将学科编码为 URL 参数
    const encodedSubject = encodeURIComponent(subject);
    
    // 重定向到聊天页面，带上问题和学科参数
    router.push(`/chat?question=${encodedQuestion}&subject=${encodedSubject}`);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        询问 AI 导师
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 p-4">
          <h3 className="text-lg font-bold mb-2">向 AI 导师提问</h3>
          <p className="text-sm text-gray-600 mb-3">
            关于{subject}的任何问题，AI 导师都会尽力解答。
          </p>
          
          <form onSubmit={handleSubmit}>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={`请输入您关于${subject}的问题...`}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              rows={3}
            />
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                提交问题
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
