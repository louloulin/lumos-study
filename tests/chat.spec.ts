import { test, expect } from '@playwright/test';

test('chat page has correct elements', async ({ page }) => {
  await page.goto('/chat');

  // Check page heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('AI 学习助手');

  // Check input field exists
  const inputField = page.getByPlaceholder('输入您的问题...');
  await expect(inputField).toBeVisible();

  // Check send button exists
  const sendButton = page.getByRole('button', { name: '发送' });
  await expect(sendButton).toBeVisible();
});

test('chat functionality works correctly', async ({ page }) => {
  await page.goto('/chat');

  // Type a message
  await page.getByPlaceholder('输入您的问题...').fill('你好');

  // Send the message
  await page.getByRole('button', { name: '发送' }).click();

  // Check that user message appears
  await expect(page.getByText('您')).toBeVisible();
  await expect(page.getByText('你好')).toBeVisible();

  // Check that AI response appears (with timeout for the simulated response)
  await expect(page.getByText('AI 助手')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('这是对')).toBeVisible();
});
