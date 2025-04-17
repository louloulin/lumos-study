'use client';

import { useState } from 'react';
import { AssistantUI, useAssistant } from '@assistant-ui/react';
import { MarkdownRenderer } from '@assistant-ui/react-markdown';
import { getMastraClient } from '@/lib/mastra-client';

export function ChatInterface() {
  const [isLoading, setIsLoading] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit } = useAssistant({
    api: {
      sendMessage: async (message) => {
        setIsLoading(true);
        try {
          // In a real implementation, this would use the Mastra client to generate a response
          // For now, we'll simulate a response
          await new Promise(resolve => setTimeout(resolve, 1000));
          return `这是对"${message}"的回复。在实际实现中，这将使用 Mastra 客户端生成响应。`;
        } catch (error) {
          console.error('Error sending message:', error);
          return '发生错误，请稍后再试。';
        } finally {
          setIsLoading(false);
        }
      }
    }
  });

  return (
    <AssistantUI
      messages={messages}
      input={input}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      messageRenderer={MarkdownRenderer}
      placeholder="输入您的问题..."
      sendButtonText="发送"
      className="h-full"
    />
  );
}
