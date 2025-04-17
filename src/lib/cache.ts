// 简单的内存缓存实现
type CacheItem<T> = {
  value: T;
  expiry: number | null;
};

class MemoryCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  
  // 设置缓存项，可选过期时间（秒）
  set<T>(key: string, value: T, ttl?: number): void {
    const expiry = ttl ? Date.now() + ttl * 1000 : null;
    this.cache.set(key, { value, expiry });
  }
  
  // 获取缓存项
  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    // 检查是否过期
    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value as T;
  }
  
  // 删除缓存项
  delete(key: string): void {
    this.cache.delete(key);
  }
  
  // 清空所有缓存
  clear(): void {
    this.cache.clear();
  }
  
  // 获取所有缓存键
  keys(): string[] {
    return Array.from(this.cache.keys());
  }
}

// 创建单例实例
export const memoryCache = new MemoryCache();

// 缓存装饰器函数，用于包装异步函数
export function withCache<T>(
  fn: (...args: any[]) => Promise<T>,
  keyPrefix: string,
  ttl?: number
) {
  return async (...args: any[]): Promise<T> => {
    // 创建缓存键
    const key = `${keyPrefix}:${JSON.stringify(args)}`;
    
    // 尝试从缓存获取
    const cached = memoryCache.get<T>(key);
    if (cached !== null) {
      return cached;
    }
    
    // 执行原始函数
    const result = await fn(...args);
    
    // 存储结果到缓存
    memoryCache.set(key, result, ttl);
    
    return result;
  };
}
