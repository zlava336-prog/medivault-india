import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface ArrayTagInputProps {
  label: string;
  placeholder: string;
  values: string[];
  onChange: (newValues: string[]) => void;
}

export const ArrayTagInput: React.FC<ArrayTagInputProps> = ({
  label,
  placeholder,
  values = [],
  onChange,
}) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    if (!values.includes(input.trim())) {
      onChange([...values, input.trim()]);
    }
    setInput('');
  };

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-300 block">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </div>

      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {values.map((v, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium"
            >
              <span>{v}</span>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-slate-400 hover:text-rose-400"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
