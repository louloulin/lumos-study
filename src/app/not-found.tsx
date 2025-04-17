import { MainLayout } from '@/components/shared/MainLayout';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">页面未找到</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/subjects"
            className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            浏览学科
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
