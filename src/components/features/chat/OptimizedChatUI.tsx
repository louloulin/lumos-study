'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '@mastra/client-js/react';
import { LazyComponent } from '@/components/ui/LazyComponent';
import { TouchSwipe } from '@/components/ui/TouchSwipe';
import { ResponsiveContainer } from '@/components/ui/ResponsiveContainer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface OptimizedChatUIProps {
  initialMessage?: string;
  context?: string;
  className?: string;
}

/**
 * 性能优化的聊天界面组件
 */
export function OptimizedChatUI({
  initialMessage = '',
  context = '',
  className = '',
}: OptimizedChatUIProps) {
  const [input, setInput] = useState(initialMessage);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  // 使用 Mastra 的 useChat hook
  const { messages, input: chatInput, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: context ? [
      {
        id: 'context',
        role: 'system',
        content: context,
      }
    ] : undefined,
  });

  // 同步本地输入和 Mastra 输入
  useEffect(() => {
    handleInputChange(input);
  }, [input, handleInputChange]);

  // 自动滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // 自动调整文本框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // 处理表单提交
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isComposing) {
      handleSubmit(e);
      setInput('');
    }
  }, [input, isLoading, isComposing, handleSubmit]);

  // 处理键盘事件
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onSubmit(e);
    }
  }, [onSubmit, isComposing]);

  return (
    <ResponsiveContainer className={cn('flex flex-col h-full', className)}>
      <TouchSwipe className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          message.role !== 'system' && (
            <LazyComponent key={message.id || index}>
              <div className={cn(
                'flex items-start gap-3 rounded-lg p-4',
                message.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'
              )}>
                <Avatar>
                  <AvatarImage src={message.role === 'user' ? '/avatars/user.png' : '/avatars/assistant.png'} />
                  <AvatarFallback>
                    {message.role === 'user' ? 'U' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium mb-1">
                    {message.role === 'user' ? '您' : 'AI 助手'}
                  </div>
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                </div>
              </div>
            </LazyComponent>
          )
        ))}
        <div ref={messagesEndRef} />
      </TouchSwipe>

      <form onSubmit={onSubmit} className="p-4 border-t">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="输入消息..."
            className="min-h-[60px] max-h-[200px] resize-none"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            发送
          </Button>
        </div>
      </form>
    </ResponsiveContainer>
  );
}
