import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { DashboardApiService } from '../../core/services/dashboard-api.service';
import { DashboardState } from '../../core/state/dashboard.state';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, StatCardComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPageComponent {
  private readonly dashboardApiService = inject(DashboardApiService);

  readonly state = inject(DashboardState);
  readonly from = signal(this.defaultDate(-6));
  readonly to = signal(this.defaultDate(0));

  constructor() {
    this.loadSummary();
  }

  loadSummary() {
    this.state.startLoading();
    this.dashboardApiService.getSummary({ from: this.from(), to: this.to() }).subscribe({
      next: (summary) => this.state.setSummary(summary),
      error: (error: Error) => this.state.setError(error.message),
    });
  }

  trackByEmotionCode(_: number, item: { code: string }) {
    return item.code;
  }

  private defaultDate(offsetDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().slice(0, 10);
  }
}
