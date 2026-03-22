export interface DateRange {
  from: Date;
  to: Date;
}

export function normalizeDateRange(from?: string, to?: string): DateRange {
  const now = new Date();
  const toDate = to ? new Date(to) : now;
  const fromDate = from
    ? new Date(from)
    : new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate() - 6);

  const normalizedFrom = new Date(fromDate);
  normalizedFrom.setHours(0, 0, 0, 0);

  const normalizedTo = new Date(toDate);
  normalizedTo.setHours(23, 59, 59, 999);

  return { from: normalizedFrom, to: normalizedTo };
}
