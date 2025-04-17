'use client';

import { useState, useEffect } from 'react';
import tutorAgent from '@/mastra/agents/tutor-agent';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [threadId, setThreadId] = useState<string | null>(null);

  // 创建一个新的对话线程
  useEffect(() => {
    const createThread = async () => {
      try {
        // 在实际实现中，这将使用 Mastra 的记忆系统创建一个新线程
        // 现在我们只是生成一个随机 ID
        const newThreadId = `thread-${Math.random().toString(36).substring(2, 9)}`;
        setThreadId(newThreadId);
      } catch (error) {
        console.error('Error creating thread:', error);
      }
    };

    if (!threadId) {
      createThread();
    }
  }, [threadId]);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSubmit = async () => {
    if (!input.trim() || !threadId) return;

    // 创建用户消息
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 使用 Mastra 代理生成响应
      // 在实际实现中，我们会使用 threadId 和 resourceId
      // 现在我们只是模拟响应
      const response = await simulateMastraResponse(input, threadId);

      const assistantMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: '发生错误，请稍后再试。',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // 模拟 Mastra 响应
  const simulateMastraResponse = async (userInput: string, threadId: string): Promise<string> => {
    // 在实际实现中，我们会使用 tutorAgent.generate() 或 tutorAgent.stream()
    // 现在我们只是模拟一个延迟和响应
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟不同类型的问题的响应
    if (userInput.includes('数学') || userInput.includes('math')) {
      return `数学是一门非常有趣的学科！我可以帮助你解决数学问题。请告诉我你在学习哪个数学概念或需要解决什么数学问题。`;
    } else if (userInput.includes('科学') || userInput.includes('science')) {
      return `科学探索是了解我们世界的精彩旅程！你对物理、化学、生物学或其他科学领域有疑问吗？`;
    } else if (userInput.includes('你好') || userInput.includes('hello')) {
      return `你好！我是 Lumos 导师，很高兴能帮助你学习。你有什么学习上的问题吗？或者你想了解哪个学科的知识？`;
    } else {
      return `谢谢你的问题。为了更好地帮助你，我想了解一下你的学习背景。你现在是什么年级？你对哪些学科比较感兴趣？`;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 my-8">
            <p>开始与 AI 导师对话，获取学习帮助。</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}
          >
            <div className="text-sm font-semibold mb-1">
              {message.role === 'user' ? '您' : 'Lumos 导师'}
            </div>
            <div className="whitespace-pre-wrap">
              {message.content}
            </div>
            <div className="text-xs text-gray-500 mt-1 text-right">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-100 max-w-[80%]">
            <div className="text-sm font-semibold mb-1">Lumos 导师</div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="输入您的问题..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 disabled:bg-blue-300"
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
