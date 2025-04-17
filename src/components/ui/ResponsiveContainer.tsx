'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ResponsiveContainerProps {
  children: ReactNode;
  mobileBreakpoint?: number;
  tabletBreakpoint?: number;
  className?: string;
}

/**
 * 响应式容器组件，根据屏幕尺寸调整布局
 */
export function ResponsiveContainer({
  children,
  mobileBreakpoint = 640,
  tabletBreakpoint = 1024,
  className = '',
}: ResponsiveContainerProps) {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < mobileBreakpoint) {
        setDeviceType('mobile');
      } else if (width < tabletBreakpoint) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    // 初始化
    handleResize();

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 清理
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileBreakpoint, tabletBreakpoint]);

  return (
    <div className={`responsive-container ${deviceType} ${className}`}>
      {children}
    </div>
  );
}
