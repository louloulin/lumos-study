import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchWithOptions, cachedFetch } from '@/lib/optimizedApi';
import { memoryCache } from '@/lib/cache';

// 模拟全局 fetch
global.fetch = vi.fn();

describe('API 调用优化', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    memoryCache.clear();
  });

  test('fetchWithOptions 应该处理成功响应', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'test-data' }),
    };
    
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    const result = await fetchWithOptions('https://api.example.com/test');
    
    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/test', expect.objectContaining({
      signal: expect.any(AbortSignal),
    }));
    
    expect(result).toEqual({
      data: { data: 'test-data' },
      error: null,
      status: 200,
    });
  });

  test('fetchWithOptions 应该处理错误响应', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' }),
    };
    
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    const result = await fetchWithOptions('https://api.example.com/test');
    
    expect(result).toEqual({
      data: null,
      error: expect.any(Error),
      status: 404,
    });
    
    expect(result.error?.message).toContain('HTTP error! Status: 404');
  });

  test('fetchWithOptions 应该处理网络错误', async () => {
    const networkError = new TypeError('Network error');
    (global.fetch as any).mockRejectedValueOnce(networkError);
    
    // 模拟重试后成功
    const mockResponse = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'retry-success' }),
    };
    (global.fetch as any).mockResolvedValueOnce(mockResponse);
    
    const result = await fetchWithOptions('https://api.example.com/test', {
      retries: 1,
      retryDelay: 10, // 快速重试以加快测试
    });
    
    // 应该调用了两次 fetch（一次失败，一次重试成功）
    expect(global.fetch).toHaveBeenCalledTimes(2);
    
    expect(result).toEqual({
      data: { data: 'retry-success' },
      error: null,
      status: 200,
    });
  });

  test('fetchWithOptions 应该处理超时', async () => {
    // 模拟 AbortController
    const abortController = {
      signal: {},
      abort: vi.fn(),
    };
    
    vi.spyOn(global, 'AbortController').mockImplementationOnce(() => abortController as any);
    
    // 模拟超时错误
    const abortError = new DOMException('The operation was aborted', 'AbortError');
    (global.fetch as any).mockRejectedValueOnce(abortError);
    
    const result = await fetchWithOptions('https://api.example.com/test', {
      timeout: 100,
    });
    
    expect(result).toEqual({
      data: null,
      error: expect.any(Error),
      status: 408,
    });
    
    expect(result.error?.message).toBe('Request timeout');
  });

  test('cachedFetch 应该缓存响应', async () => {
    // 第一次调用
    const mockResponse1 = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({ data: 'test-data' }),
    };
    
    (global.fetch as any).mockResolvedValueOnce(mockResponse1);
    
    const result1 = await cachedFetch('https://api.example.com/test');
    
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result1.data).toEqual({ data: 'test-data' });
    
    // 第二次调用相同 URL，应该从缓存返回
    const result2 = await cachedFetch('https://api.example.com/test');
    
    // fetch 不应该被再次调用
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result2.data).toEqual({ data: 'test-data' });
  });
});
