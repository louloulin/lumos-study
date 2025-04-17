import { SignInForm } from '@/components/auth/SignInForm';
import { MainLayout } from '@/components/shared/MainLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 - Lumos Study',
  description: '登录到 Lumos Study 智能教育平台',
};

export default function SignInPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">登录</h1>
          <SignInForm />
        </div>
      </div>
    </MainLayout>
  );
}
