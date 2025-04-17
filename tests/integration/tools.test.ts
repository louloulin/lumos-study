import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('工具功能', () => {
  test('应该显示所有工具', async ({ page }) => {
    // 访问工具页面
    await page.goto('/tools');
    
    // 等待工具卡片加载
    await page.waitForSelector('.tool-card');
    
    // 验证是否有多个工具卡片
    const toolCards = await page.$$('.tool-card');
    expect(toolCards.length).toBeGreaterThan(0);
    
    // 验证每个卡片是否有标题和描述
    for (const card of toolCards) {
      const hasTitle = await card.$('h3');
      const hasDescription = await card.$('p');
      
      expect(hasTitle).toBeTruthy();
      expect(hasDescription).toBeTruthy();
    }
  });

  test('应该能够使用数学问题解算器', async ({ page }) => {
    // 访问数学问题解算器页面
    await page.goto('/tools/math-solver');
    
    // 等待页面加载
    await page.waitForSelector('form textarea');
    
    // 输入数学问题
    await page.fill('form textarea', '求解方程 2x + 5 = 15');
    
    // 提交问题
    await page.click('form button[type="submit"]');
    
    // 等待结果
    await page.waitForSelector('.result-container', { timeout: 30000 });
    
    // 验证是否显示了结果
    const resultText = await page.textContent('.result-container');
    expect(resultText).toBeTruthy();
    expect(resultText).toContain('x = 5');
  });

  test('应该能够使用文本摘要工具', async ({ page }) => {
    // 访问文本摘要工具页面
    await page.goto('/tools/text-summarizer');
    
    // 等待页面加载
    await page.waitForSelector('form textarea');
    
    // 输入长文本
    const longText = `
      人工智能（AI）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。
      这些系统可以学习、推理、感知、规划和解决问题。
      AI 的应用范围广泛，包括自然语言处理、计算机视觉、机器人技术、医疗诊断和游戏等领域。
      深度学习是 AI 的一个子领域，使用多层神经网络来分析数据并做出决策。
      随着计算能力的提高和数据可用性的增加，AI 技术在近年来取得了显著进展。
      然而，AI 的发展也带来了伦理和隐私方面的担忧，需要社会各界共同关注和解决。
    `;
    await page.fill('form textarea', longText);
    
    // 选择摘要类型和长度
    await page.selectOption('select[name="type"]', 'bullet');
    await page.selectOption('select[name="length"]', 'short');
    
    // 提交请求
    await page.click('form button[type="submit"]');
    
    // 等待结果
    await page.waitForSelector('.summary-container', { timeout: 30000 });
    
    // 验证是否显示了摘要
    const summaryText = await page.textContent('.summary-container');
    expect(summaryText).toBeTruthy();
    expect(summaryText?.length).toBeLessThan(longText.length);
  });

  test('应该能够使用图像识别功能', async ({ page }) => {
    // 访问图像识别页面
    await page.goto('/tools/image-recognition');
    
    // 等待页面加载
    await page.waitForSelector('input[type="file"]');
    
    // 上传测试图片
    const testImagePath = path.join(__dirname, '../fixtures/math-equation.png');
    await page.setInputFiles('input[type="file"]', testImagePath);
    
    // 等待图片预览
    await page.waitForSelector('.image-preview');
    
    // 选择识别类型
    await page.selectOption('select[name="recognitionType"]', 'math');
    
    // 提交请求
    await page.click('button:has-text("识别")');
    
    // 等待结果
    await page.waitForSelector('.recognition-result', { timeout: 60000 });
    
    // 验证是否显示了识别结果
    const resultText = await page.textContent('.recognition-result');
    expect(resultText).toBeTruthy();
    expect(resultText?.length).toBeGreaterThan(0);
  });

  test('应该能够使用闪卡学习功能', async ({ page }) => {
    // 访问闪卡学习页面
    await page.goto('/tools/flashcards');
    
    // 等待页面加载
    await page.waitForSelector('button:has-text("创建新闪卡")');
    
    // 点击创建新闪卡
    await page.click('button:has-text("创建新闪卡")');
    
    // 等待创建表单
    await page.waitForSelector('form.flashcard-form');
    
    // 填写闪卡信息
    await page.fill('input[name="question"]', '什么是人工智能？');
    await page.fill('textarea[name="answer"]', '人工智能是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。');
    await page.fill('input[name="category"]', '计算机科学');
    
    // 保存闪卡
    await page.click('button:has-text("保存")');
    
    // 等待闪卡列表更新
    await page.waitForSelector('.flashcard-list');
    
    // 验证是否添加了新闪卡
    const flashcards = await page.$$('.flashcard-item');
    expect(flashcards.length).toBeGreaterThan(0);
    
    // 点击学习按钮
    await page.click('button:has-text("开始学习")');
    
    // 等待学习模式
    await page.waitForSelector('.flashcard-study-mode');
    
    // 验证是否显示了问题
    const questionText = await page.textContent('.flashcard-question');
    expect(questionText).toBeTruthy();
    expect(questionText).toContain('什么是人工智能？');
    
    // 点击显示答案
    await page.click('button:has-text("显示答案")');
    
    // 验证是否显示了答案
    const answerText = await page.textContent('.flashcard-answer');
    expect(answerText).toBeTruthy();
    expect(answerText).toContain('人工智能是计算机科学的一个分支');
  });
});
