import React, { useState, useEffect } from 'react';
import { X, Lightbulb, Sparkles, ShieldCheck, Loader2, BookOpen, Layers, Activity } from 'lucide-react';
import { aiService, AiExplainResponse } from '../../../services/aiService';

interface ExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  entityType?: 'medicine' | 'drug_class' | 'medical_term' | 'general';
  entityId?: string;
  simpleExplanation?: string;
  hindiExplanation?: string;
  hinglishExplanation?: string;
  clinicalExplanation?: string;
}

export const ExplainModal: React.FC<ExplainModalProps> = ({
  isOpen,
  onClose,
  title,
  entityType = 'medicine',
  entityId,
  simpleExplanation,
  hindiExplanation,
  hinglishExplanation,
  clinicalExplanation,
}) => {
  const [mode, setMode] = useState<'hinglish' | 'simple' | 'student' | 'detailed'>('hinglish');
  const [topic, setTopic] = useState<'general' | 'moa' | 'adme' | 'safety'>('general');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AiExplainResponse | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setAiResponse(null);
      return;
    }

    const fetchAi = async () => {
      setLoading(true);
      const res = await aiService.explain({
        entityType,
        entityId,
        entityName: title,
        mode,
        language: mode === 'hinglish' ? 'hinglish' : 'english',
        specificTopic: topic,
      });
      setAiResponse(res);
      setLoading(false);
    };

    fetchAi();
  }, [isOpen, mode, topic, title, entityId, entityType]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-950 border border-amber-800/80 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-1.5">
                <span>Pharmacology Tutor</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 border border-teal-800 text-teal-300 font-normal">
                  Gemini Grounded
                </span>
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px] sm:max-w-xs">{title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selectors */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode('hinglish')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                mode === 'hinglish' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Hinglish
            </button>
            <button
              onClick={() => setMode('simple')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                mode === 'simple' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setMode('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                mode === 'student' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Student (B.Pharm/MBBS)
            </button>
            <button
              onClick={() => setMode('detailed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                mode === 'detailed' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Detailed PK/PD
            </button>
          </div>
        </div>

        {/* Topic Quick Chips (Only for medicines) */}
        {entityType === 'medicine' && (
          <div className="px-4 py-2 bg-slate-950/30 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-1">Focus:</span>
            {[
              { id: 'general', label: 'Overview' },
              { id: 'moa', label: 'Mechanism' },
              { id: 'adme', label: 'ADME / Kinetics' },
              { id: 'safety', label: 'Clinical Safety' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTopic(t.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                  topic === t.id
                    ? 'bg-teal-950 border border-teal-800 text-teal-300 font-semibold'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-12 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mx-auto" />
              <p className="text-xs text-slate-400">Consulting MediVault database & structuring explanation...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                {aiResponse?.answer || hinglishExplanation || simpleExplanation || 'No explanation generated.'}
              </div>

              {/* Source Attribution */}
              {aiResponse?.sources && aiResponse.sources.length > 0 && (
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Based on MediVault India reference records
                  </span>
                  <div className="flex flex-wrap gap-2 pt-0.5">
                    {aiResponse.sources.map((s, idx) => (
                      <span key={idx} className="text-[11px] text-slate-400 font-mono">
                        • {s.source_name}: {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Compact Safety Disclaimer Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 text-center leading-tight">
          Educational information only. This does not replace advice from a qualified healthcare professional.
        </div>
      </div>
    </div>
  );
};
