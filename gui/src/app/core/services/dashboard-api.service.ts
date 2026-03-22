import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { adaptDashboardSummary } from '../../api/adapters/dashboard.adapter';
import { API_ENDPOINTS } from '../../api/endpoints';
import { ApiHttpClient } from '../../api/http-client';
import type { DashboardSummary } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly httpClient = inject(ApiHttpClient);

  getSummary(query?: { from?: string; to?: string; pointCode?: string }) {
    return this.httpClient
      .get<DashboardSummary>(API_ENDPOINTS.dashboardSummary, query)
      .pipe(map((response) => adaptDashboardSummary(response.data)));
  }
}
