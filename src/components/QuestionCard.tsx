import { BookOpen, Calendar, FileText } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
}

const typeLabels: Record<string, string> = {
  argumentation: '议论文',
  application: '应用文',
  description: '描述文',
};

const levelLabels: Record<string, string> = {
  CET4: '四级',
  CET6: '六级',
};

export default function QuestionCard({ question, isSelected, onSelect }: QuestionCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-200 bg-white hover:border-blue-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              question.level === 'CET4'
                ? 'bg-green-100 text-green-700'
                : 'bg-purple-100 text-purple-700'
            }`}
          >
            {levelLabels[question.level]}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
            {typeLabels[question.type]}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-xs">{question.year}</span>
        </div>
      </div>
      
      <h3 className={`font-semibold mb-2 ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
        <BookOpen className="w-5 h-5 inline-block mr-2" />
        {question.topic}
      </h3>
      
      {question.description && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {question.description}
        </p>
      )}
      
      {question.requirements && (
        <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <FileText className="w-3 h-3" />
          {question.requirements}
        </p>
      )}
      
      {question.source && (
        <p className="text-xs text-gray-400">
          来源: {question.source}
        </p>
      )}
    </div>
  );
}
