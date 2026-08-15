import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const DATA = {
  medicines: [
    {
      id: 'm1', name: 'Paracetamol 650mg', generic: 'Paracetamol', salt: 'Acetaminophen IP',
      class: 'Analgesic • Antipyretic', brands: ['Dolo 650', 'Crocin 650', 'Calpol 650'],
      desc: 'Mild-to-moderate dard aur bukhar (fever) ko kam karne wali first-line dawa.',
      moa: 'Hypothalamus ke heat-regulating center par COX pathways inhibit karke bukhar aur dard kam karta hai.',
      adme: { a: 'Rapid GI absorption (>88%)', d: 'Uniform tissue distribution (0.9 L/kg)', m: 'Hepatic conjugation (minor toxic NAPQI via CYP2E1)', e: 'Renal conjugates (t½: 2-3h)' },
      phonetic: 'pa-ra-SEE-ta-mol', hindi: 'पैरा-सी-टा-मोल', trick: 'PARA = Pain & Pyrexia (Gastric safe)'
    },
    {
      id: 'm2', name: 'Pantoprazole 40mg', generic: 'Pantoprazole', salt: 'Pantoprazole Sodium IP',
      class: 'Proton Pump Inhibitor (PPI)', brands: ['Pan 40', 'Pantocid 40', 'Pantodac'],
      desc: 'Stomach acid production rok kar acidity, heartburn aur peptic ulcers theek karta hai.',
      moa: 'Parietal cells ke H+/K+ ATPase proton pump se bind hokar acid secretion permanently block karta hai.',
      adme: { a: 'Bioavailability ~77%', d: 'Parietal acid canaliculi me concentrate hota hai', m: 'Hepatic CYP2C19 demethylation', e: '80% urine, 20% feces (Action > 24h)' },
      phonetic: 'pan-TOE-pra-zole', hindi: 'पैन-टो-प्रा-ज़ोल', trick: '-PRAZOLE = Proton Pump Acid Blockers'
    },
    {
      id: 'm3', name: 'Losartan 50mg', generic: 'Losartan', salt: 'Losartan Potassium IP',
      class: 'Angiotensin II Receptor Blocker (ARB)', brands: ['Losacar 50', 'Repace 50', 'Covance 50'],
      desc: 'Blood pressure control karta hai aur blood vessels ko relax karta hai (No dry cough).',
      moa: 'AT1 receptors ko block karke Angiotensin II vasoconstriction aur aldosterone release ko rokta hai.',
      adme: { a: '33% absorption (high first pass)', d: '99% protein binding', m: 'CYP2C9 active metabolite EXP3174 (10-40x potent)', e: 'Biliary & renal elimination' },
      phonetic: 'low-SAAR-tan', hindi: 'लो-सार-टन', trick: '-SARTAN = ARB BP Medicine (Category D)'
    }
  ],
  flashcards: [
    { q: 'Paracetamol me NSAID jaisa anti-inflammatory action kyu nahi hota?', a: 'Peripheral inflamed tissues me maujood peroxides iske action ko neutralize kar dete hain.' },
    { q: 'Pantoprazole khane se kitni der pehle lena chahiye?', a: 'Subah khane se 30-60 minute pehle (Active proton pumps ko block karne ke liye).' },
    { q: 'Pregnancy me Losartan kyu contraindicated hai?', a: 'Boxed Warning: Yeh fetal kidney development aur amniotic fluid ko severely damage karta hai.' }
  ]
};

function App() {
  const [tab, setTab] = useState('home');
  const [activeMed, setActiveMed] = useState(DATA.medicines[0]);
  const [query, setQuery] = useState('');
  const [admeTab, setAdmeTab] = useState('a');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [modal, setModal] = useState(false);
  const [lang, setLang] = useState('hinglish');

  const filtered = DATA.medicines.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) ||
    m.brands.some(b => b.toLowerCase().includes(query.toLowerCase())) ||
    m.salt.toLowerCase().includes(query.toLowerCase())
  );

  const speak = (txt) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(txt);
      u.lang = 'en-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-md mx-auto pb-20 border-x border-slate-800/80">
      {/* Header */}
      <header className="p-4 bg-slate-900/90 backdrop-blur sticky top-0 z-30 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-base">M</div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white">MEDIVAULT INDIA</h1>
            <p className="text-[9px] text-emerald-400 font-bold uppercase">Pharmacology Ref v1.0</p>
          </div>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-semibold">🇮🇳 Verified</span>
      </header>

      <main className="p-4 flex-1 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Dolo, Crocin, Paracetamol, Salt..."
            className="w-full pl-9 pr-8 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <span className="absolute left-3 top-2.5 text-xs text-slate-500">🔍</span>
          {query && <button onClick={() => setQuery('')} className="absolute right-3 top-2.5 text-xs text-slate-400">✕</button>}
        </div>

        {tab === 'home' && (
          <div className="space-y-3">
            <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Indian Drug Reference</span>
              <h2 className="text-base font-extrabold text-white">Common Medicines & Formulations</h2>
            </div>

            <div className="space-y-2">
              {filtered.map(med => (
                <div
                  key={med.id}
                  onClick={() => { setActiveMed(med); setTab('detail'); }}
                  className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl hover:border-emerald-500/50 cursor-pointer active:scale-[0.98] transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-sm text-white">{med.name}</h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">{med.salt}</p>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded font-semibold border border-emerald-800/40">
                      {med.class.split('•')[0]}
                    </span>
                  </div>
                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {med.brands.map(b => (
                      <span key={b} className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">{b}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'detail' && (
          <div className="space-y-3.5">
            <button onClick={() => setTab('home')} className="text-xs text-emerald-400 font-bold">← Back</button>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase">{activeMed.class}</span>
                  <h2 className="text-xl font-extrabold text-white">{activeMed.name}</h2>
                  <p className="text-xs text-slate-400 font-mono">Salt: {activeMed.salt}</p>
                </div>
                <button onClick={() => setModal(true)} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold">
                  💡 Explain
                </button>
              </div>

              {/* Pronunciation */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-200">{activeMed.phonetic}</p>
                  <p className="text-[11px] text-slate-400 font-hi">{activeMed.hindi}</p>
                </div>
                <button onClick={() => speak(activeMed.generic)} className="px-3 py-1.5 bg-emerald-600 font-bold text-slate-950 rounded-lg text-xs">
                  🔊 Listen
                </button>
              </div>

              {/* Memory Trick */}
              <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-200">
                <strong className="text-amber-400 block mb-0.5">🧠 Mnemonic:</strong>
                {activeMed.trick}
              </div>

              {/* Mechanism */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Mechanism of Action</span>
                <p className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-slate-800 leading-relaxed">{activeMed.moa}</p>
              </div>

              {/* ADME Tabs */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">ADME Pharmacokinetics</span>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {['a', 'd', 'm', 'e'].map(k => (
                    <button
                      key={k}
                      onClick={() => setAdmeTab(k)}
                      className={`py-1 rounded-lg text-xs font-bold uppercase ${admeTab === k ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                    >
                      {k === 'a' ? 'Abs' : k === 'd' ? 'Dist' : k === 'm' ? 'Met' : 'Exc'}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {activeMed.adme[admeTab]}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'cards' && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Spaced Repetition Flashcards</h2>
            <div
              onClick={() => setFlipped(!flipped)}
              className="min-h-[190px] bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between cursor-pointer active:border-emerald-500"
            >
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase">
                  {flipped ? 'Answer & Rationale' : `Card ${cardIdx + 1} of ${DATA.flashcards.length}`}
                </span>
                <p className="mt-2 text-sm font-bold text-white">
                  {flipped ? DATA.flashcards[cardIdx].a : DATA.flashcards[cardIdx].q}
                </p>
              </div>
              <p className="text-[10px] text-center text-slate-500">Tap to flip ↺</p>
            </div>

            <button
              onClick={() => { setFlipped(false); setCardIdx((cardIdx + 1) % DATA.flashcards.length); }}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 font-bold text-xs rounded-xl"
            >
              Next Flashcard →
            </button>
          </div>
        )}
      </main>

      {/* Explain Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-sm p-4 space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">💡 Concept Breakdown</h3>
              <button onClick={() => setModal(false)} className="text-slate-400">✕</button>
            </div>
            <div className="flex gap-1">
              {['hinglish', 'hindi', 'english'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-1 rounded text-[10px] font-bold uppercase ${lang === l ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 min-h-[70px]">
              {lang === 'hinglish' && <p><strong>{activeMed.name}</strong>: {activeMed.desc}</p>}
              {lang === 'hindi' && <p className="font-hi">{activeMed.hindi} शरीर में दर्द और बुखार को कम करने का कार्य करती है।</p>}
              {lang === 'english' && <p>{activeMed.moa}</p>}
            </div>
            <button onClick={() => setModal(false)} className="w-full py-2 bg-emerald-600 font-bold text-xs text-slate-950 rounded-xl">Done</button>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-slate-900/95 backdrop-blur border-t border-slate-800 flex items-center justify-around z-40">
        {[
          { id: 'home', label: 'Drugs', icon: '💊' },
          { id: 'cards', label: 'Flashcards', icon: '🃏' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex flex-col items-center py-1 ${tab === t.id ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}
          >
            <span className="text-lg">{t.icon}</span>
            <span className="text-[10px]">{t.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
