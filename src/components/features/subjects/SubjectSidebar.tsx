'use client';

import { Subject } from '@/lib/subjects';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SubjectSidebarProps {
  subject: Subject;
}

export function SubjectSidebar({ subject }: SubjectSidebarProps) {
  const params = useParams();
  const currentTopicId = params.topicId as string | undefined;
  
  // 按难度级别对主题进行分组
  const basicTopics = subject.topics.filter(topic => topic.level === 'basic');
  const intermediateTopics = subject.topics.filter(topic => topic.level === 'intermediate');
  const advancedTopics = subject.topics.filter(topic => topic.level === 'advanced');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">主题列表</h2>
      
      {basicTopics.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">基础</h3>
          <ul className="space-y-1">
            {basicTopics.map(topic => (
              <li key={topic.id}>
                <Link
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm',
                    currentTopicId === topic.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {intermediateTopics.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">中级</h3>
          <ul className="space-y-1">
            {intermediateTopics.map(topic => (
              <li key={topic.id}>
                <Link
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm',
                    currentTopicId === topic.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {advancedTopics.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">高级</h3>
          <ul className="space-y-1">
            {advancedTopics.map(topic => (
              <li key={topic.id}>
                <Link
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className={cn(
                    'block px-3 py-2 rounded-md text-sm',
                    currentTopicId === topic.id
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
