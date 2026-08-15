import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Pill, Layers, Brain, GraduationCap } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Medicines', path: '/medicines', icon: Pill },
    { label: 'Classes', path: '/classes', icon: Layers },
    { label: 'Memory', path: '/drug-memory', icon: Brain },
    { label: 'Learning', path: '/my-learning', icon: GraduationCap },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 rounded-lg text-[10px] font-medium transition-colors ${
                  isActive ? 'text-teal-400 bg-teal-950/50 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`
              }
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
