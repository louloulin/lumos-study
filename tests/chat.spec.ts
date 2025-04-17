import { test, expect } from '@playwright/test';

test('chat page has correct elements', async ({ page }) => {
  await page.goto('/chat');

  // Check page heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('AI 学习助手');

  // Check welcome message
  await expect(page.getByText('开始与 AI 导师对话')).toBeVisible();

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
  await expect(page.getByText('Lumos 导师')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText('你好！我是 Lumos 导师')).toBeVisible();
});

test('chat memory system maintains conversation context', async ({ page }) => {
  await page.goto('/chat');

  // First message about math
  await page.getByPlaceholder('输入您的问题...').fill('我需要数学帮助');
  await page.getByRole('button', { name: '发送' }).click();

  // Wait for response
  await expect(page.getByText('数学是一门非常有趣的学科')).toBeVisible({ timeout: 5000 });

  // Follow-up question
  await page.getByPlaceholder('输入您的问题...').fill('我需要帮助解决二次方程');
  await page.getByRole('button', { name: '发送' }).click();

  // Check that the conversation maintains context about math
  await expect(page.getByText('数学是一门非常有趣的学科')).toBeVisible({ timeout: 5000 });

  // Verify timestamp is displayed
  await expect(page.locator('.text-xs.text-gray-500').first()).toBeVisible();
});
