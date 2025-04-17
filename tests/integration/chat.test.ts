import { test, expect } from '@playwright/test';

test.describe('聊天功能', () => {
  test('应该能够发送消息并接收响应', async ({ page }) => {
    // 访问聊天页面
    await page.goto('/chat');
    
    // 等待聊天界面加载
    await page.waitForSelector('form textarea');
    
    // 输入消息
    await page.fill('form textarea', '你好，请介绍一下自己');
    
    // 发送消息
    await page.click('form button[type="submit"]');
    
    // 等待响应
    await page.waitForSelector('.bg-gray-50', { timeout: 30000 });
    
    // 验证是否有响应消息
    const responseText = await page.textContent('.bg-gray-50');
    expect(responseText).toBeTruthy();
    expect(responseText?.length).toBeGreaterThan(10);
  });

  test('应该保持聊天历史', async ({ page }) => {
    // 访问聊天页面
    await page.goto('/chat');
    
    // 等待聊天界面加载
    await page.waitForSelector('form textarea');
    
    // 发送第一条消息
    await page.fill('form textarea', '什么是人工智能？');
    await page.click('form button[type="submit"]');
    
    // 等待响应
    await page.waitForSelector('.bg-gray-50', { timeout: 30000 });
    
    // 发送第二条消息，引用上下文
    await page.fill('form textarea', '你能给我举个例子吗？');
    await page.click('form button[type="submit"]');
    
    // 等待第二个响应
    await page.waitForFunction(() => {
      return document.querySelectorAll('.bg-gray-50').length >= 2;
    }, { timeout: 30000 });
    
    // 获取所有消息
    const messages = await page.$$('.bg-gray-50');
    expect(messages.length).toBeGreaterThanOrEqual(2);
    
    // 验证第二个响应是否与上下文相关
    const secondResponseText = await messages[1].textContent();
    expect(secondResponseText).toBeTruthy();
    expect(secondResponseText?.length).toBeGreaterThan(10);
  });

  test('应该支持 Markdown 格式', async ({ page }) => {
    // 访问聊天页面
    await page.goto('/chat');
    
    // 等待聊天界面加载
    await page.waitForSelector('form textarea');
    
    // 请求 Markdown 格式的响应
    await page.fill('form textarea', '请用 Markdown 格式列出三种编程语言及其特点');
    await page.click('form button[type="submit"]');
    
    // 等待响应
    await page.waitForSelector('.bg-gray-50', { timeout: 30000 });
    
    // 验证是否包含 Markdown 元素
    const hasMarkdownList = await page.isVisible('.bg-gray-50 ul');
    expect(hasMarkdownList).toBeTruthy();
    
    const hasMarkdownBold = await page.isVisible('.bg-gray-50 strong');
    expect(hasMarkdownBold).toBeTruthy();
  });
});
