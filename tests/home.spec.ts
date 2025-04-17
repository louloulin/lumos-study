import { test, expect } from '@playwright/test';

test('home page has correct title and content', async ({ page }) => {
  await page.goto('/');

  // Check page title
  await expect(page).toHaveTitle(/Lumos Study/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('Lumos Study - 智能教育平台');

  // Check navigation links
  await expect(page.locator('nav')).toContainText('首页');
  await expect(page.locator('nav')).toContainText('学科');
  await expect(page.locator('nav')).toContainText('AI 聊天');
  await expect(page.locator('nav')).toContainText('学习工具');

  // Check features section
  await expect(page.getByRole('heading', { name: '为学习而设计的智能平台' })).toBeVisible();

  // Check CTA section
  const ctaButton = page.getByRole('link', { name: '开始聊天' }).first();
  await expect(ctaButton).toBeVisible();
});
