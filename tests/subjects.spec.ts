import { test, expect } from '@playwright/test';

test('subjects page displays all subjects correctly', async ({ page }) => {
  await page.goto('/subjects');

  // Check page title
  await expect(page).toHaveTitle(/学科/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学科');

  // Check all subjects are displayed
  await expect(page.getByRole('heading', { name: '数学' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '科学' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '语言' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '人文' })).toBeVisible();

  // Check subject descriptions
  await expect(page.getByText('包括代数、几何、微积分等数学学科')).toBeVisible();
  await expect(page.getByText('包括物理、化学、生物等科学学科')).toBeVisible();

  // Check navigation links
  await expect(page.getByText('浏览 数学')).toBeVisible();
  await expect(page.getByText('浏览 科学')).toBeVisible();
  await expect(page.getByText('浏览 语言')).toBeVisible();
  await expect(page.getByText('浏览 人文')).toBeVisible();
});

test('subject detail page displays correctly', async ({ page }) => {
  // Navigate to math subject page
  await page.goto('/subjects/math');

  // Check page title
  await expect(page).toHaveTitle(/数学/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('数学');

  // Check subject description
  await expect(page.getByText('包括代数、几何、微积分等数学学科')).toBeVisible();

  // Check topics are displayed
  await expect(page.getByText('代数')).toBeVisible();
  await expect(page.getByText('几何')).toBeVisible();
  await expect(page.getByText('微积分')).toBeVisible();

  // Check "Ask AI" button
  await expect(page.getByText('询问 AI 导师')).toBeVisible();
});

test('topic detail page displays correctly', async ({ page }) => {
  // Navigate to algebra topic page
  await page.goto('/subjects/math/algebra');

  // Check page title
  await expect(page).toHaveTitle(/代数/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('数学 - 代数');

  // Check topic description
  await expect(page.getByText('学习代数基础、方程式和函数')).toBeVisible();

  // Check topic content
  await expect(page.getByText('代数基础')).toBeVisible();
  await expect(page.getByText('代数是数学的一个分支')).toBeVisible();

  // Check sidebar navigation
  await expect(page.getByText('主题列表')).toBeVisible();

  // Check "Ask AI" button
  await expect(page.getByText('询问 AI 导师')).toBeVisible();
});
