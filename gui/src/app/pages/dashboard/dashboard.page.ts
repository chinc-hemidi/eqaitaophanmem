import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { DashboardApiService } from '../../core/services/dashboard-api.service';
import { DashboardState } from '../../core/state/dashboard.state';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

interface EmotionUiMeta {
  label: string;
  icon: string;
}

const EMOTION_UI_BY_CODE: Record<string, EmotionUiMeta> = {
  RED: { label: 'Màu Đỏ', icon: '😠' },
  BLUE: { label: 'Màu Xanh Dương', icon: '🙂' },
  YELLOW: { label: 'Màu Vàng', icon: '😄' },
  GRAY: { label: 'Màu Xám', icon: '😣' },
};

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
  readonly from = signal(this.defaultDate(0));
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

  emotionUi(code: string): EmotionUiMeta {
    return EMOTION_UI_BY_CODE[code] ?? { label: 'Cảm xúc khác', icon: '🙂' };
  }

  private defaultDate(offsetDays: number): string {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().slice(0, 10);
  }
}
