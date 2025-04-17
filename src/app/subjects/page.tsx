import { MainLayout } from '@/components/shared/MainLayout';
import Link from 'next/link';
import { getAllSubjects } from '@/lib/subjects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学科 - Lumos Study',
  description: '浏览 Lumos Study 提供的各种学科，包括数学、科学、语言和人文学科',
};

const subjects = getAllSubjects();

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
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${subject.color} text-3xl mb-4`}>
                {subject.icon}
              </div>
              <h2 className="text-xl font-bold mb-2">{subject.name}</h2>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/subjects/${subject.id}`}
                  className="text-blue-600 hover:underline"
                >
                  浏览 {subject.name} →
                </Link>
                <span className="text-sm text-gray-500">{subject.topics.length} 个主题</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
