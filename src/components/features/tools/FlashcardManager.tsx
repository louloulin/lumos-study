'use client';

import { useState, useEffect } from 'react';
import { Flashcard } from './Flashcard';
import { FlashcardCreator } from './FlashcardCreator';
import { FlashcardStudy } from './FlashcardStudy';

export interface FlashcardType {
  id: string;
  question: string;
  answer: string;
  category: string;
  lastReviewed: Date | null;
  nextReview: Date | null;
  difficulty: 'easy' | 'medium' | 'hard';
}

export function FlashcardManager() {
  const [view, setView] = useState<'list' | 'create' | 'study'>('list');
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Load flashcards from localStorage on component mount
  useEffect(() => {
    const savedFlashcards = localStorage.getItem('flashcards');
    if (savedFlashcards) {
      try {
        const parsed = JSON.parse(savedFlashcards);
        // Convert string dates back to Date objects
        const cards = parsed.map((card: any) => ({
          ...card,
          lastReviewed: card.lastReviewed ? new Date(card.lastReviewed) : null,
          nextReview: card.nextReview ? new Date(card.nextReview) : null,
        }));
        setFlashcards(cards);
      } catch (error) {
        console.error('Error parsing flashcards from localStorage:', error);
      }
    }
  }, []);
  
  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);
  
  const handleAddFlashcard = (newCard: FlashcardType) => {
    setFlashcards([...flashcards, newCard]);
    setView('list');
  };
  
  const handleDeleteFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
  };
  
  const handleUpdateFlashcard = (updatedCard: FlashcardType) => {
    setFlashcards(flashcards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    ));
  };
  
  // Get unique categories from flashcards
  const categories = ['all', ...new Set(flashcards.map(card => card.category))];
  
  // Filter flashcards by category and search query
  const filteredFlashcards = flashcards.filter(card => 
    (selectedCategory === 'all' || card.category === selectedCategory) &&
    (searchQuery === '' || 
     card.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     card.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Get cards due for review (nextReview is in the past or null)
  const dueFlashcards = flashcards.filter(card => 
    !card.nextReview || new Date() >= card.nextReview
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {view === 'list' && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">我的闪卡</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('study')}
                disabled={flashcards.length === 0}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300"
              >
                学习闪卡 ({dueFlashcards.length})
              </button>
              <button
                onClick={() => setView('create')}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                创建闪卡
              </button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索闪卡..."
                className="pl-8 pr-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '所有类别' : category}
                </option>
              ))}
            </select>
          </div>
          
          {filteredFlashcards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                {flashcards.length === 0
                  ? '您还没有创建任何闪卡'
                  : '没有符合条件的闪卡'}
              </p>
              {flashcards.length === 0 && (
                <button
                  onClick={() => setView('create')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  创建第一张闪卡
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFlashcards.map(card => (
                <Flashcard
                  key={card.id}
                  flashcard={card}
                  onDelete={handleDeleteFlashcard}
                  onUpdate={handleUpdateFlashcard}
                />
              ))}
            </div>
          )}
        </>
      )}
      
      {view === 'create' && (
        <FlashcardCreator
          onAdd={handleAddFlashcard}
          onCancel={() => setView('list')}
          categories={categories.filter(c => c !== 'all')}
        />
      )}
      
      {view === 'study' && (
        <FlashcardStudy
          flashcards={dueFlashcards.length > 0 ? dueFlashcards : flashcards}
          onUpdate={handleUpdateFlashcard}
          onFinish={() => setView('list')}
        />
      )}
    </div>
  );
}
