export interface CheckinPoint {
  id: number;
  code: string;
  name: string;
  description: string | null;
  qrUrl: string | null;
  activeFrom: string | null;
  activeTo: string | null;
  isActive: boolean;
  createdAt: string;
}
