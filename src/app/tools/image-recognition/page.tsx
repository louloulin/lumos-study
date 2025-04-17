import { MainLayout } from '@/components/shared/MainLayout';
import { ImageUploader } from '@/components/features/tools/ImageUploader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '图像识别 - Lumos Study',
  description: '上传图片获取文本提取和问题解答',
};

export default function ImageRecognitionPage() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">图像识别</h1>
        <p className="text-gray-600 mb-6">
          上传数学问题或文本图片，获取即时解答和文本提取
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ImageUploader />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">使用说明</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">1</span>
                  <span>上传包含文本或数学问题的图片</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">2</span>
                  <span>AI 将自动识别图片中的文本内容</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">3</span>
                  <span>如果是数学问题，AI 将提供解答步骤</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mr-2 mt-0.5">4</span>
                  <span>您可以询问 AI 关于识别结果的更多问题</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold mb-2">支持的图片类型</h3>
                <p className="text-sm text-gray-600 mb-4">
                  JPG, PNG, GIF (最大 5MB)
                </p>
                
                <h3 className="font-semibold mb-2">最佳实践</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 确保图片清晰，文字可读</li>
                  <li>• 避免复杂背景和阴影</li>
                  <li>• 对于手写内容，尽量保持字迹清晰</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
