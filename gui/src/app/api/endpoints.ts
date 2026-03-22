export const API_ENDPOINTS = {
  publicCheckinPoint: (pointCode: string) => `/public/checkins/points/${pointCode}`,
  submitCheckin: '/public/checkins/submit',
  dashboardSummary: '/admin/dashboard/summary',
  checkinPoints: '/admin/checkins/points',
  toggleCheckinPoint: (id: number) => `/admin/checkins/points/${id}/toggle`,
  exportCheckinCsv: '/admin/checkins/export',
  generateQr: (pointCode: string) => `/admin/qr/${pointCode}`,
};
