import { HttpInterceptorFn } from '@angular/common/http';

function isNgrokHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return normalized.includes('ngrok');
}

export const ngrokBypassInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window === 'undefined') {
    return next(req);
  }

  if (!isNgrokHostname(window.location.hostname)) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'ngrok-skip-browser-warning': 'true',
      },
    }),
  );
};
