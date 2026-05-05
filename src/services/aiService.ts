import { Question, PolishResult } from '../types';
import { mockQuestions, mockPolishResult } from '../data/mockData';

// 使用Vite代理，无需配置完整URL
const API_BASE_URL = '/api';

export const polishEssay = async (essay: string, question: string): Promise<PolishResult> => {
  try {
    const response = await fetch(`${API_BASE_URL}/polish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ essay, question }),
    });
    if (!response.ok) {
      console.error('API请求失败:', response.statusText);
      throw new Error('API请求失败');
    }
    return await response.json();
  } catch (error) {
    console.error('使用Mock数据:', error);
    return mockPolishResult;
  }
};

export const searchQuestions = async (query: string, level: string = 'all'): Promise<Question[]> => {
  try {
    const params = new URLSearchParams({ q: query, level });
    const response = await fetch(`${API_BASE_URL}/questions?${params}`);
    if (!response.ok) {
      console.error('API请求失败:', response.statusText);
      throw new Error('API请求失败');
    }
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('使用Mock数据:', error);
    // 过滤mock数据
    return mockQuestions.filter((q) => {
      const matchesSearch = q.topic.toLowerCase().includes(query.toLowerCase());
      const matchesLevel = level === 'all' || q.level === level;
      return matchesSearch && matchesLevel;
    });
  }
};
