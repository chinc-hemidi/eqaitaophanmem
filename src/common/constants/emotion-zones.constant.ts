import { EmotionCode } from '../enums/emotion-code.enum';

export interface EmotionZoneSeed {
  code: EmotionCode;
  name: string;
  color: string;
  sortOrder: number;
}

export const DEFAULT_EMOTION_ZONES: EmotionZoneSeed[] = [
  { code: EmotionCode.RED, name: 'Giận dữ / Áp lực', color: '#EF3C45', sortOrder: 1 },
  { code: EmotionCode.BLUE, name: 'Bình yên / Tập trung', color: '#2E6EFF', sortOrder: 2 },
  { code: EmotionCode.YELLOW, name: 'Hào hứng', color: '#E4B019', sortOrder: 3 },
  { code: EmotionCode.GRAY, name: 'Mệt mỏi', color: '#7B8898', sortOrder: 4 },
];
