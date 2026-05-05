import { Check, ArrowRight, Lightbulb, RotateCcw } from 'lucide-react';
import { PolishResult as PolishResultType } from '../types';
import WordModal from './WordModal';
import { useState } from 'react';
import { getWordDetails } from '../services/aiService';

interface PolishResultProps {
  result: PolishResultType;
  onReset: () => void;
}

export default function PolishResult({ result, onReset }: PolishResultProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    meaning: string;
    phonetic: string;
    examples: string[];
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWordClick = async (word: string) => {
    const details = await getWordDetails(word);
    setSelectedWord(details);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWord(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Check className="w-6 h-6 text-green-500" />
          润色结果
        </h2>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          重新写作
        </button>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span className="font-medium text-amber-800">整体评价</span>
        </div>
        <p className="text-amber-700">{result.overallFeedback}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-700">原文</h3>
          </div>
          <div className="p-4">
            <div className="text-gray-800 space-y-2">
              {result.wordSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center gap-2">
                  <span
                    className="text-red-500 line-through cursor-pointer hover:bg-red-50 px-1 rounded transition-colors"
                    onClick={() => handleWordClick(suggestion.original)}
                    title="点击查看详情"
                  >
                    {suggestion.original}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span
                    className="text-green-600 font-medium cursor-pointer hover:bg-green-50 px-1 rounded transition-colors"
                    onClick={() => handleWordClick(suggestion.suggestion)}
                    title="点击查看详情"
                  >
                    {suggestion.suggestion}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b">
            <h3 className="font-semibold text-gray-700">高级词汇详情</h3>
          </div>
          <div className="p-4 space-y-4">
            {result.wordSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-gray-800">{suggestion.suggestion}</span>
                  <span className="text-xs text-gray-500">{suggestion.meaning}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">例句：</p>
                  <ul className="list-disc list-inside space-y-1">
                    {suggestion.examples.slice(0, 2).map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-700">句式优化建议</h3>
        </div>
        <div className="p-4 space-y-4">
          {result.sentenceSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="bg-gray-50 rounded-lg p-4">
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-1">原句：</p>
                <p className="text-red-600 line-through">{suggestion.original}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-1">优化后：</p>
                <p className="text-green-600 font-medium">{suggestion.suggestion}</p>
              </div>
              <div className="mb-3">
                <p className="text-sm text-gray-500 mb-1">解析：</p>
                <p className="text-gray-700">{suggestion.explanation}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">更多示例：</p>
                <div className="space-y-2">
                  {suggestion.examples.map((example, index) => (
                    <div key={index} className="bg-white px-3 py-2 rounded border border-gray-200">
                      <p className="text-gray-700">{example}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
        <div className="px-4 py-3 bg-green-50 border-b border-green-200">
          <h3 className="font-semibold text-green-700">润色后的完整文本</h3>
        </div>
        <div className="p-4">
          <p className="text-gray-800 leading-relaxed">{result.polishedText}</p>
        </div>
      </div>

      <WordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        word={selectedWord?.word || ''}
        meaning={selectedWord?.meaning || ''}
        phonetic={selectedWord?.phonetic || ''}
        examples={selectedWord?.examples || []}
      />
    </div>
  );
}
