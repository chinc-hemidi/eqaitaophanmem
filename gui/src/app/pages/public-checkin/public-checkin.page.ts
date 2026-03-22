import { CommonModule } from '@angular/common';
import { Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckinApiService } from '../../core/services/checkin-api.service';
import { ShellUiService } from '../../core/services/shell-ui.service';
import { EmotionTileComponent } from '../../shared/components/emotion-tile/emotion-tile.component';

interface EmotionOption {
  code: string;
  toneLabel: string;
  name: string;
  color: string;
  icon: string;
}

const EMOTION_UI_BY_CODE: Record<string, { toneLabel: string; icon: string }> = {
  RED: { toneLabel: 'Màu Đỏ', icon: '😠' },
  BLUE: { toneLabel: 'Màu Xanh Dương', icon: '🙂' },
  YELLOW: { toneLabel: 'Màu Vàng', icon: '😄' },
  GRAY: { toneLabel: 'Màu Xám', icon: '😣' },
};

type CheckinStage = 'welcome' | 'checkin';

@Component({
  selector: 'app-public-checkin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, EmotionTileComponent],
  templateUrl: './public-checkin.page.html',
  styleUrl: './public-checkin.page.scss',
})
export class PublicCheckinPageComponent implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly checkinApiService = inject(CheckinApiService);
  private readonly shellUiService = inject(ShellUiService);

  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly stage = signal<CheckinStage>('welcome');
  readonly pointName = signal('Điểm check-in');
  readonly pointCode = signal('');
  readonly emotionZones = signal<EmotionOption[]>([]);
  readonly selectedEmotionCode = signal<string | null>(null);
  readonly note = signal('');
  readonly errorMessage = signal<string | null>(null);
  readonly alreadyCheckedIn = signal(false);
  readonly checkedEmotionName = signal<string | null>(null);
  readonly checkedAdvice = signal<string | null>(null);

  readonly canSubmit = computed(() => !!this.selectedEmotionCode() && !this.submitting());
  readonly submitLabel = computed(() =>
    this.submitting() ? 'Đang gửi...' : 'Gửi check-in →',
  );
  readonly statusLabel = computed(() =>
    this.alreadyCheckedIn()
      ? 'Bạn đã check-in hôm nay'
      : 'Chưa check-in hôm nay',
  );
  readonly selectedEmotion = computed(
    () => this.emotionZones().find((item) => item.code === this.selectedEmotionCode()) ?? null,
  );
  readonly greetingSession = computed(() => {
    const hour = new Date().getHours();
    if (hour < 11) {
      return 'buổi sáng';
    }
    if (hour < 18) {
      return 'buổi chiều';
    }
    return 'buổi tối';
  });
  readonly greetingTitle = computed(() => `Chào ${this.greetingSession()}`);
  readonly sessionHint = computed(() => {
    if (this.greetingSession() === 'buổi sáng') {
      return 'Buổi sáng trong lành - hãy bắt đầu thật nhẹ nhàng.';
    }
    if (this.greetingSession() === 'buổi chiều') {
      return 'Buổi chiều vẫn còn năng lượng - mình cùng giữ nhịp nhé.';
    }
    return 'Buổi tối là lúc chậm lại - ghi nhận cảm xúc để khép ngày trọn vẹn.';
  });
  readonly greetingSubtitle = computed(() => {
    if (!this.alreadyCheckedIn()) {
      return 'Hôm nay bạn chưa ghi nhận cảm xúc. Hãy check-in để bắt đầu ngày thật trọn vẹn nhé.';
    }

    const emotion = this.checkedEmotionName()?.toLowerCase();
    if (!emotion) {
      return 'Bạn đã ghi nhận cảm xúc hôm nay. Hãy tiếp tục giữ nhịp ổn định nhé.';
    }

    return `Bạn đã cảm thấy ${emotion} hôm nay. Hãy trọn vẹn với nó nhé.`;
  });
  readonly dayLabel = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
  })
    .format(new Date())
    .toUpperCase();

  constructor() {
    const pointCode = this.route.snapshot.paramMap.get('pointCode') ?? '';
    this.pointCode.set(pointCode);
    this.loadMetadata();
    this.shellUiService.setShowQuickNav(false);
  }

  ngOnDestroy() {
    this.shellUiService.setShowQuickNav(false);
  }

  startCheckin() {
    if (this.alreadyCheckedIn()) {
      return;
    }

    this.errorMessage.set(null);
    this.stage.set('checkin');
  }

  backToWelcome() {
    this.stage.set('welcome');
  }

  chooseEmotion(code: string) {
    this.selectedEmotionCode.set(code);
  }

  onSubmit() {
    if (!this.canSubmit()) {
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    this.checkinApiService
      .submitCheckin({
        checkinPointCode: this.pointCode(),
        emotionZoneCode: this.selectedEmotionCode()!,
        note: this.note().trim() || undefined,
      })
      .subscribe({
        next: (result) => {
          this.shellUiService.setShowQuickNav(false);
          const advice1 = result.advices[0] ?? result.advice;
          const advice2 = result.advices[1] ?? '';

          void this.router.navigate(['/thank-you'], {
            queryParams: {
              point: this.pointName(),
              pointCode: this.pointCode(),
              emotionCode: result.emotionCode,
              emotion: result.emotionName,
              advice1,
              advice2,
            },
          });
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
          this.submitting.set(false);

          if (error.message.includes('đã check-in')) {
            this.stage.set('welcome');
            this.loadMetadata();
          }
        },
      });
  }

  private loadMetadata() {
    this.loading.set(true);

    this.checkinApiService.getPointMetadata(this.pointCode()).subscribe({
      next: (metadata) => {
        this.pointName.set(metadata.point.name);
        this.emotionZones.set(
          metadata.emotionZones.map((emotion) => ({
            ...emotion,
            toneLabel: EMOTION_UI_BY_CODE[emotion.code]?.toneLabel ?? emotion.name,
            icon: EMOTION_UI_BY_CODE[emotion.code]?.icon ?? '🙂',
          })),
        );
        this.alreadyCheckedIn.set(metadata.todayCheckin.checkedIn);
        this.checkedEmotionName.set(metadata.todayCheckin.emotionName);
        this.checkedAdvice.set(metadata.todayCheckin.advice);
        this.stage.set('welcome');
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      },
    });
  }
}
