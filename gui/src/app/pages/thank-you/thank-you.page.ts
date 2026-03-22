import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface EmotionToneMeta {
  title: string;
  subtitle: string;
  label: string;
  icon: string;
  accent: string;
  accentSoft: string;
}

const EMOTION_TONE_BY_CODE: Record<string, EmotionToneMeta> = {
  RED: {
    title: 'Bạn đã can đảm đối diện cảm xúc rồi!',
    subtitle: 'Hãy thở chậm và cho mình một khoảng dừng nhỏ để dịu lại nhé.',
    label: 'GIẬN DỮ / ÁP LỰC',
    icon: '🔥',
    accent: '#cf1f29',
    accentSoft: 'rgba(207, 31, 41, 0.16)',
  },
  BLUE: {
    title: 'Sự bình yên của bạn thật đáng quý!',
    subtitle: 'Giữ nhịp tập trung này để hoàn thành điều quan trọng nhất hôm nay.',
    label: 'BÌNH YÊN / TẬP TRUNG',
    icon: '🫧',
    accent: '#2f6be4',
    accentSoft: 'rgba(47, 107, 228, 0.16)',
  },
  YELLOW: {
    title: 'Năng lượng của bạn thật rực rỡ!',
    subtitle: 'Hãy để niềm vui lan tỏa đến những người xung quanh bạn hôm nay.',
    label: 'HÀO HỨNG / VUI VẺ',
    icon: '✨',
    accent: '#d8aa18',
    accentSoft: 'rgba(216, 170, 24, 0.16)',
  },
  GRAY: {
    title: 'Bạn đang cần một nhịp chậm hơn.',
    subtitle: 'Nghỉ ngắn một chút để cơ thể hồi phục rồi mình đi tiếp thật nhẹ nhàng.',
    label: 'MỆT MỎI / UỂ OẢI',
    icon: '🌙',
    accent: '#6f7f93',
    accentSoft: 'rgba(111, 127, 147, 0.18)',
  },
};

const DEFAULT_TONE: EmotionToneMeta = {
  title: 'Cảm ơn bạn đã ghi nhận cảm xúc hôm nay!',
  subtitle: 'Một chút lắng nghe bản thân sẽ giúp ngày của bạn nhẹ nhàng hơn.',
  label: 'CHECK-IN CẢM XÚC',
  icon: '✨',
  accent: '#b97377',
  accentSoft: 'rgba(185, 115, 119, 0.16)',
};

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './thank-you.page.html',
  styleUrl: './thank-you.page.scss',
})
export class ThankYouPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly pointCode = computed(() => this.route.snapshot.queryParamMap.get('pointCode') ?? '');
  readonly emotionCode = computed(() => this.route.snapshot.queryParamMap.get('emotionCode')?.toUpperCase() ?? '');

  readonly tone = computed(() => EMOTION_TONE_BY_CODE[this.emotionCode()] ?? DEFAULT_TONE);

  readonly advices = computed(() => {
    const query = this.route.snapshot.queryParamMap;
    const input = [query.get('advice1'), query.get('advice2'), query.get('advice')]
      .map((item) => item?.trim() ?? '')
      .filter(Boolean);

    const unique = Array.from(new Set(input));
    if (unique.length >= 2) {
      return unique.slice(0, 2);
    }

    const fallback = [
      'Mỗi cảm xúc đều có ý nghĩa, và bạn đang làm rất tốt khi ghi nhận nó.',
      'Hít thở sâu một chút, bạn sẽ thấy mọi thứ sáng rõ hơn.',
    ];

    if (unique.length === 1) {
      return [unique[0], fallback[1]];
    }

    return fallback;
  });
}
