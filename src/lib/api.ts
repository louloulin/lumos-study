import { withCache } from './cache';

interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
  cache?: boolean;
  cacheTtl?: number;
}

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}

/**
 * 增强的 fetch 函数，支持重试、超时、缓存等功能
 */
export async function fetchWithOptions<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    retries = 3,
    retryDelay = 300,
    timeout = 8000,
    cache = false,
    cacheTtl = 60, // 默认缓存 60 秒
    ...fetchOptions
  } = options;

  // 如果启用缓存，使用缓存装饰器
  if (cache) {
    return withCache(
      () => fetchWithRetry<T>(url, { ...options, cache: false }),
      'api-fetch',
      cacheTtl
    )();
  }

  return fetchWithRetry<T>(url, options);
}

/**
 * 带重试功能的 fetch 函数
 */
async function fetchWithRetry<T>(
  url: string,
  options: FetchOptions,
  attempt = 1
): Promise<ApiResponse<T>> {
  const {
    retries = 3,
    retryDelay = 300,
    timeout = 8000,
    ...fetchOptions
  } = options;

  // 创建 AbortController 用于超时控制
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 处理非 2xx 响应
    if (!response.ok) {
      // 对于某些状态码，我们可能想要重试
      if (
        attempt <= retries &&
        [408, 429, 500, 502, 503, 504].includes(response.status)
      ) {
        // 指数退避策略
        const delay = retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        return fetchWithRetry<T>(url, options, attempt + 1);
      }

      return {
        data: null,
        error: new Error(`HTTP error! Status: ${response.status}`),
        status: response.status,
      };
    }

    // 解析 JSON 响应
    const data = await response.json();

    return {
      data: data as T,
      error: null,
      status: response.status,
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    // 处理超时
    if (error.name === 'AbortError') {
      return {
        data: null,
        error: new Error('Request timeout'),
        status: 408,
      };
    }

    // 处理网络错误，尝试重试
    if (attempt <= retries && ['TypeError', 'NetworkError'].includes(error.name)) {
      const delay = retryDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry<T>(url, options, attempt + 1);
    }

    return {
      data: null,
      error,
      status: 0,
    };
  }
}

/**
 * 使用缓存的 API 请求函数
 */
export const cachedFetch = <T>(url: string, options: FetchOptions = {}) => {
  return fetchWithOptions<T>(url, { ...options, cache: true });
};
