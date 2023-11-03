import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-spinner',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
	@Input({ transform: (v: number) => v + 'px' }) width = 30;
}
