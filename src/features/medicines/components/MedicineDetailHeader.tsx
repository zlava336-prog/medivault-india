import React, { useState } from 'react';
import { Pill, ShieldCheck, Volume2, Bookmark, Scale, Lightbulb, Check } from 'lucide-react';
import { MedicineDetail } from '@/services/medicineService';

interface MedicineDetailHeaderProps {
  medicine: MedicineDetail;
  onExplainClick: () => void;
  onCompareClick: () => void;
}

// Verified Indian Clinical Pronunciation Dictionary
const PHONETIC_MAP: Record<string, string> = {
  'paracetamol': 'pa-ra-SEE-ta-mol',
  'ibuprofen': 'eye-byoo-PRO-fen',
  'pantoprazole': 'pan-TOE-pruh-zole',
  'losartan': 'low-SAR-tan',
  'amlodipine': 'am-LOW-dih-peen',
  'atorvastatin': 'a-TOR-va-sta-tin',
  'amoxicillin': 'uh-mok-suh-SIL-in',
  'azithromycin': 'uh-zith-row-MY-sin',
  'cetirizine': 'seh-TEER-ih-zeen',
  'metformin': 'met-FOR-min',
  'telmisartan': 'tel-mih-SAR-tan',
  'ondansetron': 'on-DAN-seh-tron',
  'salbutamol': 'sal-BYOO-tuh-mol',
  'aspirin': 'AS-prihn',
  'clopidogrel': 'kloh-PID-oh-grel',
  'levothyroxine': 'lee-voh-thye-ROK-seen',
  'diclofenac': 'dye-KLOE-feh-nak',
  'doxycycline': 'dok-see-SYE-kleen',
  'omeprazole': 'oh-MEP-ruh-zole',
};

export const MedicineDetailHeader: React.FC<MedicineDetailHeaderProps> = ({
  medicine,
  onExplainClick,
  onCompareClick,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [isSaved, setIsSaved] = useState(false);

  // Exact phonetic match resolution
  const nameKey = (medicine.generic_name || '').trim().toLowerCase();
  const phonetic =
    medicine.pronunciations?.[0]?.phonetic_pronunciation ||
    medicine.pronunciations?.[0]?.english_pronunciation ||
    PHONETIC_MAP[nameKey] ||
    null;

  const handleSpeak = (rate: number = speechRate) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(medicine.generic_name);
    utterance.rate = rate;
    utterance.lang = 'en-IN';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleRate = () => {
    const nextRate = speechRate === 0.9 ? 0.65 : 0.9;
    setSpeechRate(nextRate);
    handleSpeak(nextRate);
  };

  return (
    <div className="p-5 sm:p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-950 border border-teal-700/80 flex items-center justify-center text-teal-400 flex-shrink-0 shadow-lg shadow-teal-500/10">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {medicine.generic_name}
              </h1>
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  medicine.verification_status === 'verified'
                    ? 'bg-teal-950 text-teal-300 border-teal-800'
                    : 'bg-amber-950 text-amber-300 border-amber-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {medicine.verification_status === 'verified'
                  ? 'Verified Indian Monograph'
                  : 'Needs Review'}
              </span>
            </div>
            {phonetic && (
              <p className="text-xs sm:text-sm font-mono text-cyan-300 mt-0.5">
                [{phonetic}]
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex rounded-xl bg-slate-800 border border-slate-700 p-0.5">
            <button
              onClick={() => handleSpeak(speechRate)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                isSpeaking ? 'bg-cyan-600 text-white' : 'text-cyan-300 hover:text-white'
              }`}
              title="Listen to pronunciation"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </button>
            <button
              onClick={toggleRate}
              className="px-2 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white border-l border-slate-700"
              title="Toggle Speed"
            >
              {speechRate === 0.9 ? '1.0x' : '0.7x'}
            </button>
          </div>

          <button
            onClick={onExplainClick}
            className="px-3 py-2 rounded-xl text-xs font-medium bg-amber-950/70 hover:bg-amber-900 text-amber-300 border border-amber-800/80 flex items-center gap-1.5 transition"
          >
            <Lightbulb className="w-4 h-4" />
            <span>Explain</span>
          </button>

          <button
            onClick={onCompareClick}
            className="px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition"
          >
            <Scale className="w-4 h-4" />
            <span>Compare</span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-xl border text-xs transition ${
              isSaved
                ? 'bg-teal-600 text-white border-teal-500'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
            }`}
            title="Save to favorites"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/60 text-xs">
        <div>
          <span className="text-slate-500 block text-[11px]">Primary Salt / Active Ingredient</span>
          <span className="font-mono text-slate-200">{medicine.salt || medicine.active_ingredient || 'Single Chemical Entity'}</span>
        </div>
        <div>
          <span className="text-slate-500 block text-[11px]">Pharmacological Suffix Pattern</span>
          <span className="font-mono text-purple-300 font-semibold">{medicine.key_suffix || 'Standard Naming'}</span>
        </div>
      </div>
    </div>
  );
};
