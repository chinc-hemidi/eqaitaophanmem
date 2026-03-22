export interface ApiResponseDto<T> {
  success: boolean;
  timestamp: string;
  data: T;
}
