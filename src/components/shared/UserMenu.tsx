'use client';

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export function UserMenu() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  if (!session) {
    return (
      <div className="flex space-x-4">
        <Link
          href="/auth/signin"
          className="py-2 px-4 text-gray-800 hover:text-blue-600 font-medium"
        >
          登录
        </Link>
        <Link
          href="/auth/signup"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          注册
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex items-center space-x-2 focus:outline-none"
        aria-expanded={isMenuOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || '用户头像'}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-600 text-sm font-medium">
              {session.user.name?.charAt(0) || session.user.email?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <span className="hidden md:inline text-sm font-medium">
          {session.user.name || '用户'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            仪表板
          </Link>
          <Link
            href="/dashboard/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            个人资料
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(false)}
          >
            设置
          </Link>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            退出登录
          </button>
        </div>
      )}
    </div>
  );
}
