# 性能优化功能文档

本文档描述了 Lumos Study 智能教育平台中实现的性能优化功能，包括缓存策略、API 调用优化、组件懒加载和移动端体验优化。

## 缓存策略

我们实现了一个内存缓存系统，用于缓存 API 请求和计算结果，减少重复请求和计算，提高应用性能。

### 功能特点

- **内存缓存**：在内存中缓存数据，避免重复请求
- **TTL 支持**：支持设置缓存过期时间
- **缓存装饰器**：提供函数装饰器，方便缓存异步函数结果

### 实现细节

缓存系统使用 Map 数据结构存储缓存项，每个缓存项包含值和过期时间。

```typescript
// src/lib/cache.ts
type CacheItem<T> = {
  value: T;
  expiry: number | null;
};

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  set<T>(key: string, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiry });
  }
  
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  // ...
}

export const memoryCache = new MemoryCache();

export function withCache<T>(
  fn: (...args: any[]) => Promise<T>,
  keyPrefix: string,
  ttl?: number
) {
  return async (...args: any[]): Promise<T> => {
    const key = `${keyPrefix}:${JSON.stringify(args)}`;
    
    const cached = memoryCache.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    const result = await fn(...args);
    
    memoryCache.set(key, result, ttl);
    
    return result;
  };
}
```

## API 调用优化

我们增强了 fetch 函数，添加了重试、超时和缓存功能，提高 API 调用的可靠性和性能。

### 功能特点

- **自动重试**：在请求失败时自动重试，支持指数退避策略
- **超时控制**：支持设置请求超时时间
- **缓存支持**：支持缓存请求结果，减少重复请求
- **错误处理**：统一的错误处理机制

### 实现细节

增强的 fetch 函数使用 AbortController 实现超时控制，使用递归调用实现重试功能，并集成缓存系统实现缓存功能。

```typescript
// src/lib/optimizedApi.ts
export async function fetchWithOptions<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    retries = 3,
    retryDelay = 300,
    timeout = 8000,
    cache = false,
    cacheTtl = 60,
    ...fetchOptions
  } = options;

  if (cache) {
    return withCache(
      () => fetchWithRetry<T>(url, { ...options, cache: false }),
      'api-fetch',
      cacheTtl
    )();
  }

  return fetchWithRetry<T>(url, options);
}

async function fetchWithRetry<T>(
  url: string,
  options: FetchOptions,
  attempt = 1
): Promise<ApiResponse<T>> {
  // 实现重试逻辑...
}
```

## 组件懒加载

我们实现了组件懒加载功能，只在组件进入视口时才加载和渲染组件，减少初始加载时间和内存使用。

### 功能特点

- **视口检测**：使用 IntersectionObserver API 检测组件是否进入视口
- **延迟加载**：只在组件进入视口时才加载和渲染组件
- **占位符**：在组件加载前显示占位符，提供更好的用户体验

### 实现细节

懒加载组件使用 IntersectionObserver API 检测组件是否进入视口，使用 useState 控制组件的显示和隐藏。

```typescript
// src/components/ui/LazyComponent.tsx
export function LazyComponent({
  children,
  placeholder,
  threshold = 0.1,
  rootMargin = '0px',
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className="lazy-component">
      {isVisible ? children : placeholder || <div className="animate-pulse bg-gray-200 rounded-md h-32" />}
    </div>
  );
}
```

## 图片懒加载

我们实现了图片懒加载功能，只在图片进入视口时才加载图片，减少初始加载时间和带宽使用。

### 功能特点

- **视口检测**：使用 IntersectionObserver API 检测图片是否进入视口
- **延迟加载**：只在图片进入视口时才加载图片
- **渐入效果**：图片加载完成后平滑显示
- **模糊效果**：支持模糊占位图

### 实现细节

图片懒加载组件使用 IntersectionObserver API 检测图片是否进入视口，使用 Next.js 的 Image 组件实现图片加载。

```typescript
// src/components/ui/LazyImage.tsx
export function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  threshold = 0.1,
  placeholder = '...',
  fadeIn = true,
  blurEffect = true,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 实现视口检测...
  }, [threshold]);

  return (
    <div ref={imgRef} className={cn('relative overflow-hidden', className)} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" style={{ width, height }} />
      )}
      
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleImageLoad}
          className={cn(
            'transition-opacity duration-500',
            fadeIn && !isLoaded ? 'opacity-0' : 'opacity-100',
            blurEffect && !isLoaded ? 'blur-sm' : 'blur-0'
          )}
          placeholder="blur"
          blurDataURL={placeholder}
          {...props}
        />
      )}
    </div>
  );
}
```

## 移动端体验优化

我们优化了移动端体验，添加了响应式设计和触摸手势支持，提供更好的移动端用户体验。

### 功能特点

- **响应式设计**：使用响应式设计，适应不同屏幕尺寸
- **触摸手势**：支持滑动、点击等触摸手势
- **移动端菜单**：优化移动端菜单，提供更好的导航体验

### 实现细节

移动端优化使用 CSS 媒体查询实现响应式设计，使用 TouchEvent API 实现触摸手势支持。

```typescript
// src/components/ui/TouchSwipe.tsx
export function TouchSwipe({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
  className = '',
}: TouchSwipeProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 实现触摸手势...

  return (
    <div
      ref={containerRef}
      className={cn('touch-swipe', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
```

## 聊天组件优化

我们优化了聊天组件的渲染性能，使用 useCallback 减少不必要的重渲染，提高聊天体验。

### 功能特点

- **懒加载消息**：使用懒加载组件加载消息
- **优化回调函数**：使用 useCallback 优化回调函数
- **自动滚动**：新消息自动滚动到视图
- **自适应文本框**：文本框高度自动调整

### 实现细节

聊天组件使用 useCallback 优化回调函数，使用 useRef 实现自动滚动和自适应文本框。

```typescript
// src/components/features/chat/OptimizedChatUI.tsx
export function OptimizedChatUI({
  initialMessage = '',
  context = '',
  className = '',
}: OptimizedChatUIProps) {
  // 状态和引用...

  // 优化回调函数
  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading && !isComposing) {
      handleSubmit(e);
      setInput('');
    }
  }, [input, isLoading, isComposing, handleSubmit]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      onSubmit(e);
    }
  }, [onSubmit, isComposing]);

  return (
    <ResponsiveContainer className={cn('flex flex-col h-full', className)}>
      <TouchSwipe className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          message.role !== 'system' && (
            <LazyComponent key={message.id || index}>
              {/* 消息内容... */}
            </LazyComponent>
          )
        ))}
        <div ref={messagesEndRef} />
      </TouchSwipe>

      <form onSubmit={onSubmit} className="p-4 border-t">
        {/* 表单内容... */}
      </form>
    </ResponsiveContainer>
  );
}
```

## 测试

性能优化功能的测试包括：

1. **缓存测试**：测试缓存的设置、获取、过期和清除功能
2. **API 调用测试**：测试重试、超时和缓存功能
3. **懒加载测试**：测试组件是否在进入视口时正确加载
4. **移动端测试**：测试响应式设计和触摸手势功能

```typescript
// tests/performance.spec.ts
test('缓存功能正常工作', async ({ page }) => {
  // 测试缓存设置和获取
  memoryCache.set('test-key', 'test-value');
  expect(memoryCache.get('test-key')).toBe('test-value');
  
  // 测试缓存过期
  memoryCache.set('expiry-key', 'expiry-value', 0.1); // 100ms TTL
  expect(memoryCache.get('expiry-key')).toBe('expiry-value');
  
  // 等待过期
  await new Promise(resolve => setTimeout(resolve, 200));
  expect(memoryCache.get('expiry-key')).toBeNull();
  
  // 测试缓存清除
  memoryCache.set('clear-key', 'clear-value');
  memoryCache.clear();
  expect(memoryCache.get('clear-key')).toBeNull();
});
```

## 未来改进

1. **服务器端缓存**：添加服务器端缓存，进一步提高性能
2. **CDN 集成**：集成 CDN，加速静态资源加载
3. **图片优化**：实现更高级的图片优化，如自适应图片尺寸
4. **代码分割**：实现更细粒度的代码分割，减少初始加载时间
5. **性能监控**：添加性能监控，实时监控应用性能
