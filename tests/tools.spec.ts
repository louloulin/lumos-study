import { test, expect } from '@playwright/test';

test('tools page displays all learning tools', async ({ page }) => {
  await page.goto('/tools');
  
  // Check page heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学习工具');
  
  // Check all tools are displayed
  await expect(page.getByText('文本摘要工具')).toBeVisible();
  await expect(page.getByText('数学问题解算器')).toBeVisible();
  await expect(page.getByText('图像识别')).toBeVisible();
  await expect(page.getByText('闪卡学习')).toBeVisible();
  
  // Check navigation links
  const toolLinks = page.getByText('使用工具');
  await expect(toolLinks).toHaveCount(4);
});
