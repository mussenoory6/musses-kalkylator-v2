import { CalculatorInputs, CalculatorResults } from './types';

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
    maximumFractionDigits: 0,
  }).format(value);
};

export const calculateResults = (inputs: CalculatorInputs): CalculatorResults => {
  const { totalDeals, startupFee, monthlyFee, guaranteedPeriod, lifetimeMonths } = inputs;

  // Provision per affär – mötesbokare
  // = (fast startavgift ÷ 3) + (månadsavgift × 1,5)
  // We use guaranteedPeriod instead of hardcoded 3 if desired, but sticking to prompt logic which suggests relation.
  const divisor = guaranteedPeriod > 0 ? guaranteedPeriod : 1;
  const setterCommission = (startupFee / divisor) + (monthlyFee * 1.5);

  // Provision per affär – säljare
  // = (fast startavgift ÷ 3) + (månadsavgift × 1,5)
  const salesCommission = (startupFee / divisor) + (monthlyFee * 1.5);

  // Antagen total intäkt per affär (enligt antagen kundlivslängd)
  // = fast startavgift + (månadsavgift × antagen kundlivslängd)
  const totalRevenuePerDeal = startupFee + (monthlyFee * lifetimeMonths);

  const totalCommissionPerDeal = setterCommission + salesCommission;

  // Musses del per affär (innan multiplikation med antal affärer)
  const musseNetPerDeal = totalRevenuePerDeal - totalCommissionPerDeal;

  // Musses årslön (netto efter provisioner)
  // = totalt antal sålda affärer × [ antagen total intäkt per affär − mötesbokarens provision − säljarens provision ]
  const musseYearlyNet = totalDeals * musseNetPerDeal;

  // Musses månadslön
  // = Musses årslön ÷ 12
  const musseMonthlyNet = musseYearlyNet / 12;

  return {
    setterCommission,
    salesCommission,
    totalRevenuePerDeal,
    totalCommissionPerDeal,
    musseNetPerDeal,
    musseYearlyNet,
    musseMonthlyNet,
  };
};