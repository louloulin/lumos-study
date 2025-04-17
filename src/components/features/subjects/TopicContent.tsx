'use client';

import { Subject, Topic } from '@/lib/subjects';
import { AskAIButton } from './AskAIButton';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

interface TopicContentProps {
  subject: Subject;
  topic: Topic;
}

export function TopicContent({ subject, topic }: TopicContentProps) {
  const router = useRouter();

  const handleAskAI = () => {
    router.push(`/chat?question=请介绍${topic.title}的基本知识&subject=${subject.name}`);
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${subject.color} text-2xl mb-4`}>
            {subject.icon}
          </div>
          <h2 className="text-2xl font-bold">{topic.title}</h2>
          <p className="text-gray-600 mt-1">{topic.description}</p>
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
              topic.level === 'basic'
                ? 'bg-green-100 text-green-800'
                : topic.level === 'intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
            }`}>
              {topic.level === 'basic'
                ? '基础'
                : topic.level === 'intermediate'
                  ? '中级'
                  : '高级'}
            </span>
          </div>
        </div>

        <AskAIButton subject={`${subject.name} - ${topic.title}`} />
      </div>

      <div className="border-t pt-6 mt-6">
        {topic.content ? (
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{topic.content}</ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">该主题的内容正在开发中...</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleAskAI}
            >
              向 AI 导师了解更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
