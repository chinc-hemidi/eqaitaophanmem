import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

function extractErrorMessage(error: HttpErrorResponse): string {
  const payload = error.error;

  if (typeof payload === 'string' && payload.trim()) {
    if (payload.includes('ERR_NGROK_6024')) {
      return 'Ngrok free đang chặn request API. Vui lòng mở link bằng trình duyệt ngoài hoặc cấu hình tunnel không có trang cảnh báo.';
    }
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const nestedError = (payload as { error?: unknown }).error;
    const nestedMessage = (payload as { message?: unknown }).message;

    if (typeof nestedError === 'string' && nestedError.trim()) {
      return nestedError;
    }

    if (nestedError && typeof nestedError === 'object') {
      const msg = (nestedError as { message?: unknown }).message;
      if (typeof msg === 'string' && msg.trim()) {
        return msg;
      }
      if (Array.isArray(msg) && msg.length > 0) {
        return String(msg[0]);
      }
    }

    if (typeof nestedMessage === 'string' && nestedMessage.trim()) {
      return nestedMessage;
    }

    if (Array.isArray(nestedMessage) && nestedMessage.length > 0) {
      return String(nestedMessage[0]);
    }
  }

  return error.message || 'Unexpected API error';
}

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const message = extractErrorMessage(error);
      return throwError(() => new Error(message));
    }),
  );
