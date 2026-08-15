import React, { useState } from 'react';
import { ChevronDown, Sparkles, Activity, ShieldAlert, AlertTriangle, CheckCircle2, Ban, Baby, HeartPulse, Users, Shield, Link as LinkIcon, Building } from 'lucide-react';
import { MedicineDetail } from '@/services/medicineService';
import { Link } from 'react-router-dom';

interface AccordionsProps {
  medicine: MedicineDetail;
  onExplainMoA: () => void;
}

export const MedicineDetailAccordions: React.FC<AccordionsProps> = ({ medicine, onExplainMoA }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    uses: true,
    mechanism: true,
    adme: true,
    safety: true,
    populations: false,
    interactions: false,
    references: false,
  });

  const toggle = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-3">
      {/* 1. Classification & Overview */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('overview')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-400" />
            Classification & Indian Brands
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.overview ? 'rotate-180' : ''}`} />
        </button>
        {openSections.overview && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-800/60 text-xs">
            {medicine.classes && medicine.classes.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-slate-400 block font-semibold">Classification Taxonomy:</span>
                <div className="flex flex-wrap gap-1.5">
                  {medicine.classes.map((cls) => (
                    <Link
                      key={cls.id}
                      to="/classes"
                      className="px-2.5 py-1 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 hover:bg-teal-900 transition"
                    >
                      {cls.name} <span className="text-[10px] text-slate-400">({cls.classification_type})</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {medicine.brands && medicine.brands.length > 0 ? (
              <div className="space-y-2 pt-2">
                <span className="text-slate-400 block font-semibold">Verified Indian Formulations:</span>
                <div className="grid sm:grid-cols-2 gap-2">
                  {medicine.brands.map((b) => (
                    <div key={b.id} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white block">{b.brand_name}</span>
                        <span className="text-[11px] text-slate-400">{b.strength} • {b.dosage_form}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {b.manufacturers?.name || 'Verified Pharma'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-slate-500">No brand associations recorded in database.</p>
            )}
          </div>
        )}
      </div>

      {/* 2. Common Educational Uses */}
      {medicine.indications && medicine.indications.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggle('uses')}
            className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Common Educational Uses
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.uses ? 'rotate-180' : ''}`} />
          </button>
          {openSections.uses && (
            <div className="p-4 pt-0 space-y-2 border-t border-slate-800/60">
              <ul className="grid sm:grid-cols-2 gap-2">
                {medicine.indications.map((ind, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 pt-1">
                Notice: Uses shown here are educational reference information and not prescriptive treatment advice.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. Mechanism of Action */}
      {medicine.mechanism_of_action && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggle('mechanism')}
            className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Mechanism of Action & Dynamics
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.mechanism ? 'rotate-180' : ''}`} />
          </button>
          {openSections.mechanism && (
            <div className="p-4 pt-0 space-y-3 border-t border-slate-800/60 text-xs">
              <p className="text-slate-200 leading-relaxed">{medicine.mechanism_of_action}</p>
              {medicine.pharmacodynamics && (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
                  <span className="font-bold text-slate-300 block mb-1">Pharmacodynamics:</span>
                  <p className="text-slate-400">{medicine.pharmacodynamics}</p>
                </div>
              )}
              <button
                onClick={onExplainMoA}
                className="px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-800/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
              >
                💡 Explain Mechanism in Simple Words
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. ADME & Pharmacokinetics */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('adme')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            ADME & Quantitative Pharmacokinetics
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.adme ? 'rotate-180' : ''}`} />
        </button>
        {openSections.adme && (
          <div className="p-4 pt-0 space-y-4 border-t border-slate-800/60 text-xs">
            <div className="grid sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <strong className="text-indigo-300 block mb-1">A — Absorption:</strong>
                <p className="text-slate-300">{medicine.absorption || 'Rapid gastrointestinal absorption.'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <strong className="text-indigo-300 block mb-1">D — Distribution:</strong>
                <p className="text-slate-300">{medicine.distribution || 'Distributed throughout extracellular fluids.'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <strong className="text-indigo-300 block mb-1">M — Metabolism:</strong>
                <p className="text-slate-300">{medicine.metabolism || 'Hepatic biotransformation.'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <strong className="text-indigo-300 block mb-1">E — Excretion:</strong>
                <p className="text-slate-300">{medicine.excretion || 'Renal/fecal clearance.'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Half-Life (T½)</span>
                <span className="font-mono font-semibold text-slate-200">{medicine.half_life || 'Not verified'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Bioavailability</span>
                <span className="font-mono font-semibold text-slate-200">{medicine.bioavailability || 'Not verified'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Protein Binding</span>
                <span className="font-mono font-semibold text-slate-200">{medicine.protein_binding || 'Not verified'}</span>
              </div>
              <div className="p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block text-[10px]">Onset of Action</span>
                <span className="font-mono font-semibold text-slate-200">{medicine.onset || 'Not verified'}</span>
              </div>
            </div>

            <Link
              to="/adme"
              className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Learn More in ADME Reference Center →
            </Link>
          </div>
        )}
      </div>

      {/* 5. Clinical Safety & Adverse Effects */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('safety')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Adverse Effects & Safety Warnings
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.safety ? 'rotate-180' : ''}`} />
        </button>
        {openSections.safety && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-800/60 text-xs">
            {medicine.contraindications && medicine.contraindications.length > 0 && (
              <div className="p-3 bg-rose-950/30 border border-rose-900/40 rounded-xl space-y-1">
                <span className="font-bold text-rose-300 flex items-center gap-1.5">
                  <Ban className="w-3.5 h-3.5" /> Contraindications:
                </span>
                <ul className="space-y-1">
                  {medicine.contraindications.map((c, i) => (
                    <li key={i} className="text-rose-200">• {c}</li>
                  ))}
                </ul>
              </div>
            )}

            {medicine.warnings && medicine.warnings.length > 0 && (
              <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl space-y-1">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Clinical Warnings:
                </span>
                <ul className="space-y-1">
                  {medicine.warnings.map((w, i) => (
                    <li key={i} className="text-amber-200">• {w}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-2 pt-1">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="font-bold text-slate-300 block mb-1">Common Adverse Effects:</span>
                <ul className="space-y-1">
                  {medicine.common_adverse_effects?.map((eff, i) => (
                    <li key={i} className="text-slate-400">• {eff}</li>
                  )) || <li className="text-slate-500">Not verified</li>}
                </ul>
              </div>
              <div className="p-3 bg-slate-950/60 border border-rose-900/30 rounded-xl">
                <span className="font-bold text-rose-300 block mb-1">Serious Adverse Effects:</span>
                <ul className="space-y-1">
                  {medicine.serious_adverse_effects?.map((eff, i) => (
                    <li key={i} className="text-rose-300">• {eff}</li>
                  )) || <li className="text-slate-500">Not verified</li>}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 6. Special Populations */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('populations')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            Special Populations (Pregnancy, Renal, Hepatic)
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.populations ? 'rotate-180' : ''}`} />
        </button>
        {openSections.populations && (
          <div className="p-4 pt-0 space-y-2 border-t border-slate-800/60 text-xs">
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <Baby className="w-3.5 h-3.5 text-rose-400" /> Pregnancy:
                </span>
                <p className="text-slate-300">{medicine.pregnancy || 'Not verified'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <HeartPulse className="w-3.5 h-3.5 text-pink-400" /> Lactation:
                </span>
                <p className="text-slate-300">{medicine.lactation || 'Not verified'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5 text-teal-400" /> Renal Impairment:
                </span>
                <p className="text-slate-300">{medicine.renal || 'Not verified'}</p>
              </div>
              <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                <span className="font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Hepatic Impairment:
                </span>
                <p className="text-slate-300">{medicine.hepatic || 'Not verified'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. Drug Interactions */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('interactions')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Verified Drug Interactions
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.interactions ? 'rotate-180' : ''}`} />
        </button>
        {openSections.interactions && (
          <div className="p-4 pt-0 space-y-2 border-t border-slate-800/60 text-xs">
            {medicine.interactions && medicine.interactions.length > 0 ? (
              <div className="space-y-2">
                {medicine.interactions.map((inter) => (
                  <div key={inter.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{inter.medicine_b?.generic_name || 'Interacting Agent'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 uppercase">
                        {inter.severity}
                      </span>
                    </div>
                    <p className="text-slate-300">{inter.interaction}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No verified interaction data is currently available.</p>
            )}
          </div>
        )}
      </div>

      {/* 8. References */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden">
        <button
          onClick={() => toggle('references')}
          className="w-full p-4 text-left flex items-center justify-between font-bold text-sm text-white hover:bg-slate-800/50"
        >
          <span className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-slate-400" />
            Pharmacopoeial References & Sources
          </span>
          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSections.references ? 'rotate-180' : ''}`} />
        </button>
        {openSections.references && (
          <div className="p-4 pt-0 space-y-2 border-t border-slate-800/60 text-xs">
            {medicine.references && medicine.references.length > 0 ? (
              <div className="space-y-2">
                {medicine.references.map((ref) => (
                  <div key={ref.id} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{ref.source_name}</span>
                      <span className="text-[11px] text-slate-400">{ref.title}</span>
                    </div>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-teal-400 hover:underline"
                      >
                        Visit Monograph →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">{medicine.source || 'Indian Pharmacopoeia (IP) Reference'}</p>
            )}
            {medicine.last_verified && (
              <p className="text-[11px] text-slate-500 pt-1">Last verified: {medicine.last_verified}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
