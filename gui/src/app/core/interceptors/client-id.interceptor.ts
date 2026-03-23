import { HttpInterceptorFn } from '@angular/common/http';

const CLIENT_ID_HEADER = 'x-client-id';
const CLIENT_ID_STORAGE_KEY = 'emotion-checkin-client-id';

function generateClientId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function getOrCreateClientId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const existing = window.localStorage.getItem(CLIENT_ID_STORAGE_KEY)?.trim();
    if (existing) {
      return existing;
    }

    const created = generateClientId();
    window.localStorage.setItem(CLIENT_ID_STORAGE_KEY, created);
    return created;
  } catch {
    return null;
  }
}

export const clientIdInterceptor: HttpInterceptorFn = (req, next) => {
  const existingHeader = req.headers.get(CLIENT_ID_HEADER)?.trim();
  if (existingHeader) {
    return next(req);
  }

  const clientId = getOrCreateClientId();
  if (!clientId) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        [CLIENT_ID_HEADER]: clientId,
      },
    }),
  );
};
