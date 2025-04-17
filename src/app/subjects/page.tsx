import { MainLayout } from '@/components/shared/MainLayout';
import Link from 'next/link';

const subjects = [
  {
    id: 'math',
    name: '数学',
    description: '包括代数、几何、微积分等数学学科',
    icon: '📐',
  },
  {
    id: 'science',
    name: '科学',
    description: '包括物理、化学、生物等科学学科',
    icon: '🔬',
  },
  {
    id: 'language',
    name: '语言',
    description: '包括中文、英语、文学等语言学科',
    icon: '📚',
  },
  {
    id: 'humanities',
    name: '人文',
    description: '包括历史、地理、政治等人文学科',
    icon: '🌍',
  },
];

export default function SubjectsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">学科</h1>
        <p className="mb-6 text-gray-600">
          选择一个学科开始学习和获取帮助。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <Link 
                href={`/subjects/${subject.id}`}
                className="text-blue-600 hover:underline"
              >
                浏览 {subject.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
