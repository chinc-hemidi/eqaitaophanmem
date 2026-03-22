import { Injectable, signal } from '@angular/core';

import type { DashboardSummary } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardState {
  readonly loading = signal(false);
  readonly summary = signal<DashboardSummary | null>(null);
  readonly errorMessage = signal<string | null>(null);

  startLoading() {
    this.loading.set(true);
    this.errorMessage.set(null);
  }

  setSummary(summary: DashboardSummary) {
    this.summary.set(summary);
    this.loading.set(false);
  }

  setError(message: string) {
    this.errorMessage.set(message);
    this.loading.set(false);
  }
}
