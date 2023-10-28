import { ChangeDetectionStrategy, Component, HostListener, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'sb-hint',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './hint.component.html',
	styleUrls: ['./hint.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintComponent {
	@Input() templateRef!: TemplateRef<unknown>;
	@Input({ transform: (v: number) => v + 'px' }) left = 0;
	@Input({ transform: (v: number) => v + 'px' }) top = 0;

	@HostListener('mouseenter')
	onMouseEnter() {
		console.log('enter');
	}
}
