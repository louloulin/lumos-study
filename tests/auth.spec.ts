import { test, expect } from '@playwright/test';

test('auth flow - sign up, sign in, and profile update', async ({ page }) => {
  // 生成随机邮箱以避免冲突
  const randomEmail = `test${Math.floor(Math.random() * 10000)}@example.com`;
  const password = 'Password123!';
  
  // 1. 访问注册页面
  await page.goto('/auth/signup');
  
  // 检查页面标题
  await expect(page).toHaveTitle(/注册/);
  
  // 2. 填写注册表单
  await page.getByLabel('姓名').fill('测试用户');
  await page.getByLabel('邮箱').fill(randomEmail);
  await page.getByLabel('密码').fill(password);
  await page.getByLabel('确认密码').fill(password);
  await page.getByLabel('我同意').check();
  
  // 3. 提交注册表单
  await page.getByRole('button', { name: '注册' }).click();
  
  // 4. 检查是否重定向到仪表板
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('欢迎回来，测试用户')).toBeVisible();
  
  // 5. 退出登录
  await page.getByText('测试用户').click();
  await page.getByText('退出登录').click();
  
  // 6. 访问登录页面
  await page.goto('/auth/signin');
  
  // 检查页面标题
  await expect(page).toHaveTitle(/登录/);
  
  // 7. 填写登录表单
  await page.getByLabel('邮箱').fill(randomEmail);
  await page.getByLabel('密码').fill(password);
  
  // 8. 提交登录表单
  await page.getByRole('button', { name: '登录' }).click();
  
  // 9. 检查是否重定向到仪表板
  await expect(page).toHaveURL('/dashboard');
  
  // 10. 访问个人资料页面
  await page.getByText('测试用户').click();
  await page.getByText('个人资料').click();
  
  // 11. 更新个人资料
  await page.getByLabel('年级').selectOption('高中一年级');
  await page.getByLabel('学校').fill('测试学校');
  await page.getByLabel('兴趣爱好').fill('数学, 科学, 编程');
  
  // 12. 保存个人资料
  await page.getByRole('button', { name: '保存资料' }).click();
  
  // 13. 检查是否成功保存
  await expect(page.getByText('个人资料已更新')).toBeVisible();
  
  // 14. 返回仪表板并检查更新后的信息
  await page.goto('/dashboard');
  await expect(page.getByText('高中一年级')).toBeVisible();
  await expect(page.getByText('测试学校')).toBeVisible();
});
