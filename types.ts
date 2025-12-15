export interface CalculatorInputs {
  totalDeals: number;
  startupFee: number;
  monthlyFee: number;
  guaranteedPeriod: number; // Default 3
  lifetimeMonths: number;   // Default 12
}

export interface CalculatorResults {
  setterCommission: number;
  salesCommission: number;
  totalRevenuePerDeal: number;
  totalCommissionPerDeal: number;
  musseNetPerDeal: number;
  musseYearlyNet: number;
  musseMonthlyNet: number;
}