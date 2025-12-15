import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  subValue?: string;
  highlight?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ label, value, subValue, highlight }) => {
  return (
    <div className={`p-6 rounded-2xl border ${highlight ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-200 text-slate-900'} shadow-sm`}>
      <h3 className={`text-sm font-medium mb-1 ${highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{label}</h3>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {subValue && (
        <div className={`mt-2 text-sm ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>
          {subValue}
        </div>
      )}
    </div>
  );
};