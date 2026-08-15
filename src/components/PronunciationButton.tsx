import React, { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { pronunciationService } from '../services/pronunciationService';

interface PronunciationButtonProps {
  text: string;
  showSpeedToggle?: boolean;
}

export const PronunciationButton: React.FC<PronunciationButtonProps> = ({
  text,
  showSpeedToggle = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speed, setSpeed] = useState<number>(0.9);

  const handlePlay = (e: React.MouseEvent, rate: number = speed) => {
    e.stopPropagation();
    if (isSpeaking) {
      pronunciationService.stop();
      setIsSpeaking(false);
      return;
    }
    pronunciationService.speak(
      text,
      rate,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSpeed = speed === 0.9 ? 0.65 : 0.9;
    setSpeed(nextSpeed);
    if (isSpeaking) {
      handlePlay(e, nextSpeed);
    }
  };

  return (
    <div className="inline-flex items-center rounded-xl bg-slate-800 border border-slate-700 p-0.5 shadow-sm">
      <button
        onClick={(e) => handlePlay(e, speed)}
        aria-label="Listen to pronunciation"
        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
          isSpeaking ? 'bg-cyan-600 text-white animate-pulse' : 'text-cyan-300 hover:text-white'
        }`}
      >
        {isSpeaking ? <Square className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
        <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
      </button>

      {showSpeedToggle && (
        <button
          onClick={toggleSpeed}
          aria-label="Toggle speech speed"
          className="px-2 py-1.5 rounded-lg text-[10px] font-mono text-slate-400 hover:text-white border-l border-slate-700"
        >
          {speed === 0.9 ? '1.0x' : '0.7x'}
        </button>
      )}
    </div>
  );
};
