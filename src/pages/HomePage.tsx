import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Pill, Layers, BookOpen, Brain, CreditCard as Cards, HelpCircle, Volume2, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const quickActions = [
    { label: 'Medicines', desc: 'Verified reference & salts', path: '/medicines', icon: Pill, color: 'from-blue-900/30 to-slate-900 border-blue-800/40 text-blue-400' },
    { label: 'Drug Classes', desc: 'Therapeutic & ATC tree', path: '/classes', icon: Layers, color: 'from-teal-900/30 to-slate-900 border-teal-800/40 text-teal-400' },
    { label: 'Medical Terms', desc: 'Pharmacology dictionary', path: '/terms', icon: BookOpen, color: 'from-emerald-900/30 to-slate-900 border-emerald-800/40 text-emerald-400' },
    { label: 'Drug Memory', desc: 'Mnemonics & Suffix patterns', path: '/drug-memory', icon: Brain, color: 'from-purple-900/30 to-slate-900 border-purple-800/40 text-purple-400' },
    { label: 'Flashcards', desc: 'Spaced repetition decks', path: '/flashcards', icon: Cards, color: 'from-amber-900/30 to-slate-900 border-amber-800/40 text-amber-400' },
    { label: 'Quiz', desc: 'Pharmacology tests', path: '/quiz', icon: HelpCircle, color: 'from-rose-900/30 to-slate-900 border-rose-800/40 text-rose-400' },
    { label: 'Pronunciation', desc: 'Phonetic audio guides', path: '/pronunciation', icon: Volume2, color: 'from-cyan-900/30 to-slate-900 border-cyan-800/40 text-cyan-400' },
    { label: 'ADME & PK', desc: 'Kinetics & Dynamics', path: '/adme', icon: Activity, color: 'from-indigo-900/30 to-slate-900 border-indigo-800/40 text-indigo-400' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-800 text-teal-300 text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Starter / Common Medicine Database v1.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          MediVault <span className="text-teal-400">India</span>
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Medicine • Pharmacology • Learning • Reference
        </p>

        <div className="relative max-w-xl mx-auto mt-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicine, generic, brand, salt or term..."
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm"
              readOnly
              onClick={() => alert('Search indexer will be wired up in Phase 3.')}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3.5 rounded-xl bg-gradient-to-b ${item.color} border transition hover:border-slate-600 flex flex-col justify-between`}
            >
              <Icon className="w-5 h-5 mb-2" />
              <div>
                <h2 className="text-xs sm:text-sm font-semibold text-white">{item.label}</h2>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 gap-3.5">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-200">Recently Viewed</h2>
            <Link to="/medicines" className="text-[11px] text-teal-400 hover:underline flex items-center gap-1">
              Browse <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">No recently viewed medicines yet.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-slate-200">Continue Learning</h2>
            <Link to="/my-learning" className="text-[11px] text-teal-400 hover:underline flex items-center gap-1">
              Dashboard <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <p className="text-xs text-slate-500">Review schedule will calculate your spaced repetition.</p>
        </div>
      </div>
    </div>
  );
};
