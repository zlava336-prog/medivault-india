import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, ShieldCheck, Volume2, Lightbulb, Bookmark, Check, Activity } from 'lucide-react';
import { Medicine } from '@/types/database';
import { ExplainModal } from './ExplainModal';

interface MedicineCardProps {
  medicine: Medicine;
  onFavoriteToggle?: (medId: string) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onFavoriteToggle }) => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showExplain, setShowExplain] = useState(false);

  const handleCardClick = () => {
    navigate(`/medicines/${medicine.id}`);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(medicine.generic_name);
    utterance.rate = 0.85;
    utterance.lang = 'en-IN';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleExplain = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowExplain(true);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    if (onFavoriteToggle) onFavoriteToggle(medicine.id);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="cursor-pointer group p-4 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-teal-700/60 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-lg shadow-black/20"
      >
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800/80 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform flex-shrink-0">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white group-hover:text-teal-300 transition-colors leading-snug">
                  {medicine.generic_name}
                </h3>
                {medicine.display_name && medicine.display_name !== medicine.generic_name && (
                  <span className="text-[11px] text-slate-400 block">{medicine.display_name}</span>
                )}
              </div>
            </div>
            {medicine.verification_status === 'verified' && (
              <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-400 border border-teal-800/60 flex-shrink-0">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <div className="mt-3 space-y-1.5">
            {medicine.salt && (
              <p className="text-xs font-mono text-slate-300 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/80 inline-block truncate max-w-full">
                Salt: {medicine.salt}
              </p>
            )}
            {medicine.description && (
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {medicine.description}
              </p>
            )}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {medicine.dosage_forms?.slice(0, 2).map((form) => (
              <span
                key={form}
                className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700/60"
              >
                {form}
              </span>
            ))}
            {medicine.half_life && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1">
                <Activity className="w-3 h-3 text-teal-400" /> T½: {medicine.half_life}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/70 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isSpeaking
                  ? 'bg-cyan-600 text-white border-cyan-500 animate-pulse'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border-slate-700'
              }`}
              title="Listen to Pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleExplain}
              className="p-1.5 rounded-lg border bg-amber-950/60 hover:bg-amber-900 text-amber-300 border-amber-800/60 text-xs transition"
              title="Explain in Simple Terms"
            >
              <Lightbulb className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleFavorite}
              className={`p-1.5 rounded-lg border text-xs transition ${
                isSaved
                  ? 'bg-teal-600 text-white border-teal-500'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400 border-slate-700'
              }`}
              title="Favorite"
            >
              {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            </button>
          </div>
          <span className="text-teal-400 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
            View Monograph →
          </span>
        </div>
      </div>

      <ExplainModal
        isOpen={showExplain}
        onClose={() => setShowExplain(false)}
        title={medicine.generic_name}
        simpleExplanation={medicine.description}
        clinicalExplanation={medicine.mechanism_of_action}
        hinglishExplanation={medicine.memory_trick ? `Trick: ${medicine.memory_trick}` : undefined}
      />
    </>
  );
};
