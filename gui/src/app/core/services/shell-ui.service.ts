import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ShellUiService {
  readonly showQuickNav = signal(false);

  setShowQuickNav(value: boolean) {
    this.showQuickNav.set(value);
  }
}
