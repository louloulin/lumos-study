import { MainLayout } from '@/components/shared/MainLayout';
import { SubjectSidebar } from '@/components/features/subjects/SubjectSidebar';
import { TopicContent } from '@/components/features/subjects/TopicContent';
import { getSubjectData, getTopicData } from '@/lib/subjects';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

interface TopicPageProps {
  params: {
    subjectId: string;
    topicId: string;
  };
}

export async function generateMetadata(
  { params }: TopicPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const subjectId = String(params.subjectId);
  const topicId = String(params.topicId);
  const subject = getSubjectData(subjectId);
  const topic = getTopicData(subjectId, topicId);

  if (!subject || !topic) {
    return {
      title: '主题未找到',
    };
  }

  return {
    title: `${topic.title} - ${subject.name} | Lumos Study`,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const subjectId = String(params.subjectId);
  const topicId = String(params.topicId);
  const subject = getSubjectData(subjectId);
  const topic = getTopicData(subjectId, topicId);

  if (!subject || !topic) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{subject.name} - {topic.title}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <SubjectSidebar subject={subject} />
          </div>

          <div className="md:w-3/4">
            <TopicContent subject={subject} topic={topic} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
