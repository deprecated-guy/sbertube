import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

const transformPx = (v) => `${v}px`;

@Component({
	selector: 'sb-spinner',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
	@Input({ transform: (v: number) => transformPx(v) }) width = 30;
}
