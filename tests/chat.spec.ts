import { test, expect } from '@playwright/test';

test('chat page has correct elements', async ({ page }) => {
  await page.goto('/chat');
  
  // Check page heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('AI 学习助手');
  
  // Check chat interface exists
  const chatInterface = page.locator('.assistant-ui');
  await expect(chatInterface).toBeVisible();
  
  // Check input field exists
  const inputField = page.getByPlaceholder('输入您的问题...');
  await expect(inputField).toBeVisible();
  
  // Check send button exists
  const sendButton = page.getByRole('button', { name: '发送' });
  await expect(sendButton).toBeVisible();
});
