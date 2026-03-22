import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-emotion-tile',
  standalone: true,
  templateUrl: './emotion-tile.component.html',
  styleUrl: './emotion-tile.component.scss',
})
export class EmotionTileComponent {
  readonly label = input.required<string>();
  readonly color = input.required<string>();
  readonly selected = input(false);

  readonly choose = output<void>();
}
