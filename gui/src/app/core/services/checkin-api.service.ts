import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { ApiHttpClient } from '../../api/http-client';
import { API_ENDPOINTS } from '../../api/endpoints';
import type { EmotionZone } from '../models/emotion-zone.model';

interface PublicPointMetadata {
  point: {
    code: string;
    name: string;
    description: string | null;
  };
  emotionZones: EmotionZone[];
}

@Injectable({ providedIn: 'root' })
export class CheckinApiService {
  private readonly httpClient = inject(ApiHttpClient);

  getPointMetadata(pointCode: string) {
    return this.httpClient
      .get<PublicPointMetadata>(API_ENDPOINTS.publicCheckinPoint(pointCode))
      .pipe(map((response) => response.data));
  }

  submitCheckin(payload: { checkinPointCode: string; emotionZoneCode: string; note?: string }) {
    return this.httpClient.post<{ id: number; createdAt: string }>(API_ENDPOINTS.submitCheckin, payload);
  }
}
