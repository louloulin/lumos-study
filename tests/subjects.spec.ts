import { test, expect } from '@playwright/test';

test('subjects page displays all subjects', async ({ page }) => {
  await page.goto('/subjects');
  
  // Check page heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学科');
  
  // Check all subjects are displayed
  await expect(page.getByText('数学')).toBeVisible();
  await expect(page.getByText('科学')).toBeVisible();
  await expect(page.getByText('语言')).toBeVisible();
  await expect(page.getByText('人文')).toBeVisible();
  
  // Check navigation links
  await expect(page.getByText('浏览 数学')).toBeVisible();
  await expect(page.getByText('浏览 科学')).toBeVisible();
  await expect(page.getByText('浏览 语言')).toBeVisible();
  await expect(page.getByText('浏览 人文')).toBeVisible();
});
