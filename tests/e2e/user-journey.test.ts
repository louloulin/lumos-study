import { test, expect } from '@playwright/test';

test.describe('用户旅程', () => {
  test('新用户应该能够完成完整的学习旅程', async ({ page }) => {
    // 1. 访问首页
    await page.goto('/');
    
    // 等待页面加载
    await page.waitForSelector('h1');
    
    // 验证首页标题
    const heroTitle = await page.textContent('h1');
    expect(heroTitle).toContain('Lumos Study');
    
    // 2. 导航到学科页面
    await page.click('a:has-text("学科")');
    
    // 等待学科页面加载
    await page.waitForSelector('.subject-card');
    
    // 3. 选择一个学科（例如数学）
    await page.click('.subject-card:has-text("数学")');
    
    // 等待学科详情页面加载
    await page.waitForSelector('.topic-list');
    
    // 4. 选择一个主题（例如代数）
    await page.click('.topic-item:has-text("代数")');
    
    // 等待主题详情页面加载
    await page.waitForSelector('.topic-content');
    
    // 5. 阅读主题内容
    const topicContent = await page.textContent('.topic-content');
    expect(topicContent?.length).toBeGreaterThan(100);
    
    // 6. 使用"询问 AI"功能
    await page.click('button:has-text("询问 AI")');
    
    // 等待导航到聊天页面
    await page.waitForNavigation();
    await page.waitForSelector('form textarea');
    
    // 7. 发送问题并获取回答
    await page.click('form button[type="submit"]');
    
    // 等待 AI 响应
    await page.waitForSelector('.bg-gray-50', { timeout: 30000 });
    
    // 验证是否收到回答
    const responseText = await page.textContent('.bg-gray-50');
    expect(responseText).toBeTruthy();
    expect(responseText?.length).toBeGreaterThan(100);
    
    // 8. 导航到工具页面
    await page.click('a:has-text("工具")');
    
    // 等待工具页面加载
    await page.waitForSelector('.tool-card');
    
    // 9. 选择一个工具（例如数学问题解算器）
    await page.click('.tool-card:has-text("数学问题解算器")');
    
    // 等待工具页面加载
    await page.waitForSelector('form textarea');
    
    // 10. 使用工具解决问题
    await page.fill('form textarea', '求解方程 3x - 7 = 14');
    await page.click('form button[type="submit"]');
    
    // 等待结果
    await page.waitForSelector('.result-container', { timeout: 30000 });
    
    // 验证是否显示了结果
    const resultText = await page.textContent('.result-container');
    expect(resultText).toBeTruthy();
    expect(resultText).toContain('x = 7');
    
    // 11. 返回首页
    await page.click('a:has-text("首页")');
    
    // 等待首页加载
    await page.waitForSelector('h1');
    
    // 验证是否返回首页
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/$/);
  });
});
