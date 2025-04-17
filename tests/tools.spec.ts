import { test, expect } from '@playwright/test';

test('tools page displays all learning tools', async ({ page }) => {
  await page.goto('/tools');

  // Check page title
  await expect(page).toHaveTitle(/学习工具/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('学习工具');

  // Check all tools are displayed
  await expect(page.getByRole('heading', { name: '文本摘要工具' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '数学问题解算器' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '图像识别' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '闪卡学习' })).toBeVisible();

  // Check tool descriptions
  await expect(page.getByText('将长文本和教科书内容转化为简洁的摘要')).toBeVisible();
  await expect(page.getByText('解决各种数学问题，提供详细步骤')).toBeVisible();
  await expect(page.getByText('上传图片获取文本提取和问题解答')).toBeVisible();

  // Check navigation links
  const toolLinks = page.getByText('使用工具');
  await expect(toolLinks).toHaveCount(4);
});

test('image recognition tool page displays correctly', async ({ page }) => {
  await page.goto('/tools/image-recognition');

  // Check page title
  await expect(page).toHaveTitle(/图像识别/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('图像识别');

  // Check uploader component
  await expect(page.getByText('点击或拖放图片到此处上传')).toBeVisible();
  await expect(page.getByText('支持 JPG, PNG, GIF 格式，最大 5MB')).toBeVisible();

  // Check instructions
  await expect(page.getByText('使用说明')).toBeVisible();
  await expect(page.getByText('上传包含文本或数学问题的图片')).toBeVisible();
  await expect(page.getByText('AI 将自动识别图片中的文本内容')).toBeVisible();
});

test('math solver tool page displays correctly', async ({ page }) => {
  await page.goto('/tools/math-solver');

  // Check page title
  await expect(page).toHaveTitle(/数学问题解算器/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('数学问题解算器');

  // Check input form
  await expect(page.getByLabel('输入数学问题')).toBeVisible();
  await expect(page.getByRole('button', { name: '解答问题' })).toBeVisible();
  await expect(page.getByRole('button', { name: '示例 1' })).toBeVisible();

  // Check supported math types
  await expect(page.getByText('支持的数学类型')).toBeVisible();
  await expect(page.getByText('代数方程（一元、二元、多元）')).toBeVisible();
  await expect(page.getByText('微积分（导数、积分、极限）')).toBeVisible();
});

test('text summarizer tool page displays correctly', async ({ page }) => {
  await page.goto('/tools/summarizer');

  // Check page title
  await expect(page).toHaveTitle(/文本摘要工具/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('文本摘要工具');

  // Check input form
  await expect(page.getByLabel('输入文本')).toBeVisible();
  await expect(page.getByText('使用示例文本')).toBeVisible();
  await expect(page.getByRole('button', { name: '生成摘要' })).toBeVisible();

  // Check summary types
  await expect(page.getByRole('button', { name: '简洁摘要' })).toBeVisible();
  await expect(page.getByRole('button', { name: '详细摘要' })).toBeVisible();
  await expect(page.getByRole('button', { name: '学习笔记' })).toBeVisible();
});

test('flashcards tool page displays correctly', async ({ page }) => {
  await page.goto('/tools/flashcards');

  // Check page title
  await expect(page).toHaveTitle(/闪卡学习/);

  // Check heading
  const heading = page.locator('h1');
  await expect(heading).toContainText('闪卡学习');

  // Check flashcard manager
  await expect(page.getByText('我的闪卡')).toBeVisible();
  await expect(page.getByRole('button', { name: '创建闪卡' })).toBeVisible();

  // Check instructions
  await expect(page.getByText('闪卡学习法')).toBeVisible();
  await expect(page.getByText('闪卡是一种高效的学习工具，利用间隔重复原理帮助记忆知识点')).toBeVisible();
});
