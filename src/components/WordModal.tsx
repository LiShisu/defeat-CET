import { X, Volume2, BookOpen } from 'lucide-react';

interface WordModalProps {
  word: string;
  meaning: string;
  phonetic: string;
  examples: string[];
  isOpen: boolean;
  onClose: () => void;
}

export default function WordModal({ word, meaning, phonetic, examples, isOpen, onClose }: WordModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{word}</h2>
              {phonetic && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">{phonetic}</span>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="px-6 py-4">
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">双语解释</h3>
            <p className="text-gray-800 text-lg leading-relaxed">{meaning}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3">例句</h3>
            <div className="space-y-3">
              {examples.length > 0 ? (
                examples.map((example, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-gray-700">{example}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">暂无例句</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
