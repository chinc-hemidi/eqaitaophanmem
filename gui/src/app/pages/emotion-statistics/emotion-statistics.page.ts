import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DashboardApiService } from '../../core/services/dashboard-api.service';

@Component({
  selector: 'app-emotion-statistics-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emotion-statistics.page.html',
  styleUrl: './emotion-statistics.page.scss',
})
export class EmotionStatisticsPageComponent {
  private readonly dashboardApiService = inject(DashboardApiService);

  summary$ = this.dashboardApiService.getSummary();
}
