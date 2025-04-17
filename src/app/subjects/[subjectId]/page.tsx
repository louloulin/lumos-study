import { MainLayout } from '@/components/shared/MainLayout';
import { SubjectContent } from '@/components/features/subjects/SubjectContent';
import { SubjectSidebar } from '@/components/features/subjects/SubjectSidebar';
import { getSubjectData } from '@/lib/subjects';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';

interface SubjectPageProps {
  params: {
    subjectId: string;
  };
}

export async function generateMetadata(
  { params }: SubjectPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const subjectId = String(params.subjectId);
  const subject = getSubjectData(subjectId);

  if (!subject) {
    return {
      title: '学科未找到',
    };
  }

  return {
    title: `${subject.name} - Lumos Study`,
    description: subject.description,
  };
}

export default function SubjectPage({ params }: SubjectPageProps) {
  const subjectId = params.subjectId;
  const subject = getSubjectData(subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">{subject.name}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <SubjectSidebar subject={subject} />
          </div>

          <div className="md:w-3/4">
            <SubjectContent subject={subject} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
