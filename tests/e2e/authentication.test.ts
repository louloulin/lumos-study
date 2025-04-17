import { test, expect } from '@playwright/test';

test.describe('认证流程', () => {
  test('用户应该能够注册、登录和登出', async ({ page }) => {
    // 生成唯一的测试邮箱
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'Test@123456';
    const testName = '测试用户';
    
    // 1. 访问首页
    await page.goto('/');
    
    // 2. 点击注册按钮
    await page.click('a:has-text("注册")');
    
    // 等待注册页面加载
    await page.waitForSelector('form');
    
    // 3. 填写注册表单
    await page.fill('input[name="name"]', testName);
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    
    // 4. 提交注册表单
    await page.click('button[type="submit"]');
    
    // 等待注册完成并重定向
    await page.waitForNavigation();
    
    // 5. 验证是否注册成功并登录
    const currentUrl = page.url();
    expect(currentUrl).toContain('/dashboard');
    
    // 验证用户名是否显示在导航栏
    const userMenu = await page.textContent('.user-menu');
    expect(userMenu).toContain(testName);
    
    // 6. 登出
    await page.click('.user-menu');
    await page.click('button:has-text("登出")');
    
    // 等待登出完成并重定向
    await page.waitForNavigation();
    
    // 验证是否已登出
    const loginButton = await page.isVisible('a:has-text("登录")');
    expect(loginButton).toBeTruthy();
    
    // 7. 登录
    await page.click('a:has-text("登录")');
    
    // 等待登录页面加载
    await page.waitForSelector('form');
    
    // 填写登录表单
    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    
    // 提交登录表单
    await page.click('button[type="submit"]');
    
    // 等待登录完成并重定向
    await page.waitForNavigation();
    
    // 验证是否登录成功
    const dashboardUrl = page.url();
    expect(dashboardUrl).toContain('/dashboard');
    
    // 验证用户名是否显示在导航栏
    const userMenuAfterLogin = await page.textContent('.user-menu');
    expect(userMenuAfterLogin).toContain(testName);
  });

  test('应该阻止未认证用户访问受保护页面', async ({ page }) => {
    // 尝试直接访问仪表板页面
    await page.goto('/dashboard');
    
    // 应该被重定向到登录页面
    await page.waitForNavigation();
    const currentUrl = page.url();
    expect(currentUrl).toContain('/auth/signin');
    
    // 验证是否显示了登录表单
    const formExists = await page.isVisible('form');
    expect(formExists).toBeTruthy();
  });
});
