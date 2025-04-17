'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  profile: {
    id: string;
    userId: string;
    bio: string | null;
    grade: string | null;
    school: string | null;
    interests: string;
    preferences: string;
    user: {
      name: string | null;
      email: string | null;
    };
  };
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: profile.user.name || '',
    bio: profile.bio || '',
    grade: profile.grade || '',
    school: profile.school || '',
    interests: profile.interests || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '更新资料失败');
      }

      setSuccess('个人资料已更新');
      router.refresh();
    } catch (error: any) {
      setError(error.message || '更新资料时发生错误，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-500 p-3 rounded-md text-sm mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            个人简介
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="简单介绍一下自己..."
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            年级
          </label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">选择年级</option>
            <option value="小学一年级">小学一年级</option>
            <option value="小学二年级">小学二年级</option>
            <option value="小学三年级">小学三年级</option>
            <option value="小学四年级">小学四年级</option>
            <option value="小学五年级">小学五年级</option>
            <option value="小学六年级">小学六年级</option>
            <option value="初中一年级">初中一年级</option>
            <option value="初中二年级">初中二年级</option>
            <option value="初中三年级">初中三年级</option>
            <option value="高中一年级">高中一年级</option>
            <option value="高中二年级">高中二年级</option>
            <option value="高中三年级">高中三年级</option>
            <option value="大学">大学</option>
            <option value="其他">其他</option>
          </select>
        </div>

        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
            学校
          </label>
          <input
            id="school"
            name="school"
            type="text"
            value={formData.school}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="您的学校名称"
          />
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">
            兴趣爱好
          </label>
          <input
            id="interests"
            name="interests"
            type="text"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="数学, 科学, 编程..."
          />
          <p className="mt-1 text-xs text-gray-500">多个兴趣用逗号分隔</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
          >
            {isLoading ? '保存中...' : '保存资料'}
          </button>
        </div>
      </form>
    </div>
  );
}
