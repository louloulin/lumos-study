'use client';

import { useState } from 'react';
import { FlashcardType } from './FlashcardManager';

interface FlashcardProps {
  flashcard: FlashcardType;
  onDelete: (id: string) => void;
  onUpdate: (flashcard: FlashcardType) => void;
}

export function Flashcard({ flashcard, onDelete, onUpdate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState(flashcard);
  
  const handleFlip = () => {
    if (!isEditing) {
      setIsFlipped(!isFlipped);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
    setIsFlipped(false);
  };
  
  const handleSave = () => {
    onUpdate(editedCard);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedCard(flashcard);
    setIsEditing(false);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return '未复习';
    return new Date(date).toLocaleDateString('zh-CN');
  };
  
  return (
    <div
      className={`border rounded-lg overflow-hidden ${
        isFlipped ? 'bg-blue-50' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <div className="p-4">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              问题
            </label>
            <textarea
              value={editedCard.question}
              onChange={(e) => setEditedCard({ ...editedCard, question: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              答案
            </label>
            <textarea
              value={editedCard.answer}
              onChange={(e) => setEditedCard({ ...editedCard, answer: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              类别
            </label>
            <input
              type="text"
              value={editedCard.category}
              onChange={(e) => setEditedCard({ ...editedCard, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              难度
            </label>
            <select
              value={editedCard.difficulty}
              onChange={(e) => setEditedCard({
                ...editedCard,
                difficulty: e.target.value as 'easy' | 'medium' | 'hard'
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">简单</option>
              <option value="medium">中等</option>
              <option value="hard">困难</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <div onClick={handleFlip} className="cursor-pointer h-full">
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(flashcard.difficulty)}`}>
                {flashcard.difficulty === 'easy' ? '简单' : 
                 flashcard.difficulty === 'medium' ? '中等' : '困难'}
              </span>
              <span className="text-xs text-gray-500">{flashcard.category}</span>
            </div>
            
            <div className="min-h-[100px] flex items-center justify-center">
              <p className="text-center">
                {isFlipped ? flashcard.answer : flashcard.question}
              </p>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                {isFlipped ? '答案' : '问题'} (点击翻转)
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit();
                  }}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('确定要删除这张闪卡吗？')) {
                      onDelete(flashcard.id);
                    }
                  }}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-400">
              上次复习: {formatDate(flashcard.lastReviewed)}
              {flashcard.nextReview && (
                <span> · 下次复习: {formatDate(flashcard.nextReview)}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
