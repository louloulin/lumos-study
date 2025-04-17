import { test, expect } from '@playwright/test';

test.describe('学科功能', () => {
  test('应该显示所有学科', async ({ page }) => {
    // 访问学科页面
    await page.goto('/subjects');
    
    // 等待学科卡片加载
    await page.waitForSelector('.subject-card');
    
    // 验证是否有多个学科卡片
    const subjectCards = await page.$$('.subject-card');
    expect(subjectCards.length).toBeGreaterThan(0);
    
    // 验证每个卡片是否有标题和描述
    for (const card of subjectCards) {
      const hasTitle = await card.$('h3');
      const hasDescription = await card.$('p');
      
      expect(hasTitle).toBeTruthy();
      expect(hasDescription).toBeTruthy();
    }
  });

  test('应该能够导航到特定学科', async ({ page }) => {
    // 访问学科页面
    await page.goto('/subjects');
    
    // 等待学科卡片加载
    await page.waitForSelector('.subject-card');
    
    // 点击第一个学科卡片
    await page.click('.subject-card >> nth=0');
    
    // 等待学科详情页面加载
    await page.waitForSelector('h1');
    
    // 验证是否导航到了学科详情页面
    const currentUrl = page.url();
    expect(currentUrl).toContain('/subjects/');
    
    // 验证是否显示了学科标题和描述
    const hasTitle = await page.isVisible('h1');
    const hasDescription = await page.isVisible('.subject-description');
    
    expect(hasTitle).toBeTruthy();
    expect(hasDescription).toBeTruthy();
  });

  test('应该显示学科的主题列表', async ({ page }) => {
    // 访问特定学科页面（例如数学）
    await page.goto('/subjects/math');
    
    // 等待主题列表加载
    await page.waitForSelector('.topic-list');
    
    // 验证是否有多个主题
    const topics = await page.$$('.topic-item');
    expect(topics.length).toBeGreaterThan(0);
  });

  test('应该能够导航到特定主题', async ({ page }) => {
    // 访问特定学科页面（例如数学）
    await page.goto('/subjects/math');
    
    // 等待主题列表加载
    await page.waitForSelector('.topic-list');
    
    // 点击第一个主题
    await page.click('.topic-item >> nth=0');
    
    // 等待主题详情页面加载
    await page.waitForSelector('h1');
    
    // 验证是否导航到了主题详情页面
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/subjects\/math\/[a-z-]+/);
    
    // 验证是否显示了主题内容
    const hasContent = await page.isVisible('.topic-content');
    expect(hasContent).toBeTruthy();
  });

  test('应该能够使用"询问 AI"功能', async ({ page }) => {
    // 访问特定主题页面
    await page.goto('/subjects/math/algebra');
    
    // 等待页面加载
    await page.waitForSelector('.topic-content');
    
    // 点击"询问 AI"按钮
    await page.click('button:has-text("询问 AI")');
    
    // 验证是否导航到了聊天页面，并带有预填充的问题
    await page.waitForNavigation();
    const currentUrl = page.url();
    expect(currentUrl).toContain('/chat?question=');
    
    // 验证聊天输入框是否包含预填充的问题
    const inputValue = await page.inputValue('form textarea');
    expect(inputValue).toBeTruthy();
    expect(inputValue.length).toBeGreaterThan(10);
  });
});
