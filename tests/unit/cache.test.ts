import { describe, test, expect, beforeEach } from 'vitest';
import { memoryCache, withCache } from '@/lib/cache';

describe('缓存系统', () => {
  beforeEach(() => {
    // 每个测试前清空缓存
    memoryCache.clear();
  });

  test('应该能够设置和获取缓存项', () => {
    memoryCache.set('test-key', 'test-value');
    expect(memoryCache.get('test-key')).toBe('test-value');
  });

  test('应该在过期后返回 null', async () => {
    memoryCache.set('expiry-key', 'expiry-value', 0.1); // 100ms TTL
    expect(memoryCache.get('expiry-key')).toBe('expiry-value');
    
    // 等待过期
    await new Promise(resolve => setTimeout(resolve, 200));
    expect(memoryCache.get('expiry-key')).toBeNull();
  });

  test('应该能够删除缓存项', () => {
    memoryCache.set('delete-key', 'delete-value');
    expect(memoryCache.get('delete-key')).toBe('delete-value');
    
    memoryCache.delete('delete-key');
    expect(memoryCache.get('delete-key')).toBeNull();
  });

  test('应该能够清空所有缓存', () => {
    memoryCache.set('key1', 'value1');
    memoryCache.set('key2', 'value2');
    
    memoryCache.clear();
    
    expect(memoryCache.get('key1')).toBeNull();
    expect(memoryCache.get('key2')).toBeNull();
  });

  test('withCache 应该缓存函数结果', async () => {
    let callCount = 0;
    
    const testFn = async (param: string) => {
      callCount++;
      return `result-${param}`;
    };
    
    const cachedFn = withCache(testFn, 'test-fn', 60);
    
    // 第一次调用，应该执行函数
    const result1 = await cachedFn('param1');
    expect(result1).toBe('result-param1');
    expect(callCount).toBe(1);
    
    // 第二次调用相同参数，应该从缓存返回
    const result2 = await cachedFn('param1');
    expect(result2).toBe('result-param1');
    expect(callCount).toBe(1); // 计数不变，表示没有再次执行函数
    
    // 调用不同参数，应该执行函数
    const result3 = await cachedFn('param2');
    expect(result3).toBe('result-param2');
    expect(callCount).toBe(2);
  });
});
