import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 overflow-x-auto no-scrollbar py-1">
      <Link to="/" className="hover:text-teal-400 flex items-center gap-1 transition flex-shrink-0">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-600 flex-shrink-0" />
            {item.path && !isLast ? (
              <Link to={item.path} className="hover:text-teal-300 transition whitespace-nowrap">
                {item.label}
              </Link>
            ) : (
              <span className={`whitespace-nowrap font-medium ${isLast ? 'text-teal-400' : 'text-slate-300'}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
