'use client';

import { useState } from 'react';
import { FlashcardType } from './FlashcardManager';

interface FlashcardCreatorProps {
  onAdd: (flashcard: FlashcardType) => void;
  onCancel: () => void;
  categories: string[];
}

export function FlashcardCreator({ onAdd, onCancel, categories }: FlashcardCreatorProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState(categories.length > 0 ? categories[0] : '');
  const [newCategory, setNewCategory] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [bulkText, setBulkText] = useState('');
  const [showBulkCreator, setShowBulkCreator] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !answer.trim()) return;
    
    const finalCategory = category === 'new' ? newCategory : category;
    
    if (category === 'new' && !newCategory.trim()) return;
    
    const newFlashcard: FlashcardType = {
      id: Date.now().toString(),
      question: question.trim(),
      answer: answer.trim(),
      category: finalCategory.trim(),
      lastReviewed: null,
      nextReview: null,
      difficulty,
    };
    
    onAdd(newFlashcard);
    
    // Reset form
    setQuestion('');
    setAnswer('');
    setCategory(finalCategory);
    setNewCategory('');
  };
  
  const handleGenerateFromText = async () => {
    if (!bulkText.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // In a real implementation, we would use the Mastra agent to generate flashcards
      // For now, we'll simulate the response
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate some sample flashcards based on the text
      const sampleFlashcards = [
        {
          question: '什么是人工智能？',
          answer: '人工智能是计算机科学的一个分支，致力于创造能够模拟人类智能的机器。',
        },
        {
          question: '人工智能研究始于哪个年代？',
          answer: '人工智能的研究始于20世纪50年代，当时计算机科学家开始探索机器是否可以"思考"。',
        },
        {
          question: '深度学习是什么？',
          answer: '深度学习是机器学习的一个子集，使用多层神经网络来分析各种因素。',
        },
      ];
      
      // Add the generated flashcards
      for (const card of sampleFlashcards) {
        const newFlashcard: FlashcardType = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
          question: card.question,
          answer: card.answer,
          category: category === 'new' ? newCategory : category,
          lastReviewed: null,
          nextReview: null,
          difficulty,
        };
        
        onAdd(newFlashcard);
        
        // Small delay between adding cards to ensure unique IDs
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      // Reset form
      setBulkText('');
      setShowBulkCreator(false);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">创建闪卡</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowBulkCreator(!showBulkCreator)}
            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            {showBulkCreator ? '手动创建' : 'AI 生成闪卡'}
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
          >
            取消
          </button>
        </div>
      </div>
      
      {showBulkCreator ? (
        <div>
          <p className="text-gray-600 mb-4">
            粘贴文本内容，AI 将自动生成相关的闪卡。文本越详细，生成的闪卡质量越高。
          </p>
          
          <div className="mb-4">
            <label htmlFor="bulkText" className="block text-sm font-medium text-gray-700 mb-1">
              文本内容
            </label>
            <textarea
              id="bulkText"
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="粘贴文本内容，如教科书段落、笔记等..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="bulkCategory" className="block text-sm font-medium text-gray-700 mb-1">
                类别
              </label>
              <select
                id="bulkCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="new">新建类别...</option>
              </select>
              
              {category === 'new' && (
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="输入新类别名称"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </div>
            
            <div>
              <label htmlFor="bulkDifficulty" className="block text-sm font-medium text-gray-700 mb-1">
                难度
              </label>
              <select
                id="bulkDifficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleGenerateFromText}
              disabled={isGenerating || !bulkText.trim() || (category === 'new' && !newCategory.trim())}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isGenerating ? '生成中...' : '生成闪卡'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              问题
            </label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="输入问题..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
              答案
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="输入答案..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                类别
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
                <option value="new">新建类别...</option>
              </select>
              
              {category === 'new' && (
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="输入新类别名称"
                  className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
            
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                难度
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">简单</option>
                <option value="medium">中等</option>
                <option value="hard">困难</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!question.trim() || !answer.trim() || (category === 'new' && !newCategory.trim())}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              创建闪卡
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
