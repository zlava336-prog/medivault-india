import React, { useEffect, useState } from 'react';
import { Search, PackageSearch, ChevronLeft, ChevronRight, Loader2, Info } from 'lucide-react';
import { marketMedicineService, MarketMedicineProduct } from '../services/marketMedicineService';

export const MarketMedicineCatalogPage: React.FC = () => {
  const [q, setQ] = useState('');
  const [products, setProducts] = useState<MarketMedicineProduct[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setLoading(true); setError(null);
      try {
        const result = await marketMedicineService.search(q, page, 20);
        if (!cancelled) { setProducts(result.data); setTotal(result.count); setPages(result.totalPages); }
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'Unable to load catalog.');
      } finally { if (!cancelled) setLoading(false); }
    }, 200);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [q, page]);

  return <div className="space-y-5">
    <div>
      <h1 className="text-2xl font-bold text-white flex items-center gap-2"><PackageSearch className="w-6 h-6 text-teal-400" /> Indian Medicine Product Catalog</h1>
      <p className="text-xs text-slate-400 mt-1">Large brand/product catalog kept separate from verified clinical monographs.</p>
    </div>
    <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-2">
      <div className="relative"><Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" /><input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search brand, composition or manufacturer..." className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white" /></div>
      <div className="flex gap-2 text-[10px] text-amber-300 bg-amber-950/30 border border-amber-900/50 rounded-lg p-2"><Info className="w-3.5 h-3.5 shrink-0" /> Catalog records are source records. They are not automatically clinical monographs or verified prescribing information.</div>
    </div>
    {loading && <div className="py-12 text-center"><Loader2 className="w-7 h-7 animate-spin mx-auto text-teal-400" /><p className="text-xs text-slate-500 mt-2">Loading catalog...</p></div>}
    {!loading && error && <div className="p-4 rounded-xl border border-rose-800 bg-rose-950/30 text-xs text-rose-300">{error}</div>}
    {!loading && !error && <>
      <div className="text-xs text-slate-400">Showing {products.length} of {total.toLocaleString()} catalog products</div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {products.map(p => <article key={p.id} className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-teal-800 transition-all duration-200">
          <div className="flex items-start justify-between gap-2"><h2 className="font-semibold text-sm text-white">{p.product_name}</h2>{p.is_discontinued ? <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300">Discontinued</span> : null}</div>
          <p className="text-[11px] text-slate-400 mt-2">{p.composition_1 || 'Composition not listed'}{p.composition_2 ? ` + ${p.composition_2}` : ''}</p>
          {p.manufacturer_name && <p className="text-[10px] text-slate-500 mt-2">{p.manufacturer_name}</p>}
          <div className="flex justify-between gap-2 mt-3 text-[10px] text-slate-500"><span>{p.pack_size_label || 'Pack size unavailable'}</span><span>{p.price_inr != null ? `₹${p.price_inr}` : 'Price unavailable'}</span></div>
        </article>)}
      </div>
      {pages > 1 && <div className="flex justify-center items-center gap-3 pt-2"><button disabled={page <= 1} onClick={() => setPage(x => x - 1)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button><span className="text-xs text-slate-400">{page} / {pages}</span><button disabled={page >= pages} onClick={() => setPage(x => x + 1)} className="p-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button></div>}
    </>}
  </div>;
};
