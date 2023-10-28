import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'sb-form-error',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './form-error.component.html',
	styleUrls: ['./form-error.component.scss'],
	animations: [
		trigger('errorAnimation', [
			transition(':enter', [
				style({ opacity: 0, transform: 'translateY(-10px)' }),
				animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
			]),
			transition(':leave', [animate('200ms', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
		]),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent {
	@Input() error!: string;
	@Input() value!: string;
}
