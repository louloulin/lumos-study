'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ImageResult } from './ImageResult';

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    analysis: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setResult(null);
    
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('请上传 JPG, PNG 或 GIF 格式的图片');
      return;
    }
    
    // Check file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过 5MB');
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files?.length) {
      const droppedFile = e.dataTransfer.files[0];
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validTypes.includes(droppedFile.type)) {
        setError('请上传 JPG, PNG 或 GIF 格式的图片');
        return;
      }
      
      // Check file size (5MB max)
      if (droppedFile.size > 5 * 1024 * 1024) {
        setError('图片大小不能超过 5MB');
        return;
      }
      
      setFile(droppedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      // In a real implementation, we would upload the file to a server
      // For now, we'll simulate the upload and processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsUploading(false);
      setIsProcessing(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate result based on file name
      if (file.name.toLowerCase().includes('math')) {
        setResult({
          text: '求解方程：2x² - 5x + 3 = 0',
          analysis: `解答：
2x² - 5x + 3 = 0
使用求根公式：x = (-b ± √(b² - 4ac)) / (2a)
其中，a = 2, b = -5, c = 3
x = (5 ± √(25 - 24)) / 4
x = (5 ± √1) / 4
x = (5 ± 1) / 4
x₁ = 6/4 = 3/2
x₂ = 4/4 = 1
因此，方程的解为 x = 3/2 或 x = 1`
        });
      } else {
        setResult({
          text: '人工智能（Artificial Intelligence，简称AI）是计算机科学的一个分支，致力于创造能够模拟人类智能的机器。',
          analysis: '这是一段关于人工智能的介绍文本，描述了AI是计算机科学的一个分支，目标是创造模拟人类智能的机器。'
        });
      }
    } catch (err) {
      setError('上传或处理图片时出错，请重试');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {!preview ? (
        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
          />
          
          <div className="mx-auto w-16 h-16 mb-4 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <p className="text-lg font-medium text-gray-700 mb-2">
            点击或拖放图片到此处上传
          </p>
          <p className="text-sm text-gray-500">
            支持 JPG, PNG, GIF 格式，最大 5MB
          </p>
          
          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {file?.name} ({Math.round(file?.size / 1024)} KB)
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleReset}
                  className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  disabled={isUploading || isProcessing}
                >
                  重新选择
                </button>
                
                <button
                  onClick={handleUpload}
                  disabled={isUploading || isProcessing || !file}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                >
                  {isUploading ? '上传中...' : isProcessing ? '处理中...' : '开始识别'}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
          
          {result && <ImageResult result={result} />}
        </div>
      )}
    </div>
  );
}
