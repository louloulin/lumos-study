import { Subject } from '@/lib/subjects';
import { SubjectOverview } from './SubjectOverview';
import { AskAIButton } from './AskAIButton';

interface SubjectContentProps {
  subject: Subject;
}

export function SubjectContent({ subject }: SubjectContentProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${subject.color} text-2xl mb-4`}>
            {subject.icon}
          </div>
          <h2 className="text-2xl font-bold">{subject.name}</h2>
          <p className="text-gray-600 mt-1">{subject.description}</p>
        </div>
        
        <AskAIButton subject={subject.name} />
      </div>
      
      <SubjectOverview subject={subject} />
    </div>
  );
}
