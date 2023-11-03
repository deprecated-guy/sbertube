import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
const transformToPx = (v: number) => `${v}px`;

@Component({
	selector: 'sb-hint',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './hint.component.html',
	styleUrls: ['./hint.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0 })),
			transition(':enter, :leave', [animate('300ms', style({ opacity: 1 }))]),
		]),
	],
})
export class HintComponent {
	@Input() templateRef!: TemplateRef<unknown>;
	@Input({ transform: (v: number) => transformToPx(v) }) left = 0;
	@Input({ transform: (v: number) => transformToPx(v) }) top = 0;
}
