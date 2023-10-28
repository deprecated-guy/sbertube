import { animate, style, transition, trigger } from '@angular/animations';

export const errorAnimation = trigger('errorAnimation', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(-10px)' }),
		animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
	transition(':leave', [animate('200ms', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
]);
