import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, User, Bot, Loader2, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { aiService, AiExplainResponse } from '../services/aiService';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  sources?: Array<{ source_name: string; title: string }>;
  verified?: boolean;
}

export const AiAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Namaste! Main hoon MediVault India AI Assistant. Aap mujhse medicines, drug classes, ADME, salts ya pharmacology concepts ke baare me pooch sakte hain. Kaise madad karun?',
      verified: true,
      sources: [{ source_name: 'Indian Pharmacopoeia', title: 'MediVault Grounded Reference' }],
    },
  ]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'hinglish' | 'simple' | 'student' | 'detailed'>('hinglish');
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'Explain Paracetamol in simple Hinglish',
    'What is the difference between ACE Inhibitors and ARBs?',
    'Explain ADME in pharmacokinetics',
    'What are the serious adverse effects of Atorvastatin?',
    'How does Amlodipine lower blood pressure?',
  ];

  const handleSend = async (queryText?: string) => {
    const q = (queryText || input).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res: AiExplainResponse = await aiService.askMedicineAssistant(q, mode);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: res.answer,
        sources: res.sources,
        verified: res.verified_context_used,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: 'AI service temporarily unavailable. Please try again.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      <Breadcrumbs items={[{ label: 'AI Assistant' }]} />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white flex items-center gap-2">
              MediVault AI Assistant
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                DB-Grounded
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Grounded in verified pharmacology & medicine monographs</p>
          </div>
        </div>

        {/* Mode Selector */}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as any)}
          className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-amber-300 font-semibold focus:outline-none"
        >
          <option value="hinglish">Roman Hinglish</option>
          <option value="simple">Simple English</option>
          <option value="student">Student / Exam Focus</option>
          <option value="detailed">Clinical Detailed</option>
        </select>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-7 h-7 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-teal-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              {m.sources && m.sources.length > 0 && (
                <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 flex items-center gap-1.5 flex-wrap">
                  <ShieldCheck className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  <span>Ground truth sources: {m.sources.map((s) => s.title).join(', ')}</span>
                </div>
              )}
            </div>
            {m.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 p-2">
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
            <span>Consulting pharmacology database & generating answer...</span>
          </div>
        )}
      </div>

      {/* Suggested Prompt Chips */}
      {messages.length < 3 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[10px] text-slate-500 uppercase font-bold flex-shrink-0">Try asking:</span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-teal-700 whitespace-nowrap text-[11px]"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="pt-1">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a medicine, generic, salt, ADME or classification..."
            className="flex-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-2xl text-xs font-bold flex items-center justify-center shadow-lg shadow-teal-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
