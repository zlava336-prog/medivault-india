import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, Layers, Activity, Zap, Brain, ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PHARMACOLOGY_CONCEPTS } from '../../features/learning/data/learningData';
import { ConceptCard } from '../../features/learning/components/ConceptCard';
import { PKvsPDComparison } from '../../features/learning/components/PKvsPDComparison';

export const LearningHubPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const concepts = Object.values(PHARMACOLOGY_CONCEPTS);

  const filtered = concepts.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.definition.toLowerCase().includes(search.toLowerCase()) ||
      c.hinglishExplanation.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'all' || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs items={[{ label: 'Pharmacology Learning Hub' }]} />

      {/* Hero Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5 tracking-tight">
              <BookOpen className="w-7 h-7 text-teal-400" />
              Pharmacology Learning Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Master ADME, Pharmacokinetics, Pharmacodynamics, and mathematical parameters for pharmacy & healthcare students.
            </p>
          </div>

          <Link
            to="/learning/revision"
            className="px-4 py-2.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800 text-xs font-bold flex items-center gap-2 self-start sm:self-auto transition shadow-lg"
          >
            <Brain className="w-4 h-4 text-purple-400" />
            <span>High-Yield Revision (30s)</span>
          </Link>
        </div>

        {/* Feature Navigation Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <Link
            to="/learning/adme"
            className="p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-2xl transition group"
          >
            <Layers className="w-5 h-5 text-teal-400 mb-2 group-hover:scale-105 transition" />
            <h3 className="font-bold text-xs sm:text-sm text-white">ADME Pathways</h3>
            <span className="text-[10px] text-slate-400">Absorption to Excretion</span>
          </Link>

          <Link
            to="/learning/pharmacokinetics"
            className="p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-2xl transition group"
          >
            <Activity className="w-5 h-5 text-indigo-400 mb-2 group-hover:scale-105 transition" />
            <h3 className="font-bold text-xs sm:text-sm text-white">Pharmacokinetics</h3>
            <span className="text-[10px] text-slate-400">t½, Vd, CL, AUC graphs</span>
          </Link>

          <Link
            to="/learning/pharmacodynamics"
            className="p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-2xl transition group"
          >
            <Zap className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-105 transition" />
            <h3 className="font-bold text-xs sm:text-sm text-white">Pharmacodynamics</h3>
            <span className="text-[10px] text-slate-400">Receptors, Efficacy, TI</span>
          </Link>

          <Link
            to="/learning/revision"
            className="p-3.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-2xl transition group"
          >
            <Brain className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-105 transition" />
            <h3 className="font-bold text-xs sm:text-sm text-white">Exam Pearls</h3>
            <span className="text-[10px] text-slate-400">B.Pharm rapid reviews</span>
          </Link>
        </div>
      </div>

      {/* PK vs PD Unified Matrix */}
      <PKvsPDComparison />

      {/* Search & Filter Toolbar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search concepts, formulas, parameters (e.g., Half-life, Bioavailability, Vd, EC50)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Concepts' },
            { id: 'adme', label: 'ADME Disposition' },
            { id: 'parameters', label: 'Mathematical PK Parameters' },
            { id: 'pd', label: 'Receptors & PD' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Concepts Grid */}
      <div className="space-y-3">
        <span className="text-xs text-slate-400 font-semibold block">
          Showing {filtered.length} verified pharmacology concept modules
        </span>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <ConceptCard key={c.id} concept={c} />
          ))}
        </div>
      </div>
    </div>
  );
};
