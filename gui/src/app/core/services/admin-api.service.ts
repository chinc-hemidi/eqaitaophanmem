import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { API_ENDPOINTS } from '../../api/endpoints';
import { ApiHttpClient } from '../../api/http-client';
import type { CheckinPoint } from '../models/checkin-point.model';

@Injectable({ providedIn: 'root' })
export class AdminApiService {
  private readonly httpClient = inject(ApiHttpClient);

  getPoints() {
    return this.httpClient
      .get<CheckinPoint[]>(API_ENDPOINTS.checkinPoints)
      .pipe(map((response) => response.data));
  }

  createPoint(payload: {
    name: string;
    description?: string;
    activeFrom?: string;
    activeTo?: string;
  }) {
    return this.httpClient
      .post<CheckinPoint>(API_ENDPOINTS.checkinPoints, payload)
      .pipe(map((response) => response.data));
  }

  togglePoint(id: number) {
    return this.httpClient
      .patch<CheckinPoint>(API_ENDPOINTS.toggleCheckinPoint(id))
      .pipe(map((response) => response.data));
  }

  generateQr(pointCode: string) {
    return this.httpClient
      .get<{ pointCode: string; url: string; qrDataUrl: string }>(API_ENDPOINTS.generateQr(pointCode))
      .pipe(map((response) => response.data));
  }
}
