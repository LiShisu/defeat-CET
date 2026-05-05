import { useState } from 'react';
import { Sparkles, PenTool, Search, Filter, Loader2 } from 'lucide-react';
import { Question, PolishResult } from '../types';
import { mockQuestions } from '../data/mockData';
import { polishEssay } from '../services/aiService';
import QuestionCard from '../components/QuestionCard';
import PolishResultComponent from '../components/PolishResult';

type ViewMode = 'questions' | 'writing' | 'result';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('questions');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [essay, setEssay] = useState('');
  const [polishResult, setPolishResult] = useState<PolishResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const filteredQuestions = mockQuestions.filter((q) => {
    const matchesSearch = q.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = filterLevel === 'all' || q.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  const handleSelectQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setViewMode('writing');
    setEssay('');
  };

  const handlePolish = async () => {
    if (!essay.trim() || !selectedQuestion) return;
    
    setIsLoading(true);
    try {
      const result = await polishEssay(essay, selectedQuestion.topic);
      setPolishResult(result);
      setViewMode('result');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setViewMode('writing');
    setPolishResult(null);
    setEssay('');
  };

  const handleBackToQuestions = () => {
    setViewMode('questions');
    setSelectedQuestion(null);
    setEssay('');
    setPolishResult(null);
  };

  const goToWriting = () => {
    setViewMode('writing');
    setPolishResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleBackToQuestions}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">四六级写作助手</h1>
                <p className="text-xs text-gray-500">提升你的英语写作能力</p>
              </div>
            </div>
            {viewMode !== 'questions' && selectedQuestion && (
              <button
                onClick={handleBackToQuestions}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                返回题目列表
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {viewMode === 'questions' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">选择作文题目</h2>
              <p className="text-gray-600">从以下真题中选择一个题目进行练习</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索题目..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">全部级别</option>
                  <option value="CET4">四级</option>
                  <option value="CET6">六级</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  isSelected={selectedQuestion?.id === question.id}
                  onSelect={() => handleSelectQuestion(question)}
                />
              ))}
            </div>

            {filteredQuestions.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">没有找到匹配的题目</p>
              </div>
            )}
          </div>
        )}

        {(viewMode === 'writing' || viewMode === 'result') && selectedQuestion && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedQuestion.level === 'CET4'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedQuestion.level === 'CET4' ? '四级' : '六级'}
                </div>
                <span className="text-gray-500">{selectedQuestion.year}年真题</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedQuestion.topic}</h2>
              <p className="text-gray-600">请根据题目要求写一篇120-180词的英语短文</p>
            </div>

            {viewMode === 'writing' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-gray-500" />
                      <span className="font-medium text-gray-700">我的作文</span>
                    </div>
                    <span className="text-sm text-gray-400">{essay.length} 词</span>
                  </div>
                  <textarea
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="请在此输入你的英语作文..."
                    className="w-full h-64 p-4 resize-none focus:outline-none text-gray-800 placeholder-gray-400"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handlePolish}
                    disabled={!essay.trim() || isLoading}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                      essay.trim() && !isLoading
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        润色中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        AI智能润色
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {viewMode === 'result' && polishResult && (
              <div className="space-y-4">
                <button
                  onClick={goToWriting}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <PenTool className="w-4 h-4" />
                  返回编辑
                </button>
                <PolishResultComponent result={polishResult} onReset={handleReset} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>四六级英语写作助手 · 提升你的英语写作能力</p>
        </div>
      </footer>
    </div>
  );
}
