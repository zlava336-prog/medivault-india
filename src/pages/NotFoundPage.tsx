import React from 'react';
import { Link } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <div className="py-12 text-center space-y-3">
    <AlertOctagon className="w-10 h-10 text-rose-500 mx-auto" />
    <h1 className="text-lg font-bold text-white">404 - Page Not Found</h1>
    <p className="text-xs text-slate-400">The requested route does not exist.</p>
    <Link
      to="/"
      className="inline-block px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
    >
      Return to Home
    </Link>
  </div>
);
