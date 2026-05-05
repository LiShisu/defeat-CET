import { PolishResult } from '../types';
import { mockPolishResult } from '../data/mockData';

export const polishEssay = async (essay: string, question: string): Promise<PolishResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    ...mockPolishResult,
  };
};

export const getWordDetails = async (word: string): Promise<{
  word: string;
  meaning: string;
  phonetic: string;
  examples: string[];
}> => {
  const wordMap: Record<string, { meaning: string; phonetic: string; examples: string[] }> = {
    crucial: {
      meaning: '极其重要的，关键的 (extremely important, critical)',
      phonetic: '/ˈkruːʃl/',
      examples: [
        'Reading is crucial for personal growth.',
        'This decision is crucial for our future.',
        'Time management is crucial in college life.',
        'The final exam is crucial for graduation.',
      ],
    },
    numerous: {
      meaning: '众多的，许多的 (many, a large number of)',
      phonetic: '/ˈnjuːmərəs/',
      examples: [
        'There are numerous benefits to regular exercise.',
        'Numerous studies have shown this effect.',
        'She has numerous friends from around the world.',
        'Numerous challenges lie ahead of us.',
      ],
    },
    facilitate: {
      meaning: '促进，帮助 (to make easier, assist)',
      phonetic: '/fəˈsɪlɪteɪt/',
      examples: [
        'Technology can facilitate communication.',
        'This tool will facilitate our work.',
        'Good planning facilitates success.',
        'The new system facilitates data analysis.',
      ],
    },
  };

  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    word,
    ...(wordMap[word.toLowerCase()] || {
      meaning: `暂无详细解释 (No detailed explanation available)`,
      phonetic: '',
      examples: [],
    }),
  };
};
