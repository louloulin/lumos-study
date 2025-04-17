import { SignUpForm } from '@/components/auth/SignUpForm';
import { MainLayout } from '@/components/shared/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '注册 - Lumos Study',
  description: '注册 Lumos Study 智能教育平台账号',
};

export default function SignUpPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">注册账号</h1>
          <SignUpForm />
        </div>
      </div>
    </MainLayout>
  );
}
