import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pill, Bookmark, Sparkles, BookOpen, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Medicines', path: '/medicines' },
    { name: 'Common Drugs', path: '/common-drugs' },
    { name: 'Classes', path: '/classes' },
    { name: 'Learning', path: '/learning' },
    { name: 'Terms', path: '/medical-terms' },
    { name: 'Patterns', path: '/drug-patterns' },
    { name: 'Pronunciation', path: '/pronunciation' },
    { name: 'AI Tutor', path: '/ai-assistant' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Pill className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white flex items-center gap-1">
                MediVault <span className="text-teal-400 text-[10px] px-1 py-0.5 rounded bg-teal-950 border border-teal-800">IN</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/admin' && location.pathname.startsWith('/admin')) ||
                (link.path === '/learning' && location.pathname.startsWith('/learning'));
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-teal-950 text-teal-300 border border-teal-800/60 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name === 'AI Tutor' ? (
                    <span className="flex items-center gap-1 text-amber-300 font-semibold">
                      <Sparkles className="w-3 h-3" /> AI Tutor
                    </span>
                  ) : (
                    link.name
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              to="/ai-assistant"
              aria-label="AI Tutor"
              className="p-2 text-amber-400 hover:text-amber-300 hover:bg-slate-800 rounded-lg transition-colors md:hidden"
            >
              <Sparkles className="w-4 h-4" />
            </Link>
            <Link
              to="/favorites"
              aria-label="Favorites"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </Link>
            <Link
              to="/settings"
              aria-label="Settings"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
