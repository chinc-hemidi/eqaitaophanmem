import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from '../routing/app.routes';
import { apiPrefixInterceptor } from '../core/interceptors/api-prefix.interceptor';
import { apiErrorInterceptor } from '../core/interceptors/api-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([apiPrefixInterceptor, apiErrorInterceptor])),
    provideRouter(routes),
  ],
};
