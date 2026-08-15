import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Lightbulb } from 'lucide-react';
import { ConceptData } from '../data/learningData';
import { ExplainModal } from '../../medicines/components/ExplainModal';
import { PronunciationButton } from '../../../components/PronunciationButton';

interface ConceptCardProps {
  concept: ConceptData;
  showCategoryBadge?: boolean;
}

export const ConceptCard: React.FC<ConceptCardProps> = ({ concept, showCategoryBadge = true }) => {
  const [activeTab, setActiveTab] = useState<'simple' | 'student' | 'hinglish'>('student');
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  return (
    <div className="p-5 bg-slate-900/90 border border-slate-800 hover:border-teal-800/60 rounded-3xl space-y-4 shadow-xl transition flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 flex-shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">{concept.title}</h3>
              {showCategoryBadge && (
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  {concept.category} Concept
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <PronunciationButton text={concept.title} showSpeedToggle={false} />
            <button
              onClick={() => setIsExplainOpen(true)}
              className="p-1.5 bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/60 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
              title="Explain with Gemini"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Explain</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-semibold">
          <button
            onClick={() => setActiveTab('student')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'student' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Exam (B.Pharm)
          </button>
          <button
            onClick={() => setActiveTab('hinglish')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'hinglish' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Hinglish
          </button>
          <button
            onClick={() => setActiveTab('simple')}
            className={`flex-1 py-1 rounded-lg transition ${
              activeTab === 'simple' ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Simple
          </button>
        </div>

        {/* Content Box */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl text-xs text-slate-200 leading-relaxed min-h-[90px]">
          {activeTab === 'student' && <p>{concept.studentExplanation}</p>}
          {activeTab === 'hinglish' && <p className="text-amber-200/90">{concept.hinglishExplanation}</p>}
          {activeTab === 'simple' && <p>{concept.simpleExplanation}</p>}
        </div>

        {/* Memory Tip */}
        {concept.memoryTrick && (
          <div className="p-2.5 bg-purple-950/30 border border-purple-800/40 rounded-xl text-[11px] flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400 flex-shrink-0" />
            <span className="text-purple-200">
              <strong className="font-bold text-purple-300">Memory Trick:</strong> {concept.memoryTrick}
            </span>
          </div>
        )}
      </div>

      {/* Footer Related Tags */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-500 font-semibold">Related:</span>
          {concept.relatedConcepts.map((rel, idx) => (
            <Link
              key={idx}
              to={rel.link}
              className="px-2 py-0.5 rounded-md bg-slate-800/70 hover:bg-slate-700 text-slate-300 transition"
            >
              {rel.name}
            </Link>
          ))}
        </div>
      </div>

      <ExplainModal
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        title={concept.title}
        entityType="general"
        simpleExplanation={concept.simpleExplanation}
        clinicalExplanation={concept.studentExplanation}
        hinglishExplanation={concept.hinglishExplanation}
      />
    </div>
  );
};
