import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  Calendar, 
  Briefcase, 
  PieChart as PieChartIcon,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  ReferenceLine
} from 'recharts';

import { InputGroup } from './components/InputGroup';
import { ResultCard } from './components/ResultCard';
import { CalculatorInputs } from './types';
import { calculateResults, formatCurrency } from './utils';

const App: React.FC = () => {
  // Initial State based on prompt suggestions
  const [inputs, setInputs] = useState<CalculatorInputs>({
    totalDeals: 10,
    startupFee: 15000,
    monthlyFee: 2500,
    guaranteedPeriod: 3,
    lifetimeMonths: 12,
  });

  // Derived state (calculations)
  const results = useMemo(() => calculateResults(inputs), [inputs]);

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  // Chart Data Preparation
  const revenueDistributionData = [
    { name: 'Mötesbokare', value: results.setterCommission, color: '#10b981' }, // Emerald 500
    { name: 'Säljare', value: results.salesCommission, color: '#0ea5e9' },    // Sky 500
    { name: 'Musse (Netto)', value: results.musseNetPerDeal, color: '#4f46e5' }, // Indigo 600
  ];

  const yearlyComparisonData = [
    {
      name: 'Per Affär',
      Intäkt: results.totalRevenuePerDeal,
      Kostnad: results.totalCommissionPerDeal,
      Vinst: results.musseNetPerDeal
    },
    {
      name: 'Totalt År',
      Intäkt: results.totalRevenuePerDeal * inputs.totalDeals,
      Kostnad: results.totalCommissionPerDeal * inputs.totalDeals,
      Vinst: results.musseYearlyNet
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 rounded-lg text-white">
              <Calculator size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Noory Solution Kalkylator</h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Ekonomisk översikt och provisionsberäkning
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Briefcase size={20} className="text-indigo-600" />
                Förutsättningar
              </h2>
              
              <div className="space-y-4">
                <InputGroup
                  label="Antal Affärer (År)"
                  icon={Users}
                  value={inputs.totalDeals}
                  onChange={(v) => updateInput('totalDeals', v)}
                  min={1}
                  max={100}
                  step={1}
                  showInlineValue={false}
                />
                
                <InputGroup
                  label="Fast Startavgift"
                  icon={CreditCard}
                  value={inputs.startupFee}
                  onChange={(v) => updateInput('startupFee', v)}
                  min={0}
                  max={100000}
                  step={500}
                  suffix="kr"
                  showInlineValue={false}
                />

                <InputGroup
                  label="Månadsavgift"
                  icon={DollarSign}
                  value={inputs.monthlyFee}
                  onChange={(v) => updateInput('monthlyFee', v)}
                  min={0}
                  max={20000}
                  step={100}
                  suffix="kr"
                  showInlineValue={false}
                />

                <div className="grid grid-cols-2 gap-4">
                  <InputGroup
                    label="Garantiperiod"
                    icon={Calendar}
                    value={inputs.guaranteedPeriod}
                    onChange={(v) => updateInput('guaranteedPeriod', v)}
                    min={1}
                    max={12}
                    suffix="mån"
                    showInlineValue
                    showNumberInput={false}
                  />
                  <InputGroup
                    label="Kundlivslängd"
                    icon={TrendingUp}
                    value={inputs.lifetimeMonths}
                    onChange={(v) => updateInput('lifetimeMonths', v)}
                    min={1}
                    max={60}
                    suffix="mån"
                    showInlineValue
                    showNumberInput={false}
                  />
                </div>
              </div>
            </div>

            {/* Information Box */}
            <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
              <h3 className="text-indigo-900 font-semibold mb-2 text-sm flex items-center gap-2">
                <PieChartIcon size={16} />
                Hur beräkningen fungerar
              </h3>
              <p className="text-indigo-700 text-xs leading-relaxed">
                Provisionen för både mötesbokare och säljare beräknas som en tredjedel av startavgiften plus 1.5 gånger månadsavgiften. Musses lön är det som blir kvar av den totala kundintäkten efter att dessa provisioner har betalats ut.
              </p>
            </div>
          </div>

          {/* Right Column: Results & Visualization */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultCard 
                label="Musses Månadslön" 
                value={formatCurrency(results.musseMonthlyNet)} 
                subValue="Genomsnittlig nettolön per månad"
                highlight={true}
              />
              <ResultCard 
                label="Musses Årslön" 
                value={formatCurrency(results.musseYearlyNet)} 
                subValue={`Baserat på ${inputs.totalDeals} affärer`}
              />
            </div>

            {/* Detailed Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Provision Mötesbokare</div>
                 <div className="text-lg font-bold text-emerald-500">{formatCurrency(results.setterCommission)}</div>
                 <div className="text-xs text-slate-400 mt-1">per affär</div>
               </div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Provision Säljare</div>
                 <div className="text-lg font-bold text-sky-500">{formatCurrency(results.salesCommission)}</div>
                 <div className="text-xs text-slate-400 mt-1">per affär</div>
               </div>
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Intäkt Kund</div>
                 <div className="text-lg font-bold text-slate-800">{formatCurrency(results.totalRevenuePerDeal)}</div>
                 <div className="text-xs text-slate-400 mt-1">över {inputs.lifetimeMonths} månader</div>
               </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Distribution Chart */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-6">Fördelning per Affär</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueDistributionData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} interval={0} />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                        {revenueDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary Table */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                 <h3 className="text-base font-semibold text-slate-900 mb-4">Summering</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                       <span className="text-slate-600 text-sm">Totalt Provisionskostnad (per affär)</span>
                       <span className="font-semibold text-red-500">{formatCurrency(results.totalCommissionPerDeal)}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                       <span className="text-slate-600 text-sm">Vinstmarginal per affär</span>
                       <span className="font-semibold text-indigo-600">{((results.musseNetPerDeal / results.totalRevenuePerDeal) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                       <span className="text-slate-900 font-medium">Musse Netto (År)</span>
                       <span className="font-bold text-slate-900 text-lg">{formatCurrency(results.musseYearlyNet)}</span>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;