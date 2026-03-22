import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import type { CheckinPoint } from '../../core/models/checkin-point.model';
import { AdminApiService } from '../../core/services/admin-api.service';

@Component({
  selector: 'app-qr-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-management.page.html',
  styleUrl: './qr-management.page.scss',
})
export class QrManagementPageComponent {
  private readonly adminApiService = inject(AdminApiService);

  readonly points = signal<CheckinPoint[]>([]);
  readonly name = signal('');
  readonly description = signal('');
  readonly qrPreview = signal<string | null>(null);
  readonly qrTargetUrl = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.loadPoints();
  }

  loadPoints() {
    this.adminApiService.getPoints().subscribe({
      next: (points) => this.points.set(points),
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }

  createPoint() {
    if (!this.name().trim()) {
      return;
    }

    this.adminApiService
      .createPoint({
        name: this.name().trim(),
        description: this.description().trim() || undefined,
      })
      .subscribe({
        next: () => {
          this.name.set('');
          this.description.set('');
          this.loadPoints();
        },
        error: (error: Error) => this.errorMessage.set(error.message),
      });
  }

  togglePoint(point: CheckinPoint) {
    this.adminApiService.togglePoint(point.id).subscribe({
      next: () => this.loadPoints(),
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }

  generateQr(point: CheckinPoint) {
    this.adminApiService.generateQr(point.code).subscribe({
      next: (qr) => {
        this.qrPreview.set(qr.qrDataUrl);
        this.qrTargetUrl.set(qr.url);
      },
      error: (error: Error) => this.errorMessage.set(error.message),
    });
  }
}
