import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiHttpClient {
  private readonly http = inject(HttpClient);

  get<T>(url: string, query?: Record<string, string | undefined>) {
    let params = new HttpParams();
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<{ success: boolean; data: T }>(url, { params });
  }

  post<T>(url: string, body: unknown) {
    return this.http.post<{ success: boolean; data: T }>(url, body);
  }

  patch<T>(url: string, body?: unknown) {
    return this.http.patch<{ success: boolean; data: T }>(url, body ?? {});
  }
}
