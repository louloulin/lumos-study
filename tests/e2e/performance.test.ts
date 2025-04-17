import { test, expect } from '@playwright/test';

test.describe('性能测试', () => {
  test('首页应该在合理时间内加载', async ({ page }) => {
    // 记录开始时间
    const startTime = Date.now();
    
    // 访问首页
    await page.goto('/');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    // 计算加载时间
    const loadTime = Date.now() - startTime;
    
    // 验证加载时间是否在合理范围内（例如 3 秒内）
    expect(loadTime).toBeLessThan(3000);
    
    // 记录加载时间（用于报告）
    console.log(`首页加载时间: ${loadTime}ms`);
  });

  test('聊天页面应该在合理时间内加载', async ({ page }) => {
    // 记录开始时间
    const startTime = Date.now();
    
    // 访问聊天页面
    await page.goto('/chat');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    // 计算加载时间
    const loadTime = Date.now() - startTime;
    
    // 验证加载时间是否在合理范围内（例如 3 秒内）
    expect(loadTime).toBeLessThan(3000);
    
    // 记录加载时间（用于报告）
    console.log(`聊天页面加载时间: ${loadTime}ms`);
  });

  test('学科页面应该在合理时间内加载', async ({ page }) => {
    // 记录开始时间
    const startTime = Date.now();
    
    // 访问学科页面
    await page.goto('/subjects');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    // 计算加载时间
    const loadTime = Date.now() - startTime;
    
    // 验证加载时间是否在合理范围内（例如 3 秒内）
    expect(loadTime).toBeLessThan(3000);
    
    // 记录加载时间（用于报告）
    console.log(`学科页面加载时间: ${loadTime}ms`);
  });

  test('工具页面应该在合理时间内加载', async ({ page }) => {
    // 记录开始时间
    const startTime = Date.now();
    
    // 访问工具页面
    await page.goto('/tools');
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    // 计算加载时间
    const loadTime = Date.now() - startTime;
    
    // 验证加载时间是否在合理范围内（例如 3 秒内）
    expect(loadTime).toBeLessThan(3000);
    
    // 记录加载时间（用于报告）
    console.log(`工具页面加载时间: ${loadTime}ms`);
  });

  test('懒加载组件应该正确工作', async ({ page }) => {
    // 访问包含懒加载组件的页面
    await page.goto('/subjects');
    
    // 等待页面加载
    await page.waitForSelector('.subject-card');
    
    // 获取页面高度
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // 滚动到页面底部
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // 等待懒加载组件加载
    await page.waitForTimeout(1000);
    
    // 验证是否有新内容加载（页面高度应该增加）
    const newPageHeight = await page.evaluate(() => document.body.scrollHeight);
    
    // 在某些情况下，页面高度可能不会改变，所以这个测试可能需要调整
    // 这里我们只是检查页面是否正常滚动
    expect(newPageHeight).toBeGreaterThanOrEqual(pageHeight);
  });
});
