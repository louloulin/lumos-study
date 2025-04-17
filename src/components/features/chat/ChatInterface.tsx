'use client';

import { useState } from 'react';
import { AssistantCloud, useAssistantTool } from '@assistant-ui/react';
import { MarkdownTextPrimitive } from '@assistant-ui/react-markdown';

export function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = {
        role: 'assistant' as const,
        content: `这是对"${input}"的回复。在实际实现中，这将使用 Mastra 客户端生成响应。`
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: '发生错误，请稍后再试。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'} max-w-[80%]`}
          >
            <div className="text-sm font-semibold mb-1">
              {message.role === 'user' ? '您' : 'AI 助手'}
            </div>
            <div>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-lg bg-gray-100 max-w-[80%]">
            <div className="text-sm font-semibold mb-1">AI 助手</div>
            <div>思考中...</div>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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
