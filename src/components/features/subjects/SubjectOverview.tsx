import { Subject } from '@/lib/subjects';
import Link from 'next/link';

interface SubjectOverviewProps {
  subject: Subject;
}

export function SubjectOverview({ subject }: SubjectOverviewProps) {
  // 按难度级别对主题进行分组
  const basicTopics = subject.topics.filter(topic => topic.level === 'basic');
  const intermediateTopics = subject.topics.filter(topic => topic.level === 'intermediate');
  const advancedTopics = subject.topics.filter(topic => topic.level === 'advanced');
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">学习路径</h3>
      
      <div className="space-y-6">
        {basicTopics.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center mr-2">1</span>
              基础知识
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {basicTopics.map(topic => (
                <Link 
                  key={topic.id}
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h5 className="font-medium mb-1">{topic.title}</h5>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {intermediateTopics.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold flex items-center justify-center mr-2">2</span>
              进阶内容
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {intermediateTopics.map(topic => (
                <Link 
                  key={topic.id}
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h5 className="font-medium mb-1">{topic.title}</h5>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {advancedTopics.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="inline-block w-6 h-6 rounded-full bg-red-100 text-red-800 text-xs font-bold flex items-center justify-center mr-2">3</span>
              高级主题
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {advancedTopics.map(topic => (
                <Link 
                  key={topic.id}
                  href={`/subjects/${subject.id}/${topic.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h5 className="font-medium mb-1">{topic.title}</h5>
                  <p className="text-sm text-gray-600">{topic.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
