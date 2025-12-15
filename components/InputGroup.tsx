import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon: LucideIcon;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  showInlineValue?: boolean;
  showNumberInput?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  icon: Icon,
  min = 0,
  max,
  step = 1,
  suffix,
  showInlineValue = true,
  showNumberInput = true
}) => {
  const formattedValue = suffix ? `${value} ${suffix}` : value;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2 mb-2 text-slate-500">
        <Icon size={18} />
        <span className="text-sm font-medium uppercase tracking-wide">{label}</span>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
            />
            {showInlineValue && (
              <span className="min-w-[64px] text-sm font-semibold text-slate-600 text-right">
                {formattedValue}
              </span>
            )}
          </div>
        </div>

        {showNumberInput && (
          <div className="relative w-full sm:w-32">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className={`w-full px-3 py-2 ${suffix ? 'pr-12' : ''} bg-slate-50 border border-slate-300 rounded-lg text-right font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none">
                {suffix}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};