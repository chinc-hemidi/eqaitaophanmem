import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CheckinApiService } from '../../core/services/checkin-api.service';
import { EmotionTileComponent } from '../../shared/components/emotion-tile/emotion-tile.component';

@Component({
  selector: 'app-public-checkin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, EmotionTileComponent],
  templateUrl: './public-checkin.page.html',
  styleUrl: './public-checkin.page.scss',
})
export class PublicCheckinPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly checkinApiService = inject(CheckinApiService);

  readonly loading = signal(true);
  readonly submitting = signal(false);
  readonly pointName = signal('Điểm check-in');
  readonly pointCode = signal('');
  readonly emotionZones = signal<Array<{ code: string; name: string; color: string }>>([]);
  readonly selectedEmotionCode = signal<string | null>(null);
  readonly note = signal('');
  readonly errorMessage = signal<string | null>(null);
  readonly canSubmit = computed(() => !!this.selectedEmotionCode() && !this.submitting());

  constructor() {
    const pointCode = this.route.snapshot.paramMap.get('pointCode') ?? '';
    this.pointCode.set(pointCode);

    this.checkinApiService.getPointMetadata(pointCode).subscribe({
      next: (metadata) => {
        this.pointName.set(metadata.point.name);
        this.emotionZones.set(metadata.emotionZones);
        this.loading.set(false);
      },
      error: (error: Error) => {
        this.errorMessage.set(error.message);
        this.loading.set(false);
      },
    });
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
        next: () => {
          void this.router.navigate(['/thank-you'], {
            queryParams: {
              point: this.pointCode(),
            },
          });
        },
        error: (error: Error) => {
          this.errorMessage.set(error.message);
          this.submitting.set(false);
        },
      });
  }
}
