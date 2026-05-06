export interface Question {
  id: string;
  year: string;
  level: 'CET4' | 'CET6';
  topic: string;
  type: 'argumentation' | 'application' | 'description';
  description?: string;
  requirements?: string;
  source?: string;
}

export interface WordSuggestion {
  original: string;
  suggestion: string;
  meaning: string;
  examples: string[];
  position: { start: number; end: number };
}

export interface SentenceSuggestion {
  original: string;
  suggestion: string;
  explanation: string;
  examples: string[];
}

export interface PolishResult {
  wordSuggestions: WordSuggestion[];
  sentenceSuggestions: SentenceSuggestion[];
  overallFeedback: string;
  polishedText: string;
}
