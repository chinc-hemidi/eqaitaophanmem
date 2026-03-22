export interface DashboardSummary {
  totalCheckins: number;
  emotions: Array<{
    code: string;
    name: string;
    color: string;
    count: number;
    percentage: number;
  }>;
  dailyTrend: Array<{ date: string; count: number }>;
}
