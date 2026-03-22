import { EmotionCode } from '../enums/emotion-code.enum';

export interface EmotionZoneSeed {
  code: EmotionCode;
  name: string;
  color: string;
  sortOrder: number;
}

export const DEFAULT_EMOTION_ZONES: EmotionZoneSeed[] = [
  { code: EmotionCode.RED, name: 'Giận dữ / Áp lực', color: '#D64545', sortOrder: 1 },
  { code: EmotionCode.BLUE, name: 'Bình yên / Tập trung', color: '#2E7BCF', sortOrder: 2 },
  { code: EmotionCode.YELLOW, name: 'Hào hứng', color: '#E7B416', sortOrder: 3 },
  { code: EmotionCode.GRAY, name: 'Mệt mỏi', color: '#7D8691', sortOrder: 4 },
];
