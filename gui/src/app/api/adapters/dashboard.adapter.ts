export interface DashboardEmotionVM {
  code: string;
  name: string;
  color: string;
  count: number;
  percentage: number;
}

export interface DashboardSummaryVM {
  totalCheckins: number;
  emotions: DashboardEmotionVM[];
  dailyTrend: Array<{ date: string; count: number }>;
}

export function adaptDashboardSummary(input: DashboardSummaryVM): DashboardSummaryVM {
  return {
    ...input,
    emotions: [...input.emotions].sort((a, b) => b.count - a.count),
  };
}
