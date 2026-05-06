import { Question, PolishResult } from '../types';

export const mockQuestions: Question[] = [
  { 
    id: '1', 
    year: '2024', 
    level: 'CET4', 
    topic: 'The Importance of Reading', 
    type: 'argumentation',
    description: 'Write an essay on the importance of reading for personal development',
    requirements: '120-180 words, clear argument, examples',
    source: 'CET4真题，2024年6月'
  },
  { 
    id: '2', 
    year: '2024', 
    level: 'CET6', 
    topic: 'Artificial Intelligence and Modern Life', 
    type: 'argumentation',
    description: 'Discuss the impact of AI on modern life',
    requirements: '150-200 words, balanced view',
    source: 'CET6真题，2024年6月'
  },
  { 
    id: '3', 
    year: '2023', 
    level: 'CET4', 
    topic: 'My Favorite Hobby', 
    type: 'description',
    description: 'Describe your favorite hobby and why you love it',
    requirements: '120-180 words, personal story',
    source: 'CET4真题，2023年12月'
  },
  { 
    id: '4', 
    year: '2023', 
    level: 'CET6', 
    topic: 'Environmental Protection in Cities', 
    type: 'argumentation',
    description: 'Discuss environmental issues in cities and solutions',
    requirements: '150-200 words, specific examples',
    source: 'CET6真题，2023年12月'
  },
  { 
    id: '5', 
    year: '2022', 
    level: 'CET4', 
    topic: 'Online Learning Experience', 
    type: 'description',
    description: 'Share your online learning experience',
    requirements: '120-180 words, personal experience',
    source: 'CET4真题，2022年6月'
  },
  { 
    id: '6', 
    year: '2022', 
    level: 'CET6', 
    topic: 'The Impact of Social Media on Interpersonal Relationships', 
    type: 'argumentation',
    description: 'How social media affects relationships',
    requirements: '150-200 words, analysis',
    source: 'CET6真题，2022年6月'
  },
  { 
    id: '7', 
    year: '2021', 
    level: 'CET4', 
    topic: 'A Memorable Trip', 
    type: 'description',
    description: 'Describe a memorable trip you had',
    requirements: '120-180 words, narrative style',
    source: 'CET4真题，2021年12月'
  },
  { 
    id: '8', 
    year: '2021', 
    level: 'CET6', 
    topic: 'Cultural Heritage Protection', 
    type: 'argumentation',
    description: 'Discuss the importance of protecting cultural heritage',
    requirements: '150-200 words, argumentation',
    source: 'CET6真题，2021年12月'
  },
];

export const mockPolishResult: PolishResult = {
  wordSuggestions: [
    {
      original: 'very important',
      suggestion: 'crucial',
      meaning: '极其重要的，关键的 (extremely important, critical)',
      examples: [
        'Reading is crucial for personal growth.',
        'This decision is crucial for our future.',
        'Time management is crucial in college life.',
      ],
      position: { start: 0, end: 12 },
    },
    {
      original: 'many',
      suggestion: 'numerous',
      meaning: '众多的，许多的 (many, a large number of)',
      examples: [
        'There are numerous benefits to regular exercise.',
        'Numerous studies have shown this effect.',
        'She has numerous friends from around the world.',
      ],
      position: { start: 28, end: 32 },
    },
    {
      original: 'help',
      suggestion: 'facilitate',
      meaning: '促进，帮助 (to make easier, assist)',
      examples: [
        'Technology can facilitate communication.',
        'This tool will facilitate our work.',
        'Good planning facilitates success.',
      ],
      position: { start: 45, end: 49 },
    },
  ],
  sentenceSuggestions: [
    {
      original: 'Reading is very important. It can help us learn many things.',
      suggestion: 'Reading is crucial, as it can facilitate the acquisition of numerous skills and knowledge.',
      explanation: '使用更高级的连接词"as"来衔接两个句子，并用"acquisition of numerous skills and knowledge"替代简单表达，使句式更复杂、正式。',
      examples: [
        'Regular exercise is essential, as it can enhance both physical and mental well-being.',
        'Effective communication is vital, as it can strengthen interpersonal relationships.',
      ],
    },
    {
      original: 'We should read more books every day.',
      suggestion: 'It is advisable for us to engage in daily reading of various books.',
      explanation: '使用"It is advisable for us to..."的主语从句结构替代简单句，增加句式多样性。',
      examples: [
        'It is essential for students to develop good study habits.',
        'It is beneficial for everyone to maintain a positive attitude.',
      ],
    },
  ],
  overallFeedback: '你的作文结构清晰，观点明确！建议多使用高级词汇和复杂句式来提升文章质量。注意连接词的使用，使段落过渡更自然流畅。',
  polishedText: 'Reading is crucial, as it can facilitate the acquisition of numerous skills and knowledge. It is advisable for us to engage in daily reading of various books.',
};
