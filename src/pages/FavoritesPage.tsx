import React from 'react';
import { Bookmark } from 'lucide-react';

export const FavoritesPage: React.FC = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-bold text-white flex items-center gap-2">
      <Bookmark className="w-5 h-5 text-teal-400" /> My Saved References
    </h1>
    <div className="p-6 text-center bg-slate-900/40 rounded-xl border border-slate-800 text-xs text-slate-400">
      Favorites storage will connect in Phase 8.
    </div>
  </div>
);
