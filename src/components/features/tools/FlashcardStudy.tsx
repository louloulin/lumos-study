'use client';

import { useState } from 'react';
import { FlashcardType } from './FlashcardManager';

interface FlashcardStudyProps {
  flashcards: FlashcardType[];
  onUpdate: (flashcard: FlashcardType) => void;
  onFinish: () => void;
}

export function FlashcardStudy({ flashcards, onUpdate, onFinish }: FlashcardStudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<string[]>([]);
  
  const currentCard = flashcards[currentIndex];
  const progress = Math.round((studiedCards.length / flashcards.length) * 100);
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const calculateNextReview = (difficulty: 'easy' | 'medium' | 'hard'): Date => {
    const now = new Date();
    let daysToAdd = 1;
    
    switch (difficulty) {
      case 'easy':
        daysToAdd = 7; // Review in 7 days
        break;
      case 'medium':
        daysToAdd = 3; // Review in 3 days
        break;
      case 'hard':
        daysToAdd = 1; // Review tomorrow
        break;
    }
    
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    return nextReview;
  };
  
  const handleRate = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Update the current card
    const updatedCard: FlashcardType = {
      ...currentCard,
      lastReviewed: new Date(),
      nextReview: calculateNextReview(difficulty),
      difficulty,
    };
    
    onUpdate(updatedCard);
    
    // Mark card as studied
    setStudiedCards([...studiedCards, currentCard.id]);
    
    // Move to next card or finish
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      // All cards studied
      onFinish();
    }
  };
  
  if (flashcards.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-4">没有可学习的闪卡</p>
        <button
          onClick={onFinish}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          返回
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">学习闪卡</h2>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {flashcards.length}
        </div>
      </div>
      
      <div className="mb-4 bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div
        className={`border rounded-lg overflow-hidden mb-6 cursor-pointer ${
          isFlipped ? 'bg-blue-50' : 'bg-white'
        }`}
        onClick={handleFlip}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm text-gray-500">{currentCard.category}</span>
            <span className="text-sm text-gray-500">
              {isFlipped ? '答案' : '问题'} (点击翻转)
            </span>
          </div>
          
          <div className="min-h-[200px] flex items-center justify-center">
            <p className="text-center text-lg">
              {isFlipped ? currentCard.answer : currentCard.question}
            </p>
          </div>
        </div>
      </div>
      
      {isFlipped && (
        <div>
          <p className="text-center mb-4 text-gray-600">
            您对这个问题的掌握程度如何？
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleRate('hard')}
              className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              困难
            </button>
            <button
              onClick={() => handleRate('medium')}
              className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
            >
              一般
            </button>
            <button
              onClick={() => handleRate('easy')}
              className="px-4 py-2 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
            >
              简单
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onFinish}
          className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          结束学习
        </button>
        
        {!isFlipped && (
          <button
            onClick={handleFlip}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            查看答案
          </button>
        )}
      </div>
    </div>
  );
}
