import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  // 需要认证的路径
  const authRoutes = ['/dashboard', '/chat'];
  
  // 检查当前路径是否需要认证
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );
  
  // 如果是认证路由但用户未登录，重定向到登录页面
  if (isAuthRoute && !isAuthenticated) {
    const callbackUrl = encodeURIComponent(request.nextUrl.pathname);
    return NextResponse.redirect(new URL(`/auth/signin?callbackUrl=${callbackUrl}`, request.url));
  }
  
  // 如果用户已登录并尝试访问登录/注册页面，重定向到仪表板
  if (isAuthenticated && 
      (request.nextUrl.pathname.startsWith('/auth/signin') || 
       request.nextUrl.pathname.startsWith('/auth/signup'))) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// 配置中间件应用的路径
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/chat/:path*',
    '/auth/signin',
    '/auth/signup',
  ],
};
